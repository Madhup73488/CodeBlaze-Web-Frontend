import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  MessageSquare,
  Send,
  HelpCircle,
  BarChart3,
  Bell,
  LogOut,
  ArrowLeft,
  Search,
  User,
  Award,
  Shield,
  BookOpen,
  PanelLeftClose,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useSidebar } from "../../contexts/SidebarContext";
import logo from "../../assets/images/Syntellite-labs-logo.png";
import syntelliteIcon from "../../assets/images/syntellite-sidebar-icon.png";

export default function Sidebar() {
  const { isOpen, closeSidebar, openSidebar } = useSidebar();
  const { openAuthModal, isAuthenticated, user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  const navigationItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Accredited by",
      icon: Award,
      path: "/accredited-by",
    },
    {
      name: "Why Choose Syntellite",
      icon: "custom",
      customIcon: syntelliteIcon,
      path: "/about-us",
    },
    {
      name: "Learning Focused",
      icon: BookOpen,
      path: "/learning-focused",
    },
    {
      name: "Trusted by",
      icon: MessageSquare,
      path: "/trusted-by",
    },
    {
      name: "Testimonials",
      icon: Users,
      path: "/testimonials",
    },
    {
      name: "Apply Now",
      icon: Send,
      path: "/apply",
    },
    {
      name: "Support",
      icon: HelpCircle,
      path: "/support",
    },
    {
      name: "My Dashboard",
      icon: BarChart3,
      path: "/profile/dashboard",
      requiresAuth: true,
    },
    ...(isAdmin
      ? [
          {
            name: "Admin Dashboard",
            icon: BarChart3,
            path: "/admin",
            requiresAuth: true,
            adminOnly: true,
          },
        ]
      : []),
    {
      name: "Updates",
      icon: Bell,
      path: "/updates",
    },
  ];

  // Scroll detection for section-based navigation
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = [
        "accredited-by",
        "why-choose-syntellite",
        "learning-focused",
        "why-learners-trust-us",
        "successful-learners",
      ];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      // If not in any specific section, clear active section
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isActivePath = (path, itemName) => {
    // Handle section-based navigation on home page
    if (location.pathname === "/" && itemName === "Accredited by") {
      return activeSection === "accredited-by";
    }
    if (location.pathname === "/" && itemName === "Why Choose Syntellite") {
      return activeSection === "why-choose-syntellite";
    }
    if (location.pathname === "/" && itemName === "Learning Focused") {
      return activeSection === "learning-focused";
    }
    if (location.pathname === "/" && itemName === "Trusted by") {
      return activeSection === "why-learners-trust-us";
    }
    if (location.pathname === "/" && itemName === "Testimonials") {
      return activeSection === "successful-learners";
    }

    // Regular path-based navigation
    if (path === "/") {
      return location.pathname === "/" && !activeSection;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (item, event) => {
    if (item.requiresAuth && !isAuthenticated) {
      openAuthModal();
      return;
    }

    // Handle Home navigation - scroll to top
    if (item.name === "Home") {
      event.preventDefault();

      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        closeSidebar();
      }

      // If already on home page, scroll to top
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navigate to home page
        window.location.href = "/";
      }
      return;
    }

    // Handle scrolling to sections - always go to home page first if not already there
    if (
      item.name === "Accredited by" ||
      item.name === "Why Choose Syntellite" ||
      item.name === "Learning Focused" ||
      item.name === "Trusted by" ||
      item.name === "Testimonials"
    ) {
      event.preventDefault();

      // Only close sidebar on mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        closeSidebar();
      }

      let sectionId = "";
      if (item.name === "Accredited by") {
        sectionId = "accredited-by";
      } else if (item.name === "Why Choose Syntellite") {
        sectionId = "why-choose-syntellite";
      } else if (item.name === "Learning Focused") {
        sectionId = "learning-focused";
      } else if (item.name === "Trusted by") {
        sectionId = "why-learners-trust-us";
      } else if (item.name === "Testimonials") {
        sectionId = "successful-learners";
      }

      // If not on home page, navigate to home first, then scroll
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll to section
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        return;
      }

      // If already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Handle regular navigation items - scroll to top when navigating to new pages
    if (item.path !== location.pathname) {
      // Add a small delay to ensure navigation happens first, then scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }

    // Close sidebar for regular navigation only on mobile
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - Responsive Layout */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-40 transition-all duration-200 ease-out ${
          isOpen
            ? "w-full md:w-80" // Full width on mobile, 320px on desktop
            : "w-0"
        }`}
        style={{
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <div
          className={`w-full md:w-80 h-full transition-transform duration-200 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <Link
              to="/"
              onClick={() => {
                // Scroll to top when navigating to home
                window.scrollTo({ top: 0, behavior: "smooth" });
                // Close sidebar on mobile
                if (window.innerWidth < 768) {
                  closeSidebar();
                }
              }}
              className="flex items-center gap-3"
            >
              <img
                src={logo}
                alt="Syntellite Labs Logo"
                className="h-12 md:h-16 max-w-none"
              />
              <div></div>
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close navigation menu"
            >
              <PanelLeftClose className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 bg-gray-100 rounded-3xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute right-3 top-2/3 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Syntellite Labs
            </h2>

            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path, item.name);

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(event) => handleNavigation(item, event)}
                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    style={{ borderRadius: "30px" }}
                  >
                    {item.icon === "custom" ? (
                      <img
                        src={item.customIcon}
                        alt={`${item.name} icon`}
                        className="w-5 h-5 object-contain"
                        style={{
                          filter: isActive
                            ? "brightness(0) invert(1)"
                            : "none",
                        }}
                      />
                    ) : (
                      <Icon
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 group-hover:text-blue-600"
                        }`}
                      />
                    )}
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
            {/* Syntellite Innovations */}
            <div className="flex items-center gap-3 mb-4">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Syntellite Innovations
              </span>
            </div>

            {/* Footer Links */}
            <div className="flex gap-6 mb-4 text-xs text-gray-500">
              <Link
                to="/cancellation-and-refund-policy"
                className="hover:text-gray-700"
              >
                Refund Policy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-gray-700">
                Terms & Conditions
              </Link>
            </div>

            {/* User Profile */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white/20">
                  <span className="text-white text-lg font-bold">👤</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name || "User"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-green-600 font-medium">Active</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                style={{ borderRadius: "30px" }}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium text-sm">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hamburger Menu Button - Only shows when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={openSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </>
  );
}
