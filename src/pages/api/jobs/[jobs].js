// Mock database of jobs
const jobsDb = [
  {
    id: "1",
    title: "Frontend Developer",
    employmentType: "Full-time",
    postedDate: "April 1, 2025",
    department: "Engineering",
    location: "Remote",
    applicationDeadline: "May 15, 2025",
    description:
      "<p>We are looking for a passionate Frontend Developer to join our team...</p>",
    requirements:
      "<ul><li>3+ years experience with React</li><li>Strong JavaScript skills</li><li>Experience with Next.js</li></ul>",
    responsibilities:
      "<ul><li>Develop new user-facing features</li><li>Build reusable components</li><li>Optimize applications for performance</li></ul>",
    benefits:
      "<ul><li>Competitive salary</li><li>Remote work options</li><li>Health insurance</li><li>401k matching</li></ul>",
  },
  // Add more job listings as needed
];

export default function handler(req, res) {
  const { jobId } = req.query;

  // Handle GET request to fetch a specific job
  if (req.method === "GET") {
    const job = jobsDb.find((job) => job.id === jobId);

    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
