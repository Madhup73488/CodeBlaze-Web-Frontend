// src/admin/context/AdminContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";

// Initial state
const initialState = {
  // User & Authentication
  currentUser: null,
  isAuthenticated: false,
  userPermissions: [],

  // UI state
  theme: "light",
  sidebarCollapsed: false,
  isMobile: false,
  currentSection: "dashboard",

  // Notifications
  notifications: [],
  unreadNotificationCount: 0,

  // Application data
  jobPostings: [],
  internshipPostings: [],
  applicationStats: {
    pending: 0,
    reviewed: 0,
    interviewing: 0,
    offered: 0,
    rejected: 0,
  },

  // Loading states
  isLoading: false,
  loadingStates: {},
  errors: {},
};

// Action types
const actionTypes = {
  // Auth actions
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",

  // UI actions
  TOGGLE_THEME: "TOGGLE_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  SET_MOBILE: "SET_MOBILE",
  SET_CURRENT_SECTION: "SET_CURRENT_SECTION",

  // Notification actions
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",

  // Data actions
  SET_JOB_POSTINGS: "SET_JOB_POSTINGS",
  SET_INTERNSHIP_POSTINGS: "SET_INTERNSHIP_POSTINGS",
  SET_APPLICATION_STATS: "SET_APPLICATION_STATS",
  UPDATE_JOB_POSTING: "UPDATE_JOB_POSTING",
  UPDATE_INTERNSHIP_POSTING: "UPDATE_INTERNSHIP_POSTING",

  // Loading states
  SET_LOADING: "SET_LOADING",
  SET_SPECIFIC_LOADING: "SET_SPECIFIC_LOADING",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer function
function adminReducer(state, action) {
  switch (action.type) {
    // Auth cases
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        userPermissions: action.payload.permissions || [],
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        userPermissions: [],
        errors: {
          ...state.errors,
          login: action.payload,
        },
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        userPermissions: [],
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };

    // UI cases
    case actionTypes.TOGGLE_THEME:
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("adminTheme", newTheme);
      return {
        ...state,
        theme: newTheme,
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

    // Notification cases
    case actionTypes.SET_NOTIFICATIONS:
      const unreadCount = action.payload.filter((notif) => !notif.read).length;
      return {
        ...state,
        notifications: action.payload,
        unreadNotificationCount: unreadCount,
      };

    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadNotificationCount: state.unreadNotificationCount + 1,
      };

    case actionTypes.MARK_NOTIFICATION_READ:
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === action.payload
          ? { ...notification, read: true }
          : notification
      );

      return {
        ...state,
        notifications: updatedNotifications,
        unreadNotificationCount: updatedNotifications.filter((n) => !n.read)
          .length,
      };

    case actionTypes.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
        unreadNotificationCount: 0,
      };

    // Data cases
    case actionTypes.SET_JOB_POSTINGS:
      return {
        ...state,
        jobPostings: action.payload,
      };

    case actionTypes.SET_INTERNSHIP_POSTINGS:
      return {
        ...state,
        internshipPostings: action.payload,
      };

    case actionTypes.SET_APPLICATION_STATS:
      return {
        ...state,
        applicationStats: action.payload,
      };

    case actionTypes.UPDATE_JOB_POSTING:
      return {
        ...state,
        jobPostings: state.jobPostings.map((job) =>
          job.id === action.payload.id ? action.payload : job
        ),
      };

    case actionTypes.UPDATE_INTERNSHIP_POSTING:
      return {
        ...state,
        internshipPostings: state.internshipPostings.map((internship) =>
          internship.id === action.payload.id ? action.payload : internship
        ),
      };

    // Loading state cases
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case actionTypes.SET_SPECIFIC_LOADING:
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          [action.payload.key]: action.payload.isLoading,
        },
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.key]: action.payload.error,
        },
      };

    case actionTypes.CLEAR_ERROR:
      const updatedErrors = { ...state.errors };
      delete updatedErrors[action.payload];

      return {
        ...state,
        errors: updatedErrors,
      };

    default:
      return state;
  }
}

