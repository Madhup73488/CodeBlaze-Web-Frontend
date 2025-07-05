import React from 'react';
import './CloseConsent.css';

const CloseConsent = ({ onConfirm, onCancel, theme }) => {
  return (
    <div className={`consent-overlay ${theme}`}>
      <div className="consent-content">
        <div className="consent-header">
          <span className="discount-icon">%</span>
        </div>
        <h2>Limited seats available</h2>
        <p>Are you sure you want to exit?</p>
        <div className="consent-buttons">
          <button onClick={onCancel} className="stay-button">Stay on Page</button>
          <button onClick={onConfirm} className="exit-button">Cancel Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default CloseConsent;
