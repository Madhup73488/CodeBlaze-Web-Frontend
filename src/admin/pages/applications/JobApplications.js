import React, { useState, useEffect, useCallback } from "react";
import {
  fetchAdminApplications, // Changed from fetchAdminJobApplications
  updateApplicationStatus,
} from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import TableSkeletonLoader from "../../components/common/TableSkeletonLoader"; // Import skeleton loader
import ErrorMessage from "../../components/common/ErrorMessage";
import { useAdmin } from "../../contexts/AdminContext"; // For theme
// Icons can be imported if needed for action buttons, similar to InternshipApplications
// import { FiEye, FiCheckCircle, FiXCircle, FiClock, FiRefreshCw } from "react-icons/fi";

const JobApplications = () => {
  const { theme } = useAdmin(); // Get theme
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "all", search: "" });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, pages: 1 });
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < 768;

  const loadApplications = useCallback(async (currentPage = pagination.page, currentLimit = pagination.limit, currentFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      // Add position_type to filters for the consolidated endpoint
      const params = { ...currentFilters, position_type: 'job', page: currentPage, limit: currentLimit };
      const response = await fetchAdminApplications(params); // Changed to fetchAdminApplications

      // New backend response structure: { success, applications, totalPages, currentPage, totalApplications }
      if (response && response.success) {
        setApplications(response.applications || []);
        setPagination({
          total: response.totalApplications || 0,
          page: response.currentPage || 1,
          limit: currentLimit, // limit is from local state
          pages: response.totalPages || 0,
        });
      } else {
        throw new Error(response?.message || "Invalid API response structure for job applications");
      }
    } catch (err) {
      console.error("Failed to fetch job applications:", err);
      setError(err.message || "Failed to load applications.");
      setApplications([]);
      setPagination({ total: 0, page: 1, limit: currentLimit, pages: 1 });
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit, pagination.page]); // Added pagination.limit and pagination.page

  useEffect(() => {
    loadApplications(pagination.page, pagination.limit, filters);
  }, [loadApplications, pagination.page, pagination.limit, filters]); // Added filters

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages && newPage !== pagination.page) {
      setPagination(prev => ({ ...prev, page: newPage }));
      // loadApplications will be called by the useEffect above
    }
  };
  
  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
     // loadApplications will be called by the useEffect above
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatus((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await updateApplicationStatus(id, newStatus);
      setApplications((prevApps) => prevApps.map((app) => (app._id === id ? response.data : app)));
    } catch (err) {
      console.error("Failed to update application status:", err);
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [id]: false }));
    }
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value, page: 1 })); // Reset to page 1 on filter change
  };

  const toggleFilters = () => setIsFilterVisible(!isFilterVisible);

  const renderActionButtons = (row) => {
    const isUpdating = updatingStatus[row._id];
    return (
      <>
        {row.status !== "approved" && row.status !== "rejected" && row.status !== "hired" && (
          <button onClick={() => handleStatusChange(row._id, "approved")} disabled={isUpdating} className="action-button approve-button">
            {isUpdating ? "..." : "Approve"}
          </button>
        )}
        {row.status !== "rejected" && row.status !== "hired" && (
          <button onClick={() => handleStatusChange(row._id, "rejected")} disabled={isUpdating} className="action-button reject-button">
            {isUpdating ? "..." : "Reject"}
          </button>
        )}
        {row.status === "pending" && (
           <button onClick={() => handleStatusChange(row._id, "reviewing")} disabled={isUpdating} className="action-button review-button">
            {isUpdating ? "..." : "Review"}
          </button>
        )}
         {(row.status === "approved" || row.status === "rejected" || row.status === "hired") && (
          <button onClick={() => handleStatusChange(row._id, "pending")} disabled={isUpdating} className="action-button reset-button">
            {isUpdating ? "..." : "Reset"}
          </button>
        )}
      </>
    );
  };

  const getColumns = () => {
    const baseColumns = [
      { id: "applicantName", header: "Applicant", accessor: (row) => row.user?.name || "N/A" },
      { id: "status", header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      {
        id: "actions", header: "Actions", accessor: (row) => (
          <div className={`actions-container ${isMobile ? "mobile-actions" : ""}`}>
            <button className="action-button view-button" onClick={() => console.log("View Job App", row._id)} disabled={updatingStatus[row._id]}>
              View {/* Using FiEye icon can be added here */}
            </button>
            {isMobile ? (
              <select 
                className="action-select" 
                onChange={(e) => { if (e.target.value) handleStatusChange(row._id, e.target.value); e.target.value = "";}} 
                disabled={updatingStatus[row._id]}
                defaultValue=""
              >
                <option value="" disabled>Status</option>
                {row.status !== "approved" && row.status !== "rejected" && row.status !== "hired" && <option value="approved">Approve</option>}
                {row.status !== "rejected" && row.status !== "hired" && <option value="rejected">Reject</option>}
                {row.status === "pending" && <option value="reviewing">Review</option>}
                {row.status === "reviewing" && <option value="shortlisted">Shortlist</option>}
                {row.status === "shortlisted" && <option value="interviewed">Interview</option>}
                {row.status === "interviewed" && <option value="offered">Offer</option>}
                {row.status === "offered" && <option value="hired">Hire</option>}
                {(row.status === "approved" || row.status === "rejected" || row.status === "hired") && <option value="pending">Reset</option>}
              </select>
            ) : renderActionButtons(row)}
          </div>
        )
      },
    ];
    if (!isMobile) {
      return [
        { id: "_id", header: "ID", accessor: (row) => row._id.substring(0, 8) + "..." },
        ...baseColumns.slice(0,1),
        { id: "jobTitle", header: "Job Position", accessor: (row) => row.job?.title || "N/A" },
        ...baseColumns.slice(1,2),
        { id: "submissionDate", header: "Applied On", accessor: (row) => new Date(row.createdAt).toLocaleDateString() },
        baseColumns[2]
      ];
    }
     return [ // Mobile specific column structure
        { id: "applicantInfo", header: "Application", cell: (row) => (
            <div className="mobile-card">
                <strong>{row.user?.name || "N/A"}</strong> ({row.user?.email || "N/A"})
                <div className="text-sm text-gray-500 dark:text-gray-400">Applied for: {row.job?.title || "N/A"}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">On: {new Date(row.createdAt).toLocaleDateString()}</div>
                <div className="mt-2"><StatusBadge status={row.status} /></div>
                <div className={`actions-container mobile-actions mt-2`}>
                    <button className="action-button view-button" onClick={() => console.log("View Job App", row._id)} disabled={updatingStatus[row._id]}>
                        View
                    </button>
                     <select 
                        className="action-select" 
                        onChange={(e) => { if (e.target.value) handleStatusChange(row._id, e.target.value); e.target.value = "";}} 
                        disabled={updatingStatus[row._id]}
                        defaultValue=""
                    >
                        <option value="" disabled>Status</option>
                        {row.status !== "approved" && row.status !== "rejected" && row.status !== "hired" && <option value="approved">Approve</option>}
                        {row.status !== "rejected" && row.status !== "hired" && <option value="rejected">Reject</option>}
                        {row.status === "pending" && <option value="reviewing">Review</option>}
                        {row.status === "reviewing" && <option value="shortlisted">Shortlist</option>}
                        {row.status === "shortlisted" && <option value="interviewed">Interview</option>}
                        {row.status === "interviewed" && <option value="offered">Offer</option>}
                        {row.status === "offered" && <option value="hired">Hire</option>}
                        {(row.status === "approved" || row.status === "rejected" || row.status === "hired") && <option value="pending">Reset</option>}
                    </select>
                </div>
            </div>
        )}
    ];
  };

  return (
    <div className={`applications-container ${theme}`}>
      <div className="page-header">
        <h1>Job Applications</h1>
        {isMobile && (
          <button onClick={toggleFilters} className="filter-toggle-button">
            {isFilterVisible ? "Hide" : "Show"} Filters
          </button>
        )}
        <div className={`filter-controls ${isMobile && !isFilterVisible ? "hidden-mobile" : ""}`}>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="filter-select">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="offered">Offered</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
          <input type="text" name="search" placeholder="Search..." value={filters.search} onChange={handleFilterChange} className="search-input"/>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {loading && applications.length === 0 ? (
        <TableSkeletonLoader columns={isMobile ? 1 : getColumns().length} rows={pagination.limit} theme={theme} />
      ) : applications.length > 0 ? (
        <DataTable
          columns={getColumns()}
          data={applications}
          pagination={true}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit}
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange} // Pass this to DataTable
          theme={theme}
          responsiveBreakpoint={768} // Example breakpoint
        />
      ) : (
        !error && <div className="empty-state"><p>No job applications found.</p></div>
      )}
      <style jsx>{`
        /* Styles adapted from InternshipApplications.js for consistency */
        .applications-container { padding: 1.5rem; font-family: sans-serif; }
        .applications-container.light { background-color: #f9fafb; color: #111827; }
        .applications-container.dark { background-color: #111827; color: #f3f4f6; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .page-header h1 { font-size: 1.75rem; font-weight: 600; color: ${theme === "dark" ? "#f9fafb" : "#111827"}; }
        .filter-controls { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
        .filter-select, .search-input { padding: 0.5rem 0.75rem; border-radius: 0.375rem; border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"}; background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"}; color: ${theme === "dark" ? "#e5e7eb" : "#111827"}; font-size: 0.875rem; }
        .filter-toggle-button { padding: 0.5rem 1rem; background-color: ${theme === "dark" ? "#374151" : "#e5e7eb"}; color: ${theme === "dark" ? "#f3f4f6" : "#374151"}; border-radius: 0.375rem; border: none; cursor: pointer; display: none; }
        .actions-container { display: flex; gap: 0.5rem; align-items: center; }
        .action-button { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.75rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500; border: none; cursor: pointer; transition: background-color 0.2s; white-space: nowrap; }
        .action-button:disabled { opacity: 0.6; cursor: not-allowed; }
        .view-button { background-color: ${theme === "dark" ? "#2563eb" : "#3b82f6"}; color: white; }
        .view-button:hover:not(:disabled) { background-color: ${theme === "dark" ? "#1d4ed8" : "#2563eb"}; }
        .approve-button { background-color: ${theme === "dark" ? "#16a34a" : "#22c55e"}; color: white; }
        .approve-button:hover:not(:disabled) { background-color: ${theme === "dark" ? "#15803d" : "#16a34a"}; }
        .reject-button { background-color: ${theme === "dark" ? "#dc2626" : "#ef4444"}; color: white; }
        .reject-button:hover:not(:disabled) { background-color: ${theme === "dark" ? "#b91c1c" : "#dc2626"}; }
        .review-button { background-color: ${theme === "dark" ? "#d97706" : "#f59e0b"}; color: white; }
        .review-button:hover:not(:disabled) { background-color: ${theme === "dark" ? "#b45309" : "#d97706"}; }
        .reset-button { background-color: ${theme === "dark" ? "#4b5563" : "#6b7280"}; color: white; }
        .reset-button:hover:not(:disabled) { background-color: ${theme === "dark" ? "#374151" : "#4b5563"}; }
        .action-select { padding: 0.4rem 0.6rem; border-radius: 0.25rem; font-size: 0.75rem; background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"}; color: ${theme === "dark" ? "#e5e7eb" : "#374151"}; border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};}
        .mobile-card { padding: 0.75rem; border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}; }
        .mobile-card strong { color: ${theme === "dark" ? "#e5e7eb" : "#111827"}; }
        .empty-state { text-align: center; padding: 2rem; color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; }
        .button-text-desktop { display: inline; }
        .button-text-mobile { display: inline; }

        @media (max-width: 768px) {
          .filter-toggle-button { display: block; width: 100%; margin-bottom: 0.75rem; }
          .hidden-mobile { display: none; }
          .filter-controls.hidden-mobile { display: none !important; }
          .filter-controls { flex-direction: column; width: 100%; }
          .filter-select, .search-input { width: 100%; }
          .button-text-desktop { display: none; }
          .actions-container.mobile-actions { flex-direction: row; justify-content: flex-start; gap: 0.5rem; }
          .actions-container.mobile-actions .action-button, .actions-container.mobile-actions .action-select { flex-grow: 1; text-align: center; justify-content: center;}
        }
      `}</style>
    </div>
  );
};

export default JobApplications;
