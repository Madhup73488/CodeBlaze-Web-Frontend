// NoResultsInternships.js
import React from "react";

function NoResultsInternships({ theme, primaryColor, resetFilters }) {
  return (
    <div className="no-results-internships">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={primaryColor || (theme === "dark" ? "#777" : "#999")} // Default stroke
        strokeWidth="1.5" // Slightly thinner
        strokeLinecap="round"
        strokeLinejoin="round"
        className="no-results-icon"
      >
        {/* A more search/empty related icon */}
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="13.5" y1="8.5" x2="8.5" y2="13.5"></line>{" "}
        {/* Small cross inside circle */}
        <line x1="8.5" y1="8.5" x2="13.5" y2="13.5"></line>
      </svg>
      <h3>No internships found</h3>
      <p>
        Try different keywords or adjust your filters to find what you're
        looking for.
      </p>
      {resetFilters && ( // Conditionally render button if resetFilters is provided
        <button
          className="clear-filters-button"
          onClick={resetFilters}
          style={{
            borderColor: primaryColor,
            color: primaryColor,
          }}
        >
          Clear All Filters
        </button>
      )}

      <style jsx>{`
        .no-results-internships {
          text-align: center;
          padding: 3rem 1rem;
          width: 100%;
          color: ${theme === "dark" ? "#bbb" : "#444"};
          background-color: ${theme === "dark" ? "#1c1c1c" : "#fdfdfd"};
          border-radius: 8px;
          border: 1px solid ${theme === "dark" ? "#2f2f2f" : "#f0f0f0"};
          margin: 1rem auto;
          max-width: 600px;
        }

        .no-results-icon {
          width: 52px; /* Adjusted size */
          height: 52px;
          margin-bottom: 1.2rem; /* Adjusted margin */
          opacity: 0.6;
        }

        .no-results-internships h3 {
          font-size: 1.35rem; /* Adjusted font size */
          margin-bottom: 0.75rem; /* Adjusted margin */
          font-weight: 600;
          color: ${theme === "dark" ? "#e0e0e0" : "#222"};
        }

        .no-results-internships p {
          opacity: 0.8;
          margin-bottom: 1.5rem;
          font-size: 0.95rem; /* Adjusted font size */
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .clear-filters-button {
          background: transparent;
          border: 1.5px solid; /* Set by style prop */
          color: ${primaryColor}; /* Set by style prop */
          font-weight: 500;
          cursor: pointer;
          padding: 0.6rem 1.2rem; /* Adjusted padding */
          border-radius: 20px; /* Pill shape */
          transition: background-color 0.2s ease, color 0.2s ease;
          font-size: 0.9rem;
        }
        .clear-filters-button:hover {
          background-color: ${primaryColor}20; /* Light background on hover */
        }
      `}</style>
    </div>
  );
}

export default NoResultsInternships;
