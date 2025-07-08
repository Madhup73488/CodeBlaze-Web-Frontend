import React from "react";
import { Link } from "react-router-dom";
import { internships } from "../ForStudents/internshipsData";
import mernStackImage from "../../assets/images/mern-stack.png";
import frontendDevImage from "../../assets/images/frontend-dev.png";
import backendDevImage from "../../assets/images/backend-dev.png";
import javaFullStackDevImage from "../../assets/images/Java-full-stack-dev.png";
import pythonFullStackDevImage from "../../assets/images/Python-full-stack-dev.png";

const PremiumInternships = ({ theme, color }) => {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  const getImage = (internship) => {
    if (internship.id === "a1b2c3d4-e5f6-7890-1234-567890abcdef") {
      return mernStackImage;
    }
    if (
      internship.id === "b2c3d4e5-f6a7-8901-2345-67890abcdef1"
    ) {
      return frontendDevImage;
    }
    if (
      internship.id ===
      "c3d4e5f6-a7b8-9012-3456-7890abcdef12"
    ) {
      return backendDevImage;
    }
    if (
      internship.id ===
      "e5f6a7b8-c9d0-1234-5678-90abcdef1234"
    ) {
      return javaFullStackDevImage;
    }
    if (
      internship.id === "d4e5f6a7-b8c9-0123-4567-890abcdef123"
    ) {
      return pythonFullStackDevImage;
    }
    return "https://via.placeholder.com/400x200";
  };

  return (
    <section className={`premium-internships-container ${theme}`}>
      <div className="premium-internships-header">
        <h1 className="premium-internships-title">
          Explore Our{" "}
          <span style={{ color: primaryColor }}>
            Premium Internship Programs
          </span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="premium-internships-subtitle">
          Gain hands-on experience and accelerate your career with our
          industry-leading internship programs.
        </p>
      </div>
      <div className="internships-grid">
        {internships.slice(0, 3).map((internship) => (
          <Link
            to={`/internships/${internship.id}`}
            key={internship.id}
            className="internship-card-link"
          >
            <div className="internship-card">
              <div className="internship-image">
                <img src={getImage(internship)} alt={internship.title} />
              </div>
              <h3 className="internship-title">{internship.title}</h3>
              <p className="internship-company">{internship.company}</p>
              <div className="internship-details">
                <span>{internship.duration}</span>
                <span>{internship.location}</span>
              </div>
              <button
                className="details-button"
                style={{ backgroundColor: primaryColor }}
              >
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="explore-more-container">
        <Link to="/internships" className="explore-more-link" style={{ color: primaryColor }}>
          <span>Explore More</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
      <style jsx>{`
        .explore-more-container {
          text-align: center;
          margin-top: 2rem;
        }
        .explore-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.3s ease;
        }
        .explore-more-link:hover {
          gap: 1rem;
        }
        .premium-internships-container {
          padding: 4rem 2rem;
          background-color: ${theme === "dark" ? "#111827" : "#f9fafb"};
        }
        .premium-internships-header {
          text-align: left;
          margin-bottom: 3rem;
        }
        .premium-internships-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        @media (max-width: 768px) {
          .premium-internships-header {
            text-align: center;
          }
          .premium-internships-title {
            text-align: left;
            font-size: 1.5rem;
          }
        }
        .accent-line {
          height: 4px;
          width: 80px;
          margin: 0 auto 1.5rem;
        }
        .premium-internships-subtitle {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }
        .internships-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .internships-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 1rem;
          }
          .internship-card-link {
            flex: 0 0 80%;
            scroll-snap-align: center;
          }
        }
        .internship-card-link {
          text-decoration: none;
          color: inherit;
        }
        .internship-card {
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .internship-card:hover {
          transform: translateY(-5px);
        }
        .internship-image {
          width: 100%;
          height: 150px;
          margin-bottom: 1rem;
        }
        .internship-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        .internship-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .internship-company {
          font-size: 1rem;
          font-weight: 500;
          color: ${primaryColor};
          margin-bottom: 1rem;
        }
        .internship-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }
        .details-button {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .details-button:hover {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
};

export default PremiumInternships;
