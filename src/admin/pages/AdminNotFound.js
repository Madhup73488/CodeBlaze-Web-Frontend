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
          height: 100%;
          padding: 2rem;
        }

        .not-found-content {
          text-align: center;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .not-found-content.light {
          background-color: #f8f9fa;
          color: #343a40;
        }

        .not-found-content.dark {
          background-color: #212529;
          color: #e9ecef;
        }

        h1 {
          font-size: 5rem;
          font-weight: 900;
          margin: 0;
          color: ${theme === "dark" ? "#6c757d" : "#495057"};
        }

        h2 {
          font-size: 2rem;
          margin: 1rem 0;
          font-weight: 700;
        }

        p {
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          color: ${theme === "dark" ? "#adb5bd" : "#6c757d"};
        }

        .return-home {
          display: inline-block;
          padding: 0.8rem 2rem;
          background-color: #007bff;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .return-home:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 4rem;
          }

          h2 {
            font-size: 1.5rem;
          }
          
          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminNotFound;
