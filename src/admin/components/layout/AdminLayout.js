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

  console.log("[AdminLayout] Current theme from useAdmin:", theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  useEffect(() => {
    // console.log("AdminLayout - Complete State:", { /* ... */ });
  }, [isAdminChecking, hasAdminAccess, adminAccessError, isAuthenticated, isAuthLoading, user, initialCheckComplete]);

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && user && !isAdminChecking) {
      checkAdminAccess();
    }
  }, [isAuthLoading, isAuthenticated, user, checkAdminAccess, isAdminChecking]);

  useEffect(() => {
    if (!initialCheckComplete && !isAdminChecking && !isAuthLoading) {
      setInitialCheckComplete(true);
      if (!isAuthenticated) {
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }
      if (!hasAdminAccess && !["admin", "superadmin"].includes(user?.role)) {
        navigate("/", { replace: true });
      } else {
        if (!hasAdminAccess && ["admin", "superadmin"].includes(user?.role)) {
          checkAdminAccess();
        }
      }
    }
  }, [isAdminChecking, hasAdminAccess, navigate, initialCheckComplete, isAuthenticated, isAuthLoading, location.pathname, user, checkAdminAccess]);

  useEffect(() => {
    if ((hasAdminAccess || (user && ["admin", "superadmin"].includes(user.role))) && !isAdminChecking && initialCheckComplete) {
      fetchNotifications();
    }
  }, [hasAdminAccess, isAdminChecking, fetchNotifications, initialCheckComplete, user]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // isMobile from AdminContext should also update
      if (!mobile && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let pageTitle = "Admin Dashboard";
    if (pathSegments.length > 1) {
      pageTitle = `${pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1)} | Admin Dashboard`;
    }
    document.title = pageTitle;
  }, [location]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
      // sidebarCollapsed state is toggled by toggleSidebar from context, 
      // but mobile overlay is controlled by mobileMenuOpen
    } else {
      toggleSidebar(); // This toggles sidebarCollapsed for desktop
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const handleToggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const handleLogout = () => logout();

  const isDark = theme === 'dark';
  const layoutClasses = isDark ? 'bg-black text-gray-100' : 'bg-white text-gray-900';
  const loadingErrorBgClass = isDark ? 'bg-black' : 'bg-white'; 
  const loadingErrorTextClass = isDark ? 'text-gray-100' : 'text-gray-900';

  if (isAuthLoading || isAdminChecking || !initialCheckComplete) {
    return <div className={`admin-loading ${loadingErrorBgClass} ${loadingErrorTextClass}`}>Loading Admin Panel...</div>;
  }
  if (adminAccessError && !["admin", "superadmin"].includes(user?.role)) {
    return <div className={`admin-error ${loadingErrorBgClass} ${loadingErrorTextClass}`}>Error: {adminAccessError}</div>;
  }
  if (!isAuthenticated) return null;
  if (!hasAdminAccess && !["admin", "superadmin"].includes(user?.role)) return null;

  return (
    <div className={`admin-layout ${layoutClasses}`} data-theme={theme}> {/* Removed key={theme} */}
      <Sidebar collapsed={sidebarCollapsed && !isMobile} isMobile={isMobile} isOpen={mobileMenuOpen} onClose={closeMobileMenu} theme={theme} />
      <div className={`admin-content`}> {/* Removed key prop */}
        <Header
          toggleSidebar={handleToggleSidebar}
          toggleTheme={handleToggleTheme}
          theme={theme}
          notifications={notifications}
          markAsRead={markNotificationAsRead}
          onLogout={handleLogout}
          isMobile={isMobile}
          sidebarCollapsed={sidebarCollapsed && !isMobile} // Pass desktop collapsed state
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
      {isMobile && mobileMenuOpen && <div className="sidebar-overlay" onClick={closeMobileMenu} />}

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
        .admin-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.3s ease;
          /* Correct margin logic: 
             - Mobile: 0 (sidebar overlays)
             - Desktop Collapsed: 80px
             - Desktop Expanded: 250px
          */
          margin-left: ${isMobile ? '0' : (sidebarCollapsed ? '80px' : '250px')};
        }
        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          background-color: transparent; 
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
        }
        .admin-error {
          color: #e53935; 
        }
        .admin-footer {
          padding: 1rem 2rem;
          border-top: 1px solid var(--border-light); 
          color: var(--text-secondary);
        }
        .admin-footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        .admin-footer p { margin: 0; font-size: 0.875rem; opacity: 0.8; }
        .admin-footer-links { display: flex; gap: 1.5rem; }
        .admin-footer-links a {
          font-size: 0.875rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .admin-footer-links a:hover { color: var(--text-primary); }
        .sidebar-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99; /* Ensure overlay is above sidebar if sidebar z-index is lower */
        }
        /* Media query for mobile is handled by isMobile prop for margin-left */
        @media (max-width: 768px) {
          /* .admin-content { margin-left: 0; } // Handled by JSS logic now */
          .admin-main { padding: 1.5rem 1rem; }
          .admin-footer-content { flex-direction: column; gap: 1rem; text-align: center; }
          .admin-footer-links { justify-content: center; }
        }
      `}</style>
    </div>
  );
}

export default AdminLayout;
