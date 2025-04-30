import { Sun, Moon, Menu, X, ChevronDown, LogIn, User } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoader } from "../../contexts/LoaderContext";
import { useAuth } from "../../contexts/AuthContext";

function Navbar({ theme, color, toggleTheme, toggleColor, openAuthModal }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const { startLoader, stopLoader } = useLoader();
  const { isAuthenticated, user, logout } = useAuth();

  const dropdownRefs = useRef({});
  const profileDropdownRef = useRef(null);
  const navRef = useRef(null);
  const dropdownContentRef = useRef(null);

  useEffect(() => {
    console.log("Auth state in Navbar:", { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleNavigation = useCallback(
    (to) => {
      startLoader();
      closeAllMenus();

      setTimeout(() => {
        stopLoader();
        if (to) {
          navigate(to);
        }
      }, 1500);
    },
    [navigate, startLoader, stopLoader]
  );

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (dropdownName) => {
    if (window.innerWidth > 768) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);

    // Scroll to show dropdown content on mobile after a slight delay to allow rendering
    if (activeDropdown !== dropdownName && window.innerWidth <= 768) {
      setTimeout(() => {
        const activeTrigger = document.querySelector(
          `.dropdown-trigger.active`
        );
        if (activeTrigger) {
          activeTrigger.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleDropdownSectionClick = useCallback(
    (to, e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus();
      handleNavigation(to);
    },
    [handleNavigation]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (
        activeDropdown &&
        activeDropdown !== "profile" &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }

      if (
        activeDropdown === "profile" &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    },
    [activeDropdown]
  );

  useEffect(() => {
    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown, handleClickOutside]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const setDropdownRef = (element, name) => {
    if (element) {
      dropdownRefs.current[name] = element;
    }
  };

  const handleThemeToggle = (e) => {
    e.stopPropagation();
    toggleTheme();
  };

  const handleColorToggle = (e) => {
    e.stopPropagation();
    toggleColor();
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    closeAllMenus();
    startLoader();

    setTimeout(() => {
      stopLoader();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 1500);
  };

  const handleOpenAuthModal = () => {
    closeAllMenus();
    openAuthModal();
  };

  const handleLogout = () => {
    logout();
    setActiveDropdown(null);
    handleNavigation("/");
  };

  const userIsAuthenticated = isAuthenticated && user;

  return (
    <>
      <nav className={`navbar ${theme}`} ref={navRef}>
        <div className="navbar-brand">
          <div
            className="logo-box pulse"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <Link
            to="/"
            className="brand-text"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
          >
            CodeBlaze
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`nav-slide-wrapper ${isMenuOpen ? "open" : ""}`}>
          <div className="nav-links">
            <Link
              to="/"
              className="link hover-effect"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
            >
              Home
            </Link>

            <div
              className={`link dropdown-trigger hover-effect ${
                activeDropdown === "who" ? "active" : ""
              }`}
              ref={(el) => setDropdownRef(el, "who")}
              onMouseEnter={() => handleMouseEnter("who")}
              onClick={() => handleDropdownClick("who")}
            >
              Who we are <ChevronDown size={15} className="chevron-icon" />
            </div>
            {activeDropdown === "who" && (
              <div
                className="dropdown-overlay"
                onMouseEnter={() => handleMouseEnter("who")}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="dropdown-menu-container"
                  ref={dropdownContentRef}
                >
                  <div className="dropdown-content">
                    <div
                      className="dropdown-section"
                      onClick={(e) => handleDropdownSectionClick("/aboutus", e)}
                    >
                      <div>
                        <h3 className="dropdown-title">About Us</h3>
                        <p className="dropdown-desc">
                          Learn about our company background
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) => handleDropdownSectionClick("/ourteam", e)}
                    >
                      <div>
                        <h3 className="dropdown-title">Our Team</h3>
                        <p className="dropdown-desc">
                          Meet our leadership team
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/ourmission", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Our Mission</h3>
                        <p className="dropdown-desc">What drives us forward</p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/ourvalues", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Our Values</h3>
                        <p className="dropdown-desc">
                          The principles we live by
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`link dropdown-trigger hover-effect ${
                activeDropdown === "forstudents" ? "active" : ""
              }`}
              ref={(el) => setDropdownRef(el, "forstudents")}
              onMouseEnter={() => handleMouseEnter("forstudents")}
              onClick={() => handleDropdownClick("forstudents")}
            >
              For Students <ChevronDown size={15} className="chevron-icon" />
            </div>
            {activeDropdown === "forstudents" && (
              <div
                className="dropdown-overlay"
                onMouseEnter={() => handleMouseEnter("forstudents")}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="dropdown-menu-container"
                  ref={dropdownContentRef}
                >
                  <div className="dropdown-content">
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/placement-guidance", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Placement Guidance</h3>
                        <p className="dropdown-desc">
                          Personalized support to ace your placements and crack
                          interviews.
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/internships", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Internships</h3>
                        <p className="dropdown-desc">
                          Explore real-world internship opportunities and skill
                          development.
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/project-support", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Project Support</h3>
                        <p className="dropdown-desc">
                          Get expert help and guidance to complete academic or
                          personal projects.
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/webinars", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Webinars</h3>
                        <p className="dropdown-desc">
                          Join interactive webinars hosted by industry experts
                          and educators.
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/mentorship-programs", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Mentorship Programs</h3>
                        <p className="dropdown-desc">
                          Connect with mentors for guidance on career and
                          personal growth.
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/skills-and-roles", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Skills & Roles</h3>
                        <p className="dropdown-desc">
                          Discover essential skills mapped to trending tech
                          roles.
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick("/job-seekers", e)
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Job Seekers Portal</h3>
                        <p className="dropdown-desc">
                          Get Job Updates as soon as possible, apply it, get
                          interview call soon, and get hired
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Link
              to="/careers"
              className="link hover-effect"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/careers");
              }}
            >
              Careers
            </Link>
            <a
              href="#contact"
              className="link hover-effect"
              onClick={handleContactClick}
            >
              Contact Us
            </a>
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={handleThemeToggle}
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              style={{
                color: theme === "dark" ? "#ffffff" : "#0a0a0a",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {userIsAuthenticated ? (
              <div
                className="profile-container"
                ref={profileDropdownRef}
                onClick={() => handleDropdownClick("profile")}
              >
                <div className="profile-content">
                  <div className="profile-image-container">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : (
                      <div
                        className="profile-placeholder"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <User size={16} color="#fff" />
                      </div>
                    )}
                  </div>
                </div>

                {activeDropdown === "profile" && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <p className="profile-name">
                        {user?.name || user?.displayName || "User"}
                      </p>
                      <p className="profile-email">{user?.email || ""}</p>
                    </div>
                    <div className="profile-dropdown-menu">
                      <div
                        className="profile-menu-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigation("/profile");
                        }}
                      >
                        My Profile
                      </div>
                      <div
                        className="profile-menu-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigation("/profile/dashboard");
                        }}
                      >
                        Dashboard
                      </div>
                      <div
                        className="profile-menu-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigation("/settings");
                        }}
                      >
                        Settings
                      </div>
                      <div
                        className="profile-menu-item logout"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogout();
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="login-button"
                onClick={handleOpenAuthModal}
                style={{
                  backgroundColor: "transparent",
                  color: primaryColor,
                  border: `1px solid ${primaryColor}`,
                }}
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {(isMenuOpen || activeDropdown) && (
        <div className="mobile-backdrop" onClick={closeAllMenus} />
      )}

      <style jsx>{`
        /* Base navbar styles */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 5%;
          flex-wrap: wrap;
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .navbar.dark {
          background-color: rgba(10, 10, 10, 0.97);
          color: #ffffff;
        }
        .navbar.light {
          background-color: rgba(255, 255, 255, 0.97);
          color: #0a0a0a;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: bold;
          font-size: 1.5rem;
          transition: transform 0.2s ease;
        }
        .navbar-brand:hover {
          transform: translateY(-2px);
        }
        .logo-box {
          width: 2rem;
          height: 2rem;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0
              rgba(
                ${primaryColor === "#a855f7" ? "168, 85, 247" : "249, 115, 22"},
                0.4
              );
          }
          70% {
            box-shadow: 0 0 0 8px
              rgba(
                ${primaryColor === "#a855f7" ? "168, 85, 247" : "249, 115, 22"},
                0
              );
          }
          100% {
            box-shadow: 0 0 0 0
              rgba(
                ${primaryColor === "#a855f7" ? "168, 85, 247" : "249, 115, 22"},
                0
              );
          }
        }
        .brand-text {
          text-decoration: none;
          color: inherit;
          letter-spacing: 0.5px;
        }
        .hamburger {
          display: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
        }
        .hamburger:hover {
          background-color: ${theme === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.05)"};
        }

        /* Desktop navigation - default flex row */
        .nav-slide-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2.5rem;
          transition: all 0.3s ease;
        }

        /* Nav links and actions inline on desktop */
        .nav-links {
          display: flex;
          gap: 2rem;
          position: relative;
          align-items: center;
        }
        .nav-actions {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
        .link {
          cursor: pointer;
          position: relative;
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
          color: inherit;
          font-weight: 500;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        /* Hover effect for links */
        .hover-effect:after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: ${primaryColor};
          transition: width 0.3s ease;
        }
        .hover-effect:hover:after {
          width: 100%;
        }
        .hover-effect:hover {
          color: ${primaryColor};
        }

        /* Dropdown styles */
        .dropdown-trigger {
          position: relative;
        }
        .dropdown-trigger.active {
          color: ${primaryColor};
        }
        .dropdown-trigger.active:after {
          width: 100%;
        }
        .dropdown-trigger .chevron-icon {
          transition: transform 0.3s ease;
        }
        .dropdown-trigger.active .chevron-icon {
          transform: rotate(180deg);
        }
        .dropdown-overlay {
          position: fixed;
          top: 4rem;
          left: 0;
          width: 100%;
          background-color: ${theme === "dark"
            ? "rgba(17, 17, 17, 0.98)"
            : "rgba(255, 255, 255, 0.98)"};
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          padding: 2rem 5%;
          z-index: 40;
          overflow-y: auto;
          animation: fadeInDown 0.3s ease;
          max-height: calc(100vh - 4rem);
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dropdown-menu-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          width: 100%;
        }
        .dropdown-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }
        .dropdown-section {
          padding: 1rem;
          transition: all 0.2s ease;
          border-radius: 10px;
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
        }
        .dropdown-section:hover {
          background-color: ${theme === "dark" ? "#1a1a1a" : "#f3f4f6"};
          cursor: pointer;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .dropdown-title {
          font-weight: 600;
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
          color: ${primaryColor};
        }
        .dropdown-desc {
          font-size: 0.9rem;
          margin: 0;
          color: ${theme === "dark" ? "#e5e5e5" : "#4b5563"};
          line-height: 1.4;
        }

        /* Profile styles */
        .profile-container {
          position: relative;
          cursor: pointer;
        }
        .profile-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem;
        }
        .profile-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${theme === "dark" ? "#fff" : "#000"};
        }
        .profile-image-container {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid ${primaryColor};
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .profile-image-container:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 0.75rem);
          right: 0;
          min-width: 220px;
          background-color: ${theme === "dark" ? "#111" : "#fff"};
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          z-index: 50;
          animation: fadeInUp 0.3s ease;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .profile-dropdown-header {
          padding: 1.25rem;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#eee"};
        }
        .profile-name {
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: ${theme === "dark" ? "#fff" : "#000"};
        }
        .profile-email {
          font-size: 0.8rem;
          margin: 0;
          color: ${theme === "dark" ? "#aaa" : "#666"};
        }
        .profile-dropdown-menu {
          padding: 0.5rem 0;
        }
        .profile-menu-item {
          padding: 0.75rem 1.25rem;
          transition: all 0.2s ease;
          cursor: pointer;
          color: ${theme === "dark" ? "#eee" : "#333"};
          font-weight: 500;
        }
        .profile-menu-item:hover {
          background-color: ${theme === "dark" ? "#222" : "#f5f5f5"};
          padding-left: 1.5rem;
        }
        .profile-menu-item.logout {
          color: #ef4444;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#eee"};
          margin-top: 0.5rem;
        }

        /* Button styles */
        .theme-toggle,
        .color-toggle {
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: ${theme === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.05)"};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .theme-toggle:hover,
        .color-toggle:hover {
          transform: translateY(-2px);
          background: ${theme === "dark"
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.1)"};
        }
        .login-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px
            rgba(
              ${primaryColor === "#a855f7" ? "168, 85, 247" : "249, 115, 22"},
              0.25
            );
          background-color: ${primaryColor};
          color: white !important;
        }
        .mobile-backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 45;
          backdrop-filter: blur(3px);
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 1rem;
          }
          .hamburger {
            display: block;
          }
          .nav-slide-wrapper {
            flex-direction: column;
            width: 100%;
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: all 0.3s ease-in-out;
            align-items: flex-start;
            padding: 0;
          }
          .nav-slide-wrapper.open {
            max-height: 80vh;
            opacity: 1;
            overflow-y: auto;
            margin-top: 1rem;
            padding-bottom: 1rem;
          }
          .nav-links,
          .nav-actions {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            gap: 0;
          }
          .nav-links {
            padding-top: 0;
            max-height: 60vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .nav-links .link {
            padding: 0.85rem 0;
            width: 100%;
            border-bottom: 1px solid
              ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"};
          }
          .dropdown-trigger.active {
            border-bottom: none !important;
          }
          .dropdown-trigger.active .chevron-icon {
            transform: rotate(180deg);
          }
          .nav-actions {
            margin: 1rem 0 0;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
          }
          .theme-toggle {
            margin-right: auto;
          }
          .login-button {
            margin-top: 0;
            width: 100%;
            justify-content: center;
          }
          .dropdown-overlay {
            position: static;
            width: 100%;
            box-shadow: none;
            padding: 0 0 0.75rem;
            margin-bottom: 0.5rem;
            background-color: ${theme === "dark"
              ? "rgba(30,30,30,0.4)"
              : "rgba(245,245,245,0.4)"};
            animation: none;
            max-height: none;
            overflow-y: visible;
            border-radius: 8px;
          }
          .dropdown-menu-container {
            position: relative;
            padding-left: 1rem;
            border-left: 3px solid ${primaryColor};
            margin-left: 0.5rem;
            overflow-y: auto;
            max-height: 300px;
            scrollbar-width: thin;
            scrollbar-color: ${primaryColor} transparent;
          }
          .dropdown-menu-container::-webkit-scrollbar {
            width: 4px;
          }
          .dropdown-menu-container::-webkit-scrollbar-thumb {
            background-color: ${primaryColor};
            border-radius: 4px;
          }
          .dropdown-content {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            padding: 0.5rem 0;
          }
          .dropdown-section {
            padding: 0.75rem;
            margin-bottom: 0.25rem;
            border: none;
            background-color: ${theme === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.03)"};
            transition: all 0.2s ease;
          }
          .dropdown-section:hover {
            transform: translateX(3px);
            background-color: ${theme === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.05)"};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .dropdown-title {
            font-size: 0.95rem;
            margin-bottom: 0.25rem;
          }
          .dropdown-desc {
            font-size: 0.8rem;
            opacity: 0.9;
          }
          .mobile-backdrop {
            display: block;
          }

          /* Mobile profile improvements */
          .profile-container {
            width: 100%;
            margin-top: 0.5rem;
          }
          .profile-content {
            width: 100%;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 8px;
            background-color: ${theme === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.03)"};
          }
          .profile-dropdown {
            position: static;
            width: 100%;
            margin-top: 0.75rem;
            box-shadow: none;
            border: 1px solid
              ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
            animation: fadeIn 0.3s ease;
          }
          .profile-dropdown-header {
            padding: 0.75rem 1rem;
          }
          .profile-menu-item {
            padding: 0.75rem 1rem;
          }
          .profile-menu-item:hover {
            padding-left: 1.25rem;
          }

          /* Auto scroll to active dropdown */
          .dropdown-trigger.active + .dropdown-overlay {
            scroll-margin-top: 4rem;
          }
        }

        /* Additional responsive improvements for medium screens */
        @media (min-width: 769px) and (max-width: 1024px) {
          .navbar {
            padding: 0.75rem 3%;
          }
          .nav-links {
            gap: 1.5rem;
          }
          .dropdown-content {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        /* Small screen improvements */
        @media (max-width: 380px) {
          .navbar-brand {
            font-size: 1.25rem;
          }
          .logo-box {
            width: 1.75rem;
            height: 1.75rem;
          }
          .link {
            font-size: 0.95rem;
          }
          .profile-image-container {
            width: 2.25rem;
            height: 2.25rem;
          }
          .hamburger {
            padding: 0.35rem;
          }
          .dropdown-title {
            font-size: 0.9rem;
          }
          .dropdown-desc {
            font-size: 0.75rem;
          }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .pulse,
          .hover-effect:after,
          .dropdown-overlay,
          .profile-dropdown,
          .mobile-backdrop,
          * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
