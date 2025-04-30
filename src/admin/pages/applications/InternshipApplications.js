// src/admin/pages/applications/InternshipApplications.js

import React, { useState, useEffect } from 'react';
// Import API functions - path is correct
import { fetchAdminInternshipApplications, updateApplicationStatus } from '../../utils/api';
// FIX: Correct paths for common components back to ../../
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
// FIX: Correct path for layout component back to ../../
import AdminLayout from '../../components/layout/AdminLayout';


const InternshipApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    search: '', // Renamed from searchTerm to match typical API params
    // program: 'all' // Backend API controller didn't show filter by program, adjust if needed
  });
   const [pagination, setPagination] = useState({
       total: 0,
       page: 1,
       limit: 10,
       pages: 1,
   });
   const [updatingStatus, setUpdatingStatus] = useState({}); // State to track status update loading per application


  // Function to load applications based on current filters and pagination
  const loadApplications = async (currentPage = pagination.page, currentFilters = filters) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const params = {
          ...currentFilters,
          page: currentPage,
          limit: pagination.limit, // Use current limit from state
      };
      const response = await fetchAdminInternshipApplications(params); // Correct function name
      setApplications(response.data); // Backend returns data in response.data
      setPagination(response.pagination); // Backend returns pagination in response.pagination

    } catch (error) {
      console.error('Failed to fetch internship applications:', error);
      setError(error.message || 'Failed to load internship applications.'); // Set error message
      setApplications([]); // Clear applications on error
      setPagination({ total: 0, page: 1, limit: 10, pages: 1 }); // Reset pagination
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      // Load applications when filters or pagination limit changes
      // We pass 1 for page here because changing filters should reset to the first page
      loadApplications(1, filters);
  }, [filters, pagination.limit]); // Depend on filters and pagination.limit


  // Effect to load applications when the page number changes (e.g., from pagination controls)
   const handlePageChange = (newPage) => {
       if (newPage >= 1 && newPage <= pagination.pages && newPage !== pagination.page) {
           loadApplications(newPage); // Pass the new page number
       }
   };


  const columns = [
    // Accessors might need adjustment based on actual backend data structure
    { id: '_id', header: 'ID', accessor: '_id' }, // Use _id from MongoDB
    { id: 'applicantName', header: 'Student Name', accessor: (row) => row.user?.name || 'N/A' }, // Assuming user is populated
    // { id: 'university', header: 'University', accessor: (row) => row.user?.university || 'N/A' }, // Assuming university is on user model
    { id: 'program', header: 'Internship Program', accessor: (row) => row.internship?.title || 'N/A' }, // Assuming internship is populated
    {
        id: 'submissionDate',
        header: 'Applied On',
        accessor: (row) => new Date(row.createdAt).toLocaleDateString() // Backend uses createdAt
    },
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
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleView(row._id)} // Use _id
            disabled={updatingStatus[row._id]} // Disable if status is updating
          >
            View
          </button>
           {/* Add more status change buttons if backend supports more states */}
           {/* Render buttons based on valid status transitions from the backend's list */}
           {/* Backend statuses: "pending", "reviewing", "shortlisted", "interviewed", "offered", "hired", "rejected" */}

            {row.status !== 'approved' && row.status !== 'rejected' && row.status !== 'hired' && (
                 <button
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleStatusChange(row._id, 'approved')} // Example transition
                    disabled={updatingStatus[row._id]}
                  >
                     {updatingStatus[row._id] ? 'Updating...' : 'Approve'}
                  </button>
            )}

            {row.status !== 'rejected' && row.status !== 'hired' && (
                 <button
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleStatusChange(row._id, 'rejected')} // Example transition
                    disabled={updatingStatus[row._id]}
                 >
                     {updatingStatus[row._id] ? 'Updating...' : 'Reject'}
                 </button>
            )}

             {/* Example: Button to set status to Reviewing */}
             {row.status === 'pending' && (
                 <button
                    className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleStatusChange(row._id, 'reviewing')}
                    disabled={updatingStatus[row._id]}
                 >
                     {updatingStatus[row._id] ? 'Updating...' : 'Review'}
                 </button>
             )}
              {/* Add buttons for other transitions (shortlisted, interviewed, offered, hired) based on your desired workflow */}

             {/* Example: Button to set back to pending */}
             {(row.status === 'approved' || row.status === 'rejected' || row.status === 'hired') && (
                 <button
                     className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                     onClick={() => handleStatusChange(row._id, 'pending')} // Use _id
                      disabled={updatingStatus[row._id]} // Disable if status is updating
                 >
                     {updatingStatus[row._id] ? 'Updating...' : 'Set Pending'}
                 </button>
             )}
        </div>
      )
    }
  ];

  const handleView = (id) => {
    // Navigate to detailed view or open modal
    console.log('View internship application:', id);
    // Example: navigate(`/admin/applications/internships/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log('Attempting to update status for application:', id, 'to', newStatus);
    setUpdatingStatus(prev => ({ ...prev, [id]: true })); // Set loading state for this application
    try {
      const response = await updateApplicationStatus(id, newStatus); // Use the API function
      console.log('Status update successful:', response.data); // Backend returns updated data in response.data
      // Update the application in the local state
      setApplications(applications.map(app =>
        app._id === id ? response.data : app // Backend returns updated data in response.data
      ));
      // Optionally, show a success notification
    } catch (error) {
      console.error('Failed to update application status:', error);
      // Optionally, show an error notification
      alert(`Failed to update status: ${error.message}`); // Basic alert
    } finally {
       setUpdatingStatus(prev => ({ ...prev, [id]: false })); // Clear loading state for this application
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    // Note: useEffect with [filters] will handle calling loadApplications(1, newFilters)
  };

  const handleSearchChange = (e) => {
       const { value } = e.target;
       setFilters(prevFilters => ({
           ...prevFilters,
           search: value, // Update the search term
       }));
        // Note: useEffect with [filters] will handle calling loadApplications(1, newFilters)
   };


   // DataTable expects a function for pagination changes
   const handleDataTablePageChange = (page) => {
       handlePageChange(page); // Call our internal page change handler
   };

   // DataTable expects a function for limit changes
    const handleDataTableLimitChange = (newLimit) => {
         setPagination(prev => ({ ...prev, limit: newLimit, page: 1 })); // Reset to page 1 when limit changes
         // The useEffect will trigger a data reload with the new limit
    };


  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Internship Applications</h1>
          <div className="flex gap-4">
            {/* Filter by Program - Enable if backend supports */}
            {/* <div>
              <select
                name="program"
                value={filters.program}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Programs</option>
                 {/* Add dynamic options based on available programs */}
                {/* <option value="summer">Summer Internship</option>
                <option value="semester">Semester Internship</option>
                <option value="year">Year-long Internship</option>
              </select>
            </div> */}
            <div>
              {/* Filter by Status */}
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option> {/* Match backend statuses */}
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="offered">Offered</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              {/* Search Input */}
              <input
                type="text"
                name="search" // Match the filter state key
                placeholder="Search applications..."
                value={filters.search}
                onChange={handleSearchChange} // Use specific search handler
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} />} {/* Display error message */}

        {/* Show loading spinner if initial data is loading */}
        {loading && <LoadingSpinner />}

        {/* Render DataTable or empty state only after initial loading is done */}
        {!loading && (
             applications.length > 0 ? (
                <DataTable
                   columns={columns}
                   data={applications}
                   // loading={loading} // Can pass loading here if DataTable shows an overlay
                   pagination={true} // Enable pagination UI
                   totalItems={pagination.total} // Total items from backend
                   itemsPerPage={pagination.limit} // Items per page from backend
                   currentPage={pagination.page} // Current page from state
                   totalPages={pagination.pages} // Total pages from backend
                   onPageChange={handleDataTablePageChange} // Handler for page changes
                   onLimitChange={handleDataTableLimitChange} // Handler for items per page changes
                   // Add sorting props if your DataTable and backend support it
                   // onSortChange={handleSortChange}
                   // sortColumn={sortConfig.column}
                   // sortDirection={sortConfig.direction}
                 />
             ) : (
                 !error && <p className="text-center text-gray-500">No internship applications found.</p>
             )
        )}


      </div>
    </AdminLayout>
  );
};

export default InternshipApplications;