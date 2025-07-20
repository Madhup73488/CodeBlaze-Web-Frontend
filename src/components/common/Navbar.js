import { Search, Menu, X, ChevronDown, User, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import codeblazeLogo from "../../assets/images/codeblazelogoorange.png";
import BrowseDropdown from "./BrowseDropdown";
import SearchSuggestions from "./SearchSuggestions";
import { allCourses } from "../../pages/CoursesPage";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import AuthModal from "../Auth/AuthModal";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";
import "./MovingText.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [movingText, setMovingText] = useState("Welcome to Codeblaze!");
  const [isBrowseDropdownOpen, setIsBrowseDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user, logout } = useAuth();
  const { openCart, cart } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const texts = [
    "Join Premium Internship programs with Codeblaze.",
    "Learn from industry experts at Codeblaze.",
    "Explore our latest courses on Codeblaze.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMovingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 3000); // Time between text changes
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = allCourses.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full">
      {/* Dark Top Banner */}
      <div className="bg-nav-dark text-nav-dark-foreground moving-text-container">
        <div className="container h-12 flex items-center justify-center">
          <p className="moving-text text-sm">{movingText}</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="flex-shrink-0">
                  <img src={codeblazeLogo} alt="Codeblaze" className="h-8" />
                </div>
                <h1 className="text-2xl font-bold text-primary ml-2">
                  Codeblaze
                </h1>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center ml-10 space-x-8">
                <div
                  className="relative"
                  onMouseEnter={() => setIsBrowseDropdownOpen(true)}
                  onMouseLeave={() => setIsBrowseDropdownOpen(false)}
                >
                  <a
                    href="#"
                    className="text-gray-700 hover:text-primary transition-colors font-medium flex items-center"
                  >
                    <span>Browse</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                  {isBrowseDropdownOpen && (
                    <BrowseDropdown
                      onClose={() => setIsBrowseDropdownOpen(false)}
                    />
                  )}
                </div>
                <div className="relative">
                  <Link
                    to="/internships"
                    className="text-gray-700 hover:text-primary transition-colors font-medium"
                  >
                    Internships
                  </Link>
                  <span className="absolute top-0 right-0 -mr-2 -mt-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </div>
              </nav>
            </div>

            {/* Search Bar - Desktop */}
            <div
              className="hidden md:flex flex-1 max-w-lg mx-8"
              onMouseEnter={() => setIsSearchFocused(true)}
              onMouseLeave={() => setIsSearchFocused(false)}
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {isSearchFocused && (
                  <SearchSuggestions
                    suggestions={suggestions}
                    searchTerm={searchTerm}
                    onClose={() => {
                      setSearchTerm("");
                      setSuggestions([]);
                      setIsSearchFocused(false);
                    }}
                  />
                )}
              </div>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={openCart} className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full mt-4 mr-6">
                    {cart.length}
                  </span>
                )}
              </Button>
              {user ? (
                <div className="relative">
                  <Button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-6 w-6 text-gray-700" />
                    <span className="font-medium text-gray-700">
                      {user.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-700" />
                  </Button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      {user.roles?.includes("admin") && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/90 font-medium"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Log In
                  </Button>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
                  >
                    <Link to="/job-seekers">Job Portal</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            openAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
