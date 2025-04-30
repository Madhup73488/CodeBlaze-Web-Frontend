// src/admin/utils/api.js

// Base API URL configuration
// Ensure this points to your backend's API root (e.g., /api/v1)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

// Request headers configuration
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Get token from local storage if available
  // Ensure this matches how your main auth stores the token
  const authToken = localStorage.getItem("auth_token");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  // Note: Consider using HttpOnly cookies for tokens for better security

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
    // Prepend the base URL to the endpoint
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        ...getHeaders(),
        ...customHeaders,
      },
    };

    if (data !== null && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    // Parse response
    // Handle empty responses (e.g., DELETE requests)
    let result = null;
    if (response.status !== 204) { // 204 No Content
       result = isJson ? await response.json() : await response.text();
    }


    // Handle error responses (non-2xx status codes)
    if (!response.ok) {
      const errorDetail = isJson && result && result.message ? result.message : (result || 'API request failed');
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
// Endpoints are prefixed with /admin based on your backend routes

// Dashboard related APIs
export const fetchDashboardStats = async () => {
  // Backend route: GET /api/v1/admin/dashboard
  return apiRequest("/admin/dashboard");
};

// User Management APIs
export const fetchUsers = async (filters = {}) => {
    // Backend route: GET /api/v1/admin/users
    const queryParams = new URLSearchParams();
     Object.entries(filters).forEach(([key, value]) => {
        // Handle potential array values or specific filter formats if needed
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
     });
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
    return apiRequest(`/admin/users${queryString}`);
};

export const fetchUserById = async (id) => {
   // Backend route: GET /api/v1/admin/users/:id (assuming you add this endpoint)
   // Your controller didn't have this, but it's often needed for edit/detail
   // If not needed, remove this function.
   return apiRequest(`/admin/users/${id}`);
};


export const updateUser = async (id, userData) => {
  // Backend route: PUT /api/v1/admin/users/:id
  return apiRequest(`/admin/users/${id}`, "PUT", userData);
};

export const deleteUser = async (id) => {
  // Backend route: DELETE /api/v1/admin/users/:id
  return apiRequest(`/admin/users/${id}`, "DELETE");
};

// Job Postings Management APIs
export const fetchAdminJobs = async (filters = {}) => {
  // Backend route: GET /api/v1/admin/jobs
   const queryParams = new URLSearchParams();
     Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
     });
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return apiRequest(`/admin/jobs${queryString}`);
};

export const fetchAdminJobById = async (id) => {
   // Backend route: GET /api/v1/admin/jobs/:id (assuming you add this endpoint)
   // Your controller didn't have this, but standard for edit/detail
   return apiRequest(`/admin/jobs/${id}`);
};

// Note: createJob, updateJob, deleteJob might be done via the main app's API,
// but if admins can create/edit/delete, use admin routes or specific admin endpoints.
// Your backend controller doesn't have admin POST/PUT/DELETE for jobs, only GET/PUT feature.
// Assuming admin can also manage jobs:
export const createJobAdmin = async (jobData) => {
   // Assuming a backend route like POST /api/v1/admin/jobs
    return apiRequest("/admin/jobs", "POST", jobData);
}

export const updateJobAdmin = async (id, jobData) => {
    // Assuming a backend route like PUT /api/v1/admin/jobs/:id
     return apiRequest(`/admin/jobs/${id}`, "PUT", jobData);
}

export const deleteJobAdmin = async (id) => {
    // Assuming a backend route like DELETE /api/v1/admin/jobs/:id
     return apiRequest(`/admin/jobs/${id}`, "DELETE");
}


export const featureJob = async (id, featuredStatus) => {
  // Backend route: PUT /api/v1/admin/jobs/:id/feature
  // Backend expects { featured: boolean } in body
  return apiRequest(`/admin/jobs/${id}/feature`, "PUT", { featured: featuredStatus });
};


// Internship Postings Management APIs
export const fetchAdminInternships = async (filters = {}) => {
  // Backend route: GET /api/v1/admin/internships
   const queryParams = new URLSearchParams();
     Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
     });
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return apiRequest(`/admin/internships${queryString}`);
};

export const fetchAdminInternshipById = async (id) => {
   // Backend route: GET /api/v1/admin/internships/:id (assuming you add this endpoint)
   return apiRequest(`/admin/internships/${id}`);
};

// Assuming admin can also manage internships:
export const createInternshipAdmin = async (internshipData) => {
    // Assuming a backend route like POST /api/v1/admin/internships
    return apiRequest("/admin/internships", "POST", internshipData);
}

export const updateInternshipAdmin = async (id, internshipData) => {
    // Assuming a backend route like PUT /api/v1/admin/internships/:id
    return apiRequest(`/admin/internships/${id}`, "PUT", internshipData);
}

export const deleteInternshipAdmin = async (id) => {
    // Assuming a backend route like DELETE /api/v1/admin/internships/:id
    return apiRequest(`/admin/internships/${id}`, "DELETE");
}


export const featureInternship = async (id, featuredStatus) => {
  // Backend route: PUT /api/v1/admin/internships/:id/feature
   return apiRequest(`/admin/internships/${id}/feature`, "PUT", { featured: featuredStatus });
};

// Application Management APIs
export const fetchAdminJobApplications = async (filters = {}) => {
  // Backend route: GET /api/v1/admin/job-applications
   const queryParams = new URLSearchParams();
     Object.entries(filters).forEach(([key, value]) => {
         if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
     });
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return apiRequest(`/admin/job-applications${queryString}`);
};

export const fetchAdminInternshipApplications = async (filters = {}) => {
  // Backend route: GET /api/v1/admin/internship-applications
   const queryParams = new URLSearchParams();
     Object.entries(filters).forEach(([key, value]) => {
         if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value);
        }
     });
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return apiRequest(`/admin/internship-applications${queryString}`);
};

// Note: The backend controller has a single endpoint for updating ANY application status
export const updateApplicationStatus = async (id, status) => {
  // Backend route: PUT /api/v1/admin/applications/:id/status
  // Note: Backend uses PUT, not PATCH as in your original api block
  // Backend expects { status: string } in body
  return apiRequest(`/admin/applications/${id}/status`, "PUT", { status });
};


// Analytics APIs
export const fetchUserAnalytics = async () => {
    // Backend route: GET /api/v1/admin/analytics/users
    return apiRequest("/admin/analytics/users");
};

export const fetchJobAnalytics = async () => {
    // Backend route: GET /api/v1/admin/analytics/jobs
    return apiRequest("/admin/analytics/jobs");
};

export const fetchApplicationAnalytics = async () => {
    // Backend route: GET /api/v1/admin/analytics/applications
    return apiRequest("/admin/analytics/applications");
};


// Settings related APIs
export const fetchAdminSettings = async () => {
  // Backend route: GET /api/v1/admin/settings
  return apiRequest("/admin/settings");
};

export const updateAdminSettings = async (settingsData) => {
  // Backend route: PUT /api/v1/admin/settings
  return apiRequest("/admin/settings", "PUT", settingsData);
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