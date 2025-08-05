import CourseCard from "../common/CourseCard";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allCourses } from "../../pages/CoursesPage";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Code, Users, Award, Clock } from "lucide-react";
import "./TrendingOnSyntellite.css";

export default function TrendingOnSyntellite() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const courses = allCourses;

  const updateItemsPerSlide = () => {
    if (window.innerWidth < 768) {
      setItemsPerSlide(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerSlide(2);
    } else if (window.innerWidth < 1280) {
      setItemsPerSlide(3);
    } else {
      setItemsPerSlide(4);
    }
  };

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const slideIncrement = 1;
  const totalSlides = Math.max(0, courses.length - itemsPerSlide + 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      if (next >= totalSlides) {
        return 0;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const previous = prev - 1;
      if (previous < 0) {
        return totalSlides - 1;
      }
      return previous;
    });
  };

  useEffect(() => {
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [itemsPerSlide, totalSlides]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">Trending Internship Programs</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Most Popular{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Internship Programs
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students in our industry-leading internship programs. 
            Gain real-world experience, build your portfolio, and kickstart your tech career.
          </motion.p>
        </motion.div>

        {/* Course Cards Slider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
              }}
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  className="flex-shrink-0 p-3"
                  style={{ width: `${100 / itemsPerSlide}%` }}
                >
                  <div className="hover-lift">
                    <CourseCard course={course} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Previous slide"
              >
                <ArrowRight className="w-5 h-5 text-neutral-700 rotate-180" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5 text-neutral-700" />
              </button>
            </>
          )}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <motion.div variants={itemVariants} className="flex items-center space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-gradient-to-r from-red-500 to-orange-500 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          )}

          {/* Show More Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={() => navigate("/internships")}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center gap-2">
                Explore All Internships
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-20 pt-16 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                number: "5,000+", 
                label: "Students Placed", 
                icon: Users,
                color: "from-blue-500 to-blue-600"
              },
              { 
                number: "200+", 
                label: "Partner Companies", 
                icon: Award,
                color: "from-green-500 to-green-600"
              },
              { 
                number: "98%", 
                label: "Success Rate", 
                icon: TrendingUp,
                color: "from-purple-500 to-purple-600"
              },
              { 
                number: "6 Months", 
                label: "Average Duration", 
                icon: Clock,
                color: "from-orange-500 to-orange-600"
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="mb-4 flex justify-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
