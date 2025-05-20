// App.js
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Careers from "./pages/Careers";
import Footer from "./components/common/Footer";
import AboutUs from "./components/whoarewe/AboutUs";
import OurTeam from "./components/whoarewe/OurTeam";
import OurMission from "./components/whoarewe/OurMission";
import OurValues from "./components/whoarewe/OurValues";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { LoaderProvider } from "./contexts/LoaderContext";
import Landing from "./pages/Landing";
import TermsOfService from "./pages/TermsOfService";
import PlacementGuidance from "./components/ForStudents/PlacementGuidance";
// import Internships from "./components/ForStudents/Internships"; // This will be replaced
import ProjectSupport from "./components/ForStudents/ProjectSupport";
import MentorshipPrograms from "./components/ForStudents/MentorshipPrograms";
import Webinars from "./components/ForStudents/Webinars";
import SkillsAndRoles from "./components/ForStudents/SkillsAndRoles";
import JobSeekers from "./components/JobSeekers/JobSeekers";

// Import the new InternshipPortalPage and InternshipDetailPage
import InternshipPortalPage from "./components/Internships/InternshipPortal"; // Adjust path if necessary
import InternshipDetailPage from "./components/Internships/InternshipDetailPage"; // Make sure this path is correct

// Admin components
import AdminLayout from "./admin/components/layout/AdminLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminNotFound from "./admin/pages/AdminNotFound";
import { AdminProvider } from "./admin/contexts/AdminContext";

// Admin Jobs pages
import JobList from "./admin/pages/jobs/JobList";
import JobCreate from "./admin/pages/jobs/JobCreate";
import JobEdit from "./admin/pages/jobs/JobEdit";
import JobDetail from "./admin/pages/jobs/JobDetail";

// Admin Internships pages
import AdminInternshipList from "./admin/pages/internships/InternshipList"; // Renamed to avoid conflict if needed
import AdminInternshipCreate from "./admin/pages/internships/InternshipCreate"; // Renamed
import AdminInternshipEdit from "./admin/pages/internships/InternshipEdit"; // Renamed
import AdminInternshipDetail from "./admin/pages/internships/InternshipDetail"; // Renamed

// Admin Applications pages
import JobApplications from "./admin/pages/applications/JobApplications";
import InternshipApplications from "./admin/pages/applications/InternshipApplications";

// Auth components
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/Auth/AuthModal";

// Profile components
import ProfileDashboard from "./components/profile/ProfileDashboard";
import PublicProfile from "./components/profile/PublicProfile";
import ProfilePage from "./components/profile/ProfilePage";

