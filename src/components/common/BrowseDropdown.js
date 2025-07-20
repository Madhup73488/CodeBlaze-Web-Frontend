import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import "./BrowseDropdown.css";
import { allCourses } from "../../pages/CoursesPage";
import { internships } from "../ForStudents/internshipsData";

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

const courseCategories = allCourses.reduce((acc, course) => {
  if (!acc[course.category]) {
    acc[course.category] = [];
  }
  acc[course.category].push(course);
  return acc;
}, {});

export default function BrowseDropdown({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(courseCategories)[0]
  );
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="browse-dropdown-mobile">
        {Object.keys(courseCategories).map((category) => (
          <AccordionItem
            key={category}
            title={category}
            isOpen={openAccordion === category}
            onClick={() =>
              setOpenAccordion(openAccordion === category ? null : category)
            }
          >
            {courseCategories[category].map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                onClick={onClose}
                className="mobile-menu-link"
              >
                {course.title}
              </Link>
            ))}
          </AccordionItem>
        ))}
      </div>
    );
  }

  return (
    <div className="browse-dropdown">
      <div className="browse-dropdown-column">
        <h2>Courses</h2>
        <ul className="browse-dropdown-list">
          {Object.keys(courseCategories).map((category) => (
            <li
              key={category}
              onMouseEnter={() => setActiveCategory(category)}
              className="browse-dropdown-item"
            >
              <span>{category}</span>
              <ChevronRight className="w-4 h-4" />
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="browse-dropdown-column"
          >
            <ul className="browse-dropdown-list">
              {courseCategories[activeCategory].map((course) => (
                <li key={course.id} className="browse-dropdown-item">
                  <Link
                    to={`/courses/${course.id}`}
                    onClick={() => setTimeout(onClose, 100)}
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
