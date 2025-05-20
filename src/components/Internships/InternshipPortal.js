// InternshipPortal.js
import React, { useState, useEffect, useCallback } from "react";
import InternshipPortalHeader from "./InternshipPortalHeader";
import SearchSectionInternships from "./SearchSectionInternships";
import InternshipFilterModal from "./InternshipFilterModal";
import InternshipCard from "./InternshipCard"; // Import InternshipCard directly
import InternshipCardSkeleton from "./InternshipCardSkeleton";
import Pagination from "./Pagination";
import ErrorInternships from "./Error";
import NoResultsInternships from "./NoResultsInternships";

function InternshipPortal({ theme = "light", initialColor = "orange" }) {
  const [primaryColor] = useState(
    initialColor === "blue"
      ? "#3b82f6"
      : initialColor === "purple"
      ? "#a855f7"
      : initialColor === "green"
      ? "#10b981"
      : initialColor === "orange"
      ? "#f97316"
      : "#f97316"
  );

  const [allInternships, setAllInternships] = useState([]);
  const [displayedInternships, setDisplayedInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    stipendRange: "any",
    workType: "any",
    location: "",
    duration: "any",
    educationLevel: "any",
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInternships, setTotalInternships] = useState(0);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [savedInternships, setSavedInternships] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);

  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/internships`;

  const internshipCategories = [
    { id: "all", name: "All Internships" },
    { id: "tech", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "datasci", name: "Data Science" },
    { id: "business", name: "Business Dev" },
  ];

  const internshipFilterOptions = {
    stipendRange: [
      { value: "any", label: "Any Stipend" },
      { value: "unpaid", label: "Unpaid" },
      { value: "1-5000", label: "₹1 - ₹5,000" },
      { value: "5001-10000", label: "₹5,001 - ₹10,000" },
      { value: "10001-20000", label: "₹10,001 - ₹20,000" },
      { value: "20001+", label: "Above ₹20,000" },
    ],
    workType: [
      { value: "any", label: "Any Work Type" },
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
    ],
    duration: [
      { value: "any", label: "Any Duration" },
      { value: "1-month", label: "1 Month" },
      { value: "2-3-months", label: "2-3 Months" },
      { value: "3-6-months", label: "3-6 Months" },
      { value: "6-months-plus", label: "6+ Months" },
    ],
    educationLevel: [
      { value: "any", label: "Any Level" },
      { value: "high_school", label: "High School" },
      { value: "bachelor", label: "Bachelor's Degree" },
      { value: "master", label: "Master's Degree" },
      { value: "phd", label: "PhD" },
    ],
  };

  const fetchInternships = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?page=${page}&limit=9`);
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.internships) {
        setAllInternships(data.internships); // Not used for direct display with backend pagination
        setDisplayedInternships(data.internships);
        setTotalInternships(data.totalInternships || 0);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } else {
        throw new Error(
          "Failed to fetch internships or data format incorrect."
        );
      }
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError(err.message);
      setAllInternships([]);
      setDisplayedInternships([]);
      setTotalInternships(0);
      setTotalPages(1);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchInternships(currentPage);
  }, [currentPage, fetchInternships]);

  const countActiveFilters = useCallback(() => {
    let count = 0;
    if (searchQuery) count++;
    if (activeCategory !== "all") count++;
    if (filters.stipendRange !== "any") count++;
    if (filters.workType !== "any") count++;
    if (filters.location) count++;
    if (filters.duration !== "any") count++;
    if (filters.educationLevel !== "any") count++;
    setActiveFiltersCount(count);
  }, [searchQuery, activeCategory, filters]);

  useEffect(() => {
    countActiveFilters();
  }, [countActiveFilters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setFilters({
      stipendRange: "any",
      workType: "any",
      location: "",
      duration: "any",
      educationLevel: "any",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleSaveInternship = useCallback((internshipId) => {
    setSavedInternships((prev) =>
      prev.includes(internshipId)
        ? prev.filter((id) => id !== internshipId)
        : [...prev, internshipId]
    );
  }, []);

  const toggleApplyInternship = useCallback(
    (internshipId) => {
      if (!appliedInternships.includes(internshipId)) {
        setAppliedInternships((prev) => [...prev, internshipId]);
      }
    },
    [appliedInternships]
  );

  const getCompanyLogo = useCallback(
    (internship) => {
      const placeholderChar = internship.company
        ? internship.company[0].toUpperCase()
        : "C";
      const logoUrl = internship.companyLogo;

      const isInvalidLogo = !logoUrl;

      if (!isInvalidLogo) {
        return (
          <img
            src={logoUrl}
            alt={`${internship.company} Logo`}
            className="company-logo"
            onError={(e) => {
              e.target.style.display = "none";
              const placeholderElement = e.target.parentElement.querySelector(
                ".company-logo-placeholder"
              );
              if (placeholderElement) {
                placeholderElement.style.display = "flex";
              }
            }}
          />
        );
      }
      return (
        <div
          className="company-logo-placeholder"
          style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
        >
          {placeholderChar}
        </div>
      );
    },
    [primaryColor]
  );

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  }, []);

  const getCurrentlyDisplayedInternships = () => {
    return displayedInternships.length;
  };

  const showSkeleton = loading;
  const hasResults = displayedInternships.length > 0;

  return (
    <div className={`internship-portal-container ${theme}`}>
      <InternshipPortalHeader theme={theme} primaryColor={primaryColor} />

      <SearchSectionInternships
        theme={theme}
        primaryColor={primaryColor}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        openFilterModal={() => setIsFilterModalOpen(true)}
        activeFiltersCount={activeFiltersCount}
        resetFilters={resetAllFilters}
      />

      <InternshipFilterModal
        theme={theme}
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterOptions={internshipFilterOptions}
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categories={internshipCategories}
        activeCategory={activeCategory}
        setActiveCategory={(catId) => {
          setActiveCategory(catId);
          setCurrentPage(1);
        }}
        primaryColor={primaryColor}
      />

      <section className="internships-section">
        {loading ? (
          <div className="results-summary">
            <span className="results-count">Loading internships...</span>
          </div>
        ) : (
          <div className="results-summary">
            <span className="results-count">
              Showing {getCurrentlyDisplayedInternships()} of {totalInternships}{" "}
              internships
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </span>
            <div className="sort-options">
              <span>Sort by: </span>
              <select className="sort-select">
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>
        )}

        <div className="internships-grid">
          {showSkeleton ? (
            Array.from({ length: 9 }).map((_, index) => (
              <InternshipCardSkeleton key={`skeleton-${index}`} theme={theme} />
            ))
          ) : error ? (
            <ErrorInternships error={error} theme={theme} />
          ) : hasResults ? (
            // Directly map and render InternshipCard components here
            displayedInternships.map((internship) => (
              <InternshipCard
                key={internship._id || internship.id}
                internship={internship}
                theme={theme}
                primaryColor={primaryColor}
                savedInternships={savedInternships}
                appliedInternships={appliedInternships}
                toggleSaveInternship={toggleSaveInternship}
                toggleApplyInternship={toggleApplyInternship}
                getCompanyLogo={getCompanyLogo}
                formatDate={formatDate}
              />
            ))
          ) : (
            <NoResultsInternships
              theme={theme}
              primaryColor={primaryColor}
              resetFilters={resetAllFilters}
            />
          )}
        </div>

        {hasResults && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            primaryColor={primaryColor}
            theme={theme}
          />
        )}
      </section>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .internship-portal-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }
        .internship-portal-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .internship-portal-container {
          padding: 2rem 5%;
          max-width: 1800px;
          margin: 0 auto;
          min-height: 100vh;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .internship-portal-container {
            padding: 2rem 4%;
          }
        }
        @media (max-width: 599px) {
          .internship-portal-container {
            padding: 1.25rem 3%;
          }
        }

        .internships-section {
          margin-top: 2rem;
        }

        .results-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0 0.5rem;
          min-height: 28px;
          color: ${theme === "dark" ? "#ffffff" : "#0a0a0a"};
        }

        .results-count {
          font-weight: 500;
          font-size: 1rem;
        }

        .sort-options {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sort-select {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-size: 0.9rem;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .sort-select:hover {
          border-color: ${primaryColor};
        }

        .internships-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        @media (min-width: 1800px) {
          .internships-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 1799px) and (min-width: 1400px) {
          .internships-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 1399px) and (min-width: 1200px) {
          .internships-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1199px) and (min-width: 900px) {
          .internships-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 899px) and (min-width: 600px) {
          .internships-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .internship-portal-container {
            padding: 2rem 4%;
          }
        }

        @media (max-width: 599px) {
          .internships-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .internship-portal-container {
            padding: 1.25rem 3%;
          }

          .results-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            margin-bottom: 1.25rem;
          }

          .sort-options {
            width: 100%;
          }

          .sort-select {
            flex: 1;
          }
        }

        @media (max-width: 480px) {
          .internship-portal-container {
            padding: 1rem 2%;
          }

          .internships-grid {
            gap: 1rem;
          }

          .results-count {
            font-size: 0.9rem;
          }
        }

        .company-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 8px;
        }
        .company-logo-container.placeholder-fallback .company-logo {
          display: none;
        }
        .company-logo-container.placeholder-fallback .company-logo-placeholder {
          display: flex;
        }

        .company-logo-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: ${primaryColor};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}

export default InternshipPortal;
