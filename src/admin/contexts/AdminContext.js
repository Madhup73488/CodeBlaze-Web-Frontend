// src/admin/context/AdminContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
} from "react";

// !!! IMPORTANT: Verify this path matches your actual file structure relative to src/admin/context !!!
// If AuthContext is at src/context/AuthContext.js, this path is correct.
// If AuthContext is at src/admin/context/AuthContext.js, use '../context/AuthContext'.
import { useAuth } from "../../contexts/AuthContext"; // Path to your main AuthContext

// Import specific named exports from your admin api utility
// Ensure these match the function names exported in src/admin/utils/api.js
import {
  fetchDashboardStats,
  fetchUsers,
  fetchAdminJobs,
  fetchAdminInternships,
  fetchAdminJobApplications,
  fetchAdminInternshipApplications,
  fetchAdminSettings,
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
  // Add any other admin API functions you need to call from the context
} from "../utils/api"; // Import specific named exports

// Initial state for the Admin Context
const initialState = {
  // User & Authentication (Derived from main AuthContext, admin-specific access)
  hasAdminAccess: false, // Specific flag for admin panel access granted after auth & role check
  adminAccessError: null, // Error specific to admin access check failure
  isAdminChecking: true, // Loading state for initial admin access check

  // UI state
  theme: localStorage.getItem("adminTheme") || "light", // Initialize from local storage
  sidebarCollapsed: false,
  isMobile: false,
  currentSection: "dashboard", // Or get from URL/localStorage?

  // Notifications (Keep for admin-specific notifications - fetch from API if available)
  notifications: [],
  unreadNotificationCount: 0,

  // Application data (Fetched from admin endpoints)
  dashboardStats: null, // From GET /admin/dashboard
  users: [], // From GET /admin/users
  jobPostings: [], // From GET /admin/jobs
  internshipPostings: [], // From GET /admin/internships
  jobApplications: [], // From GET /admin/job-applications
  internshipApplications: [], // From GET /admin/internship-applications
  settings: null, // From GET /admin/settings
  analytics: {
    // Structure for analytics data
    users: null,
    jobs: null,
    applications: null,
  },

  // Pagination state for lists (users, jobs, applications) - Managed per resource list
  pagination: {
    users: { total: 0, page: 1, limit: 10, pages: 1 },
    jobPostings: { total: 0, page: 1, limit: 10, pages: 1 },
    internshipPostings: { total: 0, page: 1, limit: 10, pages: 1 },
    jobApplications: { total: 0, page: 1, limit: 10, pages: 1 },
    internshipApplications: { total: 0, page: 1, limit: 10, pages: 1 },
  },

  // Loading states for specific resources/actions, keyed by a string identifier
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
    // Add specific loading keys for updates/deletes if needed, e.g., updateUser-userId: false
  },
  // Errors state, keyed by the same string identifier as loadingStates
  errors: {},
};

// Action types for the reducer
const actionTypes = {
  // Admin Access Check
  SET_ADMIN_ACCESS: "SET_ADMIN_ACCESS",
  SET_ADMIN_ACCESS_ERROR: "SET_ADMIN_ACCESS_ERROR",
  SET_ADMIN_CHECKING: "SET_ADMIN_CHECKING",

  // UI actions
  SET_THEME: "SET_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  SET_MOBILE: "SET_MOBILE",
  SET_CURRENT_SECTION: "SET_CURRENT_SECTION",

  // Notification actions (if backend API for admin notifications exists)
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",

  // Data actions (Set data fetched from API lists/single items)
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

  // Data Update actions (Update individual items or lists after PUT/DELETE/POST)
  // These might be used for optimistic updates or just after a successful API call
  UPDATE_USER: "UPDATE_USER", // Update a user object in the users list
  REMOVE_USER: "REMOVE_USER", // Remove a user from the users list (payload is ID)
  ADD_JOB_POSTING: "ADD_JOB_POSTING", // Add a new job posting to the list
  UPDATE_JOB_POSTING: "UPDATE_JOB_POSTING", // Update a job posting object in the list
  REMOVE_JOB_POSTING: "REMOVE_JOB_POSTING", // Remove a job posting from the list (payload is ID)
  ADD_INTERNSHIP_POSTING: "ADD_INTERNSHIP_POSTING", // Add a new internship posting
  UPDATE_INTERNSHIP_POSTING: "UPDATE_INTERNSHIP_POSTING", // Update an internship posting object
  REMOVE_INTERNSHIP_POSTING: "REMOVE_INTERNSHIP_POSTING", // Remove an internship posting (payload is ID)
  UPDATE_APPLICATION_STATUS: "UPDATE_APPLICATION_STATUS", // Update an application status in either list (payload is updated application object)

  // Pagination actions - Used internally by the context when fetching lists
  SET_PAGINATION: "SET_PAGINATION",

  // Loading states and Error handling actions
  SET_SPECIFIC_LOADING: "SET_SPECIFIC_LOADING", // Set loading state for a specific key
  SET_ERROR: "SET_ERROR", // Set error message for a specific key
  CLEAR_ERROR: "CLEAR_ERROR", // Clear error for a specific key
};

