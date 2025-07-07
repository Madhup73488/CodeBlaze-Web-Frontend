import React, { useEffect } from "react"; // Removed useState
import { Link } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // BarElement, // Commented out as Bar chart is not used yet
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2"; // Removed Line and Bar
import ConnectAccess from "./ConnectAccess";

// Register Chart.js components
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // BarElement, // Commented out
  Tooltip,
  Legend
);

// Placeholder Icon Definitions
const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="10" r="3"></circle>
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);


const DashboardHome = () => {
  const {
    currentUser,
    theme,
    fetchDashboardStats,
    dashboardStats,
    loadingStates = {},
    errors,
    clearError,
  } = useAdmin();

  useEffect(() => {
    if (fetchDashboardStats) {
      fetchDashboardStats();
    }
  }, [fetchDashboardStats]);

  const getApplicationStatusCounts = () => {
    if (!dashboardStats?.applicationsByStatus || !Array.isArray(dashboardStats.applicationsByStatus)) {
      return { labels: [], data: [], backgroundColors: [] };
    }
    // New structure: applicationsByStatus is an array like [{ status: 'pending', count: 5 }, ...]
    const labels = dashboardStats.applicationsByStatus.map(item => item.status.charAt(0).toUpperCase() + item.status.slice(1));
    const data = dashboardStats.applicationsByStatus.map(item => item.count);
    const backgroundColors = [
      "#4F46E5", "#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#6B7280",
    ];
    const finalBackgroundColors = labels.map((_, i) => backgroundColors[i % backgroundColors.length]);
    return { labels, data, backgroundColors: finalBackgroundColors };
  };
  
  const appStatusChartData = getApplicationStatusCounts();

  const applicationStatsData = {
    labels: appStatusChartData.labels,
    datasets: [
      {
        data: appStatusChartData.data,
        backgroundColor: appStatusChartData.backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  // Application Trend chart data is not available from /api/admin/dashboard
  // This chart will be removed or will need a separate API call if still desired on dashboard.
  // For now, removing the placeholder data for it.

  // Job Categories chart data is not available from /api/admin/dashboard
  // This chart will be removed. This data is in JobAnalyticsPage.

  const formatNumber = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "application": return <DocumentIcon />;
      case "user": return <UserCircleIcon />;
      case "job": case "internship": return <BriefcaseIcon />;
      default: return <BellIcon />;
    }
  };
  
  const isLoading = loadingStates.dashboardStats;

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "right", labels: { color: theme === "dark" ? "#e0e0e0" : "#6b7280" } } },
  };

  // const lineOptions = { // Commented out as Line chart for trends was removed from dashboard
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: { legend: { display: false } },
  //   scales: {
  //     x: { grid: { color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }, ticks: { color: theme === "dark" ? "#9ca3af" : "#6b7280" } },
  //     y: { grid: { color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }, ticks: { color: theme === "dark" ? "#9ca3af" : "#6b7280" } },
  //   },
  // };

  // const barOptions = { // Commented out as Bar chart is not used yet
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: { legend: { display: false } },
  //   scales: {
  //     x: { grid: { display: false }, ticks: { color: theme === "dark" ? "#9ca3af" : "#6b7280" } },
  //     y: { grid: { color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" }, ticks: { color: theme === "dark" ? "#9ca3af" : "#6b7280" } },
  //   },
  // };

  return (
    <div className="dashboard-home">
      <div className={`welcome-card ${theme}`}>
        <div className="welcome-content">
          <h1>Welcome back, {currentUser?.name || "Admin"}</h1>
          <p>Here's what's happening with your job portal today</p>
        </div>
        <div className="welcome-date">
          <p>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className={`stat-card ${theme}`}>
          <div className="stat-icon jobs-icon"><BriefcaseIcon /></div>
          <div className="stat-content">
            <h3>Active Jobs</h3>
            <p className="stat-number">{formatNumber(dashboardStats?.counts?.activeJobs)}</p>
            <p className="stat-change positive">Total: {formatNumber(dashboardStats?.counts?.jobs)}</p>
          </div>
        </div>
        <div className={`stat-card ${theme}`}>
          <div className="stat-icon internships-icon"><AcademicCapIcon /></div>
          <div className="stat-content">
            <h3>Active Internships</h3>
            <p className="stat-number">{formatNumber(dashboardStats?.counts?.internships)}</p>
            <p className="stat-change positive"></p>
          </div>
        </div>
        <div className={`stat-card ${theme}`}>
          <div className="stat-icon applications-icon"><DocumentIcon /></div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <p className="stat-number">{formatNumber(dashboardStats?.counts?.applications)}</p>
            <p className="stat-change positive">{formatNumber(dashboardStats?.counts?.newApplications)} new</p>
          </div>
        </div>
        <div className={`stat-card ${theme}`}>
          <div className="stat-icon companies-icon"><UserGroupIcon /></div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{formatNumber(dashboardStats?.counts?.users)}</p>
            <p className="stat-change positive">+2% from last month</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className={`chart-card ${theme}`}>
          <div className="chart-header"><h3>Application Status</h3></div>
          <div className="chart-content">
            {isLoading ? <div className="loading-spinner">Loading...</div> : <div className="doughnut-container"><Doughnut data={applicationStatsData} options={doughnutOptions} /></div>}
          </div>
        </div>
        {/* Application Trend Chart Removed - Data not in this endpoint */}
        {/* Job Categories Chart Removed - Data not in this endpoint */}

        <div className={`chart-card ${theme} col-span-1 md:col-span-2`}> {/* Making recent applications take more space */}
          <div className="chart-header"><h3>Recent Applications</h3><Link to="/admin/applications" className="view-all">View All Applications</Link></div>
          <div className="chart-content">
            <div className="activities-list">
              {dashboardStats?.recentApplications?.length > 0 ? (
                dashboardStats.recentApplications.map((app, index) => ( // Added index for a more robust fallback key if needed
                  <div key={app._id ? String(app._id) : `app-${index}`} className="activity-item">
                    <div className={`activity-icon application`}>{getActivityIcon("application")}</div>
                    <div className="activity-content">
                      <p><strong>{app.userId?.name || 'N/A'}</strong> applied for <strong> {app.jobId?.title || app.internshipId?.title || 'N/A'}</strong>
                        {app.jobId?.company && ` at ${app.jobId.company}`}
                        {app.internshipId?.company && ` at ${app.internshipId.company}`}
                      </p>
                      <span className="activity-time">{formatDate(app.createdAt)} - Status: {app.status}</span>
                    </div>
                  </div>
                ))
              ) : (<p className="text-center">No recent applications.</p>)}
            </div>
          </div>
        </div>
         <div className={`chart-card ${theme}`}>
          <div className="chart-header"><h3>Recent Users</h3><Link to="/admin/users" className="view-all">View All Users</Link></div>
          <div className="chart-content">
            <div className="activities-list">
              {dashboardStats?.recentUsers?.length > 0 ? (
                dashboardStats.recentUsers.map((user, index) => ( // Added index for a more robust fallback key if needed
                  <div key={user._id ? String(user._id) : `user-${index}`} className="activity-item">
                    <div className={`activity-icon user`}>{getActivityIcon("user")}</div>
                    <div className="activity-content">
                      <p><strong>{user.name}</strong> ({user.email}) registered.</p>
                      <span className="activity-time">Role: {user.role} - Joined: {formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (<p className="text-center">No recent users.</p>)}
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className={`chart-card ${theme} col-span-1 md:col-span-2`}>
          <ConnectAccess />
        </div>
      </div>

      {errors && Object.entries(errors).map(([key, error]) => error && (
        <div key={key} className="error-message">
          <p>{error}</p>
          <button onClick={() => clearError(key)}>Dismiss</button>
        </div>
      ))}
      <style jsx>{`
        /* Styles remain largely the same, ensure theme prop is used for colors */
        .dashboard-home { padding: 0.5rem; }
        .welcome-card { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1.5rem; background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"}; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
        .welcome-card.dark { border: 1px solid #374151; }
        .welcome-content h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; color: ${theme === "dark" ? "#e0e0e0" : "#111827"}; }
        .welcome-content p { color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; }
        .welcome-date p { color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; font-size: 0.875rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { display: flex; align-items: center; padding: 1.25rem; border-radius: 0.5rem; background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"}; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
        .stat-card.dark { border: 1px solid #374151; }
        .stat-icon { display: flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; border-radius: 0.5rem; margin-right: 1rem; }
        .jobs-icon { background-color: rgba(79, 70, 229, 0.1); color: #4f46e5; }
        .internships-icon { background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .applications-icon { background-color: rgba(16, 185, 129, 0.1); color: #10b981; }
        .companies-icon { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .stat-content h3 { font-size: 0.875rem; font-weight: 500; color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; margin-bottom: 0.5rem; }
        .stat-number { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.25rem; color: ${theme === "dark" ? "#e0e0e0" : "#111827"}; }
        .stat-change { font-size: 0.75rem; display: flex; align-items: center; }
        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }
        .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1rem; }
        .chart-card { border-radius: 0.5rem; background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"}; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); overflow: hidden; display: flex; flex-direction: column; }
        .chart-card.dark { border: 1px solid #374151; }
        .chart-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}; }
        .chart-header h3 { font-size: 1rem; font-weight: 600; color: ${theme === "dark" ? "#e0e0e0" : "#111827"}; margin: 0; }
        .chart-actions { display: flex; gap: 0.5rem; }
        .chart-actions button { background: none; border: none; color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; font-size: 0.875rem; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 0.25rem; }
        .chart-actions button.active { background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"}; color: ${theme === "dark" ? "#e0e0e0" : "#111827"}; font-weight: 500; }
        .chart-actions button:hover { background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"}; }
        .chart-content { padding: 1.25rem; flex: 1; display: flex; align-items: center; justify-content: center; }
        .doughnut-container, .line-container, .bar-container { height: 300px; width: 100%; }
        .loading-spinner { color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; font-size: 0.875rem; }
        .view-all { font-size: 0.875rem; color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"}; text-decoration: none; }
        .view-all:hover { text-decoration: underline; }
        .activities-list { width: 100%; max-height: 300px; overflow-y: auto; }
        .activity-item { display: flex; align-items: flex-start; padding: 0.75rem 0; border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}; }
        .activity-item:last-child { border-bottom: none; }
        .activity-icon { display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; margin-right: 0.75rem; flex-shrink: 0; }
        .activity-icon.application { background-color: rgba(79, 70, 229, 0.1); color: #4f46e5; }
        .activity-icon.job { background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .activity-icon.internship { background-color: rgba(16, 185, 129, 0.1); color: #10b981; }
        .activity-icon.review { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .activity-content { flex: 1; }
        .activity-content p { margin: 0 0 0.25rem 0; color: ${theme === "dark" ? "#e0e0e0" : "#111827"}; font-size: 0.875rem; }
        .activity-time { color: ${theme === "dark" ? "#9ca3af" : "#6b7280"}; font-size: 0.75rem; }
        .error-message { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background-color: ${theme === "dark" ? "#471620" : "#fee2e2"}; color: ${theme === "dark" ? "#f87171" : "#b91c1c"}; border-radius: 0.25rem; margin-top: 1rem; }
        .error-message button { background: none; border: none; color: ${theme === "dark" ? "#f87171" : "#b91c1c"}; font-size: 0.875rem; cursor: pointer; text-decoration: underline; }
        @media (max-width: 768px) {
          .welcome-card { flex-direction: column; align-items: flex-start; }
          .welcome-date { margin-top: 0.5rem; }
          .charts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

// Icon components
const BriefcaseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect> <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path> </svg> );
const AcademicCapIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path> <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path> </svg> );
const DocumentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path> <polyline points="14 2 14 8 20 8"></polyline> <line x1="16" y1="13" x2="8" y2="13"></line> <line x1="16" y1="17" x2="8" y2="17"></line> <polyline points="10 9 9 9 8 9"></polyline> </svg> );
// const OfficeBuildingIcon = () => ( ... ); // Removed as unused
// const CheckCircleIcon = () => ( ... ); // Removed as unused
const BellIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path> <path d="M13.73 21a2 2 0 0 1-3.46 0"></path> </svg> );

export default DashboardHome;
