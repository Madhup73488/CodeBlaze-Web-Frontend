import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle resize events to determine mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Close mobile menu on resize to desktop
      if (!mobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Set page title based on current route
  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    let pageTitle = "Admin Dashboard";

    if (pathSegments.length > 1) {
      pageTitle = `${
        pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1)
      } | Admin Dashboard`;
    }

    document.title = pageTitle;
  }, [location]);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("adminTheme", newTheme);
  };

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("adminTheme") || "light";
    setTheme(savedTheme);
  }, []);

  // Mock fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      // In real app, this would be an API call
      const mockNotifications = [
        {
          id: 1,
          title: "New Job Application",
          message: "John Doe applied for Senior Software Engineer position",
          time: "10 minutes ago",
          read: false,
        },
        {
          id: 2,
          title: "Job Posting Expired",
          message: "Frontend Developer position has expired",
          time: "2 hours ago",
          read: false,
        },
        {
          id: 3,
          title: "New Company Registration",
          message: "TechCorp Inc. registered as an employer",
          time: "Yesterday",
          read: true,
        },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Check if user is authenticated
  // In a real app, this would check for a valid token
  const isAuthenticated = () => {
    const token = localStorage.getItem("adminToken");
    return !!token;
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated() && !location.pathname.includes("/login")) {
      navigate("/admin/login");
    }
  }, [location, navigate]);

  return (
    <div className={`admin-layout ${theme}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        isMobile={isMobile}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        theme={theme}
      />

      <div
        className={`admin-content ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Header
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          theme={theme}
          notifications={notifications}
          markAsRead={markAsRead}
          onLogout={handleLogout}
          isMobile={isMobile}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="admin-main">
          <Outlet />
        </main>

        <footer className="admin-footer">
          <div className="admin-footer-content">
            <p>© {new Date().getFullYear()} Job Seekers Admin Dashboard</p>
            <div className="admin-footer-links">
              <a href="/admin/help">Help</a>
              <a href="/admin/terms">Terms</a>
              <a href="/admin/privacy">Privacy</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobile && mobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
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
          margin-left: 250px;
        }

        .admin-content.sidebar-collapsed {
          margin-left: 80px;
        }

        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .admin-footer {
          padding: 1rem 2rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
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

          .admin-content.sidebar-collapsed {
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
