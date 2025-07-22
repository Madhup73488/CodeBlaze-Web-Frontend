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
      <style jsx>{`
        .internship-detail-container {
          padding: 2rem;
          background-color: ${theme === "dark" ? "#1a202c" : "#f7fafc"};
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .breadcrumb {
          font-size: 1.125rem;
          color: ${theme === "dark" ? "#a0aec0" : "#6b7280"};
        }
        .breadcrumb a {
          color: #4f46e5;
          text-decoration: none;
        }
        .header-actions {
          display: flex;
          gap: 1rem;
        }
        .edit-btn, .delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .edit-btn {
          background-color: #4f46e5;
          color: white;
        }
        .delete-btn {
          background-color: #ef4444;
          color: white;
        }
        .internship-header {
          background-color: ${theme === "dark" ? "#2d3748" : "#ffffff"};
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .internship-title-section h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: ${theme === "dark" ? "#e2e8f0" : "#2d3748"};
        }
        .internship-meta {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .meta-icon {
          font-size: 1.5rem;
          color: #4f46e5;
        }
        .meta-label {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#a0aec0" : "#6b7280"};
        }
        .meta-value {
          font-size: 1rem;
          font-weight: 600;
          color: ${theme === "dark" ? "#e2e8f0" : "#2d3748"};
        }
        .detail-section {
          background-color: ${theme === "dark" ? "#2d3748" : "#ffffff"};
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .detail-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: ${theme === "dark" ? "#e2e8f0" : "#2d3748"};
        }
      `}</style>
    </div>
  );
};

export default InternshipDetail;
