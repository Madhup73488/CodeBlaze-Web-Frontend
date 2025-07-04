import React, { useState, useEffect } from "react"; // Removed useCallback
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  // FiArrowLeft, // Removed unused FiArrowLeft
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiBriefcase, // Icon for Work Type
  FiBookOpen, // Icon for Education Level
  FiBriefcase as FiCompanyIcon, // Using briefcase for Company too
} from "react-icons/fi"; // Import necessary icons
import StatusBadge from "../../components/common/StatusBadge"; // Assuming StatusBadge exists
import DataTable from "../../components/common/DataTable"; // Assuming DataTable exists
import {
  fetchAdminInternshipById,
  fetchAdminApplications, // Changed from fetchAdminInternshipApplications
  deleteInternshipAdmin,
  updateInternshipAdmin,
} from "../../utils/api";
import useTable from "../../hooks/useTable"; // Assuming useTable hook exists
import { useAdmin } from "../../contexts/AdminContext"; // Import useAdmin context

const InternshipDetail = () => {
  const { id } = useParams(); // Get internship ID from URL parameters
  const navigate = useNavigate(); // Hook for navigation

  const {
    theme, // Destructure theme from useAdmin
    // hasPermission, // Removed unused hasPermission
  } = useAdmin();

  const [internship, setInternship] = useState(null); // State for fetched internship details
  const [applications, setApplications] = useState([]); // State for fetched applications
  const [loading, setLoading] = useState(true); // State for initial internship loading
  const [applicationsLoading, setApplicationsLoading] = useState(true); // State for applications loading
  const [error, setError] = useState(null); // State for errors
  const [actionInProgress, setActionInProgress] = useState(false); // State for delete/status update actions

  // Use useTable hook for pagination and sorting state management for applications
  const {
    sorting,
    pagination,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = useTable({
    defaultSort: { field: "createdAt", direction: "desc" },
    defaultPageSize: 5,
  });

  // Fetch internship details when component mounts or ID changes
  useEffect(() => {
    const loadInternship = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAdminInternshipById(id); // Assuming this returns the full { success, data } object
        console.log("Fetched internship response:", response); // Debug log the full response

        // FIX: Access the actual internship data inside the 'data' key
        if (response && response.success && response.data) {
          setInternship(response.data); // <-- Corrected line
          console.log("Internship data set:", response.data); // Debug log the data being set
        } else {
          // Handle cases where success is false or data is missing in the response
          console.error(
            "API response indicates failure or missing data:",
            response
          );
          setError(
            response?.message || "Internship data not found or failed to fetch."
          );
          setInternship(null);
        }
      } catch (error) {
        console.error("Failed to load internship", error);
        setError("Failed to load internship details.");
        setInternship(null);
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [id]);

  // Fetch applications for this internship when internship data, sorting, or pagination changes
  useEffect(() => {
    const loadApplications = async () => {
      console.log("loadApplications effect triggered."); // Log effect trigger

      // Add checks to ensure internship object and pagination/sorting are ready
      if (!internship || !internship._id || !sorting || !pagination) {
        console.log("loadApplications: Prerequisites not met. Skipping fetch.");
        // Optionally clear applications if internship becomes null
        if (!internship) {
          setApplications([]);
          pagination?.setTotalItems(0);
        }
        setApplicationsLoading(false);
        return;
      }

      console.log(
        "loadApplications: Prerequisites met. Proceeding with fetch for ID:",
        internship._id
      ); // Log when fetch proceeds

      try {
        setApplicationsLoading(true);
        const filters = {
          internship_id: internship._id, // Pass internship_id as a filter
          position_type: "internship", // Specify position_type
          sortField: sorting.field,
          sortDirection: sorting.direction,
          page: pagination.page,
          limit: pagination.pageSize, // Assuming pageSize is limit
        };
        const response = await fetchAdminApplications(filters); // Changed to fetchAdminApplications

        console.log("Fetched applications data:", response); // Debug log

        // New backend response structure: { success, applications, totalPages, currentPage, totalApplications }
        if (response && response.success) {
          setApplications(response.applications || []);
          // pagination.setTotalItems is a function from useTable hook, so we pass the total count
          if (pagination.setTotalItems) {
            pagination.setTotalItems(response.totalApplications || 0);
          }
          // Note: useTable hook might need adjustment if it doesn't directly use totalPages from API
          // For now, assuming DataTable component can derive totalPages from totalItems and itemsPerPage
        } else {
          console.warn(
            "API did not return expected applications data structure or call failed:",
            response
          );
          setApplications([]);
          if (pagination.setTotalItems) {
            pagination.setTotalItems(0);
          }
        }
      } catch (error) {
        console.error("Failed to load applications", error);
        // Only set error state if the main internship load didn't already set one
        // setError("Failed to load applications."); // Consider if you want a separate error for applications
        setApplications([]);
        pagination.setTotalItems(0);
      } finally {
        setApplicationsLoading(false);
      }
    };

    // Add a delay or check to ensure internship state is populated before fetching applications
    // A simple check at the start of loadApplications is often sufficient.
    loadApplications();
  }, [internship, sorting, pagination]); // Dependencies include internship, sorting, pagination

  // Handle internship deletion
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this internship? This action cannot be undone."
      )
    ) {
      try {
        setActionInProgress(true);
        await deleteInternshipAdmin(id);
        console.log("Internship deleted successfully.");
        navigate("/admin/internships");
      } catch (error) {
        console.error("Failed to delete internship", error);
        setError("Failed to delete internship. Please try again.");
      } finally {
        setActionInProgress(false);
      }
    }
  };

  // Handle internship status change
  const handleStatusChange = async (newStatusString) => {
    try {
      setActionInProgress(true);
      // Call the API function to update the internship status
      // Assuming backend adminController.updateInternshipStatus expects { status: 'statusString' }
      const response = await updateInternshipAdmin(id, {
        status: newStatusString,
      });

      console.log(`Status update response for ${newStatusString}:`, response);

      // Assuming backend returns the updated internship object or success status
      if (response && response.success && response.internship) {
        // Update local state with the new status (isActive boolean from backend response)
        setInternship((prev) => ({
          ...prev,
          isActive: response.internship.isActive,
          // If backend returns a 'status' string field, you might use that too:
          // status: response.internship.status
        }));
        console.log(
          "Internship status updated successfully to",
          newStatusString
        );
      } else {
        console.error(
          "Backend reported error updating status:",
          response ? response.message : "Unknown error"
        );
        setError(
          response ? response.message : "Failed to update internship status."
        );
      }
    } catch (error) {
      console.error("Error updating status", error);
      setError("Failed to update internship status.");
    } finally {
      setActionInProgress(false);
    }
  };

  // Column definitions for the applications DataTable
  const applicationColumns = [
    {
      field: "applicantName",
      header: "Applicant",
      sortable: true,
      render: (row) => (
        // Access populated user's name via userId.name
        <Link
          to={`/admin/applications/${row._id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {row.userId?.name || "N/A"} {/* Use optional chaining */}
        </Link>
      ),
    },
    {
      field: "email",
      header: "Email",
      sortable: true,
      render: (row) => row.userId?.email || "N/A", // Access populated user's email via userId.email
    },
    {
      field: "createdAt",
      header: "Applied On",
      sortable: true,
      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
    },
    {
      field: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <StatusBadge
          status={row.status} // Use schema field name 'status'
          variants={{
            pending: "warning",
            reviewing: "info",
            interview: "primary",
            accepted: "success",
            rejected: "danger",
          }}
        />
      ),
    },
    {
      field: "actions",
      header: "Actions",
      render: (row) => (
        <Link
          to={`/admin/applications/${row._id}`}
          className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded text-sm"
        >
          View
        </Link>
      ),
    },
  ];

  // Display loading state for initial internship fetch
  if (loading) {
    return (
      <div className={`loading-container ${theme}`}>
        <div className="loading-spinner"></div>
        <span>Loading internship details...</span>
      </div>
    );
  }

  // Display error state if internship fetch failed or internship not found (or data key was missing)
  if (error || !internship) {
    return (
      <div className={`error-container ${theme}`}>
        <h2>{error ? "Error Loading Internship" : "Internship Not Found"}</h2>
        <p>
          {error ||
            "The internship posting you're looking for doesn't exist or has been removed."}
        </p>
        <button
          onClick={() => navigate("/admin/internships")}
          className="back-btn"
        >
          Back to Internships List
        </button>
      </div>
    );
  }

  // Helper function to determine which status action buttons to show
  const getStatusActions = () => {
    // Use internship.isActive (boolean from schema) to determine conceptual status
    const currentStatus = internship.isActive ? "active" : "inactive"; // Simplified mapping

    // IMPORTANT: These status strings ('active', 'filled', 'closed', 'draft') MUST
    // match the strings your backend 'updateInternshipAdmin' function expects for status updates.

    switch (currentStatus) {
      case "inactive":
        return (
          // Button to activate/publish
          <button
            onClick={() => handleStatusChange("active")} // Send 'active' string to backend
            disabled={actionInProgress}
            className={`status-btn ${
              actionInProgress ? "updating" : ""
            } bg-green-500 hover:bg-green-600 text-white border-green-500`} // Green button style for Publish
          >
            {actionInProgress ? "Publishing..." : "Publish"}
          </button>
        );
      case "active":
        return (
          <div className="flex flex-wrap gap-3">
            {" "}
            {/* Use flex-wrap for responsiveness */}
            {/* Button to mark filled */}
            <button
              onClick={() => handleStatusChange("filled")} // Send 'filled' string to backend
              disabled={actionInProgress}
              className={`status-btn ${
                actionInProgress ? "updating" : ""
              } bg-blue-500 hover:bg-blue-600 text-white border-blue-500`} // Blue button style for Mark Filled
            >
              {actionInProgress ? "Updating..." : "Mark Filled"}
            </button>
            {/* Button to mark closed */}
            <button
              onClick={() => handleStatusChange("closed")} // Send 'closed' string to backend
              disabled={actionInProgress}
              className={`status-btn ${
                actionInProgress ? "updating" : ""
              } bg-orange-500 hover:bg-orange-600 text-white border-orange-500`} // Orange button style for Mark Closed
            >
              {actionInProgress ? "Updating..." : "Mark Closed"}
            </button>
            {/* Button to unpublish/draft */}
            <button
              onClick={() => handleStatusChange("draft")} // Send 'draft' string to backend
              disabled={actionInProgress}
              className={`status-btn ${
                actionInProgress ? "updating" : ""
              } bg-gray-500 hover:bg-gray-600 text-white border-gray-500`} // Gray button style for Unpublish
            >
              {actionInProgress ? "Updating..." : "Unpublish"}
            </button>
          </div>
        );
      // Add cases for 'filled' and 'closed' if your backend status update
      // returns a different 'isActive' value or a specific 'status' field
      // that keeps the detail view on the page but shows different actions.
      // Based on your API response sample which only has 'isActive',
      // setting to 'filled' or 'closed' likely sets isActive to false,
      // leading back to the 'inactive' case above after re-fetch/state update.

      default:
        return null; // Don't show buttons for unknown status
    }
  };

  // Map isActive boolean (or a status string from backend if available)
  // to a status string for the main StatusBadge display.
  const mapStatusForDisplay = (internship) => {
    // If your backend returns a specific 'status' string field (e.g., 'draft', 'active', 'filled', 'closed'), use that first.
    // If only 'isActive' boolean is available, map that.
    // Assuming your API *only* has isActive for status display:
    return internship?.isActive ? "active" : "inactive"; // Use optional chaining
    // If your API had a status field, you might do:
    // return internship?.status || (internship?.isActive ? "active" : "inactive");
  };

  return (
    <div className={`internship-detail-container ${theme}`}>
      {/* Page Header Section */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/admin/internships">Internships</Link> &gt;{" "}
          {/* Use optional chaining when accessing internship properties */}
          {internship?.title || "Loading..."}
        </div>
        <div className="header-actions">
          {/* Edit button - Use optional chaining */}
          <Link
            to={`/admin/internships/${internship?._id || internship?.id}/edit`}
            className="edit-btn"
            disabled={actionInProgress}
          >
            <FiEdit2 className="mr-2" />
            Edit
          </Link>
          {/* Delete button - Use optional chaining */}
          <button
            onClick={handleDelete}
            disabled={actionInProgress}
            className="delete-btn"
          >
            <FiTrash2 className="mr-2" />
            {actionInProgress ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      {/* Error message display */}
      {error && (
        <div className="error-message" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {/* Internship Content Sections Wrapper */}
      <div className="internship-sections-wrapper">
        {/* Internship Title & Meta Details */}
        <div className="internship-header">
          <div className="internship-title-section">
            {/* Use optional chaining */}
            <h1>{internship?.title || "Title not specified"}</h1>
            {/* Pass the internship object to mapStatusForDisplay */}
            <StatusBadge status={mapStatusForDisplay(internship)} />
          </div>
          {/* Internship Meta Details */}
          <div className="internship-meta">
            {/* Display Company Logo if available - Use optional chaining */}
            {internship?.companyLogo && (
              <div className="meta-item company-logo">
                <img
                  src={internship.companyLogo}
                  alt={`${internship?.company || "Company"} Logo`} // Use optional chaining
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
            <div className="meta-item">
              <FiCompanyIcon className="meta-icon" />
              <div>
                <span className="meta-label">Company</span>
                <span className="meta-value">
                  {internship?.company || "N/A"}
                </span>{" "}
                {/* Use optional chaining */}
              </div>
            </div>
            <div className="meta-item">
              <FiMapPin className="meta-icon" />
              <div>
                <span className="meta-label">Location</span>
                <span className="meta-value">
                  {internship?.location || "N/A"} {/* Use optional chaining */}
                </span>
              </div>
            </div>
            <div className="meta-item">
              <FiBriefcase className="meta-icon" />
              <div>
                <span className="meta-label">Work Type</span>
                <span className="meta-value">
                  {internship?.workType || "N/A"} {/* Use optional chaining */}
                </span>
              </div>
            </div>
            <div className="meta-item">
              <FiClock className="meta-icon" />
              <div>
                <span className="meta-label">Duration</span>
                <span className="meta-value">
                  {internship?.duration || "N/A"} {/* Use optional chaining */}
                </span>
              </div>
            </div>
            {/* Internship Fee - Use optional chaining */}
            <div className="meta-item">
              <FiDollarSign className="meta-icon" />
              <div>
                <span className="meta-label">Internship Fee</span>
                <span className="meta-value">
                  {internship?.internshipFee?.amount !== undefined &&
                  internship?.internshipFee?.amount !== null
                    ? `${internship.internshipFee.amount} ${
                        internship?.internshipFee?.currency || ""
                      }`
                    : "No fee"}
                </span>
              </div>
            </div>
            {/* Application Deadline - Use optional chaining */}
            <div className="meta-item">
              <FiCalendar className="meta-icon" />
              <div>
                <span className="meta-label">Application Deadline</span>
                <span className="meta-value">
                  {internship?.applicationDeadline
                    ? new Date(
                        internship.applicationDeadline
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
            {/* Education Level - Use optional chaining */}
            <div className="meta-item">
              <FiBookOpen className="meta-icon" />
              <div>
                <span className="meta-label">Education Level</span>
                <span className="meta-value">
                  {internship?.educationLevel || "N/A"}{" "}
                  {/* Use optional chaining */}
                </span>
              </div>
            </div>
            {/* Posted By - Use optional chaining for postedBy and postedBy.name */}
            <div className="meta-item">
              <FiUsers className="meta-icon" />
              <div>
                <span className="meta-label">Posted By</span>
                <span className="meta-value">
                  {internship?.postedBy?.name || "N/A"}
                </span>
              </div>
            </div>
            {/* Creation Date - Use optional chaining */}
            <div className="meta-item">
              <FiCalendar className="meta-icon" />
              <div>
                <span className="meta-label">Created At</span>
                <span className="meta-value">
                  {internship?.createdAt
                    ? new Date(internship.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
            {/* Last Updated Date - Use optional chaining */}
            <div className="meta-item">
              <FiCalendar className="meta-icon" />
              <div>
                <span className="meta-label">Last Updated</span>
                <span className="meta-value">
                  {internship?.updatedAt
                    ? new Date(internship.updatedAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
            {/* Display Views and Applications Count - Use optional chaining */}
            <div className="meta-item">
              <FiUsers className="meta-icon" />
              <div>
                <span className="meta-label">Applications</span>
                <span className="meta-value">
                  {internship?.applicationsCount !== undefined
                    ? internship.applicationsCount
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Management Section */}
        <div className="status-management-section">
          <h3>Status Management</h3>
          <div className="status-actions">{getStatusActions()}</div>
        </div>

        {/* Description, Requirements, Benefits, Responsibilities Sections */}
        <div className="internship-details-sections">
          {/* Description - Use optional chaining */}
          <div className="detail-section">
            <h3>Description</h3>
            <div className="detail-content prose">
              <p className="whitespace-pre-line">
                {internship?.description || "No description provided"}
              </p>
            </div>
          </div>

          {/* Requirements - Use optional chaining and check if it's an array */}
          <div className="detail-section">
            <h3>Requirements</h3>
            <div className="detail-content prose">
              {internship?.requirements &&
              Array.isArray(internship.requirements) &&
              internship.requirements.length > 0 ? (
                <ul>
                  {internship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p>No requirements specified</p>
              )}
            </div>
          </div>

          {/* Benefits (Optional) - Use optional chaining and check if it's an array */}
          {internship?.benefits &&
            Array.isArray(internship.benefits) &&
            internship.benefits.length > 0 && (
              <div className="detail-section">
                <h3>Benefits</h3>
                <div className="detail-content prose">
                  <ul>
                    {internship.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          {/* Responsibilities (Added based on schema) - Use optional chaining and check if it's an array */}
          {internship?.responsibilities &&
            Array.isArray(internship.responsibilities) &&
            internship.responsibilities.length > 0 && (
              <div className="detail-section">
                <h3>Responsibilities</h3>
                <div className="detail-content prose">
                  <ul>
                    {internship.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
        </div>

        {/* Applications Section */}
        <div className="applications-section">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center text-gray-800">
              <FiUsers className="mr-2" />
              Applications ({pagination?.totalItems || 0})
            </h3>
            {/* Link to view all applications for this internship - Use optional chaining */}
            {pagination?.totalItems > 0 && (
              <Link
                to={`/admin/applications?internshipId=${
                  internship?._id || internship?.id
                }`}
                className="view-all-applications-link"
              >
                View All
              </Link>
            )}
          </div>

          {/* Applications DataTable */}
          {applications.length > 0 || applicationsLoading ? (
            <DataTable
              data={applications}
              columns={applicationColumns}
              loading={applicationsLoading}
              sorting={sorting}
              onSort={handleSort}
              pagination={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              emptyMessage="No applications found for this internship."
              actions={false}
            />
          ) : (
            <div className="no-applications-message text-center">
              <p className="mb-2 text-gray-500">
                No applications received yet.
              </p>
              {/* Check isActive status to suggest publishing - Use optional chaining */}
              {internship?.isActive === false && (
                <p className="text-sm text-gray-500">
                  This internship is not currently active. Publish it to start
                  receiving applications.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Page Footer Section */}
      <div className="page-footer">
        <button
          onClick={() => navigate("/admin/internships")}
          className="back-btn"
          disabled={actionInProgress}
        >
          Back to Internships List
        </button>
      </div>
      {/* Add your CSS styles here or in a separate CSS module */}
      <style jsx vars={{ theme }}>{`
        .internship-detail-container {
          border-radius: 0.5rem;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          /* Removed explicit background/color here, assumed applied by theme class */
        }

        .internship-detail-container.light {
          background-color: #ffffff;
          color: #111827;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .internship-detail-container.dark {
          background-color: #1f2937;
          color: #e0e0e0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .page-header,
        .internship-sections-wrapper > * {
          /* Apply padding to direct children of wrapper */
          padding: 1.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}; /* Add borders between sections */
        }
        .internship-sections-wrapper > *:last-child {
          border-bottom: none; /* Remove bottom border for the last section in wrapper */
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0;
          flex-wrap: wrap;
          gap: 1rem;
        }
        /* Style for breadcrumb link */
        .breadcrumb a {
          color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          text-decoration: none;
        }
        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .edit-btn,
        .delete-btn,
        .back-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .edit-btn {
          background-color: #3b82f6;
          color: white;
          border: none;
        }

        .edit-btn:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .delete-btn {
          background-color: #ef4444;
          color: white;
          border: none;
        }

        .delete-btn:hover:not(:disabled) {
          background-color: #dc2626;
        }

        .back-btn {
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          border: none;
        }

        .back-btn:hover:not(:disabled) {
          background-color: ${theme === "dark" ? "#4b5563" : "#e5e7eb"};
        }

        .status-btn {
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          padding: 0.625rem 1.25rem;
          min-width: 100px;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          display: flex; /* Ensure flex for content */
          align-items: center; /* Center text/spinner */
          justify-content: center; /* Center text/spinner */
        }

        /* Specific color overrides for status buttons */
        .status-btn.bg-green-500 {
          background-color: #22c55e;
          border-color: #22c55e;
          color: white;
        }
        .status-btn.bg-green-500:hover:not(:disabled) {
          background-color: #16a34a;
          border-color: #16a34a;
        }

        .status-btn.bg-blue-500 {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        .status-btn.bg-blue-500:hover:not(:disabled) {
          background-color: #2563eb;
          border-color: #2563eb;
        }

        .status-btn.bg-orange-500 {
          background-color: #f97316;
          border-color: #f97316;
          color: white;
        }
        .status-btn.bg-orange-500:hover:not(:disabled) {
          background-color: #ea580c;
          border-color: #ea580c;
        }

        .status-btn.bg-gray-500 {
          background-color: #6b7280;
          border-color: #6b7280;
          color: white;
        }
        .status-btn.bg-gray-500:hover:not(:disabled) {
          background-color: #4b5563;
          border-color: #4b5563;
        }

        .status-btn:hover:not(:disabled):not(.active) {
          background-color: ${theme === "dark" ? "#4b5563" : "#f3f4f6"};
        }

        .status-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-btn.updating {
          opacity: 0.8;
        }
        .status-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .internship-header {
          /* This section gets padding from the .internship-sections-wrapper > * rule */
          margin-bottom: 0; /* Removed bottom margin as border adds separation */
        }

        .internship-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .internship-title-section h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: inherit;
        }

        .internship-meta {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.25rem;
          font-size: 0.9rem;
        }

        .meta-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .meta-icon {
          flex-shrink: 0;
          margin-top: 0.25rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .meta-item > div {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-weight: 600;
          color: ${theme === "dark" ? "#9ca3af" : "#4b5563"};
          margin-bottom: 0.125rem;
          font-size: 0.875rem;
        }

        .meta-value {
          color: inherit;
          font-weight: 500;
        }

        .meta-item.company-logo {
          display: flex;
          justify-content: flex-start;
          grid-column: span 2; /* Allow logo to span two columns on larger screens */
        }
        @media (max-width: 768px) {
          .meta-item.company-logo {
            grid-column: span 1; /* Reset span on smaller screens */
          }
        }

        .meta-item.company-logo img {
          max-width: 100px;
          max-height: 100px;
          object-fit: contain;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          border-radius: 0.375rem;
          padding: 0.5rem;
          background-color: ${theme === "dark" ? "#4b5563" : "#f9fafb"};
        }

        .status-management-section {
          /* Gets padding and border from .internship-sections-wrapper > * */
          margin-top: 0;
          margin-bottom: 0;
        }

        .status-management-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .internship-details-sections {
          /* Gets padding and border from .internship-sections-wrapper > * */
          margin-top: 0;
          margin-bottom: 0;
        }

        .detail-section {
          margin-bottom: 1.5rem;
        }
        .detail-section:last-child {
          margin-bottom: 0; /* Remove margin from the last detail section */
        }

        .detail-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: inherit;
        }

        .detail-content {
          line-height: 1.6;
          color: inherit;
        }

        .detail-content p {
          margin-bottom: 0.75rem;
        }

        .detail-content ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .detail-content ul li {
          margin-bottom: 0.5rem;
        }

        .applications-section {
          /* Gets padding and border from .internship-sections-wrapper > * */
          margin-top: 0;
          margin-bottom: 0; /* Remove margin-bottom */
        }

        .applications-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit;
        }

        .view-all-applications-link {
          color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .view-all-applications-link:hover {
          text-decoration: underline;
        }

        .no-applications-message {
          background-color: ${theme === "dark" ? "#2a3544" : "#f9fafb"};
          border-radius: 0.375rem;
          padding: 1.5rem;
          margin-top: 1rem;
          color: ${theme === "dark" ? "#9ca3af" : "#4b5563"};
          border: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .no-applications-message p {
          margin-bottom: 0.5rem;
        }
        .no-applications-message p:last-child {
          margin-bottom: 0;
        }

        .page-footer {
          text-align: center;
          margin-top: 0;
          /* Gets padding from .page-footer rule */
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          padding: 2rem;
          text-align: center;
          font-size: 1.2rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          border-radius: 0.5rem;
          margin: 2rem auto;
          max-width: 600px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .loading-container.dark,
        .error-container.dark {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(59, 130, 246, 0.3);
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error-container h2 {
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .error-message {
          color: #ef4444;
          background-color: ${theme === "dark" ? "#fecaca" : "#fee2e2"};
          border: 1px solid #f87171;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
          word-break: break-word;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .page-header,
          .internship-sections-wrapper > * {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .internship-title-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .internship-title-section h1 {
            font-size: 1.5rem;
          }

          .internship-meta {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
          }

          .meta-item {
            align-items: flex-start; /* Keep align-items: flex-start for consistency with desktop */
          }

          .meta-item.company-logo {
            grid-column: span 1; /* Ensure it doesn't span two columns on smaller screens */
          }

          .meta-icon {
            margin-top: 0.25rem; /* Keep alignment */
          }

          .meta-label {
            font-size: 0.875rem; /* Keep consistent size */
          }

          .meta-value {
            font-size: 0.9rem;
          }

          .status-btn {
            padding: 0.5rem 1rem;
            min-width: auto;
          }

          .status-management-section h3,
          .internship-details-sections h3,
          .applications-section h3 {
            font-size: 1.1rem;
          }

          .view-all-applications-link {
            font-size: 0.9rem; /* Keep consistent size */
          }
        }

        @media (max-width: 480px) {
          .page-header,
          .internship-sections-wrapper > * {
            padding: 0.75rem;
          }

          .internship-header {
            margin-bottom: 0;
            padding-bottom: 0.75rem;
          }

          .internship-title-section h1 {
            font-size: 1.3rem;
          }

          .internship-meta {
            gap: 0.75rem;
          }

          .detail-section h3 {
            font-size: 1.1rem;
          }

          .status-management-section h3,
          .applications-section h3 {
            font-size: 1.1rem;
          }

          .status-actions {
            gap: 0.75rem; /* Reduce gap further */
          }
          .status-btn {
            padding: 0.4rem 0.8rem; /* Further reduce button padding */
          }
        }
      `}</style>
    </div>
  );
};

export default InternshipDetail;
