import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import StatusBadge from "../../components/common/StatusBadge";

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const {
    jobPostings,
    fetchJobPostings,
    hasPermission,
    loadingStates,
    errors,
    clearError,
  } = useAdmin();

  const [job, setJob] = useState(null);
  const [applicantStats, setApplicantStats] = useState({
    pending: 0,
    reviewing: 0,
    interviewed: 0,
    offered: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job data if not already loaded
  useEffect(() => {
    const loadJobData = async () => {
      if (jobPostings.length === 0) {
        await fetchJobPostings();
      }

      // Find the job in the list
      const foundJob = jobPostings.find((job) => job.id.toString() === jobId);
      setJob(foundJob);

      // Mock fetch applicant statistics
      await fetchApplicantStats(jobId);

      setIsLoading(false);
    };

    loadJobData();

    return () => {
      if (errors.jobPostings) {
        clearError("jobPostings");
      }
    };
  }, [jobId, jobPostings, fetchJobPostings]);

  // Mock fetch applicant statistics
  const fetchApplicantStats = async (jobId) => {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random stats for demo
        const mockStats = {
          pending: Math.floor(Math.random() * 20),
          reviewing: Math.floor(Math.random() * 15),
          interviewed: Math.floor(Math.random() * 10),
          offered: Math.floor(Math.random() * 5),
          rejected: Math.floor(Math.random() * 10),
        };
        setApplicantStats(mockStats);
        resolve(mockStats);
      }, 500);
    });
  };

  // Handle job deletion
  const handleDeleteJob = () => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      // Mock deletion - in a real app, this would be an API call
      console.log(`Deleting job with ID: ${jobId}`);
      alert("Job deleted successfully!");
      navigate("/admin/jobs");
    }
  };

  // Handle job status change
  const handleStatusChange = (newStatus) => {
    if (
      window.confirm(`Are you sure you want to mark this job as ${newStatus}?`)
    ) {
      // Mock status change - in a real app, this would be an API call
      console.log(`Changing job status to: ${newStatus}`);
      alert(`Job status changed to ${newStatus} successfully!`);
      // Update the local job state to reflect the change
      setJob((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Display loading state
  if (isLoading || loadingStates.jobPostings) {
    return <div className="loading-container">Loading job details...</div>;
  }

  // Display error if job not found
  if (!job) {
    return (
      <div className="error-container">
        <h2>Job Not Found</h2>
        <p>
          The job posting you're looking for doesn't exist or has been removed.
        </p>
        <button onClick={() => navigate("/admin/jobs")} className="back-btn">
          Back to Jobs List
        </button>
      </div>
    );
  }

  // Calculate the total number of applicants
  const totalApplicants = Object.values(applicantStats).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="job-detail-container">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/admin/jobs">Jobs</Link> &gt; {job.title}
        </div>
        <div className="header-actions">
          {hasPermission("edit:jobs") && (
            <button
              onClick={() => navigate(`/admin/jobs/${jobId}/edit`)}
              className="edit-btn"
            >
              Edit Job
            </button>
          )}
          {hasPermission("delete:jobs") && (
            <button onClick={handleDeleteJob} className="delete-btn">
              Delete Job
            </button>
          )}
        </div>
      </div>

      <div className="job-content">
        <div className="job-header">
          <div className="job-title-section">
            <h1>{job.title}</h1>
            <StatusBadge status={job.status} />
          </div>
          <div className="job-meta">
            <div className="meta-item">
              <span className="meta-label">Company:</span>
              <span className="meta-value">{job.company}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Location:</span>
              <span className="meta-value">{job.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Type:</span>
              <span className="meta-value">{job.type}</span>
            </div>
            {job.salary && (
              <div className="meta-item">
                <span className="meta-label">Salary:</span>
                <span className="meta-value">{job.salary}</span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-label">Posted:</span>
              <span className="meta-value">
                {new Date(job.posted).toLocaleDateString()}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Expires:</span>
              <span className="meta-value">
                {new Date(job.expires).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Status management section */}
        {hasPermission("edit:jobs") && (
          <div className="status-management">
            <h3>Status Management</h3>
            <div className="status-actions">
              <button
                onClick={() => handleStatusChange("active")}
                className={`status-btn ${
                  job.status === "active" ? "active" : ""
                }`}
                disabled={job.status === "active"}
              >
                Active
              </button>
              <button
                onClick={() => handleStatusChange("paused")}
                className={`status-btn ${
                  job.status === "paused" ? "active" : ""
                }`}
                disabled={job.status === "paused"}
              >
                Paused
              </button>
              <button
                onClick={() => handleStatusChange("expired")}
                className={`status-btn ${
                  job.status === "expired" ? "active" : ""
                }`}
                disabled={job.status === "expired"}
              >
                Expired
              </button>
              <button
                onClick={() => handleStatusChange("draft")}
                className={`status-btn ${
                  job.status === "draft" ? "active" : ""
                }`}
                disabled={job.status === "draft"}
              >
                Draft
              </button>
            </div>
          </div>
        )}

        {/* Applicant statistics */}
        <div className="applicant-stats">
          <h3>Application Statistics</h3>
          <div className="stats-cards">
            <div className="stat-card total">
              <span className="stat-number">{totalApplicants}</span>
              <span className="stat-label">Total Applicants</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{applicantStats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{applicantStats.reviewing}</span>
              <span className="stat-label">Reviewing</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{applicantStats.interviewed}</span>
              <span className="stat-label">Interviewed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{applicantStats.offered}</span>
              <span className="stat-label">Offered</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{applicantStats.rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
          <div className="application-actions">
            <Link
              to={`/admin/applications/jobs/${jobId}`}
              className="view-applications-btn"
            >
              View All Applications
            </Link>
          </div>
        </div>

        {/* Job description and details */}
        <div className="job-details">
          {job.description && (
            <div className="detail-section">
              <h3>Job Description</h3>
              <div className="detail-content">
                <p>{job.description}</p>
              </div>
            </div>
          )}

          {job.responsibilities && (
            <div className="detail-section">
              <h3>Responsibilities</h3>
              <div className="detail-content">
                <p>{job.responsibilities}</p>
              </div>
            </div>
          )}

          {job.requirements && (
            <div className="detail-section">
              <h3>Requirements</h3>
              <div className="detail-content">
                <p>{job.requirements}</p>
              </div>
            </div>
          )}

          {job.benefits && (
            <div className="detail-section">
              <h3>Benefits</h3>
              <div className="detail-content">
                <p>{job.benefits}</p>
              </div>
            </div>
          )}

          {job.applicationProcess && (
            <div className="detail-section">
              <h3>Application Process</h3>
              <div className="detail-content">
                <p>{job.applicationProcess}</p>
              </div>
            </div>
          )}
        </div>

        {/* Activity log */}
        <div className="activity-log">
          <h3>Activity Log</h3>
          <div className="log-entries">
            <div className="log-entry">
              <span className="log-time">Today, 10:45 AM</span>
              <span className="log-action">Job posting viewed by John Doe</span>
            </div>
            <div className="log-entry">
              <span className="log-time">Yesterday, 3:22 PM</span>
              <span className="log-action">Status changed to {job.status}</span>
            </div>
            <div className="log-entry">
              <span className="log-time">
                {new Date(job.posted).toLocaleDateString()}
              </span>
              <span className="log-action">Job posting created</span>
            </div>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <button onClick={() => navigate("/admin/jobs")} className="back-btn">
          Back to Jobs List
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
