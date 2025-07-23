import CourseCard from "../common/CourseCard";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allCourses } from "../../pages/CoursesPage";
import { motion } from "framer-motion";
import "./TrendingOnCodeblaze.css";

export default function TrendingOnCodeblaze() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const courses = allCourses;

  const updateItemsPerSlide = () => {
    if (window.innerWidth < 768) {
      setItemsPerSlide(2);
    } else if (window.innerWidth < 1024) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(4);
    }
  };

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const slideIncrement = 2;
  const totalSlides = Math.ceil(courses.length / slideIncrement);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      if (next * slideIncrement >= courses.length) {
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [itemsPerSlide, totalSlides]);

  return (
    <section
      className="pt-16"
      style={{ backgroundColor: "hsl(var(--website-background))" }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="text-left sm:text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Trending on <span className="text-red-500">Codeblaze</span>
          </h2>
        </div>

        {/* Course Cards Slider */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${currentSlide * (100 / itemsPerSlide) * slideIncrement}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex-shrink-0 p-2"
                style={{ width: `${100 / itemsPerSlide}%` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-8">
          {totalSlides > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    currentSlide === index
                      ? "bg-red-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                ></button>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            className="px-8 py-2 text-primary border-primary hover:bg-primary hover:text-white"
            onClick={() => navigate("/courses")}
          >
            Show More
          </Button>
        </div>
      </div>
    </section>
  );
}
