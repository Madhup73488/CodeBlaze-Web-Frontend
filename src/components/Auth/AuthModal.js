import { useState, useEffect } from "react";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function AuthModal({ isOpen, onClose, theme, color }) {
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

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otpForm, setOtpForm] = useState({ otp: "" });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const Loader = () => (
    <div className="button-loader">
      <div className="loader-spinner"></div>
    </div>
  );

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

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpForm({ ...otpForm, [name]: value });
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

    const combined = newOtpInputs.join("");
    setOtpForm({ otp: combined });

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
      }
      setIsButtonLoading(false); // Set local loading state back to false
    }, 2000);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonLoading(true);
    setTimeout(async () => {
      if (registerForm.password !== registerForm.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!registerForm.name || !registerForm.email || !registerForm.password) {
        setError("All fields are required");
        return;
      }

      const result = await registerUser(registerForm);
      if (result.success) {
        console.log(
          "AuthModal: registerUser returned success. Context should handle state change."
        );
        setOtpInputs(["", "", "", "", "", ""]);
      } else {
        console.error("AuthModal: registerUser returned failure.");
      }
      setIsButtonLoading(false); // Set local loading state back to false
    }, 2000);
  };

  const handleVerifyOTPSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const enteredOtp = otpInputs.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    const result = await verifyUserOTP(userEmailForOTP, enteredOtp);
    if (result.success) {
      setOtpInputs(["", "", "", "", "", ""]);
      onClose();
    } else {
      console.error("AuthModal: verifyUserOTP returned failure.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const result = await resendUserOTP(userEmailForOTP);
      if (result.success) {
        // Use a success state for the message
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
      setIsButtonLoading(false); // Set local loading state back to false
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
        setError("New passwords do not match");
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
      setIsButtonLoading(false); // Set local loading state back to false
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
    setError(null);
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    setLoginForm({ email: "", password: "" });
    setError(null);
  };

  useEffect(() => {
    if (!isOpen) {
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
      setOtpForm({ otp: "" });
      setForgotPasswordForm({ email: "" });
      setResetPasswordForm({ newPassword: "", confirmNewPassword: "" });
      setError(null);

      if (
        authFlowState !== "reset_password_form" &&
        authFlowState !== "otp_sent"
      ) {
        setAuthFlowState("initial");
      }
    } else {
      if (authFlowState === "reset_password_form") {
        setResetPasswordForm({ newPassword: "", confirmNewPassword: "" });
        setOtpInputs(["", "", "", "", "", ""]);
      }
      if (authFlowState === "otp_sent") {
        setOtpInputs(["", "", "", "", "", ""]);
      }
    }
  }, [isOpen, authFlowState, setAuthFlowState, setError]);

  if (!isOpen && authFlowState !== "reset_password_form") return null;

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (authFlowState === "otp_sent") {
      return (
        <>
          <div className="auth-welcome">
            <h2 className="auth-title">Verify Your Email</h2>
            <p className="auth-subtitle">
              An OTP has been sent to <strong>{userEmailForOTP}</strong>. Please
              enter it below.
            </p>
            {error && (
              <p
                className={`${
                  error.type === "success" ? "success-message" : "error-message"
                }`}
              >
                {error.type === "success" ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                {error.message}
              </p>
            )}
          </div>
          <form onSubmit={handleVerifyOTPSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="otp" className="form-label">
                OTP Code
              </label>
              <div className="otp-input-group">
                {otpInputs.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    className="otp-input"
                    value={digit}
                    onChange={(e) =>
                      handleOtpInputChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    required
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="auth-button"
              style={{ backgroundColor: primaryColor }}
              disabled={loading}
            >
              {isButtonLoading ? (
                <Loader />
              ) : (
                <>
                  Verify <CheckCircle size={18} />
                </>
              )}
            </button>
          </form>
          <div className="auth-switch">
            Didn't receive the OTP?{" "}
            <button
              className="switch-button"
              onClick={handleResendOTP}
              style={{ color: primaryColor }}
              disabled={loading}
            >
              {isButtonLoading ? <Loader /> : "Resend OTP"}{" "}
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="auth-switch">
            <button
              className="switch-button"
              onClick={handleBackToLogin}
              style={{ color: primaryColor }}
            >
              Back to Login
            </button>
          </div>
        </>
      );
    }

    if (authFlowState === "forgot_password_form") {
      return (
        <>
          <div className="auth-welcome">
            <h2 className="auth-title">Forgot Password?</h2>
            <p className="auth-subtitle">
              Enter your email address to receive a password reset link.
            </p>
            {error && (
              <p className="error-message">
                <AlertCircle size={16} /> {error}
              </p>
            )}
          </div>
          <form onSubmit={handleForgotPasswordSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="forgot-email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="forgot-email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={forgotPasswordForm.email}
                  onChange={handleForgotPasswordChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="auth-button"
              style={{ backgroundColor: primaryColor }}
              disabled={loading}
            >
              {isButtonLoading ? (
                <Loader />
              ) : (
                <>
                  Send Reset Link <Mail size={18} />
                </>
              )}
            </button>
          </form>
          <div className="auth-switch">
            <button
              className="switch-button"
              onClick={handleBackToLogin}
              style={{ color: primaryColor }}
            >
              Back to Login
            </button>
          </div>
        </>
      );
    }

    if (authFlowState === "forgot_password_requested") {
      return (
        <>
          <div className="auth-welcome">
            <h2 className="auth-title">
              <CheckCircle size={30} color="#28a745" /> Email Sent!
            </h2>
            <p className="auth-subtitle">
              If an account with that email exists, we've sent a password reset
              link.
            </p>
            <p className="auth-subtitle">
              Please check your inbox (and spam folder).
            </p>
          </div>
          <div className="auth-switch">
            <button
              className="switch-button"
              onClick={handleBackToLogin}
              style={{ color: primaryColor }}
            >
              Back to Login
            </button>
          </div>
        </>
      );
    }

    if (authFlowState === "reset_password_form" && resetPasswordToken) {
      return (
        <>
          <div className="auth-welcome">
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-subtitle">Enter your new password.</p>
            {error && (
              <p className="error-message">
                <AlertCircle size={16} /> {error}
              </p>
            )}
          </div>
          <form onSubmit={handleResetPasswordSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="new-password" className="form-label">
                New Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  name="newPassword"
                  className="form-input"
                  placeholder="Enter new password"
                  value={resetPasswordForm.newPassword}
                  onChange={handleResetPasswordChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-new-password" className="form-label">
                Confirm New Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-new-password"
                  name="confirmNewPassword"
                  className="form-input"
                  placeholder="Confirm new password"
                  value={resetPasswordForm.confirmNewPassword}
                  onChange={handleResetPasswordChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-button"
              style={{ backgroundColor: primaryColor }}
              disabled={loading}
            >
              {isButtonLoading ? (
                <Loader />
              ) : (
                <>
                  Reset Password <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <div className="auth-switch">
            <button
              className="switch-button"
              onClick={handleBackToLogin}
              style={{ color: primaryColor }}
            >
              Back to Login
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        {activeTab === "login" ? (
          <>
            <div className="auth-welcome">
              <h2 className="auth-title">
                {isAdmin ? (
                  <span className="admin-title">
                    <ShieldCheck size={24} />
                    Admin Login
                  </span>
                ) : (
                  "Welcome back!"
                )}
              </h2>
              <p className="auth-subtitle">
                {isAdmin
                  ? "Login to access admin controls"
                  : "Log in to access your learning journey"}
              </p>
            </div>

            {error && (
              <p className="error-message">
                <AlertCircle size={16} /> {error}
              </p>
            )}

            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder={
                      isAdmin ? "admin@codeblaze.com" : "your@email.com"
                    }
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-label-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <button
                    type="button"
                    className="forgot-password switch-button"
                    onClick={handleForgotPasswordClick}
                    style={{ color: primaryColor }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`auth-button ${isAdmin ? "admin-button" : ""}`}
                style={{
                  backgroundColor: isAdmin ? "#dc2626" : primaryColor,
                }}
                disabled={loading}
              >
                {isButtonLoading ? (
                  <Loader />
                ) : isAdmin ? (
                  "Admin Login"
                ) : (
                  <>
                    "Login "
                    <ArrowRight size={18} />
                  </>
                )}{" "}
              </button>
            </form>

            {!isAdmin && (
              <div className="social-login">
                <div className="divider">
                  <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                  <button className="social-button google">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.3v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.08z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button className="social-button github">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>
            )}

            <div className="admin-switch">
              <button
                className="admin-toggle switch-button"
                onClick={toggleAdminMode}
                style={{ color: primaryColor }}
              >
                {isAdmin ? "Switch to User Login" : "Admin Login"}
              </button>
            </div>

            {!isAdmin && (
              <p className="auth-switch">
                New to CodeBlaze?{" "}
                <button
                  className="switch-button"
                  onClick={() => {
                    setActiveTab("register");
                    setError(null);
                  }}
                  style={{ color: primaryColor }}
                >
                  Create an account
                </button>
              </p>
            )}
          </>
        ) : (
          <>
            <div className="auth-welcome">
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">
                Join CodeBlaze and start your learning journey
              </p>
            </div>

            {error && (
              <p className="error-message">
                <AlertCircle size={16} /> {error}
              </p>
            )}

            <form onSubmit={handleRequestOTP} className="auth-form">
              <div className="form-group">
                <label htmlFor="register-name" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="register-name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="register-email"
                    name="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-password"
                    name="password"
                    className="form-input"
                    placeholder="Create a password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="register-confirm-password"
                  className="form-label"
                >
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="register-confirm-password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-button"
                style={{ backgroundColor: primaryColor }}
                disabled={loading}
              >
                {isButtonLoading ? (
                  <loader />
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="social-login">
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button className="social-button google">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.3v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.08z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="social-button github">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </button>
              </div>
            </div>

            <p className="auth-switch">
              Already have an account?{" "}
              <button
                className="switch-button"
                onClick={() => {
                  setActiveTab("login");
                  setError(null);
                }}
                style={{ color: primaryColor }}
              >
                Log in
              </button>
            </p>
          </>
        )}
      </>
    );
  };

  return (
    <div className={`auth-modal-overlay ${theme}`}>
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="auth-container">
          <div className="auth-branding">
            <div className="brand-content">
              <div className="brand-logo">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40 0L73.9 20V60L40 80L6.1 60V20L40 0Z"
                    fill={primaryColor}
                  />
                  <path
                    d="M25 50L15 40L25 30M55 30L65 40L55 50M45 25L35 55"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="brand-name">CodeBlaze</h1>
              <p className="brand-tagline">
                Master coding through interactive challenges and projects
              </p>
              <div className="brand-features">
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Interactive coding exercises</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Personalized learning paths</span>
                </div>
                <div className="feature">
                  <CheckCircle size={20} />
                  <span>Certification upon completion</span>
                </div>
              </div>
            </div>
            <div className="brand-footer">
              <p>
                By continuing, you agree to our{" "}
                <a href="#" className="external-link">
                  Terms of Service <ExternalLink size={12} />
                </a>{" "}
                and{" "}
                <a href="#" className="external-link">
                  Privacy Policy <ExternalLink size={12} />
                </a>
              </p>
            </div>
          </div>

          <div className="auth-content">
            {authFlowState === "initial" && (
              <div className="auth-tabs">
                <button
                  className={`tab ${activeTab === "login" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("login");
                    setError(null);
                  }}
                  style={{
                    borderColor:
                      activeTab === "login" ? primaryColor : "transparent",
                    color: activeTab === "login" ? primaryColor : "",
                  }}
                >
                  Login
                </button>
                <button
                  className={`tab ${activeTab === "register" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("register");
                    setError(null);
                  }}
                  style={{
                    borderColor:
                      activeTab === "register" ? primaryColor : "transparent",
                    color: activeTab === "register" ? primaryColor : "",
                  }}
                >
                  Register
                </button>
              </div>
            )}

            {renderContent()}
          </div>
        </div>
      </div>
      <style jsx>{`
        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          transition: opacity 0.3s ease;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .auth-modal {
          position: relative;
          width: 100%;
          max-width: 950px; /* Reduced from 1000px */
          max-height: 85vh; /* Add height constraint */
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25),
            0 18px 36px -18px rgba(0, 0, 0, 0.3);
          overflow: auto; /* Change from overflow: hidden to allow scrolling */
          animation: modalSlideUp 0.4s ease-out;
          transform-origin: bottom;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dark .auth-modal {
          background-color: #111827;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5),
            0 18px 36px -18px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          cursor: pointer;
          color: #4b5563;
          z-index: 10;
          transition: all 0.2s ease;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          color: #111;
          background-color: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .dark .close-button {
          background: rgba(0, 0, 0, 0.2);
          color: #d1d5db;
        }

        .dark .close-button:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .auth-container {
          display: flex;
          height: auto;
          min-height: 600px;
        }

        .auth-branding {
          width: 40%;
          background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          color: white;
        }

        .dark .auth-branding {
          background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%);
        }

        .auth-branding::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .brand-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 2;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .brand-logo {
          margin-bottom: 2rem;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }

        .brand-logo:hover {
          transform: scale(1.05);
        }

        .brand-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
          letter-spacing: -0.025em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .brand-tagline {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2.5rem;
          max-width: 80%;
          line-height: 1.6;
        }

        .brand-features {
          width: 100%;
          text-align: left;
        }

        .feature {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          transition: transform 0.2s ease;
        }

        .feature:hover {
          transform: translateX(5px);
        }

        .feature svg {
          margin-right: 12px;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.2);
          padding: 5px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }

        .brand-footer {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          z-index: 2;
        }

        .external-link {
          color: white;
          text-decoration: underline;
          display: inline-flex;
          align-items: center;
          transition: opacity 0.2s ease;
        }

        .external-link:hover {
          opacity: 0.8;
        }

        .auth-content {
          width: 60%;
          padding: 3rem;
          display: flex;
          flex-direction: column;
        }

        .auth-tabs {
          display: flex;
          margin-bottom: 2rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1px;
        }

        .dark .auth-tabs {
          border-bottom: 1px solid #374151;
        }

        .tab {
          flex: 1;
          padding: 0.75rem 0;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          font-size: 1.125rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .dark .tab {
          color: #9ca3af;
        }

        .tab:hover {
          color: #111827;
        }

        .dark .tab:hover {
          color: #f9fafb;
        }

        .tab.active {
          color: #4f46e5;
          border-bottom: 3px solid #4f46e5;
          font-weight: 600;
        }

        .tab.active:after {
          // content: "";
          position: absolute;
          bottom: -3px;
          left: 50%;
          width: 10px;
          height: 10px;
          background: #4f46e5;
          border-radius: 50%;
          transform: translateX(-50%) translateY(50%);
        }

        .auth-welcome {
          margin-bottom: 2rem;
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .auth-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #111827;
          letter-spacing: -0.025em;
        }

        .dark .auth-title {
          color: #f9fafb;
        }

        .admin-title {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #dc2626;
        }

        .admin-title svg {
          margin-right: 12px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }

        .auth-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .dark .auth-subtitle {
          color: #9ca3af;
        }

        .auth-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #4b5563;
          transition: color 0.2s ease;
        }

        .dark .form-label {
          color: #d1d5db;
        }

        .password-label-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-password {
          font-size: 0.85rem;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #4f46e5;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .forgot-password:hover {
          opacity: 0.8;
          transform: translateX(2px);
        }

        .dark .forgot-password {
          color: #818cf8;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #9ca3af;
          transition: color 0.2s ease;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 0.875rem 0.875rem 3rem;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #fff;
        }

        .form-input:hover {
          border-color: #a1a1aa;
        }

        .dark .form-input {
          background-color: #1f2937;
          border-color: #4b5563;
          color: #f9fafb;
        }

        .form-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15);
          background-color: #fff;
        }

        .dark .form-input:focus {
          border-color: #818cf8;
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.15);
          background-color: #1f2937;
        }

        .form-input:focus + .input-icon {
          color: #4f46e5;
        }

        .dark .form-input:focus + .input-icon {
          color: #818cf8;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .password-toggle:hover {
          color: #4b5563;
        }

        .dark .password-toggle {
          color: #d1d5db;
        }

        .dark .password-toggle:hover {
          color: #e5e7eb;
        }

        .otp-input-group {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-top: 0.75rem;
        }

        .otp-input {
          width: 40px;
          height: 50px;
          border: 2px solid #d1d5db;
          border-radius: 12px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .otp-input:hover {
          border-color: #a1a1aa;
        }

        .dark .otp-input {
          background-color: #1f2937;
          border-color: #4b5563;
          color: #f9fafb;
        }

        .otp-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15);
        }

        .dark .otp-input:focus {
          border-color: #818cf8;
          box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.15);
        }

        .auth-button {
          width: 100%;
          padding: 0.875rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          margin-bottom: 1.75rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .auth-button:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: width 0.3s ease;
        }

        .auth-button:hover:after {
          width: 100%;
        }

        .auth-button svg {
          margin-left: 12px;
          transition: transform 0.3s ease;
        }

        .auth-button:hover svg {
          transform: translateX(5px);
        }

        .auth-button:hover {
          background-color: #4338ca;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
        }

        .auth-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.2);
        }

        .auth-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
          box-shadow: none;
        }

        .admin-button {
          background-color: #dc2626;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
        }

        .admin-button:hover {
          background-color: #b91c1c;
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.25);
        }

        .social-login {
          margin-bottom: 2rem;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #e5e7eb;
        }

        .dark .divider::before,
        .dark .divider::after {
          border-color: #4b5563;
        }

        .divider span {
          padding: 0 1rem;
          font-size: 0.95rem;
          color: #6b7280;
          background-color: #fff;
        }

        .dark .divider span {
          color: #9ca3af;
          background-color: #111827;
        }

        .social-buttons {
          display: flex;
          gap: 12px;
        }

        .social-button {
          flex: 1;
          padding: 0.75rem;
          background-color: white;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          color: #4b5563;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .dark .social-button {
          background-color: #1f2937;
          border-color: #4b5563;
          color: #d1d5db;
        }

        .social-button svg {
          margin-right: 12px;
          transition: transform 0.3s ease;
        }

        .social-button:hover {
          background-color: #f9fafb;
          border-color: #9ca3af;
          transform: translateY(-2px);
        }

        .dark .social-button:hover {
          background-color: #374151;
          border-color: #6b7280;
        }

        .social-button:active {
          transform: translateY(0);
        }

        .social-button.google:hover {
          border-color: #ea4335;
        }

        .social-button.github:hover {
          border-color: #24292e;
        }

        .social-button:hover svg {
          transform: scale(1.1);
        }

        .auth-switch {
          text-align: center;
          font-size: 1rem;
          color: #6b7280;
          margin-top: 1.25rem;
        }

        .dark .auth-switch {
          color: #9ca3af;
        }

        .switch-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #4f46e5;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .switch-button:hover {
          color: #4338ca;
          text-decoration: underline;
        }

        .dark .switch-button {
          color: #818cf8;
        }

        .dark .switch-button:hover {
          color: #a5b4fc;
        }

        .switch-button svg {
          margin-left: 6px;
          transition: transform 0.2s ease;
        }

        .switch-button:hover svg {
          transform: translateX(3px);
        }

        .admin-switch {
          text-align: center;
          margin-top: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .error-message {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          margin-bottom: 1.75rem;
          animation: shake 0.5s ease-in-out;
          border-left: 4px solid #ef4444;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }

        .dark .error-message {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-left: 4px solid #ef4444;
        }

        .error-message svg {
          margin-right: 10px;
          flex-shrink: 0;
        }

        .success-message {
          background-color: #d1fae5;
          color: #047857;
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          margin-bottom: 1.75rem;
          animation: slideDown 0.5s ease-out;
          border-left: 4px solid #10b981;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dark .success-message {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-left: 4px solid #10b981;
        }

        .success-message svg {
          margin-right: 10px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .auth-container {
            flex-direction: column;
          }

          .auth-branding {
            width: 100%;
            padding: 2rem 1.5rem;
            order: 2;
            display: none;
          }

          .auth-content {
            width: 100%;
            padding: 2rem 1.5rem;
            order: 1;
          }

          .auth-modal {
            max-height: 90vh;
            overflow-y: auto;
          }

          .tab {
            font-size: 1rem;
          }

          .auth-title {
            font-size: 1.5rem;
          }

          .auth-subtitle {
            font-size: 1rem;
          }
        }

        .theme-light {
          color-scheme: light;
        }

        .theme-dark {
          color-scheme: dark;
        }

        // Add this CSS to your styles:
        .button-loader {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loader-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default AuthModal;
