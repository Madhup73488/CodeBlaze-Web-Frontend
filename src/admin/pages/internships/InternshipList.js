import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAdminInternshipById,
  deleteInternshipAdmin,
} from "../../utils/api";
import useTable from "../../hooks/useTable";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import AdminLayout from "../../components/layout/AdminLayout";

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    searchTerm: "",
    program: "all",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [internshipToDelete, setInternshipToDelete] = useState(null);

  // Define columns for the table
  const columns = [
    { id: "id", header: "ID", accessor: "id", searchable: true },
    { id: "title", header: "Title", accessor: "title", searchable: true },
    { id: "program", header: "Program", accessor: "program", searchable: true },
    { id: "duration", header: "Duration", accessor: "duration" },
    {
      id: "startDate",
      header: "Start Date",
      accessor: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      id: "deadline",
      header: "Deadline",
      accessor: (row) => new Date(row.deadline).toLocaleDateString(),
    },
    {
      id: "status",
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/internships/${row.id}`}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View
          </Link>
          <Link
            to={`/admin/internships/edit/${row.id}`}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Edit
          </Link>
          <button
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => handleDeleteClick(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Initialize table hook with empty array if data isn't available yet
  const table = useTable(internships || [], columns, {
    initialSortBy: "deadline",
    initialSortDirection: "asc",
  });

  useEffect(() => {
    const loadInternships = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminInternshipById(filters);
        // Ensure data is an array
        setInternships(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch internships:", error);
        setInternships([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadInternships();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClick = (internship) => {
    setInternshipToDelete(internship);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!internshipToDelete) return;

    try {
      await deleteInternshipAdmin(internshipToDelete.id);
      // Remove the deleted item from the state
      setInternships(
        internships.filter((item) => item.id !== internshipToDelete.id)
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete internship:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Internships</h1>
          <div className="flex gap-4">
            <div>
              <select
                name="program"
                value={filters.program}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Programs</option>
                <option value="summer">Summer Internship</option>
                <option value="semester">Semester Internship</option>
                <option value="year">Year-long Internship</option>
              </select>
            </div>
            <div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search internships..."
                value={filters.searchTerm}
                onChange={handleFilterChange}
                className="border rounded px-3 py-2"
              />
            </div>
            <Link
              to="/admin/internships/create"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add New
            </Link>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={table.tableData}
          loading={loading}
          pagination={{
            currentPage: table.currentPage,
            totalPages: table.totalPages,
            onPageChange: table.handlePageChange,
            pageSize: table.pageSize,
            onPageSizeChange: table.handlePageSizeChange,
            pageSizeOptions: table.pageSizeOptions,
          }}
          sorting={{
            sortBy: table.sortBy,
            sortDirection: table.sortDirection,
            onSort: table.handleSort,
          }}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete this internship? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default InternshipList;