// Create context
const AdminContext = createContext();

// Custom hook for using the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

// Provider component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Check for saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme) {
      dispatch({
        type: actionTypes.TOGGLE_THEME,
      });
    }

    // Check if user is already authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          // In a real app, you would validate the token with your API
          const userData = await verifyToken(token);
          dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: userData,
          });
        } catch (error) {
          // Invalid token
          localStorage.removeItem("adminToken");
        }
      }
    };

    checkAuth();

    // Handle resize events for mobile detection
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      dispatch({
        type: actionTypes.SET_MOBILE,
        payload: isMobile,
      });
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mock function to verify token in a real app
  const verifyToken = async (token) => {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock user data
        resolve({
          id: "123",
          username: "admin",
          email: "admin@example.com",
          name: "Admin User",
          role: "administrator",
          permissions: ["view:all", "edit:all", "delete:all", "create:all"],
        });
      }, 300);
    });
  };

  // Authentication actions
  const login = async (credentials) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      // Mock API call - replace with actual login API in real app
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            credentials.username === "admin" &&
            credentials.password === "password"
          ) {
            resolve({
              token: "mock-jwt-token",
              user: {
                id: "123",
                username: "admin",
                email: "admin@example.com",
                name: "Admin User",
                role: "administrator",
                permissions: [
                  "view:all",
                  "edit:all",
                  "delete:all",
                  "create:all",
                ],
              },
            });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 800);
      });

      localStorage.setItem("adminToken", response.token);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: response.user,
      });
      return response.user;
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: error.message,
      });
      throw error;
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    dispatch({ type: actionTypes.LOGOUT });
  };

  const updateUserProfile = async (userData) => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "updateProfile", isLoading: true },
    });

    try {
      // Mock API call - replace with actual API in real app
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch({
        type: actionTypes.UPDATE_USER,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "updateProfile", error: error.message },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "updateProfile", isLoading: false },
      });
    }
  };

  // UI actions
  const toggleTheme = () => {
    dispatch({ type: actionTypes.TOGGLE_THEME });
  };

  const toggleSidebar = () => {
    dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
  };

  const setCurrentSection = (section) => {
    dispatch({
      type: actionTypes.SET_CURRENT_SECTION,
      payload: section,
    });
  };

  // Notification actions
  const fetchNotifications = async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "notifications", isLoading: true },
    });

    try {
      // Mock API call - replace with actual notification API in real app
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: "New Job Application",
              message: "John Doe applied for Senior Software Engineer position",
              time: "10 minutes ago",
              read: false,
              type: "application",
            },
            {
              id: 2,
              title: "Job Posting Expired",
              message: "Frontend Developer position has expired",
              time: "2 hours ago",
              read: false,
              type: "job",
            },
            {
              id: 3,
              title: "New Company Registration",
              message: "TechCorp Inc. registered as an employer",
              time: "Yesterday",
              read: true,
              type: "company",
            },
          ]);
        }, 500);
      });

      dispatch({
        type: actionTypes.SET_NOTIFICATIONS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "notifications", error: error.message },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "notifications", isLoading: false },
      });
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      // Mock API call - replace with actual API in real app
      await new Promise((resolve) => setTimeout(resolve, 200));

      dispatch({
        type: actionTypes.MARK_NOTIFICATION_READ,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "notifications", error: error.message },
      });
    }
  };

  const addNotification = (notification) => {
    dispatch({
      type: actionTypes.ADD_NOTIFICATION,
      payload: {
        ...notification,
        id: Date.now(), // Generate a unique ID
        time: "Just now",
        read: false,
      },
    });
  };

  // Data fetching actions
  const fetchJobPostings = async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "jobPostings", isLoading: true },
    });

    try {
      // Mock API call - replace with actual API in real app
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: "Senior Frontend Developer",
              company: "Tech Solutions Inc.",
              location: "New York, NY",
              type: "Full-time",
              salary: "$120,000 - $150,000",
              posted: "2023-04-10",
              expires: "2023-05-10",
              applicants: 24,
              status: "active",
            },
            {
              id: 2,
              title: "Backend Engineer",
              company: "Data Systems",
              location: "Remote",
              type: "Contract",
              salary: "$100,000 - $130,000",
              posted: "2023-04-05",
              expires: "2023-05-05",
              applicants: 18,
              status: "active",
            },
            {
              id: 3,
              title: "UI/UX Designer",
              company: "Creative Co.",
              location: "San Francisco, CA",
              type: "Full-time",
              salary: "$90,000 - $110,000",
              posted: "2023-03-20",
              expires: "2023-04-20",
              applicants: 36,
              status: "expired",
            },
          ]);
        }, 600);
      });

      dispatch({
        type: actionTypes.SET_JOB_POSTINGS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "jobPostings", error: error.message },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "jobPostings", isLoading: false },
      });
    }
  };

  const fetchInternshipPostings = async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "internshipPostings", isLoading: true },
    });

    try {
      // Mock API call - replace with actual API in real app
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              title: "Software Engineering Intern",
              company: "Tech Solutions Inc.",
              location: "New York, NY",
              duration: "3 months",
              stipend: "$25/hour",
              posted: "2023-04-10",
              expires: "2023-05-10",
              applicants: 42,
              status: "active",
            },
            {
              id: 2,
              title: "Data Science Intern",
              company: "Data Systems",
              location: "Remote",
              duration: "6 months",
              stipend: "$22/hour",
              posted: "2023-04-05",
              expires: "2023-05-05",
              applicants: 31,
              status: "active",
            },
            {
              id: 3,
              title: "UX Research Intern",
              company: "Creative Co.",
              location: "San Francisco, CA",
              duration: "4 months",
              stipend: "$20/hour",
              posted: "2023-03-20",
              expires: "2023-04-20",
              applicants: 28,
              status: "expired",
            },
          ]);
        }, 600);
      });

      dispatch({
        type: actionTypes.SET_INTERNSHIP_POSTINGS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "internshipPostings", error: error.message },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "internshipPostings", isLoading: false },
      });
    }
  };

  const fetchApplicationStats = async () => {
    dispatch({
      type: actionTypes.SET_SPECIFIC_LOADING,
      payload: { key: "applicationStats", isLoading: true },
    });

    try {
      // Mock API call - replace with actual API in real app
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            pending: 45,
            reviewed: 32,
            interviewing: 18,
            offered: 7,
            rejected: 23,
          });
        }, 400);
      });

      dispatch({
        type: actionTypes.SET_APPLICATION_STATS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: { key: "applicationStats", error: error.message },
      });
      throw error;
    } finally {
      dispatch({
        type: actionTypes.SET_SPECIFIC_LOADING,
        payload: { key: "applicationStats", isLoading: false },
      });
    }
  };

  // Error handling
  const clearError = (key) => {
    dispatch({
      type: actionTypes.CLEAR_ERROR,
      payload: key,
    });
  };

  // Check user permissions
  const hasPermission = useCallback(
    (permission) => {
      return (
        state.userPermissions.includes(permission) ||
        state.userPermissions.includes("view:all")
      ); // Admin bypass
    },
    [state.userPermissions]
  );

  // Create value object with state and actions
  const value = {
    // State
    ...state,

    // Auth actions
    login,
    logout,
    updateUserProfile,
    hasPermission,

    // UI actions
    toggleTheme,
    toggleSidebar,
    setCurrentSection,

    // Notification actions
    fetchNotifications,
    markNotificationAsRead,
    addNotification,

    // Data fetching actions
    fetchJobPostings,
    fetchInternshipPostings,
    fetchApplicationStats,

    // Error handling
    clearError,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;
