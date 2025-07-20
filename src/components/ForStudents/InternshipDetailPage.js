import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { internships } from "./internshipsData";
import { allCourses } from "../../pages/CoursesPage";
import InternshipDetailSkeleton from "../Internships/InternshipDetailSkeleton";
import CourseAccessCard from "../common/CourseAccessCard";
import { Button } from "../ui/button";
import { useCart } from "../../contexts/CartContext";

const InternshipDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundInternship = internships.find((i) => i.id === id);
      setInternship(foundInternship);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(internship);
      setIsAdding(false);
    }, 1000);
  };

  if (loading) {
    return <InternshipDetailSkeleton />;
  }

  if (!internship) {
    return <div>Internship not found</div>;
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:col-span-1">
            <div className="mt-4">
              <img
                src={internship.image}
                alt={internship.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:col-span-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {internship.title}
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              {internship.company}
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">
                About this internship
              </h2>
              <p className="mt-4 text-gray-500">{internship.description}</p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Requirements
              </h2>
              <ul className="mt-4 list-disc list-inside text-gray-500">
                {internship.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">Curriculum</h2>
              <ul className="mt-4 list-disc list-inside text-gray-500">
                {internship.curriculum.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Courses you will get access to
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {allCourses
                  .filter((course) =>
                    internship.techStack.some((tech) =>
                      course.title.toLowerCase().includes(tech.toLowerCase())
                    )
                  )
                  .map((course) => (
                    <CourseAccessCard key={course.id} course={course} />
                  ))}
              </div>
            </div>
            <div className="mt-8 bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {internship.fees}
              </h2>
              <Button
                onClick={handleAddToCart}
                className="mt-4 w-full"
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add to Bag"}
              </Button>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900">
                  This internship includes
                </h3>
                <ul className="mt-4 space-y-2 text-gray-500">
                  {internship.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailPage;
