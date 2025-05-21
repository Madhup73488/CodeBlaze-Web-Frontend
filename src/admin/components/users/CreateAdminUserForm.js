import React, { useState } from "react";
import { createAdminAccount } from "../../utils/api";
import { useAdmin } from "../../contexts/AdminContext";

function CreateAdminUserForm({ onAdminCreated }) {
  const { theme } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields (Name, Email, Password) are required.");
      setLoading(false);
      return;
    }

    try {
      const newAdmin = await createAdminAccount(formData);
      setSuccessMessage(`Admin user "${newAdmin.name}" created successfully!`);
      setFormData({ name: "", email: "", password: "", role: "admin" });
      if (onAdminCreated) {
        onAdminCreated(newAdmin);
      }
    } catch (err) {
      setError(err.message || "Failed to create admin user.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === "dark";

  return (
    // The parent div in AdminUsersPage.js sets the card background (bg-gray-900 or bg-white)
    // So this component's root div doesn't need its own background.
    <div> 
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div
            className={`p-3 rounded-md ${
              isDark ? "bg-red-800 text-red-100" : "bg-red-100 text-red-700" // Adjusted dark red for better contrast on #18181b
            } text-sm`}
          >
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div
            className={`p-3 rounded-md ${
              isDark
                ? "bg-green-800 text-green-100" // Adjusted dark green
                : "bg-green-100 text-green-700"
            } text-sm`}
          >
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700" // Adjusted for slightly lighter text on darker bg
            } mb-1`}
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500" // Darker input for contrast on bg-gray-900
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            } mb-1`}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
            placeholder="admin@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            } mb-1`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
            placeholder="••••••••"
            required
          />
          <p
            className={`mt-1 text-xs ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Password must be at least 8 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="role"
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            } mb-1`}
          >
            Admin Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="admin">Standard Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <p
            className={`mt-1 text-xs ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Super Admin has additional system-wide privileges
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Admin Account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAdminUserForm;
