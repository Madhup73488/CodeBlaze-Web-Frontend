import { Sun, Moon, Menu, X, ChevronDown, LogIn, User } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Navbar.css";
import { useLoader } from "../../contexts/LoaderContext"; // Import useLoader
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
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
  handleLogout, // Add handleLogout to props
}) {
  const { showLoaderFor } = useLoader(); // Use the loader hook
  const { logout } = useAuth(); // Use the logout function from AuthContext
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Mock authentication state (can be replaced by global state)

  const dropdownRefs = useRef({});
  const profileDropdownRef = useRef(null);
  const navRef = useRef(null);

  // Corrected admin check to use user.roles array
  const isAdmin =
    user &&
    user.roles &&
    (user.roles.includes("admin") || user.roles.includes("superadmin"));

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const handleNavigation = useCallback(
    (to) => {
      closeAllMenus();
      // showLoaderFor(1500); // Temporarily commented out to test navigation
      onNavigate(to); // Use the onNavigate prop
    },
    [closeAllMenus, onNavigate] // Removed showLoaderFor from dependencies for now
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
      console.log("Window innerWidth:", window.innerWidth); // Add this log
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
                to="/services"
                className="link hover-effect"
                onClick={() => {
                  closeAllMenus(); // Close menu on click
                  showLoaderFor(1500);
                }}
              >
                <span>Services</span>
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
                          handleDropdownSectionClick("/internships", e);
                        }}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="dropdown-icon">💼</div>
                        <div>
                          <h3 className="dropdown-title">
                            Internship at Codeblaze
                          </h3>
                          <div style={{ color: "green" }}> Popular</div>
                          <p className="dropdown-desc">
                            Explore real-world internship opportunities
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
                            logout(); // Call the logout function from AuthContext
                            closeAllMenus(); // Close menu after logout
                            handleNavigation("/"); // Navigate to home after logout
                          }}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (logout(), closeAllMenus(), handleNavigation("/"))
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

    </>
  );
}

export default Navbar;
