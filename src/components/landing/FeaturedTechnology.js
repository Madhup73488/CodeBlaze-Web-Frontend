import { useState, useEffect, useRef } from "react";

const FeaturedTechnology = ({ theme = "light" }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0); // Add rotation state
  const isDark = theme === "dark";

  // Core technologies with proper logos and descriptions
  const technologies = [
    {
      name: "React",
      category: "Frontend",
      description:
        "Component-based UI library for building interactive interfaces",
      iconPath:
        "M14,7.77 C14,8.62 13.62,9.43 12.91,10.15 C12.21,10.86 11.4,11.24 10.55,11.24 C9.70,11.24 8.89,10.86 8.19,10.15 C7.48,9.43 7.1,8.62 7.1,7.77 C7.1,6.92 7.48,6.11 8.19,5.4 C8.89,4.7 9.70,4.32 10.55,4.32 C11.4,4.32 12.21,4.7 12.91,5.4 C13.62,6.11 14,6.92 14,7.77 Z M8.88,12.11 C7.91,11.87 7.01,11.33 6.16,10.48 C5.31,9.64 4.76,8.74 4.53,7.77 C4.30,6.81 4.39,5.89 4.78,5.01 C5.16,4.13 5.78,3.47 6.61,3.02 C7.45,2.56 8.33,2.48 9.28,2.74 C10.22,3.01 11.09,3.56 11.90,4.38 C12.09,4.57 12.26,4.77 12.43,4.97 C12.60,4.77 12.78,4.57 12.97,4.38 C13.78,3.56 14.65,3.01 15.60,2.74 C16.54,2.48 17.42,2.56 18.26,3.02 C19.09,3.47 19.70,4.13 20.09,5.01 C20.48,5.89 20.57,6.81 20.34,7.77 C20.11,8.74 19.56,9.64 18.71,10.48 C17.86,11.33 16.96,11.87 15.99,12.11 C16.96,12.36 17.86,12.90 18.71,13.75 C19.56,14.60 20.11,15.5 20.34,16.46 C20.57,17.43 20.48,18.34 20.09,19.22 C19.70,20.11 19.09,20.76 18.26,21.22 C17.42,21.67 16.54,21.76 15.60,21.49 C14.65,21.23 13.78,20.68 12.97,19.86 C12.78,19.67 12.60,19.47 12.43,19.27 C12.26,19.47 12.09,19.67 11.90,19.86 C11.09,20.68 10.22,21.23 9.28,21.49 C8.33,21.76 7.45,21.67 6.61,21.22 C5.78,20.76 5.16,20.11 4.78,19.22 C4.39,18.34 4.30,17.43 4.53,16.46 C4.76,15.5 5.31,14.60 6.16,13.75 C7.01,12.90 7.91,12.36 8.88,12.11 Z",
      color: "#61DAFB",
    },
    {
      name: "Node.js",
      category: "Backend",
      description: "JavaScript runtime for building server-side applications",
      iconPath:
        "M12,21.85C11.73,21.85 11.45,21.79 11.22,21.67L8.11,19.85C7.77,19.65 7.94,19.59 8.05,19.55C8.47,19.41 8.55,19.39 9.01,19.12C9.07,19.09 9.14,19.1 9.19,19.13L11.67,20.61C11.73,20.64 11.82,20.64 11.88,20.61L19.98,15.96C20.04,15.92 20.08,15.85 20.08,15.78V6.5C20.08,6.43 20.04,6.36 19.98,6.32L11.89,1.68C11.83,1.64 11.74,1.64 11.67,1.68L3.59,6.32C3.53,6.36 3.5,6.42 3.5,6.5V15.78C3.5,15.85 3.53,15.92 3.59,15.96L6.09,17.38C7.38,18.04 8.13,17.31 8.13,16.56V7.38C8.13,7.27 8.22,7.18 8.33,7.18H9.57C9.68,7.18 9.77,7.27 9.77,7.38V16.57C9.77,18.28 8.85,19.32 7.24,19.32C6.73,19.32 6.33,19.32 5.23,18.78L2.85,17.42C2.37,17.14 2.09,16.61 2.09,16.05V6.77C2.09,6.21 2.37,5.69 2.85,5.41L10.95,0.75C11.42,0.48 12.05,0.48 12.51,0.75L20.61,5.41C21.09,5.69 21.37,6.21 21.37,6.77V16.05C21.37,16.61 21.09,17.14 20.61,17.42L12.51,22.07C12.28,22.19 12,22.19 11.74,22.07L12,21.85Z",
      color: "#339933",
    },
    {
      name: "TypeScript",
      category: "Language",
      description: "Strongly typed programming language built on JavaScript",
      iconPath:
        "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M13.32,12.11C13.16,12 12.97,11.96 12.76,11.96C12.41,11.96 12.14,12.15 11.96,12.53L11.53,13.91H11.47L11.04,12.53C10.86,12.15 10.59,11.96 10.24,11.96C10.03,11.96 9.84,12 9.68,12.11C9.52,12.19 9.44,12.34 9.44,12.5C9.44,12.63 9.5,12.78 9.59,12.93L10.59,14.61C10.68,14.75 10.75,14.89 10.8,15.03C10.86,15.17 10.88,15.31 10.88,15.47V16.64C10.88,16.83 10.96,16.96 11.11,17.04C11.25,17.12 11.46,17.16 11.73,17.16C12,17.16 12.21,17.12 12.35,17.04C12.5,16.96 12.57,16.83 12.57,16.64V15.47C12.57,15.31 12.6,15.17 12.65,15.03C12.71,14.89 12.77,14.75 12.88,14.61L13.88,12.93C13.96,12.78 14,12.63 14,12.5C14,12.34 13.93,12.19 13.76,12.11H13.32M15.58,12.05C14.8,12.05 14.17,12.23 13.7,12.58C13.23,12.92 13,13.38 13,13.94C13,14.37 13.17,14.7 13.5,14.93C13.83,15.16 14.4,15.36 15.21,15.51C15.62,15.6 15.91,15.68 16.07,15.75C16.24,15.82 16.33,15.93 16.33,16.09C16.33,16.25 16.24,16.38 16.05,16.46C15.87,16.55 15.61,16.59 15.27,16.59C14.91,16.59 14.64,16.53 14.47,16.4C14.31,16.28 14.21,16.1 14.18,15.87C14.18,15.75 14.1,15.67 13.93,15.63L13.48,15.5C13.32,15.5 13.23,15.58 13.23,15.73C13.24,16.17 13.45,16.53 13.87,16.8C14.28,17.07 14.85,17.2 15.56,17.2C16.37,17.2 17,17.03 17.44,16.68C17.87,16.34 18.09,15.91 18.09,15.4C18.09,14.96 17.93,14.61 17.6,14.37C17.27,14.13 16.73,13.94 16,13.8C15.5,13.67 15.17,13.57 15,13.5C14.83,13.43 14.74,13.32 14.74,13.18C14.74,13.04 14.82,12.93 14.97,12.86C15.12,12.79 15.34,12.75 15.61,12.75C15.87,12.75 16.07,12.79 16.21,12.89C16.34,12.97 16.43,13.11 16.43,13.25C16.43,13.37 16.51,13.44 16.68,13.47L17.13,13.53C17.29,13.53 17.38,13.45 17.38,13.29C17.38,12.89 17.19,12.57 16.78,12.32C16.37,12.15 16,12.05 15.58,12.05V12.05Z",
      color: "#3178C6",
    },
    {
      name: "Python",
      category: "Language",
      description:
        "Versatile language ideal for data science and backend development",
      iconPath:
        "M12,0C5.37,0 5.37,2.38 5.37,2.38L5.38,4.84H12.13V5.64H3.32C3.32,5.64 0,5.71 0,12.34C0,19 3.32,18.86 3.32,18.86H5.25V16.35C5.25,16.35 5.1,13.03 8.4,13.03H15.03C15.03,13.03 18.07,13.14 18.07,10.14V3.08C18.07,3.08 18.47,0 12,0M7.83,1.59C8.5,1.59 9.05,2.14 9.05,2.81C9.05,3.47 8.5,4.03 7.83,4.03C7.16,4.03 6.61,3.47 6.61,2.81C6.61,2.14 7.16,1.59 7.83,1.59M12,24C18.63,24 18.63,21.62 18.63,21.62L18.62,19.16H11.87V18.36H20.68C20.68,18.36 24,18.29 24,11.66C24,5 20.68,5.14 20.68,5.14H18.75V7.65C18.75,7.65 18.9,10.97 15.6,10.97H8.97C8.97,10.97 5.93,10.86 5.93,13.86V20.92C5.93,20.92 5.53,24 12,24M16.17,22.41C15.5,22.41 14.95,21.86 14.95,21.19C14.95,20.53 15.5,19.97 16.17,19.97C16.84,19.97 17.39,20.53 17.39,21.19C17.39,21.86 16.84,22.41 16.17,22.41Z",
      color: "#3776AB",
    },
    {
      name: "Angular",
      category: "Frontend",
      description: "Platform for building mobile and desktop web applications",
      iconPath:
        "M12,2.5L20.84,5.65L19.5,17.35L12,21.5L4.5,17.35L3.16,5.65L12,2.5M12,4.6L6.47,17H8.53L9.64,14.22H14.34L15.45,17H17.5L12,4.6M13.62,12.5H10.38L12,8.63L13.62,12.5Z",
      color: "#DD0031",
    },
    {
      name: "C#",
      category: "Language",
      description: "Modern object-oriented language for .NET development",
      iconPath:
        "M11.5,15.97L11.91,18.41C11.65,18.55 11.23,18.68 10.67,18.8C10.1,18.93 9.43,19 8.66,19C6.45,18.96 4.79,18.3 3.68,17.04C2.56,15.77 2,14.16 2,12.21C2.05,9.9 2.72,8.13 4,6.89C5.32,5.64 6.96,5 8.94,5C9.69,5 10.34,5.07 10.88,5.19C11.42,5.31 11.82,5.44 12.08,5.59L11.5,8.08L10.44,7.74C9.95,7.64 9.42,7.59 8.88,7.59C7.77,7.59 6.89,7.95 6.25,8.68C5.6,9.4 5.27,10.4 5.25,11.7C5.25,13.04 5.59,14.04 6.26,14.71C6.94,15.38 7.88,15.72 9.07,15.72C9.58,15.72 10.01,15.67 10.36,15.6L11.5,15.97M20,4C20,2.9 19.1,2 18,2H15C13.9,2 13,2.9 13,4V11H15V4H18V11H20V4M20,13H13V22H15V13H18V22H20V13Z",
      color: "#6B21A8",
    },
    {
      name: ".NET",
      category: "Framework",
      description: "Free, cross-platform framework for building modern apps",
      iconPath:
        "M2,15.54L2,15.54L5,14L5,9L9.67,7.89L16.13,16.64L12.96,17.76L12.96,17.76L12.96,17.76L2,15.54M3.05,13.71L5,14.25V9.74L3.05,13.71M14.61,16.94C14.61,16.94 14.61,16.94 14.61,16.94M19.07,15.88C19.07,15.88 19.07,15.88 19.07,15.88M6.53,14.81L12.96,16.54L9.8,12.17L6.53,14.81M13.09,6.45L7.07,8.08L4.05,12.28L13.27,14.15L17.02,9.26L13.09,6.45M19.71,9.78L17.45,6.77L13.09,3.5L5.05,6.67L5,14L15.11,16.63L19.71,9.78Z",
      color: "#512BD4",
    },
    {
      name: "JavaScript",
      category: "Language",
      description: "Scripting language that enables interactive web pages",
      iconPath:
        "M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z",
      color: "#F7DF1E",
    },
  ];

  // Intersection Observer for animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = containerRef.current; // Store reference to avoid the cleanup warning

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto-rotate through technologies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % technologies.length);
      // Also update rotation angle for smooth animation
      setRotation((prevRotation) => prevRotation + 10);
    }, 3000);

    return () => clearInterval(interval);
  }, [technologies.length]);

  return (
    <div
      ref={containerRef}
      className={`w-full py-16 lg:py-24 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 inline-block
            ${isVisible ? "animate-fade-in-down" : "opacity-0"}`}
          >
            Featured Technology
          </h2>
          <div
            className={`h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-red-500
              ${isVisible ? "animate-expand-width" : "w-0"}`}
          />
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }
              ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}
          >
            Optimized solutions built with industry-leading technologies
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          {/* Left column - Central logo and orbiters */}
          <div
            className={`relative w-full lg:w-1/2 h-80 lg:h-auto flex items-center justify-center
            ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}
          >
            {/* Center logo */}
            <div
              className={`relative z-10 ${
                isVisible ? "animate-pulse-slow" : ""
              }`}
            >
              <div
                className={`flex items-center justify-center p-6 rounded-full 
                ${isDark ? "bg-gray-800" : "bg-white"} shadow-xl border ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="text-orange-500 mr-3">
                  <svg
                    viewBox="0 0 60 60"
                    className="w-12 h-12 md:w-16 md:h-16"
                  >
                    <path
                      fill="currentColor"
                      d="M30,10 C35,15 40,20 35,30 C30,40 20,45 15,40 C10,35 15,25 20,30 C25,35 30,50 40,40 C50,30 45,20 30,10z"
                    />
                  </svg>
                </div>
                <div className="text-orange-500 font-bold text-2xl md:text-3xl">
                  CodeBlaze
                </div>
              </div>
            </div>

            {/* Orbiting tech icons */}
            {technologies.map((tech, index) => {
              // Calculate position based on index and total count
              const angle = index * (360 / technologies.length) + rotation;
              const radian = (angle * Math.PI) / 180;
              const distance = 140; // Distance from center

              // x and y coordinates for positioning
              const x = Math.cos(radian) * distance;
              const y = Math.sin(radian) * distance;

              return (
                <div
                  key={tech.name}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500
                    ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transitionDelay: `${index * 100}ms`,
                    zIndex: index === activeIndex ? 20 : 5,
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-lg shadow-lg cursor-pointer
                      transition-transform duration-300 hover:scale-110 hover:shadow-xl
                      ${
                        index === activeIndex
                          ? "scale-125 ring-2 ring-offset-2"
                          : ""
                      }
                      ${isDark ? "bg-gray-800" : "bg-white"}`}
                    style={{
                      color: tech.color,
                      boxShadow:
                        index === activeIndex ? `0 0 20px ${tech.color}40` : "",
                      ringColor: tech.color,
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                      <path fill="currentColor" d={tech.iconPath} />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column - Tech details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div
              className={`rounded-lg ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg p-8
                border ${isDark ? "border-gray-700" : "border-gray-100"}
                ${isVisible ? "animate-fade-in-right" : "opacity-0"}`}
            >
              {/* Active technology information */}
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: technologies[activeIndex].color }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path
                      fill="currentColor"
                      d={technologies[activeIndex].iconPath}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {technologies[activeIndex].name}
                  </h3>
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {technologies[activeIndex].category}
                  </span>
                </div>
              </div>

              <p
                className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                {technologies[activeIndex].description}
              </p>

              {/* Category breakdown */}
              <div className="mt-6">
                <h4 className="font-bold mb-4">Technology Categories</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from(new Set(technologies.map((t) => t.category))).map(
                    (category) => (
                      <div
                        key={category}
                        className={`px-3 py-2 rounded-md text-center text-sm font-medium
                        ${
                          isDark
                            ? "bg-gray-700 text-gray-200"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {category}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Tech selection indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {technologies.map((tech, index) => (
                <button
                  key={`indicator-${tech.name}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300
                    ${
                      index === activeIndex
                        ? "w-6 bg-orange-500"
                        : isDark
                        ? "bg-gray-600"
                        : "bg-gray-300"
                    }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Select ${tech.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expand-width {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        @keyframes pulse-slow {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        .animate-expand-width {
          animation: expand-width 1.2s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};

export default FeaturedTechnology;
