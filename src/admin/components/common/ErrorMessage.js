// src/admin/components/common/ErrorMessage.jsx

import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null; // Don't render if there's no message

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {message}</span>
      {/* Optional: Add a close button */}
    </div>
  );
};

export default ErrorMessage;