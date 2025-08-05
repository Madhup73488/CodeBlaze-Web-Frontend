import React from "react";
import { motion } from "framer-motion";
import { Search, Star, Sparkles } from "lucide-react";
import "./Hero.css";
import HeroGirlImage from "../../assets/images/Hero-girl-landing.png";
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
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${HeroBackgroundGradient})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Black Opacity Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 opacity-20">
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
                opacity="0.6"
              />
            ))}
          </svg>
        </div>

        <div className="absolute top-32 right-32 w-16 h-16 bg-yellow-400 rounded-lg opacity-30 rotate-45"></div>
        <div className="absolute bottom-40 left-40 w-12 h-12 bg-yellow-300 rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10 h-full">
        <div className="container mx-auto px-6 pt-6 h-full">
          <main className="relative pt-8 h-full">
            <div className="flex flex-col items-center justify-between text-center h-full">
              {/* Top Content: Badge, Heading, Description, Search */}
              <div className="w-full max-w-4xl relative">
                {/* Decorative SVG Swoosh */}
                <svg
                  className="absolute -top-12 -left-12 w-28 h-28 stroke-white/50 z-0"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M10 50 C 20 20, 40 10, 60 20 S 80 50, 90 80"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 60 C 25 30, 45 20, 65 30 S 85 60, 95 90"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Badge */}
                <motion.div
                  variants={textVariants}
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
                      src={HeroGirlImage}
                      alt="Hero girl landing"
                      className="w-full h-full object-cover object-center relative z-10 rounded-lg"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Rating Card */}
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

                  {/* Learners Card */}
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

                  {/* Decorative Sparkles */}
                  <div className="absolute top-1/4 -right-32 sm:-right-48 lg:-right-64 text-2xl sm:text-3xl lg:text-4xl text-yellow-300 animate-pulse">
                    &#10022;
                  </div>
                  <div className="absolute bottom-1/4 -left-32 sm:-left-48 lg:-left-64 text-xl sm:text-2xl lg:text-3xl text-yellow-300 animate-pulse">
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
