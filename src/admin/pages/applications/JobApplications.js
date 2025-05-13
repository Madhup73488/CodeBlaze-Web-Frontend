// src/admin/pages/applications/JobApplications.js

import React, { useState, useEffect } from "react";
import {
  fetchAdminJobApplications,
  updateApplicationStatus,
} from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import AdminLayout from "../../components/layout/AdminLayout";

const JobApplications = () => {
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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Function to track viewport width for responsive design
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if we're on mobile based on viewport width
  const isMobile = viewportWidth < 768;

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
      const response = await fetchAdminJobApplications(params);
      setApplications(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch job applications:", error);
      setError(error.message || "Failed to load job applications.");
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

  // Define responsive columns based on screen size
  const getColumns = () => {
    const baseColumns = [
      {
        id: "applicantName",
        header: "Applicant",
        accessor: (row) => row.user?.name || "N/A",
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
          <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2`}>
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleView(row._id)}
              disabled={updatingStatus[row._id]}
            >
              View
            </button>
            {/* Conditionally render action buttons based on status */}
            {!isMobile && renderActionButtons(row)}
            {isMobile && (
              <select
                className="px-2 py-1 text-sm border rounded bg-gray-100"
                onChange={(e) => {
                  if (e.target.value)
                    handleStatusChange(row._id, e.target.value);
                }}
                value=""
                disabled={updatingStatus[row._id]}
              >
                <option value="">Change Status</option>
                {row.status !== "approved" &&
                  row.status !== "rejected" &&
                  row.status !== "hired" && (
                    <option value="approved">Approve</option>
                  )}
                {row.status !== "rejected" && row.status !== "hired" && (
                  <option value="rejected">Reject</option>
                )}
                {row.status === "pending" && (
                  <option value="reviewing">Review</option>
                )}
                {row.status === "reviewing" && (
                  <option value="shortlisted">Shortlist</option>
                )}
                {row.status === "shortlisted" && (
                  <option value="interviewed">Interview</option>
                )}
                {row.status === "interviewed" && (
                  <option value="offered">Offer</option>
                )}
                {row.status === "offered" && (
                  <option value="hired">Hire</option>
                )}
                {(row.status === "approved" ||
                  row.status === "rejected" ||
                  row.status === "hired") && (
                  <option value="pending">Set Pending</option>
                )}
              </select>
            )}
          </div>
        ),
      },
    ];

    // For non-mobile view, add more columns
    if (!isMobile) {
      return [
        {
          id: "_id",
          header: "ID",
          accessor: (row) => row._id.substring(0, 8) + "...",
        },
        ...baseColumns,
        {
          id: "jobTitle",
          header: "Job Position",
          accessor: (row) => row.job?.title || "N/A",
        },
        {
          id: "submissionDate",
          header: "Applied On",
          accessor: (row) => new Date(row.createdAt).toLocaleDateString(),
        },
      ];
    }

    return baseColumns;
  };

  // Function to render action buttons - extracted for clarity
  const renderActionButtons = (row) => {
    return (
      <>
        {row.status !== "approved" &&
          row.status !== "rejected" &&
          row.status !== "hired" && (
            <button
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleStatusChange(row._id, "approved")}
              disabled={updatingStatus[row._id]}
            >
              {updatingStatus[row._id] ? "..." : "Approve"}
            </button>
          )}

        {row.status !== "rejected" && row.status !== "hired" && (
          <button
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleStatusChange(row._id, "rejected")}
            disabled={updatingStatus[row._id]}
          >
            {updatingStatus[row._id] ? "..." : "Reject"}
          </button>
        )}

        {row.status === "pending" && (
          <button
            className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleStatusChange(row._id, "reviewing")}
            disabled={updatingStatus[row._id]}
          >
            {updatingStatus[row._id] ? "..." : "Review"}
          </button>
        )}

        {(row.status === "approved" ||
          row.status === "rejected" ||
          row.status === "hired") && (
          <button
            className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleStatusChange(row._id, "pending")}
            disabled={updatingStatus[row._id]}
          >
            {updatingStatus[row._id] ? "..." : "Reset"}
          </button>
        )}
      </>
    );
  };

  const handleView = (id) => {
    console.log("View application:", id);
    // Navigation logic here
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
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to update application status:", error);
      // Use a toast notification instead of alert
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

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header with responsive layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-bold">Job Applications</h1>

        {/* Mobile filter toggle button */}
        {isMobile && (
          <button
            onClick={toggleFilters}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded flex justify-between items-center"
          >
            <span>Filters & Search</span>
            <span>{isFilterVisible ? "▲" : "▼"}</span>
          </button>
        )}

        {/* Filter controls - responsive layout */}
        <div
          className={`w-full md:w-auto ${
            isMobile && !isFilterVisible ? "hidden" : "flex"
          } flex-col md:flex-row gap-3 mt-2 md:mt-0`}
        >
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 w-full md:w-auto"
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

          <input
            type="text"
            name="search"
            placeholder="Search applications..."
            value={filters.search}
            onChange={handleSearchChange}
            className="border rounded px-3 py-2 w-full md:w-auto"
          />
        </div>
      </div>

      {/* Error message */}
      {error && <ErrorMessage message={error} />}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner />
        </div>
      )}

      {/* Content - responsive design */}
      {!loading && (
        <>
          {applications.length > 0 ? (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <DataTable
                columns={getColumns()}
                data={applications}
                pagination={true}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handleDataTablePageChange}
                onLimitChange={handleDataTableLimitChange}
                responsiveBreakpoint={768} // Pass this if your DataTable component supports responsive configs
                // Add responsive class to make the table scroll horizontally on mobile
                className="w-full"
              />
            </div>
          ) : (
            !error && (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">No job applications found.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Try changing your search criteria
                </p>
              </div>
            )
          )}

          {/* Mobile pagination controls - if DataTable doesn't handle this well on mobile */}
          {isMobile && applications.length > 0 && (
            <div className="flex justify-between items-center mt-4 px-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobApplications;
