import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProfileForm = ({
  profile,
  onSubmit,
  submitting: parentSubmitting,
  theme,
  color,
}) => {
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
        : "0 4px 6px rgba(0, 0, 0, 0.1)", // Fixed missing 'px' here
  };

  // Initialize form state with profile data or empty values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    location: "",
    bio: "",
  });

  // Form validation errors state
  const [errors, setErrors] = useState({});

  // Update form data when profile prop changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        company: profile.company || "",
        position: profile.position || "",
        location: profile.location || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      toast.error("Name is required");
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      toast.error("Email is invalid");
    }

    // Length validations
    if (formData.company && formData.company.length > 100) {
      newErrors.company = "Company name is too long (max 100 characters)";
      toast.error("Company name is too long");
    }

    if (formData.position && formData.position.length > 100) {
      newErrors.position = "Position is too long (max 100 characters)";
      toast.error("Position is too long");
    }

    if (formData.location && formData.location.length > 100) {
      newErrors.location = "Location is too long (max 100 characters)";
      toast.error("Location is too long");
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio is too long (max 500 characters)";
      toast.error("Bio is too long");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Call the parent component's onSubmit handler
    onSubmit(formData);
  };

  return (
    <div className="profile-form-container" style={cssVars}>
      <h2 className="section-title">Basic Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
              placeholder="Your full name"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              placeholder="Your email address"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Company field */}
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={errors.company ? "input-error" : ""}
              placeholder="Your company (optional)"
            />
            {errors.company && (
              <span className="error-message">{errors.company}</span>
            )}
          </div>

          {/* Position field */}
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={errors.position ? "input-error" : ""}
              placeholder="Your job title (optional)"
            />
            {errors.position && (
              <span className="error-message">{errors.position}</span>
            )}
          </div>

          {/* Location field */}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "input-error" : ""}
              placeholder="City, Country (optional)"
            />
            {errors.location && (
              <span className="error-message">{errors.location}</span>
            )}
          </div>
        </div>

        {/* Bio field (full width) */}
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={errors.bio ? "input-error" : ""}
            rows="4"
            placeholder="Write a short bio about yourself (optional)"
          />
          {errors.bio && <span className="error-message">{errors.bio}</span>}
          <div
            className="char-count"
            style={{
              color:
                formData.bio.length > 450
                  ? formData.bio.length > 500
                    ? "#e53e3e"
                    : primaryColor
                  : "",
            }}
          >
            {formData.bio.length}/500
          </div>
        </div>

        {/* Submit button */}
        <div className="button-container">
          <button
            type="submit"
            disabled={parentSubmitting}
            className="submit-btn"
            style={{ backgroundColor: primaryColor }}
          >
            {parentSubmitting ? (
              <>
                <span className="spinner"></span>
                Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .profile-form-container {
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
          width: 100%;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--border-color);
          color: var(--text-primary);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--bg-main);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
        }

        .dark input,
        .dark textarea {
          background-color: var(--bg-card);
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-very-light);
        }

        input::placeholder,
        textarea::placeholder {
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

        .char-count {
          text-align: right;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .button-container {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem;
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
          opacity: 0.9;
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

        /* Tablet and smaller screens */
        @media (max-width: 768px) {
          .tab-content {
            width: 340px;
          }
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .section-title {
            font-size: 1.4rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
          }

          .button-container {
            margin-top: 1.5rem;
          }
        }

        /* Phone screens */
        @media (max-width: 480px) {
          .tab-content {
            width: 100%;
          }
          .section-title {
            font-size: 1.3rem;
            margin-bottom: 0.8rem;
            padding-bottom: 0.4rem;
          }

          .form-grid {
            gap: 0.8rem;
          }

          .form-group {
            margin-bottom: 0.8rem;
          }

          label {
            font-size: 0.9rem;
            margin-bottom: 0.4rem;
          }

          input,
          textarea {
            padding: 0.7rem 0.9rem;
            font-size: 0.95rem;
          }

          .error-message {
            font-size: 0.8rem;
          }

          .char-count {
            font-size: 0.8rem;
          }

          .button-container {
            margin-top: 1.2rem;
            justify-content: center;
          }

          .submit-btn {
            padding: 0.7rem 1.5rem;
            font-size: 0.95rem;
            min-width: auto;
            width: 100%;
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

export default ProfileForm;
