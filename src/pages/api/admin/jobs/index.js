// pages/api/admin/jobs/index.js
import { authMiddleware } from "../../../../utils/auth"; // You'd need to implement this

// Mock database for example purposes
let jobsDb = [
  {
    id: "1",
    title: "Frontend Developer",
    employmentType: "Full-time",
    postedDate: "April 1, 2025",
    department: "Engineering",
    location: "Remote",
    applicationDeadline: "2025-05-15",
    description:
      "<p>We are looking for a passionate Frontend Developer to join our team...</p>",
    requirements:
      "<ul><li>3+ years experience with React</li><li>Strong JavaScript skills</li><li>Experience with Next.js</li></ul>",
    responsibilities:
      "<ul><li>Develop new user-facing features</li><li>Build reusable components</li><li>Optimize applications for performance</li></ul>",
    benefits:
      "<ul><li>Competitive salary</li><li>Remote work options</li><li>Health insurance</li><li>401k matching</li></ul>",
  },
  // Add more mock jobs as needed
];

async function handler(req, res) {
  // In production, add authentication middleware
  // const user = await authMiddleware(req, res);
  // if (!user || !user.isAdmin) return;

  // Handle GET request to fetch all jobs
  if (req.method === "GET") {
    res.status(200).json(jobsDb);
  }
  // Handle POST request to create a new job
  else if (req.method === "POST") {
    const jobData = req.body;

    // Simple validation
    if (!jobData.title || !jobData.description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Generate ID and add postedDate
    const newJob = {
      ...jobData,
      id: Date.now().toString(), // Simple ID generation - use UUID in production
      postedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    // In a real app, save to database
    jobsDb.push(newJob);

    res.status(201).json(newJob);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
