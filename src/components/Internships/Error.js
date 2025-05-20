// ErrorInternships.js
import React from "react";

function ErrorInternships({ theme, error }) {
  return (
    <div className="error-internships">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ef4444" // Standard error color
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="error-icon"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>Error loading internships</h3>
      <p>
        {typeof error === "string" ? error : "An unexpected error occurred."}
      </p>
      <p>Please check your connection or try again later.</p>

      <style jsx>{`
        .error-internships {
          text-align: center;
          padding: 2.5rem 1rem; /* Increased padding */
          width: 100%;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"}; /* Adjusted colors */
          background-color: ${theme === "dark"
            ? "#1f1f1f"
            : "#f9f9f9"}; /* Subtle background */
          border-radius: 8px; /* Added border-radius */
          border: 1px solid ${theme === "dark" ? "#333" : "#eee"}; /* Added border */
          margin: 1rem auto;
          max-width: 600px;
        }

        .error-icon {
          width: 44px; /* Slightly smaller */
          height: 44px;
          margin-bottom: 1rem;
          stroke: #ef4444; /* Ensure icon color */
        }

        .error-internships h3 {
          font-size: 1.25rem; /* Adjusted font size */
          margin-bottom: 0.5rem;
          color: #ef4444;
        }

        .error-internships p {
          opacity: 0.8; /* Adjusted opacity */
          margin-bottom: 0.5rem;
          font-size: 0.9rem; /* Adjusted font size */
        }
        .error-internships p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default ErrorInternships;
