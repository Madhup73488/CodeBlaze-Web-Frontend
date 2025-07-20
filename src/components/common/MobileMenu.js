import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";
import codeblazeLogo from "../../assets/images/codeblazelogoorange.png";
import BrowseDropdown from "./BrowseDropdown";
import "./MobileMenu.css";

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="mobile-menu-accordion-item">
      <button className="mobile-menu-accordion-trigger" onClick={onClick}>
        <span>{title}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mobile-menu-accordion-content">{children}</div>
      )}
    </div>
  );
};

export default function MobileMenu({ onClose, openAuthModal }) {
  const { user, logout } = useAuth();
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleLoginClick = () => {
    openAuthModal();
    onClose();
  };

  const handleAccordionClick = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-container">
        <div className="mobile-menu-body">
          <AccordionItem
            title="Courses"
            isOpen={openAccordion === "Courses"}
            onClick={() => handleAccordionClick("Courses")}
          >
            <BrowseDropdown onClose={onClose} />
          </AccordionItem>
          <Link
            to="/internships"
            onClick={onClose}
            className="mobile-menu-link"
          >
            Internships
          </Link>
          <Link
            to="/job-seekers"
            onClick={onClose}
            className="mobile-menu-link"
          >
            Job Portal
          </Link>

          {user && (
            <div className="mobile-menu-user-section">
              <hr className="my-4" />
              <Link
                to="/profile"
                onClick={onClose}
                className="mobile-menu-link"
              >
                Profile
              </Link>
              {user.roles?.includes("admin") && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="mobile-menu-link"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="mobile-menu-footer">
          {user ? (
            <Button onClick={handleLogout} className="w-full">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLoginClick} className="w-full">
              Log In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
