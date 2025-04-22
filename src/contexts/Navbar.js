import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoader } from "./LoaderContext"; // Assuming a global loader context

function Navbar({ theme, color, toggleTheme, toggleColor }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const { startLoader, stopLoader } = useLoader(); // Using global loader hook

  const dropdownRefs = useRef({});
  const navRef = useRef(null);

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleNavigation = useCallback(
    (to) => {
      startLoader(); // Use global loader
      closeAllMenus(); // Close menus before navigation

      setTimeout(() => {
        stopLoader(); // Stop loader after navigation
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
  };

  const handleDropdownSectionClick = useCallback(
    (to, e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus(); // Always close menus when clicking on a dropdown section
      handleNavigation(to);
    },
    [handleNavigation]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
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

  // Effect to close menu when window resizes
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
    closeAllMenus(); // Close menus when clicking contact
    startLoader(); // Use global loader

    setTimeout(() => {
      stopLoader(); // Stop loader
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 1500);
  };

  return (
    <>
      <nav className={`navbar ${theme}`} ref={navRef}>
        <div className="navbar-brand">
          <div
            className="logo-box"
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
              className="link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
            >
              Home
            </Link>

            <div
              className={`link dropdown-trigger ${
                activeDropdown === "who" ? "active" : ""
              }`}
              ref={(el) => setDropdownRef(el, "who")}
              onMouseEnter={() => handleMouseEnter("who")}
              onClick={() => handleDropdownClick("who")}
            >
              Who we are <ChevronDown size={15} />
            </div>
            {activeDropdown === "who" && (
              <div
                className="dropdown-overlay"
                onMouseEnter={() => handleMouseEnter("who")}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-menu-container">
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
              className={`link dropdown-trigger ${
                activeDropdown === "forstudents" ? "active" : ""
              }`}
              ref={(el) => setDropdownRef(el, "forstudents")}
              onMouseEnter={() => handleMouseEnter("forstudents")}
              onClick={() => handleDropdownClick("forstudents")}
            >
              For Students <ChevronDown size={15} />
            </div>
            {activeDropdown === "forstudents" && (
              <div
                className="dropdown-overlay"
                onMouseEnter={() => handleMouseEnter("forstudents")}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-menu-container">
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
                  </div>
                </div>
              </div>
            )}

            <Link
              to="/careers"
              className="link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/careers");
              }}
            >
              Careers
            </Link>
            <a href="#contact" className="link" onClick={handleContactClick}>
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
                border: `1px solid ${theme === "dark" ? "#ffffff" : "#0a0a0a"}`,
                color: theme === "dark" ? "#ffffff" : "#0a0a0a",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="color-toggle"
              onClick={handleColorToggle}
              title={
                color === "purple"
                  ? "Switch to orange theme"
                  : "Switch to purple theme"
              }
              style={{ backgroundColor: primaryColor }}
            >
              {color === "purple" ? "Orange" : "Purple"}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile */}
      {(isMenuOpen || activeDropdown) && (
        <div className="mobile-backdrop" onClick={closeAllMenus} />
      )}

      <style jsx>{`
        /* Base navbar styles */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 5%;
          flex-wrap: wrap;
          position: relative;
          z-index: 50;
        }
        .navbar.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }
        .navbar.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: bold;
          font-size: 1.5rem;
        }
        .logo-box {
          width: 2rem;
          height: 2rem;
          border-radius: 4px;
        }
        .brand-text {
          text-decoration: none;
          color: inherit;
        }
        .hamburger {
          display: none;
          cursor: pointer;
        } /* Desktop navigation - default flex row */
        .nav-slide-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2rem;
        } /* Nav links and actions inline on desktop */
        .nav-links {
          display: flex;
          gap: 2rem;
          position: relative;
        }
        .nav-actions {
          display: flex;
          gap: 1rem;
        }
        .link {
          cursor: pointer;
          position: relative;
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-decoration: none;
          color: inherit;
        } /* Dropdown styles */
        .dropdown-trigger {
          position: relative;
        }
        .dropdown-trigger.active {
          color: ${primaryColor};
        }
        .dropdown-overlay {
          position: fixed;
          top: 4rem;
          left: 0;
          width: 100%;
          background-color: ${theme === "dark" ? "#111" : "#fff"};
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 2rem 5%;
          z-index: 40;
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
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 2rem;
          width: 100%;
        }
        .dropdown-section {
          padding: 0.5rem;
          transition: all 0.2s ease;
          border-radius: 8px;
        }
        .dropdown-section:hover {
          background-color: ${theme === "dark" ? "#222" : "#f8f8f8"};
          cursor: pointer;
        }
        .dropdown-title {
          font-weight: 600;
          font-size: 1rem;
          margin: 0 0 0.5rem 0;
          color: ${primaryColor};
        }
        .dropdown-desc {
          font-size: 0.875rem;
          margin: 0;
          color: ${theme === "dark" ? "#e5e5e5" : "#555"};
          opacity: 0.9;
        }
        .theme-toggle,
        .color-toggle {
          padding: 0.5rem;
          border-radius: 0.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .color-toggle {
          color: #fff;
          border: none;
        }
        .mobile-backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 30;
        } /* Mobile Styles */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }
          .nav-slide-wrapper {
            flex-direction: column;
            width: 100%;
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: all 0.4s ease-in-out;
            align-items: flex-start;
          }
          .nav-slide-wrapper.open {
            max-height: 90vh;
            opacity: 1;
            overflow-y: auto;
            margin-top: 1rem;
          }
          .nav-links,
          .nav-actions {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            gap: 0.5rem;
          }
          .nav-links {
            padding-top: 0.5rem;
          }
          .nav-links .link {
            padding: 0.75rem 0;
            width: 100%;
            border-bottom: 1px solid ${theme === "dark" ? "#333" : "#eee"};
          }
          .dropdown-trigger.active {
            border-bottom: none !important;
          }
          .nav-actions {
            margin: 1rem 0;
            flex-direction: row;
          }
          .dropdown-overlay {
            position: static;
            width: 100%;
            box-shadow: none;
            padding: 0.5rem 0;
            margin-bottom: 0.5rem;
          }
          .dropdown-menu-container {
            position: relative;
            padding-left: 1rem;
            border-left: 3px solid ${primaryColor};
          }
          .dropdown-content {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 0.5rem 0;
          }
          .dropdown-section {
            padding: 0.75rem;
          }
          .mobile-backdrop {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
