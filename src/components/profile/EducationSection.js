import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import format from "date-fns/format";

const EducationSection = ({
  education = [],
  onUpdate,
  theme,
  color,
  setSubmitting: setParentSubmitting,
  submitting: parentSubmitting,
}) => {
  // Define primary color based on the color prop, same as ProfileForm
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  // Create CSS variables for consistent styling, matching ProfileForm
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
  };

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

  // Effect to handle scrolling when form is shown for editing
  useEffect(() => {
    if (showForm && editingId) {
      const timer = setTimeout(() => {
        const formElement = document.getElementById("education-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showForm, editingId]);

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

    // Clear error for this field as user types, like in ProfileForm
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
  }, [formData.current]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation, with toast notifications like in ProfileForm
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
      // Basic date format validation
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

    setParentSubmitting(true);
    try {
      // Prepare data - ensure dates are sent in a consistent format
      const dataToSend = {
        ...formData,
        from: formData.from ? new Date(formData.from).toISOString() : null,
        to:
          !formData.current && formData.to
            ? new Date(formData.to).toISOString()
            : null,
      };

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
      onUpdate(); // Refresh parent component
    } catch (error) {
      setParentSubmitting(false);
      toast.error("Failed to save education");
      console.error("Error saving education:", error);

      // Set form errors based on API response if available
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
  };

  const handleDelete = async (eduId) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      setParentSubmitting(true);
      try {
        await userService.deleteEducation(eduId);
        toast.success("Education deleted successfully");
        onUpdate();
      } catch (error) {
        toast.error("Failed to delete education");
        console.error("Error deleting education:", error);
      } finally {
        setParentSubmitting(false);
      }
    }
  };

  return (
    <div className="education-section" style={cssVars}>
      <h2 className="section-title">Education</h2>

      <div className="section-header">
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
          className="action-btn"
          disabled={parentSubmitting}
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
          <h3>{editingId ? "Update Education" : "Add New Education"}</h3>

          <div className="form-grid">
            {/* School/University field */}
            <div className="form-group">
              <label htmlFor="school">School/University</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className={errors.school ? "input-error" : ""}
                placeholder="Enter your school or university"
              />
              {errors.school && (
                <span className="error-message">{errors.school}</span>
              )}
            </div>

            {/* Degree field */}
            <div className="form-group">
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className={errors.degree ? "input-error" : ""}
                placeholder="Bachelor's, Master's, PhD, etc."
              />
              {errors.degree && (
                <span className="error-message">{errors.degree}</span>
              )}
            </div>

            {/* Field of Study */}
            <div className="form-group">
              <label htmlFor="fieldOfStudy">Field of Study</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className={errors.fieldOfStudy ? "input-error" : ""}
                placeholder="Computer Science, Business, etc."
              />
              {errors.fieldOfStudy && (
                <span className="error-message">{errors.fieldOfStudy}</span>
              )}
            </div>

            {/* From Date */}
            <div className="form-group">
              <label htmlFor="from">From Date</label>
              <input
                type="date"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className={errors.from ? "input-error" : ""}
                max={formData.to || format(new Date(), "yyyy-MM-dd")}
              />
              {errors.from && (
                <span className="error-message">{errors.from}</span>
              )}
            </div>

            {/* To Date */}
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
                min={formData.from}
                max={format(new Date(), "yyyy-MM-dd")}
              />
              {errors.to && <span className="error-message">{errors.to}</span>}
            </div>

            {/* Currently Studying checkbox */}
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
              />
              <label htmlFor="current">Currently Studying</label>
            </div>
          </div>

          {/* Description field (full width) */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Add details about your education, achievements, etc."
            />
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
                  {editingId ? "Updating..." : "Adding..."}
                </>
              ) : editingId ? (
                "Update Education"
              ) : (
                "Add Education"
              )}
            </button>
          </div>
        </form>
      )}

      <div className="education-list">
        {education.length === 0 ? (
          <p className="no-data">
            No education entries yet. Add your educational background.
          </p>
        ) : (
          education
            .sort((a, b) => new Date(b.from) - new Date(a.from))
            .map((edu) => (
              <div key={edu._id} className="education-item">
                <div className="education-header">
                  <div className="education-title">
                    <h4>{`${edu.degree} in ${edu.fieldOfStudy}`}</h4>
                    <h5>{edu.school}</h5>
                    <p className="date-range">
                      {edu.from ? format(new Date(edu.from), "MMM yyyy") : ""} -{" "}
                      {edu.current
                        ? "Present"
                        : edu.to
                        ? format(new Date(edu.to), "MMM yyyy")
                        : ""}
                    </p>
                  </div>
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
                      disabled={parentSubmitting}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {edu.description && (
                  <p className="description">{edu.description}</p>
                )}
              </div>
            ))
        )}
      </div>

      <style jsx>{`
        .education-section {
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--border-color);
          color: var(--text-primary);
        }

        .section-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.5rem;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.2rem;
          color: var(--color-primary);
          background-color: var(--color-primary-very-light);
          border: 1px solid var(--color-primary-light);
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover:not(:disabled) {
          background-color: var(--color-primary-light);
          color: white;
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .education-form {
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-card);
          box-shadow: var(--shadow-sm);
        }

        .education-form h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1.5rem;
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

        .checkbox-group {
          display: flex;
          align-items: center;
          margin-top: 1.8rem;
        }

        .checkbox-group input {
          width: auto;
          margin-right: 0.5rem;
        }

        .checkbox-group label {
          margin-bottom: 0;
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

        .education-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .education-item {
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-card);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .education-item:hover {
          box-shadow: var(--shadow-md);
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .education-title h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.4rem 0;
          color: var(--color-primary);
        }

        .education-title h5 {
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.4rem 0;
          color: var(--text-primary);
        }

        .date-range {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-primary);
          margin: 0.5rem 0 0 0;
        }

        .education-actions {
          display: flex;
          gap: 1rem;
        }

        .edit-btn,
        .delete-btn {
          background: none;
          border: none;
          padding: 0.3rem 0.6rem;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-btn {
          color: var(--color-primary);
        }

        .edit-btn:hover:not(:disabled) {
          background-color: var(--color-primary-very-light);
        }

        .delete-btn {
          color: #e53e3e;
        }

        .delete-btn:hover:not(:disabled) {
          background-color: rgba(229, 62, 62, 0.1);
        }

        .edit-btn:disabled,
        .delete-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .no-data {
          text-align: center;
          color: var(--text-secondary);
          font-style: italic;
          padding: 2rem 0;
          border: 1px dashed var(--border-color);
          border-radius: 8px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .education-header {
            flex-direction: column;
          }

          .education-actions {
            margin-top: 1rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.3rem;
          }

          .education-form {
            padding: 1rem;
          }

          label {
            font-size: 0.9rem;
          }

          input,
          textarea {
            padding: 0.7rem 0.9rem;
            font-size: 0.95rem;
          }

          .error-message {
            font-size: 0.8rem;
          }

          .submit-btn {
            padding: 0.7rem 1.5rem;
            font-size: 0.95rem;
            min-width: auto;
            width: 100%;
          }

          .education-item {
            padding: 1rem;
          }

          .education-title h4 {
            font-size: 1rem;
          }

          .education-title h5 {
            font-size: 0.9rem;
          }

          .date-range,
          .description {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EducationSection;
