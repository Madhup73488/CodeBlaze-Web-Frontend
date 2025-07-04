import React, { useState, useEffect, useCallback } from "react";
import JobSeekersHeader from "./JobSeekersHeader";
import SearchSection from "./SearchSection";
import FiltersModal from "./FilterModal";
import JobCard from "./JobCard"; // We will update this next
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import Error from "./Error";
import JobCardSkeleton from "./JobCardSkeleton";

function JobSeekers({ theme = "light", color = "blue" }) {
  const primaryColor =
    color === "blue"
      ? "#3b82f6"
      : color === "purple"
      ? "#a855f7"
      : color === "green"
      ? "#10b981"
      : color === "orange"
      ? "#f97316"
      : "#3b82f6";

  // State for managing filters and search
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minimumLoading, setMinimumLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [filters, setFilters] = useState({
    salaryRange: "any",
    experienceLevel: "any", // Note: Experience Level data is not in your sample JSON
    jobType: "any",
    location: "any",
    remote: "any", // Maps to workType
    isPaid: "any", // Note: Paid status is not explicitly in your sample JSON
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // API Data and Pagination state
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // This state seems unused? FilterModal is controlled by isFiltersModalOpen
  const [totalJobs, setTotalJobs] = useState(0);

  // Categories - You can refine these based on keywords/titles
  const categories = [
    { id: "all", name: "All Jobs" },
    { id: "tech", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "business", name: "Business" },
    { id: "engineering", name: "Engineering" },
  ];

  // Filter Options - Ensure these align with your API data/filtering capabilities
  const filterOptions = {
    salaryRange: [
      { value: "any", label: "Any Salary" },
      // Assuming salary values are in INR based on your JSON sample
      { value: "0-500000", label: "Up to ₹5L" }, // Added smaller ranges for realism
      { value: "500001-1000000", label: "₹5L - ₹10L" },
      { value: "1000001-1500000", label: "₹10L - ₹15L" },
      { value: "1500001-2000000", label: "₹15L - ₹20L" },
      { value: "2000001-3000000", label: "₹20L - ₹30L" },
      { value: "3000001+", label: "₹30L+" },
    ],
    // Note: experienceLevel is not in your sample JSON structure
    experienceLevel: [
      { value: "any", label: "Any Experience" },
      { value: "entry_level", label: "Entry Level" }, // Adjusted names to common API formats
      { value: "mid_level", label: "Mid Level" },
      { value: "senior_level", label: "Senior Level" },
      { value: "director", label: "Director" },
      { value: "executive", label: "Executive" },
    ],
    jobType: [
      { value: "any", label: "Any Type" },
      { value: "full-time", label: "Full-Time" },
      { value: "part-time", label: "Part-Time" },
      { value: "contract", label: "Contract" },
      { value: "temporary", label: "Temporary" },
      { value: "internship", label: "Internship" },
    ],
    location: [
      { value: "any", label: "Any Location" },
      { value: "Bengaluru, Karnataka, IND", label: "Bengaluru" }, // Match exact string from API
      { value: "New Delhi, Delhi, IND", label: "New Delhi" }, // Example exact string
      { value: "Mumbai, Maharashtra, IND", label: "Mumbai" }, // Example exact string
      { value: "Hyderabad, Telangana, IND", label: "Hyderabad" }, // Example exact string
      { value: "Chennai, Tamil Nadu, IND", label: "Chennai" }, // Example exact string
      { value: "Pune, Maharashtra, IND", label: "Pune" }, // Example exact string
      { value: "San Francisco, CA", label: "San Francisco" }, // Example exact string
      { value: "New York, NY", label: "New York" }, // Example exact string
      { value: "London, UK", label: "London" }, // Example exact string
      // You might need to fetch locations dynamically based on available data
    ],
    remote: [
      // Maps to workType
      { value: "any", label: "Any Work Type" },
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
    ],
    // Note: isPaid is not in your sample JSON structure. This might be for Internships?
    isPaid: [
      { value: "any", label: "Any Payment" },
      { value: "true", label: "Paid" },
      { value: "false", label: "Unpaid" },
    ],
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMinimumLoading(true);
    setDataLoaded(false);

    const startTime = Date.now();

    try {
      // You might want to add query parameters here later based on filters/pagination
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs?page=${currentPage}&limit=10`
      );
      if (!response.ok) {
        throw new Error(
          `API error: ${response.statusText} (Status: ${response.status})`
        );
      }

      const result = await response.json();

      if (result?.success && result?.jobs) {
        setAllJobs(result.jobs); // Keep original jobs for filtering/displaying current page
        // Note: Pagination should ideally be handled by the API based on filters/search
        // The current filtering/pagination logic is purely frontend
        setTotalPages(result.totalPages || 1); // Use API totalPages if available
        setTotalJobs(result.totalJobs || result.jobs.length); // Use API totalJobs if available
        setCurrentPage(result.currentPage || 1); // Use API currentPage if available
      } else {
        setAllJobs([]);
        setTotalPages(0);
        setTotalJobs(0);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err); // Log the error
      setError(err.message);
      setAllJobs([]);
      setTotalPages(0);
      setTotalJobs(0);
      setCurrentPage(1);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsedTime, 0); // Reduced minimum loading time slightly

      setTimeout(() => {
        setLoading(false);
        setDataLoaded(true);
        setMinimumLoading(false);
      }, remainingTime);
    }
  }, [currentPage]); // Add currentPage to dependencies

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Effect to refetch jobs when page changes
  useEffect(() => {
    // This effect is triggered by handlePageChange updating currentPage
    fetchJobs();
  }, [currentPage, fetchJobs]); // Added fetchJobs to dependencies

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      salaryRange: "any",
      experienceLevel: "any",
      jobType: "any",
      location: "any",
      remote: "any",
      isPaid: "any",
    });
    setSearchQuery("");
    setActiveCategory("all"); // Reset category
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Note: If filtering is done backend, simply changing page here is enough.
      // If filtering is frontend, you might need to re-apply filters after fetching the new page data.
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const toggleApplyJob = (jobId) => {
    if (appliedJobs.includes(jobId)) {
      setAppliedJobs(appliedJobs.filter((id) => id !== jobId));
    } else {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  // Modified getCompanyLogo to expect job.companyLogoUrl
  const getCompanyLogo = (job) => {
    if (job?.companyLogoUrl) {
      // Use optional chaining for safety
      return (
        <img
          src={job.companyLogoUrl}
          alt={`${job.company || "Company"} logo`} // Use job.company for alt text
          className="company-logo"
          onError={(e) => {
            e.target.style.visibility = "hidden";
            e.target.parentNode.classList.add("placeholder-fallback");
          }} // Handle image errors
        />
      );
    }

    // If no logo URL, create a placeholder with initials
    // Use job.company for initials
    if (!job || !job.company) {
      return <div className="company-logo-placeholder">??</div>;
    }

    const initials = job.company
      .split(" ")
      .map((name) => name.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return <div className="company-logo-placeholder">{initials}</div>;
  };

  // formatDate function will be used directly in JobCard now

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified"; // Added check
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Added check for invalid date
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Frontend filtering logic - This will only filter the jobs currently in `allJobs` state
  const filteredJobs = useCallback(() => {
    if (!allJobs) return [];

    let filtered = [...allJobs];

    // Filter by search query (uses original API property names)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) || // Use optional chaining
          job.company?.toLowerCase().includes(query) || // Use optional chaining
          (job.skills &&
            Array.isArray(job.skills) && // Check if skills is an array
            job.skills.some((skill) => skill.toLowerCase().includes(query)))
      );
    }

    // Filter by category (uses original API property names)
    if (activeCategory !== "all") {
      const categoryKeywords = {
        tech: [
          "software",
          "developer",
          "engineer",
          "IT",
          "tech",
          "coding",
          "programming",
        ],
        design: [
          "design",
          "UI",
          "UX",
          "graphic",
          "creative",
          "artist",
          "Figma",
          "Adobe",
        ],
        marketing: [
          "marketing",
          "SEO",
          "SEM",
          "branding",
          "advertising",
          "content",
        ],
        business: [
          "business",
          "finance",
          "accounting",
          "management",
          "operations",
          "sales",
        ],
        engineering: [
          "engineering",
          "mechanical",
          "electrical",
          "civil",
          "hardware",
        ],
      };

      const keywords = categoryKeywords[activeCategory] || [];
      filtered = filtered.filter((job) =>
        keywords.some(
          (keyword) =>
            job.title?.toLowerCase().includes(keyword) || // Use optional chaining
            (job.skills &&
              Array.isArray(job.skills) && // Check if skills is an array
              job.skills.some((skill) => skill.toLowerCase().includes(keyword)))
        )
      );
    }

    // Filter by location (uses original API property name)
    if (filters.location !== "any") {
      // This filter requires an exact match to the location string from the API ("City, State, Country")
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    // Filter by work type (remote/hybrid/onsite) (uses original API property name)
    if (filters.remote !== "any") {
      filtered = filtered.filter((job) => job.workType === filters.remote);
    }

    // Filter by employment type (uses original API property name)
    if (filters.jobType !== "any") {
      filtered = filtered.filter(
        (job) => job.employmentType === filters.jobType
      );
    }

    // Filter by salary range (uses original API property names)
    if (filters.salaryRange !== "any" && filters.salaryRange) {
      const [minStr, maxStr] = filters.salaryRange.split("-");
      const min = Number(minStr);
      const max = Number(maxStr); // NaN if maxStr is undefined (for "+")

      filtered = filtered.filter((job) => {
        if (
          !job.salary ||
          job.salary.min === undefined ||
          job.salary.min === null
        )
          return false; // Ensure salary.min exists

        const salaryMin = job.salary.min;

        if (filters.salaryRange.endsWith("+")) {
          // For "+", check if salaryMin is greater than or equal to the min value
          return salaryMin >= min;
        }

        // For ranges like "min-max", check if salaryMin is within the range
        return salaryMin >= min && salaryMin <= max; // Use min and max numbers
      });
    }

    // Note: experienceLevel and isPaid filters are included but not fully implemented
    // as the corresponding data is not present in your sample JSON.

    return filtered;
  }, [allJobs, searchQuery, activeCategory, filters]); // Add dependencies

  const getCurrentlyDisplayed = () => {
    const filtered = filteredJobs();
    return filtered.length;
  };

  const showSkeleton = minimumLoading; // Show skeleton only during minimum loading
  const showContent = dataLoaded && !loading && !minimumLoading;
  const hasResults = filteredJobs().length > 0;

  return (
    <div className={`job-seekers-container ${theme}`}>
      <JobSeekersHeader theme={theme} primaryColor={primaryColor} />

      <SearchSection
        theme={theme}
        primaryColor={primaryColor}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters} // This prop might be for a direct toggle button? Modal is used now.
        setShowFilters={() => setIsFiltersModalOpen(true)} // Button opens modal
        filters={filters}
        resetFilters={resetFilters}
      />

      {/* Filters Modal */}
      <FiltersModal
        theme={theme}
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterOptions={filterOptions}
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        primaryColor={primaryColor}
      />

      <section className="jobs-section">
        {/* Show skeleton only while loading or minimum loading */}
        {loading || minimumLoading ? (
          // Placeholder for skeleton loading indicator area
          <div className="results-summary">
            <span className="results-count">Loading jobs...</span>
          </div>
        ) : (
          <div className="results-summary">
            <span className="results-count">
              Showing {getCurrentlyDisplayed()} of {totalJobs} jobs
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </span>
            {/* Sort options might need backend implementation to be effective across pages */}
            <div className="sort-options">
              <span>Sort by: </span>
              <select
                className="sort-select"
                // Add onChange handler to handle sorting (requires backend or complex frontend sort)
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                {/* Salary sorting is only meaningful if you have all jobs or if backend supports it */}
                {/* <option value="salary-high">Salary (High to Low)</option>
                     <option value="salary-low">Salary (Low to High)</option> */}
              </select>
            </div>
          </div>
        )}

        <div className="jobs-list">
          {
            showSkeleton ? (
              // Render skeletons during initial load or minimum loading
              Array.from({ length: 6 }).map(
                (
                  _,
                  index // Render more skeletons
                ) => <JobCardSkeleton key={`skeleton-${index}`} theme={theme} />
              )
            ) : error ? (
              // Show error if fetching failed
              <Error error={error} />
            ) : !hasResults && dataLoaded ? (
              // Show no results if no jobs found after loading and filtering
              <NoResults
                primaryColor={primaryColor}
                resetFilters={resetFilters}
              />
            ) : showContent && hasResults ? (
              // Display jobs only when data is loaded, not loading, and there are results
              filteredJobs().map((job) => (
                <JobCard
                  key={job._id || job.id} // Use _id or id for key
                  job={job} // *** Pass the original job object ***
                  primaryColor={primaryColor}
                  theme={theme}
                  savedJobs={savedJobs}
                  toggleSaveJob={toggleSaveJob}
                  appliedJobs={appliedJobs}
                  toggleApplyJob={toggleApplyJob}
                  getCompanyLogo={getCompanyLogo}
                  formatDate={formatDate} // Still pass formatDate if needed in JobCard
                  // formatSalary prop is REMOVED
                />
              ))
            ) : null /* Or render nothing if not loading, no error, no results, and not yet loaded */
          }
        </div>

        {/* Show pagination only if there are filtered jobs and more than one page */}
        {hasResults && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            primaryColor={primaryColor}
          />
        )}
      </section>

      <style jsx>{`
        .job-seekers-container {
          padding: 2rem 5%;
          max-width: 1800px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          min-height: 100vh; /* Ensure container takes at least full viewport height */
          box-sizing: border-box; /* Include padding in width/height */
        }

        .job-seekers-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .job-seekers-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .jobs-section {
          margin-top: 2rem;
        }

        .results-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0 0.5rem;
          min-height: 28px; /* Prevent layout shift while loading */
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

        .jobs-list {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .company-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 8px;
        }
        /* Style for the parent container when image fails */
        .company-logo-container.placeholder-fallback .company-logo {
          display: none; /* Hide the broken image */
        }
        .company-logo-container.placeholder-fallback .company-logo-placeholder {
          display: flex; /* Show the placeholder */
        }

        .company-logo-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: ${primaryColor};
          color: white;
          display: none; /* Hide by default, shown by .placeholder-fallback */
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        }

        /* Responsive grid layout */
        @media (min-width: 1800px) {
          .jobs-list {
            grid-template-columns: repeat(4, 1fr);
          }

          .job-seekers-container {
            padding: 2.5rem 6%;
          }
        }

        @media (max-width: 1799px) and (min-width: 1400px) {
          .jobs-list {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 1399px) and (min-width: 1200px) {
          .jobs-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1199px) and (min-width: 900px) {
          .jobs-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 899px) and (min-width: 600px) {
          .jobs-list {
            grid-template-columns: repeat(2, 1fr);
          }

          .job-seekers-container {
            padding: 2rem 4%;
          }
        }

        @media (max-width: 599px) {
          .jobs-list {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .job-seekers-container {
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
          .job-seekers-container {
            padding: 1rem 2%;
          }

          .jobs-list {
            gap: 1rem;
          }

          .results-count {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default JobSeekers;
