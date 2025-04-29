// admin/pages/jobs/JobCreate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import {
  InputField,
  SelectField,
  TextAreaField,
} from "../../components/common/FormFields";

const JobCreate = () => {
  const { theme } = useAdmin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    salary: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this would be an API call
      console.log("Creating job:", formData);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect to job list after creation
      navigate("/admin/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const jobTypes = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
    { value: "Temporary", label: "Temporary" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
  ];

  return (
    <div className={`job-form-container ${theme}`}>
      <h2>Create New Job Posting</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <InputField
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              theme={theme}
            />
            <InputField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              theme={theme}
            />
          </div>
          <div className="form-row">
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              theme={theme}
            />
            <SelectField
              label="Job Type"
              name="type"
              value={formData.type}
              options={jobTypes}
              onChange={handleChange}
              theme={theme}
            />
          </div>
          <InputField
            label="Salary (optional)"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            theme={theme}
          />
        </div>

        <div className="form-section">
          <h3>Job Details</h3>
          <TextAreaField
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            theme={theme}
          />
          <TextAreaField
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            rows={6}
            theme={theme}
          />
        </div>

        <div className="form-section">
          <h3>Publishing Options</h3>
          <SelectField
            label="Status"
            name="status"
            value={formData.status}
            options={statusOptions}
            onChange={handleChange}
            theme={theme}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/jobs")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Job
          </button>
        </div>
      </form>

      <style jsx>{`
        .job-form-container {
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        .job-form-container.light {
          background-color: #ffffff;
        }

        .job-form-container.dark {
          background-color: #1f2937;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .form-section {
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .submit-button {
          padding: 0.625rem 1.5rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #4338ca;
        }

        .cancel-button {
          padding: 0.625rem 1.5rem;
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .cancel-button:hover {
          background-color: ${theme === "dark" ? "#4b5563" : "#e5e7eb"};
        }

        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default JobCreate;
