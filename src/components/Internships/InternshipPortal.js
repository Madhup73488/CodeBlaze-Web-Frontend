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
      <div className="internships-content">
        <h2 className="text-xl font-bold text-gray-900 mb-8">All Internships</h2>
        <div className="flex justify-between mb-8">
          <input
            type="text"
            placeholder="Search for internships..."
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-4">
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

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
    </div>
  );
}

export default InternshipPortal;
