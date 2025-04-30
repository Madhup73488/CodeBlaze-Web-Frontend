// src/admin/components/common/LoadingSpinner.jsx

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      {/* You can replace this with an actual spinner icon */}
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p className="ml-3 text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;