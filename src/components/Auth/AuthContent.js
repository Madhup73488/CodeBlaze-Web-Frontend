// AuthContent.js
import React from "react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OtpForm from "./OtpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
// import SocialLogin from "./SocialLogin"; // Removed unused import
// import ErrorMessage from "./ErrorMessage"; // Removed unused import
// import Loader from "./Loader"; // Removed unused import

function AuthContent({
  authFlowState,
  activeTab,
  setActiveTab,
  primaryColor,
  error,
  setError,
  loginForm,
  handleLoginChange,
  handleLoginSubmit,
  registerForm,
  handleRegisterChange,
  handleRequestOTP,
  otpInputs,
  handleOtpInputChange,
  handleOtpKeyDown,
  handleVerifyOTPSubmit,
  handleResendOTP,
  forgotPasswordForm,
  handleForgotPasswordChange,
  handleForgotPasswordSubmit,
  resetPasswordForm,
  handleResetPasswordChange,
  handleResetPasswordSubmit,
  handleForgotPasswordClick,
  handleBackToLogin,
  userEmailForOTP,
  isAdmin,
  toggleAdminMode,
  loading,
  isButtonLoading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  theme, // Added theme prop
}) {
  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (authFlowState === "otp_sent") {
      return (
        <OtpForm
          userEmailForOTP={userEmailForOTP}
          otpInputs={otpInputs}
          handleOtpInputChange={handleOtpInputChange}
          handleOtpKeyDown={handleOtpKeyDown}
          handleVerifyOTPSubmit={handleVerifyOTPSubmit}
          handleResendOTP={handleResendOTP}
          handleBackToLogin={handleBackToLogin}
          primaryColor={primaryColor}
          error={error}
          isButtonLoading={isButtonLoading}
          theme={theme} // Pass theme
        />
      );
    }

    if (authFlowState === "forgot_password_form") {
      return (
        <ForgotPasswordForm
          forgotPasswordForm={forgotPasswordForm}
          handleForgotPasswordChange={handleForgotPasswordChange}
          handleForgotPasswordSubmit={handleForgotPasswordSubmit}
          handleBackToLogin={handleBackToLogin}
          primaryColor={primaryColor}
          error={error}
          isButtonLoading={isButtonLoading}
          theme={theme} // Pass theme
        />
      );
    }

    if (authFlowState === "forgot_password_requested") {
      return (
        <>
          <div className="auth-welcome">
            <h2 className="auth-title">Email Sent!</h2>
            <p className="auth-subtitle">
              If an account with that email exists, we've sent a password reset
              link. Please check your inbox (and spam folder).
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

    if (authFlowState === "reset_password_form") {
      return (
        <ResetPasswordForm
          resetPasswordForm={resetPasswordForm}
          handleResetPasswordChange={handleResetPasswordChange}
          handleResetPasswordSubmit={handleResetPasswordSubmit}
          handleBackToLogin={handleBackToLogin}
          primaryColor={primaryColor}
          error={error}
          isButtonLoading={isButtonLoading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          theme={theme} // Pass theme
        />
      );
    }

    return (
      <>
        {authFlowState === "initial" && (
          <AuthTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            primaryColor={primaryColor}
            setError={setError}
          />
        )}

        {activeTab === "login" ? (
          <LoginForm
            loginForm={loginForm}
            handleLoginChange={handleLoginChange}
            handleLoginSubmit={handleLoginSubmit}
            handleForgotPasswordClick={handleForgotPasswordClick}
            primaryColor={primaryColor}
            error={error}
            isAdmin={isAdmin}
            toggleAdminMode={toggleAdminMode}
            loading={loading}
            isButtonLoading={isButtonLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            theme={theme} // Pass theme
          />
        ) : (
          <RegisterForm
            registerForm={registerForm}
            handleRegisterChange={handleRegisterChange}
            handleRequestOTP={handleRequestOTP}
            primaryColor={primaryColor}
            error={error}
            loading={loading}
            isButtonLoading={isButtonLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            theme={theme} // Pass theme
          />
        )}
      </>
    );
  };

  return <div className="auth-content">{renderContent()}</div>;
}

export default AuthContent;
