import apiClient, { handleApiError } from "./api"; // Import the centralized apiClient and error handler

// Updated to reflect OTP initiation: expects a message, not tokens.
const register = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    // Assuming response.data contains { success: true, message: "OTP sent..." }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Updated to return both token and user data
const verifyOTP = async (email, otp) => {
  try {
    const response = await apiClient.post("/auth/verify-email", { email, otp });
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
// Updated to use POST and clear client-side token
const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout"); // Changed to POST
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

const resetPassword = async (token, newPassword) => {
  // Changed 'password' to 'newPassword' for clarity
  try {
    // Changed to POST, token is now in the body
    const response = await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
    // Backend now returns: { success: true, message: "Password has been reset successfully." }
    // No token or user data is returned directly from this endpoint anymore.
    return response.data;
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

const refreshToken = async () => {
  try {
    const response = await apiClient.post("/auth/refresh");
    // Assuming the backend returns new tokens and potentially user info
    return response.data;
  } catch (error) {
    handleApiError(error);
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
  validateToken,
  refreshToken, // Add the new method
};

export default authApi;
