// LoginForm.js
import React from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import Loader from "./Loader";
import SocialLogin from "./SocialLogin";
import ErrorMessage from "./ErrorMessage";

function LoginForm({
  loginForm,
  handleLoginChange,
  handleLoginSubmit,
  handleForgotPasswordClick,
  primaryColor,
  error,
  isAdmin,
  toggleAdminMode,
  loading,
  isButtonLoading,
  showPassword,
  setShowPassword,
}) {
  return (
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

      <ErrorMessage error={error} />

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
              placeholder={isAdmin ? "admin@codeblaze.com" : "your@email.com"}
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
          disabled={loading || isButtonLoading}
        >
          {isButtonLoading ? (
            <Loader />
          ) : isAdmin ? (
            "Admin Login"
          ) : (
            <>
              Login
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {!isAdmin && <SocialLogin />}

      <div className="admin-switch">
        <button
          className="admin-toggle switch-button"
          onClick={toggleAdminMode}
          style={{ color: primaryColor }}
        >
          {isAdmin ? "Switch to User Login" : "Admin Login"}
        </button>
      </div>
    </>
  );
}

export default LoginForm;