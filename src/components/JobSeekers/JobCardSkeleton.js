import React from "react";

function JobCardSkeleton({ theme }) {
  const baseColor = theme === "dark" ? "#1a1a1a" : "#f0f0f0";
  const highlightColor = theme === "dark" ? "#2d2d2d" : "#f7f7f7";

  return (
    <div
      className={`$"job-card-skeleton" ${
        theme === "dark" ? "job-card-skeleton.dark" : ""
      }`}
    >
      <div className="skeleton-header">
        <div className="skeleton-logo"></div>
        <div className="skeleton-title-info">
          <div className="skeleton-title"></div>
          <div className="skeleton-company"></div>
        </div>
        <div className="skeleton-action"></div>
      </div>
      <div className="skeleton-details">
        <div className="skeleton-detail-item"></div>
        <div className="skeleton-detail-item"></div>
        <div className="skeleton-detail-item"></div>
        <div className="skeleton-detail-item"></div>
        <div className="skeleton-detail-item"></div>
        <div className="skeleton-detail-item"></div>
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-metadata"></div>
        <div className="skeleton-actions">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
      <style jsx>
        {`
          .job-card-skeleton {
            background: #f0f0f0; /* Default light mode background */
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
          }

          .job-card-skeleton.dark {
            background: #1a1a1a; /* Dark mode background */
          }

          .skeleton-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }

          .skeleton-logo {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #e0e0e0;
            margin-right: 0.8rem;
            flex-shrink: 0;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-logo {
            background-color: #2d2d2d;
          }

          .skeleton-title-info {
            flex: 1;
            min-width: 0;
          }

          .skeleton-title {
            width: 70%;
            height: 1.2rem;
            background-color: #e0e0e0;
            margin-bottom: 0.4rem;
            border-radius: 4px;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-title {
            background-color: #2d2d2d;
          }

          .skeleton-company {
            width: 50%;
            height: 0.95rem;
            background-color: #e0e0e0;
            border-radius: 4px;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-company {
            background-color: #2d2d2d;
          }

          .skeleton-action {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #e0e0e0;
            margin-left: auto;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-action {
            background-color: #2d2d2d;
          }

          .skeleton-details {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin-bottom: 1.2rem;
            padding-bottom: 1.2rem;
            border-bottom: 1px solid #e5e5e5;
          }

          .job-card-skeleton.dark .skeleton-details {
            border-bottom-color: #2d2d2d;
          }

          .skeleton-detail-item {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            padding: 0.2rem 0.6rem;
            background-color: #e0e0e0;
            border-radius: 16px;
            width: 40%; /* Adjust width as needed */
            height: 1rem;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-detail-item {
            background-color: #2d2d2d;
          }

          .skeleton-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 1rem;
            border-top: 1px solid #e5e5e5;
          }

          .job-card-skeleton.dark .skeleton-footer {
            border-top-color: #2d2d2d;
          }

          .skeleton-metadata {
            width: 60%;
            height: 0.85rem;
            background-color: #e0e0e0;
            border-radius: 4px;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-metadata {
            background-color: #2d2d2d;
          }

          .skeleton-actions {
            display: flex;
            gap: 0.8rem;
          }

          .skeleton-button {
            width: 50px;
            height: 2.1rem;
            background-color: #e0e0e0;
            border-radius: 5px;
            animation: shimmer 1.5s infinite linear;
          }

          .job-card-skeleton.dark .skeleton-button {
            background-color: #2d2d2d;
          }

          @keyframes shimmer {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }

          .skeleton-logo,
          .skeleton-title,
          .skeleton-company,
          .skeleton-action,
          .skeleton-detail-item,
          .skeleton-metadata,
          .skeleton-button {
            background-image: linear-gradient(
              90deg,
              #e0e0e0,
              #f5f5f5,
              #e0e0e0
            ); /* Light mode shimmer */
            background-size: 200% 100%;
            background-repeat: no-repeat;
          }

          .job-card-skeleton.dark .skeleton-logo,
          .job-card-skeleton.dark .skeleton-title,
          .job-card-skeleton.dark .skeleton-company,
          .job-card-skeleton.dark .skeleton-action,
          .job-card-skeleton.dark .skeleton-detail-item,
          .job-card-skeleton.dark .skeleton-metadata,
          .job-card-skeleton.dark .skeleton-button {
            background-image: linear-gradient(
              90deg,
              #2d2d2d,
              #444,
              #2d2d2d
            ); /* Dark mode shimmer */
          }
        `}
      </style>
    </div>
  );
}

export default JobCardSkeleton;
