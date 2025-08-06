import React from "react";
import { motion } from "framer-motion";
import { Search, Star, Sparkles } from "lucide-react";
import "./Hero.css";
import HeroPersonImage from "../../assets/images/Hero-person-image.png";
import HeroBackgroundGradient from "../../assets/images/hero-background-gradient.png";

const Hero = ({ theme, color, openCallbackModal }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${HeroBackgroundGradient})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black Opacity Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div>
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Sun-like icon with increased opacity */}
        <div className="hidden md:block absolute top-20 left-20 w-32 h-32 opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300">
            <circle cx="50" cy="50" r="3" fill="currentColor">
              <animate
                attributeName="r"
                values="3;8;3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 25 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 25 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.8"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="md:container md:mx-auto md:px-4 md:sm:px-6 pt-6 min-h-screen">
          <main className="relative md:pt-8 min-h-screen">
            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col h-screen">
              {/* Top Content */}
              <div className="flex-shrink-0 w-full pt-4">
                {/* Badge */}
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-4 text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 text-sm">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800 font-medium">
                      Learn From the Top Experts
                    </span>
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  variants={textVariants}
                  className="mb-4 text-center"
                >
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                    Learn Anywhere, Anytime
                    <br />
                    <span className="text-yellow-300">Empower Your Future</span>
                  </h1>
                  <p className="text-sm xs:text-base text-blue-100 max-w-xs xs:max-w-sm mx-auto leading-relaxed">
                    Join thousands of learners gaining new skills, advancing
                    careers and shaping a better tomorrow—one lesson at a time.
                  </p>
                </motion.div>

                {/* Search Bar - Mobile Only */}
                <motion.div
                  variants={textVariants}
                  className="mb-4 w-full max-w-xs xs:max-w-sm mx-auto"
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search your Course..."
                      className="w-full pl-10 pr-4 py-2.5 xs:py-3 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Main person image - Mobile - Larger with slight bottom crop */}
              <motion.div
                variants={textVariants}
                className="relative z-10 flex-1 flex items-end justify-center w-full overflow-hidden"
              >
                <div className="relative w-full h-full flex items-end justify-center">
                  <img
                    src={HeroPersonImage}
                    alt="Hero person"
                    className="w-auto object-cover object-center max-w-full"
                    loading="lazy"
                    style={{
                      height: "100%", // Use full container height
                      objectPosition: "center bottom", // Position to show full person, crop from bottom
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col items-center text-center h-screen">
              {/* Top Content: Badge, Heading, Description */}
              <div className="w-full max-w-4xl relative pt-8">
                {/* Badge */}
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 relative z-10"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-white backdrop-blur-sm rounded-full border border-gray-200 text-sm">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-black font-medium">
                      Learn From the Top Experts
                    </span>
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  variants={textVariants}
                  className="mb-6 relative z-10"
                >
                  <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                    Learn Anywhere, Anytime
                    <br />
                    <span className="text-yellow-300">Empower Your Future</span>
                  </h1>
                  <p className="text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
                    Join thousands of learners gaining new skills, advancing
                    careers and shaping a better tomorrow—one lesson at a time.
                  </p>
                </motion.div>
              </div>

              {/* Bottom Content: Image with Floating Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative flex justify-center"
              >
                <div className="relative">
                  {/* Main person image */}
                  <motion.div
                    variants={textVariants}
                    className="relative z-10 w-96 h-[450px] md:w-[450px] md:h-[500px] lg:w-[500px] lg:h-[550px] xl:w-[550px] xl:h-[600px]"
                  >
                    <img
                      src={HeroPersonImage}
                      alt="Hero person"
                      className="w-full h-full object-cover relative z-10 rounded-lg"
                      loading="lazy"
                      style={{
                        objectPosition: "center top", // Position to show full person including head
                      }}
                    />
                  </motion.div>

                  {/* Rating Card - Desktop Only */}
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute top-1/2 -left-32 sm:-left-48 lg:-left-64 z-20 w-40 sm:w-48 lg:w-56 bg-white backdrop-blur-md rounded-lg p-4 sm:p-5 lg:p-6 shadow-lg text-black text-center border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                      4.8
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < 4
                              ? "text-yellow-500 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm font-light text-center leading-tight">
                      By students worldwide for quality learning and support.
                    </p>
                  </motion.div>

                  {/* Learners Card - Desktop Only */}
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute top-1/3 -right-20 sm:-right-32 lg:-right-48 z-20 w-40 sm:w-48 lg:w-56 bg-white backdrop-blur-md rounded-lg p-4 sm:p-5 lg:p-6 shadow-lg text-black text-center border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-center -space-x-2 mb-2">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=faces",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=faces",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=faces",
                        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=faces",
                      ].map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Learner ${i + 1}`}
                          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 object-cover"
                        />
                      ))}
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                      60k+
                    </div>
                    <p className="text-xs sm:text-sm font-light max-w-[140px] sm:max-w-[160px] lg:max-w-[180px] leading-tight">
                      Learners growing with expert guidance from trusted
                      mentors.
                    </p>
                  </motion.div>

                  {/* Decorative Sparkles - Desktop Only */}
                  <div className="absolute top-1/4 -right-32 sm:-right-48 lg:-right-64 text-4xl sm:text-5xl lg:text-6xl text-yellow-300 animate-pulse">
                    &#10022;
                  </div>
                  <div className="absolute bottom-1/4 -left-32 sm:-left-48 lg:-left-64 text-3xl sm:text-4xl lg:text-5xl text-yellow-300 animate-pulse">
                    &#10022;
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
