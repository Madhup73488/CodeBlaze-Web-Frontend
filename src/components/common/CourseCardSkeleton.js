import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-300 animate-pulse"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
        <div className="flex items-center mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 ml-2 animate-pulse"></div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 ml-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
