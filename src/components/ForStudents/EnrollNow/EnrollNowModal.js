import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWorkBag } from "../../../contexts/WorkBagContext";
import "./EnrollNowModal.css";
import CloseConsent from "./CloseConsent";
import EnrollmentSuccess from "./EnrollmentSuccess";
import codeblazeLogoOrange from "../../../assets/images/codeblazelogoorange.png";

const EnrollNowModal = ({ internship, onClose, theme }) => {
  const { user } = useAuth();
  const { clearWorkBag } = useWorkBag();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    college: user?.college || "",
  });
  const [showConsent, setShowConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`${apiUrl}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setFormData((prev) => ({
              ...prev,
              name: userData.user.name,
              email: userData.user.email,
              phone: userData.user.phone,
              college: userData.user.college,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleCloseClick = () => {
    setShowConsent(true);
  };

  const handleConfirmClose = () => {
    setShowConsent(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConsent(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const applicationData = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      course: internship.title,
      college: e.target.college.value,
      userId: user?.id,
    };

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/api/enrollment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        clearWorkBag();
      } else {
        // Handle submission error
        console.error("Application submission failed:", result.message);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${theme}`}>
      <div className="modal-content">
        {isSubmitted ? (
          <EnrollmentSuccess onClose={onClose} />
        ) : (
          <>
            <div className="modal-header">
              <h2>Enroll for Internship</h2>
              <button className="close-button" onClick={handleCloseClick}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="internship">Internship</label>
                  <input
                    type="text"
                    id="internship"
                    value={internship.title}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    defaultValue={formData.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone No</label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={formData.phone}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Id</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={formData.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="college">College Name</label>
                  <input
                    type="text"
                    id="college"
                    defaultValue={formData.college}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    "Apply"
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {showConsent && (
        <CloseConsent
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          theme={theme}
        />
      )}
    </div>
  );
};

export default EnrollNowModal;
