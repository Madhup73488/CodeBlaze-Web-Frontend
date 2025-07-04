// src/services/userService.js
import apiClient, { handleApiError } from "./api"; // Import the centralized apiClient and error handler

// User profile services
export const userService = {
  // Get current user profile
  getUserProfile: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/users/me", profileData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update password
  updatePassword: async (passwordData) => {
    try {
      const response = await apiClient.put("/users/password", passwordData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Upload resume
  uploadResume: async (formData) => {
    try {
      const response = await apiClient.post("/users/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Upload profile image
  uploadProfileImage: async (formData) => {
    try {
      const response = await apiClient.post("/users/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Experience CRUD operations
  addExperience: async (experienceData) => {
    try {
      const response = await apiClient.post("/users/experience", experienceData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateExperience: async (expId, experienceData) => {
    try {
      const response = await apiClient.put(`/users/experience/${expId}`, experienceData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteExperience: async (expId) => {
    try {
      const response = await apiClient.delete(`/users/experience/${expId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Education CRUD operations
  addEducation: async (educationData) => {
    try {
      const response = await apiClient.post("/users/education", educationData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateEducation: async (eduId, educationData) => {
    try {
      const response = await apiClient.put(`/users/education/${eduId}`, educationData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteEducation: async (eduId) => {
    try {
      const response = await apiClient.delete(`/users/education/${eduId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get public profile
  getPublicProfile: async (userId) => {
    try {
      const response = await apiClient.get(`/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
