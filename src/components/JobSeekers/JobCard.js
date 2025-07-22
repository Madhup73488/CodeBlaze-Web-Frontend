import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function JobCard({
  job, // Now receives the original job object from the API
  theme,
  primaryColor,
  savedJobs,
  appliedJobs,
  toggleSaveJob,
  toggleApplyJob,
  getCompanyLogo, // This function is still defined and passed from JobSeekers
  formatDate, // This function is still defined and passed from JobSeekers
}) {
  const { isAuthenticated, openAuthModal } = useAuth();
  // Function to format the salary display string - Moved from JobSeekers
  const formatSalary = (job) => {
    if (!job) return "Salary not specified";

    if (job.salary_is_negotiable) {
      return "Salary: Negotiable";
    }

    const hasMin =
      job.salary_min !== undefined &&
      job.salary_min !== null &&
      job.salary_min > 0;
    const hasMax =
      job.salary_max !== undefined &&
      job.salary_max !== null &&
      job.salary_max > 0;

    const min = parseFloat(job.salary_min);
    const max = parseFloat(job.salary_max);

    const isMinNumeric = !isNaN(min);
    const isMaxNumeric = !isNaN(max);

    if (hasMin && isMinNumeric && hasMax && isMaxNumeric) {
      const minInLakhs = (min / 100000).toFixed(1);
      const maxInLakhs = (max / 100000).toFixed(1);
      return `Salary: ₹${minInLakhs}L - ₹${maxInLakhs}L`;
    } else if (hasMin && isMinNumeric) {
      const minInLakhs = (min / 100000).toFixed(1);
      return `Salary: From ₹${minInLakhs}L`;
    } else if (hasMax && isMaxNumeric) {
      const maxInLakhs = (max / 100000).toFixed(1);
      return `Salary: Up to ₹${maxInLakhs}L`;
    } else {
      return "Salary not specified";
    }
  };

  return (
    <div className="job-card">
      <div className="job-header">
        {/* Use the getCompanyLogo function passed from parent */}
        <div className="company-logo-container">
          {/* Pass the job object to getCompanyLogo */}
          {getCompanyLogo(job)}
        </div>
        <div className="job-title-info">
          {/* Use job.title from the original API object */}
          <h3 className="job-title">
            {job?.title || "Title not specified"}
          </h3>{" "}
          {/* Use optional chaining */}
          {/* Use job.company from the original API object */}
          <div className="company-name">
            {job?.company || "Company not specified"}
          </div>{" "}
          {/* Use optional chaining */}
        </div>
        <div className="job-actions">
          {/* Use job._id or job.id for the identifier */}
          <button
            className={`save-job-button ${
              savedJobs.includes(job?.id) ? "saved" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job?.id);
            }}
            title={
              savedJobs.includes(job?.id)
                ? "Remove from saved jobs"
                : "Save job"
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill={savedJobs.includes(job?.id) ? primaryColor : "none"}
              stroke={
                savedJobs.includes(job?.id) ? primaryColor : "currentColor"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="job-details-normal">
        <p>
          <strong>Location:</strong> {job?.location || "Not specified"}
        </p>
        <p>
          <strong>Salary:</strong> {formatSalary(job)}
        </p>
        <p>
          <strong>Type:</strong> {job?.employment_type || "Not specified"}
        </p>
        <p>
          <strong>Work Style:</strong> {job?.work_type || "Not specified"}
        </p>
      </div>

      <div className="job-footer">
        <div className="job-metadata">
          {/* Use job.createdAt from the original API object and the passed formatDate function */}
          <span className="job-posted">
            Posted on{" "}
            {job?.createdAt ? formatDate(job.createdAt) : "Date not specified"}
          </span>{" "}
          {/* Use optional chaining */}
        </div>
        <div className="action-buttons">
          {/* Use job._id or job.id for the identifier */}
          <button
            className={`save-button ${
              savedJobs.includes(job?.id) ? "saved" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job?.id);
            }}
          >
            {savedJobs.includes(job?.id) ? "Saved" : "Save"}
          </button>
          {/* Use job.application_url from the original API object */}
          <button
            className={`apply-button ${
              appliedJobs.includes(job?.id) ? "applied" : ""
            } ${!job?.application_url ? "disabled" : ""}`}
            style={{
              backgroundColor: appliedJobs.includes(job?.id)
                ? "#22c55e"
                : primaryColor,
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!isAuthenticated) {
                openAuthModal();
              } else {
                if (!job?.application_url?.trim()) {
                  return;
                }
                toggleApplyJob(job?.id);
                window.open(job.application_url, "_blank");
              }
            }}
          >
            Apply
          </button>
        </div>
      </div>

      <style jsx>{`
        .job-card {
          background: ${theme === "dark" ? "rgb(31, 41, 55)" : "#fff"};
          border-radius: 12px;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 1.25rem;
          height: 100%;
          border: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px
            rgba(0, 0, 0, ${theme === "dark" ? "0.4" : "0.15"});
        }

        .job-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          position: relative;
        }

        .company-logo-container {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-right: 0.75rem;
          flex-shrink: 0;
          background: white;
          border: 1px solid ${theme === "dark" ? "#3d3d3d" : "#e0e0e0"};
        }

        .company-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          margin-left: 23px;
        }

        .company-logo-placeholder {
          width: 100%;
          height: 100%;
          display: flex; /* Changed from none */
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: bold;
          color: ${theme === "dark" ? "#aaa" : "#555"};
        }
        /* Style for the parent container when image fails */
        .company-logo-container.placeholder-fallback .company-logo {
          display: none; /* Hide the broken image */
        }
        .company-logo-container.placeholder-fallback .company-logo-placeholder {
          display: flex; /* Show the placeholder */
        }
        /* Initial state where placeholder is shown if no URL */
        .company-logo-container:not(.placeholder-fallback) .company-logo {
          display: block; /* Show image if URL exists and no error */
        }
        .company-logo-container:not(.placeholder-fallback)
          .company-logo-placeholder {
          display: none; /* Hide placeholder if URL exists and no error */
        }

        .job-title-info {
          margin-top: 10px;
          flex: 1;
          min-width: 0;
          padding-right: 40px;
        }

        .job-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          width: 100%;
        }

        .company-name {
          font-size: 0.85rem;
          opacity: 0.85;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: ${theme === "dark" ? "#ccc" : "#333"};
        }

        .job-actions {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
        }

        .save-job-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        .save-job-button:hover {
          transform: scale(1.1);
        }

        .save-job-button svg {
          width: 20px;
          height: 20px;
          transition: all 0.3s ease;
        }

        .job-details-normal {
          margin-bottom: 1rem;
        }

        .job-details-normal p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#ccc" : "#333"};
        }

        .job-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.8rem;
          border-top: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .job-metadata {
          font-size: 0.75rem;
          opacity: 0.9;
          color: ${theme === "dark" ? "#bbb" : "#555"};
        }

        .action-buttons {
          display: flex;
          gap: 0.8rem;
        }

        .save-button {
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          border: 1.5px solid ${theme === "dark" ? "#555" : "#ddd"};
          background: transparent;
          color: ${theme === "dark" ? "#eee" : "#333"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
        }

        .save-button:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .save-button.saved {
          border-color: ${primaryColor};
          color: ${primaryColor};
          background-color: ${primaryColor}15;
        }

        .apply-button {
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          border: none;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 0.8rem;
          background-color: ${primaryColor};
        }

        .apply-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .apply-button.applied {
          background-color: #22c55e !important;
        }

        .apply-button.disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
          opacity: 0.7;
        }

        @media (max-width: 767px) {
          .job-card {
            padding: 1rem;
            border-radius: 10px;
          }

          .company-logo-container {
            width: 36px;
            height: 36px;
            margin-right: 0.7rem;
          }

          .job-title {
            font-size: 1rem;
          }
          .job-title-info {
            padding-right: 30px;
          }
          .company-name {
            font-size: 0.8rem;
          }

          .save-job-button svg {
            width: 18px;
            height: 18px;
          }

          .job-details-normal {
            margin-bottom: 0.8rem;
          }

          .job-details-normal p {
            font-size: 0.8rem;
          }

          .job-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
            padding-top: 0.7rem;
          }

          .action-buttons {
            width: 100%;
          }

          .save-button,
          .apply-button {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

export default JobCard;
