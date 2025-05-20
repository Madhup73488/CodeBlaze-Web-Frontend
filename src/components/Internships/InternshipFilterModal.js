// InternshipFilterModal.js
import React, { useEffect, useState } from "react";

const InternshipFilterModal = ({
  theme,
  filters = {},
  handleFilterChange,
  filterOptions = {},
  isOpen,
  onClose,
  categories = [],
  activeCategory,
  setActiveCategory,
  primaryColor,
}) => {
  const [animationState, setAnimationState] = useState("closed");

  useEffect(() => {
    let openTimer;
    let closeTimer;

    if (isOpen) {
      // When modal is supposed to open
      setAnimationState("opening");
      openTimer = setTimeout(() => setAnimationState("open"), 50); // Give a small delay for CSS transition setup
    } else {
      // When modal is supposed to close
      // Only transition to closing if it's currently open or in opening state
      if (animationState === "open" || animationState === "opening") {
        setAnimationState("closing");
        closeTimer = setTimeout(() => setAnimationState("closed"), 300); // Match CSS transition duration
      } else {
        // If it's already closed or in a non-open state, just ensure it's "closed"
        setAnimationState("closed");
      }
    }

    // Cleanup function to clear timeouts if the component unmounts or isOpen changes again
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, [isOpen]); // DEPENDENCY CHANGE: Only re-run this effect when isOpen changes.

  // This prevents rendering the modal when it's fully closed and not transitioning
  if (animationState === "closed" && !isOpen) {
    return null;
  }

  // Internship-specific filter options structure
  const safeFilterOptions = {
    stipendRange: filterOptions.stipendRange || [],
    workType: filterOptions.workType || [],
    location: filterOptions.location || [],
    duration: filterOptions.duration || [],
    educationLevel: filterOptions.educationLevel || [],
  };

  return (
    <div className={`modal-overlay ${animationState}`}>
      <div className={`modal-container ${animationState}`}>
        <div className="modal-header">
          <h2>Filter Internships</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          {categories && categories.length > 0 && (
            <div className="filter-section categories-section">
              <h3>Categories</h3>
              <div className="categories-container">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-button ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                    style={
                      activeCategory === category.id
                        ? {
                            borderColor: primaryColor,
                            color: primaryColor,
                            backgroundColor: `${primaryColor}20`,
                          }
                        : {}
                    }
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stipend Range Filter */}
          {safeFilterOptions.stipendRange.length > 0 && (
            <div className="filter-section">
              <h3>Stipend Range (Monthly)</h3>
              <div className="filter-options">
                {safeFilterOptions.stipendRange.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="stipendRange"
                      value={option.value}
                      checked={filters.stipendRange === option.value}
                      onChange={() =>
                        handleFilterChange("stipendRange", option.value)
                      }
                      style={{ accentColor: primaryColor }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Work Type Filter (Remote, Hybrid, Onsite) */}
          {safeFilterOptions.workType.length > 0 && (
            <div className="filter-section">
              <h3>Work Type</h3>
              <div className="filter-options">
                {safeFilterOptions.workType.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="workType"
                      value={option.value}
                      checked={filters.workType === option.value}
                      onChange={() =>
                        handleFilterChange("workType", option.value)
                      }
                      style={{ accentColor: primaryColor }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Location Filter - For simplicity, using a text input. Could be a dropdown with dynamic options */}
          <div className="filter-section">
            <h3>Location</h3>
            <input
              type="text"
              name="location"
              placeholder="e.g., Bengaluru, Remote"
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="text-input-filter"
            />
          </div>

          {/* Duration Filter - Example with predefined options */}
          {safeFilterOptions.duration &&
            safeFilterOptions.duration.length > 0 && (
              <div className="filter-section">
                <h3>Duration</h3>
                <div className="filter-options">
                  {safeFilterOptions.duration.map((option) => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="duration"
                        value={option.value}
                        checked={filters.duration === option.value}
                        onChange={() =>
                          handleFilterChange("duration", option.value)
                        }
                        style={{ accentColor: primaryColor }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

          {/* Education Level Filter */}
          {safeFilterOptions.educationLevel &&
            safeFilterOptions.educationLevel.length > 0 && (
              <div className="filter-section">
                <h3>Education Level</h3>
                <div className="filter-options">
                  {safeFilterOptions.educationLevel.map((option) => (
                    <label key={option.value} className="filter-option">
                      <input
                        type="radio"
                        name="educationLevel"
                        value={option.value}
                        checked={filters.educationLevel === option.value}
                        onChange={() =>
                          handleFilterChange("educationLevel", option.value)
                        }
                        style={{ accentColor: primaryColor }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
        </div>

        <div className="modal-footer">
          <button
            className="clear-button"
            onClick={() => {
              // Call a more comprehensive reset specific to this modal if needed
              handleFilterChange("stipendRange", "any");
              handleFilterChange("workType", "any");
              handleFilterChange("location", "");
              handleFilterChange("duration", "any");
              handleFilterChange("educationLevel", "any");
              if (categories.length > 0)
                setActiveCategory(categories[0]?.id || "all");
            }}
          >
            Clear Filters
          </button>
          <button
            className="apply-button"
            onClick={onClose}
            style={{ backgroundColor: primaryColor }}
          >
            Apply Filters
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Base Modal Styles (mostly from job.txt) */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: background 0.3s ease;
        }
        .modal-overlay.opening,
        .modal-overlay.open {
          background: rgba(0, 0, 0, 0.6);
        }
        .modal-overlay.closing {
          background: rgba(0, 0, 0, 0);
        }

        .modal-container {
          background: ${theme === "dark" ? "#18181B" : "#fff"};
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 10px 30px
            rgba(0, 0, 0, ${theme === "dark" ? "0.4" : "0.2"});
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          transform: translateY(50px) scale(0.95);
          opacity: 0;
          display: flex;
          flex-direction: column;
        }
        .modal-container.opening {
          transform: translateY(50px) scale(0.95);
          opacity: 0;
        }
        .modal-container.open {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        .modal-container.closing {
          transform: translateY(50px) scale(0.95);
          opacity: 0;
        }

        @media (max-width: 640px) {
          .modal-overlay {
            align-items: flex-end;
          }
          .modal-container {
            width: 100%;
            max-width: 100%;
            border-radius: 16px 16px 0 0;
            max-height: 80vh;
            transform: translateY(100%);
          }
          .modal-container.open {
            transform: translateY(0);
          }
          .modal-container.closing {
            transform: translateY(100%);
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid ${theme === "dark" ? "#2a2a2e" : "#eef0f2"};
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 600;
          color: ${theme === "dark" ? "#f0f0f0" : "#111"};
        }
        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: ${theme === "dark" ? "#888" : "#777"};
          padding: 0.3rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        .close-button:hover {
          background: ${theme === "dark" ? "#2a2a2e" : "#f0f0f0"};
          color: ${theme === "dark" ? "#fff" : "#000"};
        }
        .close-button svg {
          width: 20px;
          height: 20px;
        }

        .modal-content {
          padding: 0.75rem 1.25rem;
          overflow-y: auto;
          flex-grow: 1;
        }

        .categories-section {
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid ${theme === "dark" ? "#2a2a2e" : "#eef0f2"};
        }
        .categories-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .category-button {
          padding: 0.4rem 0.9rem;
          border-radius: 16px;
          border: 1.5px solid ${theme === "dark" ? "#444" : "#ccc"};
          background: transparent;
          color: ${theme === "dark" ? "#ccc" : "#555"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }
        .category-button:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
          background-color: ${primaryColor}15;
        }
        .category-button.active {
          font-weight: 600;
          border-color: ${primaryColor};
          color: ${primaryColor};
          background-color: ${primaryColor}20;
        }

        .filter-section {
          margin-bottom: 1.25rem;
        }
        .filter-section h3 {
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 0.6rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }
        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          color: ${theme === "dark" ? "#ccc" : "#444"};
          font-size: 0.9rem;
          padding: 0.2rem 0;
        }
        .filter-option input[type="radio"],
        .filter-option input[type="checkbox"] {
          margin-right: 0.2rem;
          transform: scale(0.9);
        }
        .filter-option:hover span {
          color: ${primaryColor};
        }

        .text-input-filter {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 6px;
          border: 1px solid ${theme === "dark" ? "#444" : "#ccc"};
          background: ${theme === "dark" ? "#222" : "#fff"};
          color: ${theme === "dark" ? "#eee" : "#222"};
          font-size: 0.9rem;
          box-sizing: border-box;
        }
        .text-input-filter:focus {
          outline: none;
          border-color: ${primaryColor};
          box-shadow: 0 0 0 2px ${primaryColor}30;
        }

        .modal-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid ${theme === "dark" ? "#2a2a2e" : "#eef0f2"};
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: ${theme === "dark" ? "#1c1c21" : "#f9f9f9"};
        }
        .apply-button,
        .clear-button {
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        .apply-button {
          background: ${primaryColor};
          color: white;
        }
        .apply-button:hover {
          opacity: 0.85;
        }
        .clear-button {
          background: transparent;
          color: ${theme === "dark" ? "#aaa" : "#666"};
          border: 1px solid ${theme === "dark" ? "#444" : "#ccc"};
        }
        .clear-button:hover {
          background: ${theme === "dark" ? "#2a2a2e" : "#e9e9e9"};
          color: ${theme === "dark" ? "#fff" : "#333"};
        }
      `}</style>
    </div>
  );
};

export default InternshipFilterModal;
