import React, { createContext, useContext, useState, useEffect } from "react";
import authApi from "../services/AuthApi";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [authFlowState, setAuthFlowState] = useState("initial");
  const [userEmailForOTP, setUserEmailForOTP] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Single consolidated function to check authentication status
  const checkAuthStatus = async () => {
    console.log("Checking authentication status...");
    setLoading(true);

    // Check for token in both localStorage and cookies
    const token = localStorage.getItem("token") || Cookies.get("token");

    if (!token) {
      console.log("No token found");
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }

    console.log("Token found, validating...");

    try {
      // Call API to validate token
      const { isValid, user } = await authApi.validateToken();

      if (isValid && user) {
        console.log("Token valid, user authenticated:", user);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        console.log("Token validation failed");
        setIsAuthenticated(false);
        setUser(null);
        // Clear invalid tokens
        localStorage.removeItem("token");
        Cookies.remove("token");
      }
    } catch (err) {
      console.error("Auth validation error:", err);
      setIsAuthenticated(false);
      setUser(null);
      // Clear tokens on error
      localStorage.removeItem("token");
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on initial load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check for password reset URLs
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments[1] === "reset-password" && pathSegments[2]) {
      const token = pathSegments[2];
      setResetPasswordToken(token);
      setAuthFlowState("reset_password_form");
    } else {
      setResetPasswordToken(null);
      if (
        authFlowState === "reset_password_form" &&
        !location.pathname.includes("reset-password")
      ) {
        setAuthFlowState("initial");
      }
    }
  }, [location.pathname, authFlowState]);

  // Handle routing based on authentication status
  useEffect(() => {
    if (!loading) {
      const isAdmin =
        user && (user.role === "admin" || user.role === "superadmin");

      if (isAuthenticated && isAdmin) {
        if (!location.pathname.startsWith("/admin")) {
          navigate("/admin/dashboard", { replace: true });
        }
      } else if (isAuthenticated && !isAdmin) {
        if (location.pathname.startsWith("/admin")) {
          navigate("/", { replace: true });
        }
      } else {
        if (location.pathname.startsWith("/admin")) {
          navigate("/", { replace: true });
        }
      }
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  const register = async (userData) => {
    setError(null);
    try {
      const data = await authApi.register(userData);
      console.log("Registration successful, setting authFlowState to otp_sent");
      setAuthFlowState("otp_sent");
      setUserEmailForOTP(userData.email);

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const verifyOTP = async (email, otp) => {
    setError(null);
    try {
      const data = await authApi.verifyOTP(email, otp);

      // Store token in both localStorage and cookies
      if (data.token) {
        localStorage.setItem("token", data.token);
        Cookies.set("token", data.token, { expires: 7 });
      }

      setIsAuthenticated(true);
      setUser(data.user);
      setAuthFlowState("initial");

      return { success: true, message: "Email verified successfully!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const resendOTP = async (email) => {
    setError(null);
    try {
      const data = await authApi.resendOTP(email);
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const { success, token, user, message } = await authApi.login(
        email,
        password
      );

      if (success && token) {
        // Store token in both localStorage and cookies for compatibility
        localStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 7 });

        setUser(user);
        setIsAuthenticated(true);

        return { success: true, message: message || "Login successful" };
      }

      throw new Error(message || "Login failed");
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout API error:", err.message);
      // Continue with local logout even if API call fails
    } finally {
      // Always clear tokens regardless of API response
      localStorage.removeItem("token");
      Cookies.remove("token");

      setIsAuthenticated(false);
      setUser(null);
      setAuthFlowState("initial");
      navigate("/", { replace: true });

      return { success: true, message: "Logout successful!" };
    }
  };

  const forgotPassword = async (email) => {
    setError(null);
    try {
      const data = await authApi.forgotPassword(email);
      setAuthFlowState("forgot_password_requested");

      return {
        success: true,
        message: data.message || "Password reset email sent!",
      };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const resetPassword = async (token, password) => {
    setError(null);
    try {
      const data = await authApi.resetPassword(token, password);

      // If reset returns a token, store it
      if (data.token) {
        localStorage.setItem("token", data.token);
        Cookies.set("token", data.token, { expires: 7 });

        setIsAuthenticated(true);
        setUser(data.user);
      }

      setAuthFlowState("initial");
      setResetPasswordToken(null);

      return { success: true, message: "Password reset successful!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    error,
    authFlowState,
    userEmailForOTP,
    resetPasswordToken,
    setError,
    setAuthFlowState,
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuthStatus, // Export this to allow manual refresh when needed
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading ? children : <div>Loading authentication status...</div>}
    </AuthContext.Provider>
  );
};
