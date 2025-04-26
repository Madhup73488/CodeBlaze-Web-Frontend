// Base API URL configuration
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.example.com";

// Request headers configuration
const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    // Get token from local storage if available
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
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
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        ...getHeaders(),
        ...customHeaders,
      },
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    // Parse response
    const result = isJson ? await response.json() : await response.text();

    // Handle error responses
    if (!response.ok) {
      throw new Error(
        isJson && result.message ? result.message : "API request failed"
      );
    }

    return result;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// Auth related APIs
export const login = async (credentials) => {
  return apiRequest("/auth/login", "POST", credentials);
};

export const logout = async () => {
  localStorage.removeItem("auth_token");
  return apiRequest("/auth/logout", "POST");
};

export const getCurrentUser = async () => {
  return apiRequest("/auth/me");
};

// Jobs related APIs
export const fetchJobs = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  // Add filters to query parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/jobs${queryString}`);
};

export const fetchJobById = async (id) => {
  return apiRequest(`/jobs/${id}`);
};

// Alias for fetchJobById to match the import in components
export const fetchJob = fetchJobById;

export const createJob = async (jobData) => {
  return apiRequest("/jobs", "POST", jobData);
};

export const updateJob = async (id, jobData) => {
  return apiRequest(`/jobs/${id}`, "PUT", jobData);
};

// Alias for updateJob status to match component imports
export const updateJobStatus = async (id, status) => {
  return apiRequest(`/jobs/${id}/status`, "PATCH", { status });
};

export const deleteJob = async (id) => {
  return apiRequest(`/jobs/${id}`, "DELETE");
};

// Internships related APIs
export const fetchInternships = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/internships${queryString}`);
};

export const fetchInternshipById = async (id) => {
  return apiRequest(`/internships/${id}`);
};

// Alias for fetchInternshipById to match the import in components
export const fetchInternship = fetchInternshipById;

export const createInternship = async (internshipData) => {
  return apiRequest("/internships", "POST", internshipData);
};

export const updateInternship = async (id, internshipData) => {
  return apiRequest(`/internships/${id}`, "PUT", internshipData);
};

// Alias for updateInternship status to match component imports
export const updateInternshipStatus = async (id, status) => {
  return apiRequest(`/internships/${id}/status`, "PATCH", { status });
};

export const deleteInternship = async (id) => {
  return apiRequest(`/internships/${id}`, "DELETE");
};

// Job Applications related APIs
export const fetchJobApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/applications/jobs${queryString}`);
};

export const fetchJobApplicationById = async (id) => {
  return apiRequest(`/applications/jobs/${id}`);
};

export const updateJobApplicationStatus = async (id, status) => {
  return apiRequest(`/applications/jobs/${id}/status`, "PATCH", { status });
};

// Internship Applications related APIs
export const fetchInternshipApplications = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";
  return apiRequest(`/applications/internships${queryString}`);
};

export const fetchInternshipApplicationById = async (id) => {
  return apiRequest(`/applications/internships/${id}`);
};

export const updateInternshipApplicationStatus = async (id, status) => {
  return apiRequest(`/applications/internships/${id}/status`, "PATCH", {
    status,
  });
};

// Dashboard related APIs
export const fetchDashboardStats = async () => {
  return apiRequest("/dashboard/stats");
};

// Settings related APIs
export const fetchAdminSettings = async () => {
  return apiRequest("/settings");
};

export const updateAdminSettings = async (settingsData) => {
  return apiRequest("/settings", "PUT", settingsData);
};

export default {
  login,
  logout,
  getCurrentUser,
  fetchJobs,
  fetchJobById,
  fetchJob,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
  fetchInternships,
  fetchInternshipById,
  fetchInternship,
  createInternship,
  updateInternship,
  updateInternshipStatus,
  deleteInternship,
  fetchJobApplications,
  fetchJobApplicationById,
  updateJobApplicationStatus,
  fetchInternshipApplications,
  fetchInternshipApplicationById,
  updateInternshipApplicationStatus,
  fetchDashboardStats,
  fetchAdminSettings,
  updateAdminSettings,
};