// Reducer function to manage state updates based on dispatched actions
function adminReducer(state, action) {
  switch (action.type) {
    // Admin Access cases
    case actionTypes.SET_ADMIN_ACCESS:
      return {
        ...state,
        hasAdminAccess: action.payload,
        adminAccessError: null, // Clear error on successful access
      };
    case actionTypes.SET_ADMIN_ACCESS_ERROR:
      return {
        ...state,
        hasAdminAccess: false, // No access if there's an error
        adminAccessError: action.payload, // Store the error message
      };
    case actionTypes.SET_ADMIN_CHECKING:
      return {
        ...state,
        isAdminChecking: action.payload, // Boolean: true when checking admin access
      };

    // UI cases
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload, // 'light' or 'dark'
      };

    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed, // Toggle boolean state
      };

    case actionTypes.SET_MOBILE:
      return {
        ...state,
        isMobile: action.payload, // Boolean: true if mobile view
      };

    case actionTypes.SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload, // String representing current active section
      };

    // Notification cases (if backend API exists)
    case actionTypes.SET_NOTIFICATIONS:
      const unreadCount = action.payload.filter((notif) => !notif.read).length;
      return {
        ...state,
        notifications: action.payload, // Array of notification objects
        unreadNotificationCount: unreadCount,
      };

    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications], // Add new notification to the front
        unreadNotificationCount: state.unreadNotificationCount + 1,
      };

    case actionTypes.MARK_NOTIFICATION_READ:
      const updatedNotifications = state.notifications.map(
        (notification) =>
          notification.id === action.payload // payload is the notification ID
            ? { ...notification, read: true } // Mark as read
            : notification // Keep others as is
      );

      return {
        ...state,
        notifications: updatedNotifications,
        unreadNotificationCount: updatedNotifications.filter((n) => !n.read)
          .length, // Recalculate unread count
      };

    case actionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [], // Empty the notifications array
        unreadNotificationCount: 0, // Reset unread count
      };

    // Data cases (Populating state from API responses)
    case actionTypes.SET_DASHBOARD_STATS:
      return {
        ...state,
        dashboardStats: action.payload, // Dashboard stats object
      };

    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload, // Array of user objects
      };

    case actionTypes.SET_JOB_POSTINGS:
      return {
        ...state,
        jobPostings: action.payload, // Array of job posting objects
      };

    case actionTypes.SET_INTERNSHIP_POSTINGS:
      return {
        ...state,
        internshipPostings: action.payload, // Array of internship posting objects
      };

    case actionTypes.SET_JOB_APPLICATIONS:
      return {
        ...state,
        jobApplications: action.payload, // Array of job application objects
      };

    case actionTypes.SET_INTERNSHIP_APPLICATIONS:
      return {
        ...state,
        internshipApplications: action.payload, // Array of internship application objects
      };

    case actionTypes.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload, // Settings object
      };

    case actionTypes.SET_USER_ANALYTICS:
      return {
        ...state,
        analytics: { ...state.analytics, users: action.payload }, // User analytics data
      };

    case actionTypes.SET_JOB_ANALYTICS:
      return {
        ...state,
        analytics: { ...state.analytics, jobs: action.payload }, // Job analytics data
      };

    case actionTypes.SET_APPLICATION_ANALYTICS:
      return {
        ...state,
        analytics: { ...state.analytics, applications: action.payload }, // Application analytics data
      };

    // Data Update cases (Updating state after PUT/DELETE/POST)
    case actionTypes.ADD_JOB_POSTING: // Add a new job to the list (optimistic update)
      return {
        ...state,
        jobPostings: [action.payload, ...state.jobPostings],
      };
    case actionTypes.UPDATE_JOB_POSTING: // Update a job in the list
      return {
        ...state,
        jobPostings: state.jobPostings.map(
          (job) => (job._id === action.payload._id ? action.payload : job) // Find by _id and replace
        ),
      };
    case actionTypes.REMOVE_JOB_POSTING: // Remove a job from the list
      return {
        ...state,
        jobPostings: state.jobPostings.filter(
          (job) => job._id !== action.payload
        ), // payload is job ID
      };

    case actionTypes.ADD_INTERNSHIP_POSTING: // Add a new internship
      return {
        ...state,
        internshipPostings: [action.payload, ...state.internshipPostings],
      };
    case actionTypes.UPDATE_INTERNSHIP_POSTING: // Update an internship in the list
      return {
        ...state,
        internshipPostings: state.internshipPostings.map(
          (internship) =>
            internship._id === action.payload._id ? action.payload : internship // Find by _id and replace
        ),
      };
    case actionTypes.REMOVE_INTERNSHIP_POSTING: // Remove an internship from the list
      return {
        ...state,
        internshipPostings: state.internshipPostings.filter(
          (internship) => internship._id !== action.payload
        ), // payload is internship ID
      };

    case actionTypes.UPDATE_USER: // Update a user in the list
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case actionTypes.REMOVE_USER: // Remove a user from the list
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload), // payload is the user ID
      };

    case actionTypes.UPDATE_APPLICATION_STATUS: // Update item in relevant list (job or internship application)
      // Find and update the application in the correct list
      const updatedJobApps = state.jobApplications.map(
        (app) => (app._id === action.payload._id ? action.payload : app) // Assuming payload is the updated application object
      );
      const updatedInternshipApps = state.internshipApplications.map(
        (app) => (app._id === action.payload._id ? action.payload : app) // Assuming payload is the updated application object
      );
      return {
        ...state,
        jobApplications: updatedJobApps,
        internshipApplications: updatedInternshipApps,
      };

    // Pagination cases - Update pagination metadata for a specific resource list
    case actionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          [action.payload.resource]: action.payload.paginationData, // Update pagination for 'users', 'jobPostings', etc.
        },
      };

    // Loading state cases - Set loading boolean for a specific key
    case actionTypes.SET_SPECIFIC_LOADING:
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          [action.payload.key]: action.payload.isLoading, // key is string identifier, isLoading is boolean
        },
      };

    // Error handling cases - Set or clear error messages keyed by identifier
    case actionTypes.SET_ERROR:
      console.error(
        `Admin Context Error [${action.payload.key}]:`,
        action.payload.error
      ); // Log errors
      // Store error details, potentially including response status
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]:
            action.payload.error instanceof Error
              ? action.payload.error.message
              : action.payload.error, // Store error message or string
          // Optionally store status: error.response?.status
        },
      };

    case actionTypes.CLEAR_ERROR:
      const updatedErrors = { ...state.errors };
      delete updatedErrors[action.payload]; // Use payload as the key to clear

      return {
        ...state,
        errors: updatedErrors, // Return state with the error removed
      };

    default:
      return state; // Return current state for unhandled actions
  }
}

