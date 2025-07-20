import React from "react";

const CourseDetailSkeleton = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-2">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="aspect-video bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="mt-8">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="h-8 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="mt-8">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;
