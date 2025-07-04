import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Pie, Bar } from 'react-chartjs-2'; // Using Pie for status, Bar for others
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

function JobAnalyticsPage() {
  const { theme, fetchJobAnalytics } = useAdmin();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!fetchJobAnalytics) {
        setError("Job analytics fetching function not available in context.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchJobAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch job analytics.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchJobAnalytics]);

  const isDark = theme === 'dark';
  const cardClasses = isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-gray-200';
  const textClasses = isDark ? 'text-gray-300' : 'text-gray-700';

  if (loading) return <div className={`p-4 ${textClasses}`}>Loading job analytics...</div>;
  if (error) return <div className={`p-4 text-red-500`}>Error: {error}</div>;
  if (!analyticsData) return <div className={`p-4 ${textClasses}`}>No job analytics data available.</div>;

  // Corrected destructuring: analyticsData is already the inner data object
  // Ensure each destructured property defaults to an appropriate type if not present in analyticsData
  const statusDistribution = analyticsData?.statusDistribution || {}; // Expects an object
  const workTypeDistribution = analyticsData?.workTypeDistribution && Array.isArray(analyticsData.workTypeDistribution) ? analyticsData.workTypeDistribution : [];
  const employmentTypeDistribution = analyticsData?.employmentTypeDistribution && Array.isArray(analyticsData.employmentTypeDistribution) ? analyticsData.employmentTypeDistribution : [];
  const popularSkills = analyticsData?.popularSkills && Array.isArray(analyticsData.popularSkills) ? analyticsData.popularSkills : [];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { color: isDark ? "#e0e0e0" : "#333" } } },
  };
  
  const barChartOptions = {
    ...chartOptions,
    indexAxis: 'y', // For horizontal bar charts if desired for skills
    plugins: { legend: { display: false } }, // Often better for bar charts
    scales: {
      x: { grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }, ticks: { color: isDark ? "#9ca3af" : "#6b7280" } },
      y: { grid: { color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }, ticks: { color: isDark ? "#9ca3af" : "#6b7280" } },
    },
  };

  const statusData = statusDistribution ? {
    labels: Object.keys(statusDistribution).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
    datasets: [{
      data: Object.values(statusDistribution),
      backgroundColor: [isDark ? '#10B981AA' : '#10B981', isDark ? '#EF4444AA' : '#EF4444'], // Active, Inactive
    }],
  } : { labels: [], datasets: [] };

  const workTypeData = workTypeDistribution ? {
    labels: workTypeDistribution.map(item => item._id),
    datasets: [{
      label: 'Work Types',
      data: workTypeDistribution.map(item => item.count),
      backgroundColor: isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.9)',
    }],
  } : { labels: [], datasets: [] };
  
  const employmentTypeData = employmentTypeDistribution ? {
    labels: employmentTypeDistribution.map(item => item._id),
    datasets: [{
      label: 'Employment Types',
      data: employmentTypeDistribution.map(item => item.count),
      backgroundColor: isDark ? 'rgba(245, 158, 11, 0.7)' : 'rgba(245, 158, 11, 0.9)',
    }],
  } : { labels: [], datasets: [] };

  const popularSkillsData = popularSkills ? {
    labels: popularSkills.map(item => item._id),
    datasets: [{
      label: 'Skill Count',
      data: popularSkills.map(item => item.count),
      backgroundColor: isDark ? 'rgba(79, 70, 229, 0.7)' : 'rgba(79, 70, 229, 0.9)',
    }],
  } : { labels: [], datasets: [] };


  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Job Analytics</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Status Distribution</h2>
          <div className="h-72 md:h-80">
            {statusDistribution ? <Pie data={statusData} options={chartOptions} /> : <p className={textClasses}>No status data.</p>}
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Work Type Distribution</h2>
          <div className="h-72 md:h-80">
            {workTypeDistribution?.length > 0 ? <Bar data={workTypeData} options={barChartOptions} /> : <p className={textClasses}>No work type data.</p>}
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Employment Type Distribution</h2>
          <div className="h-72 md:h-80">
            {employmentTypeDistribution?.length > 0 ? <Bar data={employmentTypeData} options={barChartOptions} /> : <p className={textClasses}>No employment type data.</p>}
          </div>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg shadow border ${cardClasses}`}>
        <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Popular Skills (Top 10)</h2>
        <div className="h-96"> {/* Taller for potentially more skills */}
            {popularSkills?.length > 0 ? <Bar data={popularSkillsData} options={{...barChartOptions, indexAxis: 'y'}} /> : <p className={textClasses}>No popular skills data.</p>}
        </div>
      </div>
    </div>
  );
}

export default JobAnalyticsPage;
