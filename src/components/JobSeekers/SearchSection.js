import React from "react";

function SearchSection({
  theme,
  primaryColor,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  filters,
  resetFilters,
}) {
  return (
    <section className="search-section">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for jobs, companies, or keywords..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="search-button"
          style={{ backgroundColor: primaryColor }}
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
      <div className="filter-toggle">
        <button
          className="filter-button"
          onClick={() => setShowFilters(!showFilters)}
          style={{ color: primaryColor }}
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
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        {(filters.salaryRange !== "any" ||
          filters.experienceLevel !== "any" ||
          filters.jobType !== "any" ||
          filters.location !== "any" ||
          filters.remote !== "any" ||
          filters.country !== "us" ||
          searchQuery !== "") && (
          <button className="reset-filters-button" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      <style jsx>{`
        .search-section {
          margin-bottom: 2rem;
        }

        .search-container {
          display: flex;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .search-input {
          flex-grow: 1;
          padding: 1rem 1.5rem;
          border-radius: 30px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: ${primaryColor};
          box-shadow: 0 0 0 3px ${primaryColor}33;
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 8px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .search-button:hover {
          opacity: 0.9;
        }

        .search-button svg {
          width: 20px;
          height: 20px;
        }

        .filter-toggle {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          gap: 1rem;
        }

        .filter-button {
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .filter-icon {
          width: 18px;
          height: 18px;
        }

        .reset-filters-button {
          background: none;
          border: none;
          font-size: 1rem;
          opacity: 0.7;
          cursor: pointer;
          text-decoration: underline;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }
      `}</style>
    </section>
  );
}

export default SearchSection;
