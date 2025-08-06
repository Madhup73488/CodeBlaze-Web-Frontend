import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, BookOpen, Zap, FolderKanban } from "lucide-react";
import "./LearningGoals.css";

const LearningGoals = () => {
  const [activeTab, setActiveTab] = useState("Track your progress");
  const [isMobile, setIsMobile] = useState(false);

  const learningData = {
    "Track your progress": {
      description:
        "Monitor your learning journey with our intuitive progress tracking.",
      image:
        "https://res.cloudinary.com/duiotumuy/image/upload/v1753720905/ProgressSection_11zon_sio7lr.webp",
      icon: <BarChart size={isMobile ? 16 : 24} className="text-blue-500" />,
    },
    "Distraction-free learning": {
      description:
        "A full-screen, do-not-disturb mode for a focused learning experience.",
      video:
        "https://res.cloudinary.com/duiotumuy/video/upload/v1753720993/FocusedMode_yyfte1.mov",
      icon: <BookOpen size={isMobile ? 16 : 24} className="text-purple-500" />,
    },
    "Quality content & resources": {
      description:
        "Access high-quality content and curated resources to supplement your learning.",
      image:
        "https://res.cloudinary.com/duiotumuy/image/upload/v1753720905/QualityContent_11zon_jdrdxh.webp",
      icon: <Zap size={isMobile ? 16 : 24} className="text-green-500" />,
    },
    "Detailed breakdowns": {
      description:
        "Courses, modules, and lessons are broken down for easy understanding.",
      image:
        "https://res.cloudinary.com/duiotumuy/image/upload/v1753720906/ContentBreakup_11zon_nfjvjr.webp",
      icon: (
        <FolderKanban size={isMobile ? 16 : 24} className="text-orange-500" />
      ),
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    Object.values(learningData).forEach((data) => {
      if (data.image) {
        const img = new Image();
        img.src = data.image;
      }
      if (data.video) {
        const video = document.createElement("video");
        video.src = data.video;
      }
    });
  }, []);

  return (
    <section id="learning-focused" className="learning-goals-container bg-gradient-to-br from-blue-50 via-white to-purple-50 relative py-16 sm:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full mb-4"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Enhanced Learning Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Learning becomes <span className="text-blue-500">focused</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Syntellite Labs helps you focus on learning with our innovative
            approach and cutting-edge tools
          </motion.p>
        </div>

        <div className="learning-goals-content">
          {isMobile && (
            <div className="learning-goals-panels">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="panel active"
              >
                {learningData[activeTab].video ? (
                  <video
                    src={learningData[activeTab].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    alt={`${activeTab} illustration`}
                    src={learningData[activeTab].image}
                    loading="lazy"
                  />
                )}
              </motion.div>
            </div>
          )}
          <div className="learning-goals-tabs">
            {Object.keys(learningData).map((tab) => (
              <motion.div
                key={tab}
                className={`tab-card ${activeTab === tab ? "selected" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                <div className="tab-icon">{learningData[tab].icon}</div>
                <div className="tab-content">
                  <p className="tab-title">{tab}</p>
                  <span className="tab-description">
                    <p>{learningData[tab].description}</p>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          {!isMobile && (
            <div className="learning-goals-panels">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="panel active"
              >
                {learningData[activeTab].video ? (
                  <video
                    src={learningData[activeTab].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    alt={`${activeTab} illustration`}
                    src={learningData[activeTab].image}
                    loading="lazy"
                  />
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LearningGoals;
