import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";
import {
  fetchAdminInternshipApplications,
  updateApplicationStatus,
} from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import AdminLayout from "../../components/layout/AdminLayout";
import { useAdmin } from "../../contexts/AdminContext";

const InternshipApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  });
  const [updatingStatus, setUpdatingStatus] = useState({});
  const { theme } = useAdmin();

  // Function to load applications based on current filters and pagination
  const loadApplications = async (
    currentPage = pagination.page,
    currentFilters = filters
  ) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        ...currentFilters,
        page: currentPage,
        limit: pagination.limit,
      };
      const response = await fetchAdminInternshipApplications(params);
      setApplications(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch internship applications:", error);
      setError(error.message || "Failed to load internship applications.");
      setApplications([]);
      setPagination({ total: 0, page: 1, limit: 10, pages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications(1, filters);
  }, [filters, pagination.limit]);

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= pagination.pages &&
      newPage !== pagination.page
    ) {
      loadApplications(newPage);
    }
  };

  const getStatusActionButtons = (row) => {
    const buttons = [];
    const isUpdating = updatingStatus[row._id];

    // View button - always available
    buttons.push(
      <button
        key="view"
        className="action-button view-button"
        onClick={() => handleView(row._id)}
        disabled={isUpdating}
      >
        <FiEye className="button-icon" />
        <span className="button-text">View</span>
      </button>
    );

    // Approve button
    if (
      row.status !== "approved" &&
      row.status !== "rejected" &&
      row.status !== "hired"
    ) {
      buttons.push(
        <button
          key="approve"
          className="action-button approve-button"
          onClick={() => handleStatusChange(row._id, "approved")}
          disabled={isUpdating}
        >
          <FiCheckCircle className="button-icon" />
          <span className="button-text">
            {isUpdating ? "Updating..." : "Approve"}
          </span>
        </button>
      );
    }

    // Reject button
    if (row.status !== "rejected" && row.status !== "hired") {
      buttons.push(
        <button
          key="reject"
          className="action-button reject-button"
          onClick={() => handleStatusChange(row._id, "rejected")}
          disabled={isUpdating}
        >
          <FiXCircle className="button-icon" />
          <span className="button-text">
            {isUpdating ? "Updating..." : "Reject"}
          </span>
        </button>
      );
    }

    // Review button for pending applications
    if (row.status === "pending") {
      buttons.push(
        <button
          key="review"
          className="action-button review-button"
          onClick={() => handleStatusChange(row._id, "reviewing")}
          disabled={isUpdating}
        >
          <FiClock className="button-icon" />
          <span className="button-text">
            {isUpdating ? "Updating..." : "Review"}
          </span>
        </button>
      );
    }

    // Reset to pending button
    if (
      row.status === "approved" ||
      row.status === "rejected" ||
      row.status === "hired"
    ) {
      buttons.push(
        <button
          key="reset"
          className="action-button reset-button"
          onClick={() => handleStatusChange(row._id, "pending")}
          disabled={isUpdating}
        >
          <FiRefreshCw className="button-icon" />
          <span className="button-text">
            {isUpdating ? "Updating..." : "Reset"}
          </span>
        </button>
      );
    }

    return buttons;
  };

  const columns = [
    { id: "_id", header: "ID", accessor: "_id" },
    {
      id: "applicantName",
      header: "Student Name",
      accessor: (row) => row.user?.name || "N/A",
    },
    {
      id: "program",
      header: "Internship Program",
      accessor: (row) => row.internship?.title || "N/A",
    },
    {
      id: "submissionDate",
      header: "Applied On",
      accessor: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      id: "status",
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      accessor: (row) => (
        <div className="actions-container">{getStatusActionButtons(row)}</div>
      ),
    },
  ];

  const handleView = (id) => {
    console.log("View internship application:", id);
    // Example: navigate(`/admin/applications/internships/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log("Updating status:", id, "to", newStatus);
    setUpdatingStatus((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await updateApplicationStatus(id, newStatus);
      console.log("Status update successful:", response.data);
      setApplications(
        applications.map((app) => (app._id === id ? response.data : app))
      );
    } catch (error) {
      console.error("Failed to update application status:", error);
      alert(`Failed to update status: ${error.message}`);
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: value,
    }));
  };

  const handleDataTablePageChange = (page) => {
    handlePageChange(page);
  };

  const handleDataTableLimitChange = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  return (
    <div className={`applications-container ${theme}`}>
      <div className="page-header">
        <h1>Internship Applications</h1>
        <div className="filter-controls">
          <div className="filter-item">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interviewed">Interviewed</option>
              <option value="offered">Offered</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="filter-item">
            <div className="search-container">
              <input
                type="text"
                name="search"
                placeholder="Search applications..."
                value={filters.search}
                onChange={handleSearchChange}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="table-container">
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner />
          </div>
        ) : applications.length > 0 ? (
          <DataTable
            columns={columns}
            data={applications}
            pagination={true}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={handleDataTablePageChange}
            onLimitChange={handleDataTableLimitChange}
            theme={theme}
          />
        ) : (
          !error && (
            <div className="empty-state">
              <p>No internship applications found.</p>
            </div>
          )
        )}
      </div>

      <style jsx>{`
        .applications-container {
          padding: 1.75rem;
          transition: all 0.3s ease;
        }

        .applications-container.light {
          background-color: #f9fafb;
          color: #111827;
        }

        .applications-container.dark {
          background-color: #111827;
          color: #f3f4f6;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-header h1 {
          font-size: 1.625rem;
          font-weight: 600;
          margin: 0;
          color: ${theme === "dark" ? "#f9fafb" : "#111827"};
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-item {
          min-width: 180px;
        }

        .filter-select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          color: ${theme === "dark" ? "#e5e7eb" : "#111827"};
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .filter-select:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }

        .search-container {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          padding-right: 2.5rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          color: ${theme === "dark" ? "#e5e7eb" : "#111827"};
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }

        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          pointer-events: none;
        }

        .table-container {
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, ${theme === "dark" ? "0.2" : "0.1"}),
            0 2px 4px -1px rgba(0, 0, 0, ${theme === "dark" ? "0.15" : "0.06"});
          overflow: hidden;
          border: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem 0;
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem 0;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          font-size: 0.875rem;
        }

        .actions-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.375rem 0.625rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button-icon {
          width: 0.875rem;
          height: 0.875rem;
        }

        .button-text {
          display: inline-block;
        }

        /* Button styles with dark mode consideration */
        .view-button {
          background-color: ${theme === "dark" ? "#1d4ed8" : "#3b82f6"};
          color: white;
        }

        .view-button:not(:disabled):hover {
          background-color: ${theme === "dark" ? "#1e40af" : "#2563eb"};
        }

        .approve-button {
          background-color: ${theme === "dark" ? "#15803d" : "#22c55e"};
          color: white;
        }

        .approve-button:not(:disabled):hover {
          background-color: ${theme === "dark" ? "#166534" : "#16a34a"};
        }

        .reject-button {
          background-color: ${theme === "dark" ? "#b91c1c" : "#ef4444"};
          color: white;
        }

        .reject-button:not(:disabled):hover {
          background-color: ${theme === "dark" ? "#991b1b" : "#dc2626"};
        }

        .review-button {
          background-color: ${theme === "dark" ? "#b45309" : "#f59e0b"};
          color: white;
        }

        .review-button:not(:disabled):hover {
          background-color: ${theme === "dark" ? "#92400e" : "#d97706"};
        }

        .reset-button {
          background-color: ${theme === "dark" ? "#374151" : "#6b7280"};
          color: white;
        }

        .reset-button:not(:disabled):hover {
          background-color: ${theme === "dark" ? "#1f2937" : "#4b5563"};
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .filter-controls {
            width: 100%;
          }

          .filter-item {
            flex: 1;
            min-width: 120px;
          }

          .button-text {
            display: none;
          }

          .action-button {
            padding: 0.375rem;
          }

          .button-icon {
            margin-right: 0;
          }
        }

        @media (max-width: 640px) {
          .applications-container {
            padding: 1rem;
          }

          .actions-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.25rem;
          }

          .action-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default InternshipApplications;
