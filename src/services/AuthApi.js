import axios from "axios";
import Cookies from "js-cookie";
const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://codeblaze-web-backend.onrender.com/api/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add this near the top of your AuthApi.js file after creating the api instance
api.interceptors.request.use(
  (config) => {
    // Try to get token from both localStorage and cookies for compatibility
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleApiError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  const message =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred.";
  throw new Error(message);
};

// Updated to return both token and user data
const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return {
      token: response.data.token,
      user: response.data.user,
      message: response.data.message,
    };
  } catch (error) {
    handleApiError(error);
  }
};

// Updated to return both token and user data
const verifyOTP = async (email, otp) => {
  try {
    const response = await api.post("/verify-otp", { email, otp });
    return {
      token: response.data.token,
      user: response.data.user,
      message: response.data.message,
    };
  } catch (error) {
    handleApiError(error);
  }
};

const resendOTP = async (email) => {
  try {
    const response = await api.post("/resend-otp", { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    console.log("Login API Response:", response.data); // Debug log

    // Handle the current response structure where user data might be missing
    if (response.data.success && response.data.token) {
      // If we just have token but no user data, create a minimal user object
      // with information we have (or can extract from token)
      const user = response.data.user || {
        email: email, // We at least know the email from the login attempt
        role: response.data.isAdmin ? "admin" : "user", // Use isAdmin flag to determine role
      };

      return {
        success: true,
        token: response.data.token,
        user: user,
        message: response.data.message || "Login successful",
      };
    }

    throw new Error(response.data.message || "Login failed");
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
// Updated to clear client-side token
const logout = async () => {
  try {
    const response = await api.get("/logout");
    console.log("Logout response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resetPassword = async (token, password) => {
  try {
    const response = await api.put(`/reset-password/${token}`, { password });
    return {
      success: true,
      token: response.data.token,
      user: response.data.user,
      message: response.data.message,
    };
  } catch (error) {
    handleApiError(error);
  }
};

const validateToken = async () => {
  try {
    const response = await api.get("/validate-token");
    return {
      isValid: true,
      user: response.data.user,
    };
  } catch (error) {
    console.error("Token validation error:", error);
    return {
      isValid: false,
      message: error.response?.data?.message || "Session expired",
    };
  }
};
const authApi = {
  register,
  verifyOTP,
  resendOTP,
  login,
  logout,
  forgotPassword,
  resetPassword,
  validateToken, // Add the new method
};

export default authApi;
