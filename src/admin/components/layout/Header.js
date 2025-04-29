import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({
  toggleSidebar,
  toggleTheme,
  theme,
  notifications,
  markAsRead,
  onLogout,
  isMobile,
  sidebarCollapsed,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="breadcrumb">
          <Link to="/admin">Dashboard</Link>
          {/* Dynamic breadcrumb logic can be added here */}
        </div>
      </div>

      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>

        <div className="notification-dropdown" ref={notificationRef}>
          <button
            className="notification-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {notificationsOpen && (
            <div className="dropdown-content notifications">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="mark-all-read">Mark all as read</button>
                )}
              </div>

              <div className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${
                        notification.read ? "" : "unread"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-icon">
                        {notification.title.includes("Application") ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        ) : notification.title.includes("Expired") ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        ) : (
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
                        )}
                      </div>
                      <div className="notification-content">
                        <p className="notification-title">
                          {notification.title}
                        </p>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="notification-unread-indicator"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-notifications">
                    <p>No notifications</p>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="dropdown-footer">
                  <Link to="/admin/notifications">View all notifications</Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="profile-dropdown" ref={profileRef}>
          <button
            className="profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="profile-avatar">
              <span>AU</span>
            </div>
          </button>

          {profileOpen && (
            <div className="dropdown-content profile">
              <div className="profile-info">
                <div className="profile-avatar large">
                  <span>AU</span>
                </div>
                <div className="profile-details">
                  <h4>Admin User</h4>
                  <p>admin@jobseekers.com</p>
                </div>
              </div>

              <div className="profile-menu">
                <Link to="/admin/profile" className="profile-menu-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Profile
                </Link>
                <Link to="/admin/settings" className="profile-menu-item">
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
                  Settings
                </Link>
                <button className="profile-menu-item logout" onClick={onLogout}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-header {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          background-color: ${theme === "dark" ? "#1E1E1E" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .toggle-sidebar {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          cursor: pointer;
          width: 30px;
          height: 30px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }

        .toggle-sidebar svg {
          width: 20px;
          height: 20px;
        }

        .breadcrumb {
          font-size: 0.9rem;
        }

        .breadcrumb a {
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          text-decoration: none;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          cursor: pointer;
          width: 32px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle svg {
          width: 20px;
          height: 20px;
        }

        .notification-dropdown,
        .profile-dropdown {
          position: relative;
        }

        .notification-btn,
        .profile-btn {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
          cursor: pointer;
          width: 36px;
          height: 36px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .notification-btn svg {
          width: 20px;
          height: 20px;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #ef4444;
          color: white;
          font-size: 0.65rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .dropdown-content {
          position: absolute;
          top: 100%;
          right: 0;
          width: 320px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 6px;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
          z-index: 100;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .dropdown-header {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dropdown-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: #3b82f6;
          font-size: 0.8rem;
          cursor: pointer;
          padding: 0;
        }

        .notifications-list {
          max-height: 320px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          cursor: pointer;
          transition: background-color 0.2s ease;
          position: relative;
        }

        .notification-item:hover {
          background-color: ${theme === "dark" ? "#333" : "#f9fafb"};
        }

        .notification-item.unread {
          background-color: ${theme === "dark" ? "#3b82f610" : "#ebf5ff"};
        }

        .notification-icon {
          margin-right: 0.75rem;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: ${theme === "dark" ? "#333" : "#f0f0f0"};
          color: ${theme === "dark" ? "#e0e0e0" : "#666"};
        }

        .notification-icon svg {
          width: 16px;
          height: 16px;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          margin: 0 0 0.25rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .notification-message {
          margin: 0 0 0.25rem;
          font-size: 0.8rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .notification-time {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#777" : "#999"};
        }

        .notification-unread-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #3b82f6;
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .empty-notifications {
          padding: 2rem;
          text-align: center;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .dropdown-footer {
          padding: 0.75rem 1rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          text-align: center;
        }

        .dropdown-footer a {
          color: #3b82f6;
          text-decoration: none;
          font-size: 0.85rem;
        }

        .profile-avatar {
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

        .profile-avatar.large {
          width: 60px;
          height: 60px;
          font-size: 1.2rem;
        }

        .profile-info {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .profile-details {
          margin-left: 1rem;
        }

        .profile-details h4 {
          margin: 0 0 0.25rem;
          font-size: 1rem;
        }

        .profile-details p {
          margin: 0;
          font-size: 0.85rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .profile-menu {
          padding: 0.5rem 0;
        }

        .profile-menu-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.25rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          text-decoration: none;
          transition: background-color 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 0.9rem;
        }

        .profile-menu-item:hover {
          background-color: ${theme === "dark" ? "#333" : "#f9fafb"};
        }

        .profile-menu-item svg {
          width: 18px;
          height: 18px;
          margin-right: 0.75rem;
        }

        .profile-menu-item.logout {
          color: #ef4444;
        }

        .profile-menu-item.logout svg {
          stroke: #ef4444;
        }

        @media (max-width: 768px) {
          .admin-header {
            padding: 0 1rem;
          }

          .dropdown-content {
            width: 300px;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
