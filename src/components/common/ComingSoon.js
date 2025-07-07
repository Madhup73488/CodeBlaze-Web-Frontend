import React from 'react';
import './ComingSoon.css';

const ComingSoon = ({ theme }) => {
  const primaryColor = theme === "dark" ? "#f97316" : "#a855f7";

  return (
    <div className={`coming-soon-container ${theme}`}>
      <div className="coming-soon-content">
        <h1 className="coming-soon-title" style={{ color: primaryColor }}>
          Coming Soon!
        </h1>
        <p className="coming-soon-subtitle">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
