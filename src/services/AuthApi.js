import apiClient, { handleApiError } from "./api"; // Import the centralized apiClient and error handler

// Updated to return both token and user data
const register = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
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
    const response = await apiClient.post("/auth/verify-otp", { email, otp });
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
    const response = await apiClient.post("/auth/resend-otp", { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
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
    // Note: The logout endpoint might not need /auth prefix if it's a general session clear on backend
    // However, to keep consistency with other auth routes, using /auth/logout
    const response = await apiClient.get("/auth/logout");
    console.log("Logout response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.put(`/auth/reset-password/${token}`, { password });
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
    const response = await apiClient.get("/auth/validate-token");
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
