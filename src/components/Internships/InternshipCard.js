import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
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
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    setTimeout(() => {
      addToCart(internship);
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
    <Link to={`/internships/${internship.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden h-full flex flex-col">
        <div className="relative">
          <img
            src={internship.image}
            alt={internship.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-lg leading-tight text-white">
              {internship.title}
            </h3>
          </div>
          <div className="absolute top-4 right-4 bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {internship.category}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center mb-3">
            <img
              src={codeblazeLogo}
              alt="Codeblaze Logo"
              className="w-6 h-6 mr-2"
            />
            <span className="text-sm font-semibold text-gray-700">
              Codeblaze Academy
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>{displayLocation}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Briefcase className="w-4 h-4 mr-2 text-primary" />
              <span>{internship.work_type}</span>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-1 font-bold">{internship.rating.toFixed(1)}</span>
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({internship.reviews.toLocaleString()} reviews)
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {internship.fees}
                </span>
                {internship.originalFees && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {internship.originalFees}
                  </span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:bg-gray-400"
                disabled={isAdding || isApplied}
              >
                {isApplied ? "Applied" : isAdding ? "Adding..." : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InternshipCard;
