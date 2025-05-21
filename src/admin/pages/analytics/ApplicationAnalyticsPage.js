import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

function ApplicationAnalyticsPage() {
  const { theme, fetchApplicationAnalytics } = useAdmin();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!fetchApplicationAnalytics) {
        setError("Application analytics fetching function not available in context.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchApplicationAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch application analytics.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchApplicationAnalytics]);

  const isDark = theme === 'dark';
  const cardClasses = isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200';
  const textClasses = isDark ? 'text-gray-300' : 'text-gray-700';

  if (loading) return <div className={`p-4 ${textClasses}`}>Loading application analytics...</div>;
  if (error) return <div className={`p-4 text-red-500`}>Error: {error}</div>;
  if (!analyticsData) return <div className={`p-4 ${textClasses}`}>No application analytics data available.</div>;
  
  // Corrected destructuring: analyticsData is already the inner data object
  const { trends, statusDistribution, topJobs, topInternships, applicationSummary } = analyticsData || {};

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

  const trendData = trends ? {
    labels: trends.map(item => item._id),
    datasets: [{
      label: 'Application Submissions',
      data: trends.map(item => item.count),
      borderColor: isDark ? '#f472b6' : '#db2777', // Pink
      backgroundColor: isDark ? 'rgba(244,114,182,0.2)' : 'rgba(219,39,119,0.2)',
      fill: true,
      tension: 0.1,
    }],
  } : { labels: [], datasets: [] };

  const statusData = statusDistribution ? {
    labels: Object.keys(statusDistribution).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
    datasets: [{
      data: Object.values(statusDistribution),
      backgroundColor: ['#4F46E5', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#6B7280'], // Example colors
    }],
  } : { labels: [], datasets: [] };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Application Analytics</h1>

      <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Application Submission Trends (Last 30 Days)</h2>
        <div className="h-72 md:h-96">
          {trends?.length > 0 ? <Line data={trendData} options={lineChartOptions} /> : <p className={textClasses}>No trend data available.</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Status Distribution</h2>
          <div className="h-72 md:h-80">
            {statusDistribution ? <Pie data={statusData} options={pieChartOptions} /> : <p className={textClasses}>No status distribution data.</p>}
          </div>
        </div>
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Application Summary</h2>
           {applicationSummary ? (
            <ul className="space-y-2">
              {Object.entries(applicationSummary).map(([key, value]) => (
                <li key={key} className={`flex justify-between ${textClasses}`}>
                  <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                  <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
                </li>
              ))}
            </ul>
          ) : <p className={textClasses}>No summary data.</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Top Jobs by Applications</h2>
          {topJobs && topJobs.length > 0 ? (
            <ul className="space-y-2">
              {topJobs.map(job => (
                <li key={job._id} className={`text-sm ${textClasses}`}>{job.title} ({job.company}) - {job.count} applications</li>
              ))}
            </ul>
          ) : <p className={textClasses}>No data on top jobs.</p>}
        </div>
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Top Internships by Applications</h2>
           {topInternships && topInternships.length > 0 ? (
            <ul className="space-y-2">
              {topInternships.map(internship => (
                <li key={internship._id} className={`text-sm ${textClasses}`}>{internship.title} ({internship.company}) - {internship.count} applications</li>
              ))}
            </ul>
          ) : <p className={textClasses}>No data on top internships.</p>}
        </div>
      </div>
    </div>
  );
}

export default ApplicationAnalyticsPage;
