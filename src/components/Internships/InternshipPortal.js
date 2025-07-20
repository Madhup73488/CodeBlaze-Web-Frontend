import React, { useState, useEffect } from "react";
import InternshipCard from "./InternshipCard";
import InternshipCardSkeleton from "./InternshipCardSkeleton";
import InternshipDetailPage from "../ForStudents/InternshipDetailPage";
import { internships } from "../ForStudents/internshipsData";
import "../ForStudents/Internships.css";

function InternshipPortal({ theme = "light", color = "purple" }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [savedInternships, setSavedInternships] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);

  const toggleSaveInternship = (id) => {
    setSavedInternships((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "all", name: "All Programs" },
    { id: "fullstack", name: "Full Stack" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
  ];

  const filteredInternships = searchQuery
    ? internships.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.techStack.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : activeCategory === "all"
    ? internships
    : internships.filter(
        (internship) => internship.category === activeCategory
      );

  return (
    <div className={`internships-container ${theme} ${color}`}>
      <div className="internships-header">
        <h1 className="internships-title">
          Internship Programs at Codeblaze
        </h1>
        <div
          className="accent-line"
        ></div>
        <p className="internships-subtitle">
          Intensive, industry-focused internship programs designed to accelerate
          your tech career. Get hands-on experience, build real projects, and
          secure your dream job.
        </p>
      </div>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search programs, technologies, or companies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
            style={{ backgroundColor: color === 'purple' ? '#a855f7' : '#f97316' }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </section>

      <section className="internships-section">
        <div className="internships-list">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <InternshipCardSkeleton key={index} />
              ))
            : filteredInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  theme={theme}
                  primaryColor={color === "purple" ? "#a855f7" : "#f97316"}
                  savedInternships={savedInternships}
                  appliedInternships={appliedInternships}
                  toggleSaveInternship={toggleSaveInternship}
                  formatDate={formatDate}
                />
              ))}
        </div>
      </section>
    </div>
  );
}

export default InternshipPortal;
