// Updated AuthModal.js with onLoginSuccess callback
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import AuthBranding from "./AuthBranding";
import AuthContent from "./AuthContent";
import "./AuthModal.css";

function AuthModal({ isOpen, onClose, theme, color, onLoginSuccess }) {
  const {
    isAuthenticated,
    loading,
    error,
    setError,
    authFlowState,
    setAuthFlowState,
    userEmailForOTP,
    resetPasswordToken,
    register: registerUser,
    verifyOTP: verifyUserOTP,
    resendOTP: resendUserOTP,
    login: loginUser,
    forgotPassword: requestForgotPassword,
    resetPassword: resetUserPassword,
  } = useAuth();
  const { openCart, checkoutInitiated, setCheckoutInitiated } = useCart();

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // Handle successful login and call onLoginSuccess if provided
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      onClose();
    }
  }, [isAuthenticated, isOpen, onClose, onLoginSuccess]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    if (error) setError(null);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
    if (error) setError(null);
  };

  const handleOtpInputChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (error) setError(null);
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpInputs[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordForm({ ...forgotPasswordForm, [name]: value });
    if (error) setError(null);
  };

  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordForm({ ...resetPasswordForm, [name]: value });
    if (error) setError(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonLoading(true);
    setTimeout(async () => {
      const result = await loginUser(loginForm.email, loginForm.password);
      if (result.success) {
        onClose();
        if (checkoutInitiated) {
          openCart();
          setCheckoutInitiated(false);
        }
      }
      setIsButtonLoading(false);
    }, 2000);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonLoading(true);
    setTimeout(async () => {
      if (registerForm.password !== registerForm.confirmPassword) {
        setError({ type: "error", message: "Passwords do not match" });
        setIsButtonLoading(false);
        return;
      }
      if (!registerForm.name || !registerForm.email || !registerForm.password) {
        setError({ type: "error", message: "All fields are required" });
        setIsButtonLoading(false);
        return;
      }
      const result = await registerUser(registerForm);
      if (result.success) {
        setOtpInputs(["", "", "", "", "", ""]);
      }
      setIsButtonLoading(false);
    }, 2000);
  };

  const handleVerifyOTPSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const enteredOtp = otpInputs.join("");
    if (enteredOtp.length !== 6) {
      setError({
        type: "error",
        message: "Please enter the complete 6-digit OTP",
      });
      return;
    }
    const result = await verifyUserOTP(userEmailForOTP, enteredOtp);
    if (result.success) {
      setOtpInputs(["", "", "", "", "", ""]);
      onClose();
    }
  };

  const handleResendOTP = async () => {
    try {
      const result = await resendUserOTP(userEmailForOTP);
      if (result.success) {
        setError({ type: "success", message: "OTP resent successfully." });
        setOtpInputs(["", "", "", "", "", ""]);
      } else {
        setError({
          type: "error",
          message: "Failed to resend OTP. " + result.message,
        });
      }
    } catch (err) {
      setError({
        type: "error",
        message: "Failed to resend OTP. Please try again.",
      });
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonLoading(true);
    setTimeout(async () => {
      const result = await requestForgotPassword(forgotPasswordForm.email);
      if (result.success) {
        setForgotPasswordForm({ email: "" });
      }
      setIsButtonLoading(false);
    }, 2000);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonLoading(true);
    setTimeout(async () => {
      if (
        resetPasswordForm.newPassword !== resetPasswordForm.confirmNewPassword
      ) {
        setError({ type: "error", message: "New passwords do not match" });
        setIsButtonLoading(false);
        return;
      }
      const result = await resetUserPassword(
        resetPasswordToken,
        resetPasswordForm.newPassword
      );
      if (result.success) {
        setResetPasswordForm({ newPassword: "", confirmNewPassword: "" });
        onClose();
      }
      setIsButtonLoading(false);
    }, 2000);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAuthFlowState("forgot_password_form");
    setLoginForm({ email: "", password: "" });
    setError(null);
  };

  const handleBackToLogin = () => {
    setAuthFlowState("initial");
    setActiveTab("login");
    setOtpInputs(["", "", "", "", "", ""]);
    setForgotPasswordForm({ email: "" });
    setResetPasswordForm({ newPassword: "", confirmNewPassword: "" });
    setLoginForm({ email: "", password: "" });
    setError(null);
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    setLoginForm({ email: "", password: "" });
    setError(null);
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset all state when modal closes
      setActiveTab("login");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsAdmin(false);
      setLoginForm({ email: "", password: "" });
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setOtpInputs(["", "", "", "", "", ""]);
      setForgotPasswordForm({ email: "" });
      setResetPasswordForm({ newPassword: "", confirmNewPassword: "" });
      setError(null);

      // If the modal is closing (isOpen is false):
      // Reset authFlowState if it's 'otp_sent' or 'forgot_password_requested' (interrupted flows).
      // Do not reset 'reset_password_form' here, as AuthContext manages its lifecycle based on the URL.
      if (authFlowState === "otp_sent" || authFlowState === "forgot_password_requested") {
        setAuthFlowState("initial");
      }
    } else {
      // When modal opens (isOpen becomes true), potentially adjust state based on authFlowState
      if (authFlowState === "reset_password_form") {
        setResetPasswordForm({ newPassword: "", confirmNewPassword: "" });
      }
      if (authFlowState === "otp_sent") {
        // Keep otpInputs potentially filled, or clear if a fresh start is desired
      }
    }
    return () => {
      // Any cleanup needed when modal is unmounted or state changes trigger re-run
    };
  }, [isOpen, authFlowState, setAuthFlowState, setError]); // Updated dependencies

  if (
    !isOpen &&
    authFlowState !== "reset_password_form" &&
    authFlowState !== "otp_sent"
  ) {
    return null;
  }

  if (!isOpen && !["reset_password_form", "otp_sent"].includes(authFlowState)) {
    return null;
  }

  return (
    <div
      className={`auth-modal-overlay ${theme} ${
        isMobileView ? "mobile-view" : ""
      }`}
    >
      <div
        className={`auth-modal ${isMobileView ? "mobile-modal" : ""}`}
        style={{
          backgroundColor:
            theme === "dark" ? "#111827" : "#ffffff",
        }}
      >
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="auth-container">
          {!isMobileView && <AuthBranding primaryColor={primaryColor} />}
          <AuthContent
            authFlowState={authFlowState}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            primaryColor={primaryColor}
            error={error}
            setError={setError}
            loginForm={loginForm}
            handleLoginChange={handleLoginChange}
            handleLoginSubmit={handleLoginSubmit}
            registerForm={registerForm}
            handleRegisterChange={handleRegisterChange}
            handleRequestOTP={handleRequestOTP}
            otpInputs={otpInputs}
            handleOtpInputChange={handleOtpInputChange}
            handleOtpKeyDown={handleOtpKeyDown}
            handleVerifyOTPSubmit={handleVerifyOTPSubmit}
            handleResendOTP={handleResendOTP}
            forgotPasswordForm={forgotPasswordForm}
            handleForgotPasswordChange={handleForgotPasswordChange}
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            resetPasswordForm={resetPasswordForm}
            handleResetPasswordChange={handleResetPasswordChange}
            handleResetPasswordSubmit={handleResetPasswordSubmit}
            handleForgotPasswordClick={handleForgotPasswordClick}
            handleBackToLogin={handleBackToLogin}
            userEmailForOTP={userEmailForOTP}
            isAdmin={isAdmin}
            toggleAdminMode={toggleAdminMode}
            loading={loading}
            isButtonLoading={isButtonLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
