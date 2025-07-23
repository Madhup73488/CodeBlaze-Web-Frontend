// App.js
import { useState, useEffect } from "react"; // Removed useRef
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Careers from "./pages/Careers";
import Footer from "./components/common/Footer";
import AboutUsPage from "./features/company/pages/AboutUsPage";
import OurTeamPage from "./features/company/pages/OurTeamPage";
import OurMissionPage from "./features/company/pages/OurMissionPage";
import OurValuesPage from "./features/company/pages/OurValuesPage";
import NotFound from "./pages/NotFound";
import SupportPage from "./features/static/pages/SupportPage";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PremiumPrivacyPolicy from "./features/static/pages/PrivacyPolicyPage";
import { LoaderProvider } from "./contexts/LoaderContext"; 
import Landing from "./pages/Landing";
import TermsOfServicePage from "./features/static/pages/TermsOfServicePage";
import PlacementGuidance from "./components/ForStudents/PlacementGuidance";
import ProjectSupport from "./components/ForStudents/ProjectSupport";
import MentorshipPrograms from "./components/ForStudents/MentorshipPrograms";
import Webinars from "./components/ForStudents/Webinars";
import SkillsAndRoles from "./components/ForStudents/SkillsAndRoles";
import JobSeekers from "./components/JobSeekers/JobSeekers";
import InternshipPortalPage from "./components/Internships/InternshipPortal";
import InternshipDetailPage from "./components/ForStudents/InternshipDetailPage";
import CancellationAndRefundPolicy from "./pages/CancellationAndRefundPolicy";
import ShippingAndDeliveryPolicy from "./pages/ShippingAndDeliveryPolicy";
import AdminLayout from "./admin/components/layout/AdminLayout";
import DashboardHome from "./admin/pages/DashboardHome";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminNotFound from "./admin/pages/AdminNotFound";
import { AdminProvider } from "./admin/contexts/AdminContext";
import JobList from "./admin/pages/jobs/JobList";
import JobCreate from "./admin/pages/jobs/JobCreate";
import JobEdit from "./admin/pages/jobs/JobEdit";
import JobDetail from "./admin/pages/jobs/JobDetail";
import ConnectAccess from "./admin/pages/ConnectAccess";
import AdminInternshipList from "./admin/pages/internships/InternshipList";
import AdminInternshipCreate from "./admin/pages/internships/InternshipCreate";
import AdminInternshipEdit from "./admin/pages/internships/InternshipEdit";
import AdminInternshipDetail from "./admin/pages/internships/InternshipDetail";
import JobApplications from "./admin/pages/applications/JobApplications";
import InternshipApplications from "./admin/pages/applications/InternshipApplications";
import AdminUsersPage from "./admin/pages/users/AdminUsersPage";
import UserAnalyticsPage from "./admin/pages/analytics/UserAnalyticsPage";
import JobAnalyticsPage from "./admin/pages/analytics/JobAnalyticsPage";
import ApplicationAnalyticsPage from "./admin/pages/analytics/ApplicationAnalyticsPage";
import OfferLetterGeneratorPage from "./admin/pages/documents/OfferLetterGeneratorPage";
import CertificateGeneratorPage from "./admin/pages/documents/CertificateGeneratorPage";
import BannerCarouselPage from "./admin/pages/ContentManagement/BannerCarouselPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { WorkBagProvider } from "./contexts/WorkBagContext";
import AuthModal from "./components/Auth/AuthModal";
import WorkBagModal from "./components/common/WorkBagModal";
import ProfileDashboard from "./components/profile/ProfileDashboard";
import PublicProfile from "./components/profile/PublicProfile";
import ProfilePage from "./components/profile/ProfilePage";
import ResourcesPage from "./components/Resources/ResourcesPage";
import SeventyQuestionsByNehaMalhotra from "./components/Resources/SeventyQuestionsByNehaMalhotra";
import ResumeWritingTips from "./components/Resources/ResumeWritingTips";
import CertificateVerificationPage from "./pages/CertificateVerificationPage";
import ServicesPage from "./components/Services/ServicesPage";
import CallbackModal from "./components/common/CallbackModal";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import {
  DEFAULT_THEME,
  DEFAULT_COLOR,
  THEMES,
  COLORS,
} from "./constants/theme";
import { ROUTES } from "./constants/routes";
import OAuthCallbackPage from "./pages/OAuthCallbackPage"; 
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ScrollToTop from "./components/common/ScrollToTop";


