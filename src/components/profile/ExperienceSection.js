// src/components/profile/ExperienceSection.jsx
import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import format from "date-fns/format";

const ExperienceSection = ({
  experiences = [],
  onUpdate,
  theme,
  color,
  setSubmitting: setParentSubmitting,
  submitting: parentSubmitting,
}) => {
  // Define primary color based on the color prop (same as ProfileForm)
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  // Create CSS variables for consistent styling (same as ProfileForm)
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
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showForm && editingId) {
      const timer = setTimeout(() => {
        const formElement = document.getElementById("experience-form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showForm, editingId]);

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
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

    if (name === "current" && checked) {
      setFormData({
        ...formData,
        [name]: checked,
        to: "",
      });
      if (errors.to) {
        setErrors({ ...errors, to: null });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  useEffect(() => {
    if (formData.current && formData.to !== "") {
      setFormData((prev) => ({ ...prev, to: "" }));
      if (errors.to) {
        setErrors((prev) => ({ ...prev, to: null }));
      }
    }
  }, [formData.current, formData.to, errors.to]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Job Title is required";
      toast.error("Job Title is required");
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
      toast.error("Company is required");
    }

    if (!formData.from) {
      newErrors.from = "From Date is required";
      toast.error("From Date is required");
    } else if (isNaN(new Date(formData.from))) {
      newErrors.from = "Invalid From Date";
      toast.error("Invalid From Date");
    }

    if (!formData.current) {
      if (!formData.to) {
        newErrors.to = "To Date is required if not current job";
        toast.error("To Date is required if not current job");
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
    if (!validateForm()) return;

    setParentSubmitting(true);
    try {
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
        await userService.updateExperience(editingId, dataToSend);
        toast.success("Experience updated successfully");
      } else {
        await userService.addExperience(dataToSend);
        toast.success("Experience added successfully");
      }

      setParentSubmitting(false);
      resetForm();
      setShowForm(false);
      onUpdate();
    } catch (error) {
      setParentSubmitting(false);
      toast.error("Failed to save experience");
      console.error("Error saving experience:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handleEdit = (exp) => {
    const formattedFrom = exp.from
      ? format(new Date(exp.from), "yyyy-MM-dd")
      : "";
    const formattedTo = exp.to ? format(new Date(exp.to), "yyyy-MM-dd") : "";

    setFormData({
      title: exp.title || "",
      company: exp.company || "",
      location: exp.location || "",
      from: formattedFrom,
      to: formattedTo,
      current: exp.current || false,
      description: exp.description || "",
    });
    setEditingId(exp._id);
    setShowForm(true);
  };

  const handleDelete = async (expId) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      setParentSubmitting(true);
      try {
        await userService.deleteExperience(expId);
        toast.success("Experience deleted successfully");
        onUpdate();
      } catch (error) {
        toast.error("Failed to delete experience");
        console.error("Error deleting experience:", error);
      } finally {
        setParentSubmitting(false);
      }
    }
  };

  return (
    <div className={`experience-section ${theme}`} style={cssVars}>
      <h2 className="section-title">Work Experience</h2>

      <div className="section-header-controls">
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
          className={`add-btn ${showForm ? "cancel" : "add"}`}
          disabled={parentSubmitting}
          style={{ backgroundColor: showForm ? "transparent" : primaryColor }}
        >
          {showForm ? "Cancel" : "Add Experience"}
        </button>
      </div>

      {showForm && (
        <form
          id="experience-form"
          className="experience-form"
          onSubmit={handleSubmit}
        >
          <h3 className="form-section-title">
            {editingId ? "Update Experience" : "Add New Experience"}
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">
                Job Title<span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "input-error" : ""}
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="company">
                Company<span className="required">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={errors.company ? "input-error" : ""}
              />
              {errors.company && (
                <span className="error-message">{errors.company}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

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
                max={formData.to || format(new Date(), "yyyy-MM-dd")}
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
                min={formData.from}
                max={format(new Date(), "yyyy-MM-dd")}
              />
              {errors.to && <span className="error-message">{errors.to}</span>}
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
              />
              <label htmlFor="current">Current Job</label>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="button-container">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="cancel-btn"
              disabled={parentSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={parentSubmitting}
              className="submit-btn"
              style={{ backgroundColor: primaryColor }}
            >
              {parentSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : editingId ? (
                "Update Experience"
              ) : (
                "Add Experience"
              )}
            </button>
          </div>
        </form>
      )}

      <div className="experience-list">
        {experiences.length === 0 ? (
          <p className="no-data">No work experience added yet</p>
        ) : (
          experiences
            .sort((a, b) => new Date(b.from) - new Date(a.from))
            .map((exp) => (
              <div key={exp._id} className="experience-item">
                <div className="item-header">
                  <h4 className="item-title">{exp.title}</h4>
                  <div className="item-actions">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="edit-btn"
                      disabled={parentSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="delete-btn"
                      disabled={parentSubmitting}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <h5 className="item-subtitle">
                  {exp.company}
                  {exp.location ? ` - ${exp.location}` : ""}
                </h5>
                <p className="item-meta">
                  {exp.from ? format(new Date(exp.from), "MMM yyyy") : "N/A"} -{" "}
                  {exp.current
                    ? "Present"
                    : exp.to
                    ? format(new Date(exp.to), "MMM yyyy")
                    : "N/A"}
                </p>
                {exp.description && (
                  <p className="item-description">{exp.description}</p>
                )}
              </div>
            ))
        )}
      </div>

      <style jsx>{`
        .experience-section {
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

        .section-header-controls {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.5rem;
        }

        .add-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.5rem;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
          box-shadow: var(--shadow-sm);
        }

        .add-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .add-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .add-btn.cancel {
          background-color: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .add-btn.cancel:hover:not(:disabled) {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .experience-form {
          padding: 1.5rem;
          margin-bottom: 2rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-card);
          box-shadow: var(--shadow-sm);
        }

        .form-section-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group.checkbox-group {
          grid-column: 1 / -1; /* Full width for checkbox */
          display: flex;
          align-items: center;
        }

        .form-group.checkbox-group input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
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
          gap: 1rem;
          justify-content: flex-end;
        }

        .submit-btn,
        .cancel-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 2rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
          box-shadow: var(--shadow-md);
          border: none;
        }

        .submit-btn {
          color: white;
          background-color: var(--color-primary);
        }

        .submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 10px
            ${theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.15)"};
        }

        .cancel-btn {
          background-color: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .cancel-btn:hover:not(:disabled) {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .submit-btn:disabled,
        .cancel-btn:disabled {
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

        .dark .spinner {
          border-color: rgba(var(--text-primary), 0.3);
          border-top-color: var(--text-primary);
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .experience-item {
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-card);
          box-shadow: var(--shadow-sm);
          display: grid;
          grid-template-columns: 1fr auto; /* Title on left, actions on right */
          grid-template-rows: auto auto auto auto;
          gap: 0.5rem;
          align-items: start;
        }

        .item-header {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .item-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-primary);
        }

        .item-actions {
          display: flex;
          gap: 0.75rem;
        }

        .edit-btn,
        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0;
          transition: color 0.2s ease;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .edit-btn:hover:not(:disabled) {
          color: var(--color-primary);
        }

        .delete-btn {
          color: #e53e3e;
        }

        .delete-btn:hover:not(:disabled) {
          color: #c53030;
        }

        .item-subtitle {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
          color: var(--text-primary);
        }

        .item-meta {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .item-description {
          grid-column: 1 / -1;
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-primary);
          margin-top: 0.5rem;
        }

        .no-data {
          text-align: center;
          color: var(--text-secondary);
          font-style: italic;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .tab-content {
            width: 340px;
          }
          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .experience-item {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto auto auto;
          }

          .item-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 0.25rem;
          }

          .item-actions {
            margin-top: 0.5rem;
          }

          .section-header-controls {
            margin-bottom: 1rem;
          }

          .add-btn {
            width: 100%;
          }

          .button-container {
            flex-direction: column;
            gap: 0.5rem;
          }

          .submit-btn,
          .cancel-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .tab-content {
            width: 100%;
          }
          .section-title {
            font-size: 1.3rem;
          }

          .form-section-title {
            font-size: 1.1rem;
          }

          label {
            font-size: 0.9rem;
          }

          input,
          textarea {
            padding: 0.7rem 0.9rem;
            font-size: 0.95rem;
          }

          .item-title {
            font-size: 1rem;
          }

          .item-subtitle,
          .item-meta,
          .item-description {
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

export default ExperienceSection;
