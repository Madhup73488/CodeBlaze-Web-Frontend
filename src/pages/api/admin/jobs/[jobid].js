// pages/api/admin/jobs/[jobId].js
async function handler(req, res) {
  const { jobId } = req.query;

  // In production, add authentication middleware
  // const user = await authMiddleware(req, res);
  // if (!user || !user.isAdmin) return;

  // Find the job in our mock database
  const jobIndex = jobsDb.findIndex((job) => job.id === jobId);

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Handle GET request to fetch a specific job
  if (req.method === "GET") {
    res.status(200).json(jobsDb[jobIndex]);
  }
  // Handle PUT request to update a job
  else if (req.method === "PUT") {
    const jobData = req.body;

    // Simple validation
    if (!jobData.title || !jobData.description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Update the job but preserve id and postedDate
    jobsDb[jobIndex] = {
      ...jobData,
      id: jobId,
      postedDate: jobsDb[jobIndex].postedDate,
    };

    res.status(200).json(jobsDb[jobIndex]);
  }
  // Handle DELETE request to remove a job
  else if (req.method === "DELETE") {
    // Remove the job from the array
    jobsDb = jobsDb.filter((job) => job.id !== jobId);

    res.status(200).json({ message: "Job deleted successfully" });
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