const AppContent = () => {
  const {
    isAuthenticated,
    user,
    loading: authLoading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  } = useAuth();
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const location = useLocation();
  const navigate = useNavigate();
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [initialServiceForModal, setInitialServiceForModal] = useState('');
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleOpenCallbackModal = (initialService = '') => {
    setInitialServiceForModal(initialService);
    setIsCallbackModalOpen(true);
  };

  const toggleTheme = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  const toggleColor = () => {
    setColor(color === COLORS.PURPLE ? COLORS.ORANGE : COLORS.PURPLE);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  
  if (authLoading && !isAdminRoute) { 
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className="app"
      data-theme={theme}
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

      <ScrollToTop />
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Landing theme={theme} color={color} openCallbackModal={handleOpenCallbackModal} />}
        />
        <Route
          path={ROUTES.SERVICES}
          element={<ServicesPage theme={theme} color={color} openCallbackModal={handleOpenCallbackModal} />}
        />
        <Route
          path={ROUTES.CAREERS}
          element={<Careers theme={theme} color={color} />}
        />
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
        <Route
          path={ROUTES.PLACEMENT_GUIDANCE}
          element={<PlacementGuidance theme={theme} color={color} />}
        />
        <Route
          path={ROUTES.INTERNSHIPS}
          element={<InternshipPortalPage theme={theme} color={color} />}
        />
        <Route
          path="/internships/:id"
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
        <Route
          path="/cancellation-and-refund-policy"
          element={<CancellationAndRefundPolicy theme={theme} />}
        />
        <Route
          path="/shipping-and-delivery-policy"
          element={<ShippingAndDeliveryPolicy theme={theme} />}
        />
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
        <Route
          path={ROUTES.RESET_PASSWORD} 
          element={<ResetPasswordPage />} 
        />
         <Route 
          path="/oauth-callback" 
          element={<OAuthCallbackPage />} 
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            isAuthenticated ? (
              <ProfilePage theme={theme} color={color} />
            ) : (
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
        <Route
          path={ROUTES.CERTIFICATE_VERIFICATION}
          element={<CertificateVerificationPage theme={theme} />}
        />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        {/* Admin Routes */}
        <Route
          path={ROUTES.ADMIN}
          element={(() => {
            // Use user object from useAuth() in this render cycle for the check
            const currentUserFromAuth = user; 
            const currentAuthLoadingState = authLoading;
            const currentIsAuthenticatedState = isAuthenticated;

            console.log("[App.js Admin Route Guard] Current Path:", location.pathname);
            console.log("[App.js Admin Route Guard] authLoading:", currentAuthLoadingState);
            console.log("[App.js Admin Route Guard] isAuthenticated:", currentIsAuthenticatedState);
            console.log("[App.js Admin Route Guard] user object:", JSON.stringify(currentUserFromAuth));
            console.log("[App.js Admin Route Guard] user.roles:", currentUserFromAuth?.roles);

            const userIsAdmin = currentUserFromAuth && 
                                currentUserFromAuth.roles && 
                                Array.isArray(currentUserFromAuth.roles) &&
                                (currentUserFromAuth.roles.includes('admin') || currentUserFromAuth.roles.includes('superadmin'));
            
            console.log("[App.js Admin Route Guard] Calculated userIsAdmin:", userIsAdmin);

            if (currentAuthLoadingState) {
              console.log("[App.js Admin Route Guard] Decision: Show loading spinner (authLoading is true)");
              return (
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              );
            } else if (currentIsAuthenticatedState && userIsAdmin) {
              console.log("[App.js Admin Route Guard] Decision: Grant access to AdminLayout");
              return (
                <AdminProvider>
                  <AdminLayout />
                </AdminProvider>
              );
            } else {
              console.log("[App.js Admin Route Guard] Decision: Redirect to HOME. isAuthenticated:", currentIsAuthenticatedState, "userIsAdmin:", userIsAdmin);
              return (
                <Navigate
                  to={ROUTES.HOME}
                  replace
                  state={{ from: location, openLogin: !currentIsAuthenticatedState }}
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
          />
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
          <Route
            path={ROUTES.ADMIN_USERS.split("/").pop()}
            element={<AdminUsersPage />}
          />
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
          <Route
            path={ROUTES.ADMIN_CONTENT_MANAGEMENT.split("/").pop()}
            element={<BannerCarouselPage />}
          />
          <Route
            path="connect-access"
            element={<ConnectAccess />}
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
        theme={theme}
        color={color}
      />
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        servicesList={[]}
        theme={theme}
        initialSelectedService={initialServiceForModal}
      />
      <WorkBagModal />
    </div>
  );
};

function App() {
  return (
    <LoaderProvider color="orange">
      <AuthProvider>
        <WorkBagProvider>
          <AppContent />
        </WorkBagProvider>
      </AuthProvider>
    </LoaderProvider>
  );
}

export default App;
