import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ collapsed, isMobile, isOpen, onClose, theme }) {
  const location = useLocation();

  // Navigation items with icons and permissions
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
      permission: "dashboard.view",
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
      permission: "jobs.view",
      submenu: [
        {
          title: "All Jobs",
          path: "/admin/jobs",
          permission: "jobs.view",
        },
        {
          title: "Add New Job",
          path: "/admin/jobs/create",
          permission: "jobs.create",
        },
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
      permission: "internships.view",
      submenu: [
        {
          title: "All Internships",
          path: "/admin/internships",
          permission: "internships.view",
        },
        {
          title: "Add New Internship",
          path: "/admin/internships/create",
          permission: "internships.create",
        },
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
      permission: "applications.view",
      submenu: [
        {
          title: "Job Applications",
          path: "/admin/applications/jobs",
          permission: "applications.view",
        },
        {
          title: "Internship Applications",
          path: "/admin/applications/internships",
          permission: "applications.view",
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
      permission: "users.view",
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
      permission: "companies.view",
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
      permission: "reports.view",
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
      permission: "settings.view",
    },
  ];

  // Check if a menu item is active
  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return path !== "/admin" && location.pathname.startsWith(path);
  };

  // Check if user has permission (simplified check)
  const hasPermission = (permission) => {
    // In a real app, this would check against user roles/permissions
    return true;
  };

  // Toggle submenu
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
          <Link to="/admin" className="logo">
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul>
              {navigation.map(
                (item) =>
                  hasPermission(item.permission) && (
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
                            {!collapsed && (
                              <>
                                <span className="nav-text">{item.title}</span>
                                <span
                                  className={`submenu-arrow ${
                                    openSubmenus[item.path] ? "open" : ""
                                  }`}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                  </svg>
                                </span>
                              </>
                            )}
                          </button>
                          {(!collapsed || isMobile) && (
                            <ul
                              className={`submenu ${
                                openSubmenus[item.path] ? "open" : ""
                              }`}
                            >
                              {item.submenu.map(
                                (subitem) =>
                                  hasPermission(subitem.permission) && (
                                    <li key={subitem.path}>
                                      <Link
                                        to={subitem.path}
                                        className={`submenu-item ${
                                          location.pathname === subitem.path
                                            ? "active"
                                            : ""
                                        }`}
                                      >
                                        {subitem.title}
                                      </Link>
                                    </li>
                                  )
                              )}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`nav-item ${
                            isActive(item.path) ? "active" : ""
                          }`}
                        >
                          <div className="nav-icon">{item.icon}</div>
                          {!collapsed && (
                            <span className="nav-text">{item.title}</span>
                          )}
                        </Link>
                      )}
                    </li>
                  )
              )}
            </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="admin-info">
            {!collapsed && (
              <div className="admin-details">
                <p className="admin-name">Admin User</p>
                <p className="admin-role">Super Admin</p>
              </div>
            )}
            <div className="admin-avatar">
              <span>AU</span>
            </div>
          </div>
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
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
        }

        .admin-sidebar.collapsed {
          width: 80px;
        }

        .admin-sidebar.mobile {
          transform: translateX(-100%);
          width: 250px;
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
          margin-right: ${collapsed ? "0" : "0.75rem"};
        }

        .nav-icon svg {
          width: 18px;
          height: 18px;
        }

        .nav-text {
          flex: 1;
        }

        .submenu-arrow {
          display: flex;
          align-items: center;
          transition: transform 0.2s ease;
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
          padding-left: 1rem;
        }

        .submenu.open {
          max-height: 500px;
        }

        .submenu-item {
          display: block;
          padding: 0.5rem 1.5rem 0.5rem 2.5rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
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
        }

        .admin-info {
          display: flex;
          align-items: center;
          justify-content: ${collapsed ? "center" : "flex-start"};
        }

        .admin-details {
          margin-right: 0.75rem;
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
          background-color: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

export default Sidebar;
