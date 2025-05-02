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
import Internships from "./components/ForStudents/Internships";
import ProjectSupport from "./components/ForStudents/ProjectSupport";
import MentorshipPrograms from "./components/ForStudents/MentorshipPrograms";
import Webinars from "./components/ForStudents/Webinars";
import SkillsAndRoles from "./components/ForStudents/SkillsAndRoles";
import JobSeekers from "./components/JobSeekers/JobSeekers";

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
import InternshipList from "./admin/pages/internships/InternshipList";
import InternshipCreate from "./admin/pages/internships/InternshipCreate";
import InternshipEdit from "./admin/pages/internships/InternshipEdit";
import InternshipDetail from "./admin/pages/internships/InternshipDetail";

// Admin Applications pages
import JobApplications from "./admin/pages/applications/JobApplications";
import InternshipApplications from "./admin/pages/applications/InternshipApplications";

// Auth components
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/Auth/AuthModal";

// Profile components
import ProfileDashboard from "./components/profile/ProfileDashboard";
import PublicProfile from "./components/profile/PublicProfile";

const AppContent = () => {
  const { isAuthenticated, user, loading, authFlowState, setAuthFlowState } =
    useAuth();
  const [theme, setTheme] = useState("dark");
  const [color, setColor] = useState("orange");
  const location = useLocation();
  const navigate = useNavigate();

  console.log("AppContent Render - Current State:", {
    isAuthenticated,
    user,
    loading,
    pathname: location.pathname,
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleColor = () => {
    setColor(color === "purple" ? "orange" : "purple");
  };

  // Effect for Admin Redirection and Protected Routes
  useEffect(() => {
    console.log("useEffect - checking auth state:", {
      isAuthenticated,
      user,
      loading,
      pathname: location.pathname,
    });
    if (!loading) {
      console.log("useEffect - Loading finished:", {
        isAuthenticated,
        user,
        pathname: location.pathname,
        userRole: user?.role, // Log user role explicitly
      });
      const isAdmin =
        user && (user.role === "admin" || user.role === "superadmin");
      const currentPath = location.pathname;

      if (currentPath.startsWith("/admin")) {
        // More specific check for admin paths
        console.log("useEffect - On Admin Path:", { isAuthenticated, isAdmin }); // <-- Add this log
        if (isAuthenticated && !isAdmin) {
          console.log(
            "useEffect - Redirecting authenticated non-admin:",
            user?.role
          ); // <-- Add this log
          navigate("/", { replace: true });
        } else if (!isAuthenticated) {
          console.log("useEffect - Redirecting unauthenticated user"); // <-- Add this log
          navigate("/", { replace: true });
        } else {
          console.log("useEffect - User is admin, allowing access"); // <-- Add this log
        }
      }
      // ... (other useEffect logic if any)
    } else {
      console.log("useEffect - Still Loading Auth State..."); // <-- Add this log
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  // Effect to open the AuthModal automatically if authFlowState is 'reset_password_form'
  useEffect(() => {
    if (authFlowState === "reset_password_form") {
      setIsAuthModalOpen(true);
    }
  }, [authFlowState]);

  const openAuthModal = (initialFlowState = "initial") => {
    setAuthFlowState(initialFlowState);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    if (authFlowState !== "reset_password_form") {
      setAuthFlowState("initial");
    }
    if (
      authFlowState === "reset_password_form" &&
      location.pathname.startsWith("/reset-password/")
    ) {
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      className={`app ${theme}`}
      style={{
        backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#0a0a0a",
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
        <Route path="/reset-password/:token" element={null} />

        {/* Profile Routes */}
        <Route
          path="/profile/dashboard"
          element={
            isAuthenticated ? (
              <ProfileDashboard theme={theme} color={color} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/profile/view/:userId"
          element={<PublicProfile theme={theme} color={color} />}
        />

        {/* Admin Routes - Fixed structure */}
        <Route
          path="/admin"
          element={
            isAuthenticated &&
            (user?.role === "admin" || user?.role === "superadmin") ? (
              <AdminProvider>
                <AdminLayout />
              </AdminProvider>
            ) : (
              <Navigate to="/" replace />
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

          <Route path="internships">
            <Route index element={<InternshipList />} />
            <Route path="create" element={<InternshipCreate />} />
            <Route path=":id" element={<InternshipDetail />} />
            <Route path=":id/edit" element={<InternshipEdit />} />
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
        theme={theme}
        color={color}
      />
    </div>
  );
};

function App() {
  return (
    <LoaderProvider color="orange">
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </LoaderProvider>
  );
}

export default App;
