import React, { useState, useEffect, useCallback } from "react";
import {
  fetchAdminAccounts,
  updateAdminAccount,
  deleteAdminAccount,
} from "../../utils/api";
import { useAdmin } from "../../contexts/AdminContext";

function AdminUsersTable({ newAdminUser }) {
  const { theme } = useAdmin();
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // Track which user is being acted on

  const loadAdminUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAdminAccounts();
      setAdminUsers(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch admin users.");
      setAdminUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdminUsers();
  }, [loadAdminUsers]);

  useEffect(() => {
    if (newAdminUser) {
      loadAdminUsers();
    }
  }, [newAdminUser, loadAdminUsers]);

  const handleTogglePause = async (userId, currentStatus) => {
    setActionLoading(userId);
    const newStatus = currentStatus === "active" ? "paused" : "active";
    try {
      await updateAdminAccount(userId, { status: newStatus });
      loadAdminUsers();
    } catch (err) {
      alert(`Failed to update user status: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this admin user? This action cannot be undone."
      )
    ) {
      setActionLoading(userId);
      try {
        await deleteAdminAccount(userId);
        loadAdminUsers();
      } catch (err) {
        alert(`Failed to delete user: ${err.message}`);
      } finally {
        setActionLoading(null);
      }
    }
  };

  const isDark = theme === "dark";

  if (loading) {
    return (
      <div className={`flex justify-center items-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-500'}`}></div>
        <span className="ml-3">Loading admin users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-4 rounded-md ${
          isDark ? "bg-red-800 text-red-100" : "bg-red-100 text-red-700" // Adjusted dark red
        } mb-4`}
      >
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium">Error loading admin users</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {adminUsers.length === 0 ? (
        <div
            className={`text-center py-12 ${
              isDark ? "text-gray-500" : "text-gray-400" // Adjusted for better contrast
            }`}
          >
            <svg
              className={`mx-auto h-12 w-12 ${isDark ? "text-gray-600" : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p className="mt-2 text-sm font-medium">No admin users found</p>
          <p className="mt-1 text-sm">Create a new admin user to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div
              className={`overflow-hidden shadow-sm sm:rounded-lg border ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <table className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}> {/* Slightly lighter than card bg for header */}
                  <tr>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${
                    isDark ? "bg-gray-900 divide-gray-700" : "bg-white divide-gray-200" // bg-gray-900 for table rows on dark
                  }`}
                >
                  {adminUsers.map((user) => {
                    const userId = user._id || user.id;
                    const userStatus = user.status || "active";
                    const isActionLoading = actionLoading === userId;

                    return (
                      <tr
                        key={userId}
                        className={
                          isDark ? "hover:bg-gray-800" : "hover:bg-gray-50" // Slightly lighter hover for rows
                        }
                      >
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                            isDark ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {user.email}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "superadmin"
                                ? isDark ? "bg-purple-700 text-purple-100" : "bg-purple-100 text-purple-800"
                                : isDark ? "bg-blue-700 text-blue-100" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role === "superadmin"
                              ? "Super Admin"
                              : "Admin"}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              userStatus === "active"
                                ? isDark ? "bg-green-700 text-green-100" : "bg-green-100 text-green-800"
                                : isDark ? "bg-yellow-700 text-yellow-100" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {userStatus === "active" ? (
                              <>
                                <svg
                                  className={`-ml-0.5 mr-1.5 h-2 w-2 ${isDark ? "text-green-300" : "text-green-400"}`}
                                  fill="currentColor"
                                  viewBox="0 0 8 8"
                                >
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                Active
                              </>
                            ) : (
                              <>
                                <svg
                                  className={`-ml-0.5 mr-1.5 h-2 w-2 ${isDark ? "text-yellow-300" : "text-yellow-400"}`}
                                  fill="currentColor"
                                  viewBox="0 0 8 8"
                                >
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                Paused
                              </>
                            )}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleTogglePause(userId, userStatus)
                              }
                              disabled={isActionLoading}
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                userStatus === "active"
                                  ? isDark ? "text-yellow-200 bg-yellow-700 hover:bg-yellow-600 focus:ring-yellow-500" : "text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500"
                                  : isDark ? "text-green-200 bg-green-700 hover:bg-green-600 focus:ring-green-500" : "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500"
                              }`}
                            >
                              {isActionLoading && actionLoading === userId ? ( <svg className="animate-spin -ml-1 mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> ) : userStatus === "active" ? ( "Pause" ) : ( "Activate" )}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(userId)}
                              disabled={isActionLoading}
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isDark ? "text-red-200 bg-red-700 hover:bg-red-600 focus:ring-red-500" : "text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"
                              }`}
                            >
                              {isActionLoading && actionLoading === userId ? ( <svg className="animate-spin -ml-1 mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> ) : ( "Delete" )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsersTable;
