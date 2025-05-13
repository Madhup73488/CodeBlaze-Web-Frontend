import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import { fetchAdminInternships, deleteInternshipAdmin } from "../../utils/api";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

const InternshipList = () => {
  const { theme } = useAdmin();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [internshipToDelete, setInternshipToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");

  // Handle window resize for responsive columns
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to fetch internships from the backend API
  const loadInternships = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let isActiveFilter;
      if (statusFilter === "active") {
        isActiveFilter = true;
      } else if (statusFilter === "inactive" || statusFilter === "draft") {
        isActiveFilter = false;
      } else {
        isActiveFilter = undefined;
      }

      const filters = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortBy,
        sortDirection: sortDirection,
        search: searchTerm,
        isActive: isActiveFilter,
      };

      console.log("Fetching internships with filters:", filters);

      const response = await fetchAdminInternships(filters);

      if (response && Array.isArray(response.data)) {
        console.log("Fetched internships data:", response.data);
        setInternships(response.data);
        setTotalItems(
          response.total ||
            (response.pagination
              ? response.pagination.total
              : response.data.length)
        );
      } else if (response && response.success && Array.isArray(response.data)) {
        console.log("Fetched internships data (alt structure):", response.data);
        setInternships(response.data);
        setTotalItems(
          response.count ||
            (response.pagination
              ? response.pagination.total
              : response.data.length)
        );
      } else {
        console.error("API did not return expected data structure:", response);
        setError("Received unexpected data format from the server.");
        setInternships([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
      setError("Failed to load internships. Please try again.");
      setInternships([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    sortBy,
    sortDirection,
    searchTerm,
    statusFilter,
  ]);

  // Fetch internships when component mounts or pagination/sorting/search/status state changes
  useEffect(() => {
    loadInternships();
  }, [loadInternships]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle pagination change (called by DataTable)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sort change (called by DataTable)
  const handleSortChange = (newSortBy, newSortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    setCurrentPage(1);
  };

  const handleDeleteClick = (internship) => {
    setInternshipToDelete(internship);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!internshipToDelete) return;

    try {
      const response = await deleteInternshipAdmin(internshipToDelete._id);

      if (response && response.success) {
        console.log("Internship deleted successfully:", internshipToDelete._id);
        setInternships((prev) =>
          prev.filter((item) => item._id !== internshipToDelete._id)
        );
      } else {
        console.error(
          "Backend reported error deleting internship:",
          response ? response.message : "Unknown error"
        );
        setError(response ? response.message : "Failed to delete internship.");
      }

      setDeleteModalOpen(false);
      setInternshipToDelete(null);
    } catch (error) {
      console.error("Error deleting internship:", error);
      setError("Failed to delete internship. Please try again.");
    }
  };

  // Map backend isActive boolean to a status string for the StatusBadge component
  const mapStatusForDisplay = (isActive) => {
    return isActive ? "active" : "inactive";
  };

  // Mobile columns
  const mobileColumns = [
    {
      header: "Internship Details",
      accessor: "title",
      cell: (row) => (
        <div className="mobile-internship-card">
          <Link
            to={`/admin/internships/${row._id}`}
            className="internship-title-link"
          >
            {row.title}
          </Link>
          <div className="internship-company">{row.company}</div>
          <div className="internship-meta">
            <span>{row.duration}</span>
            <span className="internship-type">{row.workType || "N/A"}</span>
            {row.internshipFee && row.internshipFee.amount !== undefined && (
              <span className="internship-fee">
                {row.internshipFee.amount} {row.internshipFee.currency || "USD"}
              </span>
            )}
          </div>
          <div className="internship-footer">
            <StatusBadge status={mapStatusForDisplay(row.isActive)} />
            <span className="applications-count">
              {row.applicationsCount} applications
            </span>
            <div className="actions-cell">
              <Link
                to={`/admin/internships/${row._id}`}
                className="action-btn view-btn"
                aria-label={`View ${row.title}`}
              >
                <span className="btn-text">View</span>
              </Link>
              <Link
                to={`/admin/internships/${row._id}/edit`}
                className="action-btn edit-btn"
                aria-label={`Edit ${row.title}`}
              >
                <span className="btn-text">Edit</span>
              </Link>
              <button
                className="action-btn delete-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteClick(row);
                }}
                aria-label={`Delete ${row.title}`}
              >
                <span className="btn-text">Delete</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Desktop columns
  const desktopColumns = [
    {
      header: "Title",
      accessor: "title",
      cell: (row) => (
        <Link
          to={`/admin/internships/${row._id}`}
          className="internship-title-link"
        >
          {row.title}
        </Link>
      ),
    },
    {
      header: "Company",
      accessor: "company",
    },
    // {
    //   header: "Location",
    //   accessor: "location",
    // },
    {
      header: "Duration",
      accessor: "duration",
    },
    // {
    //   header: "Work Type",
    //   accessor: "workType",
    // },
    {
      header: "Fee",
      accessor: "internshipFee.amount",
      cell: (row) =>
        row.internshipFee && row.internshipFee.amount !== undefined
          ? `${row.internshipFee.amount} ${row.internshipFee.currency || "USD"}`
          : "N/A",
    },
    {
      header: "Status",
      accessor: "isActive",
      cell: (row) => <StatusBadge status={mapStatusForDisplay(row.isActive)} />,
    },
    {
      header: "Applications",
      accessor: "applicationsCount",
    },
    {
      header: "Actions",
      accessor: "rowActions", // Keep this accessor or change back to _id, the key is disabling DataTable's built-in actions
      cell: (row) => (
        <div className="actions-cell">
          {/* <Link
            to={`/admin/internships/${row._id}/detail`}
            className="action-btn view-btn"
            aria-label={`View ${row.title}`}
          >
            <span className="btn-text">View</span>
          </Link> */}
          <Link
            to={`/admin/internships/${row._id}/edit`}
            className="action-btn edit-btn"
            aria-label={`Edit ${row.title}`}
          >
            <span className="btn-text">Edit</span>
          </Link>
          <button
            className="action-btn delete-btn"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick(row);
            }}
            aria-label={`Delete ${row.title}`}
          >
            <span className="btn-text">Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`internship-list-container ${theme}`}>
      <div className="list-header">
        <h2>Internship Postings</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search internships..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search internships"
          />
          <Link to="/admin/internships/create" className="create-button">
            {isMobile ? "+" : "Create New"}
          </Link>
        </div>
      </div>

      <div className="filters-row">
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="filter-select"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <DataTable
        columns={isMobile ? mobileColumns : desktopColumns}
        data={internships}
        loading={loading}
        emptyMessage="No internships found matching your criteria."
        theme={theme}
        hideSearch={true} // Assuming you want to use the search input above the table
        pagination={true}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        sorting={true}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        actions={false} // <--- Add this prop to disable DataTable's built-in actions
      />

      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className={`modal-content ${theme}`}>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete the internship:{" "}
              <strong>{internshipToDelete?.title}</strong>? This action cannot
              be undone.
            </p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="delete-confirm-btn"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .internship-list-container {
          padding: 1rem;
          border-radius: 0.5rem;
          max-width: 100%;
          overflow-x: hidden;
          margin: auto;
        }

        .internship-list-container.light {
          background-color: #ffffff;
          color: #111827;
        }

        .internship-list-container.dark {
          background-color: #1f2937;
          color: #e0e0e0;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: inherit;
        }

        h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-grow: 1;
          justify-content: flex-end;
        }

        .search-input {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          min-width: 150px;
          flex-grow: 1;
          max-width: 300px;
        }

        .create-button {
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border-radius: 0.375rem;
          text-decoration: none;
          font-size: 0.875rem;
          transition: background-color 0.2s;
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: ${isMobile ? "40px" : "auto"};
          height: 38px;
        }

        .create-button:hover {
          background-color: #4338ca;
        }

        .filters-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          min-width: 150px;
          flex: 1;
        }

        .internship-title-link {
          color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          text-decoration: none;
          font-weight: 500;
          font-size: ${isMobile ? "1rem" : "inherit"};
        }

        .internship-title-link:hover {
          text-decoration: underline;
        }

        .mobile-internship-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .internship-company {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#4b5563"};
        }

        .internship-meta {
          display: flex;
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          gap: 1rem;
          flex-wrap: wrap;
        }

        .internship-type {
          padding: 0.25rem 0.5rem;
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          border-radius: 0.25rem;
          font-size: 0.75rem;
        }

        .internship-fee {
          padding: 0.25rem 0.5rem;
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .internship-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.25rem;
        }

        .actions-cell {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.375rem 0.625rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
        }

        .action-btn:active {
          transform: scale(0.97);
        }

        .view-btn {
          background-color: #3b82f6;
          color: white;
          border: none;
        }

        .view-btn:hover {
          background-color: #2563eb;
        }

        .edit-btn {
          background-color: #10b981;
          color: white;
          border: none;
        }

        .edit-btn:hover {
          background-color: #059669;
        }

        .delete-btn {
          background-color: #ef4444;
          color: white;
          border: none;
        }

        .delete-btn:hover {
          background-color: #dc2626;
        }

        .applications-count {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .error-message {
          margin-bottom: 1rem;
          padding: 0.75rem;
          background-color: ${theme === "dark" ? "#fecaca" : "#fee2e2"};
          color: ${theme === "dark" ? "#b91c1c" : "#b91c1c"};
          border-radius: 0.375rem;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1rem;
        }

        .modal-content {
          padding: 1.5rem;
          border-radius: 0.5rem;
          max-width: 28rem;
          width: calc(100% - 2rem);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .modal-content.light {
          background-color: #ffffff;
        }

        .modal-content.dark {
          background-color: #1f2937;
          color: #e0e0e0;
        }

        .modal-content p {
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .cancel-btn,
        .delete-confirm-btn {
          padding: 0.625rem 1.25rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .cancel-btn {
          background-color: ${theme === "dark" ? "#4b5563" : "#e5e7eb"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .cancel-btn:hover {
          background-color: ${theme === "dark" ? "#6b7280" : "#d1d5db"};
        }

        .delete-confirm-btn {
          background-color: #ef4444;
          color: white;
        }

        .delete-confirm-btn:hover {
          background-color: #dc2626;
        }

        @media (max-width: 768px) {
          .list-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .actions {
            width: 100%;
            justify-content: space-between;
          }

          .search-input {
            flex-grow: 1;
            max-width: none;
          }

          .create-button {
            min-width: auto;
            flex-shrink: 0;
          }

          .filters-row {
            flex-direction: column;
          }

          .filter-select {
            min-width: auto;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .internship-list-container {
            padding: 0.75rem;
          }

          .list-header {
            margin-bottom: 1rem;
          }

          h2 {
            font-size: 1.25rem;
          }

          .action-btn {
            min-width: auto;
            padding: 0.375rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InternshipList;
