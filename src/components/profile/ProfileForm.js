// src/components/profile/ProfileForm.jsx
import React, { useState, useEffect } from "react"; // Added useEffect
import { toast } from "react-toastify"; // Keep toast if used internally for validation feedback

const ProfileForm = ({
  profile,
  onSubmit,
  submitting: parentSubmitting,
  theme,
  color,
}) => {
  // Use effect to update form data if the profile prop changes (e.g., after initial fetch or an update)
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
  }, [profile]); // Depend on the profile prop

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    company: profile?.company || "",
    position: profile?.position || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
  });

  const [errors, setErrors] = useState({});
  // We will use the 'submitting' prop from the parent, remove local state if only parent controls it
  // const [submitting, setSubmitting] = useState(false); // Removed local submitting state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the field as the user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null, // Clear specific field error
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      toast.error("Name is required"); // Optional: show toast for validation errors
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      toast.error("Email is invalid");
    }
    if (formData.company && formData.company.length > 100) {
      // Check existence before length
      newErrors.company = "Company name is too long (max 100 chars)";
      toast.error("Company name is too long");
    }
    if (formData.position && formData.position.length > 100) {
      // Check existence before length
      newErrors.position = "Position is too long (max 100 chars)";
      toast.error("Position is too long");
    }
    if (formData.location && formData.location.length > 100) {
      // Check existence before length
      newErrors.location = "Location is too long (max 100 chars)";
      toast.error("Location is too long");
    }
    if (formData.bio && formData.bio.length > 500) {
      // Check existence before length
      newErrors.bio = "Bio is too long (max 500 characters)";
      toast.error("Bio is too long");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Use the parent's onSubmit function, which handles the submitting state
    onSubmit(formData);
  };

  // Removed themeStyles object - will use CSS variables from parent

  return (
    // Themed classes are applied by the parent ProfileDashboard
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        {["name", "email", "company", "position", "location"].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              // Apply error class if there is an error for this field
              className={errors[field] ? "input-error" : ""}
            />
            {errors[field] && (
              <span className="error-message">{errors[field]}</span>
            )}
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            // Apply error class if there is an error for this field
            className={errors.bio ? "input-error" : ""}
            rows="4"
          />
          {errors.bio && <span className="error-message">{errors.bio}</span>}
          {/* Added character count */}
          <div className="char-count">{formData.bio.length}/500</div>
        </div>

        {/* Use the submitting prop passed from the parent */}
        <button
          type="submit"
          disabled={parentSubmitting}
          className="submit-btn"
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
      </form>

      <style jsx>{`
        .profile-form {
          padding: 0; /* Remove padding here, handled by TabContent in parent */
          /* Background and text color inherited from parent's tab-content or set by variables */
          /* background-color: var(--bg-card); */
          /* color: var(--text-primary); */
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600; /* Slightly bolder label */
          color: var(--text-secondary); /* Secondary text color for labels */
          font-size: 0.95rem;
        }

        input,
        textarea {
          width: 100%;
          padding: 0.8rem 1rem; /* Increased padding */
          border: 1px solid var(--border-color); /* Use border color variable */
          border-radius: 6px;
          background-color: var(
            --bg-main
          ); /* Use main background for inputs for contrast */
          color: var(--text-primary); /* Primary text color */
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle inner shadow */
        }

        /* Dark mode input adjustment if needed, though variables should handle most */
        .dark input,
        .dark textarea {
          background-color: var(
            --bg-card
          ); /* Use card background in dark mode for input */
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(
            --color-primary
          ); /* Primary color border on focus */
          box-shadow: 0 0 0 3px var(--color-primary-very-light); /* Light primary color shadow */
        }

        /* Error state styling */
        .input-error {
          border-color: #e53e3e; /* Standard red for error */
          box-shadow: 0 0 0 3px rgba(229, 83, 62, 0.1); /* Red shadow */
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
          color: var(--text-secondary); /* Secondary text color */
          margin-top: 0.25rem;
        }

        /* Submit Button Styling */
        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem; /* More padding */
          background-color: var(--color-primary); /* Primary color background */
          color: white; /* White text */
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600; /* Bolder text */
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px; /* Minimum width */
          box-shadow: var(--shadow-md); /* Add shadow */
        }

        .submit-btn:hover:not(:disabled) {
          background-color: var(
            --color-primary-light
          ); /* Lighter primary on hover */
          box-shadow: var(
            --shadow-md
          ); /* Maintain shadow or slightly increase */
          transform: translateY(-2px); /* Subtle lift effect */
        }

        .submit-btn:disabled {
          opacity: 0.6; /* Reduced opacity */
          cursor: not-allowed;
          box-shadow: none; /* Remove shadow when disabled */
          transform: none;
        }

        /* Spinner Styling */
        .spinner {
          display: inline-block;
          width: 18px; /* Slightly larger spinner */
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3); /* Lighter border */
          border-radius: 50%;
          border-top-color: white; /* White spinner */
          animation: spin 0.8s linear infinite;
          margin-right: 10px; /* More space */
        }

        /* Dark mode spinner adjustment */
        .dark .submit-btn .spinner {
          border: 3px solid rgba(var(--text-primary, #e5e7eb), 0.3); /* Use primary text color in rgba */
          border-top-color: var(--text-primary); /* Primary text color */
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 480px) {
          label {
            font-size: 0.9rem;
          }

          input,
          textarea {
            padding: 0.6rem 0.8rem;
            font-size: 0.95rem;
          }

          .error-message {
            font-size: 0.8rem;
          }

          .char-count {
            font-size: 0.8rem;
          }

          .submit-btn {
            padding: 0.6rem 1.5rem;
            font-size: 0.95rem;
            min-width: auto;
            width: 100%; /* Full width button on very small screens */
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