// Create the React Context object
const AdminContext = createContext();

// Custom hook to easily consume the Admin Context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    // Throw an error if the hook is used outside of an AdminProvider
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context; // Return the context value (state and actions)
};

// The Provider component that wraps your application or admin section
export const AdminProvider = ({ children }) => {
  // Use the reducer to manage state
  const [state, dispatch] = useReducer(adminReducer, initialState);
  // Get authentication state from the main AuthContext
  const {
    user,
    isAuthenticated: mainIsAuthenticated,
    loading: authLoading,
  } = useAuth();

  // --- DEFINE clearError FUNCTION ---
  // This function dispatches the action to clear an error for a given key.
  // Wrapped in useCallback for memoization.
  const clearError = useCallback(
    (key) => {
      dispatch({
        type: actionTypes.CLEAR_ERROR,
        payload: key, // The key of the error to clear
      });
    },
    [dispatch]
  ); // Dependency array: dispatch is stable

  // --- Initial Load and Admin Access Check ---
  // Effect to check admin access status when main auth state changes
  useEffect(() => {
    const checkAdminAccess = async () => {
      // Wait for the main auth check to complete
      if (authLoading) {
        dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: true });
        return;
      }

      // If not authenticated at all, no admin access
      if (!mainIsAuthenticated || !user) {
        dispatch({ type: actionTypes.SET_ADMIN_ACCESS, payload: false });
        dispatch({
          type: actionTypes.SET_ADMIN_ACCESS_ERROR,
          payload: "Authentication required for admin access.",
        });
        dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: false });
        return;
      }

      // Check if the user has the required roles based on your backend's definition
      const isAuthorizedRole =
        user.role === "admin" || user.role === "superadmin"; // VERIFY ROLES

      if (!isAuthorizedRole) {
        dispatch({ type: actionTypes.SET_ADMIN_ACCESS, payload: false });
        dispatch({
          type: actionTypes.SET_ADMIN_ACCESS_ERROR,
          payload: `User role "${user.role}" does not have sufficient privileges for the admin panel.`,
        });
        dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: false });
        return;
      }

      // --- Backend adminAccess Middleware Logic Frontend Equivalent ---
      // This part needs to reflect any *additional* checks your backend's `adminAccess` middleware performs *after* the role check.
      // Example: Does the user object have a specific flag? (e.g., user.isAdminPanelEnabled)
      // If the backend `adminAccess` middleware simply *always* allows users with
      // the 'admin' or 'superadmin' role, then the logic below is implicitly true
      // if `isAuthorizedRole` is true, and you can simplify this.
      // VERIFY THIS CRITERIA MATCHES YOUR BACKEND's ADMIN ACCESS MIDDLEWARE
      const meetsAdminAccessCriteria =
        user.isAdminPanelEnabled === true || user.role === "superadmin"; // Example additional criteria

      if (isAuthorizedRole && meetsAdminAccessCriteria) {
        dispatch({ type: actionTypes.SET_ADMIN_ACCESS, payload: true });
        dispatch({ type: actionTypes.SET_ADMIN_ACCESS_ERROR, payload: null }); // Clear any previous error
      } else {
        // This branch means role is admin/superadmin but fails the *additional* adminAccess check
        dispatch({ type: actionTypes.SET_ADMIN_ACCESS, payload: false });
        dispatch({
          type: actionTypes.SET_ADMIN_ACCESS_ERROR,
          payload: "Your account is not enabled for admin panel access.",
        }); // More specific error
      }

      dispatch({ type: actionTypes.SET_ADMIN_CHECKING, payload: false });
    };

    checkAdminAccess();

    // --- UI State Handling ---
    // Handle resize events for mobile detection
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Define your mobile breakpoint
      dispatch({
        type: actionTypes.SET_MOBILE,
        payload: isMobile,
      });
    };

    handleResize(); // Check initial size on mount
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // Depend on user and auth state; dispatch and clearError are stable deps for useCallback
  }, [user, mainIsAuthenticated, authLoading, dispatch, clearError]);

  // --- UI Actions ---
  const setTheme = useCallback(
    (theme) => {
      const newTheme = theme === "dark" ? "dark" : "light"; // Ensure valid theme
      localStorage.setItem("adminTheme", newTheme); // Save theme preference
      dispatch({ type: actionTypes.SET_THEME, payload: newTheme });
    },
    [dispatch]
  ); // dispatch is a stable dependency

  const toggleSidebar = useCallback(() => {
    dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
  }, [dispatch]); // dispatch is a stable dependency

  const setCurrentSection = useCallback(
    (section) => {
      dispatch({
        type: actionTypes.SET_CURRENT_SECTION,
        payload: section,
      });
    },
    [dispatch]
  ); // dispatch is a stable dependency

  // --- Notification Actions (Connect to backend API if available) ---
  const fetchNotifications = useCallback(async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "notifications", isLoading: true },
    });
    clearError("notifications"); // Clear previous error before fetching
    try {
      // Replace with actual API call if backend has one, e.g.:
      // const response = await api.fetchAdminNotifications();
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            /* Mock data */
          ]);
        }, 500);
      }); // MOCK API call
      dispatch({ type: actionTypes.SET_NOTIFICATIONS, payload: response });
      return response; // Return data
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: {
          key: "notifications",
          error: error.message || "Failed to fetch notifications",
        },
      });
      throw error; // Propagate error
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "notifications", isLoading: false },
      });
    }
  }, [dispatch, clearError]); // Dependencies: dispatch, clearError

  const markNotificationAsRead = useCallback(
    async (id) => {
      // Replace with actual API call if backend has one, e.g.:
      // await api.markAdminNotificationAsRead(id);
      try {
        await new Promise((resolve) => setTimeout(resolve, 200)); // MOCK API call
        dispatch({ type: actionTypes.MARK_NOTIFICATION_READ, payload: id });
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: {
            key: "notifications",
            error: error.message || "Failed to mark notification as read",
          },
        });
        throw error; // Propagate error
      }
    },
    [dispatch]
  ); // Dependencies: dispatch

  const addNotification = useCallback(
    (notification) => {
      // This action is typically dispatched from outside the context (e.g., a WebSocket listener)
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: {
          ...notification,
          id: notification.id || Date.now(), // Use backend ID if provided, fallback to timestamp
          time: notification.time || "Just now", // Use backend time if provided
          read: notification.read || false, // Default to unread if not specified
        },
      });
    },
    [dispatch]
  ); // Dependencies: dispatch

  // clearNotifications action is a simple dispatch, doesn't need a wrapper function here

  // --- Data Fetching Actions (Wrap API calls and dispatch actions) ---

  const fetchDashboardStats = useCallback(async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "dashboardStats", isLoading: true },
    });
    clearError("dashboardStats"); // Clear previous error
    try {
      const response = await fetchDashboardStats(); // Use the imported API function
      dispatch({
        type: actionTypes.SET_DASHBOARD_STATS,
        payload: response.data,
      }); // Assuming backend returns data in response.data
      return response.data; // Return the specific data payload
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "dashboardStats", error: error },
      }); // Store the error object/message
      throw error; // Propagate error
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "dashboardStats", isLoading: false },
      });
    }
  }, [dispatch, clearError]); // Dependencies: dispatch, clearError

  const fetchUsers = useCallback(
    async (params = {}) => {
      // Accept query parameters for filtering/pagination/sorting
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "users", isLoading: true },
      });
      clearError("users"); // Clear previous error
      try {
        const response = await fetchUsers(params); // Use the imported API function
        dispatch({ type: actionTypes.SET_USERS, payload: response.data }); // Assuming list is in response.data
        dispatch({
          // Assuming pagination info is in response.pagination
          type: actionTypes.SET_PAGINATION,
          payload: { resource: "users", paginationData: response.pagination },
        });
        return response; // Return full response to access data and pagination
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "users", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "users", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  ); // Dependencies: dispatch, clearError

  const fetchJobPostings = useCallback(
    async (params = {}) => {
      // Accept query parameters
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "jobPostings", isLoading: true },
      });
      clearError("jobPostings"); // Clear previous error
      try {
        const response = await fetchAdminJobs(params); // Use the imported API function (fetchAdminJobs)
        dispatch({
          type: actionTypes.SET_JOB_POSTINGS,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.SET_PAGINATION,
          payload: {
            resource: "jobPostings",
            paginationData: response.pagination,
          },
        });
        return response;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "jobPostings", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "jobPostings", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const fetchInternshipPostings = useCallback(
    async (params = {}) => {
      // Accept query parameters
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "internshipPostings", isLoading: true },
      });
      clearError("internshipPostings"); // Clear previous error
      try {
        const response = await fetchAdminInternships(params); // Use the imported API function (fetchAdminInternships)
        dispatch({
          type: actionTypes.SET_INTERNSHIP_POSTINGS,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.SET_PAGINATION,
          payload: {
            resource: "internshipPostings",
            paginationData: response.pagination,
          },
        });
        return response;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "internshipPostings", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "internshipPostings", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const fetchJobApplications = useCallback(
    async (params = {}) => {
      // Accept query parameters
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "jobApplications", isLoading: true },
      });
      clearError("jobApplications"); // Clear previous error
      try {
        const response = await fetchAdminJobApplications(params); // Use the imported API function (fetchAdminJobApplications)
        dispatch({
          type: actionTypes.SET_JOB_APPLICATIONS,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.SET_PAGINATION,
          payload: {
            resource: "jobApplications",
            paginationData: response.pagination,
          },
        });
        return response;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "jobApplications", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "jobApplications", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const fetchInternshipApplications = useCallback(
    async (params = {}) => {
      // Accept query parameters
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "internshipApplications", isLoading: true },
      });
      clearError("internshipApplications"); // Clear previous error
      try {
        const response = await fetchAdminInternshipApplications(params); // Use the imported API function (fetchAdminInternshipApplications)
        dispatch({
          type: actionTypes.SET_INTERNSHIP_APPLICATIONS,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.SET_PAGINATION,
          payload: {
            resource: "internshipApplications",
            paginationData: response.pagination,
          },
        });
        return response;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "internshipApplications", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "internshipApplications", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const fetchSettings = useCallback(async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "settings", isLoading: true },
    });
    clearError("settings"); // Clear previous error
    try {
      const response = await fetchAdminSettings(); // Use the imported API function
      dispatch({ type: actionTypes.SET_SETTINGS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "settings", error: error },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "settings", isLoading: false },
      });
    }
  }, [dispatch, clearError]);

  // Analytics Data Fetching (Wrap API calls and dispatch actions)
  const fetchUserAnalytics = useCallback(async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "userAnalytics", isLoading: true },
    });
    clearError("userAnalytics");
    try {
      const response = await fetchUserAnalytics(); // Use imported API function
      dispatch({
        type: actionTypes.SET_USER_ANALYTICS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "userAnalytics", error: error },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "userAnalytics", isLoading: false },
      });
    }
  }, [dispatch, clearError]);

  const fetchJobAnalytics = useCallback(async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "jobAnalytics", isLoading: true },
    });
    clearError("jobAnalytics");
    try {
      const response = await fetchJobAnalytics(); // Use imported API function
      dispatch({ type: actionTypes.SET_JOB_ANALYTICS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "jobAnalytics", error: error },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "jobAnalytics", isLoading: false },
      });
    }
  }, [dispatch, clearError]);

  const fetchApplicationAnalytics = useCallback(async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "applicationAnalytics", isLoading: true },
    });
    clearError("applicationAnalytics");
    try {
      const response = await fetchApplicationAnalytics(); // Use imported API function
      dispatch({
        type: actionTypes.SET_APPLICATION_ANALYTICS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "applicationAnalytics", error: error },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "applicationAnalytics", isLoading: false },
      });
    }
  }, [dispatch, clearError]);

  // --- Data Update/Management Actions (Wrap API calls and dispatch actions) ---

  const updateUser = useCallback(
    async (userId, userData) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `updateUser-${userId}`, isLoading: true },
      });
      clearError(`updateUser-${userId}`); // Clear previous error
      try {
        const response = await updateUser(userId, userData); // Use imported API function
        // Optionally update the user in the 'users' list state if you fetch it and keep it in state
        // dispatch({ type: actionTypes.UPDATE_USER, payload: response.data });
        return response.data; // Return updated data
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `updateUser-${userId}`, error: error },
        });
        throw error; // Propagate error
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: `updateUser-${userId}`, isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const deleteUser = useCallback(
    async (userId) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `deleteUser-${userId}`, isLoading: true },
      });
      clearError(`deleteUser-${userId}`); // Clear previous error
      try {
        await deleteUser(userId); // Use imported API function (sends delete request)
        // Optionally remove the user from the 'users' list state if you fetch it
        // dispatch({ type: actionTypes.REMOVE_USER, payload: userId });
        return true; // Indicate success
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `deleteUser-${userId}`, error: error },
        });
        throw error; // Propagate error
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: `deleteUser-${userId}`, isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const createJobAdmin = useCallback(
    async (jobData) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "createJob", isLoading: true },
      });
      clearError("createJob"); // Clear previous error
      try {
        const response = await createJobAdmin(jobData); // Use imported API function
        // Optionally add the new job to the list or refetch the list state
        // dispatch({ type: actionTypes.ADD_JOB_POSTING, payload: response.data });
        return response.data; // Return created data
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "createJob", error: error },
        });
        throw error; // Propagate error
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "createJob", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const updateJobAdmin = useCallback(
    async (jobId, jobData) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `updateJob-${jobId}`, isLoading: true },
      });
      clearError(`updateJob-${jobId}`); // Clear previous error
      try {
        const response = await updateJobAdmin(jobId, jobData); // Use imported API function
        // Optionally update the job in the list state
        // dispatch({ type: actionTypes.UPDATE_JOB_POSTING, payload: response.data });
        return response.data; // Return updated data
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `updateJob-${jobId}`, error: error },
        });
        throw error; // Propagate error
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: `updateJob-${jobId}`, isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const deleteJobAdmin = useCallback(
    async (jobId) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `deleteJob-${jobId}`, isLoading: true },
      });
      clearError(`deleteJob-${jobId}`); // Clear previous error
      try {
        await deleteJobAdmin(jobId); // Use imported API function
        // Optionally remove the job from the list state
        // dispatch({ type: actionTypes.REMOVE_JOB_POSTING, payload: jobId });
        return true; // Indicate success
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `deleteJob-${jobId}`, error: error },
        });
        throw error; // Propagate error
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: `deleteJob-${jobId}`, isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const createInternshipAdmin = useCallback(
    async (internshipData) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "createInternship", isLoading: true },
      });
      clearError("createInternship");
      try {
        const response = await createInternshipAdmin(internshipData);
        // Optionally add to list state
        // dispatch({ type: actionTypes.ADD_INTERNSHIP_POSTING, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "createInternship", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "createInternship", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const updateInternshipAdmin = useCallback(
    async (internshipId, internshipData) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `updateInternship-${internshipId}`, isLoading: true },
      });
      clearError(`updateInternship-${internshipId}`);
      try {
        const response = await updateInternshipAdmin(
          internshipId,
          internshipData
        );
        // Optionally update the list state
        // dispatch({ type: actionTypes.UPDATE_INTERNSHIP_POSTING, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `updateInternship-${internshipId}`, error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: {
            key: `updateInternship-${internshipId}`,
            isLoading: false,
          },
        });
      }
    },
    [dispatch, clearError]
  );

  const deleteInternshipAdmin = useCallback(
    async (internshipId) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `deleteInternship-${internshipId}`, isLoading: true },
      });
      clearError(`deleteInternship-${internshipId}`);
      try {
        await deleteInternshipAdmin(internshipId);
        // Optionally remove from list state
        // dispatch({ type: actionTypes.REMOVE_INTERNSHIP_POSTING, payload: internshipId });
        return true;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `deleteInternship-${internshipId}`, error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: {
            key: `deleteInternship-${internshipId}`,
            isLoading: false,
          },
        });
      }
    },
    [dispatch, clearError]
  );

  const featureJob = useCallback(
    async (jobId, featuredStatus) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `featureJob-${jobId}`, isLoading: true },
      });
      clearError(`featureJob-${jobId}`);
      try {
        const response = await featureJob(jobId, featuredStatus);
        // Update the specific job in the jobPostings list state
        dispatch({
          type: actionTypes.UPDATE_JOB_POSTING,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `featureJob-${jobId}`, error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: `featureJob-${jobId}`, isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  const featureInternship = useCallback(
    async (internshipId, featuredStatus) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `featureInternship-${internshipId}`, isLoading: true },
      });
      clearError(`featureInternship-${internshipId}`);
      try {
        const response = await featureInternship(internshipId, featuredStatus);
        dispatch({
          type: actionTypes.UPDATE_INTERNSHIP_POSTING,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `featureInternship-${internshipId}`, error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: {
            key: `featureInternship-${internshipId}`,
            isLoading: false,
          },
        });
      }
    },
    [dispatch, clearError]
  );

  const updateApplicationStatus = useCallback(
    async (applicationId, status) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: `updateAppStatus-${applicationId}`, isLoading: true },
      });
      clearError(`updateAppStatus-${applicationId}`);
      try {
        const response = await updateApplicationStatus(applicationId, status);
        // Update the application in the relevant list state
        dispatch({
          type: actionTypes.UPDATE_APPLICATION_STATUS,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: `updateAppStatus-${applicationId}`, error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: {
            key: `updateAppStatus-${applicationId}`,
            isLoading: false,
          },
        });
      }
    },
    [dispatch, clearError]
  );

  const updateAdminSettings = useCallback(
    async (settingsData) => {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "updateSettings", isLoading: true },
      });
      clearError("updateSettings");
      try {
        const response = await updateAdminSettings(settingsData);
        dispatch({ type: actionTypes.SET_SETTINGS, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: { key: "updateSettings", error: error },
        });
        throw error;
      } finally {
        dispatch({
          type: actionTypes.SET_SPECIFIC_LOADING,
          payload: { key: "updateSettings", isLoading: false },
        });
      }
    },
    [dispatch, clearError]
  );

  // Check user roles/access (Derived from main AuthContext user object)
  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superadmin";

  // Function to check if user has a specific role (useful for UI logic)
  const hasRole = useCallback(
    (...roles) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  // Function to check if user has specific admin access criteria (matches backend middleware)
  // VERIFY THIS CRITERIA MATCHES YOUR BACKEND's ADMIN ACCESS MIDDLEWARE
  const checkAdminAccessCriteria = useCallback(() => {
    if (!user) return false;
    // Example: Assume user object has a boolean flag `isAdminPanelEnabled` for admins/superadmins
    // Or if the backend only checks role, just use `isAuthorizedRole`.
    return user.isAdminPanelEnabled === true || user.role === "superadmin";
  }, [user]);

  // Combine loading states
  const overallLoading = authLoading || state.isAdminChecking; // Loading while checking main auth or admin access
  // Check if any specific loading is active
  const isSpecificLoading = Object.values(state.loadingStates).some(
    (isLoading) => isLoading
  );

  // Create value object with state and actions to be provided by the context
  const value = {
    // State derived from main auth + admin checks
    currentUser: user, // Get user from main AuthContext
    isAuthenticated: mainIsAuthenticated && state.hasAdminAccess, // Only true if main auth is true AND admin access is granted
    isAdmin, // Derived role check
    isSuperAdmin, // Derived role check
    hasRole, // Utility function for checking roles
    checkAdminAccessCriteria, // Expose function to check the specific access criteria
    hasAdminAccess: state.hasAdminAccess, // Specific flag for admin panel access
    adminAccessError: state.adminAccessError, // Error specific to admin access check
    isAdminChecking: state.isAdminChecking, // Loading for admin access check

    // UI state
    theme: state.theme,
    sidebarCollapsed: state.sidebarCollapsed,
    isMobile: state.isMobile,
    currentSection: state.currentSection,

    // Notifications
    notifications: state.notifications,
    unreadNotificationCount: state.unreadNotificationCount,

    // Application data (fetched from API lists/single items)
    dashboardStats: state.dashboardStats,
    users: state.users,
    jobPostings: state.jobPostings,
    internshipPostings: state.internshipPostings,
    jobApplications: state.jobApplications,
    internshipApplications: state.internshipApplications,
    settings: state.settings,
    analytics: state.analytics, // Expose analytics state
    pagination: state.pagination, // Expose pagination state object for all resources

    // Loading/Error states
    overallLoading, // Combine initial auth/access loading
    isSpecificLoading, // Indicates if any *specific* resource/action is loading
    loadingStates: state.loadingStates, // Specific loading states object
    errors: state.errors, // Specific errors object
    // Helper to get a specific error message by key
    getError: useCallback((key) => state.errors[key], [state.errors]),

    // UI actions (memoized callbacks)
    setTheme,
    toggleSidebar,
    setCurrentSection,

    // Notification actions (memoized callbacks)
    fetchNotifications,
    markNotificationAsRead,
    addNotification,
    // clearNotifications action can be dispatched directly using the dispatch function from context

    // Data fetching actions (memoized callbacks) - These call the API utility functions
    fetchDashboardStats,
    fetchUsers,
    fetchJobPostings, // Note: This calls fetchAdminJobs internally
    fetchInternshipPostings, // Note: This calls fetchAdminInternships internally
    fetchJobApplications, // Note: This calls fetchAdminJobApplications internally
    fetchInternshipApplications, // Note: This calls fetchAdminInternshipApplications internally
    fetchSettings, // Note: This calls fetchAdminSettings internally
    fetchUserAnalytics,
    fetchJobAnalytics,
    fetchApplicationAnalytics,

    // Data update/management actions (memoized callbacks) - These call the API utility functions
    updateUser,
    deleteUser,
    createJobAdmin,
    updateJobAdmin,
    deleteJobAdmin,
    createInternshipAdmin, // Added createInternshipAdmin
    updateInternshipAdmin, // Added updateInternshipAdmin
    deleteInternshipAdmin, // Added deleteInternshipAdmin
    featureJob,
    featureInternship,
    updateApplicationStatus,
    updateAdminSettings,

    // Error handling actions (memoized callback)
    clearError, // Include clearError in the value
  };

  // Provide the state and actions via the context
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// Export the context by default if needed elsewhere, though using useAdmin hook is preferred
export default AdminContext;
