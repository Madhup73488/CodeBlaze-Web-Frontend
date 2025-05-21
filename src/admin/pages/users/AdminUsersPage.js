import React, { useState } from "react";
import CreateAdminUserForm from "../../components/users/CreateAdminUserForm";
import AdminUsersTable from "../../components/users/AdminUsersTable";
import { useAdmin } from "../../contexts/AdminContext"; // Import useAdmin to get theme

function AdminUsersPage() {
  const [newAdminUser, setNewAdminUser] = useState(null);
  const { theme } = useAdmin(); // Get theme from context
  console.log("[AdminUsersPage] Current theme from useAdmin:", theme); // DEBUG LOG
  const isDark = theme === 'dark';

  const handleAdminCreated = (admin) => {
    setNewAdminUser(admin);
  };

  // Define base classes and theme-specific overrides
  const pageClasses = isDark ? 'bg-black text-gray-200' : 'bg-gray-50 text-gray-800';
  const cardClasses = isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'; // Using gray-200 for light border for consistency
  const cardHeaderClasses = isDark ? 'bg-blue-700 text-blue-200' : 'bg-blue-600 text-blue-100'; // Keep blue accent for headers
  const titleTextClasses = isDark ? 'text-blue-400' : 'text-blue-700';
  const subtitleTextClasses = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardContentBg = isDark ? 'bg-gray-900' : 'bg-white';


  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${pageClasses}`}>
      <div className="text-center mb-10">
        <h1 className={`text-3xl font-bold mb-2 ${titleTextClasses}`}>
          Admin User Management
        </h1>
        <p className={`max-w-2xl mx-auto ${subtitleTextClasses}`}>
          Create and manage administrator accounts with different permission
          levels
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className={`shadow-md rounded-lg overflow-hidden border ${cardClasses}`}>
            <div className={`${cardHeaderClasses} py-4 px-6`}>
              <h2 className="text-xl font-semibold">Create New Admin</h2>
              <p className={`text-sm mt-1`}> {/* Text color inherited from cardHeaderClasses */}
                Add a new administrator to the system
              </p>
            </div>
            <div className={`p-6 ${cardContentBg}`}>
              <CreateAdminUserForm onAdminCreated={handleAdminCreated} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className={`shadow-md rounded-lg overflow-hidden border ${cardClasses}`}>
            <div className={`${cardHeaderClasses} py-4 px-6`}>
              <h2 className="text-xl font-semibold">Admin Accounts</h2>
              <p className={`text-sm mt-1`}> {/* Text color inherited from cardHeaderClasses */}
                Manage existing administrator accounts
              </p>
            </div>
            <div className={`p-6 ${cardContentBg}`}>
              <AdminUsersTable newAdminUser={newAdminUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
