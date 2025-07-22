import React, { useState } from "react";
import { internships } from "../../../components/ForStudents/internshipsData";
import adminApi from "../../utils/api";

const GrantAccessModal = ({ theme, onClose, setToast, users }) => {
  const [email, setEmail] = useState("");
  const [selectedInternships, setSelectedInternships] = useState([]);

  const handleInternshipChange = (internshipId) => {
    setSelectedInternships((prevSelected) =>
      prevSelected.includes(internshipId)
        ? prevSelected.filter((id) => id !== internshipId)
        : [...prevSelected, internshipId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedInternships.length === 0) {
      setToast({
        message: "Please select at least one internship.",
        type: "warning",
      });
      return;
    }

    const user = users.find((u) => u.email === email);
    if (user) {
      const alreadyGrantedInternships = selectedInternships.filter((id) =>
        user.accessible_internship_ids.includes(id)
      );
      if (alreadyGrantedInternships.length > 0) {
        setToast({
          message:
            "Access has already been granted for one or more selected internships.",
          type: "warning",
        });
        return;
      }
    }

    try {
      const response = await adminApi.grantAccess({
        email,
        internship_ids: selectedInternships,
      });
      if (response.success) {
        setToast({ message: "Access granted successfully!", type: "success" });
        onClose();
      } else {
        setToast({
          message: response.message || "Failed to grant access.",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: "An error occurred while granting access.",
        type: "error",
      });
    }
  };

  return (
    <div className="grant-access-modal-overlay" onClick={onClose}>
      <div
        className={`grant-access-modal ${theme}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grant-access-header">
          <h2>Grant Access</h2>
          <button onClick={onClose} className="grant-access-close-button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grant-access-form-group">
            <label htmlFor="email">User Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., user@example.com"
              required
            />
          </div>
          <div className="grant-access-form-group">
            <label>Internships</label>
            <div className="grant-access-checkbox-group">
              {internships.map((internship) => (
                <label
                  key={internship.id}
                  htmlFor={internship.id}
                  className="grant-access-checkbox-label"
                >
                  <input
                    type="checkbox"
                    id={internship.id}
                    name={internship.id}
                    checked={selectedInternships.includes(internship.id)}
                    onChange={() => handleInternshipChange(internship.id)}
                  />
                  <span>{internship.title}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit">Grant Access</button>
        </form>
      </div>
      <style jsx>{`
        .grant-access-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .grant-access-modal {
          background: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
        }
        .grant-access-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          position: relative;
        }
        .grant-access-close-button {
          position: absolute;
          top: -1rem;
          right: -1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: ${theme === "dark" ? "#ffffff" : "#000000"};
        }
        .grant-access-form-group {
          margin-bottom: 1.5rem;
        }
        .grant-access-modal label {
          display: block;
          margin-bottom: 0.5rem;
          padding: 0.25rem 0.25rem;
        }
        .grant-access-modal label:hover {
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          cursor: pointer;
          border-radius: 0.375rem;
        }
        .grant-access-modal input[type="email"],
        .grant-access-checkbox-group {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e5e7eb" : "#111827"};
        }
        .grant-access-checkbox-group {
          max-height: 150px;
          overflow-y: auto;
        }
        .grant-access-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .grant-access-modal button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.375rem;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default GrantAccessModal;
