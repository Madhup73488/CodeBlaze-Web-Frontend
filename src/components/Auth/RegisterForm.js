// RegisterForm.js
import React from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import Loader from "./Loader";
import SocialLogin from "./SocialLogin";
import ErrorMessage from "./ErrorMessage";

function RegisterForm({
  registerForm,
  handleRegisterChange,
  handleRequestOTP,
  primaryColor,
  error,
  loading,
  isButtonLoading,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  return (
    <>
      <div className="auth-welcome">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">
          Join CodeBlaze and start your learning journey
        </p>
      </div>

      <ErrorMessage error={error} />

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
          <label htmlFor="register-confirm-password" className="form-label">
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
          disabled={loading || isButtonLoading}
        >
          {isButtonLoading ? (
            <Loader />
          ) : (
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <SocialLogin />
    </>
  );
}

export default RegisterForm;