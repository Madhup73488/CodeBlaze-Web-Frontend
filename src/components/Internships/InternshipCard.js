// InternshipCard.js

import React from "react";

import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation



const InternshipCard = ({

  internship,

  theme,

  primaryColor,

  savedInternships,

  appliedInternships,

  toggleSaveInternship,

  getCompanyLogo,

  formatDate,

}) => {

  const navigate = useNavigate(); // Initialize useNavigate hook



  const isSaved = savedInternships.includes(internship.id);

  const isApplied = appliedInternships.includes(internship.id);



  return (

    <div className={`internship-card ${theme}`}>

      <div className="card-header">

        <div className="company-info">

          <div className="company-logo-container">

            {getCompanyLogo(internship)}

          </div>

          <div className="company-details">

            <h3 className="company-name">{internship.company}</h3>

            <p className="location-type">

              {internship.location} ({internship.workType})

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

        <div className="detail-item">

          <span className="detail-label">Stipend:</span>

          <span className="detail-value">

            {internship.internshipFee && internship.internshipFee.amount

              ? `₹${internship.internshipFee.amount}/month`

              : "Unpaid"}

          </span>

        </div>

        <div className="detail-item">

          <span className="detail-label">Duration:</span>

          <span className="detail-value">

            {internship.duration || "Not specified"}

          </span>

        </div>

        <div className="detail-item">

          <span className="detail-label">Apply By:</span>

          <span className="detail-value">

            {formatDate(internship.applicationDeadline)}

          </span>

        </div>

      </div>



      <div className="skills-tags">

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

        {/* Changed the "Apply" button to "View Details" */}

        <Link

          to={`/internship/${internship.id}`}

          className="view-details-button"

          style={{ backgroundColor: primaryColor }}

        >

          View Details

        </Link>

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



