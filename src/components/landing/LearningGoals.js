import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, BookOpen, Zap, FolderKanban } from "lucide-react";
import "./LearningGoals.css";
import ProgressSection from "../../assets/images/connectImages/ProgressSection.png";
import FocusedMode from "../../assets/images/connectImages/FocusedMode.mov";
import QualityContent from "../../assets/images/connectImages/QualityContent.png";
import ContentBreakup from "../../assets/images/connectImages/ContentBreakup.png";

const learningData = {
  "Track your progress": {
    description:
      "Monitor your learning journey with our intuitive progress tracking.",
    image: ProgressSection,
    icon: <BarChart size={48} className="text-blue-500" />,
  },
  "Distraction-free learning": {
    description:
      "A full-screen, do-not-disturb mode for a focused learning experience.",
    video: FocusedMode,
    icon: <BookOpen size={48} className="text-purple-500" />,
  },
  "Quality content & resources": {
    description:
      "Access high-quality content and curated resources to supplement your learning.",
    image: QualityContent,
    icon: <Zap size={48} className="text-green-500" />,
  },
  "Detailed breakdowns": {
    description:
      "Courses, modules, and lessons are broken down for easy understanding.",
    image: ContentBreakup,
    icon: <FolderKanban size={48} className="text-orange-500" />,
  },
};

const LearningGoals = () => {
  const [activeTab, setActiveTab] = useState("Track your progress");
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="learning-goals-container">
      <div className="text-left sm:text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Learning become <span className="text-red-500">focussed</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Codeblaze connect helps you focus on learning
        </p>
      </div>
      <div className="container">
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
    </div>
  );
};

export default LearningGoals;
