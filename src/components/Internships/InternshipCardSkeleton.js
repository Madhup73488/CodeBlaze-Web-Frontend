// InternshipCardSkeleton.js
import React from "react";

function InternshipCardSkeleton({ theme }) {
  const highlightColor = theme === "dark" ? "#2a2a2a" : "#e0e0e0"; // Slightly different dark

  return (
    <div className={`internship-card-skeleton ${theme === "dark" ? "dark-theme" : ""}`}>
      <div className="skeleton-header">
        <div className="skeleton-logo pulse"></div>
        <div className="skeleton-title-info">
          <div className="skeleton-title pulse"></div>
          <div className="skeleton-company pulse"></div>
        </div>
        <div className="skeleton-action-icon pulse"></div>
      </div>
      <div className="skeleton-details">
        {[...Array(5)].map((_, i) => ( // 5 detail items
          <div
            key={i}
            className="skeleton-detail-item pulse"
            style={{
              width: `${Math.random() * 30 + 50}%`, // Random width between 50-80%
              animationDelay: `${i * 0.08}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="skeleton-skills-header pulse" style={{width: '30%', marginBottom: '0.5rem'}}></div>
      <div className="skeleton-skills">
        {[...Array(3)].map((_, i) => ( // 3 skill tags
             <div key={i} className="skeleton-skill-tag pulse" style={{ width: `${Math.random() * 20 + 15}%`, animationDelay: `${(i+5) * 0.08}s` }}></div>
        ))}
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-metadata pulse" style={{width: '40%'}}></div>
        <div className="skeleton-buttons">
          <div className="skeleton-button pulse" style={{width: '60px'}}></div>
          <div className="skeleton-button pulse" style={{width: '70px'}}></div>
        </div>
      </div>
      <style jsx>{`
        .internship-card-skeleton {
          background: ${theme === "dark" ? "#1a1a1a" : "#fff"};
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, ${theme === "dark" ? "0.2" : "0.08"});
          border: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
          height: 100%; /* To match card height */
        }
        
        .pulse {
          background-color: ${highlightColor};
          animation: pulse-animation 1.8s infinite ease-in-out;
        }

        @keyframes pulse-animation {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }

        .skeleton-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          gap: 0.75rem;
        }
        .skeleton-logo { width: 40px; height: 40px; border-radius: 8px; flex-shrink: 0; }
        .skeleton-title-info { flex: 1; display: flex; flex-direction: column; gap: 0.4rem; }
        .skeleton-title { width: 75%; height: 1.1rem; border-radius: 4px; }
        .skeleton-company { width: 55%; height: 0.85rem; border-radius: 4px; }
        .skeleton-action-icon { width: 24px; height: 24px; border-radius: 50%; }


        .skeleton-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .skeleton-detail-item { height: 0.9rem; border-radius: 16px; }

        .skeleton-skills-header { height: 0.8rem; border-radius: 4px; }
        .skeleton-skills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .skeleton-skill-tag { height: 0.9rem; border-radius: 4px; }
        

        .skeleton-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto; /* Push to bottom */
          padding-top: 0.8rem;
          border-top: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e9e9e9"};
        }
        .skeleton-metadata { height: 0.75rem; border-radius: 4px; }
        .skeleton-buttons { display: flex; gap: 0.6rem; }
        .skeleton-button { height: 1.8rem; border-radius: 6px; }

      `}</style>
    </div>
  );
}

export default InternshipCardSkeleton;
