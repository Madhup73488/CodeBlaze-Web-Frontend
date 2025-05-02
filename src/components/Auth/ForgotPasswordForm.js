// ForgetPasswordForm.js
import React from "react";
import { Mail, AlertCircle } from "lucide-react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function ForgetPasswordForm({
  forgotPasswordForm,
  handleForgotPasswordChange,
  handleForgotPasswordSubmit,
  handleBackToLogin,
  primaryColor,
  error,
  isButtonLoading,
}) {
  return (
    <>
      <div className="auth-welcome">
        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter your email address to receive a password reset link.
        </p>
        <ErrorMessage error={error} />
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
          disabled={isButtonLoading}
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

export default ForgetPasswordForm;
