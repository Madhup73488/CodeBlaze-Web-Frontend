import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

// Import job-related components
import JobList from "./JobList";
import JobCreate from "./JobCreate";
import JobEdit from "./JobEdit";
import JobDetail from "./JobDetail";
import AdminNotFound from "../AdminNotFound";

/**
 * Jobs module entry point - handles routing for job-related pages
 */
const JobsIndex = () => {
  const { hasPermission } = useAdmin();

  // Check if user has permission to view jobs
  if (!hasPermission("view:jobs") && !hasPermission("view:all")) {
    return (
      <div className="permission-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access job management.</p>
      </div>
    );
  }

  return (
    <div className="jobs-module">
      <Routes>
        {/* List all jobs - main entry point */}
        <Route index element={<JobList />} />

        {/* Create new job - requires create permission */}
        <Route
          path="create"
          element={
            hasPermission("create:jobs") || hasPermission("create:all") ? (
              <JobCreate />
            ) : (
              <AdminNotFound message="You don't have permission to create jobs" />
            )
          }
        />

        {/* View job details */}
        <Route path=":jobId" element={<JobDetail />} />

        {/* Edit job - requires edit permission */}
        <Route
          path=":jobId/edit"
          element={
            hasPermission("edit:jobs") || hasPermission("edit:all") ? (
              <JobEdit />
            ) : (
              <AdminNotFound message="You don't have permission to edit jobs" />
            )
          }
        />

        {/* Catch any other routes under /admin/jobs/ */}
        <Route path="*" element={<AdminNotFound />} />
      </Routes>
    </div>
  );
};

export default JobsIndex;
