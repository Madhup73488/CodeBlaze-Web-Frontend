import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWorkBag } from "../../contexts/WorkBagContext";
import { Star, MapPin, Calendar, Briefcase } from "lucide-react";
import codeblazeLogo from "../../assets/images/codeblazelogoorange.png";

const InternshipCard = ({
  internship,
  theme,
  primaryColor,
  savedInternships,
  appliedInternships,
  toggleSaveInternship,
  formatDate,
}) => {
  const { addToWorkBag } = useWorkBag();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    setTimeout(() => {
      addToWorkBag(internship);
      setIsAdding(false);
    }, 1000);
  };

  const isSaved = savedInternships.includes(internship.id);
  const isApplied = appliedInternships.includes(internship.id);

  const displayLocation =
    internship.work_type &&
    typeof internship.work_type === "string" &&
    internship.work_type.toLowerCase().includes("remote")
      ? "Work From Home"
      : internship.location;

  return (
    <Link to={`/internships/${internship.id}`} className="block group h-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full overflow-hidden rounded-t-lg">
          <img
            src={internship.image}
            alt={internship.title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          {internship.category && (
            <div
              className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full bg-purple-200 text-purple-800"
            >
              {internship.category}
            </div>
          )}
        </div>

        <div className="p-2 sm:p-4 flex flex-col flex-grow">
          <div className="flex items-center mb-1 sm:mb-2">
            <img
              src={codeblazeLogo}
              alt="Codeblaze Logo"
              className="w-5 h-5 object-contain mr-1"
              loading="lazy"
            />
            <span className="text-xs text-gray-600 font-medium">
              Codeblaze Academy
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 leading-tight flex-grow">
            {internship.title}
          </h3>

          <div className="flex items-center mb-1 sm:mb-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">
                {internship.rating.toFixed(1)}
              </span>
            </div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500">
              ({internship.reviews.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex flex-col text-xs sm:text-sm text-gray-500 mb-2 space-y-1">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{displayLocation}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
              <span>{internship.work_type}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {internship.fees}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-primary text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
              disabled={isAdding || isApplied}
            >
              {isApplied ? "Applied" : isAdding ? "Adding..." : "Apply Now"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InternshipCard;
