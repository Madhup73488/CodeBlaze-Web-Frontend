// InternshipCard.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const InternshipCard = ({
  internship,
  theme,
  primaryColor,
  savedInternships,
  appliedInternships,
  toggleSaveInternship,
  // getCompanyLogo, // We can now potentially use internship.company_logo_url directly
  formatDate, // Still needed for formatting the date string
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const isSaved = savedInternships.includes(internship.id);
  const isApplied = appliedInternships.includes(internship.id);

  const handleViewDetails = () => {
    // Navigate to the detail page for this specific internship
    navigate(`/internship/${internship.id}`);
  };

  // Determine display location: "WFH" if work_type is remote, else original location
  const displayLocation =
    internship.work_type &&
    typeof internship.work_type === "string" &&
    internship.work_type.toLowerCase().includes("remote") // Check for 'remote' in work_type
      ? "WFH"
      : internship.location;

  // Render company logo: use URL from backend, or a placeholder if not available
  const renderCompanyLogo = () => {
    if (internship.company_logo_url) {
      return (
        <img
          src={internship.company_logo_url}
          alt={`${internship.company} logo`}
          className="company-logo-img"
          // Add onerror to handle broken image links
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop
            e.target.src = `https://placehold.co/48x48/${
              theme === "dark" ? "333" : "f0f0f0"
            }/${
              theme === "dark" ? "f0f0f0" : "333"
            }?text=${internship.company.charAt(0)}`;
          }}
        />
      );
    }
    // Fallback to a simple initial if no logo URL
    return (
      <span className="company-logo-initial">
        {internship.company
          ? internship.company.charAt(0).toUpperCase()
          : "N/A"}
      </span>
    );
  };

  return (
    <div className={`internship-card ${theme}`}>
      <div className="card-header">
        <div className="company-info">
          <div className="company-logo-container">
            {renderCompanyLogo()} {/* Use the new renderCompanyLogo helper */}
          </div>
          <div className="company-details">
            <h3 className="company-name">{internship.company}</h3>
            <p className="location-type">
              {displayLocation} ({internship.work_type}) {/* Use work_type */}
            </p>
          </div>
        </div>
        <button
          className={`save-button ${isSaved ? "saved" : ""}`}
          onClick={() => toggleSaveInternship(internship.id)}
          aria-label={isSaved ? "Unsave Internship" : "Save Internship"}
          style={isSaved ? { color: primaryColor } : {}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isSaved ? primaryColor : "none"}
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      <h2 className="internship-title">{internship.title}</h2>

      <div className="details-grid">
        {/* Using internship_fee_amount for cost */}
        <div className="detail-item">
          <span className="detail-label">Cost:</span>
          <span className="detail-value">
            {internship.internship_fee_amount &&
            parseFloat(internship.internship_fee_amount) > 0
              ? `₹${parseFloat(internship.internship_fee_amount).toFixed(2)}` // Format to 2 decimal places
              : "Free"}
          </span>
        </div>
        {/* Duration is already correct */}
        <div className="detail-item">
          <span className="detail-label">Duration:</span>
          <span className="detail-value">
            {internship.duration || "Not specified"}
          </span>
        </div>
        {/* Using application_deadline for Apply By */}
        <div className="detail-item">
          <span className="detail-label">Apply By:</span>
          <span className="detail-value">
            {formatDate(internship.application_deadline)}
          </span>
        </div>
      </div>

      <div className="skills-tags">
        {/* Using skills for techstack */}
        {internship.skills &&
          internship.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="skill-tag"
              style={{
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
              }}
            >
              {skill}
            </span>
          ))}
        {internship.skills && internship.skills.length > 3 && (
          <span
            className="skill-tag"
            style={{
              backgroundColor: `${primaryColor}20`,
              color: primaryColor,
            }}
          >
            +{internship.skills.length - 3}
          </span>
        )}
      </div>

      <div className="card-footer">
        <button
          className="view-details-button"
          onClick={handleViewDetails}
          style={{ backgroundColor: primaryColor }}
        >
          View Details
        </button>
        {isApplied && (
          <span className="applied-label" style={{ color: primaryColor }}>
            Applied
          </span>
        )}
      </div>

      <style jsx>{`
        .internship-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .internship-card.dark {
          background-color: #1a1a1a;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          color: #f0f0f0;
        }

        .internship-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        .internship-card.dark:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .company-logo-container {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          background-color: #f0f0f0; /* Default background for logos */
        }
        .internship-card.dark .company-logo-container {
          background-color: #333;
        }
        .company-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Ensures the image fits within the container */
        }
        .company-logo-initial {
          font-size: 1.5rem;
          font-weight: bold;
          color: #555; /* Adjust color as needed */
        }
        .internship-card.dark .company-logo-initial {
          color: #ccc;
        }

        .company-details {
          display: flex;
          flex-direction: column;
        }

        .company-name {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0;
          color: ${theme === "dark" ? "#f0f0f0" : "#333"};
        }

        .location-type {
          font-size: 0.8rem;
          color: ${theme === "dark" ? "#b0b0b0" : "#666"};
          margin: 0;
        }

        .save-button {
          background: none;
          border: none;
          cursor: pointer;
          color: ${theme === "dark" ? "#aaa" : "#888"};
          padding: 0.5rem;
          border-radius: 50%;
          transition: background-color 0.2s, color 0.2s;
          flex-shrink: 0;
        }

        .save-button:hover {
          background-color: ${theme === "dark" ? "#333" : "#f0f0f0"};
          color: ${primaryColor};
        }

        .save-button svg {
          width: 22px;
          height: 22px;
        }

        .internship-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: ${theme === "dark" ? "#ffffff" : "#0a0a0a"};
          line-height: 1.3;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem 1rem;
          margin-bottom: 1.25rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .detail-label {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#b0b0b0" : "#777"};
          font-weight: 500;
          text-transform: uppercase;
        }

        .detail-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: ${theme === "dark" ? "#ffffff" : "#222"};
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .skill-tag {
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .card-footer {
          margin-top: auto; /* Pushes footer to the bottom */
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid ${theme === "dark" ? "#2a2a2e" : "#eee"};
        }

        .view-details-button {
          flex-grow: 1; /* Allows button to take available space */
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          border: none;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .view-details-button:hover {
          opacity: 0.9;
        }

        .applied-label {
          font-size: 0.85rem;
          font-weight: 600;
          background-color: ${primaryColor}20;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default InternshipCard;
