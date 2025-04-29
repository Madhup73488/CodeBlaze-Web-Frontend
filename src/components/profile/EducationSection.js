// src/components/profile/EducationSection.jsx
import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import format from "date-fns/format"; // Using date-fns for date formatting

// Note: theme and color props are passed down from the parent,
// but styling primarily relies on CSS variables set by the parent.
const EducationSection = ({
  education = [],
  onUpdate,
  theme,
  color,
  setSubmitting: setParentSubmitting,
  submitting: parentSubmitting,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [errors, setErrors] = useState({});
  // Removed local submitting state, using parent's state
  // const [submitting, setSubmitting] = useState(false);

  // Effect to handle scrolling when form is shown for editing
  useEffect(() => {
    if (showForm && editingId) {
      // Use a small timeout to allow form to render before scrolling
      const timer = setTimeout(() => {
        const formElement = document.getElementById("education-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showForm, editingId]); // Rerun effect when form visibility or editingId changes

  const resetForm = () => {
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
    });
    setErrors({});
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If 'current' is checked, clear the 'to' date
    if (name === "current" && checked) {
      setFormData({
        ...formData,
        [name]: checked,
        to: "", // Clear 'to' date when 'current' is checked
      });
      // Clear 'to' date error if any
      if (errors.to) {
        setErrors({ ...errors, to: null });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Effect to sync form 'to' date with 'current' status if prop changes
  useEffect(() => {
    if (formData.current && formData.to !== "") {
      setFormData((prev) => ({ ...prev, to: "" }));
      if (errors.to) {
        setErrors((prev) => ({ ...prev, to: null }));
      }
    }
  }, [formData.current]); // Depend on formData.current

  const validateForm = () => {
    const newErrors = {};

    if (!formData.school.trim()) {
      newErrors.school = "School/University is required";
      toast.error("School/University is required");
    }

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
      toast.error("Degree is required");
    }

    if (!formData.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = "Field of study is required";
      toast.error("Field of study is required");
    }

    if (!formData.from) {
      newErrors.from = "From Date is required";
      toast.error("From Date is required");
    } else {
      // Basic date format validation if needed (input type="date" handles most)
      if (isNaN(new Date(formData.from))) {
        newErrors.from = "Invalid From Date";
        toast.error("Invalid From Date");
      }
    }

    // If not current education, to date is required and must be after from date
    if (!formData.current) {
      if (!formData.to) {
        newErrors.to = "To Date is required if not currently studying";
        toast.error("To Date is required if not currently studying");
      } else {
        const fromDate = new Date(formData.from);
        const toDate = new Date(formData.to);

        if (isNaN(toDate)) {
          newErrors.to = "Invalid To Date";
          toast.error("Invalid To Date");
        } else if (formData.from && toDate < fromDate) {
          newErrors.to = "'To Date' must be after 'From Date'";
          toast.error("'To Date' must be after 'From Date'");
        }
      }
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
      // Prepare data - ensure dates are sent in a consistent format (e.g., ISO)
      const dataToSend = {
        ...formData,
        from: formData.from ? new Date(formData.from).toISOString() : null,
        to:
          !formData.current && formData.to
            ? new Date(formData.to).toISOString()
            : null,
      };
      // Remove 'to' key if 'current' is true
      if (dataToSend.current) {
        delete dataToSend.to;
      }

      if (editingId) {
        await userService.updateEducation(editingId, dataToSend);
        toast.success("Education updated successfully");
      } else {
        await userService.addEducation(dataToSend);
        toast.success("Education added successfully");
      }

      setParentSubmitting(false);
      resetForm();
      setShowForm(false);
      onUpdate(); // Refresh parent component to refetch profile data
    } catch (error) {
      setParentSubmitting(false);
      toast.error("Failed to save education");
      console.error("Error saving education:", error);
      // Optionally set form errors based on API response if available
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handleEdit = (edu) => {
    // Format dates for input type="date" (YYYY-MM-DD)
    const formattedFrom = edu.from
      ? format(new Date(edu.from), "yyyy-MM-dd")
      : "";
    const formattedTo = edu.to ? format(new Date(edu.to), "yyyy-MM-dd") : "";

    setFormData({
      school: edu.school || "",
      degree: edu.degree || "",
      fieldOfStudy: edu.fieldOfStudy || "",
      from: formattedFrom,
      to: formattedTo,
      current: edu.current || false,
      description: edu.description || "",
    });
    setEditingId(edu._id);
    setShowForm(true);
    // Scroll to form handled by useEffect
  };

  const handleDelete = async (eduId) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      setParentSubmitting(true); // Indicate busy state globally
      try {
        await userService.deleteEducation(eduId);
        toast.success("Education deleted successfully");
        onUpdate(); // Refresh parent component
      } catch (error) {
        toast.error("Failed to delete education");
        console.error("Error deleting education:", error);
      } finally {
        setParentSubmitting(false); // End busy state
      }
    }
  };

  return (
    <div className="education-section">
      <div className="section-header">
        <h3>Education</h3>
        <button
          onClick={() => {
            // Reset form and toggle visibility
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
          className={`add-btn ${showForm ? "cancel" : "add"}`}
          disabled={parentSubmitting} // Disable button while parent is submitting
        >
          {showForm ? "Cancel" : "Add Education"}
        </button>
      </div>

      {showForm && (
        <form
          id="education-form"
          className="education-form"
          onSubmit={handleSubmit}
        >
          <h4>{editingId ? "Update Education" : "Add New Education"}</h4>

          <div className="form-group">
            <label htmlFor="school">
              School/University<span className="required">*</span>
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className={errors.school ? "input-error" : ""}
            />
            {errors.school && (
              <span className="error-message">{errors.school}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="degree">
              Degree<span className="required">*</span>
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className={errors.degree ? "input-error" : ""}
            />
            {errors.degree && (
              <span className="error-message">{errors.degree}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fieldOfStudy">
              Field of Study<span className="required">*</span>
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className={errors.fieldOfStudy ? "input-error" : ""}
            />
            {errors.fieldOfStudy && (
              <span className="error-message">{errors.fieldOfStudy}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">
                From Date<span className="required">*</span>
              </label>
              <input
                type="date"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className={errors.from ? "input-error" : ""}
                max={formData.to || format(new Date(), "yyyy-MM-dd")} // Cannot be after 'to' date or today
              />
              {errors.from && (
                <span className="error-message">{errors.from}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="to">To Date</label>
              <input
                type="date"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                disabled={formData.current}
                className={errors.to ? "input-error" : ""}
                min={formData.from} // Cannot be before 'from' date
                max={format(new Date(), "yyyy-MM-dd")} // Cannot be in the future
              />
              {errors.to && <span className="error-message">{errors.to}</span>}
            </div>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
            />
            <label htmlFor="current">Currently Studying</label>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="cancel-btn"
              disabled={parentSubmitting} // Disable while submitting
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={parentSubmitting}
              className="submit-btn"
            >
              {parentSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : editingId ? (
                "Update Education"
              ) : (
                "Add Education"
              )}{" "}
              {/* More explicit button text */}
            </button>
          </div>
        </form>
      )}

      <div className="education-list">
        {education.length === 0 ? (
          <p className="no-data">No education added yet</p>
        ) : (
          // Sort education by 'from' date descending
          education
            .sort((a, b) => new Date(b.from) - new Date(a.from))
            .map((edu) => (
              <div key={edu._id} className="education-item">
                <div className="education-header">
                  {/* Display degree and field of study as main title */}
                  <h4>{`${edu.degree} in ${edu.fieldOfStudy}`}</h4>
                  <div className="education-actions">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="edit-btn"
                      disabled={parentSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu._id)}
                      className="delete-btn"
                      disabled={parentSubmitting} // Disable while submitting
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* Display school below */}
                <h5 className="school-info">{edu.school}</h5>
                <p className="date-range">
                  {edu.from ? format(new Date(edu.from), "MMM") : "N/A"} -{" "}
                  {/* Formatted date */}
                  {edu.current
                    ? "Present"
                    : edu.to
                    ? format(new Date(edu.to), "MMM")
                    : "N/A"}{" "}
                  {/* Formatted date */}
                </p>
                {edu.description && (
                  <p className="description">{edu.description}</p>
                )}
              </div>
            ))
        )}
      </div>

      <style jsx>{`
        /* Education Section Styling (inherits general styles from parent) */
        .education-section {
          /* Padding handled by parent's tab-content */
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color); /* Use border color variable */
        }

        .section-header h3 {
          font-size: 1.4rem; /* Section title size */
          font-weight: 600;
          color: var(--text-primary); /* Primary text color */
          margin: 0;
        }

        /* Add/Cancel Button Styling (Consistent with ExperienceSection) */
        .add-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent; /* Base transparent border */
        }

        .add-btn.add {
          background-color: var(
            --color-primary-very-light
          ); /* Lightest primary background */
          color: var(--color-primary); /* Primary color text */
          border-color: var(--color-primary-light);
        }

        .add-btn.add:hover:not(:disabled) {
          background-color: var(--color-primary-light);
          color: white;
          border-color: var(--color-primary);
        }

        .add-btn.cancel {
          background-color: transparent; /* Transparent background */
          color: var(--text-secondary); /* Secondary text color */
          border-color: var(--border-color);
        }

        .add-btn.cancel:hover:not(:disabled) {
          background-color: var(--border-color); /* Hover on border color */
          color: var(--text-primary);
        }

        .add-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Dark mode button adjustments */
        .dark .add-btn.add {
          background-color: rgba(
            var(--color-primary, #a855f7),
            0.15
          ); /* Semi-transparent primary */
          color: var(--color-primary-light);
          border-color: rgba(var(--color-primary, #a855f7), 0.3);
        }
        .dark .add-btn.add:hover:not(:disabled) {
          background-color: rgba(var(--color-primary, #a855f7), 0.3);
          color: var(--color-primary);
          border-color: var(--color-primary);
        }
        .dark .add-btn.cancel {
          color: var(--text-secondary);
          border-color: var(--border-color);
        }
        .dark .add-btn.cancel:hover:not(:disabled) {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        /* Education Form Styling (inherits input/label/group from ProfileForm/ExperienceSection) */
        .education-form {
          padding: 1.5rem; /* Padding around the form */
          margin-bottom: 2rem; /* Space below form */
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(
            --bg-main
          ); /* Use main background for forms within card */
          box-shadow: var(--shadow-subtle);
        }

        .dark .education-form {
          background-color: var(
            --bg-card
          ); /* Use card background for forms in dark mode */
        }

        .education-form h4 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .required {
          color: #e53e3e; /* Red for required indicator */
          margin-left: 4px;
        }

        .form-group {
          margin-bottom: 1.5rem; /* Consistent margin */
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

        .form-row {
          display: flex;
          gap: 1.5rem; /* Gap between items in a row */
        }

        .form-row .form-group {
          flex: 1; /* Each group takes equal space */
          margin-bottom: 1.5rem; /* Ensure bottom margin is consistent */
        }

        .form-group.checkbox {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .form-group.checkbox input[type="checkbox"] {
          width: auto; /* Auto width for checkbox */
          margin-right: 0.5rem;
          box-shadow: none; /* Remove inner shadow */
          border-color: var(--border-color);
          /* Custom checkbox styling if needed */
        }

        .form-group.checkbox input[type="checkbox"]:checked {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .form-group.checkbox label {
          margin-bottom: 0; /* Remove bottom margin */
          font-weight: 500;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end; /* Align buttons to the right */
          gap: 1rem; /* Gap between buttons */
          margin-top: 2rem; /* Space above buttons */
        }

        .form-actions .submit-btn {
          /* Inherits most styles from the .submit-btn defined implicitly via ProfileForm CSS */
          min-width: 120px; /* Smaller min-width for form buttons */
        }

        /* Cancel Button (Consistent with ExperienceSection) */
        .cancel-btn {
          padding: 0.8rem 1.5rem;
          background: transparent; /* Transparent background */
          color: var(--text-secondary); /* Secondary text color */
          border: 1px solid var(--border-color); /* Border color */
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover:not(:disabled) {
          background-color: var(--border-color); /* Hover on border color */
          color: var(--text-primary);
        }

        .cancel-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Dark mode cancel button */
        .dark .cancel-btn {
          color: var(--text-secondary);
          border-color: var(--border-color);
        }
        .dark .cancel-btn:hover:not(:disabled) {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        /* Education List Styling */
        .education-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; /* Gap between education items */
        }

        .education-item {
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(
            --bg-main
          ); /* Use main background for list items */
          box-shadow: var(--shadow-subtle);
          transition: all 0.2s ease;
        }

        .dark .education-item {
          background-color: var(
            --bg-card
          ); /* Use card background for list items in dark mode */
        }

        .education-item:hover {
          box-shadow: var(--shadow-md); /* Slightly stronger shadow on hover */
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .education-header h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-primary); /* Primary color for school/degree */
        }

        .education-actions {
          display: flex;
          gap: 0.75rem; /* Gap between action buttons */
        }

        /* Edit/Delete Button Styling (Consistent with ExperienceSection) */
        .edit-btn,
        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0; /* Remove default button padding */
          transition: color 0.2s ease;
          font-weight: 500;
        }

        .edit-btn {
          color: var(--text-secondary); /* Secondary text color for Edit */
        }
        .edit-btn:hover:not(:disabled) {
          color: var(--color-primary); /* Primary color on hover */
        }

        .delete-btn {
          color: #e53e3e; /* Red for Delete */
        }
        .delete-btn:hover:not(:disabled) {
          color: #c53030; /* Darker red on hover */
        }

        .edit-btn:disabled,
        .delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .school-info {
          /* Class name changed for clarity */
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .date-range {
          font-size: 0.9rem;
          color: var(--text-secondary); /* Secondary text color */
          margin: 0 0 1rem 0;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-primary);
          margin: 0;
          opacity: 0.9;
        }

        .no-data {
          text-align: center;
          color: var(--text-secondary); /* Secondary text color */
          font-style: italic;
          margin-top: 2rem;
        }

        /* Re-define spinner styles locally if they are used in this component's buttons */
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

        /* Responsive Adjustments (Consistent with ExperienceSection) */
        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 1.5rem;
          }

          .section-header h3 {
            margin-bottom: 1rem;
          }

          .form-row {
            flex-direction: column; /* Stack date inputs */
            gap: 1rem;
          }

          .form-row .form-group {
            margin-bottom: 0.5rem; /* Adjust margin when stacked */
          }

          .education-item {
            padding: 1rem;
          }

          .education-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 0.5rem;
          }

          .education-actions {
            margin-top: 0.5rem; /* Space above action buttons */
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .section-header h3 {
            font-size: 1.2rem;
          }
          .add-btn {
            font-size: 0.85rem;
            padding: 0.4rem 0.8rem;
          }
          .education-form {
            padding: 1rem;
          }
          .education-form h4 {
            font-size: 1.1rem;
          }
          label {
            font-size: 0.9rem;
          }
          input,
          textarea {
            font-size: 0.9rem;
            padding: 0.6rem 0.8rem;
          }
          .form-actions {
            flex-direction: column; /* Stack form action buttons */
            gap: 0.5rem;
          }
          .cancel-btn,
          .submit-btn {
            width: 100%;
            text-align: center;
            justify-content: center;
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
          .education-item {
            padding: 0.8rem;
          }
          .education-header h4 {
            font-size: 1rem;
          }
          .school-info,
          .date-range,
          .description {
            font-size: 0.85rem;
          }
          .edit-btn,
          .delete-btn {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EducationSection;
