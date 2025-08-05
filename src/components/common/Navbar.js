import { Menu, X, ArrowRight, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/Syntellite-labs-logo.png"; // Adjust the path as necessary
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openAuthModal } = useAuth();

  const navLinks = [
    "Home",
    "Courses",
    "Instructors",
    "Blog",
    "About Us",
    "Contact",
  ];

  return (
    <header className="relative z-50 bg-blue-600">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={{ logo }}
              alt="Syntellite Labs Logo"
              className="h-8 w-8"
            />
            <span className="text-2xl font-bold text-white">
              Syntellite Labs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-sm">
            {navLinks.map((link, index) => (
              <Link
                key={link}
                to={
                  index === 0
                    ? "/"
                    : `/${link.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`hover:text-yellow-300 transition-colors text-white ${
                  index === 1 ? "font-semibold" : ""
                } ${index < navLinks.length - 1 ? "mr-8" : ""}`}
              >
                {link}
              </Link>
            ))}
          </div>

          <button
            onClick={openAuthModal}
            className="hidden md:flex bg-white text-blue-600 px-5 py-2 rounded-full items-center gap-2 font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            Registration
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="text-2xl text-white" />
              ) : (
                <Menu className="text-2xl text-white" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/20 backdrop-blur-lg rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4 text-sm">
              {navLinks.map((link, index) => (
                <Link
                  key={link}
                  to={
                    index === 0
                      ? "/"
                      : `/${link.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  className={`hover:text-yellow-300 transition-colors text-white ${
                    index === 1 ? "font-semibold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </Link>
              ))}
              <button
                onClick={() => {
                  openAuthModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 bg-white text-blue-600 px-5 py-2 rounded-full flex items-center justify-center gap-2 font-semibold hover:bg-gray-200 transition-colors text-sm"
              >
                Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
