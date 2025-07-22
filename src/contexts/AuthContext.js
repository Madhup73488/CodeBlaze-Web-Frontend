import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = useCallback(async () => {
    console.log("Checking authentication status...");
    setLoading(true);
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { isValid, user: userData } = await authApi.validateToken();
      if (isValid && userData) {
        setUser(userData); // Expect userData to have a 'roles' array
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        Cookies.remove("token");
      }
    } catch (err) {
      console.error("Auth validation error:", err);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setIsAuthenticated, setUser]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get("token");
    if (location.pathname === "/reset-password" && tokenFromQuery) {
      setResetPasswordToken(tokenFromQuery);
      setAuthFlowState("reset_password_form");
    } else {
      if (authFlowState === "reset_password_form" && (!tokenFromQuery || location.pathname !== "/reset-password")) {
        setResetPasswordToken(null);
        setAuthFlowState("initial");
      }
    }
  }, [location.pathname, location.search, authFlowState, setAuthFlowState, setResetPasswordToken]);

  useEffect(() => {
    if (!loading) {
      const userIsAdmin = user && user.roles && (user.roles.includes('admin') || user.roles.includes('superadmin'));
      if (location.pathname.startsWith("/admin") && (!isAuthenticated || !userIsAdmin)) {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  const register = useCallback(async (userData) => {
    setError(null);
    try {
      const data = await authApi.register(userData);
      setAuthFlowState("otp_sent");
      setUserEmailForOTP(userData.email);
      return { success: true, message: data.message };
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [setError, setAuthFlowState, setUserEmailForOTP]);

  const verifyOTP = useCallback(async (email, otp) => {
    setError(null);
    try {
      const data = await authApi.verifyOTP(email, otp);
      if (data.token) {
        localStorage.setItem("token", data.token);
        Cookies.set("token", data.token, { expires: 7 });
      }
      setIsAuthenticated(true);
      setUser(data.user); // Expect data.user to have 'roles' array
      setAuthFlowState("initial");
      return { success: true, message: "Email verified successfully!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [setError, setIsAuthenticated, setUser, setAuthFlowState]);

  const resendOTP = useCallback(async (email) => {
    setError(null);
    try {
      const data = await authApi.resendOTP(email);
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [setError]);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const { success, token, user: userData, message } = await authApi.login(email, password);
      if (success && token) {
        localStorage.setItem("token", token);
        Cookies.set("token", token, { expires: 7 });
        setUser(userData); // Expect userData to have 'roles' array
        setIsAuthenticated(true);
        return { success: true, message: message || "Login successful" };
      }
      throw new Error(message || "Login failed");
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading, setUser, setIsAuthenticated]);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout API error:", err.message);
    } finally {
      localStorage.removeItem("token");
      Cookies.remove("token");
      localStorage.removeItem("refreshToken");
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
      setUser(null);
      setAuthFlowState("initial");
      navigate("/", { replace: true });
      return { success: true, message: "Logout successful!" };
    }
  }, [setError, setIsAuthenticated, setUser, setAuthFlowState, navigate]);

  const forgotPassword = useCallback(async (email) => {
    setError(null);
    try {
      const data = await authApi.forgotPassword(email);
      setAuthFlowState("forgot_password_requested");
      return { success: true, message: data.message || "Password reset email sent!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [setError, setAuthFlowState]);

  const resetPassword = useCallback(async (token, newPassword) => {
    setError(null);
    try {
      const data = await authApi.resetPassword(token, newPassword);
      setAuthFlowState("initial");
      setResetPasswordToken(null);
      return { success: data.success, message: data.message || "Password reset successful!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  }, [setError, setAuthFlowState, setResetPasswordToken]);

  const loginWithTokens = useCallback(async (accessToken, refreshToken) => {
    setError(null);
    setLoading(true);
    try {
      if (!accessToken) {
        throw new Error("Access token not provided for OAuth login.");
      }
      localStorage.setItem("token", accessToken);
      Cookies.set("token", accessToken, { expires: 7 });
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
        Cookies.set("refreshToken", refreshToken, { expires: 30 });
      }
      const { isValid, user: userData } = await authApi.validateToken();
      if (isValid && userData) {
        setUser(userData); // Expect userData to have a 'roles' array
        setIsAuthenticated(true);
        setAuthFlowState("initial");
        return { success: true, message: "Logged in successfully with Google." };
      } else {
        localStorage.removeItem("token");
        Cookies.remove("token");
        if (refreshToken) {
          localStorage.removeItem("refreshToken");
          Cookies.remove("refreshToken");
        }
        throw new Error("Failed to validate tokens after Google Sign-In.");
      }
    } catch (err) {
      localStorage.removeItem("token");
      Cookies.remove("token");
      if (refreshToken) {
        localStorage.removeItem("refreshToken");
        Cookies.remove("refreshToken");
      }
      setUser(null);
      setIsAuthenticated(false);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading, setUser, setIsAuthenticated, setAuthFlowState]);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;
      console.log("Google Token ID:", tokenId);
      const data = await authApi.googleLogin(tokenId);
      if (data.token) {
        loginWithTokens(data.token, data.refreshToken);
      } else {
        throw new Error("Google login failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const memoizedContextValue = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    error,
    authFlowState,
    userEmailForOTP,
    resetPasswordToken,
    isAuthModalOpen,
    setError,
    setAuthFlowState,
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuthStatus,
    loginWithTokens,
    openAuthModal,
    closeAuthModal,
    handleGoogleLogin,
    // Updated role checks
    isAdmin: user && user.roles && (user.roles.includes('admin') || user.roles.includes('superadmin')),
    isSuperAdmin: user && user.roles && user.roles.includes('superadmin'),
    hasRole: (...checkRoles) => user && user.roles && checkRoles.some(role => user.roles.includes(role)),
  }), [
    user,
    isAuthenticated,
    loading,
    error,
    authFlowState,
    userEmailForOTP,
    resetPasswordToken,
    isAuthModalOpen,
    setError,
    setAuthFlowState,
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuthStatus,
    loginWithTokens,
    openAuthModal,
    closeAuthModal
  ]);

  return (
    <AuthContext.Provider value={memoizedContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
