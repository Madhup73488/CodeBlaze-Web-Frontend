import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function Navbar({ theme, color, toggleTheme, toggleColor }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropdownRefs = useRef({});
  const navRef = useRef(null);
  const loaderTimeoutRef = useRef(null);

  // Start the loader and simulate a page transition
  const startLoader = (event) => {
    // Only start loader for actual navigation clicks (not dropdowns or toggles)
    const target = event.currentTarget;
    if (
      !target.classList.contains("dropdown-trigger") &&
      !target.classList.contains("theme-toggle") &&
      !target.classList.contains("color-toggle")
    ) {
      event.preventDefault(); // Prevent immediate navigation

      // Get the href if it's a Link
      const href = target.getAttribute("href") || "";

      setLoading(true);

      // Simulate a loading delay then navigate
      loaderTimeoutRef.current = setTimeout(() => {
        setLoading(false);

        // If it's a navigation link with href, navigate after loader completes
        if (href) {
          window.location.href = href;
        }
      }, 1500); // Adjust loading time as needed
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close any open dropdown when toggling the menu
    setActiveDropdown(null);
  };

  const handleMouseEnter = (dropdownName) => {
    // Only apply hover behavior on desktop
    if (window.innerWidth > 768) {
      setActiveDropdown(dropdownName);
    }
  };

  // Toggle dropdown on click
  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Modified dropdown section click handler
  const handleDropdownSectionClick = (e, to) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent default link behavior

    // Close menu on mobile after selecting an item
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }, 300);
    }
    // Start loader
    setLoading(true);
    // Navigate after loader completes
    loaderTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      window.location.href = to;
    }, 1500);
  };

  // Use useCallback to memoize the handler function
  const handleClickOutside = useCallback(
    (event) => {
      // Check if clicked outside of any dropdown or the navbar itself
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
    // Add event listener when a dropdown is active
    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear any pending timeouts when component unmounts
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, [activeDropdown, handleClickOutside]);

  // Function to set references for dropdowns
  const setDropdownRef = (element, name) => {
    if (element) {
      dropdownRefs.current[name] = element;
    }
  };

  // Handle theme & color button click - ensure it works on mobile
  const handleThemeToggle = (e) => {
    e.stopPropagation();
    toggleTheme();
  };

  const handleColorToggle = (e) => {
    e.stopPropagation();
    toggleColor();
  };

  const handleContactClick = (e) => {
    startLoader(e);
    // After starting loader, scroll to contact section
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 1500); // Match this with loader timeout
  };

  return (
    <>
      {/* Top loading bar */}
      {loading && (
        <div className="top-loader-container">
          <div
            className="top-loader"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      )}

      {/* Page overlay when loading */}
      {loading && <div className="page-dim-overlay" />}

      <nav className={`navbar ${theme}`} ref={navRef}>
        <div className="navbar-brand">
          <div
            className="logo-box"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <Link to="/" className="brand-text" onClick={startLoader}>
            CodeBlaze
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`nav-slide-wrapper ${isMenuOpen ? "open" : ""}`}>
          <div className="nav-links">
            <Link to="/" className="link" onClick={startLoader}>
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
                      onClick={(e) => handleDropdownSectionClick(e, "/aboutus")}
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
                      onClick={(e) => handleDropdownSectionClick(e, "/ourteam")}
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
                        handleDropdownSectionClick(e, "/ourmission")
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
                        handleDropdownSectionClick(e, "/ourvalues")
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
                activeDropdown === "services" ? "active" : ""
              }`}
              ref={(el) => setDropdownRef(el, "services")}
              onMouseEnter={() => handleMouseEnter("services")}
              onClick={() => handleDropdownClick("services")}
            >
              Services <ChevronDown size={15} />
            </div>
            {activeDropdown === "services" && (
              <div
                className="dropdown-overlay"
                onMouseEnter={() => handleMouseEnter("services")}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-menu-container">
                  <div className="dropdown-content">
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick(e, "/payments")
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Payments</h3>
                        <p className="dropdown-desc">
                          Manage PAs & build native checkouts
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick(e, "/hypercheckout")
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">HyperCheckout</h3>
                        <p className="dropdown-desc">
                          Route payments & build native 1-click checkouts
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick(e, "/expresscheckout")
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Express Checkout</h3>
                        <p className="dropdown-desc">
                          Unified Payment APIs for enterprises and startups
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick(e, "/upistack")
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">UPI Stack</h3>
                        <p className="dropdown-desc">
                          Solutions for merchants & Banks
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) => handleDropdownSectionClick(e, "/payouts")}
                    >
                      <div>
                        <h3 className="dropdown-title">Payouts</h3>
                        <p className="dropdown-desc">
                          Instant and Seamless Payouts with IMPS, UPI
                        </p>
                      </div>
                    </div>
                    <div
                      className="dropdown-section"
                      onClick={(e) =>
                        handleDropdownSectionClick(e, "/paymentlinks")
                      }
                    >
                      <div>
                        <h3 className="dropdown-title">Payment Links</h3>
                        <p className="dropdown-desc">
                          Create & send Payment links & forms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Link to="/careers" className="link" onClick={startLoader}>
              Careers
            </Link>
            <div className="link" onClick={handleContactClick}>
              Contact Us
            </div>
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

      {/* Backdrop overlay for mobile - appears when menu is open or dropdown is active */}
      {(isMenuOpen || activeDropdown) && window.innerWidth <= 768 && (
        <div
          className="mobile-backdrop"
          onClick={() => {
            setActiveDropdown(null);
            setIsMenuOpen(false);
          }}
        />
      )}

      <style jsx>
        {`
          /* Top Loader Styles */
          .top-loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            overflow: hidden;
            z-index: 100;
          }

          .top-loader {
            height: 100%;
            width: 50%;
            position: absolute;
            animation: loading 1.5s infinite;
          }

          .page-dim-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: 90;
            backdrop-filter: blur(1px);
          }

          @keyframes loading {
            0% {
              left: -50%;
            }
            100% {
              left: 100%;
            }
          }

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

          .hamburger {
            display: none;
            cursor: pointer;
          }

          /* Desktop navigation - default flex row */
          .nav-slide-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 2rem;
          }

          /* Nav links and actions inline on desktop */
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
          }

          /* Dropdown styles */
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
          }

          /* Mobile Styles */
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
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.3);
              z-index: 30;
            }
          }
        `}
      </style>
    </>
  );
}

export default Navbar;
