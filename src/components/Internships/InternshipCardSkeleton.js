import React from "react";

const InternshipCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="ml-4">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 ml-2 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 ml-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default InternshipCardSkeleton;
