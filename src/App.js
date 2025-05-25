// App.js
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Careers from "./pages/Careers";
import Footer from "./components/common/Footer";
import AboutUsPage from "./features/company/pages/AboutUsPage"; // Updated import
import OurTeamPage from "./features/company/pages/OurTeamPage"; // Updated import
import OurMissionPage from "./features/company/pages/OurMissionPage"; // Updated import
import OurValuesPage from "./features/company/pages/OurValuesPage"; // Updated import
import NotFound from "./pages/NotFound";
import SupportPage from "./features/static/pages/SupportPage"; // Updated import
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PremiumPrivacyPolicy from "./features/static/pages/PrivacyPolicyPage"; // Updated import
import { LoaderProvider, useLoader } from "./contexts/LoaderContext"; // Import useLoader
import Landing from "./pages/Landing";
import TermsOfServicePage from "./features/static/pages/TermsOfServicePage"; // Updated import
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

// Admin Users page
import AdminUsersPage from "./admin/pages/users/AdminUsersPage";

// Admin Analytics Pages
import UserAnalyticsPage from "./admin/pages/analytics/UserAnalyticsPage";
import JobAnalyticsPage from "./admin/pages/analytics/JobAnalyticsPage";
import ApplicationAnalyticsPage from "./admin/pages/analytics/ApplicationAnalyticsPage";

// Admin Documents Pages
import OfferLetterGeneratorPage from "./admin/pages/documents/OfferLetterGeneratorPage";
import CertificateGeneratorPage from "./admin/pages/documents/CertificateGeneratorPage";
// Admin Content Management Page
import BannerCarouselPage from "./admin/pages/ContentManagement/BannerCarouselPage";

// Auth components
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/Auth/AuthModal";

// Profile components
import ProfileDashboard from "./components/profile/ProfileDashboard";
import PublicProfile from "./components/profile/PublicProfile";
import ProfilePage from "./components/profile/ProfilePage";

// Import new Resources components
import ResourcesPage from "./components/Resources/ResourcesPage";
import SeventyQuestionsByNehaMalhotra from "./components/Resources/SeventyQuestionsByNehaMalhotra";
import ResumeWritingTips from "./components/Resources/ResumeWritingTips";
// Import Certificate Verification Page
import CertificateVerificationPage from "./pages/CertificateVerificationPage";
import ServicesPage from "./components/Services/ServicesPage"; // Import the new ServicesPage
import CallbackModal from "./components/common/CallbackModal"; // Import CallbackModal
import {
  DEFAULT_THEME,
  DEFAULT_COLOR,
  THEMES,
  COLORS,
} from "./constants/theme"; // Reverted to relative
import { ROUTES } from "./constants/routes"; // Reverted to relative

