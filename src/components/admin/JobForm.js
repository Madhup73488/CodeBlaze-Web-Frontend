// components/Admin/JobForm.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const JobForm = ({ jobId = null }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    employmentType: "Full-time",
    department: "",
    location: "",
    applicationDeadline: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
  });

  useEffect(() => {
    if (jobId) {
      // Fetch existing job data for editing
      const fetchJob = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/admin/jobs/${jobId}`);

          if (!response.ok) {
            throw new Error("Failed to fetch job");
          }

          const data = await response.json();
          setJobData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchJob();
    }
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      const url = jobId ? `/api/admin/jobs/${jobId}` : "/api/admin/jobs";

      const method = jobId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save job");
      }

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/jobs");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && jobId) {
    return <div className="text-center py-12">Loading job data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {jobId ? "Edit Job Posting" : "Create New Job Posting"}
      </h1>

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
          Job posting {jobId ? "updated" : "created"} successfully!
          Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Employment Type</label>
            <select
              name="employmentType"
              value={jobData.employmentType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={jobData.department}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={jobData.applicationDeadline}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
            rows="6"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="You can use HTML formatting"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-medium">Requirements</label>
          <textarea
            name="requirements"
            value={jobData.requirements}
            onChange={handleInputChange}
            rows="6"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="You can use HTML formatting"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-medium">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={jobData.responsibilities}
            onChange={handleInputChange}
            rows="6"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="You can use HTML formatting"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-medium">Benefits</label>
          <textarea
            name="benefits"
            value={jobData.benefits}
            onChange={handleInputChange}
            rows="6"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="You can use HTML formatting"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/admin/jobs")}
            className="px-6 py-2 border border-gray-300 rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isLoading ? "Saving..." : jobId ? "Update Job" : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
