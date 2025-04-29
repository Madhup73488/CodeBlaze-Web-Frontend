import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import useForm from "../../hooks/useForm";

const JobEdit = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobPostings, fetchJobPostings, loadingStates, errors, clearError } =
    useAdmin();
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Find the job to edit
  const jobToEdit = jobPostings.find((job) => job.id.toString() === jobId);

  // Fetch job data if not already loaded
  useEffect(() => {
    const loadJobData = async () => {
      if (jobPostings.length === 0) {
        await fetchJobPostings();
      }
      setIsLoading(false);
    };

    loadJobData();

    return () => {
      if (errors.jobPostings) {
        clearError("jobPostings");
      }
    };
  }, [jobId, jobPostings.length, fetchJobPostings]);

  // Prepare initial values (either from the found job or with default values)
  const initialValues = jobToEdit
    ? {
        title: jobToEdit.title || "",
        company: jobToEdit.company || "",
        location: jobToEdit.location || "",
        type: jobToEdit.type || "Full-time",
        salary: jobToEdit.salary || "",
        description: jobToEdit.description || "",
        requirements: jobToEdit.requirements || "",
        responsibilities: jobToEdit.responsibilities || "",
        benefits: jobToEdit.benefits || "",
        applicationProcess: jobToEdit.applicationProcess || "",
        applicationUrl: jobToEdit.applicationUrl || "",
        expiryDate: jobToEdit.expires || "",
        isRemote: jobToEdit.isRemote || false,
        isUrgent: jobToEdit.isUrgent || false,
        status: jobToEdit.status || "active",
      }
    : {};

  // Form validation rules
  const validate = (values) => {
    const errors = {};

    if (!values.title) errors.title = "Job title is required";
    if (!values.company) errors.company = "Company name is required";
    if (!values.location) errors.location = "Location is required";
    if (!values.description) errors.description = "Job description is required";
    if (!values.requirements)
      errors.requirements = "Job requirements are required";
    if (!values.responsibilities)
      errors.responsibilities = "Job responsibilities are required";

    if (values.applicationUrl && !isValidUrl(values.applicationUrl)) {
      errors.applicationUrl = "Please enter a valid URL";
    }

    if (!values.expiryDate) {
      errors.expiryDate = "Expiry date is required";
    }

    return errors;
  };

  // Handle form submission
  const onSubmit = async (values) => {
    setSubmitError(null);

    try {
      // Mock API call - replace with actual API in real app
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updated job posting:", values);

      // Show success message and redirect to job details
      alert("Job posting updated successfully!");
      navigate(`/admin/jobs/${jobId}`);
    } catch (error) {
      setSubmitError(error.message || "Failed to update job posting");
    }
  };

  // Use custom form hook
  const {
    values,
    errors: formErrors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useForm({
    initialValues,
    validate,
    onSubmit,
  });

  // Update form values when job data is loaded
  useEffect(() => {
    if (jobToEdit && !isLoading) {
      setValues({
        title: jobToEdit.title || "",
        company: jobToEdit.company || "",
        location: jobToEdit.location || "",
        type: jobToEdit.type || "Full-time",
        salary: jobToEdit.salary || "",
        description: jobToEdit.description || "",
        requirements: jobToEdit.requirements || "",
        responsibilities: jobToEdit.responsibilities || "",
        benefits: jobToEdit.benefits || "",
        applicationProcess: jobToEdit.applicationProcess || "",
        applicationUrl: jobToEdit.applicationUrl || "",
        expiryDate: jobToEdit.expires || "",
        isRemote: jobToEdit.isRemote || false,
        isUrgent: jobToEdit.isUrgent || false,
        status: jobToEdit.status || "active",
      });
    }
  }, [jobToEdit, isLoading, setValues]);

  // Helper for URL validation
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Display loading state
  if (isLoading || loadingStates.jobPostings) {
    return <div className="loading-container">Loading job details...</div>;
  }

  // Display error if job not found
  if (!jobToEdit) {
    return (
      <div className="error-container">
        <h2>Job Not Found</h2>
        <p>
          The job posting you're trying to edit doesn't exist or has been
          removed.
        </p>
        <button onClick={() => navigate("/admin/jobs")} className="back-btn">
          Back to Jobs List
        </button>
      </div>
    );
  }

  return (
    <div className="job-edit-container">
      <div className="page-header">
        <h1>Edit Job Posting</h1>
        <button
          onClick={() => navigate(`/admin/jobs/${jobId}`)}
          className="back-btn"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-grid">
          {/* Basic Information Section */}
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.title && touched.title ? "input-error" : ""
                }
              />
              {formErrors.title && touched.title && (
                <div className="error-text">{formErrors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.company && touched.company ? "input-error" : ""
                }
              />
              {formErrors.company && touched.company && (
                <div className="error-text">{formErrors.company}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.location && touched.location ? "input-error" : ""
                }
              />
              {formErrors.location && touched.location && (
                <div className="error-text">{formErrors.location}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Employment Type</label>
                <select
                  id="type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salary">Salary Range</label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="e.g. $50,000 - $70,000"
                  value={values.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isRemote"
                  name="isRemote"
                  checked={values.isRemote}
                  onChange={handleChange}
                />
                <label htmlFor="isRemote">Remote Position</label>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isUrgent"
                  name="isUrgent"
                  checked={values.isUrgent}
                  onChange={handleChange}
                />
                <label htmlFor="isUrgent">Urgent Hiring</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
                <option value="paused">Paused</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date *</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={values.expiryDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.expiryDate && touched.expiryDate
                    ? "input-error"
                    : ""
                }
              />
              {formErrors.expiryDate && touched.expiryDate && (
                <div className="error-text">{formErrors.expiryDate}</div>
              )}
            </div>
          </div>

          {/* Job Details Section */}
          <div className="form-section">
            <h2>Job Details</h2>

            <div className="form-group">
              <label htmlFor="description">Job Description *</label>
              <textarea
                id="description"
                name="description"
                rows="6"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.description && touched.description
                    ? "input-error"
                    : ""
                }
              />
              {formErrors.description && touched.description && (
                <div className="error-text">{formErrors.description}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements *</label>
              <textarea
                id="requirements"
                name="requirements"
                rows="6"
                value={values.requirements}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.requirements && touched.requirements
                    ? "input-error"
                    : ""
                }
              />
              {formErrors.requirements && touched.requirements && (
                <div className="error-text">{formErrors.requirements}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="responsibilities">Responsibilities *</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows="6"
                value={values.responsibilities}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.responsibilities && touched.responsibilities
                    ? "input-error"
                    : ""
                }
              />
              {formErrors.responsibilities && touched.responsibilities && (
                <div className="error-text">{formErrors.responsibilities}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="benefits">Benefits & Perks</label>
              <textarea
                id="benefits"
                name="benefits"
                rows="4"
                value={values.benefits}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Application Details Section */}
          <div className="form-section">
            <h2>Application Details</h2>

            <div className="form-group">
              <label htmlFor="applicationProcess">Application Process</label>
              <textarea
                id="applicationProcess"
                name="applicationProcess"
                rows="4"
                value={values.applicationProcess}
                onChange={handleChange}
                placeholder="Describe the steps applicants should follow..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="applicationUrl">Application URL</label>
              <input
                type="url"
                id="applicationUrl"
                name="applicationUrl"
                value={values.applicationUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  formErrors.applicationUrl && touched.applicationUrl
                    ? "input-error"
                    : ""
                }
              />
              {formErrors.applicationUrl && touched.applicationUrl && (
                <div className="error-text">{formErrors.applicationUrl}</div>
              )}
            </div>
          </div>
        </div>

        {submitError && (
          <div className="error-message">
            <p>{submitError}</p>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/admin/jobs/${jobId}`)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobEdit;
