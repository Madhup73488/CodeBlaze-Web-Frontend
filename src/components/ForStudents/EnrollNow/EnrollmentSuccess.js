import React from "react";
import "./EnrollmentSuccess.css";

const EnrollmentSuccess = ({ onClose }) => {
  return (
    <div className="enrollment-success-container">
      <div className="enrollment-success-content">
        <h2>Congratulations!</h2>
        <p>Your application has been submitted successfully.</p>
        <p style={{ color: "gray" }}>
          Our Internship program manager will reach out to you soon.
        </p>
        <button onClick={onClose} className="close-modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default EnrollmentSuccess;
