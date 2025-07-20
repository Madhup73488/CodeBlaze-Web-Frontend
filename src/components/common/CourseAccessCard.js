import React from 'react';
import { Link } from 'react-router-dom';

const CourseAccessCard = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out overflow-hidden">
        <div className="flex items-center p-2 sm:p-4">
          <img src={course.image} alt={course.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mr-2 sm:mr-4" />
          <h3 className="font-semibold text-xs sm:text-base text-gray-800 group-hover:text-primary transition-colors duration-200">
            {course.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CourseAccessCard;
