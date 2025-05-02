import React from "react";
import { Link, useLocation } from "react-router-dom";
// Import useAdmin hook to access context states and functions
import { useAdmin } from "../../contexts/AdminContext";

function Sidebar({
  // Receive props from AdminLayout that might originate from AdminContext or be local to AL
  isOpen, // Mobile menu open state (likely local to AdminLayout)
  onClose, // Mobile menu close handler (likely local to AdminLayout)
  // Access collapsed, isMobile, theme, hasPermission, currentUser from AdminContext
}) {
  const location = useLocation();
  // Use state and functions from AdminContext
  const {
    collapsed, // From AdminContext
    isMobile, // From AdminContext (or updated by AdminLayout)
    theme, // From AdminContext
    hasPermission, // Function from AdminContext to check user permissions
    currentUser, // User data from AdminContext (which gets it from AuthContext)
  } = useAdmin();

  // Navigation items with icons and permissions
  // Permissions listed here define what capabilities are needed to see the link
  const navigation = [
    {
      title: "Dashboard",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      ),
      path: "/admin",
      permission: "dashboard.view", // Define the permission needed
    },
    {
      title: "Jobs",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      path: "/admin/jobs",
      permission: "jobs.view", // Permission to view jobs section
      submenu: [
        {
          title: "All Jobs",
          path: "/admin/jobs",
          permission: "jobs.view", // Permission to view job list
        },
        {
          title: "Add New Job",
          path: "/admin/jobs/create",
          permission: "jobs.create", // Permission to create jobs
        },
        // Add edit/detail links if needed, with appropriate permissions
      ],
    },
    {
      title: "Internships",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
      path: "/admin/internships",
      permission: "internships.view", // Permission to view internships section
      submenu: [
        {
          title: "All Internships",
          path: "/admin/internships",
          permission: "internships.view", // Permission to view internship list
        },
        {
          title: "Add New Internship",
          path: "/admin/internships/create",
          permission: "internships.create", // Permission to create internships
        },
        // Add edit/detail links if needed, with appropriate permissions
      ],
    },
    {
      title: "Applications",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      path: "/admin/applications",
      permission: "applications.view", // Permission to view applications section
      submenu: [
        {
          title: "Job Applications",
          path: "/admin/applications/jobs",
          permission: "applications.view", // Permission to view job applications
        },
        {
          title: "Internship Applications",
          path: "/admin/applications/internships",
          permission: "applications.view", // Permission to view internship applications
        },
      ],
    },
    {
      title: "Users",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      path: "/admin/users",
      permission: "users.view", // Permission to view users
    },
    {
      title: "Companies",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      path: "/admin/companies",
      permission: "companies.view", // Permission to view companies
    },
    {
      title: "Reports",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      path: "/admin/reports",
      permission: "reports.view", // Permission to view reports
    },
    {
      title: "Settings",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      path: "/admin/settings",
      permission: "settings.view", // Permission to view settings
    },
  ];

  // Check if a menu item is active
  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return path !== "/admin" && location.pathname.startsWith(path);
  };

  // Toggle submenu (local UI state)
  const [openSubmenus, setOpenSubmenus] = React.useState({});
  const toggleSubmenu = (path) => {
    setOpenSubmenus({
      ...openSubmenus,
      [path]: !openSubmenus[path],
    });
  };

  return (
    <>
      <aside
        className={`admin-sidebar ${
          collapsed && !isMobile ? "collapsed" : ""
        } ${isMobile ? "mobile" : ""} ${isOpen ? "open" : ""}`}
      >
        <div className="sidebar-header">
          <Link
            to="/admin"
            className="logo"
            onClick={isMobile ? onClose : undefined}
          >
            {collapsed && !isMobile ? (
              <span className="logo-short">JS</span>
            ) : (
              <>
                <span className="logo-text">Job</span>
                <span className="logo-accent">Seekers</span>
              </>
            )}
          </Link>
          {isMobile && (
            <button className="close-sidebar" onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul>
              {navigation.map((item) => (
                <li key={item.path}>
                  {item.submenu ? (
                    <>
                      <button
                        className={`nav-item ${
                          isActive(item.path) ? "active" : ""
                        }`}
                        onClick={() => toggleSubmenu(item.path)}
                      >
                        <div className="nav-icon">{item.icon}</div>
                        {!collapsed && !isMobile && (
                          <>
                            <span className="nav-text">{item.title}</span>
                            <span
                              className={`submenu-arrow ${
                                openSubmenus[item.path] ? "open" : ""
                              }`}
                            >
                              <ArrowIcon />
                            </span>
                          </>
                        )}
                        {isMobile && (
                          <span className="nav-text">{item.title}</span>
                        )}
                      </button>
                      {((!collapsed && !isMobile) || isMobile) &&
                        openSubmenus[item.path] && (
                          <ul className="submenu open">
                            {item.submenu.map((subitem) => (
                              <li key={subitem.path}>
                                <Link
                                  to={subitem.path}
                                  className={`submenu-item ${
                                    location.pathname === subitem.path
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={isMobile ? onClose : undefined}
                                >
                                  {subitem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-item ${
                        isActive(item.path) ? "active" : ""
                      }`}
                      onClick={isMobile ? onClose : undefined}
                    >
                      <div className="nav-icon">{item.icon}</div>
                      {!collapsed && !isMobile && (
                        <span className="nav-text">{item.title}</span>
                      )}
                      {isMobile && (
                        <span className="nav-text">{item.title}</span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          {/* Only show admin info if not collapsed and not mobile */}
          {!collapsed && !isMobile && currentUser && (
            <div className="admin-info">
              <div className="admin-avatar">
                {/* Use currentUser initials or avatar */}
                {
                  currentUser?.name
                    ? currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : currentUser?.email
                    ? currentUser.email.charAt(0).toUpperCase()
                    : "AU" // Default
                }
              </div>
              <div className="admin-details">
                {/* Use currentUser name and role */}
                <p className="admin-name">
                  {currentUser?.name || "Admin User"}
                </p>
                <p className="admin-role">
                  {currentUser?.role
                    ? currentUser.role.charAt(0).toUpperCase() +
                      currentUser.role.slice(1)
                    : "Admin"}
                </p>
              </div>
            </div>
          )}
          {/* Show only avatar if collapsed or is mobile */}
          {((collapsed && !isMobile) || isMobile) && currentUser && (
            <div className="admin-info" style={{ justifyContent: "center" }}>
              {" "}
              {/* Center avatar */}
              <div className="admin-avatar">
                {/* Use currentUser initials or avatar */}
                {
                  currentUser?.name
                    ? currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : currentUser?.email
                    ? currentUser.email.charAt(0).toUpperCase()
                    : "AU" // Default
                }
              </div>
            </div>
          )}
          {/* Handle case where currentUser is null (shouldn't happen if App.js protects routes) */}
          {!currentUser && (
            <div className="admin-info" style={{ justifyContent: "center" }}>
              <div className="admin-avatar">?</div>
            </div>
          )}
        </div>
      </aside>

      <style jsx>{`
        .admin-sidebar {
          width: 250px;
          min-height: 100vh;
          background-color: ${theme === "dark" ? "#1E1E1E" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          border-right: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: fixed; /* Keep sidebar fixed */
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
          /* Hide scrollbar but allow scrolling */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
          scrollbar-width: none; /* Firefox */
        }

        .admin-sidebar::-webkit-scrollbar {
          /* WebKit */
          display: none;
        }

        .admin-sidebar.collapsed {
          width: 80px;
        }

        .admin-sidebar.mobile {
          transform: translateX(-100%);
          width: 250px; /* Full width on mobile when open */
        }

        .admin-sidebar.mobile.open {
          transform: translateX(0);
        }

        .sidebar-header {
          height: 70px;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          /* Hide logo text when collapsed */
          ${collapsed && !isMobile
            ? `.logo .logo-text, .logo .logo-accent { display: none; }`
            : ""}
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          color: ${theme === "dark" ? "#fff" : "#333"};
        }

        .logo-short {
          color: #3b82f6;
        }

        .logo-text {
          color: ${theme === "dark" ? "#fff" : "#333"};
        }

        .logo-accent {
          color: #3b82f6;
          margin-left: 4px;
        }

        .close-sidebar {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          cursor: pointer;
        }

        .close-sidebar svg {
          width: 20px;
          height: 20px;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
          /* Hide scrollbar but allow scrolling */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
          scrollbar-width: none; /* Firefox */
        }
        .sidebar-content::-webkit-scrollbar {
          /* WebKit */
          display: none;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          font-size: 1rem;
          /* Adjust padding when collapsed */
          ${collapsed && !isMobile
            ? `padding: 0.75rem; justify-content: center;`
            : ""}
        }

        .nav-item:hover {
          background-color: ${theme === "dark" ? "#2C2C2C" : "#f5f5f5"};
          color: ${theme === "dark" ? "#fff" : "#333"};
        }

        .nav-item.active {
          background-color: ${theme === "dark" ? "#3b82f620" : "#3b82f610"};
          color: #3b82f6;
          border-left: 3px solid #3b82f6;
        }

        .nav-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: ${collapsed && !isMobile
            ? "0"
            : "0.75rem"}; /* Adjust margin */
        }

        .nav-icon svg {
          width: 18px;
          height: 18px;
        }

        .nav-text {
          flex: 1;
          /* Hide text when collapsed */
          ${collapsed && !isMobile ? `display: none;` : ""}
        }

        .submenu-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.2s ease;
          /* Hide arrow when collapsed */
          ${collapsed && !isMobile ? `display: none;` : ""}
        }

        .submenu-arrow svg {
          width: 16px;
          height: 16px;
        }

        .submenu-arrow.open {
          transform: rotate(180deg);
        }

        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding-left: 1rem; /* Maintain padding */
          /* Adjust padding when collapsed */
          ${collapsed && !isMobile
            ? `padding-left: 0; text-align: center;`
            : ""}
        }

        .submenu.open {
          max-height: 500px; /* Sufficiently large value */
        }

        .submenu-item {
          display: block;
          padding: 0.5rem 1.5rem 0.5rem 2.5rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          /* Adjust padding when collapsed */
          ${collapsed && !isMobile ? `padding: 0.5rem 0;` : ""}
        }

        .submenu-item:hover {
          color: ${theme === "dark" ? "#fff" : "#333"};
        }

        .submenu-item.active {
          color: #3b82f6;
        }

        .sidebar-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          /* Center footer content when collapsed */
          ${collapsed && !isMobile ? `text-align: center;` : ""}
        }

        .admin-info {
          display: flex;
          align-items: center;
          justify-content: ${collapsed && !isMobile ? "center" : "flex-start"};
          /* Center on mobile regardless of collapsed state */
          ${isMobile ? `justify-content: center;` : ""}
        }

        .admin-details {
          margin-right: 0.75rem;
          /* Hide details when collapsed or on mobile */
          ${(collapsed && !isMobile) || isMobile ? `display: none;` : ""}
        }

        .admin-name {
          font-weight: 600;
          margin: 0;
          font-size: 0.9rem;
        }

        .admin-role {
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          margin: 0;
          font-size: 0.8rem;
        }

        .admin-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #3b82f6; /* Consider dynamic color based on user? */
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.8rem;
          /* Adjust margin when collapsed or on mobile */
          ${(collapsed && !isMobile) || isMobile ? `margin-right: 0;` : ""}
        }
      `}</style>
    </>
  );
}

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default Sidebar;
