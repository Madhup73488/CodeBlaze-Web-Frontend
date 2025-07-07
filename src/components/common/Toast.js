import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
