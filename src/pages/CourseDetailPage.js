import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allCourses } from "./CoursesPage";
import { useCart } from "../contexts/CartContext";
import CourseDetailSkeleton from "../components/common/CourseDetailSkeleton";
import { FiClock, FiVideo, FiFileText, FiAward, FiStar } from "react-icons/fi";
import CourseAccessCard from "../components/common/CourseAccessCard";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [course, setCourse] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (cart && course) {
      setIsInCart(cart.some((item) => item.id === course.id));
    }
  }, [cart, course]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCourse = allCourses.find((c) => c.id === id);
      setCourse(foundCourse);
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <CourseDetailSkeleton />;
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the course you're looking for.
          </p>
        </div>
      </div>
    );
  }

  const features = [
    { icon: <FiClock className="w-6 h-6 text-primary" />, text: "30 hours on-demand video" },
    { icon: <FiFileText className="w-6 h-6 text-primary" />, text: "15 articles" },
    { icon: <FiVideo className="w-6 h-6 text-primary" />, text: "Full lifetime access" },
    { icon: <FiAward className="w-6 h-6 text-primary" />, text: "Certificate of completion" },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{course.title}</h1>
              <p className="mt-4 text-xl text-gray-600">{course.provider}</p>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900">
                About this course
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This comprehensive course will take you through the fundamentals and advanced concepts of {course.title}. Whether you're a beginner or an experienced professional, you'll find valuable insights and practical skills that you can apply immediately.
              </p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-white rounded-lg shadow-xl p-8 sticky top-24">
              <h2 className="text-4xl font-bold text-gray-900">
                ₹{course.price}
              </h2>
              <button
                onClick={() => {
                  if (isInCart) return;
                  setIsAdding(true);
                  setTimeout(() => {
                    addToCart(course);
                    setIsAdding(false);
                  }, 1000);
                }}
                className={`mt-6 w-full text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 ease-in-out flex items-center justify-center ${isAdding ? 'bg-gray-500' : 'bg-primary hover:bg-primary/90'}`}
                disabled={isAdding || isInCart}
              >
                {isAdding ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isInCart ? (
                  "Already in Bag"
                ) : (
                  "Add to Bag"
                )}
              </button>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Relevant Courses
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {allCourses
                    .filter((c) => c.category === course.category && c.id !== course.id)
                    .slice(0, 5)
                    .map((course) => (
                      <CourseAccessCard key={course.id} course={course} />
                    ))}
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Student Reviews
                </h3>
                <div className="mt-4 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <FiStar key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="ml-2 text-sm text-gray-600">4.8 (1,283 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
