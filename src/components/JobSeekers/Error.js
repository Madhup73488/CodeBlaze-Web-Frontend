import React from "react";

function Error({ theme, error }) {
  return (
    <div className="error">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="error-icon"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>Error loading jobs</h3>
      <p>{error}</p>
      <p>Please try again later</p>

      <style jsx>{`
        .error {
          text-align: center;
          padding: 2rem;
          width: 100%;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .error-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
        }

        .error h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #ef4444;
        }

        .error p {
          opacity: 0.7;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default Error;