import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./contexts/Navbar";
import Careers from "./pages/Careers";
import Footer from "./components/landing/Footer";
import AboutUs from "./components/whoarewe/AboutUs";
import OurTeam from "./components/whoarewe/OurTeam";
import OurMission from "./components/whoarewe/OurMission";
import OurValues from "./components/whoarewe/OurValues";
import NotFound from "./components/micellaneos/NotFound";
import Support from "./components/micellaneos/Support";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivacyPolicy from "./components/micellaneos/PrivacyPolicy";
import { LoaderProvider } from "./contexts/LoaderContext";
import Landing from "./pages/Landing";
import TermsOfService from "./components/micellaneos/TermsOfService";
import PlacementGuidance from "./components/ForStudents/PlacementGuidance";
import Internships from "./components/ForStudents/Internships";
import ProjectSupport from "./components/ForStudents/ProjectSupport";
import MentorshipPrograms from "./components/ForStudents/MentorshipPrograms";
import Webinars from "./components/ForStudents/Webinars";
import SkillsAndRoles from "./components/ForStudents/SkillsAndRoles";
import JobSeekers from "./components/JobSeekers/JobSeekers";

import AdminLayout from "./admin/components/layout/AdminLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminNotFound from "./admin/pages/AdminNotFound";
import { AdminProvider } from "./admin/contexts/AdminContext";

// Jobs
import JobList from "./admin/pages/jobs/JobList";
import JobCreate from "./admin/pages/jobs/JobCreate";
import JobEdit from "./admin/pages/jobs/JobEdit";
import JobDetail from "./admin/pages/jobs/JobDetail";

// Internships
import InternshipList from "./admin/pages/internships/InternshipList";
import InternshipCreate from "./admin/pages/internships/InternshipCreate";
import InternshipEdit from "./admin/pages/internships/InternshipEdit";
import InternshipDetail from "./admin/pages/internships/InternshipDetail";

// Applications
import JobApplications from "./admin/pages/applications/JobApplications";
import InternshipApplications from "./admin/pages/applications/InternshipApplications";

// We need a component to handle the location check
const AppContent = () => {
  const [theme, setTheme] = useState("dark");
  const [color, setColor] = useState("orange");
  const location = useLocation();

  // Check if the current path is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleColor = () => {
    setColor(color === "purple" ? "orange" : "purple");
  };

  return (
    <div
      className={`app ${theme}`}
      style={{
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#0a0a0a",
      }}
    >
      {/* Only show Navbar if not on admin routes */}
      {!isAdminRoute && (
        <Navbar
          theme={theme}
          color={color}
          toggleTheme={toggleTheme}
          toggleColor={toggleColor}
        />
      )}

      <Routes>
        <Route path="/" element={<Landing theme={theme} color={color} />} />
        <Route
          path="/careers"
          element={<Careers theme={theme} color={color} />}
        />
        <Route
          path="/aboutus"
          element={<AboutUs theme={theme} color={color} />}
        />
        <Route
          path="/ourteam"
          element={<OurTeam theme={theme} color={color} />}
        />
        <Route
          path="/ourmission"
          element={<OurMission theme={theme} color={color} />}
        />
        <Route
          path="/ourvalues"
          element={<OurValues theme={theme} color={color} />}
        />
        <Route
          path="/support"
          element={<Support theme={theme} color={color} />}
        />
        <Route
          path="/privacy"
          element={<PrivacyPolicy theme={theme} color={color} />}
        />
        <Route
          path="/terms-of-service"
          element={<TermsOfService theme={theme} color={color} />}
        />
        {/* Routes of `for students` sections */}
        <Route
          path="/placement-guidance"
          element={<PlacementGuidance theme={theme} color={color} />}
        />
        <Route
          path="/internships"
          element={<Internships theme={theme} color={color} />}
        />
        <Route
          path="/mentorship-programs"
          element={<MentorshipPrograms theme={theme} color={color} />}
        />
        <Route
          path="/webinars"
          element={<Webinars theme={theme} color={color} />}
        />
        <Route
          path="/skills-and-roles"
          element={<SkillsAndRoles theme={theme} color={color} />}
        />
        <Route
          path="/project-support"
          element={<ProjectSupport theme={theme} color={color} />}
        />
        <Route
          path="/job-seekers"
          element={<JobSeekers theme={theme} color={color} />}
        />
        {/* Admin Routes - wrapped in AdminLayout */}
        <Route
          path="/admin"
          element={
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          }
        >
          {/* Dashboard */}
          <Route index element={<DashboardHome />} />
          <Route path="settings" element={<AdminSettings />} />

          {/* Jobs */}
          <Route path="jobs">
            <Route index element={<JobList />} />
            <Route path="create" element={<JobCreate />} />
            <Route path=":id" element={<JobDetail />} />
            <Route path=":id/edit" element={<JobEdit />} />
          </Route>

          {/* Internships */}
          <Route path="internships">
            <Route index element={<InternshipList />} />
            <Route path="create" element={<InternshipCreate />} />
            <Route path=":id" element={<InternshipDetail />} />
            <Route path=":id/edit" element={<InternshipEdit />} />
          </Route>

          {/* Applications */}
          <Route path="applications">
            <Route path="jobs" element={<JobApplications />} />
            <Route path="internships" element={<InternshipApplications />} />
            <Route index element={<Navigate to="jobs" replace />} />
          </Route>

          {/* Catch any unmatched admin routes */}
          <Route path="*" element={<AdminNotFound />} />
        </Route>
        {/* Catch-all route should be last */}
        <Route path="*" element={<NotFound theme={theme} color={color} />} />
      </Routes>

      {/* Only show Footer if not on admin routes */}
      {!isAdminRoute && <Footer theme={theme} color={color} />}
    </div>
  );
};

function App() {
  return (
    <LoaderProvider color="orange">
      <Router>
        <AppContent />
      </Router>
    </LoaderProvider>
  );
}

export default App;
