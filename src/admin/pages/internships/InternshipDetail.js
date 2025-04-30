import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import StatusBadge from "../../components/common/StatusBadge";
import DataTable from "../../components/common/DataTable";
import {
  fetchAdminInternshipById, // Corrected name
  fetchAdminInternshipApplications, // Corrected name
  deleteInternshipAdmin, // Corrected name
  updateInternshipAdmin, // Using this assuming it handles status updates
} from "../../utils/api";
import useTable from "../../hooks/useTable";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  const {
    sorting,
    pagination,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = useTable({
    defaultSort: { field: "applicationDate", direction: "desc" },
    defaultPageSize: 5,
  });

  useEffect(() => {
    const loadInternship = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminInternshipById(id);
        setInternship(data);
      } catch (error) {
        console.error("Failed to load internship", error);
        setError("Failed to load internship details.");
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [id]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setApplicationsLoading(true);
        const data = await fetchAdminInternshipApplications(id, {
          ...sorting,
          page: pagination.page,
          pageSize: pagination.pageSize,
        });
        setApplications(data.applications);
        pagination.setTotalItems(data.total);
      } catch (error) {
        console.error("Failed to load applications", error);
      } finally {
        setApplicationsLoading(false);
      }
    };

    if (internship) {
      loadApplications();
    }
  }, [id, internship, sorting, pagination.page, pagination.pageSize]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      try {
        setActionInProgress(true);
        await deleteInternshipAdmin(id);
        navigate("/admin/internships");
      } catch (error) {
        console.error("Failed to delete internship", error);
        setActionInProgress(false);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setActionInProgress(true);
      await updateInternshipAdmin(id, newStatus);
      setInternship({ ...internship, status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setActionInProgress(false);
    }
  };

  const applicationColumns = [
    {
      field: "applicantName",
      header: "Applicant",
      sortable: true,
      render: (row) => (
        <Link
          to={`/admin/applications/${row.id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {row.applicantName}
        </Link>
      ),
    },
    {
      field: "email",
      header: "Email",
      sortable: true,
    },
    {
      field: "education",
      header: "Education",
      sortable: true,
    },
    {
      field: "applicationDate",
      header: "Applied On",
      sortable: true,
      render: (row) => new Date(row.applicationDate).toLocaleDateString(),
    },
    {
      field: "status",
      header: "Status",
      sortable: true,
      render: (row) => (
        <StatusBadge
          status={row.status}
          variants={{
            pending: "warning",
            reviewing: "info",
            interviewed: "primary",
            accepted: "success",
            rejected: "danger",
          }}
        />
      ),
    },
    {
      field: "actions",
      header: "Actions",
      render: (row) => (
        <Link
          to={`/admin/applications/${row.id}`}
          className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded text-sm"
        >
          View
        </Link>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error || "Internship not found"}</p>
          <button
            onClick={() => navigate("/admin/internships")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  const getStatusActions = () => {
    switch (internship.status) {
      case "draft":
        return (
          <button
            onClick={() => handleStatusChange("active")}
            disabled={actionInProgress}
            className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded text-sm font-medium disabled:opacity-50"
          >
            Publish
          </button>
        );
      case "active":
        return (
          <>
            <button
              onClick={() => handleStatusChange("filled")}
              disabled={actionInProgress}
              className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm font-medium mx-2 disabled:opacity-50"
            >
              Mark Filled
            </button>
            <button
              onClick={() => handleStatusChange("expired")}
              disabled={actionInProgress}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded text-sm font-medium disabled:opacity-50"
            >
              Mark Expired
            </button>
          </>
        );
      case "expired":
        return (
          <button
            onClick={() => handleStatusChange("active")}
            disabled={actionInProgress}
            className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded text-sm font-medium disabled:opacity-50"
          >
            Reactivate
          </button>
        );
      case "filled":
        return (
          <button
            onClick={() => handleStatusChange("active")}
            disabled={actionInProgress}
            className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded text-sm font-medium disabled:opacity-50"
          >
            Reopen
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/admin/internships")}
              className="mr-4 text-gray-600 hover:text-blue-600"
            >
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {internship.title}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to={`/admin/internships/${id}/edit`}
              className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              <FiEdit2 className="mr-2" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={actionInProgress}
              className="flex items-center px-4 py-2 border border-red-300 rounded text-red-700 hover:bg-red-50 disabled:opacity-50"
            >
              <FiTrash2 className="mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mt-6">
          <div className="flex items-start">
            <FiMapPin className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{internship.department}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FiMapPin className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">
                {internship.location}{" "}
                {internship.isRemote && "(Remote Available)"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FiClock className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{internship.duration}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FiClock className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Hours</p>
              <p className="font-medium">
                {internship.hours.replace("-", " ")}{" "}
                {internship.isFlexible && "(Flexible)"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FiDollarSign className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Stipend</p>
              <p className="font-medium">
                {internship.stipend || "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FiCalendar className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Application Deadline</p>
              <p className="font-medium">
                {new Date(internship.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center">
            <span className="mr-3">Status:</span>
            <StatusBadge
              status={internship.status}
              variants={{
                active: "success",
                draft: "warning",
                expired: "danger",
                filled: "info",
              }}
            />
          </div>
          <div className="flex">{getStatusActions()}</div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-line">{internship.description}</p>
        </div>

        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-line">{internship.requirements}</p>
        </div>

        {internship.benefits && (
          <>
            <h2 className="text-xl font-bold mb-4">Benefits</h2>
            <div className="prose max-w-none mb-8">
              <p className="whitespace-pre-line">{internship.benefits}</p>
            </div>
          </>
        )}
      </div>

      <div className="p-6 border-t">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <FiUsers className="mr-2" />
            Applications ({pagination.totalItems})
          </h2>
          <Link
            to={`/admin/applications?internshipId=${id}`}
            className="text-blue-600 hover:underline"
          >
            View All Applications
          </Link>
        </div>

        {applications.length > 0 ? (
          <DataTable
            data={applications}
            columns={applicationColumns}
            loading={applicationsLoading}
            sorting={sorting}
            onSort={handleSort}
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-2">No applications received yet</p>
            {internship.status === "draft" && (
              <p className="text-sm text-gray-500">
                This internship is still in draft mode. Publish it to start
                receiving applications.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipDetail;
