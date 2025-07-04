import React, { useEffect, useState } from "react";

const FiltersModal = ({
  theme,
  filters = {}, // Default value to prevent undefined
  handleFilterChange,
  filterOptions = {}, // Default value to prevent undefined
  isOpen,
  onClose,
  categories = [], // Default value to prevent undefined
  activeCategory,
  setActiveCategory,
  primaryColor,
}) => {
  const [animationState, setAnimationState] = useState("closed");

  useEffect(() => {
    if (isOpen) {
      setAnimationState("opening");
      // Short timeout to ensure the opening class is applied after the component is rendered
      const timer = setTimeout(() => {
        setAnimationState("open");
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (animationState === "open") {
        setAnimationState("closing");
        // Add timeout to match the CSS transition duration
        const timer = setTimeout(() => {
          setAnimationState("closed");
        }, 300); // Match this with your CSS transition time
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, animationState]);

  // Don't render anything if the modal is fully closed
  if (animationState === "closed" && !isOpen) return null;

  // Initialize filter options if they're undefined
  const safeFilterOptions = {
    salaryRange: filterOptions.salaryRange || [],
    experienceLevel: filterOptions.experienceLevel || [],
    jobType: filterOptions.jobType || [],
    location: filterOptions.location || [],
    remote: filterOptions.remote || [],
    isPaid: filterOptions.isPaid || [],
  };

  return (
    <div className={`modal-overlay ${animationState}`}>
      <div className={`modal-container ${animationState}`}>
        <div className="modal-header">
          <h2>Filter Jobs</h2>
          <button className="close-button" onClick={onClose}>
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
          <div className="filter-section categories-section">
            <h3>Categories</h3>
            <div className="categories-container">
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-button ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                    style={
                      activeCategory === category.id
                        ? { borderColor: primaryColor, color: primaryColor }
                        : {}
                    }
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Salary Range</h3>
            <div className="filter-options">
              {safeFilterOptions.salaryRange.length > 0 ? (
                safeFilterOptions.salaryRange.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="salaryRange"
                      value={option.value}
                      checked={filters.salaryRange === option.value}
                      onChange={() =>
                        handleFilterChange("salaryRange", option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm">No salary range options available</p>
              )}
            </div>
          </div>

          <div className="filter-section">
            <h3>Experience Level</h3>
            <div className="filter-options">
              {safeFilterOptions.experienceLevel.length > 0 ? (
                safeFilterOptions.experienceLevel.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={option.value}
                      checked={filters.experienceLevel === option.value}
                      onChange={() =>
                        handleFilterChange("experienceLevel", option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm">No experience level options available</p>
              )}
            </div>
          </div>

          <div className="filter-section">
            <h3>Job Type</h3>
            <div className="filter-options">
              {safeFilterOptions.jobType.length > 0 ? (
                safeFilterOptions.jobType.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="jobType"
                      value={option.value}
                      checked={filters.jobType === option.value}
                      onChange={() =>
                        handleFilterChange("jobType", option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm">No job type options available</p>
              )}
            </div>
          </div>

          <div className="filter-section">
            <h3>Location</h3>
            <div className="filter-options">
              {safeFilterOptions.location.length > 0 ? (
                safeFilterOptions.location.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="location"
                      value={option.value}
                      checked={filters.location === option.value}
                      onChange={() =>
                        handleFilterChange("location", option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm">No location options available</p>
              )}
            </div>
          </div>

          <div className="filter-section">
            <h3>Work Type</h3>
            <div className="filter-options">
              {safeFilterOptions.remote.length > 0 ? (
                safeFilterOptions.remote.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="remote"
                      value={option.value}
                      checked={filters.remote === option.value}
                      onChange={() =>
                        handleFilterChange("remote", option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm">No work type options available</p>
              )}
            </div>
          </div>

          <div className="filter-section">
            <h3>Payment</h3>
            <div className="filter-options">
              {safeFilterOptions.isPaid.length > 0 ? (
                safeFilterOptions.isPaid.map((option) => (
                  <label key={option.value} className="filter-option">
                    <input
                      type="radio"
                      name="isPaid"
                      value={option.value}
                      checked={filters.isPaid === option.value}
                      onChange={() =>
                        handleFilterChange("isPaid", option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm">No payment options available</p>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="apply-button" onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>

      <style jsx>{`
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
          background: rgba(0, 0, 0, 0.5);
        }

        .modal-overlay.closing {
          background: rgba(0, 0, 0, 0);
        }

        @media (max-width: 640px) {
          .modal-overlay {
            align-items: flex-end;
          }
        }

        .modal-container {
          background: ${theme === "dark" ? "#111" : "#fff"};
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform: translateY(100%);
          opacity: 0;
        }

        .modal-container.opening {
          transform: translateY(100%);
          opacity: 0;
        }

        .modal-container.open {
          transform: translateY(0);
          opacity: 1;
        }

        .modal-container.closing {
          transform: translateY(100%);
          opacity: 0;
        }

        @media (max-width: 640px) {
          .modal-container {
            width: 100%;
            max-width: 100%;
            border-radius: 16px 16px 0 0;
            max-height: 85vh;
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#eee"};
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: ${theme === "dark" ? "#888" : "#666"};
          padding: 0.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          background: ${theme === "dark" ? "#222" : "#f0f0f0"};
        }

        .close-button svg {
          width: 20px;
          height: 20px;
        }

        .modal-content {
          padding: 1rem 1.5rem;
          max-height: calc(80vh - 130px);
          overflow-y: auto;
        }

        .categories-section {
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#eee"};
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .categories-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .category-button {
          padding: 0.5rem 1rem;
          border-radius: 30px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: transparent;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .category-button:hover {
          border-color: ${primaryColor || "#0066ff"};
          color: ${primaryColor || "#0066ff"};
        }

        .category-button.active {
          font-weight: 600;
        }

        .filter-section {
          margin-bottom: 1.5rem;
        }

        .filter-section h3 {
          font-size: 1rem;
          margin: 0 0 0.75rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .filter-option input {
          cursor: pointer;
        }

        .filter-option span {
          font-size: 0.95rem;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#eee"};
          display: flex;
          justify-content: flex-end;
        }

        .apply-button {
          background: rgb(249, 115, 22);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .apply-button:hover {
          background: rgb(242, 151, 87);
        }
      `}</style>
    </div>
  );
};

export default FiltersModal;
