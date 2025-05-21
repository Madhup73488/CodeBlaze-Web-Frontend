import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as adminApi from "../utils/api";

const initialState = {
  hasAdminAccess: false,
  adminAccessError: null,
  isAdminChecking: true,
  theme: localStorage.getItem("adminTheme") || "light",
  sidebarCollapsed: false,
  isMobile: false,
  currentSection: "dashboard",
  notifications: [],
  unreadNotificationCount: 0,
  dashboardStats: null,
  users: [],
  jobPostings: [],
  internshipPostings: [],
  jobApplications: [],
  internshipApplications: [],
  settings: null,
  analytics: {
    users: null,
    jobs: null,
    applications: null,
  },
  pagination: { users: { total: 0, page: 1, limit: 10, pages: 1 }, jobPostings: { total: 0, page: 1, limit: 10, pages: 1 }, internshipPostings: { total: 0, page: 1, limit: 10, pages: 1 }, jobApplications: { total: 0, page: 1, limit: 10, pages: 1 }, internshipApplications: { total: 0, page: 1, limit: 10, pages: 1 } },
  loadingStates: { dashboardStats: false, users: false, jobPostings: false, internshipPostings: false, jobApplications: false, internshipApplications: false, settings: false, userAnalytics: false, jobAnalytics: false, applicationAnalytics: false },
  errors: {},
};

const actionTypes = {
  SET_ADMIN_ACCESS: "SET_ADMIN_ACCESS",
  SET_ADMIN_ACCESS_ERROR: "SET_ADMIN_ACCESS_ERROR",
  SET_ADMIN_CHECKING: "SET_ADMIN_CHECKING",
  SET_THEME: "SET_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  SET_MOBILE: "SET_MOBILE",
  SET_CURRENT_SECTION: "SET_CURRENT_SECTION",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",
  SET_DASHBOARD_STATS: "SET_DASHBOARD_STATS",
  SET_USERS: "SET_USERS",
  SET_JOB_POSTINGS: "SET_JOB_POSTINGS",
  SET_INTERNSHIP_POSTINGS: "SET_INTERNSHIP_POSTINGS",
  SET_JOB_APPLICATIONS: "SET_JOB_APPLICATIONS",
  SET_INTERNSHIP_APPLICATIONS: "SET_INTERNSHIP_APPLICATIONS",
  SET_SETTINGS: "SET_SETTINGS",
  SET_USER_ANALYTICS: "SET_USER_ANALYTICS",
  SET_JOB_ANALYTICS: "SET_JOB_ANALYTICS",
  SET_APPLICATION_ANALYTICS: "SET_APPLICATION_ANALYTICS",
  SET_SPECIFIC_LOADING: "SET_SPECIFIC_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  BATCH_UPDATE: "BATCH_UPDATE",
};

function adminReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_STATS: return { ...state, dashboardStats: action.payload };
    case actionTypes.SET_USER_ANALYTICS: return { ...state, analytics: { ...state.analytics, users: action.payload } };
    case actionTypes.SET_JOB_ANALYTICS: return { ...state, analytics: { ...state.analytics, jobs: action.payload } };
    case actionTypes.SET_APPLICATION_ANALYTICS: return { ...state, analytics: { ...state.analytics, applications: action.payload } };
    case actionTypes.SET_ADMIN_ACCESS: return { ...state, hasAdminAccess: action.payload, adminAccessError: null };
    case actionTypes.SET_ADMIN_ACCESS_ERROR: return { ...state, hasAdminAccess: false, adminAccessError: action.payload };
    case actionTypes.SET_ADMIN_CHECKING: return { ...state, isAdminChecking: action.payload };
    case actionTypes.SET_THEME: return { ...state, theme: action.payload };
    case actionTypes.TOGGLE_SIDEBAR: return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case actionTypes.SET_MOBILE: return { ...state, isMobile: action.payload };
    case actionTypes.SET_CURRENT_SECTION: return { ...state, currentSection: action.payload };
    case actionTypes.SET_NOTIFICATIONS: return { ...state, notifications: action.payload, unreadNotificationCount: action.payload.filter(n => !n.read).length };
    case actionTypes.ADD_NOTIFICATION: return { ...state, notifications: [action.payload, ...state.notifications], unreadNotificationCount: state.unreadNotificationCount + 1 };
    case actionTypes.MARK_NOTIFICATION_READ: return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n), unreadNotificationCount: Math.max(0, state.unreadNotificationCount - 1) };
    case actionTypes.CLEAR_NOTIFICATIONS: return { ...state, notifications: [], unreadNotificationCount: 0 };
    case actionTypes.SET_SPECIFIC_LOADING: return { ...state, loadingStates: { ...state.loadingStates, [action.payload.key]: action.payload.value } };
    case actionTypes.SET_ERROR: return { ...state, errors: { ...state.errors, [action.payload.key]: action.payload.value } };
    case actionTypes.CLEAR_ERROR:
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return { ...state, errors: newErrors };
    case actionTypes.BATCH_UPDATE: return action.payload.reduce((acc, curr) => adminReducer(acc, curr), state);
    default: return state;
  }
}

