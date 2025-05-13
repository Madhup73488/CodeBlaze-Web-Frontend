import React from "react";

function JobCardSkeleton({ theme }) {
  const baseColor = theme === "dark" ? "#1a1a1a" : "#f0f0f0";
  const highlightColor = theme === "dark" ? "#2d2d2d" : "#f7f7f7";

  return (
    <div
      className={`job-card-skeleton ${
        theme === "dark" ? "job-card-skeleton-dark" : ""
      }`}
    >
      <div className="skeleton-header">
        <div className="skeleton-logo pulse"></div>
        <div className="skeleton-title-info">
          <div className="skeleton-title pulse"></div>
          <div className="skeleton-company pulse"></div>
        </div>
        <div className="skeleton-action pulse"></div>
      </div>
      <div className="skeleton-details">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="skeleton-detail-item pulse"
            style={{
              width: `${Math.random() * 30 + 40}%`, // Random width between 40-70%
              animationDelay: `${i * 0.1}s`, // Staggered animation
            }}
          ></div>
        ))}
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-metadata pulse"></div>
        <div className="skeleton-actions">
          <div className="skeleton-button pulse"></div>
          <div className="skeleton-button pulse"></div>
        </div>
      </div>
      <style jsx>{`
        .job-card-skeleton {
          background: ${baseColor};
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .job-card-skeleton-dark {
          background: ${baseColor};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .skeleton-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          gap: 0.8rem;
        }

        .skeleton-logo {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: ${highlightColor};
          flex-shrink: 0;
        }

        .skeleton-title-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .skeleton-title {
          width: 70%;
          height: 1.2rem;
          background-color: ${highlightColor};
          border-radius: 4px;
        }

        .skeleton-company {
          width: 50%;
          height: 0.95rem;
          background-color: ${highlightColor};
          border-radius: 4px;
        }

        .skeleton-action {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${highlightColor};
        }

        .skeleton-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .skeleton-detail-item {
          height: 1rem;
          background-color: ${highlightColor};
          border-radius: 16px;
        }

        .skeleton-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .skeleton-metadata {
          width: 60%;
          height: 0.85rem;
          background-color: ${highlightColor};
          border-radius: 4px;
        }

        .skeleton-actions {
          display: flex;
          gap: 0.8rem;
        }

        .skeleton-button {
          width: 50px;
          height: 2.1rem;
          background-color: ${highlightColor};
          border-radius: 5px;
        }

        /* Pulse animation */
        .pulse {
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
          }
        }

        /* Add slight movement to make it feel more alive */
        .job-card-skeleton {
          animation: subtle-move 3s infinite ease-in-out;
        }

        @keyframes subtle-move {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default JobCardSkeleton;
