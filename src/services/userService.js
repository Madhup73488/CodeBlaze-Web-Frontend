// src/services/userService.js
import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_BACKEND_URL}/api` ||
  "https://codeblaze-web-backend.onrender.com/users";

// Create axios instance with auth token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User profile services
export const userService = {
  // Get current user profile
  getUserProfile: () => {
    return api.get("/users/me");
  },

  // Update user profile
  updateProfile: (profileData) => {
    return api.put("/users/me", profileData);
  },

  // Update password
  updatePassword: (passwordData) => {
    return api.put("/users/password", passwordData);
  },

  // Upload resume
  uploadResume: (formData) => {
    return api.post("/users/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Upload profile image
  uploadProfileImage: (formData) => {
    return api.post("/users/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Experience CRUD operations
  addExperience: (experienceData) => {
    return api.post("/users/experience", experienceData);
  },

  updateExperience: (expId, experienceData) => {
    return api.put(`/users/experience/${expId}`, experienceData);
  },

  deleteExperience: (expId) => {
    return api.delete(`/users/experience/${expId}`);
  },

  // Education CRUD operations
  addEducation: (educationData) => {
    return api.post("/users/education", educationData);
  },

  updateEducation: (eduId, educationData) => {
    return api.put(`/users/education/${eduId}`, educationData);
  },

  deleteEducation: (eduId) => {
    return api.delete(`/users/education/${eduId}`);
  },

  // Get public profile
  getPublicProfile: (userId) => {
    return api.get(`/users/profile/${userId}`);
  },
};
