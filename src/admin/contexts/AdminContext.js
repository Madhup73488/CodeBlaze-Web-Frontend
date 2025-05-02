import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchDashboardStats,
  fetchUsers,
  fetchAdminJobs as fetchJobPostings,
  fetchAdminInternships as fetchInternshipPostings,
  fetchAdminJobApplications as fetchJobApplications,
  fetchAdminInternshipApplications as fetchInternshipApplications,
  fetchAdminSettings as fetchSettings,
  fetchUserAnalytics,
  fetchJobAnalytics,
  fetchApplicationAnalytics,
  updateUser,
  deleteUser,
  createJobAdmin,
  updateJobAdmin,
  deleteJobAdmin,
  featureJob,
  featureInternship,
  updateApplicationStatus,
  updateAdminSettings,
} from "../utils/api";

// Initial state for the Admin Context
const initialState = {
  hasAdminAccess: false,
  adminAccessError: null,
  isAdminChecking: true,

  // UI state
  theme: localStorage.getItem("adminTheme") || "light",
  sidebarCollapsed: false,
  isMobile: false,
  currentSection: "dashboard",

  // Notifications
  notifications: [],
  unreadNotificationCount: 0,

  // Application data
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

  // Pagination state
  pagination: {
    users: { total: 0, page: 1, limit: 10, pages: 1 },
    jobPostings: { total: 0, page: 1, limit: 10, pages: 1 },
    internshipPostings: { total: 0, page: 1, limit: 10, pages: 1 },
    jobApplications: { total: 0, page: 1, limit: 10, pages: 1 },
    internshipApplications: { total: 0, page: 1, limit: 10, pages: 1 },
  },

  // Loading states
  loadingStates: {
    dashboardStats: false,
    users: false,
    jobPostings: false,
    internshipPostings: false,
    jobApplications: false,
    internshipApplications: false,
    settings: false,
    userAnalytics: false,
    jobAnalytics: false,
    applicationAnalytics: false,
  },
  errors: {},
};

// Action types
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
  ADD_JOB_POSTING: "ADD_JOB_POSTING",
  UPDATE_JOB_POSTING: "UPDATE_JOB_POSTING",
  REMOVE_JOB_POSTING: "REMOVE_JOB_POSTING",
  ADD_INTERNSHIP_POSTING: "ADD_INTERNSHIP_POSTING",
  UPDATE_INTERNSHIP_POSTING: "UPDATE_INTERNSHIP_POSTING",
  REMOVE_INTERNSHIP_POSTING: "REMOVE_INTERNSHIP_POSTING",
  UPDATE_USER: "UPDATE_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_APPLICATION_STATUS: "UPDATE_APPLICATION_STATUS",
  SET_PAGINATION: "SET_PAGINATION",
  SET_SPECIFIC_LOADING: "SET_SPECIFIC_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  BATCH_UPDATE: "BATCH_UPDATE",
};