const AppContent = () => {
  const {
    isAuthenticated,
    user,
    loading: authLoading, // Renamed loading to authLoading to avoid conflict
    authFlowState,
    setAuthFlowState,
  } = useAuth();
  const { showLoaderFor } = useLoader(); // Only need showLoaderFor
  const [theme, setTheme] = useState(DEFAULT_THEME); // Use default theme constant
  const initialLoadHandled = useRef(false); // Ref to track initial load
  const [color, setColor] = useState(DEFAULT_COLOR); // Use default color constant
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false); // State for CallbackModal
  const [initialServiceForModal, setInitialServiceForModal] = useState(''); // State for pre-selected service in CallbackModal
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleOpenCallbackModal = (initialService = '') => {
    setInitialServiceForModal(initialService);
    setIsCallbackModalOpen(true);
  };

  const toggleTheme = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK); // Use theme constants
  };

  const toggleColor = () => {
    setColor(color === COLORS.PURPLE ? COLORS.ORANGE : COLORS.PURPLE); // Use color constants
  };

  useEffect(() => {
    if (authFlowState === "reset_password_form") {
      setIsAuthModalOpen(true);
    }
  }, [authFlowState]);

  // Show loader on initial app load for a fixed duration
  // useEffect(() => {
  //   if (!initialLoadHandled.current) {
  //     showLoaderFor(2000); // Show loader for 2 seconds on initial load
  //     initialLoadHandled.current = true;
  //   }
  // }, [showLoaderFor]); // Dependency on showLoaderFor is fine as it's stable

  // Removed the problematic useEffect for admin route redirection
  // useEffect(() => {
  //   if (location.pathname.startsWith("/admin")) {
  //     const isAdmin = user?.role === "admin" || user?.role === "superadmin";
  //     if (authLoading) {
  //       return;
  //     }
  //     if (!isAuthenticated) {
  //       if (location.pathname !== "/") {
  //         navigate("/", { replace: true });
  //       }
  //     } else if (!isAdmin) {
  //       navigate("/", { replace: true });
  //     }
  //   }
  // }, [isAuthenticated, user, authLoading, navigate, location.pathname]);

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

  // The existing admin loading spinner can remain, it's separate from the global loader
  if (authLoading && location.pathname.startsWith("/admin")) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className="app"
      data-theme={theme} // Set data-theme attribute
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
          onNavigate={navigate}
        />
      )}

      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Landing theme={theme} color={color} openCallbackModal={handleOpenCallbackModal} />}
        />
        <Route
          path={ROUTES.SERVICES} // Add new route for Services
          element={<ServicesPage theme={theme} color={color} openCallbackModal={handleOpenCallbackModal} />}
        />
        <Route
          path={ROUTES.CAREERS}
          element={<Careers theme={theme} color={color} />}
        />
        {/* Other 'whoarewe' routes */}
        <Route
          path={ROUTES.ABOUT_US}
          element={<AboutUsPage theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.OUR_TEAM}
          element={<OurTeamPage theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.OUR_MISSION}
          element={<OurMissionPage theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.OUR_VALUES}
          element={<OurValuesPage theme={theme} color={color} />}
        />

        <Route
          path={ROUTES.SUPPORT}
          element={<SupportPage theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.PRIVACY_POLICY}
          element={<PremiumPrivacyPolicy theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.TERMS_OF_SERVICE}
          element={<TermsOfServicePage theme={theme} color={color} />}
        />

        {/* ForStudents Routes */}
        <Route
          path={ROUTES.PLACEMENT_GUIDANCE}
          element={<PlacementGuidance theme={theme} color={color} />}
        />

        {/* Updated Internships Route (List View) */}
        <Route
          path={ROUTES.INTERNSHIPS}
          element={<InternshipPortalPage theme={theme} color={color} />}
        />
        {/* NEW: Internship Detail Page Route */}
        <Route
          path={ROUTES.INTERNSHIP_DETAIL}
          element={<InternshipDetailPage theme={theme} color={color} />}
        />

        <Route
          path={ROUTES.PROJECT_SUPPORT}
          element={<ProjectSupport theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.MENTORSHIP_PROGRAMS}
          element={<MentorshipPrograms theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.WEBINARS}
          element={<Webinars theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.SKILLS_AND_ROLES}
          element={<SkillsAndRoles theme={theme} color={color} />}
        />

        <Route
          path={ROUTES.JOB_SEEKERS}
          element={<JobSeekers theme={theme} color={color} />}
        />

        {/* NEW: Resources Routes */}
        <Route
          path={ROUTES.RESOURCES}
          element={
            <ResourcesPage
              theme={theme}
              colorStyles={{
                primary: color === "orange" ? "#ffc107" : "#8a2be2",
              }}
            />
          }
        />
        <Route
          path={ROUTES.RESOURCES_SEVENTY_QUESTIONS}
          element={
            <SeventyQuestionsByNehaMalhotra
              theme={theme}
              colorStyles={{
                primary: color === "orange" ? "#ffc107" : "#8a2be2",
              }}
            />
          }
        />
        <Route
          path={ROUTES.RESOURCES_RESUME_TIPS}
          element={
            <ResumeWritingTips
              theme={theme}
              colorStyles={{
                primary: color === "orange" ? "#ffc107" : "#8a2be2",
              }}
            />
          }
        />

        {/* This route is primarily to trigger the AuthModal via useEffect.
            The actual UI for reset is within the modal.
            Rendering null or a minimal placeholder is fine.
            Navigating away happens in closeAuthModal or upon successful reset. */}
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={<Landing theme={theme} color={color} />}
        />

        {/* Profile Routes */}
        <Route
          path={ROUTES.PROFILE}
          element={
            isAuthenticated ? (
              <ProfilePage theme={theme} color={color} />
            ) : (
              // Redirect to home and open login modal if trying to access protected profile
              <Navigate
                to={ROUTES.HOME}
                replace
                state={{ from: location, openLogin: true }}
              />
            )
          }
        />
        <Route
          path={ROUTES.PROFILE_DASHBOARD}
          element={
            isAuthenticated ? (
              <ProfileDashboard theme={theme} color={color} />
            ) : (
              // Redirect to home and open login modal if trying to access protected profile
              <Navigate
                to={ROUTES.HOME}
                replace
                state={{ from: location, openLogin: true }}
              />
            )
          }
        />
        <Route
          path={ROUTES.PROFILE_VIEW}
          element={<PublicProfile theme={theme} color={color} />}
        />

        {/* Public Certificate Verification Route */}
        <Route
          path={ROUTES.CERTIFICATE_VERIFICATION}
          element={<CertificateVerificationPage theme={theme} />} // Pass theme if needed
        />

        {/* Admin Routes */}
        <Route
          path={ROUTES.ADMIN}
          element={(() => {
            console.log("Admin Route Check:");
            console.log("  authLoading:", authLoading);
            console.log("  isAuthenticated:", isAuthenticated);
            console.log("  user:", user);
            console.log("  user role:", user?.role);
            const isAdmin =
              user?.role === "admin" || user?.role === "superadmin";
            console.log("  isAdmin:", isAdmin);

            if (authLoading) {
              return (
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              );
            } else if (isAuthenticated && isAdmin) {
              return (
                <AdminProvider>
                  {" "}
                  <AdminLayout />{" "}
                </AdminProvider>
              );
            } else {
              return (
                <Navigate
                  to={ROUTES.HOME}
                  replace
                  state={{ from: location, openLogin: !isAuthenticated }}
                />
              );
            }
          })()}
        >
          <Route
            index
            element={
              <Navigate to={ROUTES.ADMIN_DASHBOARD.split("/").pop()} replace />
            }
          />{" "}
          {/* Relative path for nested route */}
          <Route
            path={ROUTES.ADMIN_DASHBOARD.split("/").pop()}
            element={<DashboardHome />}
          />
          <Route
            path={ROUTES.ADMIN_SETTINGS.split("/").pop()}
            element={<AdminSettings />}
          />
          <Route path={ROUTES.ADMIN_JOBS.split("/").pop()}>
            <Route index element={<JobList />} />
            <Route
              path={ROUTES.ADMIN_JOBS_CREATE.split("/").pop()}
              element={<JobCreate />}
            />
            <Route
              path={ROUTES.ADMIN_JOB_DETAIL.split("/").pop()}
              element={<JobDetail />}
            />
            <Route
              path={ROUTES.ADMIN_JOB_EDIT.substring(
                ROUTES.ADMIN_JOBS.length + 1
              )}
              element={<JobEdit />}
            />
          </Route>
          {/* Ensure admin internship routes use distinct names if needed */}
          <Route path={ROUTES.ADMIN_INTERNSHIPS.split("/").pop()}>
            <Route index element={<AdminInternshipList />} />
            <Route
              path={ROUTES.ADMIN_INTERNSHIPS_CREATE.split("/").pop()}
              element={<AdminInternshipCreate />}
            />
            <Route
              path={ROUTES.ADMIN_INTERNSHIP_DETAIL.split("/").pop()}
              element={<AdminInternshipDetail />}
            />
            <Route
              path={ROUTES.ADMIN_INTERNSHIP_EDIT.substring(
                ROUTES.ADMIN_INTERNSHIPS.length + 1
              )}
              element={<AdminInternshipEdit />}
            />
          </Route>
          <Route path={ROUTES.ADMIN_APPLICATIONS.split("/").pop()}>
            <Route
              path={ROUTES.ADMIN_APPLICATIONS_JOBS.split("/").pop()}
              element={<JobApplications />}
            />
            <Route
              path={ROUTES.ADMIN_APPLICATIONS_INTERNSHIPS.split("/").pop()}
              element={<InternshipApplications />}
            />
            <Route
              index
              element={
                <Navigate
                  to={ROUTES.ADMIN_APPLICATIONS_JOBS.split("/").pop()}
                  replace
                />
              }
            />
          </Route>
          {/* Admin Users Route */}
          <Route
            path={ROUTES.ADMIN_USERS.split("/").pop()}
            element={<AdminUsersPage />}
          />
          {/* Admin Analytics Routes */}
          {/* Parent route for /admin/analytics, could have an index page or redirect */}
          <Route path={ROUTES.ADMIN_ANALYTICS.split("/").pop()}>
            <Route
              index
              element={
                <Navigate
                  to={ROUTES.ADMIN_ANALYTICS_USERS.split("/").pop()}
                  replace
                />
              }
            />
            <Route
              path={ROUTES.ADMIN_ANALYTICS_USERS.split("/").pop()}
              element={<UserAnalyticsPage />}
            />
            <Route
              path={ROUTES.ADMIN_ANALYTICS_JOBS.split("/").pop()}
              element={<JobAnalyticsPage />}
            />
            <Route
              path={ROUTES.ADMIN_ANALYTICS_APPLICATIONS.split("/").pop()}
              element={<ApplicationAnalyticsPage />}
            />
          </Route>
          {/* Admin Documents Routes */}
          <Route path={ROUTES.ADMIN_DOCUMENTS.split("/").pop()}>
            <Route
              index
              element={
                <Navigate
                  to={ROUTES.ADMIN_DOCUMENTS_OFFER_LETTER.split("/").pop()}
                  replace
                />
              }
            />
            <Route
              path={ROUTES.ADMIN_DOCUMENTS_OFFER_LETTER.split("/").pop()}
              element={<OfferLetterGeneratorPage />}
            />
            <Route
              path={ROUTES.ADMIN_DOCUMENTS_CERTIFICATE.split("/").pop()}
              element={<CertificateGeneratorPage />}
            />
          </Route>
          {/* NEW: Admin Content Management Route */}
          <Route
            path={ROUTES.ADMIN_CONTENT_MANAGEMENT.split("/").pop()}
            element={<BannerCarouselPage />}
          />
          <Route path={ROUTES.NOT_FOUND} element={<AdminNotFound />} />
        </Route>

        <Route
          path={ROUTES.NOT_FOUND}
          element={<NotFound theme={theme} color={color} />}
        />
      </Routes>

      {!isAdminRoute && (
        <Footer
          theme={theme}
          color={color}
          toggleTheme={toggleTheme}
          toggleColor={toggleColor}
          openAuthModal={openAuthModal}
          isAuthenticated={isAuthenticated}
          user={user}
          onNavigate={navigate}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        theme={theme} // Pass theme to AuthModal
        color={color} // Pass color to AuthModal
        // initialFlowState is managed by useAuth now, modal can subscribe or receive it
      />
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        servicesList={[]} // Passing empty array for now, can be sourced globally later
        theme={theme}
        initialSelectedService={initialServiceForModal}
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
