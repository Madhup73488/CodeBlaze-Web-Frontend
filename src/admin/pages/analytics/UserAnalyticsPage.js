import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

function UserAnalyticsPage() {
  const { theme, fetchUserAnalytics } = useAdmin();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!fetchUserAnalytics) {
        setError("User analytics fetching function not available in context.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchUserAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch user analytics.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchUserAnalytics]);

  const isDark = theme === 'dark';
  const cardClasses = isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200';
  const textClasses = isDark ? 'text-gray-300' : 'text-gray-700';

  if (loading) return <div className={`p-4 ${textClasses}`}>Loading user analytics...</div>;
  if (error) return <div className={`p-4 text-red-500`}>Error: {error}</div>;
  if (!analyticsData) return <div className={`p-4 ${textClasses}`}>No user analytics data available.</div>;

  // Corrected destructuring: analyticsData is already the inner data object
  // Ensure each destructured property defaults to an empty array if not present or not an array in analyticsData
  const trends = analyticsData?.trends && Array.isArray(analyticsData.trends) ? analyticsData.trends : [];
  const roleDistribution = analyticsData?.roleDistribution && Array.isArray(analyticsData.roleDistribution) ? analyticsData.roleDistribution : [];
  const loginMethods = analyticsData?.loginMethods && Array.isArray(analyticsData.loginMethods) ? analyticsData.loginMethods : [];

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top', labels: { color: isDark ? "#e0e0e0" : "#333"} } },
    scales: {
      x: { grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }, ticks: { color: isDark ? "#9ca3af" : "#6b7280" } },
      y: { grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }, ticks: { color: isDark ? "#9ca3af" : "#6b7280" } },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { color: isDark ? "#e0e0e0" : "#333" } } },
  };
  
  const trendData = {
    labels: trends.map(item => item._id),
    datasets: [{
      label: 'User Registrations',
      data: trends.map(item => item.count),
      borderColor: isDark ? '#38bdf8' : '#0ea5e9', // Light blue / Blue
      backgroundColor: isDark ? 'rgba(56,189,248,0.2)' : 'rgba(14,165,233,0.2)',
      fill: true,
      tension: 0.1,
    }],
  };

  const roleData = {
    labels: roleDistribution.map(item => item._id.charAt(0).toUpperCase() + item._id.slice(1)),
    datasets: [{
      data: roleDistribution.map(item => item.count),
      backgroundColor: ['#4F46E5', '#F59E0B', '#10B981', '#3B82F6', '#EC4899'], // Example colors
    }],
  };
  
  const loginMethodData = {
    labels: loginMethods.map(item => item._id ? (item._id.charAt(0).toUpperCase() + item._id.slice(1)) : "Unknown/Direct"),
    datasets: [{
      data: loginMethods.map(item => item.count),
      backgroundColor: ['#8B5CF6', '#FBBF24', '#22C55E', '#60A5FA', '#F472B6'], // Example colors
    }],
  };


  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>User Analytics</h1>
      
      <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>User Registration Trends (Last 30 Days)</h2>
        <div className="h-72 md:h-96"> {/* Increased height for line chart */}
          {trends.length > 0 ? <Line data={trendData} options={lineChartOptions} /> : <p className={textClasses}>No trend data available.</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Role Distribution</h2>
          <div className="h-72 md:h-80"> {/* Increased height for pie chart */}
            {roleDistribution.length > 0 ? <Pie data={roleData} options={pieChartOptions} /> : <p className={textClasses}>No role distribution data.</p>}
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Login Methods</h2>
          <div className="h-72 md:h-80"> {/* Increased height for doughnut chart */}
            {loginMethods.length > 0 ? <Doughnut data={loginMethodData} options={pieChartOptions} /> : <p className={textClasses}>No login method data.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAnalyticsPage;