// Reducer function
function adminReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_ADMIN_ACCESS:
      return {
        ...state,
        hasAdminAccess: action.payload,
        adminAccessError: null,
      };
    case actionTypes.SET_ADMIN_ACCESS_ERROR:
      return {
        ...state,
        hasAdminAccess: false,
        adminAccessError: action.payload,
      };
    case actionTypes.SET_ADMIN_CHECKING:
      return {
        ...state,
        isAdminChecking: action.payload,
      };
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case actionTypes.SET_MOBILE:
      return {
        ...state,
        isMobile: action.payload,
      };
    case actionTypes.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload,
      };
    case actionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        unreadNotificationCount: action.payload.filter((n) => !n.read).length,
      };
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadNotificationCount: state.unreadNotificationCount + 1,
      };
    case actionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadNotificationCount: Math.max(0, state.unreadNotificationCount - 1),
      };
    case actionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        unreadNotificationCount: 0,
      };
    case actionTypes.SET_SPECIFIC_LOADING:
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          [action.payload.key]: action.payload.value,
        },
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.value,
        },
      };
    case actionTypes.CLEAR_ERROR:
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return {
        ...state,
        errors: newErrors,
      };
    case actionTypes.BATCH_UPDATE:
      return action.payload.reduce((acc, curr) => {
        return adminReducer(acc, curr);
      }, state);
    default:
      return state;
  }
}

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const {
    user,
    isAuthenticated: mainIsAuthenticated,
    loading: authLoading,
  } = useAuth();

  const clearError = useCallback(
    (key) => {
      dispatch({
        type: actionTypes.CLEAR_ERROR,
        payload: key,
      });
    },
    [dispatch]
  );

  // Memoized check for admin access
  const checkAdminAccess = useCallback(async () => {
    console.log("Running checkAdminAccess with:", {
      authLoading,
      user,
      mainIsAuthenticated,
    });

    dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: true });

    if (authLoading) {
      console.log("Auth still loading, delaying admin check");
      return;
    }

    if (!mainIsAuthenticated || !user) {
      console.log("Not authenticated or no user, denying admin access");
      dispatch({
        type: actionTypes.BATCH_UPDATE,
        payload: [
          { type: actionTypes.SET_ADMIN_ACCESS, payload: false },
          {
            type: actionTypes.SET_ADMIN_ACCESS_ERROR,
            payload: "Authentication required for admin access.",
          },
          { type: actionTypes.SET_ADMIN_CHECKING, payload: false },
        ],
      });
      return;
    }

    try {
      console.log("Checking user role:", user.role);
      const hasAccess = ["admin", "superadmin"].includes(user.role);

      console.log("Admin access decision:", hasAccess);
      
      // Fixed: Directly update state with SET_ADMIN_ACCESS to ensure 
      // hasAdminAccess is set correctly
      dispatch({ type: actionTypes.SET_ADMIN_ACCESS, payload: hasAccess });
      
      if (!hasAccess) {
        dispatch({
          type: actionTypes.SET_ADMIN_ACCESS_ERROR,
          payload: `User role "${user.role}" does not have admin privileges.`,
        });
      }
      
      dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: false });
      
    } catch (error) {
      console.error("Error checking admin access:", error);
      dispatch({
        type: actionTypes.BATCH_UPDATE,
        payload: [
          { type: actionTypes.SET_ADMIN_ACCESS, payload: false },
          {
            type: actionTypes.SET_ADMIN_ACCESS_ERROR,
            payload: `Error checking admin access: ${error.message}`,
          },
          { type: actionTypes.SET_ADMIN_CHECKING, payload: false },
        ],
      });
    }
  }, [user, mainIsAuthenticated, authLoading]);

  // Run admin access check whenever auth state changes
  useEffect(() => {
    console.log("Auth state changed, checking admin access");
    checkAdminAccess();
  }, [checkAdminAccess]);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch({
        type: actionTypes.SET_MOBILE,
        payload: isMobile,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch notifications utility
  const fetchNotifications = useCallback(async () => {
    try {
      // This should be implemented properly using your API service
      console.log("Fetching notifications");
      // Placeholder for demonstration
      const notifications = [
        // You would fetch these from your API
      ];

      dispatch({
        type: actionTypes.SET_NOTIFICATIONS,
        payload: notifications,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "notifications", value: error.message },
      });
    }
  }, [dispatch]);

  // Mark notification as read
  const markNotificationAsRead = useCallback(
    (id) => {
      dispatch({
        type: actionTypes.MARK_NOTIFICATION_READ,
        payload: id,
      });
      // You should also update this on your API
    },
    [dispatch]
  );

  // Memoize all action functions
  const setTheme = useCallback((theme) => {
    const newTheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("adminTheme", newTheme);
    dispatch({ type: actionTypes.SET_THEME, payload: newTheme });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
  }, []);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      currentUser: user,
      isAuthenticated: mainIsAuthenticated && state.hasAdminAccess,
      isAdmin: user?.role === "admin",
      isSuperAdmin: user?.role === "superadmin",
      hasRole: (...roles) => user && roles.includes(user.role),
      hasAdminAccess: state.hasAdminAccess,
      adminAccessError: state.adminAccessError,
      isAdminChecking: state.isAdminChecking,

      // UI state
      theme: state.theme,
      sidebarCollapsed: state.sidebarCollapsed,
      isMobile: state.isMobile,
      currentSection: state.currentSection,

      // Notifications
      notifications: state.notifications,
      unreadNotificationCount: state.unreadNotificationCount,
      fetchNotifications,
      markNotificationAsRead,

      // Application data
      dashboardStats: state.dashboardStats,
      users: state.users,
      jobPostings: state.jobPostings,
      internshipPostings: state.internshipPostings,
      jobApplications: state.jobApplications,
      internshipApplications: state.internshipApplications,
      settings: state.settings,
      analytics: state.analytics,
      pagination: state.pagination,

      // Loading/Error states
      overallLoading: authLoading || state.isAdminChecking,
      isSpecificLoading: Object.values(state.loadingStates).some(Boolean),
      loadingStates: state.loadingStates,
      errors: state.errors,
      getError: (key) => state.errors[key],

      // IMPORTANT: Include checkAdminAccess in the context
      checkAdminAccess,

      // UI actions
      setTheme,
      toggleSidebar,
      setCurrentSection: (section) =>
        dispatch({
          type: actionTypes.SET_CURRENT_SECTION,
          payload: section,
        }),

      // Data fetching actions
      fetchDashboardStats,
      fetchUsers,
      fetchJobPostings,
      fetchInternshipPostings,
      fetchJobApplications,
      fetchInternshipApplications,
      fetchSettings,
      fetchUserAnalytics,
      fetchJobAnalytics,
      fetchApplicationAnalytics,

      // Data management actions
      updateUser,
      deleteUser,
      createJobAdmin,
      updateJobAdmin,
      deleteJobAdmin,
      featureJob,
      featureInternship,
      updateApplicationStatus,
      updateAdminSettings,

      // Error handling
      clearError,
    }),
    [
      user,
      mainIsAuthenticated,
      authLoading,
      state,
      setTheme,
      toggleSidebar,
      clearError,
      checkAdminAccess,
      fetchNotifications,
      markNotificationAsRead,
    ]
  );

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;