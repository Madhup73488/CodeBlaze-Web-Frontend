import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordChangeForm = ({ theme = "light", color = "purple" }) => {
  // Define primary color based on the color prop
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  // Create CSS variables for consistent styling
  const cssVars = {
    "--color-primary": primaryColor,
    "--color-primary-light": `${primaryColor}dd`,
    "--color-primary-very-light": `${primaryColor}22`,
    "--bg-main": theme === "dark" ? "#0a0a0a" : "#f9fafb",
    "--bg-card": theme === "dark" ? "#111" : "#fff",
    "--text-primary": theme === "dark" ? "#fff" : "#333",
    "--text-secondary": theme === "dark" ? "#aaa" : "#666",
    "--border-color": theme === "dark" ? "#333" : "#e5e5e5",
    "--shadow-sm":
      theme === "dark"
        ? "0 2px 4px rgba(0, 0, 0, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.05)",
    "--shadow-md":
      theme === "dark"
        ? "0 4px 6px rgba(0, 0, 0, 0.4)"
        : "0 4px 6px rgba(0, 0, 0, 0.1)",
    "--shadow-subtle":
      theme === "dark"
        ? "0 1px 3px rgba(0, 0, 0, 0.2)"
        : "0 1px 3px rgba(0, 0, 0, 0.05)",
  };

  // Password Form state
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Simulate API call
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear form fields on success
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Hide password visibility
      setShowPassword({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });

      // Show success message
      alert("Password updated successfully");
    } catch (error) {
      // Show error message
      alert("Failed to update password");
      console.error("Error updating password:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="password-change-wrapper">
      <div className={`password-form-container ${theme}`} style={cssVars}>
        <div className="password-change-section">
          <h2 className="section-title">Security Settings</h2>

          <div className="form-card">
            <h3 className="form-title">Change Password</h3>

            <form className="password-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">
                  Current Password <span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword.currentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={errors.currentPassword ? "input-error" : ""}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    aria-label={
                      showPassword.currentPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword.currentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <span className="error-message">
                    {errors.currentPassword}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">
                  New Password <span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={errors.newPassword ? "input-error" : ""}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    aria-label={
                      showPassword.newPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword.newPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className="error-message">{errors.newPassword}</span>
                )}
                <small className="helper-text">
                  Password must be at least 6 characters long
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm New Password <span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "input-error" : ""}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    aria-label={
                      showPassword.confirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  disabled={submitting}
                  className="submit-btn"
                >
                  {submitting ? (
                    <>
                      <span className="spinner"></span>
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .password-change-wrapper {
          display: flex;
          justify-content: center;
          padding: 2rem;
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }

        .password-form-container {
          max-width: 650px;
          width: 100%;
          padding: 1rem;
          border-radius: 12px;
          background-color: var(--bg-main);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--border-color);
          color: var(--text-primary);
        }

        .form-card {
          background-color: var(--bg-card);
          border-radius: 8px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .form-title {
          font-size: 1.2rem;
          font-weight: 600;
          padding: 1.25rem;
          margin: 0;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .password-form {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .required {
          color: #e53e3e;
          margin-left: 4px;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .password-input-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        input {
          width: 100%;
          padding: 0.8rem 1rem;
          padding-right: 3rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--bg-main);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .dark input {
          background-color: var(--bg-card);
        }

        input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-very-light);
        }

        input::placeholder {
          color: ${theme === "dark" ? "#666" : "#aaa"};
        }

        .input-error {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229, 83, 62, 0.1);
        }

        .error-message {
          display: block;
          margin-top: 0.5rem;
          color: #e53e3e;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .helper-text {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .toggle-password-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .toggle-password-btn:hover {
          color: var(--text-primary);
        }

        .button-container {
          margin-top: 2rem;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
          box-shadow: var(--shadow-md);
        }

        .submit-btn:hover:not(:disabled) {
          background-color: var(--color-primary-light);
          transform: translateY(-2px);
          box-shadow: 0 6px 10px
            ${theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.15)"};
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 480px) {
          .password-change-wrapper {
            padding: 1rem;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .form-title {
            font-size: 1.1rem;
            padding: 1rem;
          }

          .password-form {
            padding: 1rem;
          }

          label {
            font-size: 0.9rem;
          }

          input {
            padding: 0.7rem 0.9rem;
            font-size: 0.95rem;
          }

          .error-message,
          .helper-text {
            font-size: 0.8rem;
          }

          .submit-btn {
            padding: 0.7rem 1.5rem;
            font-size: 0.95rem;
            min-width: auto;
            width: 100%; /* Full width button on small screens */
          }

          .spinner {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default PasswordChangeForm;