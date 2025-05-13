// src/admin/pages/jobs/JobDetail.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext"; // Assuming this context exists
import StatusBadge from "../../components/common/StatusBadge"; // Assuming this component exists
import api from "../../utils/api"; // Import the api functions
import {
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi"; // Import icons
// Removed unused import: import { Underline } from "lucide-react";

const JobDetail = () => {
  const params = useParams(); // Get all parameters
  const jobId = params.id; // Extract the job ID from the URL parameters (assuming route is /admin/jobs/:id/detail)

  console.log("[JobDetail] component rendered.");
  console.log("[JobDetail] useParams() result:", params);
  console.log("[JobDetail] Extracted jobId:", jobId);

  const navigate = useNavigate();
  const {
    theme, // Assuming theme is available from AdminContext
    hasPermission, // Assuming hasPermission function is available
    // Assuming loadingStates, errors, clearError are managed globally if needed,
    // but we will handle loading and errors locally for this component's fetches
    // loadingStates, errors, clearError,
  } = useAdmin();

  const [job, setJob] = useState(null); // State for the fetched job details
  const [applicantStats, setApplicantStats] = useState({
    // State for calculated applicant stats
    pending: 0,
    reviewing: 0,
    shortlisted: 0,
    interview: 0,
    accepted: 0,
    rejected: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true); // State for initial loading
  const [error, setError] = useState(null); // State for fetch errors
  const [isDeleting, setIsDeleting] = useState(false); // State for delete action loading
  const [isStatusUpdating, setIsStatusUpdating] = useState(false); // State for status update loading

  // Function to fetch job data and applications from the backend API
  const fetchData = useCallback(async () => {
    console.log("[JobDetail] fetchData called. Current jobId:", jobId);

    if (!jobId) {
      console.warn(
        "[JobDetail] fetchData called with undefined jobId. Skipping fetch."
      );
      setIsLoading(false);
      setError("Job ID is missing.");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Fetch single job details
      // Uses GET /api/v1/admin/jobs/:id
      const jobResponse = await api.fetchAdminJobById(jobId);

      if (jobResponse && jobResponse.success && jobResponse.data) {
        console.log(
          "[JobDetail] Job data fetched successfully:",
          jobResponse.data
        );
        setJob(jobResponse.data);
      } else {
        console.error(
          "[JobDetail] Backend reported error fetching job:",
          jobResponse?.message || "Unknown error"
        );
        setError(jobResponse?.message || "Failed to fetch job details.");
        setJob(null);
      }

      // Fetch applications for this specific job
      // Uses GET /api/v1/admin/job-applications?jobId=:jobId
      const applicationsResponse = await api.fetchAdminJobApplications({
        jobId: jobId, // Pass jobId filter
      });

      if (
        applicationsResponse &&
        applicationsResponse.success &&
        Array.isArray(applicationsResponse.data)
      ) {
        console.log(
          "[JobDetail] Applications data fetched successfully:",
          applicationsResponse.data
        );
        // Calculate applicant statistics from the fetched applications
        const stats = {
          pending: 0,
          reviewing: 0,
          shortlisted: 0,
          interview: 0,
          accepted: 0,
          rejected: 0,
          total: 0,
        };

        applicationsResponse.data.forEach((app) => {
          // Assuming applications are in response.data and have a 'status' field matching stat keys
          if (stats[app.status] !== undefined) {
            stats[app.status]++;
          }
          stats.total++;
        });
        setApplicantStats(stats);
      } else {
        console.warn(
          "[JobDetail] Backend reported error fetching applications or data is not an array:",
          applicationsResponse
        );
        // Optionally set an error specific to applications fetch if needed
        // setError("Failed to fetch applications.");
        setApplicantStats({
          // Reset stats if applications fetch failed
          pending: 0,
          reviewing: 0,
          shortlisted: 0,
          interview: 0,
          accepted: 0,
          rejected: 0,
          total: 0,
        });
      }
    } catch (error) {
      console.error("[JobDetail] Error fetching data:", error);
      // Handle API request errors (network issues, etc.)
      setError(
        "An error occurred while fetching job details and applications."
      );
      setJob(null); // Ensure job is null on error
      setApplicantStats({
        // Reset stats on error
        pending: 0,
        reviewing: 0,
        shortlisted: 0,
        interview: 0,
        accepted: 0,
        rejected: 0,
        total: 0,
      });
    } finally {
      setIsLoading(false); // Stop initial loading
    }
  }, [jobId]); // Dependency array includes jobId

  // Fetch data when component mounts or jobId changes
  useEffect(() => {
    if (jobId) {
      fetchData();
    } else {
      setIsLoading(false);
      setError("Job ID is missing from the URL.");
    }
  }, [jobId, fetchData]); // Dependency array includes jobId and fetchData (due to useCallback)

  // Map backend isActive boolean to a status string for display
  const mapStatusForDisplay = (isActive) => {
    // Assuming StatusBadge component understands 'active' and 'inactive' strings
    return isActive ? "active" : "inactive";
    // If you had more granular statuses in the backend (e.g., 'filled'), you'd map them here
  };

  // Handle job deletion via API (Uses window.confirm)
  const handleDeleteJob = async () => {
    // Confirmation prompt using window.confirm
    if (
      window.confirm(
        "Are you sure you want to delete this job posting? This action cannot be undone."
      )
    ) {
      setIsDeleting(true); // Set deleting state to true
      setError(null); // Clear previous errors

      try {
        // Call the backend API function to delete the job
        // Uses DELETE /api/v1/admin/jobs/:id
        const response = await api.deleteJobAdmin(jobId);

        if (response && response.success) {
          // Check for success property in the response
          console.log("[JobDetail] Job deleted successfully.");
          // Redirect to job list after deletion
          navigate("/admin/jobs"); // Navigate on success
        } else {
          // Handle backend reported errors for deletion (even if response is success: false)
          console.error(
            "[JobDetail] Backend reported error deleting job:",
            response?.message || "Unknown error",
            response
          );
          setError(response?.message || "Failed to delete job.");
        }
      } catch (error) {
        console.error("[JobDetail] Error deleting job:", error);
        // Handle API request errors (network issues, etc.)
        const userErrorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred while deleting the job. Please try again.";
        setError(userErrorMessage);
      } finally {
        setIsDeleting(false); // Stop deleting loading
      }
    }
  };

  // Handle job status change via API (using activate/deactivate endpoint)
  const handleStatusChange = async (newStatusString) => {
    // Map the desired status string to the isActive boolean for the backend API
    let targetIsActive;
    let confirmationMessage;

    switch (newStatusString) {
      case "active":
        targetIsActive = true;
        confirmationMessage =
          "Are you sure you want to mark this job as Active?";
        break;
      case "paused":
      case "draft":
      case "expired": // Assuming expired also means inactive
        targetIsActive = false;
        confirmationMessage = `Are you sure you want to mark this job as ${newStatusString}?`;
        break;
      default:
        console.error(
          "[JobDetail] Invalid status string provided:",
          newStatusString
        );
        return; // Do nothing for invalid status
    }

    // Confirmation prompt using window.confirm
    if (window.confirm(confirmationMessage)) {
      setIsStatusUpdating(true); // Set status updating state to true
      setError(null); // Clear previous errors

      try {
        // Call the backend API function to activate/deactivate the job
        // Uses PUT /api/v1/admin/jobs/:id/activate
        // This endpoint expects { isActive: boolean } in the body
        // Assuming your api.js has an activateJob or similar function that takes jobId and body { isActive: boolean }
        // If your backend uses a different structure or endpoint, adjust the API call below.
        // For now, assuming a function like api.updateJobStatus(jobId, { isActive: targetIsActive })
        // Based on your adminController, updateJobAdmin might be used, expecting the whole job object
        // If updateJobAdmin is used, you'd need to fetch the job, update isActive, and send the whole object:
        // const updatedJobData = { ...job, isActive: targetIsActive };
        // const response = await api.updateJobAdmin(jobId, updatedJobData);
        // Let's assume a simpler dedicated status endpoint or a function that handles it.
        // If api.js doesn't have a dedicated activateJob/updateJobStatus, you might need to add it.
        // For demonstration, let's assume a function that takes jobId and the boolean directly.
        // If using updateJobAdmin, ensure you have the latest job object state.
        console.log(
          "[JobDetail] Attempting to update job status to:",
          targetIsActive
        );
        // *** IMPORTANT: Replace the following line with your actual API call for status update ***
        // This is a placeholder API call - adjust based on your api.js and backend endpoint
        // Using updateJobAdmin as a likely function based on previous files, ensure 'job' state is the latest
        const response = await api.updateJobAdmin(jobId, {
          ...job,
          isActive: targetIsActive,
        }); // Example using updateJobAdmin

        if (response && response.success && response.data) {
          // Assuming backend returns { success: true, data: updatedJob }
          console.log(
            `[JobDetail] Job status updated to ${newStatusString} successfully.`,
            response.data
          );
          // Update the local job state to reflect the change from the backend response
          setJob(response.data); // Assuming backend returns the updated job document
          // Optionally show a success message
          // alert(`Job status changed to ${newStatusString} successfully!`);
        } else {
          // Handle backend reported errors for status update
          console.error(
            "[JobDetail] Backend reported error updating job status:",
            response?.message || "Unknown error",
            response
          );
          setError(response?.message || "Failed to update job status.");
        }
      } catch (error) {
        console.error("[JobDetail] Error updating job status:", error);
        // Handle API request errors
        const userErrorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred while updating the job status. Please try again.";
        setError(userErrorMessage);
      } finally {
        setIsStatusUpdating(false); // Stop status update loading
      }
    }
  };

  // Display loading state for initial job fetch
  if (isLoading) {
    return (
      <div className={`loading-container ${theme}`}>
        <div className="loading-spinner"></div>
        <span>Loading job details...</span>
        {/* Add your styles for loading spinner and container here or in a CSS module */}
        <style jsx>{`
          .loading-container {
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
          .loading-container.dark {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .loading-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(59, 130, 246, 0.3); /* Blue border with transparency */
            border-top-color: #3b82f6; /* Solid blue top border */
            border-radius: 50%;
            animation: spin 0.8s linear infinite; /* Animation */
            margin-bottom: 1rem;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Display error state if fetch failed or job not found
  if (error || !job) {
    return (
      <div className={`error-container ${theme}`}>
        <h2>{error ? "Error Loading Job" : "Job Not Found"}</h2>
        <p>
          {error ||
            "The job posting you're looking for doesn't exist or has been removed."}
        </p>
        <button onClick={() => navigate("/admin/jobs")} className="back-btn">
          Back to Jobs List
        </button>
        {/* Add your styles for error container and back button here or in a CSS module */}
        <style jsx>{`
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
          .error-container.dark {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          .error-container h2 {
            color: #ef4444; /* Red color for error heading */
            margin-bottom: 1rem;
          }

          .back-btn {
            background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
            color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 1.5rem;
          }

          .back-btn:hover {
            background-color: ${theme === "dark" ? "#4b5563" : "#e5e7eb"};
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`job-detail-container ${theme}`}>
      {/* Page Header Section */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/admin/jobs">Jobs</Link> &gt; {job.title}
        </div>
        <div className="header-actions">
          {/* Edit button - Use optional chaining */}
          {/* Check permission for editing */}
          {hasPermission && hasPermission("edit:jobs") && (
            <Link // Using Link for navigation
              to={`/admin/jobs/${jobId}/edit`}
              className="edit-btn"
              // Disable button while other actions are in progress
              disabled={isDeleting || isStatusUpdating}
            >
              <FiEdit2 className="mr-2" /> {/* Edit icon */}
              Edit Job
            </Link>
          )}
          {/* Delete button - Uses existing handleDeleteJob function and isDeleting state */}
          {/* Check permission for deleting */}
          {hasPermission && hasPermission("delete:jobs") && (
            <button // <-- This is the delete button
              onClick={handleDeleteJob} // <-- Calls the delete handler
              disabled={isDeleting || isStatusUpdating} // Disable while other actions are in progress
              className="delete-btn" // <-- Uses delete-btn class for styling
            >
              <FiTrash2 className="mr-2" /> {/* Delete icon */}
              {isDeleting ? "Deleting..." : "Delete Job"}{" "}
              {/* Show loading text */}
            </button>
          )}
        </div>
      </div>
      {/* Display error message if there is one */}
      {error && (
        <div className="error-message" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {/* Job Content Sections Wrapper - Applies padding and border-bottom */}
      <div className="job-sections-wrapper">
        {" "}
        {/* Using a wrapper for sections */}
        {/* Job Title & Meta Details */}
        <div className="job-header">
          {" "}
          {/* This section gets padding from wrapper > * rule */}
          <div className="job-title-section">
            <h1>{job.title}</h1> {/* Use schema field name */}
            {/* Use mapStatusForDisplay to get string for StatusBadge */}
            <StatusBadge status={mapStatusForDisplay(job.isActive)} />{" "}
            {/* Use schema field name */}
          </div>
          {/* Job Meta Details */}
          <div className="job-meta">
            {/* Display Company Logo if available */}
            {job.companyLogoUrl && (
              <div className="meta-item company-logo">
                <img
                  src={job.companyLogoUrl}
                  alt={`${job.company} Logo`}
                  onError={(e) => (e.target.style.display = "none")} // Hide image on error
                />
              </div>
            )}
            <div className="meta-item">
              <FiBriefcase className="meta-icon" />{" "}
              {/* Using briefcase for Company */}
              <div>
                <span className="meta-label">Company</span>
                <span className="meta-value">{job.company}</span>{" "}
                {/* Use schema field name */}
              </div>
            </div>
            <div className="meta-item">
              <FiMapPin className="meta-icon" /> {/* Map pin icon */}
              <div>
                <span className="meta-label">Location</span>
                <span className="meta-value">{job.location}</span>{" "}
                {/* Use schema field name */}
              </div>
            </div>
            <div className="meta-item">
              <FiClock className="meta-icon" /> {/* Clock icon */}
              <div>
                <span className="meta-label">Work Type</span>{" "}
                <span className="meta-value">{job.workType}</span>{" "}
              </div>
            </div>
            <div className="meta-item">
              <FiBriefcase className="meta-icon" /> {/* Briefcase icon */}
              <div>
                <span className="meta-label">Employment Type</span>{" "}
                <span className="meta-value">{job.employmentType}</span>{" "}
              </div>
            </div>
            {/* Display Salary if available */}
            {job.salary &&
            (job.salary.min || job.salary.max || job.salary.isNegotiable) ? (
              <div className="meta-item">
                <FiDollarSign className="meta-icon" /> {/* Dollar sign icon */}
                <div>
                  <span className="meta-label">Salary</span>
                  <span className="meta-value">
                    {job.salary.min && `${job.salary.min}`}
                    {job.salary.min && job.salary.max ? " - " : ""}{" "}
                    {/* Add hyphen only if both min and max exist */}
                    {job.salary.max && `${job.salary.max}`}
                    {job.salary.currency && ` ${job.salary.currency}`}
                    {job.salary.isNegotiable && " (Negotiable)"}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Display Application URL if available */}
            {job.applicationUrl && (
              <div className="meta-item">
                <FiBriefcase className="meta-icon" /> {/* Icon for apply */}
                <div>
                  <span className="meta-label">Apply Here</span>
                  <span className="meta-value">
                    <a
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline" // Tailwind classes for link styling
                    >
                      click here
                    </a>
                  </span>
                </div>
              </div>
            )}

            <div className="meta-item">
              <FiUsers className="meta-icon" /> {/* Users icon */}
              <div>
                <span className="meta-label">Posted By</span>
                {/* Access populated user data (assuming postedBy is populated) */}
                <span className="meta-value">
                  {job.postedBy ? job.postedBy.name : "N/A"}{" "}
                  {/* Use schema field name */}
                </span>
              </div>
            </div>
            <div className="meta-item">
              <FiCalendar className="meta-icon" /> {/* Calendar icon */}
              <div>
                <span className="meta-label">Created At</span>
                <span className="meta-value">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "N/A"}{" "}
                </span>
              </div>
            </div>
            <div className="meta-item">
              <FiCalendar className="meta-icon" /> {/* Calendar icon */}
              <div>
                <span className="meta-label">Last Updated</span>
                <span className="meta-value">
                  {job.updatedAt
                    ? new Date(job.updatedAt).toLocaleDateString()
                    : "N/A"}{" "}
                </span>
              </div>
            </div>
            {/* Display Views and Applications Count */}
            <div className="meta-item">
              <FiUsers className="meta-icon" /> {/* Users icon */}
              <div>
                <span className="meta-label">Views</span>
                <span className="meta-value">
                  {job.views !== undefined ? job.views : 0}
                </span>{" "}
                {/* Use schema field name */}
              </div>
            </div>
            <div className="meta-item">
              <FiUsers className="meta-icon" /> {/* Users icon */}
              <div>
                <span className="meta-label">Total Applications</span>
                <span className="meta-value">
                  {job.applicationsCount !== undefined
                    ? job.applicationsCount
                    : 0}
                </span>{" "}
                {/* Use schema field name */}
              </div>
            </div>
          </div>
        </div>
        {/* Status management section */}
        {/* Check permission for editing */}
        {hasPermission && hasPermission("edit:jobs") && (
          <div className="status-management-section">
            {" "}
            {/* Using a consistent section class */}
            <h3>Status Management</h3>
            <div className="status-actions">
              {/* Map button clicks to handleStatusChange with status strings */}
              <button
                onClick={() => handleStatusChange("active")} // Send 'active' string to backend
                className={`status-btn ${
                  job.isActive === true ? "active" : ""
                } ${isStatusUpdating ? "updating" : ""}`}
                disabled={
                  job.isActive === true || isStatusUpdating || isDeleting
                } // Disable if already active or busy
              >
                {isStatusUpdating && job.isActive === true
                  ? "Updating..."
                  : "Active"}
              </button>
              {/* Added Paused/Inactive button */}
              <button
                onClick={() => handleStatusChange("paused")} // Send 'paused' or map to 'inactive'
                className={`status-btn ${
                  job.isActive === false ? "active" : ""
                } ${isStatusUpdating ? "updating" : ""}`}
                disabled={
                  job.isActive === false || isStatusUpdating || isDeleting
                } // Disable if already inactive or busy
              >
                {isStatusUpdating && job.isActive === false
                  ? "Updating..."
                  : "Paused / Inactive"}
              </button>
              {/* Removed buttons for 'expired' and 'draft' - manage status via isActive */}
            </div>
          </div>
        )}
        {/* Applicant statistics */}
        <div className="applicant-stats-section">
          {" "}
          {/* Using a consistent section class */}
          <h3>Application Statistics</h3>
          <div className="stats-cards">
            {/* Display calculated applicant stats */}
            <div className={`stat-card total ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.total}</span>
              <span className="stat-label">Total Applicants</span>
            </div>
            <div className={`stat-card ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className={`stat-card ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.reviewing}</span>
              <span className="stat-label">Reviewing</span>
            </div>
            <div className={`stat-card ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.shortlisted}</span>
              <span className="stat-label">Shortlisted</span>
            </div>
            <div className={`stat-card ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.interview}</span>
              <span className="stat-label">Interviewed</span>
            </div>
            <div className={`stat-card ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.accepted}</span>
              <span className="stat-label">Accepted</span>
            </div>
            <div className={`stat-card ${theme}`}>
              {" "}
              {/* Pass theme for styling */}
              <span className="stat-number">{applicantStats.rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
          <div className="application-actions">
            {/* Link to view applications for this job */}
            <Link
              to={`/admin/applications/jobs/${jobId}`} // Assuming this is the correct route for job applications list
              className="view-applications-btn"
              disabled={applicantStats.total === 0} // Disable if no applications
            >
              View All Applications ({applicantStats.total})
            </Link>
          </div>
        </div>
        {/* Job Description and Details - Assuming description, requirements, benefits, etc. are in the schema */}
        <div className="job-details-sections">
          {" "}
          {/* Using a consistent section class */}
          {/* Description */}
          <div className="detail-section">
            <h3>Description</h3>
            <div className="detail-content prose">
              {" "}
              {/* Use prose class for basic text styling if available */}
              <p className="whitespace-pre-line">
                {" "}
                {/* Preserve line breaks */}
                {job.description || "No description provided"}
              </p>
            </div>
          </div>
          {/* Requirements */}
          <div className="detail-section">
            <h3>Requirements</h3>
            <div className="detail-content prose">
              {job.requirements &&
              Array.isArray(job.requirements) &&
              job.requirements.length > 0 ? (
                <ul>
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p>No requirements specified</p>
              )}
            </div>
          </div>
          {/* Responsibilities */}
          <div className="detail-section">
            <h3>Responsibilities</h3>
            <div className="detail-content prose">
              {job.responsibilities &&
              Array.isArray(job.responsibilities) &&
              job.responsibilities.length > 0 ? (
                <ul>
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              ) : (
                <p>No responsibilities specified</p>
              )}
            </div>
          </div>
          {/* Benefits (Optional) */}
          {job.benefits &&
            Array.isArray(job.benefits) &&
            job.benefits.length > 0 && (
              <div className="detail-section">
                <h3>Benefits</h3>
                <div className="detail-content prose">
                  <ul>
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          {/* Skills (Optional) */}
          {job.skills && Array.isArray(job.skills) && job.skills.length > 0 && (
            <div className="detail-section">
              <h3>Skills</h3>
              <div className="detail-content prose">
                <p>{job.skills.join(", ")}</p>{" "}
                {/* Join skills with comma and space */}
              </div>
            </div>
          )}
        </div>
        {/* Activity log - Keeping as mock data for now */}
        <div className="activity-log-section">
          {" "}
          {/* Using a consistent section class */}
          <h3>Activity Log (Mock Data)</h3>
          <div className="log-entries">
            <div className="log-entry">
              <span className="log-time">Today, 10:45 AM</span>
              <span className="log-action">Job posting viewed</span>
            </div>
            <div className="log-entry">
              <span className="log-time">Yesterday, 3:22 PM</span>
              <span className="log-action">
                Status changed to {mapStatusForDisplay(job.isActive)}
              </span>
            </div>
            <div className="log-entry">
              <span className="log-time">
                {job.createdAt
                  ? new Date(job.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
              <span className="log-action">Job posting created</span>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End job-sections-wrapper */}
      {/* Page Footer Section */}
      <div className="page-footer">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="back-btn"
          disabled={isDeleting || isStatusUpdating}
        >
          Back to Jobs List
        </button>
      </div>
      {/* Add your CSS styles here or in a separate CSS module */}
      {/* Applying styles based on the InternshipDetail.js structure and your theme class */}
      <style jsx>{`
        .job-detail-container {
          border-radius: 0.5rem;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .job-detail-container.light {
          background-color: #ffffff;
          color: #111827;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .job-detail-container.dark {
          background-color: #1f2937;
          color: #e0e0e0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Apply padding and border-bottom to direct children of the sections wrapper */
        .page-header,
        .job-sections-wrapper > * {
          padding: 1.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }
        /* Remove bottom border for the last section in the wrapper */
        .job-sections-wrapper > *:last-child {
          border-bottom: none;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0; /* Padding is handled by the rule above */
          flex-wrap: wrap; /* Allow wrapping */
          gap: 1rem; /* Add gap between items when wrapping */
        }

        .breadcrumb {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

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

        /* Styling for Header Action Buttons (Edit, Delete) and Back Button */
        .edit-btn,
        .delete-btn,
        .back-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
          text-decoration: none; /* For Link/a elements */
          display: inline-flex; /* Align text and potential icon */
          align-items: center;
          justify-content: center;
          border: none; /* Ensure buttons have no default border */
        }

        .edit-btn {
          background-color: #3b82f6; /* Blue */
          color: white;
        }

        .edit-btn:hover:not(:disabled) {
          background-color: #2563eb; /* Darker blue */
        }

        .delete-btn {
          background-color: #ef4444; /* Red */
          color: white;
        }

        .delete-btn:hover:not(:disabled) {
          background-color: #dc2626; /* Darker red */
        }

        .back-btn {
          background-color: ${theme === "dark"
            ? "#374151"
            : "#f3f4f6"}; /* Gray */
          color: ${theme === "dark"
            ? "#e0e0e0"
            : "#111827"}; /* Text color based on theme */
        }

        .back-btn:hover:not(:disabled) {
          background-color: ${theme === "dark"
            ? "#4b5563"
            : "#e5e7eb"}; /* Darker gray */
        }

        /* Styling for Status Update Buttons */
        .status-management-section {
          /* Gets padding and border from .job-sections-wrapper > * */
          margin-top: 0; /* Remove default margin */
          margin-bottom: 0; /* Remove default margin */
        }
        .status-management-section h3 {
          font-size: 1.25rem; /* Consistent heading size */
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }
        .status-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
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
        /* Styles for the 'active' status button */
        .status-btn.active {
          background-color: #22c55e; /* Green */
          color: white;
          border-color: #22c55e;
        }
        /* Status button hover effect when NOT active */
        .status-btn:hover:not(:disabled):not(.active) {
          background-color: ${theme === "dark" ? "#4b5563" : "#f3f4f6"};
        }
        /* Styles for the 'updating' state (applies to any status button) */
        .status-btn.updating {
          opacity: 0.8;
        }

        /* Disabled state for all buttons */
        .edit-btn:disabled,
        .delete-btn:disabled,
        .back-btn:disabled,
        .status-btn:disabled,
        .view-applications-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .job-header {
          /* This section gets padding from the .job-sections-wrapper > * rule */
          margin-bottom: 0; /* Removed bottom margin as border adds separation */
        }

        .job-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .job-title-section h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: inherit;
        }

        .job-meta {
          display: grid; /* Use grid for layout */
          grid-template-columns: repeat(
            auto-fill,
            minmax(250px, 1fr)
          ); /* More responsive columns */
          gap: 1.25rem; /* Slightly increased gap */
          font-size: 0.9rem;
        }

        .meta-item {
          display: flex;
          align-items: flex-start; /* Align items to the top */
          gap: 0.5rem; /* Space between icon/label and value */
        }

        .meta-icon {
          flex-shrink: 0; /* Prevent icon from shrinking */
          margin-top: 0.25rem; /* Align icon with the top of the text block */
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; /* Icon color */
        }

        .meta-item > div {
          display: flex;
          flex-direction: column; /* Stack label and value */
        }

        .meta-label {
          font-weight: 600;
          color: ${theme === "dark" ? "#9ca3af" : "#4b5563"}; /* Label color */
          margin-bottom: 0.125rem; /* Small space between label and value */
          font-size: 0.875rem; /* Slightly smaller font for label */
        }

        .meta-value {
          color: inherit; /* Value color */
          font-weight: 500; /* Slightly less bold than label */
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

        .applicant-stats-section {
          /* Gets padding and border from .job-sections-wrapper > * */
          margin-top: 0; /* Remove default margin */
          margin-bottom: 0; /* Remove default margin */
        }
        .applicant-stats-section h3 {
          font-size: 1.25rem; /* Consistent heading size */
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .stats-cards {
          display: grid; /* Use grid for stats cards */
          grid-template-columns: repeat(
            auto-fit,
            minmax(130px, 1fr)
          ); /* Slightly wider cards */
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background-color: ${theme === "dark" ? "#2a3544" : "#ffffff"};
          padding: 1.25rem 1rem;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .stat-card.total {
          background-color: #4f46e5; /* Indigo color for total */
          color: white;
          box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3); /* Subtle shadow for the card */
          border: none; /* Remove border for total card */
        }

        .stat-number {
          font-size: 2rem; /* Larger numbers */
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-card.total .stat-number {
          color: white;
        }

        .stat-label {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#4b5563"};
          font-weight: 500;
        }

        /* Add specific rule for stat-label within total stat-card */
        .stat-card.total .stat-label {
          color: white; /* Ensure label is white in total card */
        }

        .application-actions {
          text-align: center;
          margin-top: 1.5rem;
        }

        /* Styling for the "View All Applications" button/link */
        .view-applications-btn {
          background-color: #6366f1; /* Indigo */
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: background-color 0.2s;
          text-decoration: none;
          display: inline-flex; /* Use inline-flex to center content if needed */
          align-items: center;
          justify-content: center;
        }

        .view-applications-btn:hover:not(:disabled) {
          background-color: #4f46e5; /* Darker indigo */
        }

        .job-details-sections {
          /* Gets padding and border from .job-sections-wrapper > * */
          margin-top: 0; /* Remove default margin */
          margin-bottom: 0; /* Remove default margin */
        }
        .detail-section {
          margin-bottom: 1.5rem;
        }
        /* Remove margin from the last detail section */
        .detail-section:last-child {
          margin-bottom: 0;
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
        /* Style for lists within detail content */
        .detail-content ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 0.75rem;
        }
        /* Style for list items */
        .detail-content ul li {
          margin-bottom: 0.5rem;
        }

        .activity-log-section {
          /* Gets padding and border from .job-sections-wrapper > * */
          margin-top: 0; /* Remove default margin */
          margin-bottom: 0; /* Remove default margin */
        }
        .activity-log-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: inherit;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .log-entries {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .log-entry {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .log-time {
          font-weight: 500;
          flex-shrink: 0; /* Prevent time from shrinking */
        }

        .log-action {
          flex-grow: 1; /* Allow action text to take space */
        }

        .page-footer {
          text-align: center;
          margin-top: 0; /* Padding handled by the rule above */
        }

        /* Error message styling */
        .error-message {
          color: #ef4444; /* Red color for errors */
          background-color: ${theme === "dark"
            ? "#fecaca"
            : "#fee2e2"}; /* Light red background */
          border: 1px solid #f87171;
          padding: 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1.5rem;
          word-break: break-word; /* Prevent long messages from overflowing */
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          /* Adjust padding for sections on medium screens */
          .page-header,
          .job-sections-wrapper > * {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start; /* Align buttons to the left */
          }

          .job-title-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .job-title-section h1 {
            font-size: 1.5rem;
          }

          .job-meta {
            grid-template-columns: repeat(
              auto-fill,
              minmax(180px, 1fr)
            ); /* Adjust columns */
            gap: 1rem; /* Adjust gap */
          }
          /* Ensure company logo doesn't span two columns on smaller screens */
          .meta-item.company-logo {
            grid-column: span 1;
          }

          .status-btn {
            padding: 0.5rem 1rem;
            min-width: auto; /* Allow status buttons to shrink */
          }

          /* Adjust heading sizes */
          .status-management-section h3,
          .applicant-stats-section h3,
          .job-details-sections h3,
          .activity-log-section h3 {
            font-size: 1.1rem;
          }

          /* Adjust stats card layout */
          .stats-cards {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.75rem;
          }
          /* Adjust stats card padding */
          .stat-card {
            padding: 1rem 0.75rem;
          }
          /* Adjust stat number size */
          .stat-number {
            font-size: 1.8rem;
          }

          /* Adjust log entry layout */
          .log-entry {
            flex-direction: column;
            gap: 0.25rem;
          }
        }

        @media (max-width: 480px) {
          /* Further reduce padding on small screens */
          .page-header,
          .job-sections-wrapper > * {
            padding: 0.75rem;
          }

          .job-header {
            padding-bottom: 0.75rem; /* Adjusted padding-bottom */
          }

          .job-title-section h1 {
            font-size: 1.3rem;
          }

          .job-meta {
            gap: 0.75rem; /* Reduced gap */
          }

          .stats-cards {
            gap: 0.5rem; /* Further reduced gap */
          }
          /* Adjust stats card padding */
          .stat-card {
            padding: 0.75rem 0.5rem;
          }
          /* Adjust stat number size */
          .stat-number {
            font-size: 1.5rem;
          }

          /* Adjust status button padding */
          .status-btn {
            padding: 0.4rem 0.8rem;
          }
          /* Adjust action button padding */
          .edit-btn,
          .delete-btn,
          .back-btn {
            padding: 0.4rem 0.8rem;
          }

          /* Adjust heading sizes */
          .status-management-section h3,
          .applicant-stats-section h3,
          .job-details-sections h3,
          .activity-log-section h3 {
            font-size: 1rem; /* Smaller heading size */
          }
        }
      `}</style>
    </div>
  );
};

export default JobDetail;
