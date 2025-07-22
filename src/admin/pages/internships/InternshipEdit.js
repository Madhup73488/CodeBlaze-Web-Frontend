import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiX, FiArrowLeft } from "react-icons/fi";
import { useAdmin } from "../../contexts/AdminContext";
import {
  fetchAdminInternshipById,
  updateInternshipAdmin, // Ensure this is implemented correctly in api.js
} from "../../utils/api";
import { validateInternshipForm } from "../../utils/validation"; // Ensure this validation function handles startDate, isPaid, and deadline

const InternshipEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form State - ADDED startDate and isPaid to match backend schema requirements
  const [formValues, setFormValues] = useState({
    title: "",
    company: "",
    companyLogo: "",
    location: "",
    workType: "onsite",
    description: "",
    responsibilities: "",
    requirements: "",
    duration: "",
    internshipFee: {
      amount: "",
      currency: "USD",
    },
    benefits: "",
    skills: "",
    educationLevel: "none",
    // Renamed applicationDeadline to deadline in form state to match backend error,
    // but kept 'applicationDeadline' as a conceptual label/id for clarity in JSX
    // If backend uses 'applicationDeadline' exactly, revert the state key name.
    deadline: "", // <-- Changed from applicationDeadline based on error message 'deadline is required'
    startDate: "", // <-- ADDED based on backend error 'Start date is required'
    isPaid: false, // <-- ADDED based on backend error 'isPaid is required'
    featured: false,
    isActive: true,
  });

  const [formErrors, setFormErrors] = useState({});

  // Load internship data
  useEffect(() => {
    const loadInternship = async () => {
      console.log(
        `[InternshipEdit] Attempting to fetch internship data for ID: ${id}`
      );
      try {
        setLoading(true);
        setError(null);

        const response = await fetchAdminInternshipById(id); // Expected to return { success: true, data: { ... } }

        console.log("[InternshipEdit] Full API response received:", response);
        console.log(
          "[InternshipEdit] Data property from response:",
          response?.data
        ); // Log the data property specifically

        // Check if response is truthy AND if the 'data' property is truthy
        if (response && response.data) {
          const internshipData = response.data;

          console.log(
            "[InternshipEdit] Data extracted for mapping:",
            internshipData
          ); // Log the object used for mapping

          // Format data for form fields - MAPPING ADDED startDate, isPaid, and used 'deadline'
          const mappedData = {
            title: internshipData.title || "",
            company: internshipData.company || "",
            companyLogo: internshipData.companyLogo || "",
            location: internshipData.location || "",
            workType: internshipData.workType || "onsite",
            description: internshipData.description || "",
            responsibilities: Array.isArray(internshipData.responsibilities)
              ? internshipData.responsibilities.join("\n")
              : internshipData.responsibilities || "",
            requirements: Array.isArray(internshipData.requirements)
              ? internshipData.requirements.join("\n")
              : internshipData.requirements || "",
            duration: internshipData.duration || "",
            internshipFee: {
              amount: internshipData.internshipFee?.amount?.toString() || "",
              currency: internshipData.internshipFee?.currency || "USD",
            },
            benefits: Array.isArray(internshipData.benefits)
              ? internshipData.benefits.join("\n")
              : internshipData.benefits || "",
            skills: Array.isArray(internshipData.skills)
              ? internshipData.skills.join(", ")
              : internshipData.skills || "",
            educationLevel: internshipData.educationLevel || "none",
            // Map the deadline field from API, format ISO string to YYYY-MM-DD for date input
            deadline: internshipData.applicationDeadline // <-- Mapping backend's applicationDeadline to frontend 'deadline'
              ? new Date(internshipData.applicationDeadline)
                  .toISOString()
                  .split("T")[0]
              : "",
            // Map startDate from API response, format YYYY-MM-DD
            startDate: internshipData.startDate // <-- ADDED MAPPING for startDate
              ? new Date(internshipData.startDate).toISOString().split("T")[0]
              : "",
            // Map isPaid from API response, ensure boolean format
            isPaid: Boolean(internshipData.isPaid), // <-- ADDED MAPPING for isPaid
            featured: Boolean(internshipData.featured),
            isActive: Boolean(internshipData.isActive),
          };

          console.log(
            "[InternshipEdit] Mapped data for form state:",
            mappedData
          );
          setFormValues(mappedData); // Set the form state
          console.log("[InternshipEdit] setFormValues called.");
        } else {
          console.error(
            "[InternshipEdit] API response successful but 'data' property is missing or falsy:",
            response
          );
          setError(
            "Failed to load internship data: Invalid response structure or empty data property."
          );
        }
      } catch (error) {
        console.error("[InternshipEdit] Error loading internship:", error);
        const userErrorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to load internship details. Please try again.";
        setError(userErrorMessage);
      } finally {
        setLoading(false);
        console.log("[InternshipEdit] Loading finished.");
      }
    };

    if (id) {
      loadInternship();
    }
  }, [id]); // Effect depends on 'id'.

  // Monitor formValues state changes (optional, but helpful for debugging)
  useEffect(() => {
    console.log("[InternshipEdit] formValues state is currently:", formValues);
  }, [formValues]); // This effect runs whenever formValues changes

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Handle nested property (like internshipFee.amount)
      const [parent, child] = name.split(".");
      setFormValues((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      // Handle normal property
      setFormValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Validate form - Ensure this function validates 'startDate', 'isPaid', and 'deadline'
  const validateForm = () => {
    const errors = validateInternshipForm(formValues); // Pass the state with new fields
    setFormErrors(errors || {});
    return Object.keys(errors || {}).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default browser form submission

    // Validate frontend form
    const isValid = validateForm();
    if (!isValid) {
      console.log(
        "[InternshipEdit] Frontend form validation failed with errors:",
        formErrors
      );
      // The formErrors state is set by validateForm, so the error messages should appear next to the inputs
      return; // Stop submission if frontend validation fails
    }

    try {
      setSaving(true);
      setError(null);

      // Format data for API payload - Ensure field names match backend expectations
      const apiPayload = {
        ...formValues, // Start with current form values including startDate, isPaid, deadline
        // The following overrides / formats values from formValues

        // Ensure lists (responsibilities, requirements, benefits, skills) are arrays
        responsibilities: formValues.responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        requirements: formValues.requirements
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        benefits: formValues.benefits
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
        skills: formValues.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),

        // Ensure internshipFee amount is a number or null/undefined
        internshipFee: {
          ...formValues.internshipFee,
          amount:
            formValues.internshipFee.amount !== ""
              ? parseFloat(formValues.internshipFee.amount)
              : undefined, // Or null, depending on backend
        },

        // Format date fields as ISO strings for the backend
        deadline: formValues.deadline // <-- Use 'deadline' from formValues state
          ? new Date(formValues.deadline).toISOString()
          : undefined, // Or null, if backend prefers null for empty date

        startDate: formValues.startDate // <-- Use 'startDate' from formValues state
          ? new Date(formValues.startDate).toISOString()
          : undefined, // Or null

        isPaid: Boolean(formValues.isPaid), // Ensure boolean format for isPaid

        // Ensure other booleans are explicitly cast if necessary
        isActive: Boolean(formValues.isActive),
        featured: Boolean(formValues.featured),

        // Remove any formValues fields that the backend should NOT receive
        // Fields like _id, __v, createdAt, updatedAt, views, etc., should generally NOT be sent back.
        // Add specific exclusions here if your backend doesn't ignore extra fields.
        // Example:
        // _id: undefined,
        // __v: undefined,
        // createdAt: undefined,
        // updatedAt: undefined,
        // views: undefined,
        // applicationsCount: undefined,
        // postedBy: undefined,
        // slug: undefined
      };

      console.log("[InternshipEdit] API Payload being sent:", apiPayload); // <-- Log the payload

      // Make the API call
      const response = await updateInternshipAdmin(id, apiPayload);
      console.log("[InternshipEdit] Update API response:", response);

      // Assuming updateInternshipAdmin throws an error on non-success, or returns a response object
      // If it throws on error, the catch block handles non-success.
      // If it returns an object like { success: boolean, ... }, check response.success
      if (response && response.success) {
        // Adjust this check based on your updateInternshipAdmin implementation
        console.log(
          "[InternshipEdit] Update successful, navigating to detail page"
        );
        navigate(`/admin/internships/${id}`); // Navigate on success
      } else {
        // Handle cases where apiRequest didn't throw but the response indicates failure
        // error.data (from apiRequest) might contain backend validation messages
        const backendErrorMessages =
          error?.data?.message || JSON.stringify(error?.data);
        setError(
          response?.message ||
            `Update failed: ${backendErrorMessages || "Unknown error"}`
        );
        console.error(
          "[InternshipEdit] Update failed with response:",
          response
        );
      }
    } catch (error) {
      console.error("[InternshipEdit] Error updating internship:", error);
      // Check if the error is the validation error from the backend (status 400 likely)
      if (error.response?.status === 400 && error.data) {
        console.log(
          "[InternshipEdit] Backend Validation Errors Data:",
          error.data
        );
        // Optionally, set backend errors to formErrors state to display next to fields
        // This requires matching the error keys (startDate, isPaid, deadline) to your form state keys
        // setFormErrors(prevErrors => ({ ...prevErrors, ...error.data }));
        // Display a user-friendly message including backend details if available
        const backendErrorMessage =
          error.data.message || JSON.stringify(error.data);
        setError(`Validation failed: ${backendErrorMessage}`); // Display backend error details to the user
      } else {
        // Handle other types of errors (network, server errors > 400)
        const userErrorMessage =
          error.response?.data?.message ||
          error.message ||
          "An error occurred while saving. Please try again.";
        setError(userErrorMessage);
      }
    } finally {
      setSaving(false);
      console.log("[InternshipEdit] Save process finished.");
    }
  };

  // Form Options (These remain the same)
  const workTypeOptions = [
    { value: "onsite", label: "Onsite" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const educationLevelOptions = [
    { value: "none", label: "None" },
    { value: "high-school", label: "High School" },
    { value: "associate", label: "Associate's Degree" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "INR", label: "INR" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "CAD", label: "CAD" },
    { value: "AUD", label: "AUD" },
  ];

  // Loading state JSX (Remains the same)
  if (loading) {
    return (
      <div className={`internship-edit-container ${theme}`}>
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading internship details...</p>
        </div>
        {/* ... styles ... */}
        <style jsx>{`
          .internship-edit-container {
            min-height: 100vh;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .internship-edit-container.light {
            background-color: #f9fafb;
            color: #111827;
          }

          .internship-edit-container.dark {
            background-color: #1f2937;
            color: #f9fafb;
          }

          .loading-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #4f46e5;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Main form JSX
  return (
    <div className={`internship-edit-container ${theme}`}>
      <div className="edit-header">
        <div className="back-title">
          <button
            onClick={() => navigate(`/admin/internships/${id}`)}
            className="back-button"
            aria-label="Back to internship details"
            type="button"
          >
            <FiArrowLeft />
          </button>
          <h1>Edit Internship</h1>
        </div>
        <div className="actions">
          <button
            type="button" // Keep this as button for cancel
            onClick={() => navigate(`/admin/internships/${id}/detail`)}
            className="cancel-button"
          >
            <FiX />
            <span className="button-text">Cancel</span>
          </button>
          {/* Save button in header - link to form by ID */}
          <button
            type="submit" // Corrected type to submit
            disabled={saving}
            className="save-button"
            form="edit-internship-form" // Link to the form by ID
          >
            <FiSave />
            <span className="button-text">
              {saving ? "Saving..." : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Main Form - Added ID to link header button */}
      <form onSubmit={handleSubmit} noValidate id="edit-internship-form">
        {/* Basic Information Section (Remains the same) */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">
                Internship Title<span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                required
              />
              {formErrors.title && (
                <p className="field-error">{formErrors.title}</p>
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
                value={formValues.company}
                onChange={handleChange}
                required
              />
              {formErrors.company && (
                <p className="field-error">{formErrors.company}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="companyLogo">Company Logo URL</label>
              <input
                type="url"
                id="companyLogo"
                name="companyLogo"
                value={formValues.companyLogo}
                onChange={handleChange}
              />
              {formErrors.companyLogo && (
                <p className="field-error">{formErrors.companyLogo}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="location">
                Location<span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                required
              />
              {formErrors.location && (
                <p className="field-error">{formErrors.location}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="workType">
                Work Type<span className="required">*</span>
              </label>
              <select
                id="workType"
                name="workType"
                value={formValues.workType}
                onChange={handleChange}
                required
              >
                {workTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors.workType && (
                <p className="field-error">{formErrors.workType}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="duration">
                Duration<span className="required">*</span>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formValues.duration}
                onChange={handleChange}
                placeholder="e.g., 3 months"
                required
              />
              {formErrors.duration && (
                <p className="field-error">{formErrors.duration}</p>
              )}
            </div>
          </div>
        </div>

        {/* Dates & Payment Section - ADDED startDate and isPaid fields */}
        <div className="form-section">
          <h2>Dates & Payment</h2>
          <div className="form-grid">
            <div className="form-group">
              {/* Used 'deadline' matching backend error, but label matches user's previous 'applicationDeadline' */}
              <label htmlFor="deadline">
                Application Deadline<span className="required">*</span>
              </label>
              <input
                type="date"
                id="deadline" // <-- Use 'deadline' as ID/Name to match state/payload
                name="deadline" // <-- Use 'deadline' as ID/Name to match state/payload
                value={formValues.deadline}
                onChange={handleChange}
                required // Add required based on backend validation error
              />
              {formErrors.deadline && ( // Check formErrors.deadline
                <p className="field-error">{formErrors.deadline}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="startDate">
                Start Date<span className="required">*</span>
              </label>{" "}
              {/* Added required based on backend error */}
              <input
                type="date"
                id="startDate"
                name="startDate" // Use 'startDate' as ID/Name
                value={formValues.startDate}
                onChange={handleChange}
                required // Add required based on backend validation error
              />
              {formErrors.startDate && ( // Check formErrors.startDate
                <p className="field-error">{formErrors.startDate}</p>
              )}
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="isPaid"
                name="isPaid" // Use 'isPaid' as ID/Name
                checked={formValues.isPaid}
                onChange={handleChange}
                // Checkboxes are tricky for standard HTML 'required'.
                // Frontend validation (validateInternshipForm) should handle if it's required.
              />
              <label htmlFor="isPaid">Is Paid Internship?</label>
              {formErrors.isPaid && ( // Check formErrors.isPaid
                <p className="field-error">{formErrors.isPaid}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="internshipFeeAmount">Amount</label>
              <input
                type="number"
                id="internshipFeeAmount"
                name="internshipFee.amount"
                value={formValues.internshipFee.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                // Not marked as required as fee amount might only be required if isPaid is true
              />
              {formErrors["internshipFee.amount"] && (
                <p className="field-error">
                  {formErrors["internshipFee.amount"]}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="internshipFeeCurrency">Currency</label>
              <select
                id="internshipFeeCurrency"
                name="internshipFee.currency"
                value={formValues.internshipFee.currency}
                onChange={handleChange}
                // Not marked as required
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors["internshipFee.currency"] && (
                <p className="field-error">
                  {formErrors["internshipFee.currency"]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description Section (Remains the same) */}
        <div className="form-section">
          <h2>Details</h2>
          <div className="form-group full-width">
            <label htmlFor="description">
              Description<span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
            {formErrors.description && (
              <p className="field-error">{formErrors.description}</p>
            )}
          </div>
          <div className="form-group full-width">
            <label htmlFor="responsibilities">
              Responsibilities<span className="required">*</span>
            </label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formValues.responsibilities}
              onChange={handleChange}
              rows={5}
              placeholder="Enter one responsibility per line"
              required
            ></textarea>
            {formErrors.responsibilities && (
              <p className="field-error">{formErrors.responsibilities}</p>
            )}
          </div>
          <div className="form-group full-width">
            <label htmlFor="requirements">
              Requirements<span className="required">*</span>
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formValues.requirements}
              onChange={handleChange}
              rows={5}
              placeholder="Enter one requirement per line"
              required
            ></textarea>
            {formErrors.requirements && (
              <p className="field-error">{formErrors.requirements}</p>
            )}
          </div>
          <div className="form-group full-width">
            <label htmlFor="benefits">Benefits</label>
            <textarea
              id="benefits"
              name="benefits"
              value={formValues.benefits}
              onChange={handleChange}
              rows={3}
              placeholder="Enter one benefit per line"
            ></textarea>
            {formErrors.benefits && (
              <p className="field-error">{formErrors.benefits}</p>
            )}
          </div>
        </div>

        {/* Skills & Education Section (Skills input remains, EducationLevel added to grid) */}
        <div className="form-section">
          <h2>Skills & Education Level</h2>
          <div className="form-grid">
            <div className="form-group">
              {" "}
              {/* Skills remains in its own grid cell */}
              <label htmlFor="skills">Skills (comma-separated)</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formValues.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js"
              />
              {formErrors.skills && (
                <p className="field-error">{formErrors.skills}</p>
              )}
            </div>
            {/* Education Level moved here to the same grid */}
            <div className="form-group">
              <label htmlFor="educationLevel">Education Level</label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formValues.educationLevel}
                onChange={handleChange}
              >
                {educationLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors.educationLevel && (
                <p className="field-error">{formErrors.educationLevel}</p>
              )}
            </div>
            {/* Application Deadline input is now in the Dates & Payment section */}
          </div>
        </div>

        {/* Status & Visibility Section (Remains the same) */}
        <div className="form-section">
          <h2>Status & Visibility</h2>
          <div className="form-grid">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formValues.isActive}
                onChange={handleChange}
              />
              <label htmlFor="isActive">Active</label>
              {formErrors.isActive && (
                <p className="field-error">{formErrors.isActive}</p>
              )}
            </div>
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formValues.featured}
                onChange={handleChange}
              />
              <label htmlFor="featured">Featured Internship</label>
              {formErrors.featured && (
                <p className="field-error">{formErrors.featured}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions (Buttons at the bottom) - Save button type is submit */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/admin/internships/${id}/detail`)}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" disabled={saving} className="save-button">
            {" "}
            {/* Correct type to submit */}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* JSX Styles (Remains the same) */}
      <style jsx>{`
        .internship-edit-container {
          padding: 2rem;
          background-color: ${theme === "dark" ? "#1a202c" : "#f7fafc"};
        }
        .edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .back-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .back-button {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#e2e8f0" : "#2d3748"};
          font-size: 1.5rem;
          cursor: pointer;
        }
        h1 {
          font-size: 2.25rem;
          font-weight: 800;
          color: ${theme === "dark" ? "#e2e8f0" : "#2d3748"};
        }
        .actions {
          display: flex;
          gap: 1rem;
        }
        .cancel-button, .save-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cancel-button {
          background-color: ${theme === "dark" ? "#4a5568" : "#e2e8f0"};
          color: ${theme === "dark" ? "#e2e8f0" : "#4a5568"};
        }
        .save-button {
          background-color: #4f46e5;
          color: white;
        }
        .form-section {
          background-color: ${theme === "dark" ? "#2d3748" : "#ffffff"};
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .form-group label {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: ${theme === "dark" ? "#cbd5e0" : "#4a5568"};
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid ${theme === "dark" ? "#4a5568" : "#cbd5e0"};
          background-color: ${theme === "dark" ? "#1a202c" : "#f7fafc"};
          color: ${theme === "dark" ? "#e2e8f0" : "#2d3748"};
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default InternshipEdit;
