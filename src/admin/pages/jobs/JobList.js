// src/admin/pages/jobs/JobList.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import TableSkeletonLoader from "../../components/common/TableSkeletonLoader"; // Import skeleton loader
import api from "../../utils/api";
import { FiTrash2 } from "react-icons/fi";

const JobList = () => {
  const { theme } = useAdmin();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Keep this for initial load and subsequent fetches
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // State for pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // setItemsPerPage was unused, Matches backend default limit
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt"); // Matches backend default sort
  const [sortDirection, setSortDirection] = useState("desc"); // Matches backend default sort

  // State to track the job currently being deleted (for loading spinner on button)
  const [deletingId, setDeletingId] = useState(null); // <-- ADDED STATE

  // State for the delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // <-- ADDED STATE
  const [jobToDelete, setJobToDelete] = useState(null); // <-- ADDED STATE

  // Handle window resize for responsive columns
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to fetch jobs from the backend API
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortBy,
        sortDirection: sortDirection,
        search: searchTerm, // Pass search term as filter
        // Add other filters here if needed (e.g., isActive, company, location, etc.)
        // isActive: 'true', // Example: only fetch active jobs initially
      };

      // Call the backend API function from api.js
      // The backend fetchAdminJobs expects filters as query parameters
      const response = await api.fetchAdminJobs(filters); // Use the imported api function

      // Assuming backend response structure is { success, count, pagination: { total, page, limit, pages }, data }
      if (response && response.success) {
        setJobs(response.data); // Set the array of job documents
        setTotalItems(response.pagination.total); // Set the total count for pagination
        // setCurrentPage and setItemsPerPage are already managed by state, can confirm from response if needed
      } else {
        // Handle backend reported errors
        console.error(
          "[JobList] Backend reported error fetching jobs:",
          response?.message || "Unknown error"
        );
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error("[JobList] Error fetching jobs:", error);
      // Handle API request errors (network issues, etc.)
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy, sortDirection, searchTerm]); // Dependencies for useCallback

  // Fetch jobs when component mounts or pagination/sorting/search state changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]); // Dependency array includes fetchJobs (due to useCallback)

  // --- ADDED DELETE MODAL HANDLERS ---
  // Opens the delete confirmation modal
  const handleDeleteClick = (job) => {
    setJobToDelete(job); // Store the job object to be deleted
    setDeleteModalOpen(true); // Open the modal
  };

  // Handles the confirmation action from the modal
  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return; // Should not happen if modal is correctly managed

    setDeletingId(jobToDelete._id); // Set deleting state for the specific job
    try {
      // Call the delete API function
      // Assuming deleteJobAdmin sends DELETE request and apiRequest throws on non-2xx
      await api.deleteJobAdmin(jobToDelete._id);

      console.log(`[JobList] Job ${jobToDelete._id} deleted successfully.`);
      // Optionally show a success notification

      // Update the list: Remove the deleted job from the state for instant UI update
      setJobs(jobs.filter((job) => job._id !== jobToDelete._id));
      // Decrement the total items count for pagination
      setTotalItems((prevTotal) => (prevTotal > 0 ? prevTotal - 1 : 0));

      // If needed, re-fetch the entire list to ensure pagination/sorting is perfectly accurate after deletion
      // await fetchJobs();
    } catch (error) {
      console.error(`[JobList] Error deleting job ${jobToDelete._id}:`, error);
      // Show an error message to the user (e.g., using a toast or an alert)
      alert(`Failed to delete job: ${error.message || "Unknown error"}`);
    } finally {
      setDeletingId(null); // Reset deleting state
      // Close the modal regardless of success or failure
      setDeleteModalOpen(false);
      setJobToDelete(null); // Clear the jobToDelete state
    }
  };
  // --- END ADDED DELETE MODAL HANDLERS ---

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle pagination change (called by DataTable)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle sort change (called by DataTable)
  const handleSortChange = (newSortBy, newSortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
    setCurrentPage(1); // Reset to first page on sort change
  };

  // Map backend isActive boolean to a status string for the StatusBadge component
  const mapStatus = (isActive) => {
    return isActive ? "active" : "inactive";
    // If you had more granular statuses in the backend (e.g., 'filled'), you'd map them here
  };

  // Responsive columns configuration - UPDATED Delete button logic
  const mobileColumns = [
    {
      header: "Job Details",
      accessor: "title",
      cell: (row) => (
        // 'row' is a job object from the backend response
        <div className="mobile-job-card">
          {/* Use _id for the link */}
          <Link to={`/admin/jobs/${row._id}/detail`} className="job-title-link">
            {row.title} {/* Use schema field name */}
          </Link>
          <div className="job-company">{row.company}</div>{" "}
          {/* Use schema field name */}
          <div className="job-meta">
            <span>{row.location}</span> {/* Use schema field name */}
            <span className="job-type">{row.employmentType}</span>{" "}
            {/* Use schema field name */}
            {/* Optionally display workType as well */}
            {/* <span className="job-type">{row.workType}</span> */}
          </div>
          <div className="job-footer">
            {/* Map isActive boolean to status string for StatusBadge */}
            <StatusBadge status={mapStatus(row.isActive)} />{" "}
            {/* Use schema field name */}
            {/* Display applicationsCount */}
            <span className="applications-count">
              {row.applicationsCount} applications {/* Use schema field name */}
            </span>
            {/* ADDED Delete button to mobile view card - triggers modal */}
            <button
              // Call handleDeleteClick to open the modal
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(row);
              }} // Stop propagation to prevent link click
              disabled={deletingId === row._id} // Disable button while deleting this row
              className={`delete-button-mobile ${theme}`} // Specific class for mobile button styling
              aria-label={`Delete ${row.title}`}
            >
              {/* Show spinner if this job is being deleted */}
              {deletingId === row._id ? (
                <div className="button-spinner"></div>
              ) : (
                <FiTrash2 />
              )}
            </button>
            {/* Note: You might need specific CSS for .button-spinner */}
          </div>
        </div>
      ),
    },
  ];

  const desktopColumns = [
    {
      header: "Job Title",
      accessor: "title", // Use schema field name
      cell: (row) => (
        // 'row' is a job object from the backend response
        // Use _id for the link
        <Link to={`/admin/jobs/${row._id}`} className="job-title-link">
          {row.title} {/* Use schema field name */}
        </Link>
      ),
    },
    {
      header: "Company",
      accessor: "company", // Use schema field name
    },
    {
      header: "Location",
      accessor: "location", // Use schema field name
    },
    {
      header: "Employment Type", // Updated header for clarity
      accessor: "employmentType", // Use schema field name
    },
    {
      header: "Work Type", // Added Work Type column
      accessor: "workType", // Use schema field name
    },
    {
      header: "Status",
      accessor: "isActive", // Use schema field name (boolean)
      cell: (row) => (
        // Map isActive boolean to status string for StatusBadge
        <StatusBadge status={mapStatus(row.isActive)} />
      ),
    },
    {
      header: "Applications",
      accessor: "applicationsCount", // Use schema field name
    },
    // --- ADDED Delete Action Column - UPDATED button logic ---
    {
      header: "Actions",
      accessor: "_id", // Use a unique accessor for the column (e.g., _id)
      cell: (row) => (
        <button
          // Call handleDeleteClick to open the modal, passing the job object
          onClick={() => handleDeleteClick(row)}
          disabled={deletingId === row._id} // Disable button while deleting this row
          className={`delete-button ${theme}`} // Class for styling
          aria-label={`Delete ${row.title}`} // Accessibility
        >
          {/* Show "Deleting..." text or spinner if this job is being deleted */}
          {deletingId === row._id ? "Deleting..." : "Delete"}
        </button>
      ),
      // You might want to make this column narrower
      // width: 100, // Example width - depends on your DataTable component
    },
    // --- END ADDED Delete Action Column ---
  ];

  return (
    <div className={`job-list-container ${theme}`}>
      <div className="list-header">
        <h2>Job Postings</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearchChange} // Use local search handler
            className="search-input"
          />
          <Link to="/admin/jobs/create" className="create-button">
            {isMobile ? "+" : "Create New Job"}
          </Link>
        </div>
      </div>

      {/* DataTable component or Skeleton Loader */}
      {loading && jobs.length === 0 ? ( // Show skeleton only on initial load when jobs array is empty
        <TableSkeletonLoader columns={isMobile ? 1 : 7} rows={itemsPerPage} theme={theme} />
      ) : (
        <DataTable
          columns={isMobile ? mobileColumns : desktopColumns}
          data={jobs}
          // Pass loading to DataTable if it supports an internal loading indicator for re-fetches
          // For now, we handle main loading state outside.
          loading={loading && jobs.length > 0} // Indicate loading for re-fetches if data is already present
          emptyMessage="No jobs found matching your criteria."
          theme={theme}
          hideSearch={true} // Keep this true as we have a custom search input
          // Pagination props
          pagination={true} // Enable pagination
          totalItems={totalItems} // Pass the total count from the backend
          itemsPerPage={itemsPerPage} // Pass the current items per page
          currentPage={currentPage} // Pass the current page number
          onPageChange={handlePageChange} // Pass the page change handler
          // Sorting props
          sorting={true} // Enable sorting
          sortBy={sortBy} // Pass the current sort field
          sortDirection={sortDirection} // Pass the current sort direction
          onSortChange={handleSortChange} // Pass the sort change handler
          // Note: Ensure DataTable component supports these pagination and sorting props
          // If DataTable has its own actions column, you might need a prop like 'hideActions'
          // based on your InternshipList code, adding 'actions={false}' might be the way to disable built-in actions
          actions={false} // Assuming this disables DataTable's default actions column
        />
      )} {/* Ensure ternary operator is correctly closed */}

      {/* --- ADDED Delete Confirmation Modal JSX --- */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className={`modal-content ${theme}`}>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete the job posting:{" "}
              <strong>{jobToDelete?.title}</strong>? This action cannot be
              undone.
            </p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setJobToDelete(null); // Clear jobToDelete when cancelling
                }}
              >
                Cancel
              </button>
              <button
                className="delete-confirm-btn"
                onClick={handleDeleteConfirm} // Call the confirm handler on delete button click
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- END ADDED Delete Confirmation Modal JSX --- */}

      {/* Add your CSS styles here or in a separate CSS module */}
      {/* Added styles for delete button, mobile spinner, and modal */}
      <style jsx>{`
        .job-list-container {
          padding: 1rem;
          border-radius: 0.5rem;
          max-width: 100%;
          overflow-x: hidden;
          margin: auto; /* Center the container */
        }

        .job-list-container.light {
          background-color: #ffffff;
          color: #111827;
        }

        .job-list-container.dark {
          background-color: #1f2937;
          color: #e0e0e0;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap; /* Allow wrapping on smaller screens */
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: inherit; /* Inherit color from container */
        }

        /* Style for modal header */
        h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit; /* Inherit color from modal content */
        }

        .actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-grow: 1; /* Allow actions to grow and take space */
          justify-content: flex-end; /* Align actions to the right */
        }

        .search-input {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          min-width: 150px; /* Give search input a minimum width */
          flex-grow: 1; /* Allow search input to grow */
          max-width: 300px; /* Max width for search input */
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
          height: 38px; /* Match height with input */
        }

        .create-button:hover {
          background-color: #4338ca;
        }

        .job-title-link {
          color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          text-decoration: none;
          font-weight: 500;
          font-size: ${isMobile ? "1rem" : "inherit"};
        }

        .job-title-link:hover {
          text-decoration: underline;
        }

        /* Mobile job card styles */
        .mobile-job-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .job-company {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#4b5563"};
        }

        .job-meta {
          display: flex;
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          gap: 1rem;
          flex-wrap: wrap;
        }

        .job-type {
          padding: 0.25rem 0.5rem;
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          border-radius: 0.25rem;
          font-size: 0.75rem;
        }

        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.25rem;
        }

        .applications-count {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        /* --- ADDED Delete Button Styles --- */
        .delete-button {
          background-color: #ef4444; /* Red color for delete */
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-button:hover:not(:disabled) {
          background-color: #dc2626; /* Darker red on hover */
        }

        .delete-button:disabled {
          background-color: #9ca3af; /* Gray out when disabled */
          cursor: not-allowed;
          opacity: 0.7; /* Add visual feedback for disabled */
        }

        /* Mobile delete button (icon only) */
        .delete-button-mobile {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#f87171" : "#dc2626"}; /* Red icon */
          cursor: pointer;
          padding: 0; /* Remove padding */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px; /* Icon size */
          height: 24px; /* Icon size */
          transition: color 0.2s;
        }

        .delete-button-mobile:hover:not(:disabled) {
          color: ${theme === "dark"
            ? "#fca5a5"
            : "#b91c1c"}; /* Darker red on hover */
        }

        .delete-button-mobile:disabled {
          color: ${theme === "dark"
            ? "#6b7280"
            : "#9ca3af"}; /* Gray out when disabled */
          cursor: not-allowed;
        }

        /* Spinner for delete button loading */
        .button-spinner {
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top: 2px solid #fff;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        /* --- END ADDED Delete Button Styles --- */

        /* --- ADDED Modal Styles --- */
        .modal-overlay {
          position: fixed;
          inset: 0; /* Covers the entire viewport */
          background-color: rgba(
            0,
            0,
            0,
            0.5
          ); /* Semi-transparent black background */
          display: flex;
          align-items: center; /* Center vertically */
          justify-content: center; /* Center horizontally */
          z-index: 50; /* Ensure it's above other content */
          padding: 1rem; /* Add some padding around the modal content */
        }

        .modal-content {
          padding: 1.5rem;
          border-radius: 0.5rem;
          max-width: 28rem; /* Max width for the modal */
          width: calc(
            100% - 2rem
          ); /* Take full width minus padding on small screens */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Add shadow */
        }

        .modal-content.light {
          background-color: #ffffff;
        }

        .modal-content.dark {
          background-color: #1f2937;
          color: #e0e0e0; /* Text color for dark theme modal */
        }

        .modal-content p {
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end; /* Align buttons to the right */
          gap: 0.75rem; /* Space between buttons */
          margin-top: 1.5rem; /* Space above buttons */
        }

        .cancel-btn,
        .delete-confirm-btn {
          padding: 0.625rem 1.25rem; /* Button padding */
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
          background-color: #ef4444; /* Red */
          color: white;
        }

        .delete-confirm-btn:hover {
          background-color: #dc2626; /* Darker red */
        }
        /* --- END ADDED Modal Styles --- */

        /* Adjust layout for smaller screens */
        @media (max-width: 768px) {
          .list-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .actions {
            width: 100%;
            justify-content: space-between; /* Spread search and create button */
          }

          .search-input {
            flex-grow: 1;
            max-width: none; /* Remove max width on mobile */
          }

          .create-button {
            min-width: auto; /* Allow button to size based on content */
            flex-shrink: 0; /* Prevent button from shrinking too much */
          }

          /* Hide the desktop delete column header on mobile */
          /* Note: This depends on your DataTable component's structure */
          /* If DataTable renders headers conditionally based on 'isMobile', this might not be needed */
          /* Assuming the Actions column is the last one */
          th:last-child {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .job-list-container {
            padding: 0.75rem;
          }

          .list-header {
            margin-bottom: 1rem;
          }

          h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default JobList;