const AdminContext = createContext();
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const { user, isAuthenticated: mainIsAuthenticated, loading: authLoading } = useAuth();

  const clearError = useCallback((key) => dispatch({ type: actionTypes.CLEAR_ERROR, payload: key }), []); // Removed dispatch

  const checkAdminAccess = useCallback(async () => {
    dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: true });
    try {
      if (authLoading) {
        console.log("Auth still loading, checkAdminAccess will wait for next effect run.");
      }

      if (!mainIsAuthenticated || !user) {
        dispatch({ type: actionTypes.BATCH_UPDATE, payload: [
          { type: actionTypes.SET_ADMIN_ACCESS, payload: false },
          { type: actionTypes.SET_ADMIN_ACCESS_ERROR, payload: "Authentication required for admin access." },
        ]});
      } else {
        const hasAccess = ["admin", "superadmin"].includes(user.role);
        dispatch({ type: actionTypes.SET_ADMIN_ACCESS, payload: hasAccess });
        if (!hasAccess) {
          dispatch({ type: actionTypes.SET_ADMIN_ACCESS_ERROR, payload: `User role "${user.role}" does not have admin privileges.` });
        } else {
          dispatch({ type: actionTypes.CLEAR_ERROR, payload: 'adminAccess' });
        }
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
      dispatch({ type: actionTypes.BATCH_UPDATE, payload: [
        { type: actionTypes.SET_ADMIN_ACCESS, payload: false },
        { type: actionTypes.SET_ADMIN_ACCESS_ERROR, payload: `Error checking admin access: ${error.message}` },
      ]});
    } finally {
      dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: false });
    }
  }, [user, mainIsAuthenticated, authLoading]); // Removed dispatch, it's stable

  useEffect(() => { checkAdminAccess(); }, [checkAdminAccess]);
  
  const handleResize = useCallback(() => {
      const mobile = window.innerWidth < 768;
      dispatch({ type: actionTypes.SET_MOBILE, payload: mobile });
      if (!mobile && state.isMobile && state.sidebarCollapsed) { // Example: if resizing from mobile to desktop and sidebar was "mobile-collapsed"
          // Potentially adjust sidebar state if needed, though AdminLayout handles most of this
      }
  }, [state.isMobile, state.sidebarCollapsed]); // Removed dispatch

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const fetchNotifications = useCallback(async () => { /* ... */ }, []); // Removed dispatch
  const markNotificationAsRead = useCallback((id) => { /* ... */ }, []); // Removed dispatch
  
  const setTheme = useCallback((theme) => {
    const newTheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("adminTheme", newTheme);
    dispatch({ type: actionTypes.SET_THEME, payload: newTheme });
  }, []); // Removed dispatch

  const toggleSidebar = useCallback(() => dispatch({ type: actionTypes.TOGGLE_SIDEBAR }), []); // Removed dispatch

  const loadDashboardStats = useCallback(async () => {
    dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'dashboardStats', value: true } });
    try {
      const data = await adminApi.default.fetchDashboardStats();
      dispatch({ type: actionTypes.SET_DASHBOARD_STATS, payload: data.data });
      dispatch({ type: actionTypes.CLEAR_ERROR, payload: 'dashboardStats' });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: { key: 'dashboardStats', value: error.message } });
    } finally {
      dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'dashboardStats', value: false } });
    }
  }, []); // Removed dispatch

  const wrappedFetchUserAnalytics = useCallback(async () => {
    dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'userAnalytics', value: true } });
    try {
      const data = await adminApi.default.fetchUserAnalytics();
      dispatch({ type: actionTypes.SET_USER_ANALYTICS, payload: data.data });
      return data.data;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: { key: 'userAnalytics', value: error.message } });
      throw error;
    } finally {
      dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'userAnalytics', value: false } });
    }
  }, []); // Removed dispatch

  const wrappedFetchJobAnalytics = useCallback(async () => {
    dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'jobAnalytics', value: true } });
    try {
      const data = await adminApi.default.fetchJobAnalytics();
      dispatch({ type: actionTypes.SET_JOB_ANALYTICS, payload: data.data });
      return data.data;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: { key: 'jobAnalytics', value: error.message } });
      throw error;
    } finally {
      dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'jobAnalytics', value: false } });
    }
  }, []); // Removed dispatch

  const wrappedFetchApplicationAnalytics = useCallback(async () => {
    dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'applicationAnalytics', value: true } });
    try {
      const data = await adminApi.default.fetchApplicationAnalytics();
      dispatch({ type: actionTypes.SET_APPLICATION_ANALYTICS, payload: data.data });
      return data.data;
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: { key: 'applicationAnalytics', value: error.message } });
      throw error;
    } finally {
      dispatch({ type: actionTypes.SET_SPECIFIC_LOADING, payload: { key: 'applicationAnalytics', value: false } });
    }
  }, []); // Removed dispatch

  const contextValue = useMemo(() => ({
    currentUser: user,
    isAuthenticated: mainIsAuthenticated && state.hasAdminAccess,
    isAdmin: user?.role === "admin",
    isSuperAdmin: user?.role === "superadmin",
    hasRole: (...roles) => user && roles.includes(user.role),
    hasAdminAccess: state.hasAdminAccess,
    adminAccessError: state.adminAccessError,
    isAdminChecking: state.isAdminChecking,
    theme: state.theme,
    sidebarCollapsed: state.sidebarCollapsed,
    isMobile: state.isMobile,
    currentSection: state.currentSection,
    notifications: state.notifications,
    unreadNotificationCount: state.unreadNotificationCount,
    dashboardStats: state.dashboardStats,
    users: state.users,
    jobPostings: state.jobPostings,
    internshipPostings: state.internshipPostings,
    jobApplications: state.jobApplications,
    internshipApplications: state.internshipApplications,
    settings: state.settings,
    analytics: state.analytics,
    pagination: state.pagination,
    overallLoading: authLoading || state.isAdminChecking,
    isSpecificLoading: Object.values(state.loadingStates).some(Boolean),
    loadingStates: state.loadingStates,
    errors: state.errors,
    getError: (key) => state.errors[key],
    checkAdminAccess,
    setTheme,
    toggleSidebar,
    setCurrentSection: (section) => dispatch({ type: actionTypes.SET_CURRENT_SECTION, payload: section }),
    fetchDashboardStats: loadDashboardStats,
    fetchUserAnalytics: wrappedFetchUserAnalytics,
    fetchJobAnalytics: wrappedFetchJobAnalytics,
    fetchApplicationAnalytics: wrappedFetchApplicationAnalytics,
    fetchUsers: adminApi.default.fetchUsers,
    fetchJobPostings: adminApi.default.fetchAdminJobs,
    fetchInternshipPostings: adminApi.default.fetchAdminInternships,
    fetchJobApplications: adminApi.default.fetchAdminJobApplications,
    fetchInternshipApplications: adminApi.default.fetchAdminInternshipApplications,
    fetchSettings: adminApi.default.fetchAdminSettings,
    updateUser: adminApi.default.updateUser,
    deleteUser: adminApi.default.deleteUser,
    createJobAdmin: adminApi.default.createJobAdmin,
    updateJobAdmin: adminApi.default.updateJobAdmin,
    deleteJobAdmin: adminApi.default.deleteJobAdmin,
    featureJob: adminApi.default.featureJob,
    featureInternship: adminApi.default.featureInternship,
    updateApplicationStatus: adminApi.default.updateApplicationStatus,
    updateAdminSettings: adminApi.default.updateAdminSettings,
    fetchNotifications,
    markNotificationAsRead,
    clearError,
  }), [user, mainIsAuthenticated, authLoading, state, setTheme, toggleSidebar, clearError, checkAdminAccess, fetchNotifications, markNotificationAsRead, loadDashboardStats, wrappedFetchUserAnalytics, wrappedFetchJobAnalytics, wrappedFetchApplicationAnalytics, handleResize]); // Added handleResize to useMemo deps

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
};

export default AdminContext;
