import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiX } from "react-icons/fi";
import { useAdmin } from "../../contexts/AdminContext";
import {
  InputField,
  SelectField,
  TextAreaField,
  CheckboxField,
} from "../../components/common/FormFields";
import { createInternshipAdmin } from "../../utils/api";
import debounce from "lodash.debounce";

const LOGO_DEV_API_KEY = "sk_MtiQij_oTbi09LZRSFdj5A"; // Replace with your actual key
const LOGO_DEV_API_URL = "https://api.logo.dev/search";
const InternshipCreate = () => {
  const { theme } = useAdmin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State structure aligned with the InternshipSchema
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    companyLogo: "", // This will store the selected/entered logo URL
    location: "",
    workType: "onsite",
    description: "",
    responsibilities: "",
    requirements: "",
    duration: "",
    internshipFee: {
      amount: "", // Keep as string initially
      currency: "USD",
    },
    benefits: "",
    skills: "",
    educationLevel: "none",
    applicationDeadline: "",
    featured: false,
    isActive: true,
  });

  // State for company name input and logo suggestions
  const [companyNameInput, setCompanyNameInput] = useState(""); // Input for company name/domain for logo search
  const [logoSuggestions, setLogoSuggestions] = useState([]);
  const [showLogoDropdown, setShowLogoDropdown] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Generic handler for most inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name.startsWith("internshipFee.")) {
      const feeField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        internshipFee: {
          ...prev.internshipFee,
          [feeField]: newValue, // Keep as string for amount input
        },
      }));
    } else {
      // Do not handle companyNameInput here
      if (name !== "companyNameInput") {
        // If the user directly edits the companyLogo field, update state
        if (name === "companyLogo") {
          setFormData((prev) => ({
            ...prev,
            companyLogo: newValue,
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
    setFormData((prev) => ({ ...prev, company: value }));

    if (value.length > 1) {
      debouncedFetchLogo(value);
      setShowLogoDropdown(true);
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
      }, 300),
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
      companyLogo: logo.logo_url,
    }));
    setCompanyNameInput(logo.name);
    setShowLogoDropdown(false);
  };

  const handleCodeBlazeSelect = () => {
    setFormData((prev) => ({
      ...prev,
      company: "CodeBlaze",
      companyLogo: "/src/assets/images/codeblazelogoorange.png",
    }));
    setCompanyNameInput("CodeBlaze");
    setShowLogoDropdown(false);
  };

  // const extractCompanyName = (input) => { // Removed unused function
  //   // Remove protocol (http://, https://, etc.)
  //   let cleanInput = input.replace(/^https?:\/\//, "");
  //
  //   // Remove www. if present
  //   cleanInput = cleanInput.replace(/^www\./, "");
  //
  //   // Remove paths, query parameters, and port numbers
  //   cleanInput = cleanInput.split("/")[0].split("?")[0].split(":")[0];
  //
  //   // Return the cleaned input (preserving dots in domain)
  //   return cleanInput;
  // };

  // Handle blur and focus events for the company name input
  const handleCompanyNameBlur = () => {
    setIsInputFocused(false);
    setTimeout(() => {
      setShowLogoDropdown(false);
    }, 200);
  };

  const handleCompanyNameFocus = () => {
    setIsInputFocused(true);
    if (
      logoSuggestions.length > 0 ||
      logoLoading ||
      companyNameInput.length > 1
    ) {
      setShowLogoDropdown(true);
    }
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation before submitting (keep this)
    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.description ||
      !formData.responsibilities ||
      !formData.requirements ||
      !formData.duration ||
      !formData.workType // Added workType check
    ) {
      setError("Please fill in all required fields (Title, Company, Location, Description, Responsibilities, Requirements, Duration, Work Type).");
      setLoading(false);
      return;
    }

    // Log formData just before submission
    console.log("Submitting formData:", formData);

    // Prepare data for API call (keep this logic)
    const internshipData = {
      ...formData, // Spread existing formData
      title: formData.title,
      company: formData.company,
      companyLogo: formData.companyLogo,
      location: formData.location,
      work_type: formData.workType, // Map to snake_case
      description: formData.description,
      duration: formData.duration,
      educationLevel: formData.educationLevel,
      applicationDeadline: formData.applicationDeadline
        ? new Date(formData.applicationDeadline)
        : undefined,
      featured: Boolean(formData.featured),
      isActive: Boolean(formData.isActive),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0),
      responsibilities: formData.responsibilities
        .split("\n")
        .map((resp) => resp.trim())
        .filter((resp) => resp.length > 0),
      requirements: formData.requirements
        .split("\n")
        .map((req) => req.trim())
        .filter((req) => req.length > 0),
      benefits: formData.benefits
        .split("\n")
        .map((benefit) => benefit.trim())
        .filter((benefit) => benefit.length > 0),
      internshipFee: {
        amount:
          formData.internshipFee.amount !== ""
            ? parseFloat(formData.internshipFee.amount)
            : undefined,
        currency: formData.internshipFee.currency,
      },
    };

    // Remove keys that were mapped or are not part of the direct payload expected by backend
    delete internshipData.workType;
    if (internshipData.internshipFee.amount === undefined) delete internshipData.internshipFee.amount;


    try {
      console.log("Submitting data to API:", internshipData);
      // createInternshipAdmin returns response.data from apiClient
      // So, 'response' here is the object like { success: true, data: { internship_object } }
      const response = await createInternshipAdmin(internshipData);

      if (response && response.success && response.data && (response.data.id || response.data._id)) {
        console.log("Internship created successfully:", response.data);
        navigate("/admin/internships");
      } else {
        console.error(
          "Backend reported error or unexpected response structure creating internship:",
          response?.message,
          response?.errors
        );
        if (response?.errors && Array.isArray(response.errors)) {
          setError(
            "Failed to create internship: " +
              response.errors
                .map((err) => err.msg || err.message || err)
                .join(", ")
          );
        } else {
          setError(response?.message || "Failed to create internship. Unexpected response from server.");
        }
      }
    } catch (error) {
      console.error("Error creating internship:", error);
      setError(
        "An error occurred while creating the internship. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Options for select fields
  const workTypeOptions = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "Onsite" },
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

  // Log companyLogo state whenever it changes (useful for debugging preview)
  useEffect(() => {
    console.log("companyLogo state changed:", formData.companyLogo);
  }, [formData.companyLogo]);

  return (
    <div className={`internship-form-container ${theme}`}>
      <div className="page-header">
        <h2>Create Internship Posting</h2>
        <div className="page-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/internships")}
          >
            <FiX className="icon" /> Cancel
          </button>
          <button
            type="submit"
            className="create-button"
            disabled={loading}
            onClick={handleSubmit}
          >
            <FiSave className="icon" />{" "}
            {loading ? "Creating..." : "Create Internship"}
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
                  label="Internship Title"
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
                    companyInput={true}
                    required
                    theme={theme}
                    placeholder="Enter company name or domain (e.g., company.com)"
                  />
                  {/* Logo suggestions dropdown */}
                  {showLogoDropdown && isInputFocused && (
                    <div className="logo-suggestions-dropdown">
                      <div
                        className="logo-suggestion-item"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleCodeBlazeSelect}
                      >
                        <img
                          src="/src/assets/images/codeblazelogoorange.png"
                          alt="CodeBlaze Logo"
                        />
                        <div className="logo-info">
                          <div className="logo-name">CodeBlaze</div>
                        </div>
                      </div>
                      {logoLoading ? (
                        <div className="loading-message">
                          Searching for logos...
                        </div>
                      ) : logoSuggestions.length > 0 ? (
                        logoSuggestions.map((logo, index) => (
                          <div
                            key={index}
                            className="logo-suggestion-item"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleLogoSelect(logo)}
                          >
                            {logo.logo_url && (
                              <img
                                src={logo.logo_url}
                                alt={`${logo.name} logo`}
                                onError={(e) =>
                                  (e.target.style.visibility = "hidden")
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
                    name="companyLogo"
                    value={formData.companyLogo}
                    onChange={handleChange} // Use generic handleChange
                    theme={theme}
                    type="url"
                    placeholder="Logo URL"
                  />
                  {/* Logo Preview */}
                  {formData.companyLogo && (
                    <>
                      {console.log(
                        "Rendering logo preview for:",
                        formData.companyLogo
                      )}
                      <img
                        src={formData.companyLogo}
                        alt="Company Logo Preview"
                        className="logo-preview"
                        onError={(e) => {
                          console.error(
                            "Logo preview failed to load:",
                            formData.companyLogo,
                            e
                          );
                          e.target.style.display = "none";
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Work Type and Duration on same row */}
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
                <InputField
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 months, 6 weeks"
                  theme={theme}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Fee Information</h3>
            <div className="form-grid">
              {/* Fee Amount and Currency on same row */}
              <div className="form-column">
                <InputField
                  label="Internship Fee Amount (Optional)"
                  name="internshipFee.amount"
                  value={formData.internshipFee.amount}
                  onChange={handleChange}
                  theme={theme}
                  type="number"
                  min="0"
                />
              </div>
              <div className="form-column">
                <SelectField
                  label="Currency"
                  name="internshipFee.currency"
                  value={formData.internshipFee.currency}
                  options={currencyOptions}
                  onChange={handleChange}
                  theme={theme}
                />
              </div>

              {/* Education Level and Application Deadline on same row */}
              <div className="form-column">
                <SelectField
                  label="Education Level"
                  name="educationLevel"
                  value={formData.educationLevel}
                  options={educationLevelOptions}
                  onChange={handleChange}
                  theme={theme}
                />
              </div>
              <div className="form-column">
                <InputField
                  label="Application Deadline (Optional)"
                  name="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  theme={theme}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Description & Requirements</h3>
            <TextAreaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleTextAreaChange}
              theme={theme}
              rows={5}
              required
            />

            <TextAreaField
              label="Responsibilities (one per line)"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleTextAreaChange}
              theme={theme}
              rows={4}
              required
            />

            <TextAreaField
              label="Requirements (one per line)"
              name="requirements"
              value={formData.requirements}
              onChange={handleTextAreaChange}
              theme={theme}
              rows={4}
              required
            />
          </div>

          <div className="form-section">
            <h3>Benefits & Skills</h3>
            <TextAreaField
              label="Benefits (one per line) (Optional)"
              name="benefits"
              value={formData.benefits}
              onChange={handleTextAreaChange}
              theme={theme}
              rows={3}
            />

            <InputField
              label="Skills (comma-separated)"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              theme={theme}
              placeholder="e.g., JavaScript, React, Node.js"
            />

            {/* Featured and Active on same row */}
            <div className="form-grid">
              <div className="form-column featured-column">
                <div className="checkbox-wrapper">
                  <CheckboxField
                    label="Featured Internship?"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    theme={theme}
                  />
                </div>
              </div>
              <div className="form-column active-column">
                <div className="checkbox-wrapper">
                  <CheckboxField
                    label="Is Active?"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/admin/internships")}
              disabled={loading}
            >
              <FiX className="icon" /> Cancel
            </button>
            <button type="submit" className="create-button" disabled={loading}>
              <FiSave className="icon" />{" "}
              {loading ? "Creating..." : "Create Internship"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .internship-form-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Add theme colors for dark mode */
        .internship-form-container.dark {
          color: #e0e0e0;
        }
        .internship-form-container.dark .form-card {
          background-color: #1f2937;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .internship-form-container.dark .form-section {
          border-bottom-color: #374151;
        }
        .internship-form-container.dark h2,
        .internship-form-container.dark h3 {
          color: #f9fafb;
        }
        .internship-form-container.dark .logo-suggestions-dropdown {
          border-color: #4b5563;
          background-color: #1f2937;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .internship-form-container.dark .logo-suggestion-item {
          border-bottom-color: #374151;
          color: #d1d5db;
        }
        .internship-form-container.dark .logo-suggestion-item:hover {
          background-color: #374151;
        }
        .internship-form-container.dark .loading-message,
        .internship-form-container.dark .no-results {
          color: #9ca3af;
        }
        .internship-form-container.dark .form-actions {
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
        }

        .form-section {
          margin-bottom: 1rem;
          padding: 1.25rem;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 500;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1.25rem;
        }

        .company-column {
          position: relative; /* Needed for absolute dropdown positioning */
        }

        .company-input-container {
          position: relative;
          width: 100%;
        }

        .logo-suggestions-dropdown {
          position: absolute;
          top: 100%; /* Position below the input */
          left: 0;
          right: 0;
          z-index: 100;
          border-radius: 0.25rem;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 4px; /* Small space below input */
        }

        .logo-suggestion-item {
          display: flex;
          align-items: center;
          padding: 0.625rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .logo-suggestion-item:last-child {
          border-bottom: none;
        }

        .logo-suggestion-item img {
          width: 24px;
          height: 24px;
          margin-right: 0.5rem;
          object-fit: contain;
          background-color: rgba(255, 255, 255, 0.1); /* subtle background */
          border-radius: 4px;
          padding: 2px;
          flex-shrink: 0; /* Prevent image from shrinking */
        }

        .logo-suggestion-item span {
          font-size: 0.8125rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 1; /* Allow text to take space */
        }

        .loading-message,
        .no-results {
          padding: 0.625rem;
          font-size: 0.8125rem;
          text-align: center;
        }

        .company-logo-column {
          /* Use flexbox for the input and preview side-by-side */
          display: flex;
          flex-direction: column; /* Stack label and input/preview */
        }

        .logo-url-input-wrapper {
          display: flex;
          align-items: flex-end; /* Align items at the bottom */
          gap: 10px; /* Space between input field and preview */
          width: 100%;
        }

        /* Style the InputField component's internal div to take available space */
        .logo-url-input-wrapper > :first-child {
          flex-grow: 1;
        }

        .logo-preview {
          width: 40px; /* Small square size */
          height: 40px;
          object-fit: contain; /* Contain the image without stretching */
          border: 1px solid #4b5563; /* Optional border */
          border-radius: 4px; /* Optional rounded corners */
          background-color: rgba(
            255,
            255,
            255,
            0.1
          ); /* Background for transparency */
          flex-shrink: 0; /* Prevent the preview from shrinking */
          margin-bottom: 23px;
        }

        .checkbox-wrapper {
          height: 100%;
          display: flex;
          align-items: center;
          padding-top: 1.5rem; /* Align with label spacing of other fields */
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding: 1.25rem;
          border-top: 1px solid #374151;
        }

        .create-button {
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
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
          background-color: #374151;
          color: #f3f4f6;
          border: none;
          border-radius: 0.25rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
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

          .checkbox-wrapper {
            padding-top: 0.5rem; /* Adjust spacing */
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
            flex-direction: row; /* Keep side-by-side on small screens too */
            align-items: flex-end;
          }
        }

        /* Optional: Add a bit more padding to the InputField wrapper if needed */
        /* to ensure proper alignment when used with logo preview */
        .form-column .input-field-wrapper {
          padding-bottom: 0; /* Remove default bottom padding */
        }
        .form-column .input-field-wrapper label {
          margin-bottom: 0.5rem; /* Add some space below label */
        }

        .logo-suggestion-item {
          display: flex;
          align-items: center;
          padding: 8px;
          cursor: pointer;
        }

        .logo-suggestion-item img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
          object-fit: contain;
        }

        .logo-info {
          display: flex;
          flex-direction: column;
        }

        .logo-name {
          font-weight: 500;
          font-size: 14px;
        }

        .logo-domain {
          font-size: 12px;
          color: #666;
        }

        .dark .logo-domain {
          color: #aaa;
        }
      `}</style>
    </div>
  );
};

export default InternshipCreate;
