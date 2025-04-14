// pages/careers/[jobId]/index.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import JobDescription from "../../../components/Careers/JobDescription";
import LoadingSpinner from "../../../components/UI/LoadingSpinner"; // You'll need to create this

const JobOverviewPage = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const [theme] = useState("light"); // or could be from context/redux/theme provider
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorStyles = {
    primary: "#4f46e5", // indigo-600
    secondary: "#10b981", // emerald-500
  };

  useEffect(() => {
    // Only fetch if jobId is available (router is ready)
    if (!jobId) return;

    const fetchJobData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`/api/jobs/${jobId}`);

        if (!response.ok) {
          throw new Error("Job not found");
        }

        const jobData = await response.json();
        setJob(jobData);
      } catch (err) {
        console.error("Failed to fetch job details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  // Show loading state while fetching job data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state if job wasn't found
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => router.push("/careers")}
          className="px-4 py-2 rounded-md text-white font-medium"
          style={{ backgroundColor: colorStyles.primary }}
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <>
      {job && (
        <JobDescription job={job} theme={theme} colorStyles={colorStyles} />
      )}
    </>
  );
};

export default JobOverviewPage;
