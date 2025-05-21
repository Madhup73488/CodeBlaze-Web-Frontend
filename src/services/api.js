import axios from "axios";
import Cookies from "js-cookie";

// Define the base URL for the API.
// The environment variable should point to the root of the backend.
const BACKEND_ROOT_URL =
  process.env.REACT_APP_BACKEND_URL || "https://codeblaze-web-backend.onrender.com";

// All API endpoints are expected to be under an /api path.
const API_BASE_URL = `${BACKEND_ROOT_URL}/api`;

// Create an Axios instance with the base URL and default headers.
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Use the consistently /api prefixed URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for handling cookies if your backend uses them for sessions
});

// Request interceptor to add the Authorization token to headers.
apiClient.interceptors.request.use(
  (config) => {
    // Try to get token from both localStorage and cookies for compatibility
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Centralized API error handler function.
export const handleApiError = (error) => {
  console.error(
    "API Error:",
    error.response?.data?.message || error.response?.data || error.message
  );
  const message =
    error.response?.data?.message || // Prefer message from backend response
    error.message || // Fallback to Axios error message
    "An unexpected error occurred. Please try again."; // Generic fallback

  // It's often better to throw an error object that includes status for more specific handling
  const customError = new Error(message);
  if (error.response) {
    customError.status = error.response.status;
    customError.data = error.response.data;
  }
  throw customError;
};

export default apiClient;
