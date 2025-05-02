import React, { useState, useEffect, useCallback } from "react";
import JobSeekersHeader from "./JobSeekersHeader";
import SearchSection from "./SearchSection";
import FiltersModal from "./FilterModal";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import Loading from "./Loading";
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
  const [filters, setFilters] = useState({
    salaryRange: "any",
    experienceLevel: "any",
    jobType: "any",
    location: "any",
    remote: "any",
    country: "us",
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Define constants before using them
  const [jobsPerPage] = useState(10);
  const [totalJobsToFetch] = useState(50);

  // API Data and Pagination state
  const [allJobs, setAllJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(totalJobsToFetch / jobsPerPage));
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: "All Jobs" },
    { id: "tech", name: "Technology" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "healthcare", name: "Healthcare" },
    { id: "education", name: "Education" },
  ];

  const filterOptions = {
    salaryRange: [
      { value: "any", label: "Any Salary" },
      { value: "0-50000", label: "Up to $50K" },
      { value: "50000-100000", label: "$50K - $100K" },
      { value: "100000-150000", label: "$100K - $150K" },
      { value: "150000+", label: "$150K+" },
    ],
    experienceLevel: [
      { value: "any", label: "Any Experience" },
      { value: "entry_level", label: "Entry Level" },
      { value: "mid_level", label: "Mid-Level" },
      { value: "senior_level", label: "Senior Level" },
      { value: "executive", label: "Executive" },
    ],
    jobType: [
      { value: "any", label: "Any Type" },
      { value: "fulltime", label: "Full-Time" },
      { value: "parttime", label: "Part-Time" },
      { value: "contract", label: "Contract" },
      { value: "temporary", label: "Temporary" },
      { value: "internship", label: "Internship" },
    ],
    location: [
      { value: "any", label: "Any Location" },
      { value: "San Francisco", label: "San Francisco" },
      { value: "New York", label: "New York" },
      { value: "Chicago", label: "Chicago" },
      { value: "Austin", label: "Austin" },
      { value: "Boston", label: "Boston" },
      { value: "Seattle", label: "Seattle" },
      { value: "Los Angeles", label: "Los Angeles" },
      ...(filters.country === "in"
        ? [
            { value: "Bangalore", label: "Bangalore" },
            { value: "Mumbai", label: "Mumbai" },
            { value: "Delhi", label: "Delhi" },
            { value: "Chennai", label: "Chennai" },
            { value: "Hyderabad", label: "Hyderabad" },
          ]
        : []),
    ],
    remote: [
      { value: "any", label: "Any Work Type" },
      { value: "true", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "false", label: "On-site" },
    ],
    country: [
      { value: "us", label: "United States" },
      { value: "in", label: "India" },
    ],
  };

  const updateDisplayedJobs = useCallback(
    (jobs, page) => {
      const startIndex = (page - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      setDisplayedJobs(jobs.slice(startIndex, endIndex));
    },
    [jobsPerPage]
  );

  const fetchJobsFromApi = useCallback(async () => {
    setLoading(true);
    setError(null);

    let apiQuery = searchQuery || "";
    const apiLocation = filters.location !== "any" ? filters.location : "";

    if (apiLocation) {
      apiQuery = apiQuery
        ? `${apiQuery} in ${apiLocation}`
        : `jobs in ${apiLocation}`;
    } else if (!apiQuery) {
      apiQuery = "software developer";
    }

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      apiQuery
    )}&page=1&num_pages=${Math.ceil(totalJobsToFetch / 10)}&country=${
      filters.country
    }&date_posted=all`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6b1051e94bmsh81d6bc9a0eda86fp180890jsn7246319849e5",
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(
          `API error: ${response.statusText} (Status: ${response.status})`
        );
      }
      const result = await response.json();

      if (result?.data) {
        const jobs = result.data.slice(0, totalJobsToFetch);
        setAllJobs(jobs);
        updateDisplayedJobs(jobs, currentPage);
      } else {
        setAllJobs([]);
        setDisplayedJobs([]);
      }
    } catch (err) {
      setError(err.message);
      setAllJobs([]);
      setDisplayedJobs([]);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    filters,
    currentPage,
    totalJobsToFetch,
    updateDisplayedJobs,
  ]);

  useEffect(() => {
    fetchJobsFromApi();
  }, [fetchJobsFromApi]);

  useEffect(() => {
    if (allJobs.length > 0) {
      updateDisplayedJobs(allJobs, currentPage);
    }
  }, [currentPage, allJobs, updateDisplayedJobs]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      salaryRange: "any",
      experienceLevel: "any",
      jobType: "any",
      location: "any",
      remote: "any",
      country: "us",
    });
    setSearchQuery("");
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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

  const getCompanyLogo = (job) => {
    if (job.employer_logo) {
      return (
        <img
          src={job.employer_logo}
          alt={`${job.employer_name} logo`}
          className="company-logo-img"
        />
      );
    } else {
      const initials = job.employer_name
        .split(" ")
        .map((name) => name.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
      return <div className="company-logo-placeholder">{initials}</div>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredJobs = () => {
    if (activeCategory === "all") return displayedJobs;

    const categoryKeywords = {
      tech: [
        "software",
        "developer",
        "engineer",
        "data scientist",
        "IT",
        "tech",
      ],
      finance: ["financial", "banking", "accounting", "finance", "investment"],
      marketing: ["marketing", "SEO", "SEM", "branding", "advertising"],
      healthcare: ["nurse", "doctor", "medical", "healthcare", "hospital"],
      education: ["teacher", "professor", "education", "school", "university"],
    };

    const keywords = categoryKeywords[activeCategory] || [];
    return displayedJobs.filter((job) =>
      keywords.some(
        (keyword) =>
          job.job_title?.toLowerCase().includes(keyword) ||
          job.job_description?.toLowerCase().includes(keyword)
      )
    );
  };

  const getTotalFilteredJobs = () => {
    if (activeCategory === "all") return allJobs.length;

    const categoryKeywords = {
      tech: [
        "software",
        "developer",
        "engineer",
        "data scientist",
        "IT",
        "tech",
      ],
      finance: ["financial", "banking", "accounting", "finance", "investment"],
      marketing: ["marketing", "SEO", "SEM", "branding", "advertising"],
      healthcare: ["nurse", "doctor", "medical", "healthcare", "hospital"],
      education: ["teacher", "professor", "education", "school", "university"],
    };

    const keywords = categoryKeywords[activeCategory] || [];
    return allJobs.filter((job) =>
      keywords.some(
        (keyword) =>
          job.job_title?.toLowerCase().includes(keyword) ||
          job.job_description?.toLowerCase().includes(keyword)
      )
    ).length;
  };

  return (
    <div className={`job-seekers-container ${theme}`}>
      <JobSeekersHeader theme={theme} primaryColor={primaryColor} />

      <SearchSection
        theme={theme}
        primaryColor={primaryColor}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={() => setIsFiltersModalOpen(true)}
        filters={filters}
        resetFilters={resetFilters}
      />

      {/* Filters Modal - now shown when button is clicked */}
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
        primaryColor="rgb(249, 115, 22)"
      />

      <section className="jobs-section">
        <div className="results-summary">
          <span className="results-count">
            Showing {filteredJobs().length} of {getTotalFilteredJobs()} jobs
            (Page {currentPage} of {totalPages})
          </span>
          <div className="sort-options">
            <span>Sort by: </span>
            <select className="sort-select">
              <option value="relevance">Relevance</option>
              <option value="date">Date</option>
              <option value="salary-high">Salary (High to Low)</option>
              <option value="salary-low">Salary (Low to High)</option>
            </select>
          </div>
        </div>

        <div className="jobs-list">
          {loading ? (
            Array.from({ length: jobsPerPage }).map((_, index) => (
              <JobCardSkeleton key={`skeleton-${index}`} theme={theme} />
            ))
          ) : error ? (
            <Error error={error} />
          ) : filteredJobs().length === 0 ? (
            <NoResults
              primaryColor={primaryColor}
              resetFilters={resetFilters}
            />
          ) : (
            filteredJobs().map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                primaryColor={primaryColor}
                theme={theme}
                savedJobs={savedJobs}
                toggleSaveJob={toggleSaveJob}
                appliedJobs={appliedJobs}
                toggleApplyJob={toggleApplyJob}
                getCompanyLogo={getCompanyLogo}
                formatDate={formatDate}
              />
            ))
          )}
        </div>

        {filteredJobs().length > 0 && totalPages > 1 && (
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
          max-width: 1400px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
        }

        .results-count {
          font-weight: 500;
        }

        .sort-options {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-select {
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          border: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .jobs-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 1200px) {
          .jobs-list {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 1199px) and (min-width: 992px) {
          .jobs-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 991px) and (min-width: 768px) {
          .jobs-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 767px) {
          .jobs-list {
            grid-template-columns: 1fr;
          }

          .job-seekers-container {
            padding: 1.5rem 2%;
          }

          .results-summary {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default JobSeekers;
