// src/admin/utils/api.js
import apiClient, { handleApiError } from "../../services/api"; // Use centralized apiClient

const constructQueryString = (filters = {}) => {
  const queryParams = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};

// --- Admin Panel Specific APIs ---
export const fetchDashboardStats = async () => {
  try {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUsers = async (filters = {}) => {
  try {
    const queryString = constructQueryString(filters);
    const response = await apiClient.get(`/admin/users${queryString}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/admin/users/${id}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAdminAccounts = async (filters = {}) => {
  try {
    const queryString = constructQueryString(filters);
    const response = await apiClient.get(`/admin/admin-users${queryString}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAdminAccount = async (adminUserData) => {
  try {
    const response = await apiClient.post("/admin/admin-users", adminUserData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAdminAccount = async (id, adminUserData) => {
  try {
    const response = await apiClient.put(`/admin/admin-users/${id}`, adminUserData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAdminAccount = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/admin-users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAdminJobs = async (filters = {}) => {
  try {
    const queryString = constructQueryString(filters);
    const response = await apiClient.get(`/admin/jobs${queryString}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAdminJobById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/jobs/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createJobAdmin = async (jobData) => {
  try {
    // Changed path from /jobs/create to /jobs for POST
    const response = await apiClient.post("/admin/jobs", jobData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateJobAdmin = async (id, jobData) => {
  try {
    const response = await apiClient.put(`/admin/jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteJobAdmin = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/jobs/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const featureJob = async (id, featuredStatus) => {
  try {
    const response = await apiClient.put(`/admin/jobs/${id}/feature`, { featured: featuredStatus });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAdminInternships = async (filters = {}) => {
  try {
    const queryString = constructQueryString(filters);
    const response = await apiClient.get(`/admin/internships${queryString}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAdminInternshipById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/internships/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createInternshipAdmin = async (internshipData) => {
  try {
    // Changed path from /internships/create to /internships for POST
    const response = await apiClient.post("/admin/internships", internshipData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateInternshipAdmin = async (id, internshipData) => {
  try {
    const response = await apiClient.put(`/admin/internships/${id}`, internshipData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteInternshipAdmin = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/internships/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const featureInternship = async (id, featuredStatus) => {
  try {
    const response = await apiClient.put(`/admin/internships/${id}/feature`, { featured: featuredStatus });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// New consolidated function for fetching applications
export const fetchAdminApplications = async (filters = {}) => {
  // Expected filters: position_type ('job' or 'internship'), job_id, internship_id, status, etc.
  try {
    const queryString = constructQueryString(filters);
    const response = await apiClient.get(`/admin/applications${queryString}`);
    return response.data; // Assuming this returns { success, applications, totalPages, currentPage, totalApplications }
  } catch (error) {
    handleApiError(error);
  }
};

// Deprecating old functions - they should be replaced by calls to fetchAdminApplications
// export const fetchAdminJobApplications = async (filters = {}) => { ... };
// export const fetchAdminInternshipApplications = async (filters = {}) => { ... };

export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await apiClient.put(`/admin/applications/${id}/status`, { status });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUserAnalytics = async () => {
  try {
    const response = await apiClient.get("/admin/analytics/users");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchJobAnalytics = async () => {
  try {
    const response = await apiClient.get("/admin/analytics/jobs");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchApplicationAnalytics = async () => {
  try {
    const response = await apiClient.get("/admin/analytics/applications");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchAdminSettings = async () => {
  try {
    const response = await apiClient.get("/admin/settings");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAdminSettings = async (settingsData) => {
  try {
    const response = await apiClient.put("/admin/settings", settingsData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const generateOfferLetter = async (offerLetterData) => {
  try {
    const response = await apiClient.post("/admin/documents/offer-letter/generate", offerLetterData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const generateCertificate = async (certificateData) => {
  try {
    const response = await apiClient.post("/admin/documents/certificate/generate", certificateData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyCertificatePublic = async (certificateId) => {
  try {
    // Uses apiClient, path will be /api/public/certificate/:certificateId
    const response = await apiClient.get(`/public/certificate/${certificateId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Consolidate exports
const adminApi = {
  fetchDashboardStats,
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  fetchAdminAccounts,
  createAdminAccount,
  updateAdminAccount,
  deleteAdminAccount,
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
  fetchAdminApplications, // Use new consolidated function
  // fetchAdminJobApplications, // Deprecated
  // fetchAdminInternshipApplications, // Deprecated
  updateApplicationStatus,
  fetchUserAnalytics,
  fetchJobAnalytics,
  fetchApplicationAnalytics,
  fetchAdminSettings,
  updateAdminSettings,
  generateOfferLetter,
  generateCertificate,
  verifyCertificatePublic,
};

export default adminApi;
