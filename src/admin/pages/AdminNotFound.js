// admin/pages/AdminNotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";

const AdminNotFound = () => {
  const { theme } = useAdmin();

  return (
    <div className="not-found-container">
      <div className={`not-found-content ${theme}`}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/admin/dashboard" className="return-home">
          Return to Dashboard
        </Link>
      </div>

      <style jsx>{`
        .not-found-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 200px);
          padding: 2rem;
        }

        .not-found-content {
          text-align: center;
          max-width: 600px;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .not-found-content.light {
          background-color: #ffffff;
          color: #111827;
        }

        .not-found-content.dark {
          background-color: #1f2937;
          color: #e0e0e0;
        }

        h1 {
          font-size: 6rem;
          font-weight: 800;
          margin: 0;
          color: ${theme === "dark" ? "#4f46e5" : "#4f46e5"};
        }

        h2 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
        }

        p {
          font-size: 1rem;
          margin-bottom: 2rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .return-home {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #4f46e5;
          color: white;
          border-radius: 0.375rem;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .return-home:hover {
          background-color: #4338ca;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 4rem;
          }

          h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminNotFound;
