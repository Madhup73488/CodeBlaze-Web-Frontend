// src/admin/utils/api.js

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const authToken = localStorage.getItem("token");
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
};

const apiRequest = async (endpoint, method = "GET", data = null, customHeaders = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
    const options = { method, headers: { ...getHeaders(), ...customHeaders } };
    if (data !== null && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    let result = null;
    if (response.status !== 204) result = isJson ? await response.json() : await response.text();
    if (!response.ok) {
      const errorDetail = isJson && result && result.message ? result.message : result || "API request failed";
      const error = new Error(errorDetail);
      error.response = response;
      error.data = result;
      throw error;
    }
    return result;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// --- Admin Panel Specific APIs ---
export const fetchDashboardStats = async () => apiRequest("/api/admin/dashboard");

export const fetchUsers = async (filters = {}) => {
  const queryParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return apiRequest(`/api/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};
export const fetchUserById = async (id) => apiRequest(`/api/admin/users/${id}`);
export const updateUser = async (id, userData) => apiRequest(`/api/admin/users/${id}`, "PUT", userData);
export const deleteUser = async (id) => apiRequest(`/api/admin/users/${id}`, "DELETE");

export const fetchAdminAccounts = async (filters = {}) => {
  const queryParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return apiRequest(`/api/admin/admin-users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};
export const createAdminAccount = async (adminUserData) => apiRequest("/api/admin/admin-users", "POST", adminUserData);
export const updateAdminAccount = async (id, adminUserData) => apiRequest(`/api/admin/admin-users/${id}`, "PUT", adminUserData);
export const deleteAdminAccount = async (id) => apiRequest(`/api/admin/admin-users/${id}`, "DELETE");

export const fetchAdminJobs = async (filters = {}) => {
  const queryParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return apiRequest(`/api/admin/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};
export const fetchAdminJobById = async (id) => apiRequest(`/api/admin/jobs/${id}`);
export const createJobAdmin = async (jobData) => apiRequest("/api/admin/jobs/create", "POST", jobData);
export const updateJobAdmin = async (id, jobData) => apiRequest(`/api/admin/jobs/${id}`, "PUT", jobData);
export const deleteJobAdmin = async (id) => apiRequest(`/api/admin/jobs/${id}`, "DELETE");
export const featureJob = async (id, featuredStatus) => apiRequest(`/api/admin/jobs/${id}/feature`, "PUT", { featured: featuredStatus });

export const fetchAdminInternships = async (filters = {}) => {
  const queryParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return apiRequest(`/api/admin/internships${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};
export const fetchAdminInternshipById = async (id) => apiRequest(`/api/admin/internships/${id}`);
export const createInternshipAdmin = async (internshipData) => apiRequest("/api/admin/internships/create", "POST", internshipData);
export const updateInternshipAdmin = async (id, internshipData) => apiRequest(`/api/admin/internships/${id}`, "PUT", internshipData);
export const deleteInternshipAdmin = async (id) => apiRequest(`/api/admin/internships/${id}`, "DELETE");
export const featureInternship = async (id, featuredStatus) => apiRequest(`/api/admin/internships/${id}/feature`, "PUT", { featured: featuredStatus });

export const fetchAdminJobApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return apiRequest(`/api/admin/job-applications${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};
export const fetchAdminInternshipApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return apiRequest(`/api/admin/internship-applications${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
};
export const updateApplicationStatus = async (id, status) => apiRequest(`/api/admin/applications/${id}/status`, "PUT", { status });

export const fetchUserAnalytics = async () => apiRequest("/api/admin/analytics/users");
export const fetchJobAnalytics = async () => apiRequest("/api/admin/analytics/jobs");
export const fetchApplicationAnalytics = async () => apiRequest("/api/admin/analytics/applications");

export const fetchAdminSettings = async () => apiRequest("/api/admin/settings");
export const updateAdminSettings = async (settingsData) => apiRequest("/api/admin/settings", "PUT", settingsData);

// Document Generation APIs
export const generateOfferLetter = async (offerLetterData) => {
  return apiRequest("/api/admin/documents/offer-letter/generate", "POST", offerLetterData);
};

export const generateCertificate = async (certificateData) => {
  return apiRequest("/api/admin/documents/certificate/generate", "POST", certificateData);
};

// Public Certificate Verification API (might be in a different file if non-admin)
export const verifyCertificatePublic = async (certificateId) => {
  // Note: This uses API_BASE_URL which might be /api/admin. 
  // If public API is different, adjust base URL or use a separate utility.
  return apiRequest(`/api/public/certificate/${certificateId}`, "GET");
};


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
  fetchAdminAccounts,
  createAdminAccount,
  updateAdminAccount,
  deleteAdminAccount,
  generateOfferLetter, // Added
  generateCertificate, // Added
  verifyCertificatePublic, // Added
};
