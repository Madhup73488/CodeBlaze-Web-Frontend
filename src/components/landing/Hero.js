import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Briefcase } from "lucide-react";
import "./Hero.css";

const features = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-orange-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
        ></path>
      </svg>
    ),
    title: "Expert Tutors",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
    ),
    title: "Flexible Schedule",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-green-500" />,
    title: "Career Support",
  },
];

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div
      className="hero-section-container"
      style={{ backgroundColor: "hsl(var(--website-background))" }}
    >
      <div className="container">
        <div className="decorative-circle-1"></div>
        <div className="decorative-circle-2"></div>

        <motion.div
          className="hero-content-wrapper"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-content">
            <motion.p className="social-proof" variants={textVariants}>
              Trusted by 9271+ Students
            </motion.p>
            <motion.h1 className="hero-main-title" variants={textVariants}>
              LEARN. <br />
              <span className="text-highlight">CREATE.</span> <br />
              SUCCEED.
            </motion.h1>
            <motion.p className="hero-subtitle-text" variants={textVariants}>
              Transform your career with industry-leading courses designed by
              experts. Start your journey to success today.
            </motion.p>

            <motion.div className="cta-buttons" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Button asChild className="explore-courses-btn">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button asChild variant="outline" className="learn-more-btn">
                  <Link to="/internships">Explore Internships</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="graphic-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <div className="image-placeholder">
              <img
                src="https://res.cloudinary.com/duiotumuy/image/upload/v1753721425/herosection_ovxe69.webp"
                alt="Group of students holding laptops"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            <motion.div className="feature-cards" variants={containerVariants}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  variants={itemVariants}
                >
                  {feature.icon}
                  <p className="feature-title">{feature.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Hero;
