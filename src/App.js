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

// Admin components and pages
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

// Import AuthProvider, useAuth, and AuthModal
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/Auth/AuthModal";

// Import Profile Components
import ProfileDashboard from "./components/profile/ProfileDashboard";
import PublicProfile from "./components/profile/PublicProfile";

// Component to handle routing and layout based on auth state and location
const AppContent = () => {
  // Use auth context to get authentication state and user data
  const { isAuthenticated, user, loading, authFlowState, setAuthFlowState } =
    useAuth();
  const [theme, setTheme] = useState("dark");
  const [color, setColor] = useState("orange");
  const location = useLocation();
  const navigate = useNavigate();

  // State to control the AuthModal's open/close state from AppContent
  // This state will be passed down to components that need to open the modal
  // Correct implementation of wrapped setter for debugging
  const [isAuthModalOpen, setIsAuthModalOpenState] = useState(false);
  const setIsAuthModalOpen = (value) => {
    console.log(
      "--- AppContent Log: Called setIsAuthModalOpen with:",
      value,
      "---"
    ); // Log the value being set
    setIsAuthModalOpenState(value); // Call the original setter function
  };

  // Check if the current path is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Check if the current path is a profile route
  const isProfileRoute = location.pathname.startsWith("/profile");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleColor = () => {
    setColor(color === "purple" ? "orange" : "purple");
  };

  // --- Effect for Admin Redirection and Protected Routes ---
  useEffect(() => {
    if (!loading) {
      const isAdmin =
        user && (user.role === "admin" || user.role === "superadmin");

      if (isAuthenticated && isAdmin) {
        if (!location.pathname.startsWith("/admin")) {
          console.log(
            "Authenticated admin detected, redirecting to /admin/dashboard"
          );
          navigate("/admin/dashboard", { replace: true });
        }
      } else if (isAuthenticated && !isAdmin) {
        if (location.pathname.startsWith("/admin")) {
          console.log(
            "Authenticated non-admin user on admin route, redirecting to /"
          );
          navigate("/", { replace: true });
        }
      } else {
        if (location.pathname.startsWith("/admin")) {
          console.log("Unauthenticated user on admin route, redirecting to /");
          navigate("/", { replace: true });
        }
      }

      // Check if user tries to access profile routes without authentication
      if (
        !isAuthenticated &&
        location.pathname.startsWith("/profile/dashboard")
      ) {
        console.log("Unauthenticated user on profile route, redirecting to /");
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, loading, navigate, location.pathname]);

  // Effect to open the AuthModal automatically if authFlowState is 'reset_password_form'
  useEffect(() => {
    if (authFlowState === "reset_password_form") {
      console.log(
        "--- AppContent Log: authFlowState is reset_password_form, setting isAuthModalOpen to true ---"
      );
      setIsAuthModalOpen(true);
    }
  }, [authFlowState]);

  // Function to open the AuthModal to a specific tab/flow state
  const openAuthModal = (
    initialFlowState = "initial",
    initialTab = "login"
  ) => {
    console.log("--- AppContent Log: Called openAuthModal ---");
    setAuthFlowState(initialFlowState);
    console.log("--- AppContent Log: Setting isAuthModalOpen to true ---");
    setIsAuthModalOpen(true);
  };

  // Effect to log when isAuthModalOpen state changes
  useEffect(() => {
    console.log(
      "--- AppContent Log: isAuthModalOpen state changed to:",
      isAuthModalOpen,
      "---"
    );
  }, [isAuthModalOpen]);

  // Function to close the AuthModal
  const closeAuthModal = () => {
    console.log("--- AppContent Log: Called closeAuthModal ---");
    console.log("--- AppContent Log: Setting isAuthModalOpen to false ---");
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

  // Show a loading indicator while the initial auth status is being checked
  if (loading) {
    return <div>Checking authentication status...</div>;
  }

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

        <Route
          path="/admin/*"
          element={
            isAuthenticated ? (
              <AdminProvider>
                <AdminLayout />
              </AdminProvider>
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<DashboardHome />} />
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
