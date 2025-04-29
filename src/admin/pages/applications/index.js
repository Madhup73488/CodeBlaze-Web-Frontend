import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load components for code splitting
const JobApplications = lazy(() => import("./JobApplications"));
const InternshipApplications = lazy(() => import("./InternshipApplications"));

const ApplicationsRoutes = () => {
  return (
    <Suspense
      fallback={<div className="p-6 text-center">Loading applications...</div>}
    >
      <Routes>
        <Route path="/" element={<JobApplications />} />
        <Route path="/jobs" element={<JobApplications />} />
        <Route path="/internships" element={<InternshipApplications />} />
      </Routes>
    </Suspense>
  );
};

export default ApplicationsRoutes;
