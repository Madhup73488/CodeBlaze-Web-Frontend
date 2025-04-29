// admin/pages/jobs/JobList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

const JobList = () => {
  const { theme } = useAdmin();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data fetch - replace with actual API call
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockJobs = [
          {
            id: 1,
            title: "Senior Software Engineer",
            company: "TechCorp",
            location: "San Francisco, CA",
            type: "Full-time",
            posted: "2023-05-15",
            status: "active",
            applications: 24
          },
          {
            id: 2,
            title: "Frontend Developer",
            company: "WebSolutions",
            location: "Remote",
            type: "Contract",
            posted: "2023-05-10",
            status: "active",
            applications: 15
          },
          {
            id: 3,
            title: "DevOps Engineer",
            company: "CloudSystems",
            location: "New York, NY",
            type: "Full-time",
            posted: "2023-04-28",
            status: "paused",
            applications: 8
          }
        ];
        setJobs(mockJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: "Job Title",
      accessor: "title",
      cell: (row) => (
        <Link to={`/admin/jobs/${row.id}`} className="job-title-link">
          {row.title}
        </Link>
      )
    },
    {
      header: "Company",
      accessor: "company"
    },
    {
      header: "Location",
      accessor: "location"
    },
    {
      header: "Type",
      accessor: "type"
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Applications",
      accessor: "applications"
    }
  ];

  return (
    <div className={`job-list-container ${theme}`}>
      <div className="list-header">
        <h2>Job Postings</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Link to="/admin/jobs/create" className="create-button">
            Create New Job
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredJobs}
        loading={loading}
        emptyMessage="No jobs found"
        theme={theme}
      />

      <style jsx>{`
        .job-list-container {
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        .job-list-container.light {
          background-color: #ffffff;
        }

        .job-list-container.dark {
          background-color: #1f2937;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-input {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          min-width: 250px;
        }

        .create-button {
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border-radius: 0.375rem;
          text-decoration: none;
          font-size: 0.875rem;
          transition: background-color 0.2s;
        }

        .create-button:hover {
          background-color: #4338ca;
        }

        .job-title-link {
          color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          text-decoration: none;
          font-weight: 500;
        }

        .job-title-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .actions {
            width: 100%;
          }

          .search-input {
            flex: 1;
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default JobList;