// src/components/careers/JobListings.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobListings = ({ theme, colorStyles, activeFilter, onFilterChange }) => {
  const navigate = useNavigate();
  const [loadingJob, setLoadingJob] = useState(null);

  const jobs = [
    {
      id: "senior-full-stack-developer",
      title: "Senior Full Stack Developer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description:
        "Build and maintain scalable web applications using modern JavaScript frameworks.",
    },
    {
      id: "ux-ui-designer",
      title: "UX/UI Designer",
      location: "Remote",
      type: "Full-time",
      department: "Design",
      description:
        "Create intuitive and engaging user experiences for digital products.",
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      location: "Remote",
      type: "Full-time",
      department: "Engineering",
      description:
        "Implement and maintain CI/CD pipelines and cloud infrastructure.",
    },
    {
      id: "product-manager",
      title: "Product Manager",
      location: "Remote",
      type: "Full-time",
      department: "Product",
      description:
        "Lead product strategy and execution from conception to launch.",
    },
    {
      id: "marketing-specialist",
      title: "Marketing Specialist",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      description:
        "Develop and execute marketing strategies to grow our brand presence.",
    },
  ];

  const filters = [
    { name: "all", label: "All Positions" },
    { name: "Engineering", label: "Engineering" },
    { name: "Design", label: "Design" },
    { name: "Product", label: "Product" },
    { name: "Marketing", label: "Marketing" },
  ];

  const filteredJobs =
    activeFilter === "all"
      ? jobs
      : jobs.filter((job) => job.department === activeFilter);

  const handleViewDetails = (jobId) => {
    setLoadingJob(jobId);
    setTimeout(() => {
      navigate(`/careers/${jobId}/overview`);
      setLoadingJob(null);
    }, 2000);
  };

  return (
    <section
      className="py-20"
      style={{ background: theme === "dark" ? "#111" : "#f5f5f7" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colorStyles.primary }}
          ></div>
          <p className="mt-6 max-w-2xl mx-auto text-lg">
            Join our team of passionate innovators building the next generation
            of digital solutions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.name ? "text-white" : ""
              }`}
              style={{
                backgroundColor:
                  activeFilter === filter.name
                    ? colorStyles.primary
                    : theme === "dark"
                    ? "#1a1a1a"
                    : "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => onFilterChange(filter.name)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-lg transition-all"
              style={{
                background: theme === "dark" ? "#1a1a1a" : "#ffffff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
                      }}
                    >
                      {job.location}
                    </span>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
                      }}
                    >
                      {job.type}
                    </span>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: colorStyles.primary,
                        color: "white",
                      }}
                    >
                      {job.department}
                    </span>
                  </div>
                  <p className="mb-4">{job.description}</p>
                </div>
                <button
                  className="self-start md:self-center px-5 py-2 rounded-md text-white font-medium transition-all whitespace-nowrap relative overflow-hidden"
                  style={{ backgroundColor: colorStyles.primary }}
                  onClick={() => handleViewDetails(job.id)}
                  disabled={loadingJob === job.id}
                >
                  {loadingJob === job.id ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "View Details"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-8">
            <h3 className="text-xl mb-2">
              No open positions in this department
            </h3>
            <p>Check back later or explore other departments</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
