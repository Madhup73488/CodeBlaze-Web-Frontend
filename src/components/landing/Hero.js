import React, { useState, useEffect } from "react";
import {
  Play,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Changed from Navigate to useNavigate
import { ROUTES } from "../../constants/routes"; // Import ROUTES

// Accept theme and color props from App.js
const Hero = ({ theme, color }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentStat, setCurrentStat] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  // Determine if the global theme is dark
  const isDarkMode = theme === "dark";
  // const primaryColor = color === "purple" ? "#a855f7" : "#f97316"; // primaryColor not used in this version

  const stats = [
    { number: "50K+", label: "Students", icon: Users },
    { number: "1K+", label: "Courses", icon: BookOpen },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Clock },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Hands-on projects and real-world applications",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals",
    },
    {
      icon: Award,
      title: "Certified Programs",
      description: "Earn recognized certifications",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Personalized learning experience",
    },
  ];

  const courseCategories = [
    "Web Development",
    "Data Science",
    "Mobile Apps",
    "UI/UX Design",
    "Digital Marketing",
    "Cloud Computing",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]); // Added stats.length to dependency array

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]); // Added features.length to dependency array

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: `var(--bg-primary)`,
        color: `var(--text-primary)`,
      }}
    >
      <div className="container mx-auto px-6 pt-14 md:pt-22 lg:pt-14 pb-12">
        <div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          <div className="space-y-8 lg:text-left">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <Star className="w-4 h-4 text-yellow-500 mr-2 animate-pulse" />
              <span
                className="text-sm font-medium"
                style={{
                  color: isDarkMode
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
                }}
              >
                Trusted by 50,000+ Students
              </span>
            </div>
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-black leading-tight tracking-tight">
                LEARN.
                <br />
                <span
                  className={`${
                    isDarkMode ? "text-[#f97316]" : "text-[#f97316]" // This color might need to be dynamic based on 'color' prop
                  }`}
                >
                  CREATE.
                </span>
                <br />
                SUCCEED.
              </h1>
              <p
                className={`text-xl lg:text-2xl max-w-lg font-light ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Transform your career with industry-leading courses designed by
                experts. Start your journey to success today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  navigate(ROUTES.INTERNSHIPS); // Use navigate function and ROUTES constant
                }}
                className={`group flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all cursor-pointer duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#ff9635] text-black hover:bg-gray-100" // Consider using primaryColor from props
                    : "bg-[#ff9635] text-white hover:bg-gray-800" // Consider using primaryColor from props
                }`}
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                className={`group flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 cursor-pointer transition-all duration-300 ${
                  isDarkMode
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
                <span>Watch Preview</span>
              </button>
            </div>
            <div className="pt-8">
              <p
                className={`text-sm font-medium mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                POPULAR CATEGORIES
              </p>
              <div className="flex flex-wrap gap-2">
                {courseCategories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 text-sm font-medium rounded-full border cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? "border-gray-700 hover:bg-gray-800"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Learning Dashboard</h3>
                <div
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    isDarkMode ? "bg-green-400" : "bg-green-500"
                  }`}
                ></div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Current Progress</span>
                    <span className="text-sm">75%</span>
                  </div>
                  <div
                    className={`w-full rounded-full h-3 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        isDarkMode ? "bg-white" : "bg-black"
                      }`}
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl border ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    >
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">React Mastery Course</h4>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Module 8 of 12 • 45 min remaining
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                        activeFeature === index
                          ? isDarkMode
                            ? "bg-gray-800 border-2 border-white"
                            : "bg-gray-200 border-2 border-black"
                          : isDarkMode
                          ? "bg-gray-800/50 border border-gray-700"
                          : "bg-gray-100 border border-gray-300"
                      }`}
                    >
                      <feature.icon
                        className={`w-6 h-6 mb-2 ${
                          activeFeature === index ? "animate-pulse" : ""
                        }`}
                      />
                      <h5 className="font-semibold text-sm">{feature.title}</h5>
                      <p
                        className={`text-xs mt-1 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 right-6">
              <div
                className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                  isDarkMode
                    ? "bg-black border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center transition-all duration-300 ${
                        currentStat === index ? "scale-110" : "opacity-70"
                      }`}
                    >
                      <stat.icon
                        className={`w-6 h-6 mx-auto mb-2 ${
                          currentStat === index ? "animate-bounce" : ""
                        }`}
                      />
                      <div className="text-xl font-bold">{stat.number}</div>
                      <div
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`border-t mt-20 ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to Start Your Journey?</h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Join thousands of students already learning with us
            </p>
            <button
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
