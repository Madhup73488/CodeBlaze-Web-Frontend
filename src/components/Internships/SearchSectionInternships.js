// SearchSectionInternships.js
import React from "react";

function SearchSectionInternships({
  theme,
  primaryColor,
  searchQuery,
  setSearchQuery,
  // showFilters prop was in job.txt, often used for direct visibility toggle.
  // For modal, a specific function like openFilterModal is clearer.
  openFilterModal,
  activeFiltersCount = 0, // To show if any filters are active
  resetFilters,
}) {
  return (
    <section className="search-section-internships">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search internships, companies, skills..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="search-button"
          style={{ backgroundColor: primaryColor }}
          aria-label="Search"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <div className="filter-actions">
        <button
          className="filter-button"
          onClick={openFilterModal} // Changed from setShowFilters for clarity
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter-icon"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filter Internships {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
        </button>
        {(activeFiltersCount > 0 || searchQuery !== "") && (
          <button className="reset-filters-button" onClick={resetFilters}>
            Reset All
          </button>
        )}
      </div>

      <style jsx>{`
        .search-section-internships {
          margin-bottom: 2rem;
        }

        .search-container {
          display: flex;
          max-width: 700px; /* Adjusted width */
          margin: 0 auto;
          position: relative;
        }

        .search-input {
          flex-grow: 1;
          padding: 0.9rem 1.2rem; /* Adjusted padding */
          padding-right: 45px; /* Space for search button */
          border-radius: 25px; /* Adjusted border-radius */
          border: 1.5px solid ${theme === "dark" ? "#333" : "#ddd"}; /* Adjusted border */
          background: ${theme === "dark" ? "#1f1f1f" : "#fff"}; /* Adjusted background */
          color: ${theme === "dark" ? "#eee" : "#222"}; /* Adjusted color */
          font-size: 0.95rem; /* Adjusted font-size */
          transition: all 0.2s ease-in-out;
        }

        .search-input:focus {
          outline: none;
          border-color: ${primaryColor};
          box-shadow: 0 0 0 2px ${primaryColor}40; /* Adjusted shadow */
        }

        .search-button {
          position: absolute;
          right: 6px; /* Adjusted position */
          top: 6px; /* Adjusted position */
          width: 34px; /* Adjusted size */
          height: 34px; /* Adjusted size */
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s ease, opacity 0.2s ease;
        }

        .search-button:hover {
          opacity: 0.85;
        }

        .search-button svg {
          width: 18px; /* Adjusted icon size */
          height: 18px; /* Adjusted icon size */
        }

        .filter-actions { /* Changed from filter-toggle */
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 1.2rem; /* Adjusted margin */
          gap: 1rem;
        }

        .filter-button {
          background: ${theme === "dark" ? "#222" : "#f0f0f0"};
          border: 1px solid ${theme === "dark" ? "#333" : "#ddd"};
          color: ${theme === "dark" ? "#eee" : "#333"};
          font-size: 0.9rem; /* Adjusted font-size */
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem; /* Added padding */
          border-radius: 20px; /* Added border-radius */
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .filter-button:hover {
          background: ${theme === "dark" ? "#333" : "#e0e0e0"};
        }

        .filter-icon {
          width: 16px; /* Adjusted icon size */
          height: 16px; /* Adjusted icon size */
        }

        .reset-filters-button {
          background: none;
          border: none;
          font-size: 0.85rem; /* Adjusted font-size */
          opacity: 0.8;
          cursor: pointer;
          text-decoration: underline;
          color: ${theme === "dark" ? "#bbb" : "#555"}; /* Adjusted color */
          padding: 0.4rem; /* Added padding for better click area */
        }
        .reset-filters-button:hover {
            color: ${primaryColor};
            opacity: 1;
        }
      `}</style>
    </section>
  );
}

export default SearchSectionInternships;