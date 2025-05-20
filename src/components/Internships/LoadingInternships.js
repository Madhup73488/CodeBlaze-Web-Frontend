// LoadingInternships.js
import React from "react";

function LoadingInternships({ theme, primaryColor }) {
  return (
    <div className="loading-internships">
      <div
        className="loading-spinner"
        style={{ borderTopColor: primaryColor }}
      ></div>
      <p>Loading internships...</p>

      <style jsx>{`
        .loading-internships {
          text-align: center;
          padding: 3rem 1rem; /* Increased padding */
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* Center content */
          gap: 1.2rem; /* Adjusted gap */
          color: ${theme === "dark" ? "#ccc" : "#555"}; /* Adjusted color */
          min-height: 200px; /* Ensure it takes some space */
        }

        .loading-spinner {
          width: 36px; /* Adjusted size */
          height: 36px;
          border: 4px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}; /* Softer base color */
          border-radius: 50%;
          /* borderTopColor is set by prop */
          animation: spin 0.8s linear infinite; /* Faster spin */
        }

        .loading-internships p {
          font-size: 0.95rem;
          font-weight: 500;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingInternships;
