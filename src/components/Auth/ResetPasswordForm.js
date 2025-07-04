// ResetPasswordForm.js
import React from "react";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function ResetPasswordForm({
  resetPasswordForm,
  handleResetPasswordChange,
  handleResetPasswordSubmit,
  handleBackToLogin,
  primaryColor,
  error,
  isButtonLoading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  return (
    <>
      <div className="auth-welcome">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">Enter your new password.</p>
        <ErrorMessage error={error} />
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
          disabled={isButtonLoading}
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

export default ResetPasswordForm;
