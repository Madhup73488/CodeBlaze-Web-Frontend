import React from "react";

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
  // Function to format the salary display string - Moved from JobSeekers
  const formatSalary = (salary) => {
    if (
      !salary ||
      (salary.min === undefined &&
        salary.max === undefined &&
        !salary.isNegotiable)
    ) {
      return "Salary not specified";
    }

    if (salary.isNegotiable) {
      return "Salary: Negotiable";
    }

    const hasMin = salary.min !== undefined && salary.min !== null;
    const hasMax = salary.max !== undefined && salary.max !== null;
    const currency = salary.currency || ""; // Use default or empty if currency is missing

    // Basic check if min/max are numeric before formatting
    const isMinNumeric = typeof salary.min === "number";
    const isMaxNumeric = typeof salary.max === "number";

    if (hasMin && isMinNumeric && hasMax && isMaxNumeric) {
      // Format in lakhs for INR, otherwise standard currency format
      if (currency === "INR") {
        const minInLakhs = (salary.min / 100000).toFixed(1);
        const maxInLakhs = (salary.max / 100000).toFixed(1);
        return `Salary: ₹${minInLakhs}L - ₹${maxInLakhs}L`;
      } else {
        const formatter = new Intl.NumberFormat("en-US", {
          // You can adjust locale
          style: "currency",
          currency: currency || "USD", // Default to USD if currency is empty
          maximumFractionDigits: 0, // Adjust as needed
          minimumFractionDigits: 0,
        });
        // Safely format numbers
        const formattedMin = isMinNumeric ? formatter.format(salary.min) : "";
        const formattedMax = isMaxNumeric ? formatter.format(salary.max) : "";
        return `Salary: ${formattedMin} - ${formattedMax}`;
      }
    } else if (hasMin && isMinNumeric) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      return `Salary: From ${formatter.format(salary.min)}`;
    } else if (hasMax && isMaxNumeric) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      return `Salary: Up to ${formatter.format(salary.max)}`;
    } else {
      // Fallback if salary object exists but min/max are not numeric
      if (salary.isNegotiable) return "Salary: Negotiable"; // Double-check negotiable
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
              savedJobs.includes(job?._id || job?.id) ? "saved" : ""
            }`}
            onClick={() => toggleSaveJob(job?._id || job?.id)}
            title={
              savedJobs.includes(job?._id || job?.id)
                ? "Remove from saved jobs"
                : "Save job"
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill={
                savedJobs.includes(job?._id || job?.id) ? primaryColor : "none"
              }
              stroke={
                savedJobs.includes(job?._id || job?.id)
                  ? primaryColor
                  : "currentColor"
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
          {/* Use job.location from the original API object */}
          <span>{job?.location || "Location not specified"}</span>{" "}
          {/* Use optional chaining */}
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
          {/* Use job.createdAt from the original API object and the passed formatDate function */}
          <span>
            Posted{" "}
            {job?.createdAt ? formatDate(job.createdAt) : "Date not specified"}
          </span>{" "}
          {/* Use optional chaining */}
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
          {/* Use the formatSalary function defined in this component */}
          <span>{formatSalary(job?.salary)}</span> {/* Use optional chaining */}
        </div>
        {/* The experience level field is not in your provided JSON.
            Unless your API includes 'experienceLevel', this will likely always show 'Experience not specified'. */}
        {/* <div className="detail-item">
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

          <span>{job?.experienceLevel || "Experience not specified"}</span>{" "}

        </div> */}

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
          {/* Use job.employmentType from the original API object */}
          <span>{job?.employmentType || "Type not specified"}</span>{" "}
          {/* Use optional chaining */}
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
          {/* Use job.workType from the original API object */}
          {/* Map workType values to display strings */}
          <span>
            {job?.workType === "remote"
              ? "Remote"
              : job?.workType === "hybrid"
              ? "Hybrid"
              : job?.workType === "onsite"
              ? "On-site"
              : "Work type not specified"}
          </span>{" "}
          {/* Use optional chaining */}
        </div>
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
              savedJobs.includes(job?._id || job?.id) ? "saved" : ""
            }`}
            onClick={() => toggleSaveJob(job?._id || job?.id)}
          >
            {savedJobs.includes(job?._id || job?.id) ? "Saved" : "Save"}
          </button>
          {/* Use job.applicationUrl from the original API object */}
          <a
            href={job?.applicationUrl} // Use optional chaining
            target="_blank"
            rel="noopener noreferrer"
            className={`apply-button ${
              appliedJobs.includes(job?._id || job?.id) ? "applied" : ""
            }`}
            style={{
              backgroundColor: appliedJobs.includes(job?._id || job?.id)
                ? "#22c55e"
                : primaryColor,
            }}
            onClick={() => toggleApplyJob(job?._id || job?.id)}
          >
            Apply
          </a>
        </div>
      </div>

      <style jsx>{`
        .job-card {
          background: ${theme === "dark" ? "#1a1a1a" : "#fff"};
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
          background: ${theme === "dark" ? "#2d2d2d" : "#f5f5f5"};
          border: 1px solid ${theme === "dark" ? "#3d3d3d" : "#e0e0e0"};
        }

        .company-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
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

        .job-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          padding: 0.3rem 0.6rem;
          background: ${theme === "dark" ? "#2d2d2d" : "#f5f5f5"};
          border-radius: 20px;
          color: ${theme === "dark" ? "#eee" : "#0a0a0a"};
          box-shadow: 0 1px 3px
            rgba(0, 0, 0, ${theme === "dark" ? "0.2" : "0.05"});
        }

        .detail-icon {
          width: 14px;
          height: 14px;
          margin-right: 0.4rem;
          opacity: 0.8;
          stroke: ${theme === "dark" ? "#bbb" : "#555"};
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

          .job-details {
            gap: 0.5rem;
            margin-bottom: 0.8rem;
            padding-bottom: 0.8rem;
          }

          .detail-item {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
          }

          .detail-icon {
            width: 12px;
            height: 12px;
            margin-right: 0.3rem;
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
