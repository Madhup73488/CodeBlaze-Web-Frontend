import React, { useState, useEffect, useCallback } from "react";
import { fetchUsers, updateUser, deleteUser } from "../../utils/api"; // Using regular user functions
import { useAdmin } from "../../contexts/AdminContext";

function RegularUsersTable() {
  const { theme } = useAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // Track which user is being acted on

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUsers(); // API call for regular users
      setUsers(response.data || []); // Assuming response.data is the array of users
    } catch (err) {
      setError(err.message || "Failed to fetch users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleUpdateUserStatus = async (userId, currentStatus, currentRole) => {
    setActionLoading(userId);
    // Example: Toggling between 'active' and 'suspended'. Roles might need a different UI.
    const newStatus = currentStatus === "active" ? "suspended" : "active"; 
    try {
      await updateUser(userId, { status: newStatus, role: currentRole }); // Role is passed through, status changes
      loadUsers(); // Refresh list
    } catch (err) {
      alert(`Failed to update user status: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };
  
  const handleChangeUserRole = async (userId, currentStatus, newRole) => {
    setActionLoading(userId);
    try {
      await updateUser(userId, { status: currentStatus, role: newRole });
      loadUsers();
    } catch (err) {
      alert(`Failed to change user role: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteRegularUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      setActionLoading(userId);
      try {
        await deleteUser(userId); // API call for deleting regular user
        loadUsers(); // Refresh list
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
        <span className="ml-3">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-md ${isDark ? "bg-red-800 text-red-100" : "bg-red-100 text-red-700"} mb-4`}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {users.length === 0 ? (
        <div className={`text-center py-12 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          <p>No regular users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className={`overflow-hidden shadow-sm sm:rounded-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <table className={`min-w-full divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                  <tr>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>Name</th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>Email</th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>Role</th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>Status</th>
                    <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`${isDark ? "bg-gray-900 divide-gray-700" : "bg-white divide-gray-200"}`}>
                  {users.map((user) => {
                    const userId = user._id || user.id;
                    const userStatus = user.status || "active";
                    const userRole = user.role || "user";
                    const isActionLoading = actionLoading === userId;

                    return (
                      <tr key={userId} className={isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>{user.name || user.fullName || 'N/A'}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{user.email}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          <select 
                            value={userRole} 
                            onChange={(e) => handleChangeUserRole(userId, userStatus, e.target.value)}
                            disabled={isActionLoading}
                            className={`p-1 rounded text-xs ${isDark ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-300"}`}
                          >
                            <option value="user">User</option>
                            <option value="employer">Employer</option>
                            {/* Add other roles as needed, admin/superadmin managed elsewhere */}
                          </select>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            userStatus === "active" ? (isDark ? "bg-green-700 text-green-100" : "bg-green-100 text-green-800")
                            : userStatus === "suspended" ? (isDark ? "bg-yellow-700 text-yellow-100" : "bg-yellow-100 text-yellow-800")
                            : (isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800")
                          }`}>
                            {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateUserStatus(userId, userStatus, userRole)}
                              disabled={isActionLoading}
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                userStatus === "active"
                                  ? (isDark ? "text-yellow-200 bg-yellow-700 hover:bg-yellow-600 focus:ring-yellow-500" : "text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500")
                                  : (isDark ? "text-green-200 bg-green-700 hover:bg-green-600 focus:ring-green-500" : "text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500")
                              }`}
                            >
                              {isActionLoading ? "..." : (userStatus === "active" ? "Suspend" : "Activate")}
                            </button>
                            <button
                              onClick={() => handleDeleteRegularUser(userId)}
                              disabled={isActionLoading}
                              className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? "text-red-200 bg-red-700 hover:bg-red-600 focus:ring-red-500" : "text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500"}`}
                            >
                              {isActionLoading ? "..." : "Delete"}
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

export default RegularUsersTable;
