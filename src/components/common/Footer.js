import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  ArrowUp,
  Loader,
} from "lucide-react";

function Footer({ theme = "dark", color = "purple" }) {
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const footerLinkSections = [
    {
      title: "Main Links",
      links: [
        { text: "Home", path: "/" },
        { text: "Services", path: "/services" },
        { text: "Careers", path: "/careers" },
        { text: "Contact Us", path: "/contact" }, // Assuming /contact, adjust if different
        { text: "Privacy Policy", path: "/privacy" },
      ],
      mdColSpan: 1,
      lgColSpan: 2,
    },
    {
      title: "Company", // Replaces "Who We Are"
      links: [
        { text: "About Us", path: "/aboutus" },
        { text: "Our Team", path: "/ourteam" },
        { text: "Our Mission", path: "/ourmission" },
        { text: "Our Values", path: "/ourvalues" },
        { text: "Cancellation and Refund Policy", path: "/cancellation-and-refund-policy" },
        { text: "Shipping and Delivery Policy", path: "/shipping-and-delivery-policy" },
      ],
      mdColSpan: 1,
      lgColSpan: 3,
    },
    {
      title: "Our Services",
      links: [
        // All these now point to /services
        { text: "Software Development", path: "/services" },
        { text: "Digital Transformation", path: "/services" },
        { text: "Cloud Solutions", path: "/services" },
        { text: "AI & Machine Learning", path: "/services" },
        { text: "UI/UX Design", path: "/services" },
      ],
      mdColSpan: 1,
      lgColSpan: 3,
    },
  ];

  // Theme configurations
  const themeConfig = {
    dark: {
      background: "bg-[#111827]",
      cardBg: "bg-[#1f2937]",
      text: "text-[#f9fafb]",
      subtext: "text-[#9ca3af]",
      border: "border-[rgba(255,255,255,0.1)]",
      inputBg: "bg-[#1f2937]",
      socialBg: "bg-[#1f2937] hover:bg-[#374151]",
      divider: "bg-[rgba(255,255,255,0.1)]",
    },
    light: {
      background: "bg-gray-50",
      cardBg: "bg-white",
      text: "text-gray-900",
      subtext: "text-gray-600",
      border: "border-gray-200",
      inputBg: "bg-gray-100",
      socialBg: "bg-gray-200 hover:bg-gray-300",
      divider: "bg-gray-200",
    },
  };

  // Color configurations
  const colorConfig = {
    purple: {
      primary: "from-purple-600 to-indigo-700",
      accent: "bg-purple-600",
      highlight: "text-purple-500",
      button: "bg-purple-600 hover:bg-purple-700",
      hover: "hover:text-purple-500",
    },
    orange: {
      primary: "from-orange-500 to-amber-600",
      accent: "bg-orange-500",
      highlight: "text-orange-500",
      button: "bg-orange-500 hover:bg-orange-600",
      hover: "hover:text-orange-500",
    },
  };

  const currentTheme = themeConfig[theme] || themeConfig.dark;
  const currentColor = colorConfig[color] || colorConfig.purple;

  // Listen for location changes to scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle newsletter form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Email submitted:", email);
    setEmail("");
    // Add success notification logic here
  };

  // Handle link clicks to show loading indicator
  const handleLinkClick = () => {
    setIsLoading(true);
    // Simulating navigation delay - in a real app, this would be handled by the router
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 800);
  };

  // Map paths for links
  // const getRoutePath = (linkText) => { // No longer needed if paths are explicit
  //   // Convert link text to route path
  //   return linkText.toLowerCase().replace(/\s+/g, "-");
  // };

  return (
    <footer
      className={`${currentTheme.background} pt-16 pb-8 relative overflow-hidden`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <Loader className={`animate-spin text-${color}-500`} size={48} />
            <span className="text-white mt-4">Loading...</span>
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div
        className={`absolute top-0 right-10 w-64 h-64 rounded-full bg-gradient-to-br ${currentColor.primary} opacity-10 blur-3xl`}
      ></div>
      <div
        className={`absolute bottom-40 left-10 w-48 h-48 rounded-full bg-gradient-to-br ${currentColor.primary} opacity-10 blur-3xl`}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Footer top - Newsletter and quick contact */}
        <div
          className={`${currentTheme.cardBg} rounded-2xl shadow-xl p-6 sm:p-8 mb-16 border ${currentTheme.border}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-2xl font-bold ${currentTheme.text} mb-4`}>
                Stay Updated
              </h3>
              <p className={`${currentTheme.subtext} mb-6 max-w-md`}>
                Subscribe to our newsletter to receive the latest updates on
                digital transformation trends, tech insights, and company news.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`flex-grow py-3 px-4 rounded-lg ${currentTheme.inputBg} ${currentTheme.text} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-${color}-500`}
                  required
                />
                <button
                  type="submit"
                  className={`${currentColor.button} text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300`}
                >
                  <span>Subscribe</span>
                  <Send size={16} />
                </button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 lg:justify-end">
              <div>
                <h4 className={`font-semibold ${currentTheme.text} mb-3`}>
                  Contact Us
                </h4>
                <div className="space-y-4">
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 ${currentTheme.subtext} ${currentColor.hover} transition-colors`}
                  >
                    <Mail size={16} />
                    <span>info@codeblaze.net</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 ${currentTheme.subtext} ${currentColor.hover} transition-colors`}
                  >
                    <Phone size={16} />
                    <span>+9 7348878479</span>
                  </Link>
                </div>
              </div>

              <div>
                <h4 className={`font-semibold ${currentTheme.text} mb-3`}>
                  Visit Us
                </h4>
                <Link
                  to="/location"
                  onClick={handleLinkClick}
                  className={`flex items-start gap-3 ${currentTheme.subtext} ${currentColor.hover} transition-colors max-w-xs`}
                >
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    636, 2nd Cross Rd, Manyata Tech Park, Service Rd, MS Ramaiah
                    North City, Manayata Tech Park, Nagavara, Bengaluru,
                    Karnataka 560045
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-4">
            <div className={`flex items-center gap-3 mb-6`}>
              <div
                className={`w-10 h-10 rounded ${currentColor.accent} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className={`${currentTheme.text} text-2xl font-bold`}>
                CodeBlaze
              </span>
            </div>

            <p className={`${currentTheme.subtext} mb-6 max-w-md`}>
              We create bespoke software solutions and deliver seamless digital
              transformation services, helping businesses innovate and thrive in
              the digital era.
            </p>

            <div className="flex gap-3">
              <Link
                to="https://www.linkedin.com/company/codeblazee/?viewAsMember=true"
                target="_blank"
                onClick={handleLinkClick}
                className={`w-10 h-10 ${currentTheme.socialBg} rounded-full flex items-center justify-center transition-colors duration-200`}
              >
                <Linkedin size={18} className={currentTheme.text} />
              </Link>
              <Link
                to="https://www.linkedin.com/company/codeblazee/?viewAsMember=true"
                target="_blank"
                onClick={handleLinkClick}
                className={`w-10 h-10 ${currentTheme.socialBg} rounded-full flex items-center justify-center transition-colors duration-200`}
              >
                <Twitter size={18} className={currentTheme.text} />
              </Link>
              <Link
                to="https://www.instagram.com/codeblaze.tech/"
                target="_blank"
                onClick={handleLinkClick}
                className={`w-10 h-10 ${currentTheme.socialBg} rounded-full flex items-center justify-center transition-colors duration-200`}
              >
                <Instagram size={18} className={currentTheme.text} />
              </Link>
            </div>
          </div>

          {/* Link Sections */}
          {footerLinkSections.map((section) => (
            <div
              key={section.title}
              className={`md:col-span-${section.mdColSpan} lg:col-span-${section.lgColSpan}`}
            >
              <h4 className={`${currentTheme.text} font-semibold text-lg mb-4`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-2 ${currentTheme.subtext} ${currentColor.hover} transition-colors`}
                    >
                      <ChevronRight size={14} />
                      <span>{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom - copyright */}
        <div
          className={`border-t ${currentTheme.border} pt-8 flex flex-col sm:flex-row justify-between items-center`}
        >
          <p className={`${currentTheme.subtext} text-sm`}>
            © {new Date().getFullYear()} CodeBlaze. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link
              to="/terms-of-service"
              onClick={handleLinkClick}
              className={`text-sm ${currentTheme.subtext} ${currentColor.hover} transition-colors`}
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              onClick={handleLinkClick}
              className={`text-sm ${currentTheme.subtext} ${currentColor.hover} transition-colors`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              onClick={handleLinkClick}
              className={`text-sm ${currentTheme.subtext} ${currentColor.hover} transition-colors`}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r ${currentColor.primary} text-white flex items-center justify-center shadow-lg z-50 transition-all duration-300 hover:scale-110`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}

export default Footer;
