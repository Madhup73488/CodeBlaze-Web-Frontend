import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import { useAuth } from "../../../contexts/AuthContext";

function AdminLayout() {
  const {
    sidebarCollapsed,
    isMobile,
    theme,
    notifications,
    fetchNotifications,
    markNotificationAsRead,
    toggleSidebar,
    setTheme,
    isAdminChecking,
    hasAdminAccess,
    adminAccessError,
    checkAdminAccess,
  } = useAdmin();

  const { logout, user, isAuthenticated, loading: isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  // More detailed debug logs
  useEffect(() => {
    console.log("AdminLayout - Complete State:", {
      isAdminChecking,
      hasAdminAccess,
      adminAccessError,
      isAuthenticated,
      isAuthLoading,
      user: user
        ? `${user.id} (${user.email}) - role: ${user.role}`
        : "No user",
      initialCheckComplete,
    });
  }, [
    isAdminChecking,
    hasAdminAccess,
    adminAccessError,
    isAuthenticated,
    isAuthLoading,
    user,
    initialCheckComplete,
  ]);

  // Re-check admin access when component mounts or when auth state changes
  useEffect(() => {
    // Only check if not already checking and auth is complete
    if (!isAuthLoading && isAuthenticated && user && !isAdminChecking) {
      console.log(
        "AdminLayout: Triggering admin access check for user:",
        user.id
      );
      checkAdminAccess();
    }
  }, [isAuthLoading, isAuthenticated, user, checkAdminAccess, isAdminChecking]);

  // Handle the redirect logic in a useEffect
  useEffect(() => {
    // Only make a decision when admin check is complete and we haven't processed it yet
    if (!initialCheckComplete && !isAdminChecking && !isAuthLoading) {
      console.log("AdminLayout: Ready to evaluate access:", {
        hasAdminAccess,
        isAuthenticated,
        user: user?.role,
      });

      setInitialCheckComplete(true);

      if (!isAuthenticated) {
        console.log(
          "AdminLayout: User not authenticated. Redirecting to login."
        );
        navigate("/login", {
          replace: true,
          state: { from: location.pathname },
        });
        return;
      }

      // FIXED: Added debugging here and check for admin role explicitly
      console.log("AdminLayout: User role check:", user?.role);

      if (!hasAdminAccess && !["admin", "superadmin"].includes(user?.role)) {
        console.log(
          "AdminLayout: Admin check complete, access denied. Navigating to /"
        );
        navigate("/", { replace: true });
      } else {
        console.log("AdminLayout: Admin access granted!");
        // Force hasAdminAccess to true if user has admin role but state wasn't updated correctly
        if (!hasAdminAccess && ["admin", "superadmin"].includes(user?.role)) {
          console.log(
            "AdminLayout: User has admin role but hasAdminAccess was false. Forcing access."
          );
          // This is a failsafe in case the reducer didn't update correctly
          checkAdminAccess();
        }
      }
    }
  }, [
    isAdminChecking,
    hasAdminAccess,
    navigate,
    initialCheckComplete,
    isAuthenticated,
    isAuthLoading,
    location.pathname,
    user,
    checkAdminAccess,
  ]);

  // Effect to handle initial fetching of notifications
  useEffect(() => {
    if (
      (hasAdminAccess ||
        (user && ["admin", "superadmin"].includes(user.role))) &&
      !isAdminChecking &&
      initialCheckComplete
    ) {
      console.log("AdminLayout: Fetching notifications for admin");
      fetchNotifications();
    }
  }, [
    hasAdminAccess,
    isAdminChecking,
    fetchNotifications,
    initialCheckComplete,
    user,
  ]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Set page title
  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let pageTitle = "Admin Dashboard";

    if (pathSegments.length > 1) {
      const section = pathSegments[1];
      pageTitle = `${
        section.charAt(0).toUpperCase() + section.slice(1)
      } | Admin Dashboard`;
    }

    document.title = pageTitle;
  }, [location]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    }
    toggleSidebar();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleLogout = () => {
    logout();
  };

  // Show loading while either auth or admin check is in progress
  if (isAuthLoading || isAdminChecking || !initialCheckComplete) {
    return <div className="admin-loading">Loading Admin Panel...</div>;
  }

  // If there's an error during the check, show an error message
  if (adminAccessError && !["admin", "superadmin"].includes(user?.role)) {
    return <div className="admin-error">Error: {adminAccessError}</div>;
  }

  // If not authenticated, we've already redirected in the useEffect
  if (!isAuthenticated) {
    return null;
  }

  // If access is denied, we've already redirected in the useEffect
  // FIXED: Allow access if user has admin role, even if hasAdminAccess flag is wrong
  if (!hasAdminAccess && !["admin", "superadmin"].includes(user?.role)) {
    return null;
  }

  // Main layout render
  return (
    <div className={`admin-layout ${theme}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        theme={theme}
      />

      <div
        className={`admin-content ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Header
          toggleSidebar={handleToggleSidebar}
          toggleTheme={handleToggleTheme}
          theme={theme}
          notifications={notifications}
          markAsRead={markNotificationAsRead}
          onLogout={handleLogout}
          isMobile={isMobile}
          sidebarCollapsed={sidebarCollapsed}
          user={user}
        />

        <main className="admin-main">
          <Outlet />
        </main>

        <footer className="admin-footer">
          <div className="admin-footer-content">
            <p>© {new Date().getFullYear()} Job Seekers Admin Dashboard</p>
            <div className="admin-footer-links">
              <Link to="/admin/help">Help</Link>
              <Link to="/admin/terms">Terms</Link>
              <Link to="/admin/privacy">Privacy</Link>
            </div>
          </div>
        </footer>
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu} />
      )}

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        .admin-layout.light {
          background-color: #f5f7fa;
          color: #333;
        }

        .admin-layout.dark {
          background-color: #121212;
          color: #e0e0e0;
        }

        .admin-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s ease;
          margin-left: ${sidebarCollapsed ? "80px" : "250px"};
        }

        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .admin-loading,
        .admin-error {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.2rem;
          padding: 2rem;
          text-align: center;
          background-color: ${theme === "dark" ? "#121212" : "#f5f7fa"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .admin-error {
          color: #e53935;
        }

        .admin-footer {
          padding: 1rem 2rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .admin-footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .admin-footer p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .admin-footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .admin-footer-links a {
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .admin-footer-links a:hover {
          color: ${theme === "dark" ? "#fff" : "#333"};
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99;
        }

        @media (max-width: 768px) {
          .admin-content {
            margin-left: 0;
          }

          .admin-main {
            padding: 1.5rem 1rem;
          }

          .admin-footer-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .admin-footer-links {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminLayout;
