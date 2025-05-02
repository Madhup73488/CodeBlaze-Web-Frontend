import React from "react";

function JobCard({
  job,
  theme,
  primaryColor,
  savedJobs,
  appliedJobs,
  toggleSaveJob,
  toggleApplyJob,
  getCompanyLogo,
  formatDate,
}) {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="company-logo-container">{getCompanyLogo(job)}</div>
        <div className="job-title-info">
          <h3 className="job-title">{job.job_title}</h3>
          <div className="company-name">{job.employer_name}</div>
        </div>
        <div className="job-actions">
          <button
            className={`save-job-button ${
              savedJobs.includes(job.job_id) ? "saved" : ""
            }`}
            onClick={() => toggleSaveJob(job.job_id)}
            title={
              savedJobs.includes(job.job_id)
                ? "Remove from saved jobs"
                : "Save job"
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill={savedJobs.includes(job.job_id) ? primaryColor : "none"}
              stroke={
                savedJobs.includes(job.job_id) ? primaryColor : "currentColor"
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
      <div className="job-details">
        <div className="detail-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="detail-icon"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{`${job.job_city ? job.job_city + ", " : ""}${
            job.job_state ? job.job_state : ""
          }${job.job_country ? ", " + job.job_country : ""}`}</span>
        </div>
        <div className="detail-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="detail-icon"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Posted {formatDate(job.job_posted_at_datetime_utc)}</span>
        </div>
        <div className="detail-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="detail-icon"
          >
            <path d="M12 1v22"></path>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span>{job.job_salary_description || "Salary not specified"}</span>
        </div>
        <div className="detail-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="detail-icon"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span>{job.job_experience_level || "Experience not specified"}</span>
        </div>
        <div className="detail-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="detail-icon"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>{job.job_employment_type || "Type not specified"}</span>
        </div>
        <div className="detail-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="detail-icon"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
            <path d="M2 2l7.586 7.586"></path>
            <circle cx="11" cy="11" r="2"></circle>
          </svg>
          <span>
            {job.job_is_remote
              ? "Remote"
              : job.job_hybrid
              ? "Hybrid"
              : "On-site"}
          </span>
        </div>
      </div>
      <div className="job-footer">
        <div className="job-metadata">
          <span className="job-posted">
            Posted on {formatDate(job.job_posted_at_datetime_utc)}
          </span>
        </div>
        <div className="action-buttons">
          <button
            className={`save-button ${
              savedJobs.includes(job.job_id) ? "saved" : ""
            }`}
            onClick={() => toggleSaveJob(job.job_id)}
          >
            {savedJobs.includes(job.job_id) ? "Saved" : "Save"}
          </button>
          <a
            href={job.job_apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`apply-button ${
              appliedJobs.includes(job.job_id) ? "applied" : ""
            }`}
            style={{
              backgroundColor: appliedJobs.includes(job.job_id)
                ? "#22c55e"
                : primaryColor,
            }}
            onClick={() => toggleApplyJob(job.job_id)}
          >
            Apply
          </a>
        </div>
      </div>

      <style jsx>{`
        .job-card {
          background: ${theme === "dark" ? "#111" : "#fff"};
          border-radius: 12px;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 1.5rem;
        }

        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px
            rgba(0, 0, 0, ${theme === "dark" ? "0.4" : "0.15"});
        }

        .job-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
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
          margin-right: 0.8rem;
          flex-shrink: 0;
        }

        .company-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .company-logo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
        }

        .job-title-info {
          flex: 1;
          min-width: 0;
        }

        .job-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .company-name {
          font-size: 0.95rem;
          opacity: 0.8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .job-actions {
          position: absolute;
          top: 0;
          right: 0;
        }

        .save-job-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-job-button svg {
          width: 20px;
          height: 20px;
          transition: all 0.3s ease;
        }

        .job-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          padding: 0.2rem 0.6rem;
          background: ${theme === "dark" ? "#1a1a1a" : "#f5f5f5"};
          border-radius: 16px;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .detail-icon {
          width: 14px;
          height: 14px;
          margin-right: 0.4rem;
          opacity: 0.8;
        }

        .job-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .job-metadata {
          font-size: 0.85rem;
          opacity: 0.7;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .action-buttons {
          display: flex;
          gap: 0.8rem;
        }

        .save-button {
          padding: 0.6rem 1rem;
          border-radius: 5px;
          border: 1px solid ${theme === "dark" ? "#555" : "#ddd"};
          background: transparent;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-button:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .save-button.saved {
          border-color: ${primaryColor};
          color: ${primaryColor};
          background-color: ${primaryColor}10;
        }

        .apply-button {
          padding: 0.6rem 1rem;
          border-radius: 5px;
          border: none;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.3s ease;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .apply-button:hover {
          opacity: 0.9;
        }

        .apply-button.applied {
          background-color: #22c55e !important;
        }

        @media (max-width: 767px) {
          .job-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }

          .job-actions {
            position: static;
            margin-top: 0.8rem;
          }

          .company-logo-container {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default JobCard;