const AppContent = () => {
  const { isAuthenticated, user, loading, authFlowState, setAuthFlowState } =
    useAuth();
  const [theme, setTheme] = useState("dark"); // Your existing theme state
  const [color, setColor] = useState("orange"); // Your existing color state
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleColor = () => {
    setColor(color === "purple" ? "orange" : "purple");
  };

  useEffect(() => {
    if (authFlowState === "reset_password_form") {
      setIsAuthModalOpen(true);
    }
  }, [authFlowState]);

  useEffect(() => {
    if (!loading && location.pathname.startsWith("/admin")) {
      const isAdmin = user?.role === "admin" || user?.role === "superadmin";

      if (!isAuthenticated) {
        const timer = setTimeout(() => {
          if (!isAuthenticated) {
            // Re-check after timeout
            // If still not authenticated and trying to access admin, redirect or show auth modal
            if (location.pathname !== "/") {
              // Avoid redirect loop if already on /
              navigate("/", { replace: true }); // Or openAuthModal('login');
            }
          }
        }, 500); // Delay to allow auth state to fully propagate
        return () => clearTimeout(timer);
      } else if (!isAdmin) {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  const openAuthModal = (initialFlowState = "initial") => {
    setAuthFlowState(initialFlowState);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    // Only reset if it's not a persistent state like password reset success message
    if (
      authFlowState !== "reset_password_form" &&
      authFlowState !== "password_reset_success"
    ) {
      setAuthFlowState("initial");
    }
    // If user closes modal during reset password flow triggered by URL, navigate away from token URL
    if (
      authFlowState === "reset_password_form" &&
      location.pathname.startsWith("/reset-password/")
    ) {
      navigate("/", { replace: true });
    }
  };

  // Effect to handle the /reset-password/:token route
  useEffect(() => {
    if (location.pathname.startsWith("/reset-password/")) {
      // The token is part of the path, e.g., /reset-password/someTokenValue
      // Extract token if necessary, though AuthModal might handle it via authFlowState
      setAuthFlowState("reset_password_form");
      setIsAuthModalOpen(true);
    }
  }, [location.pathname, setAuthFlowState]);

  if (loading && location.pathname.startsWith("/admin")) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`app ${theme}`}
      style={{
        // These styles might be better handled by CSS classes for 'light' and 'dark' themes
        // defined in a global stylesheet for consistency.
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#0a0a0a",
        minHeight: "100vh", // Ensure the div takes at least full viewport height
      }}
    >
      {!isAdminRoute && (
        <Navbar
          theme={theme}
          color={color}
          toggleTheme={toggleTheme}
          toggleColor={toggleColor}
          openAuthModal={openAuthModal}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}

      <Routes>
        <Route path="/" element={<Landing theme={theme} color={color} />} />
        <Route
          path="/careers"
          element={<Careers theme={theme} color={color} />}
        />
        {/* Other 'whoarewe' routes */}
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

        {/* ForStudents Routes */}
        <Route
          path="/placement-guidance"
          element={<PlacementGuidance theme={theme} color={color} />}
        />

        {/* Updated Internships Route (List View) */}
        <Route
          path="/internships"
          element={<InternshipPortalPage theme={theme} color={color} />}
        />
        {/* NEW: Internship Detail Page Route */}
        <Route
          path="/internship/:id"
          element={<InternshipDetailPage theme={theme} color={color} />}
        />

        <Route
          path="/project-support"
          element={<ProjectSupport theme={theme} color={color} />}
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
          path="/job-seekers"
          element={<JobSeekers theme={theme} color={color} />}
        />

        {/* This route is primarily to trigger the AuthModal via useEffect.
            The actual UI for reset is within the modal.
            Rendering null or a minimal placeholder is fine.
            Navigating away happens in closeAuthModal or upon successful reset. */}
        <Route
          path="/reset-password/:token"
          element={<Landing theme={theme} color={color} />}
        />

        {/* Profile Routes */}
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <ProfilePage theme={theme} color={color} />
            ) : (
              // Redirect to home and open login modal if trying to access protected profile
              <Navigate
                to="/"
                replace
                state={{ from: location, openLogin: true }}
              />
            )
          }
        />
        <Route
          path="/profile/dashboard"
          element={
            isAuthenticated ? (
              <ProfileDashboard theme={theme} color={color} />
            ) : (
              // Redirect to home and open login modal if trying to access protected profile
              <Navigate
                to="/"
                replace
                state={{ from: location, openLogin: true }}
              />
            )
          }
        />
        <Route
          path="/profile/view/:userId"
          element={<PublicProfile theme={theme} color={color} />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated &&
            (user?.role === "admin" || user?.role === "superadmin") ? (
              <AdminProvider>
                {" "}
                <AdminLayout />{" "}
              </AdminProvider>
            ) : (
              // If not authenticated or not admin, redirect.
              // Consider showing a "not authorized" message or redirecting to login.
              <Navigate
                to="/"
                replace
                state={{ from: location, openLogin: !isAuthenticated }}
              />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="settings" element={<AdminSettings />} />

          <Route path="jobs">
            <Route index element={<JobList />} />
            <Route path="create" element={<JobCreate />} />
            <Route path=":id" element={<JobDetail />} />
            <Route path=":id/edit" element={<JobEdit />} />
          </Route>

          {/* Ensure admin internship routes use distinct names if needed */}
          <Route path="internships">
            <Route index element={<AdminInternshipList />} />
            <Route path="create" element={<AdminInternshipCreate />} />
            <Route path=":id" element={<AdminInternshipDetail />} />
            <Route path=":id/edit" element={<AdminInternshipEdit />} />
          </Route>

          <Route path="applications">
            <Route path="jobs" element={<JobApplications />} />
            <Route path="internships" element={<InternshipApplications />} />
            <Route index element={<Navigate to="jobs" replace />} />
          </Route>

          <Route path="*" element={<AdminNotFound />} />
        </Route>

        <Route path="*" element={<NotFound theme={theme} color={color} />} />
      </Routes>

      {!isAdminRoute && <Footer theme={theme} color={color} />}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        theme={theme} // Pass theme to AuthModal
        color={color} // Pass color to AuthModal
        // initialFlowState is managed by useAuth now, modal can subscribe or receive it
      />
    </div>
  );
};

function App() {
  return (
    <LoaderProvider color="orange">
      {" "}
      {/* You can pass your dynamic color here if needed */}
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </LoaderProvider>
  );
}

export default App;
