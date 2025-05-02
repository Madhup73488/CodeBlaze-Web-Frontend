import React from "react";

function NoResults({ theme, primaryColor, resetFilters }) {
  return (
    <div className="no-results">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="no-results-icon"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>No jobs found</h3>
      <p>Try different keywords or adjust your filters</p>
      <button
        className="clear-search"
        onClick={resetFilters}
        style={{ color: primaryColor }}
      >
        Clear filters
      </button>

      <style jsx>{`
        .no-results {
          text-align: center;
          padding: 3rem 0;
          width: 100%;
        }

        .no-results-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .no-results p {
          opacity: 0.7;
          margin-bottom: 1.5rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .clear-search {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.5rem 1rem;
        }
      `}</style>
    </div>
  );
}

export default NoResults;