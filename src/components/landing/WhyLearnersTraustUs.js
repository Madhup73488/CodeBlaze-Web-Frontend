import React from "react";
import { motion } from "framer-motion";
import "./WhyLearnersTraustUs.css";
import WhyThousandImage1 from "../../assets/images/whythosand/Why-thousand-image1.png";
import WhyThousandImage2 from "../../assets/images/whythosand/Why-thousand-image2.png";
import WhyThousandImage3 from "../../assets/images/whythosand/Why-thousand-image3.png";

// Icon component for features
const FeatureIcon = ({ children }) => (
  <div className="flex-shrink-0 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
    {children}
  </div>
);

// SVG Icons
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const CogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.263.263m11.03-11.03l-.264-.263M11 21v-4M13 21v-4M4 11a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
    />
  </svg>
);

export default function WhyLearnersTraustUs() {
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
    <section id="why-learners-trust-us" className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Why Thousands of Learners <span className="text-blue-500">Trust Us</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join a growing community of learners gaining real skills through
            expert-led, high-quality courses — built with care, trust, and
            transparency.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <img
                src={WhyThousandImage1}
                alt="Expert Trainers"
                className="w-full h-auto object-cover transform scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/4a5568?text=Image";
                }}
              />
            </div>
            <div className="bg-blue-100 p-8 rounded-2xl shadow-lg">
              <FeatureIcon>
                <UsersIcon />
              </FeatureIcon>
              <h3 className="text-xl font-bold text-gray-800 mt-6">
                Expert Trainers
              </h3>
              <p className="text-gray-600 mt-2">
                Learn from real industry professionals with years of experience
                and practical knowledge.
              </p>
            </div>
          </motion.div>

          {/* Center Column - Global Community */}
          <motion.div
            variants={itemVariants}
            className="bg-blue-100 p-8 rounded-2xl shadow-lg h-full flex flex-col justify-center"
          >
            <img
              src={WhyThousandImage3}
              alt="Global Community"
              className="w-full h-auto object-contain mb-8"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/e2e8f0/4a5568?text=Image";
              }}
            />
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FeatureIcon>
                  <GlobeIcon />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Global Community
              </h3>
              <p className="text-gray-600 mt-2">
                Connect, share, and grow with thousands of learners from around
                the world—exchange ideas, collaborate on goals, and be part of a
                supportive learning journey.
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-blue-100 p-8 rounded-2xl shadow-lg">
              <FeatureIcon>
                <CogIcon />
              </FeatureIcon>
              <h3 className="text-xl font-bold text-gray-800 mt-6">
                Flexible Learning Experience
              </h3>
              <p className="text-gray-600 mt-2">
                Learn anytime, anywhere — at your own pace, on your own terms,
                with complete control over how.
              </p>
            </div>
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <img
                src={WhyThousandImage2}
                alt="Flexible Learning Experience"
                className="w-full h-auto object-cover transform scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/e2e8f0/4a5568?text=Image";
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
