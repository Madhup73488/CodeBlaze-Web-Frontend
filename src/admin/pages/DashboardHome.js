import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";

// Register Chart.js components
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const {
    currentUser,
    theme,
    fetchJobPostings,
    fetchInternshipPostings,
    jobPostings = [],
    internshipPostings = [],
    loadingStates = {},
    errors,
    clearError,
  } = useAdmin();

  const [timeRange, setTimeRange] = useState("week");
  const [applicationTrend, setApplicationTrend] = useState({
    labels: [],
    data: [],
  });
  const [jobCategories, setJobCategories] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Mock application stats since fetchApplicationStats is not available
  const [applicationStats, setApplicationStats] = useState({
    pending: 24,
    reviewed: 18,
    interviewing: 12,
    offered: 6,
    rejected: 9,
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Only fetch what's available
        const promises = [];
        if (fetchJobPostings) promises.push(fetchJobPostings());
        if (fetchInternshipPostings) promises.push(fetchInternshipPostings());

        await Promise.all(promises);

        // Generate mock data
        generateMockTrendData();
        generateMockCategoryData();
        generateMockActivities();
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [fetchJobPostings, fetchInternshipPostings]);

  // Generate mock trend data based on time range
  const generateMockTrendData = () => {
    let labels = [];
    let data = [];

    if (timeRange === "week") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      data = [12, 19, 15, 23, 28, 17, 10];
    } else if (timeRange === "month") {
      labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
      data = [58, 75, 90, 83];
    } else if (timeRange === "year") {
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      data = [250, 280, 310, 340, 380, 420, 390, 410, 450, 470, 490, 510];
    }

    setApplicationTrend({ labels, data });
  };

  // Generate mock category data
  const generateMockCategoryData = () => {
    setJobCategories([
      { name: "Technology", count: 45 },
      { name: "Marketing", count: 28 },
      { name: "Finance", count: 22 },
      { name: "Healthcare", count: 18 },
      { name: "Education", count: 15 },
    ]);
  };

  // Generate mock activities
  const generateMockActivities = () => {
    setRecentActivities([
      {
        id: 1,
        type: "application",
        message: "John Doe applied for Senior Developer position",
        time: "10 minutes ago",
      },
      {
        id: 2,
        type: "job",
        message: "Marketing Specialist position has been posted",
        time: "1 hour ago",
      },
      {
        id: 3,
        type: "internship",
        message: "Data Science Internship was updated",
        time: "3 hours ago",
      },
      {
        id: 4,
        type: "review",
        message: "Sarah reviewed 5 job applications",
        time: "5 hours ago",
      },
      {
        id: 5,
        type: "application",
        message: "Mike Smith applied for UX Designer position",
        time: "Yesterday",
      },
    ]);
  };

  // Effect to regenerate trend data when time range changes
  useEffect(() => {
    generateMockTrendData();
  }, [timeRange]);

  // Prepare chart data with safe defaults
  const applicationStatsData = {
    labels: ["Pending", "Reviewed", "Interviewing", "Offered", "Rejected"],
    datasets: [
      {
        data: [
          applicationStats.pending,
          applicationStats.reviewed,
          applicationStats.interviewing,
          applicationStats.offered,
          applicationStats.rejected,
        ],
        backgroundColor: [
          "#4F46E5",
          "#F59E0B",
          "#10B981",
          "#3B82F6",
          "#EF4444",
        ],
        borderWidth: 1,
      },
    ],
  };

  const applicationTrendChartData = {
    labels: applicationTrend.labels || [],
    datasets: [
      {
        label: "Job Applications",
        data: applicationTrend.data || [],
        fill: false,
        borderColor: theme === "dark" ? "#10B981" : "#047857",
        tension: 0.1,
        pointBackgroundColor: theme === "dark" ? "#10B981" : "#047857",
      },
    ],
  };

  const jobCategoriesChartData = {
    labels: jobCategories.map((category) => category?.name || ""),
    datasets: [
      {
        label: "Job Count",
        data: jobCategories.map((category) => category?.count || 0),
        backgroundColor: [
          "#4F46E5",
          "#F59E0B",
          "#10B981",
          "#3B82F6",
          "#EC4899",
        ],
        borderWidth: 0,
      },
    ],
  };

  // ... (keep all the chart options from previous solution)

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case "application":
        return <DocumentIcon />;
      case "job":
        return <BriefcaseIcon />;
      case "internship":
        return <AcademicCapIcon />;
      case "review":
        return <CheckCircleIcon />;
      default:
        return <BellIcon />;
    }
  };

  // Loading state with safe defaults
  const isLoading =
    (fetchJobPostings && loadingStates.jobPostings) ||
    (fetchInternshipPostings && loadingStates.internshipPostings);

  // Calculate total applications safely
  const totalApplications = Object.values(applicationStats).reduce(
    (total, value) => total + (typeof value === "number" ? value : 0),
    0
  );

  // Add these chart options above your component's return statement
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: theme === "dark" ? "#e0e0e0" : "#6b7280",
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
      y: {
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
      y: {
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
  };

  return (
    <div className="dashboard-home">
      {/* Welcome section */}
      <div className={`welcome-card ${theme}`}>
        <div className="welcome-content">
          <h1>Welcome back, {currentUser?.name || "Admin"}</h1>
          <p>Here's what's happening with your job portal today</p>
        </div>
        <div className="welcome-date">
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="stats-grid">
        <div className={`stat-card ${theme}`}>
          <div className="stat-icon jobs-icon">
            <BriefcaseIcon />
          </div>
          <div className="stat-content">
            <h3>Active Jobs</h3>
            <p className="stat-number">
              {formatNumber(
                jobPostings.filter((job) => job?.status === "active").length
              )}
            </p>
            <p className="stat-change positive">+5% from last month</p>
          </div>
        </div>

        <div className={`stat-card ${theme}`}>
          <div className="stat-icon internships-icon">
            <AcademicCapIcon />
          </div>
          <div className="stat-content">
            <h3>Active Internships</h3>
            <p className="stat-number">
              {formatNumber(
                internshipPostings.filter(
                  (internship) => internship?.status === "active"
                ).length
              )}
            </p>
            <p className="stat-change positive">+3% from last month</p>
          </div>
        </div>

        <div className={`stat-card ${theme}`}>
          <div className="stat-icon applications-icon">
            <DocumentIcon />
          </div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <p className="stat-number">{formatNumber(totalApplications)}</p>
            <p className="stat-change positive">+12% from last month</p>
          </div>
        </div>

        <div className={`stat-card ${theme}`}>
          <div className="stat-icon companies-icon">
            <OfficeBuildingIcon />
          </div>
          <div className="stat-content">
            <h3>Companies</h3>
            <p className="stat-number">42</p>
            <p className="stat-change positive">+2% from last month</p>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="charts-grid">
        <div className={`chart-card ${theme}`}>
          <div className="chart-header">
            <h3>Application Status</h3>
          </div>
          <div className="chart-content">
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <div className="doughnut-container">
                <Doughnut
                  data={applicationStatsData}
                  options={doughnutOptions}
                />
              </div>
            )}
          </div>
        </div>

        <div className={`chart-card ${theme}`}>
          <div className="chart-header">
            <h3>Application Trend</h3>
            <div className="chart-actions">
              <button
                className={timeRange === "week" ? "active" : ""}
                onClick={() => handleTimeRangeChange("week")}
              >
                Week
              </button>
              <button
                className={timeRange === "month" ? "active" : ""}
                onClick={() => handleTimeRangeChange("month")}
              >
                Month
              </button>
              <button
                className={timeRange === "year" ? "active" : ""}
                onClick={() => handleTimeRangeChange("year")}
              >
                Year
              </button>
            </div>
          </div>
          <div className="chart-content">
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <div className="line-container">
                <Line data={applicationTrendChartData} options={lineOptions} />
              </div>
            )}
          </div>
        </div>

        <div className={`chart-card ${theme}`}>
          <div className="chart-header">
            <h3>Job Categories</h3>
          </div>
          <div className="chart-content">
            {isLoading ? (
              <div className="loading-spinner">Loading...</div>
            ) : (
              <div className="bar-container">
                <Bar data={jobCategoriesChartData} options={barOptions} />
              </div>
            )}
          </div>
        </div>

        <div className={`chart-card ${theme}`}>
          <div className="chart-header">
            <h3>Recent Activities</h3>
            <Link to="/admin/activities" className="view-all">
              View All
            </Link>
          </div>
          <div className="chart-content">
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p>{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error handling */}
      {errors &&
        Object.entries(errors).map(
          ([key, error]) =>
            error && (
              <div key={key} className="error-message">
                <p>{error}</p>
                <button onClick={() => clearError(key)}>Dismiss</button>
              </div>
            )
        )}
      <style jsx>{`
        .dashboard-home {
          padding: 0.5rem;
        }

        .welcome-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .welcome-card.dark {
          border: 1px solid #374151;
        }

        .welcome-content h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .welcome-content p {
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .welcome-date p {
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          font-size: 0.875rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          padding: 1.25rem;
          border-radius: 0.5rem;
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .stat-card.dark {
          border: 1px solid #374151;
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 0.5rem;
          margin-right: 1rem;
        }

        .jobs-icon {
          background-color: rgba(79, 70, 229, 0.1);
          color: #4f46e5;
        }

        .internships-icon {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .applications-icon {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .companies-icon {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .stat-content h3 {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          margin-bottom: 0.5rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .stat-change {
          font-size: 0.75rem;
          display: flex;
          align-items: center;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-change.negative {
          color: #ef4444;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1rem;
        }

        .chart-card {
          border-radius: 0.5rem;
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .chart-card.dark {
          border: 1px solid #374151;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .chart-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          margin: 0;
        }

        .chart-actions {
          display: flex;
          gap: 0.5rem;
        }

        .chart-actions button {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .chart-actions button.active {
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          font-weight: 500;
        }

        .chart-actions button:hover {
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
        }

        .chart-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doughnut-container,
        .line-container,
        .bar-container {
          height: 300px;
          width: 100%;
        }

        .loading-spinner {
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          font-size: 0.875rem;
        }

        .view-all {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          text-decoration: none;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .activities-list {
          width: 100%;
          max-height: 300px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }

        .activity-icon.application {
          background-color: rgba(79, 70, 229, 0.1);
          color: #4f46e5;
        }

        .activity-icon.job {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .activity-icon.internship {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .activity-icon.review {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .activity-content {
          flex: 1;
        }

        .activity-content p {
          margin: 0 0 0.25rem 0;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          font-size: 0.875rem;
        }

        .activity-time {
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          font-size: 0.75rem;
        }

        .error-message {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: ${theme === "dark" ? "#471620" : "#fee2e2"};
          color: ${theme === "dark" ? "#f87171" : "#b91c1c"};
          border-radius: 0.25rem;
          margin-top: 1rem;
        }

        .error-message button {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#f87171" : "#b91c1c"};
          font-size: 0.875rem;
          cursor: pointer;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .welcome-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .welcome-date {
            margin-top: 0.5rem;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

// Icon components
const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const AcademicCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
);

const OfficeBuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export default DashboardHome;
