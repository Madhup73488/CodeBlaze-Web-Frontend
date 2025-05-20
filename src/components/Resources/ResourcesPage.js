// src/components/resources/ResourcesPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const ResourcesPage = ({ theme, colorStyles }) => {
  const resources = [
    {
      id: "seventy-questions-by-neha-malhotra",
      title: "70 Toughest Interview Questions and Answers",
      author: "Neha Malhotra",
      description:
        "A comprehensive guide to preparing for challenging interview questions with detailed answers.",
      link: "/resources/seventy-questions-by-neha-malhotra",
    },
    {
      id: "resume-writing-tips",
      title: "Effective Resume Writing Tips",
      author: "CodeBlaze Team",
      description:
        "Learn how to craft a compelling resume that stands out to recruiters.",
      link: "/resources/resume-writing-tips",
    },
    {
      id: "linkedin-optimization-guide",
      title: "LinkedIn Optimization Guide",
      author: "CodeBlaze Team",
      description:
        "Maximize your professional presence on LinkedIn to attract career opportunities.",
      link: "/resources/linkedin-optimization-guide",
    },
    // Add more resources here as needed
  ];

  return (
    <section
      className="py-20"
      style={{
        background: theme === "dark" ? "#111" : "#f5f5f7",
        color: theme === "dark" ? "#f5f5f7" : "#111",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Resources</h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: "rgb(255, 121, 7)" }}
          ></div>
          <p className="mt-6 max-w-2xl mx-auto text-lg">
            Explore our collection of articles and guides designed to help you
            succeed in your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {resources.map((resource) => (
            <Link
              to={resource.link}
              key={resource.id}
              className="block p-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: theme === "dark" ? "#1a1a1a" : "#ffffff",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                color: theme === "dark" ? "#f5f5f7" : "#111",
              }}
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "rgb(255, 121, 7)" }}
              >
                {resource.title}
              </h3>
              <p className="text-sm mb-3">By {resource.author}</p>
              <p className="text-md mb-4">{resource.description}</p>
              <button
                className="px-4 py-2 rounded-md text-white font-medium"
                style={{ backgroundColor: "rgb(255, 121, 7)" }}
              >
                Read More
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesPage;
