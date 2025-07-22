import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkBag } from "../../contexts/WorkBagContext";
import { useState } from "react";

export default function CourseCard({ course }) {
  const { addToWorkBag } = useWorkBag();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    setTimeout(() => {
      addToWorkBag(course);
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Link to={`/courses/${course.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {course.tag && (
            <div
              className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                course.tag === "Bestseller"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-purple-200 text-purple-800"
              }`}
            >
              {course.tag}
            </div>
          )}
        </div>

        <div className="p-2 sm:p-4 flex flex-col flex-grow">
          <div className="flex items-center mb-1 sm:mb-2">
            <img
              src={course.providerLogo}
              alt={`${course.provider} logo`}
              className="w-5 h-5 object-contain mr-1"
              loading="lazy"
            />
            <span className="text-xs text-gray-600 font-medium">
              {course.provider}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 leading-tight flex-grow">
            {course.title}
          </h3>

          <div className="flex items-center mb-1 sm:mb-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">
                {course.rating.toFixed(1)}
              </span>
            </div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500">
              ({course.reviewCount.toLocaleString()})
            </span>
          </div>

          <div className="flex flex-col text-xs sm:text-sm text-gray-500 mb-2">
            <span>{course.level}</span>
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ₹{course.price}
            </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Bag"}
          </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
