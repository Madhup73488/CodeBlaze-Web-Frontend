import { Sun, Moon, Menu, X, ChevronDown, LogIn, User } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Import Link
import { useLoader } from "../../contexts/LoaderContext"; // Import useLoader
import codeBlazeLogo from "../../assets/images/codeblazelogoorange.png"; // Import the actual logo

function Navbar({
  theme = "dark",
  color = "orange",
  toggleTheme = () => {},
  // toggleColor = () => {}, // Assuming toggleColor might be used elsewhere or intended for future use
  openAuthModal = () => {}, // Prop to open the authentication modal
  onNavigate = (path) => {
    console.warn(`Navbar: onNavigate to "${path}" not implemented.`);
  }, // Prop for navigation (still needed for dropdowns)
  isAuthenticated, // Add isAuthenticated to props
  user, // Add user to props
}) {
  const { showLoaderFor } = useLoader(); // Use the loader hook
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock authentication state (can be replaced by global state)

  const dropdownRefs = useRef({});
  const profileDropdownRef = useRef(null);
  const navRef = useRef(null);

  const isAdmin = user && (user.role === "admin" || user.role === "superadmin");

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const handleNavigation = useCallback(
    (to) => {
      closeAllMenus();
      showLoaderFor(1500); // Show loader for 1.5 seconds on navigation
      onNavigate(to); // Use the onNavigate prop
    },
    [closeAllMenus, onNavigate, showLoaderFor]
  );

  const toggleMobileMenu = useCallback(() => {
    setActiveDropdown(null);
    setIsMenuOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleMouseEnter = useCallback((dropdownName) => {
    if (window.innerWidth > 768) {
      setActiveDropdown(dropdownName);
    }
  }, []);

  const handleDropdownClick = useCallback(
    (dropdownName) => {
      const newActiveDropdown =
        activeDropdown === dropdownName ? null : dropdownName;
      setActiveDropdown(newActiveDropdown);

      if (newActiveDropdown && window.innerWidth <= 768) {
        setTimeout(() => {
          const triggerElement = dropdownRefs.current[dropdownName];
          if (triggerElement) {
            triggerElement.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
        }, 100);
      }
    },
    [activeDropdown]
  );

  const handleDropdownSectionClick = useCallback(
    (to, e) => {
      e.preventDefault();
      e.stopPropagation();
      // handleNavigation will call closeAllMenus
      handleNavigation(to);
    },
    [handleNavigation]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (isMenuOpen) {
          setIsMenuOpen(false); // This will also trigger setActiveDropdown(null) via an effect
        }
        if (activeDropdown && activeDropdown !== "profile") {
          setActiveDropdown(null);
        }
      }

      if (
        activeDropdown === "profile" &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        event.target.closest &&
        !event.target.closest(".profile-container")
      ) {
        setActiveDropdown(null);
      }
    },
    [activeDropdown, isMenuOpen]
  );

  useEffect(() => {
    if (isMenuOpen || activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, activeDropdown, handleClickOutside]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen && window.innerWidth <= 768) {
      setActiveDropdown(null);
    }
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

  // This function will be called by the Login button
  const handleOpenAuthModal = () => {
    closeAllMenus();
    openAuthModal(); // Calls the prop passed to the Navbar
  };

  // The logout logic should be handled by the parent component (App.js) or AuthContext.
  // This function is removed to prevent undefined state setter calls.
  // const handleLogout = () => {
  //   setUser(null);
  //   setIsAuthenticated(false);
  //   closeAllMenus();
  //   handleNavigation("/"); // Navigate to home after logout
  // };

  const userIsAuthenticated = isAuthenticated && user;

  return (
    <>
      <nav className={`navbar ${theme}`} ref={navRef}>
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <div className="logo-container">
              <img
                src={codeBlazeLogo}
                alt="CodeBlaze Logo"
                className="navbar-logo-img"
              />
              <div className="logo-glow"></div>
            </div>
            <span className="brand-text">
              Code<span className="brand-accent">Blaze</span>
            </span>
          </Link>

          <div
            className="hamburger"
            onClick={toggleMobileMenu}
            role="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen.toString()}
          >
            <div className="hamburger-box">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </div>

          <div className={`nav-slide-wrapper ${isMenuOpen ? "open" : ""}`}>
            <div className="nav-links">
              <Link
                to="/"
                className="link hover-effect"
                onClick={() => {
                  closeAllMenus(); // Close menu on click
                  showLoaderFor(1500);
                }}
              >
                <span>Home</span>
                <div className="link-underline"></div>
              </Link>

              <div
                className={`link dropdown-trigger hover-effect ${
                  activeDropdown === "who" ? "active" : ""
                }`}
                ref={(el) => setDropdownRef(el, "who")}
                onMouseEnter={() => handleMouseEnter("who")}
                onClick={() => handleDropdownClick("who")}
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={(activeDropdown === "who").toString()}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleDropdownClick("who")
                }
              >
                <span>Who we are</span>
                <ChevronDown size={14} className="chevron-icon" />
                <div className="link-underline"></div>
              </div>

              {activeDropdown === "who" && (
                <div
                  className="dropdown-overlay"
                  onMouseEnter={() => handleMouseEnter("who")}
                  onMouseLeave={() =>
                    window.innerWidth > 768 && setActiveDropdown(null)
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-menu-container">
                    <div className="dropdown-content">
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/aboutus", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          handleDropdownSectionClick("/aboutus", e)
                        }
                      >
                        <div className="dropdown-icon">📋</div>
                        <div>
                          <h3 className="dropdown-title">About Us</h3>
                          <p className="dropdown-desc">
                            Learn about our company background and story
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/ourteam", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          handleDropdownSectionClick("/ourteam", e)
                        }
                      >
                        <div className="dropdown-icon">👥</div>
                        <div>
                          <h3 className="dropdown-title">Our Team</h3>
                          <p className="dropdown-desc">
                            Meet our passionate leadership team
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/ourmission", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          handleDropdownSectionClick("/ourmission", e)
                        }
                      >
                        <div className="dropdown-icon">🎯</div>
                        <div>
                          <h3 className="dropdown-title">Our Mission</h3>
                          <p className="dropdown-desc">
                            What drives us forward every day
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/ourvalues", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          handleDropdownSectionClick("/ourvalues", e)
                        }
                      >
                        <div className="dropdown-icon">💎</div>
                        <div>
                          <h3 className="dropdown-title">Our Values</h3>
                          <p className="dropdown-desc">
                            The core principles we live by
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
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={(activeDropdown === "forstudents").toString()}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleDropdownClick("forstudents")
                }
              >
                <span>For Students</span>
                <ChevronDown size={14} className="chevron-icon" />
                <div className="link-underline"></div>
              </div>

              {activeDropdown === "forstudents" && (
                <div
                  className="dropdown-overlay"
                  onMouseEnter={() => handleMouseEnter("forstudents")}
                  onMouseLeave={() =>
                    window.innerWidth > 768 && setActiveDropdown(null)
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-menu-container">
                    <div className="dropdown-content">
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/placement-guidance", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">🎓</div>
                        <div>
                          <h3 className="dropdown-title">Placement Guidance</h3>
                          <p className="dropdown-desc">
                            Personalized support to ace your placements
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/internships", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">💼</div>
                        <div>
                          <h3 className="dropdown-title">Internships</h3>
                          <p className="dropdown-desc">
                            Explore real-world internship opportunities
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/project-support", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">🚀</div>
                        <div>
                          <h3 className="dropdown-title">Project Support</h3>
                          <p className="dropdown-desc">
                            Get expert help for academic projects
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/webinars", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">📺</div>
                        <div>
                          <h3 className="dropdown-title">Webinars</h3>
                          <p className="dropdown-desc">
                            Join interactive sessions with experts
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/mentorship-programs", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">🤝</div>
                        <div>
                          <h3 className="dropdown-title">Mentorship</h3>
                          <p className="dropdown-desc">
                            Connect with mentors for guidance
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/skills-and-roles", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">⚡</div>
                        <div>
                          <h3 className="dropdown-title">Skills & Roles</h3>
                          <p className="dropdown-desc">
                            Discover essential tech skills
                          </p>
                        </div>
                      </div>
                      <div
                        className="dropdown-section"
                        onClick={(e) => {
                          closeAllMenus(); // Close menu on click
                          handleDropdownSectionClick("/job-seekers", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">🔍</div>
                        <div>
                          <h3 className="dropdown-title">Job Seekers</h3>
                          <p className="dropdown-desc">
                            Instant job updates & calls
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
                onClick={() => {
                  closeAllMenus(); // Close menu on click
                  showLoaderFor(1500);
                }}
              >
                <span>Careers</span>
                <div className="link-underline"></div>
              </Link>
              <Link
                to="/resources"
                className="link hover-effect"
                onClick={() => {
                  closeAllMenus(); // Close menu on click
                  showLoaderFor(1500);
                }}
              >
                <span>Resources</span>
                <div className="link-underline"></div>
              </Link>
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
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                <div className="theme-icon-container">
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </div>
              </button>

              {userIsAuthenticated ? (
                <div
                  className="profile-container"
                  onClick={() => handleDropdownClick("profile")}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={(activeDropdown === "profile").toString()}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleDropdownClick("profile")
                  }
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
                        <div className="profile-placeholder">
                          <User size={16} color="#fff" />
                        </div>
                      )}
                      <div className="profile-status-dot"></div>
                    </div>
                    <div className="profile-info">
                      <span className="profile-name">
                        {user?.name?.split(" ")[0]}
                      </span>
                      <ChevronDown
                        size={12}
                        className={`profile-chevron ${
                          activeDropdown === "profile" ? "open" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {activeDropdown === "profile" && (
                    <div
                      className="profile-dropdown"
                      ref={profileDropdownRef}
                      role="menu"
                    >
                      <div className="profile-dropdown-header">
                        <div className="profile-header-avatar">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" />
                          ) : (
                            <div className="profile-header-placeholder">
                              <User size={20} color="#fff" />
                            </div>
                          )}
                        </div>
                        <div className="profile-header-info">
                          <p className="profile-header-name">
                            {user?.name || user?.displayName || "User"}
                          </p>
                          <p className="profile-header-email">
                            {user?.email || ""}
                          </p>
                          {isAdmin && (
                            <span className="profile-role-badge">Admin</span>
                          )}
                        </div>
                      </div>
                      <div className="profile-dropdown-menu">
                        <div
                          className="profile-menu-item"
                          role="menuitem"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation("/profile");
                          }}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleNavigation("/profile")
                          }
                        >
                          <span>👤</span>
                          <span>My Profile</span>
                        </div>
                        <div
                          className="profile-menu-item"
                          role="menuitem"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation(
                              isAdmin
                                ? "/admin/dashboard"
                                : "/profile/dashboard"
                            );
                          }}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            handleNavigation(
                              isAdmin
                                ? "/admin/dashboard"
                                : "/profile/dashboard"
                            )
                          }
                        >
                          <span>📊</span>
                          <span>Dashboard</span>
                        </div>
                        {isAdmin && (
                          <div
                            className="profile-menu-item"
                            role="menuitem"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigation("/admin/settings");
                            }}
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              handleNavigation("/admin/settings")
                            }
                          >
                            <span>⚙️</span>
                            <span>Admin Settings</span>
                          </div>
                        )}
                        <div
                          className="profile-menu-item"
                          role="menuitem"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation("/settings");
                          }}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleNavigation("/settings")
                          }
                        >
                          <span>🔧</span>
                          <span>Settings</span>
                        </div>
                        <div className="profile-menu-divider"></div>
                        <div
                          className="profile-menu-item logout"
                          role="menuitem"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            // handleLogout(); // Removed, logout should be handled by parent
                          }}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            // handleLogout() // Removed, logout should be handled by parent
                            console.log(
                              "Logout action triggered (handled by parent)"
                            )
                          }
                        >
                          <span>🚪</span>
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Login button now calls handleOpenAuthModal
                <button className="login-button" onClick={handleOpenAuthModal}>
                  <LogIn size={16} />
                  <span>Login</span>
                  <div className="button-shine"></div>
                </button>
                // If you still want the mock toggle for quick demo, you could add a separate, temporary button
                // For example: <button onClick={toggleAuthForDemo}>Demo Toggle Auth</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {(isMenuOpen || activeDropdown) && (
        <div className="mobile-backdrop" onClick={closeAllMenus} />
      )}

      <style jsx>{`
        /* Paste the exact CSS from your previous component version here */
        /* Ensure it includes all styles for .navbar, .navbar-container, .profile-chevron.open, etc. */
        /* AND all @media (max-width: 768px) styles for responsiveness */

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar.dark {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(15, 15, 15, 0.97) 50%,
            rgba(10, 10, 10, 0.95) 100%
          );
          color: #ffffff;
        }

        .navbar.light {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(250, 250, 250, 0.97) 50%,
            rgba(255, 255, 255, 0.95) 100%
          );
          color: #0a0a0a;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.875rem 5%;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 1.5rem;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .navbar-brand:hover {
          transform: translateY(-1px);
        }
        .navbar-brand:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: 2px;
          border-radius: 4px;
        }

        .logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-logo-img {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          position: relative;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 3rem;
          height: 3rem;
          background: radial-gradient(
            circle,
            ${primaryColor}40 0%,
            transparent 70%
          );
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .navbar-brand:hover .logo-glow {
          opacity: 1;
        }

        .brand-text {
          letter-spacing: -0.5px;
          background: linear-gradient(
            135deg,
            ${theme === "dark" ? "#ffffff" : "#0a0a0a"} 0%,
            ${theme === "dark" ? "#e5e5e5" : "#374151"} 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-accent {
          color: ${primaryColor};
          -webkit-text-fill-color: ${primaryColor};
        }

        .hamburger {
          display: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: ${theme === "dark"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)"};
          z-index: 1002;
        }

        .hamburger:hover {
          background: ${theme === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)"};
          transform: scale(1.05);
        }
        .hamburger:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: 2px;
        }

        .hamburger-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-slide-wrapper {
          display: flex;
          align-items: center;
          gap: 3rem;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
            opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          position: relative;
          align-items: center;
        }

        .nav-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .link {
          cursor: pointer;
          position: relative;
          padding: 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          border-radius: 4px;
        }
        .link:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: -1px;
        }

        .link span {
          position: relative;
        }

        .link-underline {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            ${primaryColor},
            ${primaryColor}80
          );
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1px;
        }

        .hover-effect:hover .link-underline,
        .link.dropdown-trigger.active .link-underline {
          width: 100%;
        }

        .hover-effect:hover,
        .link.dropdown-trigger.active {
          color: ${primaryColor};
        }
        .hover-effect:hover {
          transform: translateY(-1px);
        }

        .dropdown-trigger {
          position: relative;
        }

        .chevron-icon {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.7;
        }

        .dropdown-trigger.active .chevron-icon {
          transform: rotate(180deg);
          opacity: 1;
        }

        .dropdown-overlay {
          position: fixed;
          top: calc(4.5rem - 1px);
          left: 0;
          width: 100%;
          background: ${theme === "dark"
            ? "linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(20, 20, 20, 0.99) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.99) 100%)"};
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 2.5rem 5%;
          z-index: 999;
          overflow-y: auto;
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: calc(100vh - (4.5rem - 1px));
          border-bottom: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
        }

        @keyframes slideDown {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .dropdown-menu-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          width: 100%;
        }

        .dropdown-content {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .dropdown-section {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 16px;
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
          background: ${theme === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.03) 100%)"};
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .dropdown-section:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: 0px;
        }

        .dropdown-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, ${primaryColor}1A, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dropdown-section:hover::before {
          opacity: 1;
        }

        .dropdown-section:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
          border-color: ${primaryColor}66;
        }

        .dropdown-icon {
          font-size: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)"};
          border-radius: 12px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .dropdown-section:hover .dropdown-icon {
          transform: scale(1.1);
          background: linear-gradient(
            135deg,
            ${primaryColor}33,
            ${primaryColor}1A
          );
        }

        .dropdown-title {
          font-weight: 600;
          font-size: 1.1rem;
          margin: 0 0 0.5rem 0;
          color: ${primaryColor};
          line-height: 1.3;
        }

        .dropdown-desc {
          font-size: 0.9rem;
          margin: 0;
          color: ${theme === "dark" ? "#c1c1c1" : "#6b7280"};
          line-height: 1.5;
        }

        .theme-toggle {
          padding: 0.75rem;
          border-radius: 12px;
          background: ${theme === "dark"
            ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)"};
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
          position: relative;
          overflow: hidden;
        }
        .theme-toggle:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: 2px;
        }

        .theme-toggle::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, ${primaryColor}33, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .theme-toggle:hover::before {
          opacity: 1;
        }

        .theme-toggle:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border-color: ${primaryColor}66;
        }

        .theme-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .login-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(
            135deg,
            ${primaryColor} 0%,
            ${primaryColor}CC 100%
          );
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        .login-button:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: 2px;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px ${primaryColor}66;
        }

        .button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s ease;
        }
        .login-button:hover .button-shine {
          left: 100%;
          transition: left 0.4s ease;
        }

        .profile-container {
          position: relative;
          cursor: pointer;
          border-radius: 12px;
          padding: 0.5rem;
          transition: background-color 0.2s ease;
        }
        .profile-container:hover,
        .profile-container:focus-visible {
          background-color: ${theme === "dark"
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.04)"};
        }
        .profile-container:focus-visible {
          outline: 2px solid ${primaryColor};
          outline-offset: 0px;
        }

        .profile-content {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .profile-image-container {
          position: relative;
          width: 2rem;
          height: 2rem;
        }

        .profile-image,
        .profile-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid
            ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"};
        }
        .profile-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${primaryColor};
        }

        .profile-status-dot {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 0.6rem;
          height: 0.6rem;
          background-color: #22c55e;
          border-radius: 50%;
          border: 2px solid ${theme === "dark" ? "#1f2937" : "#ffffff"};
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .profile-name {
          font-weight: 500;
          font-size: 0.9rem;
          color: inherit;
        }
        .profile-chevron {
          transition: transform 0.2s ease;
        }
        .profile-chevron.open {
          transform: rotate(180deg);
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 0.75rem);
          right: 0;
          width: 280px;
          background: ${theme === "dark"
            ? "rgba(25,25,25,0.98)"
            : "rgba(252,252,252,0.98)"};
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          z-index: 1050;
          overflow: hidden;
          animation: fadeInScale 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          color: ${theme === "dark" ? "#e5e7eb" : "#1f2937"};
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .profile-dropdown-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
        }
        .profile-header-avatar img,
        .profile-header-placeholder {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-header-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${primaryColor};
        }
        .profile-header-info p {
          margin: 0;
          line-height: 1.4;
        }
        .profile-header-name {
          font-weight: 600;
          font-size: 1rem;
          color: ${theme === "dark" ? "#ffffff" : "#0a0a0a"};
        }
        .profile-header-email {
          font-size: 0.8rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }
        .profile-role-badge {
          background-color: ${primaryColor}33;
          color: ${primaryColor};
          font-size: 0.7rem;
          font-weight: 500;
          padding: 0.1rem 0.4rem;
          border-radius: 6px;
          margin-top: 0.25rem;
          display: inline-block;
        }

        .profile-dropdown-menu {
          padding: 0.5rem;
        }
        .profile-menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .profile-menu-item:hover,
        .profile-menu-item:focus-visible {
          background-color: ${primaryColor}26;
          color: ${primaryColor};
        }
        .profile-menu-item:focus-visible {
          outline: none;
        }
        .profile-menu-item span:first-child {
          font-size: 1.1rem;
        }
        .profile-menu-divider {
          height: 1px;
          background-color: ${theme === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"};
          margin: 0.5rem 0;
        }
        .profile-menu-item.logout:hover,
        .profile-menu-item.logout:focus-visible {
          background-color: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .mobile-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0.75rem 4%;
          }
          .hamburger {
            display: flex;
          }
          .nav-slide-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 80%;
            max-width: 320px;
            height: 100vh;
            background: ${theme === "dark"
              ? "rgba(18,18,18,1)"
              : "rgba(253,253,253,1)"};
            flex-direction: column;
            align-items: flex-start;
            padding: 5rem 1.5rem 2rem;
            gap: 1.5rem;
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            overflow-y: auto;
          }
          .nav-slide-wrapper.open {
            transform: translateX(0);
          }
          .nav-links {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            gap: 0.5rem;
          }
          .nav-actions {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid
              ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
          }
          .link {
            width: 100%;
            padding: 0.8rem 0.5rem;
            font-size: 1rem;
            justify-content: space-between;
          }
          .link-underline {
            display: none;
          }
          .hover-effect:hover {
            transform: none;
          }
          .link.dropdown-trigger.active {
            color: ${primaryColor};
          }

          .dropdown-trigger.active .link-underline {
            width: 0;
          }

          .dropdown-overlay {
            position: static;
            width: 100%;
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            box-shadow: none;
            padding: 0.5rem 0 0.5rem 1rem;
            max-height: none;
            animation: none;
            border-bottom: none;
            overflow-y: visible;
            margin-top: 0.25rem;
            border-left: 2px solid ${primaryColor}33;
          }
          .dropdown-menu-container {
            max-width: none;
            margin: 0;
          }
          .dropdown-content {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .dropdown-section {
            padding: 0.8rem;
            border: none;
            background: transparent;
            border-radius: 8px;
          }
          .dropdown-section:hover,
          .dropdown-section:focus-visible {
            background: ${theme === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.03)"};
            transform: none;
            box-shadow: none;
            border-color: transparent;
          }
          .dropdown-section::before {
            display: none;
          }
          .dropdown-icon {
            font-size: 1.2rem;
            width: 2rem;
            height: 2rem;
          }
          .dropdown-title {
            font-size: 0.95rem;
          }
          .dropdown-desc {
            font-size: 0.8rem;
          }

          .theme-toggle,
          .login-button,
          .profile-container {
            width: 100%;
            justify-content: center;
          }
          .profile-container {
            padding: 0.75rem;
          }
          .profile-dropdown {
            width: calc(100% + 3rem);
            left: -1.5rem;
            right: auto;
            top: calc(100% + 0.5rem);
            position: absolute;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
