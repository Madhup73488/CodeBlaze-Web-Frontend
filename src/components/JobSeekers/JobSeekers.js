import React, { useState, useEffect } from "react";

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
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Primary categories for job types
  const categories = [
    { id: "all", name: "All Jobs" },
    { id: "tech", name: "Technology" },
    { id: "finance", name: "Finance" },
    { id: "marketing", name: "Marketing" },
    { id: "healthcare", name: "Healthcare" },
    { id: "education", name: "Education" },
  ];

  // Filter options
  const filterOptions = {
    salaryRange: [
      { value: "any", label: "Any Salary" },
      { value: "0-50000", label: "Up to $50K" },
      { value: "50000-100000", label: "$ 50K - 100K" },
      { value: "100000-150000", label: "$ 100K - 150K" },
      { value: "150000+", label: "$ 150K+" },
    ],
    experienceLevel: [
      { value: "any", label: "Any Experience" },
      { value: "entry", label: "Entry Level" },
      { value: "mid", label: "Mid-Level" },
      { value: "senior", label: "Senior Level" },
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
      { value: "sf", label: "San Francisco" },
      { value: "nyc", label: "New York" },
      { value: "chi", label: "Chicago" },
      { value: "aus", label: "Austin" },
      { value: "bos", label: "Boston" },
      { value: "sea", label: "Seattle" },
      { value: "la", label: "Los Angeles" },
    ],
    remote: [
      { value: "any", label: "Any Work Type" },
      { value: "remote", label: "Remote" },
      { value: "hybrid", label: "Hybrid" },
      { value: "onsite", label: "On-site" },
    ],
  };

  // Job listings data
  const jobs = {
    all: [],
    tech: [
      {
        id: "job-1",
        title: "Senior Software Engineer",
        company: "TechGrowth Inc.",
        location: "San Francisco, CA",
        remoteType: "Hybrid",
        salary: "$140,000 - $180,000",
        salaryValue: 160000,
        experience: "Senior Level",
        experienceValue: "senior",
        jobType: "Full-Time",
        description:
          "Join our engineering team to build scalable web applications using React, Node.js, and AWS. You'll work on challenging problems and contribute to products used by millions of users worldwide.",
        requirements:
          "5+ years of software development experience. Proficiency in JavaScript/TypeScript and modern web frameworks. Experience with cloud platforms like AWS. Strong problem-solving skills.",
        benefits:
          "Health, dental, and vision insurance. 401(k) matching. Unlimited PTO. Professional development budget. Flexible work schedule.",
        postedDate: "2025-04-15",
        logo: "techgrowth",
      },
      {
        id: "job-2",
        title: "Frontend Developer",
        company: "InnoTech Solutions",
        location: "New York, NY",
        remoteType: "Remote",
        salary: "$95,000 - $120,000",
        salaryValue: 107500,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Design and implement responsive user interfaces for our enterprise SaaS platform. Collaborate with designers and backend developers to create intuitive user experiences.",
        requirements:
          "3+ years of frontend development experience. Strong knowledge of React, CSS/SCSS, and modern JavaScript. Experience with state management libraries like Redux or Context API.",
        benefits:
          "Competitive salary. Health insurance. Remote-first culture. Equity options. Flexible working hours.",
        postedDate: "2025-04-10",
        logo: "innotech",
      },
      {
        id: "job-3",
        title: "DevOps Engineer",
        company: "CloudScale Systems",
        location: "Seattle, WA",
        remoteType: "Hybrid",
        salary: "$130,000 - $160,000",
        salaryValue: 145000,
        experience: "Senior Level",
        experienceValue: "senior",
        jobType: "Full-Time",
        description:
          "Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems. Improve deployment processes and system reliability across our product suite.",
        requirements:
          "4+ years of DevOps experience. Expertise with AWS/Azure/GCP. Experience with Docker, Kubernetes, and infrastructure as code. Knowledge of monitoring and logging solutions.",
        benefits:
          "Competitive compensation package. Comprehensive benefits. Quarterly bonuses. Remote work options. Professional development opportunities.",
        postedDate: "2025-04-20",
        logo: "cloudscale",
      },
      {
        id: "job-4",
        title: "Data Scientist",
        company: "DataSphere Analytics",
        location: "Boston, MA",
        remoteType: "Remote",
        salary: "$110,000 - $150,000",
        salaryValue: 130000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Develop machine learning models to extract insights from large datasets. Design and implement data processing pipelines and visualization tools for our analytics platform.",
        requirements:
          "MS or PhD in Computer Science, Statistics, or related field. 3+ years experience with machine learning models. Proficiency in Python and data science libraries (Pandas, NumPy, scikit-learn).",
        benefits:
          "Competitive salary. Health insurance. 401(k) matching. Remote work. Learning and development budget.",
        postedDate: "2025-04-05",
        logo: "datasphere",
      },
      {
        id: "job-5",
        title: "Mobile App Developer",
        company: "AppForge Labs",
        location: "Austin, TX",
        remoteType: "On-site",
        salary: "$100,000 - $130,000",
        salaryValue: 115000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Develop cross-platform mobile applications using React Native. Implement new features, optimize performance, and ensure high-quality user experiences across iOS and Android.",
        requirements:
          "3+ years of mobile development experience. Proficiency in React Native and JavaScript/TypeScript. Understanding of native iOS and Android development. Experience with state management and API integration.",
        benefits:
          "Competitive salary. Health insurance. Flexible work hours. Company-sponsored events. Professional development opportunities.",
        postedDate: "2025-04-12",
        logo: "appforge",
      },
    ],
    finance: [
      {
        id: "job-6",
        title: "Financial Analyst",
        company: "Global Finance Partners",
        location: "New York, NY",
        remoteType: "Hybrid",
        salary: "$85,000 - $110,000",
        salaryValue: 97500,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Analyze financial data and prepare reports for management decision-making. Develop financial models and forecasts. Support budgeting and planning processes.",
        requirements:
          "Bachelor's degree in Finance, Accounting, or related field. 3+ years of financial analysis experience. Advanced Excel skills. Knowledge of financial modeling and forecasting techniques.",
        benefits:
          "Competitive salary. 401(k) matching. Health insurance. Professional development reimbursement. Paid time off.",
        postedDate: "2025-04-08",
        logo: "globalfinance",
      },
      {
        id: "job-7",
        title: "Investment Banking Associate",
        company: "Capital Advisors Group",
        location: "Chicago, IL",
        remoteType: "On-site",
        salary: "$120,000 - $160,000",
        salaryValue: 140000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Support M&A and capital raising transactions. Perform financial analysis, valuation, and due diligence. Prepare client presentations and offering materials.",
        requirements:
          "MBA or equivalent degree. 2-4 years of investment banking experience. Strong financial modeling and analytical skills. Excellent written and verbal communication abilities.",
        benefits:
          "Competitive base salary and bonus structure. Comprehensive benefits package. Professional development opportunities. Work-life balance initiatives.",
        postedDate: "2025-04-18",
        logo: "capital",
      },
      {
        id: "job-8",
        title: "Risk Management Specialist",
        company: "Secure Financial Services",
        location: "Boston, MA",
        remoteType: "Hybrid",
        salary: "$90,000 - $120,000",
        salaryValue: 105000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Identify and assess financial risks. Develop risk management strategies and policies. Monitor compliance with regulatory requirements and internal controls.",
        requirements:
          "Bachelor's degree in Finance, Economics, or related field. 3+ years of risk management experience. Knowledge of financial regulations and risk assessment methodologies.",
        benefits:
          "Competitive salary. Health insurance. 401(k) matching. Professional certification support. Remote work options.",
        postedDate: "2025-04-02",
        logo: "secure",
      },
    ],
    marketing: [
      {
        id: "job-9",
        title: "Digital Marketing Manager",
        company: "MarketBoost Agency",
        location: "Los Angeles, CA",
        remoteType: "Remote",
        salary: "$90,000 - $120,000",
        salaryValue: 105000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Develop and implement digital marketing strategies across multiple channels. Manage campaigns, analyze performance metrics, and optimize for conversion and engagement.",
        requirements:
          "Bachelor's degree in Marketing or related field. 4+ years of digital marketing experience. Proficiency with SEO, SEM, social media, and analytics tools. Experience managing marketing budgets.",
        benefits:
          "Competitive salary. Health insurance. 401(k) plan. Remote work. Professional development opportunities.",
        postedDate: "2025-04-19",
        logo: "marketboost",
      },
      {
        id: "job-10",
        title: "Content Marketing Specialist",
        company: "ContentCraft Media",
        location: "Chicago, IL",
        remoteType: "Remote",
        salary: "$70,000 - $90,000",
        salaryValue: 80000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Create compelling content for various digital channels. Develop content strategies aligned with marketing goals. Manage editorial calendar and content production workflow.",
        requirements:
          "Bachelor's degree in Communications, Journalism, or related field. 3+ years of content creation experience. Strong writing and editing skills. Knowledge of SEO best practices.",
        benefits:
          "Competitive salary. Health insurance. Flexible work schedule. Remote work. Professional development opportunities.",
        postedDate: "2025-04-10",
        logo: "contentcraft",
      },
    ],
    healthcare: [
      {
        id: "job-11",
        title: "Registered Nurse",
        company: "Wellness Medical Center",
        location: "San Francisco, CA",
        remoteType: "On-site",
        salary: "$80,000 - $110,000",
        salaryValue: 95000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Provide direct patient care in a hospital setting. Administer medications, monitor patient conditions, and coordinate with healthcare team members.",
        requirements:
          "BSN degree. Active RN license. 2+ years of nursing experience. BLS certification. Strong communication and assessment skills.",
        benefits:
          "Competitive salary. Comprehensive health insurance. Retirement plan. Tuition reimbursement. Professional development opportunities.",
        postedDate: "2025-04-15",
        logo: "wellness",
      },
      {
        id: "job-12",
        title: "Healthcare Data Analyst",
        company: "MedData Solutions",
        location: "Boston, MA",
        remoteType: "Hybrid",
        salary: "$85,000 - $115,000",
        salaryValue: 100000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Analyze healthcare data to improve patient outcomes and operational efficiency. Develop reports and dashboards for healthcare providers and administrators.",
        requirements:
          "Bachelor's degree in Health Informatics, Data Science, or related field. 3+ years of healthcare data analysis experience. Proficiency with SQL, Excel, and visualization tools.",
        benefits:
          "Competitive salary. Health insurance. 401(k) matching. Flexible work arrangement. Professional development opportunities.",
        postedDate: "2025-04-05",
        logo: "meddata",
      },
    ],
    education: [
      {
        id: "job-13",
        title: "High School Math Teacher",
        company: "Westside Academy",
        location: "Seattle, WA",
        remoteType: "On-site",
        salary: "$65,000 - $85,000",
        salaryValue: 75000,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Teach mathematics to high school students. Develop lesson plans, assess student performance, and provide academic support and guidance.",
        requirements:
          "Bachelor's degree in Mathematics or Education. Teaching certification. 2+ years of teaching experience. Strong communication and classroom management skills.",
        benefits:
          "Competitive salary. Health insurance. Retirement plan. Summers off. Professional development opportunities.",
        postedDate: "2025-04-12",
        logo: "westside",
      },
      {
        id: "job-14",
        title: "Online Course Developer",
        company: "EduTech Learning",
        location: "Austin, TX",
        remoteType: "Remote",
        salary: "$70,000 - $95,000",
        salaryValue: 82500,
        experience: "Mid-Level",
        experienceValue: "mid",
        jobType: "Full-Time",
        description:
          "Design and develop online learning experiences. Create instructional materials, assessments, and interactive activities for diverse learners.",
        requirements:
          "Master's degree in Instructional Design, Education, or related field. 3+ years of experience in e-learning development. Proficiency with LMS platforms and authoring tools.",
        benefits:
          "Competitive salary. Health insurance. 401(k) plan. Remote work. Flexible schedule.",
        postedDate: "2025-04-08",
        logo: "edutech",
      },
    ],
  };

  // Populate the "all" category with all jobs
  useEffect(() => {
    const allJobs = [];
    Object.keys(jobs).forEach((category) => {
      if (category !== "all") {
        allJobs.push(...jobs[category]);
      }
    });
    jobs.all = allJobs;
  }, []);

  // Toggle job saved status
  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Toggle job applied status
  const toggleApplyJob = (jobId) => {
    if (appliedJobs.includes(jobId)) {
      setAppliedJobs(appliedJobs.filter((id) => id !== jobId));
    } else {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  // Filter jobs based on selected filters and search query
  const filteredJobs = () => {
    let result = jobs[activeCategory] || [];

    // Apply search query filter
    if (searchQuery) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply salary range filter
    if (filters.salaryRange !== "any") {
      const [min, max] = filters.salaryRange.split("-");
      if (max === undefined) {
        // Handle "150000+" case
        result = result.filter((job) => job.salaryValue >= parseInt(min));
      } else {
        result = result.filter(
          (job) =>
            job.salaryValue >= parseInt(min) && job.salaryValue <= parseInt(max)
        );
      }
    }

    // Apply experience level filter
    if (filters.experienceLevel !== "any") {
      result = result.filter(
        (job) => job.experienceValue === filters.experienceLevel
      );
    }

    // Apply job type filter
    if (filters.jobType !== "any") {
      result = result.filter(
        (job) =>
          job.jobType.toLowerCase().replace("-", "") ===
          filters.jobType.toLowerCase().replace("-", "")
      );
    }

    // Apply location filter
    if (filters.location !== "any") {
      const locationMap = {
        sf: "San Francisco",
        nyc: "New York",
        chi: "Chicago",
        aus: "Austin",
        bos: "Boston",
        sea: "Seattle",
        la: "Los Angeles",
      };
      result = result.filter((job) =>
        job.location.includes(locationMap[filters.location])
      );
    }

    // Apply remote type filter
    if (filters.remote !== "any") {
      result = result.filter(
        (job) => job.remoteType.toLowerCase() === filters.remote.toLowerCase()
      );
    }

    return result;
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      salaryRange: "any",
      experienceLevel: "any",
      jobType: "any",
      location: "any",
      remote: "any",
    });
    setSearchQuery("");
  };

  // Get company logo placeholder (first letter of company name)
  const getLogoPlaceholder = (name) => {
    return name.charAt(0).toUpperCase();
  };

  // Format date for display (e.g., "5 days ago")
  const formatDate = (dateString) => {
    const postedDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
  };

  return (
    <div className={`job-seekers-container ${theme}`}>
      <div className="job-seekers-header">
        <h1 className="job-seekers-title">
          Job <span style={{ color: primaryColor }}>Seekers</span> Platform
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="job-seekers-subtitle">
          Find your perfect career opportunity with our advanced job search
          platform. Filter by industry, salary, location, and more to discover
          jobs that match your skills and preferences.
        </p>
      </div>

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
            filters.remote !== "any") && (
            <button className="reset-filters-button" onClick={resetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {showFilters && (
        <section className="filters-section">
          <div className="filters-grid">
            <div className="filter-column">
              <h3>Salary Range</h3>
              <div className="filter-options">
                {filterOptions.salaryRange.map((option) => (
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
                ))}
              </div>
            </div>
            <div className="filter-column">
              <h3>Experience Level</h3>
              <div className="filter-options">
                {filterOptions.experienceLevel.map((option) => (
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
                ))}
              </div>
            </div>
            <div className="filter-column">
              <h3>Job Type</h3>
              <div className="filter-options">
                {filterOptions.jobType.map((option) => (
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
                ))}
              </div>
            </div>
            <div className="filter-column">
              <h3>Location</h3>
              <div className="filter-options">
                {filterOptions.location.map((option) => (
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
                ))}
              </div>
            </div>
            <div className="filter-column">
              <h3>Work Type</h3>
              <div className="filter-options">
                {filterOptions.remote.map((option) => (
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
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="jobs-section">
        <div className="job-categories">
          {categories.map((category) => (
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

        <div className="results-summary">
          <span className="results-count">
            {filteredJobs().length} jobs found
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
          {filteredJobs().length === 0 ? (
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
            </div>
          ) : (
            filteredJobs().map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <div
                    className="company-logo"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {getLogoPlaceholder(job.company)}
                  </div>
                  <div className="job-title-info">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="company-name">{job.company}</div>
                  </div>
                  <div className="job-actions">
                    <button
                      className={`save-job-button ${
                        savedJobs.includes(job.id) ? "saved" : ""
                      }`}
                      onClick={() => toggleSaveJob(job.id)}
                      title={
                        savedJobs.includes(job.id)
                          ? "Remove from saved jobs"
                          : "Save job"
                      }
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill={
                          savedJobs.includes(job.id) ? primaryColor : "none"
                        }
                        stroke={
                          savedJobs.includes(job.id)
                            ? primaryColor
                            : "currentColor"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="job-details">
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <path d="M12 1v22"></path>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>{job.salary}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    <span>{job.experience}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <rect
                        x="2"
                        y="7"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>{job.jobType}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                    <span>{job.remoteType}</span>
                  </div>
                </div>

                <div className="job-description">
                  <h4>Description</h4>
                  <p>{job.description}</p>
                </div>

                <div className="job-requirements">
                  <h4>Requirements</h4>
                  <p>{job.requirements}</p>
                </div>

                <div className="job-benefits">
                  <h4>Benefits</h4>
                  <p>{job.benefits}</p>
                </div>

                <div className="job-footer">
                  <div className="job-metadata">
                    <span className="job-posted">
                      Posted on {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="action-buttons">
                    <button
                      className={`save-button ${
                        savedJobs.includes(job.id) ? "saved" : ""
                      }`}
                      onClick={() => toggleSaveJob(job.id)}
                    >
                      {savedJobs.includes(job.id) ? "Saved" : "Save"}
                    </button>
                    <button
                      className={`apply-button ${
                        appliedJobs.includes(job.id) ? "applied" : ""
                      }`}
                      style={{
                        backgroundColor: appliedJobs.includes(job.id)
                          ? "#22c55e"
                          : primaryColor,
                      }}
                      onClick={() => toggleApplyJob(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="job-seeker-tools">
        <div className="tools-header">
          <h2 className="tools-title">
            Career <span style={{ color: primaryColor }}>Tools</span>
          </h2>
        </div>

        <div className="tools-grid">
          <div className="tool-card">
            <div
              className="tool-icon"
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="tool-title">Resume Builder</h3>
            <p className="tool-description">
              Create a professional resume with our easy-to-use template
              builder. Highlight your skills and experience to stand out to
              employers.
            </p>
            <a
              href="/resume-builder"
              className="tool-link"
              style={{ color: primaryColor }}
            >
              Create Resume
            </a>
          </div>

          <div className="tool-card">
            <div
              className="tool-icon"
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
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </div>
            <h3 className="tool-title">Interview Preparation</h3>
            <p className="tool-description">
              Practice common interview questions, get feedback on your
              responses, and learn techniques to impress potential employers.
            </p>
            <a
              href="/interview-prep"
              className="tool-link"
              style={{ color: primaryColor }}
            >
              Start Practicing
            </a>
          </div>

          <div className="tool-card">
            <div
              className="tool-icon"
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="tool-title">Networking Events</h3>
            <p className="tool-description">
              Discover virtual and in-person networking events in your industry.
              Connect with professionals and expand your career opportunities.
            </p>
            <a
              href="/networking"
              className="tool-link"
              style={{ color: primaryColor }}
            >
              Find Events
            </a>
          </div>

          <div className="tool-card">
            <div
              className="tool-icon"
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
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <h3 className="tool-title">Career Advice</h3>
            <p className="tool-description">
              Access guides, articles, and expert advice on career development,
              salary negotiation, workplace skills, and more.
            </p>
            <a
              href="/career-advice"
              className="tool-link"
              style={{ color: primaryColor }}
            >
              Read Articles
            </a>
          </div>
        </div>
      </section>

      <section className="premium-features">
        <div className="premium-banner" style={{ borderColor: primaryColor }}>
          <div className="premium-content">
            <div
              className="premium-icon"
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
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="premium-text">
              <h3>Upgrade to Premium</h3>
              <p>
                Get early access to job postings, resume priority placement,
                interview coaching, and more with our Premium membership.
              </p>
            </div>
          </div>
          <button
            className="premium-button"
            style={{ backgroundColor: primaryColor }}
          >
            Learn More
          </button>
        </div>
      </section>

      <style jsx>{`
        .job-seekers-container {
          padding: 2rem 5%;
          max-width: 1200px;
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

        .job-seekers-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .job-seekers-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .accent-line {
          height: 4px;
          width: 60px;
          border-radius: 2px;
          margin: 0 auto 1.5rem;
        }

        .job-seekers-subtitle {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.9;
        }

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
        }

        .filters-section {
          background: ${theme === "dark" ? "#111" : "#f8f8f8"};
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .filter-column h3 {
          font-size: 1rem;
          margin: 0 0 1rem;
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
        }

        .filter-option input {
          cursor: pointer;
        }

        .filter-option span {
          font-size: 0.95rem;
        }

        .job-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .category-button {
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: transparent;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-button:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .category-button.active {
          font-weight: 600;
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
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .job-card {
          background: ${theme === "dark" ? "#111" : "#fff"};
          border-radius: 12px;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 1.5rem;
        }

        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px
            rgba(0, 0, 0, ${theme === "dark" ? "0.4" : "0.15"});
        }

        .job-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .company-logo {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
          margin-right: 1rem;
        }

        .job-title-info {
          flex: 1;
        }

        .job-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0 0 0.3rem;
        }

        .company-name {
          font-size: 1.1rem;
          opacity: 0.8;
        }

        .job-actions {
          position: absolute;
          top: 0;
          right: 0;
        }

        .save-job-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-job-button svg {
          width: 24px;
          height: 24px;
          transition: all 0.3s ease;
        }

        .job-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 0.95rem;
          padding: 0.3rem 0.8rem;
          background: ${theme === "dark" ? "#1a1a1a" : "#f5f5f5"};
          border-radius: 20px;
        }

        .detail-icon {
          width: 16px;
          height: 16px;
          margin-right: 0.5rem;
          opacity: 0.8;
        }

        .job-description,
        .job-requirements,
        .job-benefits {
          margin-bottom: 1.5rem;
        }

        .job-description h4,
        .job-requirements h4,
        .job-benefits h4 {
          font-size: 1.1rem;
          margin: 0 0 0.5rem;
        }

        .job-description p,
        .job-requirements p,
        .job-benefits p {
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        .job-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .job-metadata {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .save-button {
          padding: 0.7rem 1.2rem;
          border-radius: 6px;
          border: 1px solid ${theme === "dark" ? "#555" : "#ddd"};
          background: transparent;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-button:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .save-button.saved {
          border-color: ${primaryColor};
          color: ${primaryColor};
          background-color: ${primaryColor}10;
        }

        .apply-button {
          padding: 0.7rem 1.5rem;
          border-radius: 6px;
          border: none;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .apply-button:hover {
          opacity: 0.9;
        }

        .apply-button.applied {
          background-color: #22c55e !important;
        }

        .no-results {
          text-align: center;
          padding: 3rem 0;
        }

        .no-results-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .no-results p {
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .clear-search {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.5rem 1rem;
        }

        .job-seeker-tools {
          margin: 4rem 0;
        }

        .tools-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .tools-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .tool-card {
          padding: 2rem;
          border-radius: 12px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-5px);
        }

        .tool-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .tool-icon svg {
          width: 30px;
          height: 30px;
          color: white;
        }

        .tool-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 0.8rem;
        }

        .tool-description {
          margin: 0 0 1.5rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .tool-link {
          font-weight: 500;
          text-decoration: none;
          padding: 0.5rem 0;
          display: inline-block;
        }

        .premium-features {
          margin-bottom: 3rem;
        }

        .premium-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: ${theme === "dark" ? "#111" : "#f8f8f8"};
          border-radius: 12px;
          padding: 2rem;
          border-left: 5px solid;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
        }

        .premium-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .premium-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .premium-icon svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .premium-text h3 {
          font-size: 1.2rem;
          margin: 0 0 0.5rem;
        }

        .premium-text p {
          margin: 0;
          max-width: 600px;
        }

        .premium-button {
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          border: none;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }

        .premium-button:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .premium-banner {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .premium-content {
            flex-direction: column;
          }

          .job-categories {
            flex-direction: column;
            align-items: stretch;
          }

          .job-details {
            justify-content: center;
          }

          .job-footer {
            flex-direction: column;
            gap: 1rem;
          }

          .action-buttons {
            width: 100%;
          }

          .save-button,
          .apply-button {
            flex: 1;
          }
        }

        @media (max-width: 576px) {
          .job-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .job-actions {
            position: static;
            margin-top: 1rem;
          }

          .company-logo {
            margin-right: 0;
          }

          .job-seekers-title {
            font-size: 2rem;
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
