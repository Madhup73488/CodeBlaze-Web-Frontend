import React, { useState, useEffect, useCallback } from "react";
import JobSeekersHeader from "./JobSeekersHeader";
import SearchSection from "./SearchSection";
import FiltersModal from "./FilterModal";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import NoResults from "./NoResults";
import Error from "./Error";
import JobCardSkeleton from "./JobCardSkeleton";
import Toast from "../common/Toast";
import "./JobSeekers.css";

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
    experienceLevel: "any",
    jobType: "any",
    location: "any",
    remote: "any",
    isPaid: "any",
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [toast, setToast] = useState(null);

  // API Data and Pagination state
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);

  // Categories
  const categories = [
    { id: "all", name: "All Jobs" },
    { id: "tech", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "business", name: "Business" },
    { id: "engineering", name: "Engineering" },
  ];

  // Filter Options
  const filterOptions = {
    salaryRange: [
      { value: "any", label: "Any Salary" },
      { value: "0-500000", label: "Up to ₹5L" },
      { value: "500001-1000000", label: "₹5L - ₹10L" },
      { value: "1000001-1500000", label: "₹10L - ₹15L" },
      { value: "1500001-2000000", label: "₹15L - ₹20L" },
      { value: "2000001-3000000", label: "₹20L - ₹30L" },
      { value: "3000001+", label: "₹30L+" },
    ],
    experienceLevel: [
      { value: "any", label: "Any Experience" },
      { value: "entry_level", label: "Entry Level" },
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
      { value: "Bengaluru, Karnataka, IND", label: "Bengaluru" },
      { value: "New Delhi, Delhi, IND", label: "New Delhi" },
      { value: "Mumbai, Maharashtra, IND", label: "Mumbai" },
      { value: "Hyderabad, Telangana, IND", label: "Hyderabad" },
      { value: "Chennai, Tamil Nadu, IND", label: "Chennai" },
      { value: "Pune, Maharashtra, IND", label: "Pune" },
      { value: "San Francisco, CA", label: "San Francisco" },
      { value: "New York, NY", label: "New York" },
      { value: "London, UK", label: "London" },
    ],
    remote: [
      { value: "any", label: "Any Work Type" },
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
    ],
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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/jobs?page=${currentPage}&limit=20`
      );
      if (!response.ok) {
        throw new Error(
          `API error: ${response.statusText} (Status: ${response.status})`
        );
      }

      const result = await response.json();

      if (result?.success && result?.jobs) {
        setAllJobs(result.jobs);
        setTotalPages(result.totalPages || 1);
        setTotalJobs(result.totalJobs || result.jobs.length);
        setCurrentPage(result.currentPage || 1);
      } else {
        setAllJobs([]);
        setTotalPages(0);
        setTotalJobs(0);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message);
      setAllJobs([]);
      setTotalPages(0);
      setTotalJobs(0);
      setCurrentPage(1);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsedTime, 0);

      setTimeout(() => {
        setLoading(false);
        setDataLoaded(true);
        setMinimumLoading(false);
      }, remainingTime);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
    setCurrentPage(1);
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
    setActiveCategory("all");
    setCurrentPage(1);
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
      setToast({ message: "Job removed from saved.", type: "info" });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      setToast({ message: "Job saved successfully!", type: "success" });
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
    if (job?.company_logo_url) {
      return (
        <img
          src={job.company_logo_url}
          alt={`${job.company || "Company"} logo`}
          className="company-logo"
          onError={(e) => {
            e.target.style.visibility = "hidden";
            e.target.parentNode.classList.add("placeholder-fallback");
          }}
        />
      );
    }

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

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const time = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${time}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${time}`;
    } else {
      return `${date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })} at ${time}`;
    }
  };

  const filteredJobs = useCallback(() => {
    if (!allJobs) return [];

    let filtered = [...allJobs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          (job.skills &&
            Array.isArray(job.skills) &&
            job.skills.some((skill) => skill.toLowerCase().includes(query)))
      );
    }

    if (activeCategory !== "all") {
      const categoryKeywords = {
        tech: ["software", "developer", "engineer", "it", "tech"],
        design: ["design", "ui", "ux", "graphic"],
        marketing: ["marketing", "seo", "content"],
        business: ["business", "finance", "sales"],
        engineering: ["engineering", "mechanical", "electrical"],
      };

      const keywords = categoryKeywords[activeCategory] || [];
      filtered = filtered.filter((job) =>
        keywords.some(
          (keyword) =>
            job.title?.toLowerCase().includes(keyword) ||
            (job.skills &&
              Array.isArray(job.skills) &&
              job.skills.some((skill) => skill.toLowerCase().includes(keyword)))
        )
      );
    }

    if (filters.location !== "any") {
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    if (filters.remote !== "any") {
      filtered = filtered.filter((job) => job.workType === filters.remote);
    }

    if (filters.jobType !== "any") {
      filtered = filtered.filter(
        (job) => job.employmentType === filters.jobType
      );
    }

    if (filters.salaryRange !== "any" && filters.salaryRange) {
      const [minStr, maxStr] = filters.salaryRange.split("-");
      const min = Number(minStr);
      const max = Number(maxStr);

      filtered = filtered.filter((job) => {
        if (!job.salary || job.salary.min === null) return false;
        const salaryMin = job.salary.min;
        if (filters.salaryRange.endsWith("+")) {
          return salaryMin >= min;
        }
        return salaryMin >= min && salaryMin <= max;
      });
    }

    return filtered;
  }, [allJobs, searchQuery, activeCategory, filters]);

  const getCurrentlyDisplayed = () => {
    const filtered = filteredJobs();
    return filtered.length;
  };

  const showSkeleton = minimumLoading;
  const showContent = dataLoaded && !loading && !minimumLoading;
  const hasResults = filteredJobs().length > 0;

  return (
    <div className={`job-seekers-container ${theme}`}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <JobSeekersHeader theme={theme} primaryColor={primaryColor} />

      <SearchSection
        theme={theme}
        primaryColor={primaryColor}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={isFiltersModalOpen}
        setShowFilters={setIsFiltersModalOpen}
        filters={filters}
        resetFilters={resetFilters}
      />

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
        {loading || minimumLoading ? (
          <div className="results-summary">
            <span className="results-count">Loading jobs...</span>
          </div>
        ) : (
          <div className="results-summary">
            <span className="results-count">
              Showing {getCurrentlyDisplayed()} of {totalJobs} jobs
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

        <div className="jobs-list">
          {showSkeleton ? (
            Array.from({ length: 6 }).map((_, index) => (
              <JobCardSkeleton key={`skeleton-${index}`} theme={theme} />
            ))
          ) : error ? (
            <Error error={error} />
          ) : !hasResults && dataLoaded ? (
            <NoResults
              primaryColor={primaryColor}
              resetFilters={resetFilters}
            />
          ) : (
            showContent &&
            hasResults &&
            filteredJobs().slice(0, 11).map((job) => (
              <div key={job.id} className="job-card-link">
                <JobCard
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
              </div>
            ))
          )}
          {showContent && hasResults && (
            <div className="job-card-link">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden h-full flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-bold text-lg leading-tight text-gray-900 mb-4">
                  Get full access to job updates by registering for an internship program.
                </h3>
                <a href="/internships" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                  Register Now
                </a>
              </div>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}

export default JobSeekers;
