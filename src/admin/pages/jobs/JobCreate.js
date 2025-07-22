// src/admin/pages/jobs/JobCreate.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiX } from "react-icons/fi";
import { useAdmin } from "../../contexts/AdminContext";
import {
  InputField,
  SelectField,
} from "../../components/common/FormFields";
import api from "../../utils/api"; // Assuming api utility has createJobAdmin
import debounce from "lodash.debounce";
import Toast from "../../../components/common/Toast";

const LOGO_DEV_API_KEY = "sk_MtiQij_oTbi09LZRSFdj5A"; // Replace with your actual key
const LOGO_DEV_API_URL = "https://api.logo.dev/search";

const JobCreate = () => {
  const { theme } = useAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // State structure aligned with the JobSchema
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyLogoUrl: "", // This will store the selected/entered logo URL
    location: "",
    workType: "onsite",
    employmentType: "full-time",
    salary: {
      min: "", // Keep as string initially
      max: "", // Keep as string initially
      currency: "INR",
    },
    applicationUrl: "",
  });

  // State for company name input and logo suggestions
  const [companyNameInput, setCompanyNameInput] = useState(""); // Input for company name/domain for logo search
  const [logoSuggestions, setLogoSuggestions] = useState([]);
  const [showLogoDropdown, setShowLogoDropdown] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Track input focus for dropdown

  // Generic handler for most inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name.startsWith("salary.")) {
      const salaryField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: newValue, // Keep as string for input
        },
      }));
    } else {
      // Do not handle companyNameInput here
      if (name !== "companyNameInput") {
        // If the user directly edits the companyLogoUrl field, update state
        if (name === "companyLogoUrl") {
          setFormData((prev) => ({
            ...prev,
            companyLogoUrl: newValue,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            [name]: newValue,
          }));
        }
      }
    }
  };

  // Handle company name input change
  const handleCompanyNameInputChange = (e) => {
    const { value } = e.target;
    setCompanyNameInput(value);
    setFormData((prev) => ({ ...prev, company: value })); // Also update company in main form data

    if (value.length > 1) {
      debouncedFetchLogo(value);
      setShowLogoDropdown(true); // Show dropdown immediately if typing
    } else {
      setLogoSuggestions([]);
      setShowLogoDropdown(false);
    }
  };

  // Debounced logo search function
  const debouncedFetchLogo = useMemo(
    () =>
      debounce(async (query) => {
        if (!query || query.length < 2) {
          setLogoSuggestions([]);
          setLogoLoading(false);
          setShowLogoDropdown(false); // Hide if query is too short
          return;
        }

        setLogoLoading(true);
        try {
          const response = await fetch(
            `${LOGO_DEV_API_URL}?q=${encodeURIComponent(query)}`,
            {
              headers: {
                Authorization: `Bearer: ${LOGO_DEV_API_KEY}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setLogoSuggestions(data);
            if (isInputFocused) {
              // Only show if input is still focused
              setShowLogoDropdown(true);
            }
          } else {
            console.error("Logo search failed:", response.status);
            setLogoSuggestions([]);
            setShowLogoDropdown(false);
          }
        } catch (error) {
          console.error("Error fetching logo suggestions:", error);
          setLogoSuggestions([]);
          setShowLogoDropdown(false);
        } finally {
          setLogoLoading(false);
        }
      }, 300), // Reduced debounce time
    [isInputFocused] // Added isInputFocused to dependencies
  );

  // Clean up the debounced function on component unmount
  useEffect(() => {
    return () => {
      debouncedFetchLogo.cancel();
    };
  }, [debouncedFetchLogo]);

  // Handle logo selection
  const handleLogoSelect = (logo) => {
    setFormData((prev) => ({
      ...prev,
      company: logo.name, // Use the official name from API
      companyLogoUrl: logo.logo_url,
    }));
    setCompanyNameInput(logo.name);
    setShowLogoDropdown(false); // Hide dropdown on selection
  };

  // Handle blur and focus events for the company name input
  const handleCompanyNameBlur = () => {
    setIsInputFocused(false);
    // Delay hiding the dropdown so click on suggestion can register
    setTimeout(() => {
      setShowLogoDropdown(false);
    }, 200);
  };

  const handleCompanyNameFocus = () => {
    setIsInputFocused(true);
    // Show dropdown if there are suggestions or if currently loading
    if (logoSuggestions.length > 0 || logoLoading) {
      setShowLogoDropdown(true);
    } else if (companyNameInput.length > 1) {
      // If input has value, trigger search on focus if not already loading/suggesting
      debouncedFetchLogo(companyNameInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.workType ||       // Added workType check
      !formData.employmentType   // Added employmentType check
    ) {
      setError("Please fill in all required fields (Title, Company, Location, Work Type, Employment Type).");
      setLoading(false);
      return;
    }

    // Prepare data for API call, mapping to snake_case where backend expects it
    const jobData = {
      title: formData.title,
      company: formData.company,
      company_logo_url: formData.companyLogoUrl,
      location: formData.location,
      work_type: formData.workType,
      employment_type: formData.employmentType,
      application_url: formData.applicationUrl,
      salary_min:
        formData.salary.min !== ""
          ? parseFloat(formData.salary.min) * 100000
          : undefined,
      salary_max:
        formData.salary.max !== ""
          ? parseFloat(formData.salary.max) * 100000
          : undefined,
    };

    // Clean up undefined optional fields to avoid sending them as null
    if (jobData.company_logo_url === "") delete jobData.company_logo_url;
    if (jobData.application_url === "") delete jobData.application_url;
    if (jobData.salary_min === undefined) delete jobData.salary_min;
    if (jobData.salary_max === undefined) delete jobData.salary_max;


    try {
      const response = await api.createJobAdmin(jobData);

      if (response && response.success && response.data && (response.data.id || response.data._id)) {
        console.log("Job created successfully:", response.data);
        setToast({ message: "Job created successfully!", type: "success" });
        setFormData({
          title: "",
          company: "",
          companyLogoUrl: "",
          location: "",
          workType: "onsite",
          employmentType: "full-time",
          salary: {
            min: "",
            max: "",
            currency: "INR",
          },
          applicationUrl: "",
        });
        setCompanyNameInput("");
      } else {
        console.error(
          "Backend reported error or unexpected response structure creating job:",
          response?.message,
          response?.errors
        );
        if (response?.errors && Array.isArray(response.errors)) {
          setError(
            "Failed to create job: " +
              response.errors
                .map((err) => err.msg || err.message || err)
                .join(", ")
          );
        } else {
          setError(response?.message || "Failed to create job. Unexpected response from server.");
        }
      }
    } catch (error) {
      console.error("Error creating job:", error);
      setError("An error occurred while creating the job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Options for SelectFields
  const workTypeOptions = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "Onsite" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const employmentTypeOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "internship", label: "Internship" },
  ];

  // Log companyLogoUrl state whenever it changes (useful for debugging preview)
  useEffect(() => {
    console.log("companyLogoUrl state changed:", formData.companyLogoUrl);
  }, [formData.companyLogoUrl]);

  return (
    <div className={`job-form-container ${theme}`}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="page-header">
        <h2>Create Job Posting</h2>
        <div className="page-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/jobs")}
          >
            <FiX className="icon" /> Cancel
          </button>
          <button
            type="submit"
            className="create-button"
            disabled={loading}
            onClick={handleSubmit}
          >
            <FiSave className="icon" /> {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              {/* Title and Company on same row */}
              <div className="form-column">
                <InputField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  theme={theme}
                />
              </div>
              {/* Company Name input with logo suggestion */}
              <div className="form-column company-column">
                <div className="company-input-container">
                  <InputField
                    label="Company (enter domain or name, e.g., google.com, Juspay)"
                    name="companyNameInput" // Use this state for the input
                    value={companyNameInput}
                    onChange={handleCompanyNameInputChange} // Use the dedicated handler
                    onBlur={handleCompanyNameBlur}
                    onFocus={handleCompanyNameFocus}
                    required
                    theme={theme}
                    placeholder="Enter company name or domain (e.g., company.com)"
                  />
                  {/* Logo suggestions dropdown */}
                  {showLogoDropdown && isInputFocused && (
                    <div className="logo-suggestions-dropdown">
                      {logoLoading ? (
                        <div className="loading-message">
                          Searching for logos...
                        </div>
                      ) : logoSuggestions.length > 0 ? (
                        logoSuggestions.map((logo, index) => (
                          <div
                            key={index}
                            className="logo-suggestion-item"
                            onMouseDown={(e) => e.preventDefault()} // Prevent input blur when clicking suggestion
                            onClick={() => handleLogoSelect(logo)}
                          >
                            {logo.logo_url && (
                              <img
                                src={logo.logo_url}
                                alt={`${logo.name} logo`}
                                onError={
                                  (e) => (e.target.style.visibility = "hidden") // Hide broken images
                                }
                              />
                            )}
                            <div className="logo-info">
                              <div className="logo-name">{logo.name}</div>
                              <div className="logo-domain">{logo.domain}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-results">
                          No logo suggestions found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Location and Company Logo URL with Preview */}
              <div className="form-column">
                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  theme={theme}
                />
              </div>
              {/* Company Logo URL input with preview */}
              <div className="form-column company-logo-column">
                <div className="logo-url-input-wrapper">
                  {" "}
                  {/* Wrapper for flex layout */}
                  <InputField
                    label="Company Logo URL"
                    name="companyLogoUrl"
                    value={formData.companyLogoUrl}
                    onChange={handleChange} // Use generic handleChange
                    theme={theme}
                    type="url"
                    placeholder="Logo URL"
                  />
                  {/* Logo Preview */}
                  {formData.companyLogoUrl && (
                    <>
                      {console.log(
                        "Rendering logo preview for:",
                        formData.companyLogoUrl
                      )}
                      <img
                        src={formData.companyLogoUrl}
                        alt="Company Logo Preview"
                        className="logo-preview"
                        onError={(e) => {
                          console.error(
                            "Logo preview failed to load:",
                            formData.companyLogoUrl,
                            e
                          );
                          e.target.style.display = "none"; // Hide broken image element
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Work Type and Employment Type on same row */}
              <div className="form-column">
                <SelectField
                  label="Work Type"
                  name="workType"
                  value={formData.workType}
                  options={workTypeOptions}
                  onChange={handleChange}
                  theme={theme}
                />
              </div>
              <div className="form-column">
                <SelectField
                  label="Employment Type"
                  name="employmentType"
                  value={formData.employmentType}
                  options={employmentTypeOptions}
                  onChange={handleChange}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Salary Information</h3>
            <div className="form-grid">
              {/* Min and Max salary on same row */}
              <div className="form-column">
                <InputField
                  label="Minimum Salary (in Lakhs)"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleChange}
                  theme={theme}
                  type="number"
                  min="0"
                />
              </div>
              <div className="form-column">
                <InputField
                  label="Maximum Salary (in Lakhs)"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleChange}
                  theme={theme}
                  type="number"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Application</h3>
            <div className="form-grid">
              <div className="form-column">
                <InputField
                  label="Application URL"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  theme={theme}
                  type="url"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/admin/jobs")}
              disabled={loading}
            >
              <FiX className="icon" /> Cancel
            </button>
            <button type="submit" className="create-button" disabled={loading}>
              <FiSave className="icon" />{" "}
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .job-form-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          box-sizing: border-box; /* Ensure padding doesn't increase width */
        }

        /* Dark theme styles */
        .job-form-container.dark {
          color: #e0e0e0;
        }
        .job-form-container.dark .form-card {
          background-color: #1f2937;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #374151; /* Added border for definition */
        }
        .job-form-container.dark .form-section {
          border-bottom-color: #374151;
        }
        .job-form-container.dark h2,
        .job-form-container.dark h3 {
          color: #f9fafb;
        }
        .job-form-container.dark .logo-suggestions-dropdown {
          border-color: #4b5563;
          background-color: #1f2937;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .job-form-container.dark .logo-suggestion-item {
          border-bottom-color: #374151;
          color: #d1d5db;
        }
        .job-form-container.dark .logo-suggestion-item:hover {
          background-color: #374151;
        }
        .job-form-container.dark .loading-message,
        .job-form-container.dark .no-results {
          color: #9ca3af;
        }
        .job-form-container.dark .form-actions {
          background-color: #111827;
          border-top-color: #374151;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .page-actions {
          display: flex;
          gap: 0.75rem;
        }

        .icon {
          margin-right: 0.375rem;
          vertical-align: middle;
        }

        .form-card {
          border-radius: 0.5rem;
          overflow: hidden;
          background-color: #ffffff; /* Default light theme */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Default light theme */
        }

        .form-section {
          margin-bottom: 0; /* Removed bottom margin */
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb; /* Added default border */
        }

        .form-section:last-child {
          border-bottom: none;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 500;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #111827; /* Default light theme */
        }
        .job-form-container.dark h3 {
          color: #f9fafb; /* Dark theme */
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1.25rem;
        }

        .company-column {
          position: relative;
        }

        .company-input-container {
          position: relative;
          width: 100%;
        }

        .logo-suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 100;
          border-radius: 0.25rem;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 4px;
          border: 1px solid #d1d5db; /* Default light theme */
          background-color: #ffffff; /* Default light theme */
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Default light theme */
        }

        .logo-suggestion-item {
          display: flex;
          align-items: center;
          padding: 8px;
          cursor: pointer;
          border-bottom: 1px solid #e5e7eb; /* Default light theme */
        }
        .logo-suggestion-item:last-child {
          border-bottom: none;
        }

        .logo-suggestion-item img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
          object-fit: contain;
          flex-shrink: 0; /* Prevent shrinking */
        }

        .logo-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1; /* Allow info to take available space */
        }

        .logo-name {
          font-weight: 500;
          font-size: 14px;
        }

        .logo-domain {
          font-size: 12px;
          color: #666; /* Default light theme */
        }

        .dark .logo-domain {
          color: #aaa; /* Dark theme */
        }

        .loading-message,
        .no-results {
          padding: 0.625rem;
          font-size: 0.8125rem;
          text-align: center;
          color: #6b7280; /* Default light theme */
        }
        .dark .loading-message,
        .dark .no-results {
          color: #9ca3af; /* Dark theme */
        }

        .company-logo-column {
          display: flex;
          flex-direction: column;
        }

        .logo-url-input-wrapper {
          display: flex;
          align-items: flex-end; /* Align items to the bottom */
          gap: 10px;
          width: 100%;
        }

        .logo-url-input-wrapper > :first-child {
          flex-grow: 1; /* Allow input field to grow */
        }

        .logo-preview {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border: 1px solid #d1d5db; /* Default light theme */
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.05); /* Slight background */
          flex-shrink: 0;
          margin-bottom: 23px; /* Aligns bottom of logo with bottom of input field */
        }
        .dark .logo-preview {
          border-color: #4b5563; /* Dark theme */
          background-color: rgba(255, 255, 255, 0.1); /* Dark theme */
        }

        .checkbox-wrapper {
          height: 100%;
          display: flex;
          align-items: center;
          padding-top: 1.5rem; /* Adds space above checkbox to align with other fields */
        }
        /* Adjusted for salary negotiable checkbox alignment */
        .negotiable-column .checkbox-wrapper {
          padding-top: 1.5rem; /* Keep consistent */
        }
        .featured-column .checkbox-wrapper,
        .active-column .checkbox-wrapper {
          padding-top: 1.5rem; /* Keep consistent */
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.25rem;
          border-top: 1px solid #e5e7eb; /* Default light theme */
          background-color: #f9fafb; /* Default light theme */
        }
        .dark .form-actions {
          border-top-color: #374151; /* Dark theme */
          background-color: #111827; /* Dark theme */
        }

        .create-button {
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out; /* Smooth transition */
          display: flex;
          align-items: center;
        }

        .create-button:hover:not(:disabled) {
          background-color: #4338ca;
        }

        .create-button:disabled {
          background-color: #6366f1;
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-button {
          padding: 0.5rem 1rem;
          background-color: #6b7280; /* Default light theme */
          color: #f3f4f6;
          border: none;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out; /* Smooth transition */
          display: flex;
          align-items: center;
        }
        .dark .cancel-button {
          background-color: #374151; /* Dark theme */
        }

        .cancel-button:hover:not(:disabled) {
          background-color: #4b5563;
        }

        .cancel-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          color: #f87171;
          background-color: rgba(239, 68, 68, 0.15);
          border: 1px solid #ef4444;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        @media (max-width: 992px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          /* Adjust padding for checkboxes on small screens */
          .checkbox-wrapper,
          .negotiable-column .checkbox-wrapper,
          .featured-column .checkbox-wrapper,
          .active-column .checkbox-wrapper {
            padding-top: 0.5rem;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-actions {
            margin-top: 1rem;
            width: 100%;
            justify-content: flex-end;
          }

          .logo-url-input-wrapper {
            flex-direction: row; /* Keep row direction */
            align-items: flex-end;
          }
          .logo-preview {
            margin-bottom: 23px; /* Keep alignment */
          }
        }
        @media (max-width: 768px) {
          .job-form-container {
            padding: 1rem; /* Reduce padding on smaller screens */
          }
          .form-section {
            padding: 1rem; /* Reduce section padding */
          }
          .form-actions {
            padding: 1rem; /* Reduce actions padding */
          }
          h2 {
            font-size: 1.3rem;
          }
          h3 {
            font-size: 1rem;
          }
          .form-grid {
            grid-gap: 1rem; /* Reduce grid gap */
          }
          .logo-preview {
            width: 35px; /* Slightly smaller logo preview */
            height: 35px;
            margin-bottom: 20px; /* Adjust alignment slightly */
          }
          .checkbox-wrapper,
          .negotiable-column .checkbox-wrapper,
          .featured-column .checkbox-wrapper,
          .active-column .checkbox-wrapper {
            padding-top: 0.8rem; /* Adjust padding */
          }
        }
      `}</style>
    </div>
  );
};

export default JobCreate;
