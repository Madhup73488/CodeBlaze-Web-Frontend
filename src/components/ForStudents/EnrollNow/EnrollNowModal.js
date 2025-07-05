import React, { useState } from 'react';
import './EnrollNowModal.css';
import CloseConsent from './CloseConsent';
import EnrollmentSuccess from './EnrollmentSuccess';

const EnrollNowModal = ({ internship, onClose, onSubmit, theme }) => {
  const [showConsent, setShowConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    const formData = {
      name: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      course: internship.title,
      college: e.target.college.value,
    };

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}/api/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error
        console.error('Failed to save enrollment');
      }
    } catch (error) {
      console.error('Error:', error);
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
              <button className="close-button" onClick={handleCloseClick}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="internship">Internship</label>
                  <input type="text" id="internship" value={internship.title} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone No</label>
                  <input type="tel" id="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Id</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="college">College Name</label>
                  <input type="text" id="college" required />
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? <div className="loader"></div> : 'Submit'}
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
