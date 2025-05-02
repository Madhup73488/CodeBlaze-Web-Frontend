import React from "react";

function Loading({ theme, primaryColor }) {
  return (
    <div className="loading">
      <div
        className="loading-spinner"
        style={{ borderColor: primaryColor }}
      ></div>
      Loading jobs...

      <style jsx>{`
        .loading {
          text-align: center;
          padding: 2rem;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: ${primaryColor};
          animation: spin 1s ease-in-out infinite;
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

export default Loading;