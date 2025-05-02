// src/admin/utils/api.js

// Base API URL configuration
// Ensure this points to your backend's API root
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// Request headers configuration
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Get token from local storage if available
  const authToken = localStorage.getItem("token");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

// Generic API request handler
const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  customHeaders = {}
) => {
  try {
    // Build the complete URL
    // Remove the redundant '/api' from the endpoint if it's already included in the API_BASE_URL
    const url = `${API_BASE_URL}${
      endpoint.startsWith("/") ? endpoint : "/" + endpoint
    }`;

    const options = {
      method,
      headers: {
        ...getHeaders(),
        ...customHeaders,
      },
    };

    if (
      data !== null &&
      (method === "POST" || method === "PUT" || method === "PATCH")
    ) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    // Parse response
    // Handle empty responses (e.g., DELETE requests)
    let result = null;
    if (response.status !== 204) {
      // 204 No Content
      result = isJson ? await response.json() : await response.text();
    }

    // Handle error responses (non-2xx status codes)
    if (!response.ok) {
      const errorDetail =
        isJson && result && result.message
          ? result.message
          : result || "API request failed";
      const error = new Error(errorDetail);
      error.response = response; // Attach the response object for status codes
      error.data = result; // Attach parsed data if available
      throw error;
    }

    return result; // Return the parsed data (or null for 204)
  } catch (error) {
    console.error("API Request Error:", error);
    // Re-throw the error so calling functions can handle it
    throw error;
  }
};

// --- Admin Panel Specific APIs ---

// Dashboard related APIs
export const fetchDashboardStats = async () => {
  return apiRequest("/api/admin/dashboard");
};

// User Management APIs
export const fetchUsers = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/api/admin/users${queryString}`);
};

export const fetchUserById = async (id) => {
  return apiRequest(`/api/admin/users/${id}`);
};

export const updateUser = async (id, userData) => {
  return apiRequest(`/api/admin/users/${id}`, "PUT", userData);
};

export const deleteUser = async (id) => {
  return apiRequest(`/api/admin/users/${id}`, "DELETE");
};

// Job Postings Management APIs
export const fetchAdminJobs = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/api/admin/jobs${queryString}`);
};

export const fetchAdminJobById = async (id) => {
  return apiRequest(`/api/admin/jobs/${id}`);
};

export const createJobAdmin = async (jobData) => {
  return apiRequest("/api/admin/jobs", "POST", jobData);
};

export const updateJobAdmin = async (id, jobData) => {
  return apiRequest(`/api/admin/jobs/${id}`, "PUT", jobData);
};

export const deleteJobAdmin = async (id) => {
  return apiRequest(`/api/admin/jobs/${id}`, "DELETE");
};

export const featureJob = async (id, featuredStatus) => {
  return apiRequest(`/api/admin/jobs/${id}/feature`, "PUT", {
    featured: featuredStatus,
  });
};

// Internship Postings Management APIs
export const fetchAdminInternships = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/api/admin/internships${queryString}`);
};

export const fetchAdminInternshipById = async (id) => {
  return apiRequest(`/api/admin/internships/${id}`);
};

export const createInternshipAdmin = async (internshipData) => {
  return apiRequest("/api/admin/internships", "POST", internshipData);
};

export const updateInternshipAdmin = async (id, internshipData) => {
  return apiRequest(`/api/admin/internships/${id}`, "PUT", internshipData);
};

export const deleteInternshipAdmin = async (id) => {
  return apiRequest(`/api/admin/internships/${id}`, "DELETE");
};

export const featureInternship = async (id, featuredStatus) => {
  return apiRequest(`/api/admin/internships/${id}/feature`, "PUT", {
    featured: featuredStatus,
  });
};

// Application Management APIs
export const fetchAdminJobApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/api/admin/job-applications${queryString}`);
};

export const fetchAdminInternshipApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value);
    }
  });
  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/api/admin/internship-applications${queryString}`);
};

export const updateApplicationStatus = async (id, status) => {
  return apiRequest(`/api/admin/applications/${id}/status`, "PUT", { status });
};

// Analytics APIs
export const fetchUserAnalytics = async () => {
  return apiRequest("/api/admin/analytics/users");
};

export const fetchJobAnalytics = async () => {
  return apiRequest("/api/admin/analytics/jobs");
};

export const fetchApplicationAnalytics = async () => {
  return apiRequest("/api/admin/analytics/applications");
};

// Settings related APIs
export const fetchAdminSettings = async () => {
  return apiRequest("/api/admin/settings");
};

export const updateAdminSettings = async (settingsData) => {
  return apiRequest("/api/admin/settings", "PUT", settingsData);
};

// Export all admin API functions
export default {
  fetchDashboardStats,
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  fetchAdminJobs,
  fetchAdminJobById,
  createJobAdmin,
  updateJobAdmin,
  deleteJobAdmin,
  featureJob,
  fetchAdminInternships,
  fetchAdminInternshipById,
  createInternshipAdmin,
  updateInternshipAdmin,
  deleteInternshipAdmin,
  featureInternship,
  fetchAdminJobApplications,
  fetchAdminInternshipApplications,
  updateApplicationStatus,
  fetchUserAnalytics,
  fetchJobAnalytics,
  fetchApplicationAnalytics,
  fetchAdminSettings,
  updateAdminSettings,
};
