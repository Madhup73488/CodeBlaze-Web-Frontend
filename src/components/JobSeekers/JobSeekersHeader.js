import React from "react";

function JobSeekersHeader({ theme, primaryColor }) {
  return (
    <div className="job-seekers-header">
      <h1 className="job-seekers-title">
        Job <span style={{ color: primaryColor }}>Seekers</span> Platform
      </h1>
      <div
        className="accent-line"
        style={{ backgroundColor: primaryColor }}
      ></div>
      <p className="job-seekers-subtitle">
        Find your perfect career opportunity with our advanced job search
        platform.
      </p>

      <style jsx>{`
        .job-seekers-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .job-seekers-title {
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

        .job-seekers-subtitle {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.9;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }

        @media (max-width: 767px) {
          .job-seekers-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default JobSeekersHeader;
