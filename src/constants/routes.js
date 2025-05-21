export const ROUTES = {
  HOME: "/",
  CAREERS: "/careers",
  ABOUT_US: "/aboutus",
  OUR_TEAM: "/ourteam",
  OUR_MISSION: "/ourmission",
  OUR_VALUES: "/ourvalues",
  SUPPORT: "/support",
  PRIVACY_POLICY: "/privacy",
  TERMS_OF_SERVICE: "/terms-of-service",
  PLACEMENT_GUIDANCE: "/placement-guidance",
  INTERNSHIPS: "/internships",
  INTERNSHIP_DETAIL: "/internship/:id", // Example with a parameter
  PROJECT_SUPPORT: "/project-support",
  MENTORSHIP_PROGRAMS: "/mentorship-programs",
  WEBINARS: "/webinars",
  SKILLS_AND_ROLES: "/skills-and-roles",
  JOB_SEEKERS: "/job-seekers",
  RESOURCES: "/resources",
  RESOURCES_SEVENTY_QUESTIONS: "/resources/seventy-questions-by-neha-malhotra",
  RESOURCES_RESUME_TIPS: "/resources/resume-writing-tips",
  RESET_PASSWORD: "/reset-password/:token",
  PROFILE: "/profile",
  PROFILE_DASHBOARD: "/profile/dashboard",
  PROFILE_VIEW: "/profile/view/:userId",
  // Admin Routes
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_JOBS: "/admin/jobs",
  ADMIN_JOBS_CREATE: "/admin/jobs/create",
  ADMIN_JOB_DETAIL: "/admin/jobs/:id",
  ADMIN_JOB_EDIT: "/admin/jobs/:id/edit",
  ADMIN_INTERNSHIPS: "/admin/internships",
  ADMIN_INTERNSHIPS_CREATE: "/admin/internships/create",
  ADMIN_INTERNSHIP_DETAIL: "/admin/internships/:id",
  ADMIN_INTERNSHIP_EDIT: "/admin/internships/:id/edit",
  ADMIN_APPLICATIONS: "/admin/applications",
  ADMIN_APPLICATIONS_JOBS: "/admin/applications/jobs",
  ADMIN_APPLICATIONS_INTERNSHIPS: "/admin/applications/internships",
  ADMIN_USERS: "/admin/users", // New route for managing admin users
  ADMIN_ANALYTICS: "/admin/analytics", // Base for analytics
  ADMIN_ANALYTICS_USERS: "/admin/analytics/users",
  ADMIN_ANALYTICS_JOBS: "/admin/analytics/jobs",
  ADMIN_ANALYTICS_APPLICATIONS: "/admin/analytics/applications",
  ADMIN_DOCUMENTS: "/admin/documents", // Base for document generation
  ADMIN_DOCUMENTS_OFFER_LETTER: "/admin/documents/offer-letter",
  ADMIN_DOCUMENTS_CERTIFICATE: "/admin/documents/certificate",
  CERTIFICATE_VERIFICATION: "/internship-certificate-verification/:certificateId", // Public verification route
  NOT_FOUND: "*", // For catch-all routes
};

// Helper function to generate paths with parameters
export const generatePath = (path, params) => {
  let generatedPath = path;
  for (const key in params) {
    generatedPath = generatedPath.replace(`:${key}`, params[key]);
  }
  return generatedPath;
};
