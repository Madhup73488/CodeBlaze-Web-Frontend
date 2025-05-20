// InternshipPortalHeader.js
import React from "react";

function InternshipPortalHeader({ theme, primaryColor }) {
  return (
    <div className="internship-portal-header">
      <h1 className="internship-portal-title">
        Internship <span style={{ color: primaryColor }}>Gateway</span>
      </h1>
      <div
        className="accent-line"
        style={{ backgroundColor: primaryColor }}
      ></div>
      <p className="internship-portal-subtitle">
        Discover your next learning opportunity with our curated internship
        listings.
      </p>

      <style jsx>{`
        .internship-portal-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .internship-portal-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .accent-line {
          height: 4px;
          width: 60px;
          border-radius: 2px;
          margin: 0 auto 1.5rem;
        }

        .internship-portal-subtitle {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.9;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        @media (max-width: 767px) {
          .internship-portal-title {
            font-size: 2rem;
          }
          .internship-portal-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default InternshipPortalHeader;