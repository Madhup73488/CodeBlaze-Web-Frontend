import React, { useState, useEffect } from 'react';
import { fetchJobApplications } from '../../utils/api';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import AdminLayout from '../../components/layout/AdminLayout';

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    searchTerm: '',
  });

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        const data = await fetchJobApplications(filters);
        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch job applications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [filters]);

  const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'applicantName', header: 'Applicant', accessor: 'applicantName' },
    { id: 'jobTitle', header: 'Job Position', accessor: 'jobTitle' },
    { id: 'submissionDate', header: 'Applied On', accessor: (row) => new Date(row.submissionDate).toLocaleDateString() },
    { 
      id: 'status', 
      header: 'Status', 
      accessor: (row) => <StatusBadge status={row.status} />
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: (row) => (
        <div className="flex gap-2">
          <button 
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => handleView(row.id)}
          >
            View
          </button>
          <button 
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => handleStatusChange(row.id, 'approved')}
          >
            Approve
          </button>
          <button 
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => handleStatusChange(row.id, 'rejected')}
          >
            Reject
          </button>
        </div>
      )
    }
  ];

  const handleView = (id) => {
    // Navigate to detailed view or open modal
    console.log('View application:', id);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Update application status
    console.log('Update status for application:', id, 'to', newStatus);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Job Applications</h1>
          <div className="flex gap-4">
            <div>
              <select 
                name="status" 
                value={filters.status}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search applications..."
                value={filters.searchTerm}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={applications}
          loading={loading}
          pagination={true}
        />
      </div>
    </AdminLayout>
  );
};

export default JobApplications;