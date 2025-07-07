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
  Rocket,
  Code,
  Globe,
  Target,
  Building,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Hero = ({ theme, color, openCallbackModal }) => {
  // Add openCallbackModal to props
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isDarkMode = theme === "dark";
  const bgColor = isDarkMode ? "#111827" : "#f9fafb";
  const cardBgColor = isDarkMode ? "#1f2937" : "#ffffff";
  const cardBorderColor = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";
  const textColor = isDarkMode ? "#f9fafb" : "#111827";
  const mutedTextColor = isDarkMode ? "#9ca3af" : "#6b7280";

  const stats = [
    { number: "100+", label: "Students", icon: Users },
    { number: "10+", label: "Courses", icon: BookOpen },
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

  const businessServices = [
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Tailored solutions for your business needs",
    },
    {
      icon: Globe,
      title: "Web Applications",
      description: "Scalable and responsive web solutions",
    },
    {
      icon: Building,
      title: "Enterprise Solutions",
      description: "Complex systems for large organizations",
    },
    {
      icon: Lightbulb,
      title: "Digital Transformation",
      description: "Modernize your business processes",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  };

  const BusinessSlide = () => (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="space-y-8 lg:text-left">
        <div
          className="inline-flex items-center px-4 py-2 rounded-full border"
          style={{
            backgroundColor: cardBgColor,
            borderColor: cardBorderColor,
          }}
        >
          <Rocket className="w-4 h-4 text-blue-500 mr-2 animate-pulse" />
          <span
            className="text-sm font-medium"
            style={{ color: mutedTextColor }}
          >
            Trusted by 10+ Businesses
          </span>
        </div>

        <div className="space-y-6">
          <h1
            className="text-4xl lg:text-6xl font-black leading-tight tracking-tight"
            style={{ color: textColor }}
          >
            GROW.
            <br />
            <span className="text-[#f97316]">SCALE.</span>
            <br />
            SUCCEED.
          </h1>
          <p
            className="text-lg lg:text-xl max-w-lg font-light"
            style={{ color: mutedTextColor }}
          >
            Partner with CodeBlaze to transform your business with cutting-edge
            software solutions. We build tomorrow's technology today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => openCallbackModal()}
            className="group flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all cursor-pointer duration-300 transform hover:scale-105"
            style={{
              backgroundColor: "#ff9635",
              color: isDarkMode ? "#000" : "#fff",
            }}
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            className="group flex items-center justify-center px-6 py-3 rounded-full font-semibold border-2 cursor-pointer transition-all duration-300"
            style={{
              borderColor: textColor,
              color: textColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = textColor;
              e.currentTarget.style.color = bgColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = textColor;
            }}
          >
            <Target className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
            <span
              onClick={() => {
                navigate("/services");
              }}
            >
              View Services
            </span>
          </button>
        </div>

        <div className="pt-8">
          <p
            className="text-sm font-medium mb-4"
            style={{ color: mutedTextColor }}
          >
            OUR SERVICES
          </p>
          <div className="grid grid-cols-2 gap-4">
            {businessServices.map((service, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: cardBorderColor,
                  backgroundColor: cardBgColor,
                }}
              >
                <service.icon className="w-6 h-6 mb-2 text-[#f97316]" />
                <h4
                  className="font-semibold text-sm mb-1"
                  style={{ color: textColor }}
                >
                  {service.title}
                </h4>
                <p className="text-xs" style={{ color: mutedTextColor }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="p-8 rounded-3xl border-2 transition-all duration-300"
          style={{
            backgroundColor: cardBgColor,
            borderColor: cardBorderColor,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">CodeBlaze Solutions</h3>
            <div className="flex space-x-2">
              <div
                className={`w-3 h-3 rounded-full animate-pulse bg-green-400`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full animate-pulse bg-blue-400`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full animate-pulse bg-orange-400`}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium" style={{ color: textColor }}>
                  Project Success Rate
                </span>
                <span className="text-sm" style={{ color: mutedTextColor }}>
                  95%
                </span>
              </div>
              <div
                className="w-full rounded-full h-3"
                style={{ backgroundColor: cardBorderColor }}
              >
                <div
                  className="h-3 rounded-full transition-all duration-1000 bg-gradient-to-r from-blue-500 to-green-500"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div
                className="p-4 rounded-xl border"
                style={{ borderColor: cardBorderColor }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold" style={{ color: textColor }}>
                      E-Commerce Platform
                    </h4>
                    <p className="text-sm" style={{ color: mutedTextColor }}>
                      Full-stack solution • 200% ROI increase
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>

              <div
                className="p-4 rounded-xl border"
                style={{ borderColor: cardBorderColor }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold" style={{ color: textColor }}>
                      Enterprise Dashboard
                    </h4>
                    <p className="text-sm" style={{ color: mutedTextColor }}>
                      Real-time analytics • 50% efficiency boost
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm" style={{ color: mutedTextColor }}>
                Powering innovation across industries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LearningSlide = () => (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="space-y-8 lg:text-left">
        <div
          className="inline-flex items-center px-4 py-2 rounded-full border"
          style={{
            backgroundColor: cardBgColor,
            borderColor: cardBorderColor,
          }}
        >
          <Star className="w-4 h-4 text-yellow-500 mr-2 animate-pulse" />
          <span
            className="text-sm font-medium"
            style={{ color: mutedTextColor }}
          >
            Trusted by 100+ Students
          </span>
        </div>
        <div className="space-y-6">
          <h1
            className="text-4xl lg:text-6xl font-black leading-tight tracking-tight"
            style={{ color: textColor }}
          >
            LEARN.
            <br />
            <span className="text-[#f97316]">CREATE.</span>
            <br />
            SUCCEED.
          </h1>
          <p
            className="text-lg lg:text-xl max-w-lg font-light"
            style={{ color: mutedTextColor }}
          >
            Transform your career with industry-leading courses designed by
            experts. Start your journey to success today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              navigate(ROUTES.INTERNSHIPS);
            }}
            className="group flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all cursor-pointer duration-300 transform hover:scale-105"
            style={{
              backgroundColor: "#ff9635",
              color: isDarkMode ? "#000" : "#fff",
            }}
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            className="group flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 cursor-pointer transition-all duration-300"
            style={{
              borderColor: textColor,
              color: textColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = textColor;
              e.currentTarget.style.color = bgColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = textColor;
            }}
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300 cursor-pointer" />
            <span
              onClick={() => {
                navigate("/internships");
              }}
            >
              Watch Preview
            </span>
          </button>
        </div>
        <div className="pt-8">
          <p
            className="text-sm font-medium mb-4"
            style={{ color: mutedTextColor }}
          >
            POPULAR CATEGORIES
          </p>
          <div className="flex flex-wrap gap-2">
            {courseCategories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium rounded-full border cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: cardBorderColor,
                  backgroundColor: cardBgColor,
                  color: textColor,
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className="p-8 rounded-3xl border-2 transition-all duration-300"
          style={{
            backgroundColor: cardBgColor,
            borderColor: cardBorderColor,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold" style={{ color: textColor }}>
              Learning Dashboard
            </h3>
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: "#22c55e" }}
            ></div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium" style={{ color: textColor }}>
                  Current Progress
                </span>
                <span className="text-sm" style={{ color: mutedTextColor }}>
                  75%
                </span>
              </div>
              <div
                className="w-full rounded-full h-3"
                style={{ backgroundColor: cardBorderColor }}
              >
                <div
                  className="h-3 rounded-full transition-all duration-1000"
                  style={{
                    width: "75%",
                    backgroundColor: textColor,
                  }}
                ></div>
              </div>
            </div>
            <div
              className="p-4 rounded-xl border"
              style={{ borderColor: cardBorderColor }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: cardBorderColor }}
                >
                  <BookOpen className="w-6 h-6" style={{ color: textColor }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold" style={{ color: textColor }}>
                    React Mastery Course
                  </h4>
                  <p className="text-sm" style={{ color: mutedTextColor }}>
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
                  className="p-4 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor:
                      activeFeature === index ? cardBorderColor : "transparent",
                    border: `1px solid ${cardBorderColor}`,
                  }}
                >
                  <feature.icon
                    className="w-6 h-6 mb-2"
                    style={{
                      color:
                        activeFeature === index ? textColor : mutedTextColor,
                    }}
                  />
                  <h5
                    className="font-semibold text-sm"
                    style={{ color: textColor }}
                  >
                    {feature.title}
                  </h5>
                  <p className="text-xs mt-1" style={{ color: mutedTextColor }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 right-6">
          <div
            className="p-6 rounded-2xl border-2 transition-all duration-500"
            style={{
              backgroundColor: bgColor,
              borderColor: cardBorderColor,
            }}
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
  );

  return (
    <div
      className="transition-colors duration-500 relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: isMobile ? "0 5%" : "0 10%",
      }}
    >
      {/* Decorative elements */}
        <div
          className={`absolute top-0 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 opacity-10 blur-3xl`}
        ></div>
        <div
          className={`absolute bottom-40 left-10 w-48 h-48 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 opacity-10 blur-3xl`}
        ></div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: cardBgColor,
            color: textColor,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: cardBgColor,
            color: textColor,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Container */}
        <div className="relative" style={{ overflow: "hidden" }}>
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: Business Growth */}
            <div className="w-full flex-shrink-0">
              <div className="container mx-auto pt-6 md:pt-22 lg:pt-8 pb-0">
                <BusinessSlide />
              </div>
            </div>

            {/* Slide 2: Learning Platform */}
            <div className="w-full flex-shrink-0">
              <div className="container mx-auto pt-6 md:pt-22 lg:pt-8 pb-0">
                <LearningSlide />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="border-t mt-4" style={{ borderColor: cardBorderColor }}>
          <div className="container mx-auto px-6 py-12">
            
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
