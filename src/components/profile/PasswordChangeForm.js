// src/components/profile/PasswordChangeForm.jsx
import React, { useState } from 'react';
import { userService } from '../../services/userService';
import { toast } from 'react-toastify';

// Note: theme and color props are passed down from the parent,
// but styling primarily relies on CSS variables set by the parent.
const PasswordChangeForm = ({ theme, color, setSubmitting: setParentSubmitting, submitting: parentSubmitting }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  // Removed local submitting state, using parent's state
  // const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      toast.error('Current password is required');
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
       toast.error('New password is required');
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
      toast.error('Password must be at least 6 characters');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
      toast.error('Please confirm your new password');
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      toast.error('Passwords do not match');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setParentSubmitting(true); // Use parent's submitting state
    try {
      await userService.updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      toast.success('Password updated successfully');
      // Clear form fields on success
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
       // Hide password visibility
       setShowPassword({
           currentPassword: false,
           newPassword: false,
           confirmPassword: false
       });

    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Current password is incorrect');
        // Optionally set a specific error for the current password field
        setErrors({...errors, currentPassword: 'Current password is incorrect'});
      } else {
        toast.error('Failed to update password');
      }
      console.error('Error updating password:', error);
    } finally {
      setParentSubmitting(false); // End parent's submitting state
    }
  };

  return (
    <div className="password-change-section">
      <h3>Change Password</h3>

      <form className="password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password<span className="required">*</span></label>
          <div className="password-input-container">
            <input
              type={showPassword.currentPassword ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
               // Apply error class if there is an error for this field
              className={errors.currentPassword ? 'input-error' : ''}
            />
            <button
              type="button"
              className="toggle-password-btn" // Specific class name
              onClick={() => togglePasswordVisibility('currentPassword')}
              aria-label={showPassword.currentPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword.currentPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.91 4.24A9.38 9.38 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
          {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password<span className="required">*</span></label>
          <div className="password-input-container">
            <input
              type={showPassword.newPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={errors.newPassword ? 'input-error' : ''}
            />
             <button
              type="button"
               className="toggle-password-btn" // Specific class name
              onClick={() => togglePasswordVisibility('newPassword')}
               aria-label={showPassword.newPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword.newPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.91 4.24A9.38 9.38 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
          {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
          <small className="helper-text">Password must be at least 6 characters long</small> {/* Added class */}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password<span className="required">*</span></label>
          <div className="password-input-container">
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
             <button
              type="button"
              className="toggle-password-btn" // Specific class name
              onClick={() => togglePasswordVisibility('confirmPassword')}
               aria-label={showPassword.confirmPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword.confirmPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.91 4.24A9.38 9.38 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" disabled={parentSubmitting} className="submit-btn">
          {parentSubmitting ? (
             <>
               <span className="spinner"></span>
               Updating...
             </>
           ) : 'Change Password'}
        </button>
      </form>

      <style jsx>{`
        /* Password Change Section Styling (inherits general styles from parent) */
        .password-change-section {
          /* Padding handled by parent's tab-content */
        }

        .password-change-section h3 {
          font-size: 1.4rem; /* Section title size */
          font-weight: 600;
          color: var(--text-primary); /* Primary text color */
          margin-top: 0;
          margin-bottom: 1.5rem; /* Space below title */
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color); /* Separator line */
        }

        /* Password Form Styling (inherits input/label/group from ProfileForm's general styles) */
        .password-form {
          padding: 1.5rem; /* Padding around the form */
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-main); /* Use main background for forms within card */
          box-shadow: var(--shadow-subtle);
        }

        .dark .password-form {
             background-color: var(--bg-card); /* Use card background in dark mode */
        }

        .form-group {
           margin-bottom: 1.5rem; /* Consistent margin */
        }

         .required {
          color: #e53e3e; /* Red for required indicator */
          margin-left: 4px;
        }


        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600; /* Slightly bolder label */
          color: var(--text-secondary); /* Secondary text color for labels */
          font-size: 0.95rem;
        }

        input {
          width: 100%;
          padding: 0.8rem 1rem; /* Increased padding */
          border: 1px solid var(--border-color); /* Use border color variable */
          border-radius: 6px;
          background-color: var(--bg-main); /* Use main background for inputs for contrast */
          color: var(--text-primary); /* Primary text color */
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.05); /* Subtle inner shadow */
        }

        /* Dark mode input adjustment if needed, though variables should handle most */
        .dark input {
            background-color: var(--bg-card); /* Use card background in dark mode for input */
        }


        input:focus {
          outline: none;
          border-color: var(--color-primary); /* Primary color border on focus */
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

        /* Password Input with Toggle Button */
        .password-input-container {
            position: relative; /* Needed for absolute positioning of button */
            display: flex; /* Use flex to align input and button */
            align-items: center; /* Vertically center items */
            width: 100%;
        }

        .password-input-container input {
            flex-grow: 1; /* Allow input to take available space */
             /* Adjust padding-right to make space for the button */
            padding-right: 3rem; /* Enough space for button + padding */
        }

        .toggle-password-btn {
            position: absolute;
            right: 10px; /* Position from the right edge */
            top: 50%; /* Align vertically */
            transform: translateY(-50%); /* Center vertically */
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px; /* Clickable area padding */
            display: flex; /* Center SVG */
            align-items: center;
            justify-content: center;
            color: var(--text-secondary); /* Secondary text color for icon */
            transition: color 0.2s ease;
        }

        .toggle-password-btn:hover {
            color: var(--text-primary); /* Primary text color on hover */
        }

        .toggle-password-btn svg {
             width: 20px;
             height: 20px;
        }


        .helper-text { /* Styled small tag */
            display: block;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        /* Submit Button Styling (Consistent with other submit buttons) */
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
          margin-top: 1rem; /* Space above the button */
        }

        .submit-btn:hover:not(:disabled) {
          background-color: var(--color-primary-light); /* Lighter primary on hover */
          box-shadow: var(--shadow-md); /* Maintain shadow or slightly increase */
          transform: translateY(-2px); /* Subtle lift effect */
        }

        .submit-btn:disabled {
          opacity: 0.6; /* Reduced opacity */
          cursor: not-allowed;
          box-shadow: none; /* Remove shadow when disabled */
          transform: none;
        }

        /* Spinner Styling (Consistent with other buttons) */
         .submit-btn .spinner {
           display: inline-block;
           width: 16px;
           height: 16px;
           border: 2px solid rgba(255, 255, 255, 0.3);
           border-radius: 50%;
           border-top-color: white;
           animation: spin 1s linear infinite;
           margin-right: 8px;
         }

         .dark .submit-btn .spinner {
            border: 2px solid rgba(var(--text-primary, #e5e7eb), 0.3);
            border-top-color: var(--text-primary);
         }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 480px) {
             .password-change-section h3 {
                 font-size: 1.2rem;
                 margin-bottom: 1rem;
             }
             .password-form {
                 padding: 1rem;
             }
             label {
                 font-size: 0.9rem;
             }
             input {
                 font-size: 0.95rem;
                 padding: 0.6rem 0.8rem;
                 padding-right: 2.5rem; /* Adjust padding for smaller button */
             }
              .toggle-password-btn {
                  right: 5px;
                  width: 18px;
                  height: 18px;
              }
              .toggle-password-btn svg {
                  width: 18px;
                  height: 18px;
              }
             .error-message, .helper-text {
                 font-size: 0.8rem;
             }
             .submit-btn {
                 width: 100%;
                 text-align: center;
                 justify-content: center;
                 padding: 0.6rem 1.5rem;
                 font-size: 0.95rem;
                 min-width: auto;
             }

         }

      `}</style>
    </div>
  );
};

export default PasswordChangeForm;