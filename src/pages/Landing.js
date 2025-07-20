import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/landing/Hero";
import TrendingOnCodeblaze from "../components/landing/TrendingOnCodeblaze";
import AvailableInternships from "../components/landing/AvailableInternships";
import JobPortalIntro from "../components/landing/JobPortalIntro";
import WhyChooseCodeblaze from "../components/landing/WhyChooseCodeblaze";
import AccreditedBy from "../components/landing/AccreditedBy";
import LearningGoals from "../components/landing/LearningGoals";
import Testimonials from "../components/landing/Testimonials";
import Faq from "../components/landing/Faq";

const Landing = ({ theme, color, openCallbackModal }) => {
  return (
    <main
      className="landing-page"
      style={{
        backgroundColor: `var(--bg-primary)`,
        color: `var(--text-primary)`,
      }}
    >
      <Helmet>
        <title>CodeBlaze - Ignite Your Tech Career</title>
        <meta
          name="description"
          content="CodeBlaze offers cutting-edge internship programs, job placement services, and expert-led courses to help you launch your career in tech."
        />
        <meta
          property="og:title"
          content="CodeBlaze - Ignite Your Tech Career"
        />
        <meta
          property="og:description"
          content="CodeBlaze offers cutting-edge internship programs, job placement services, and expert-led courses to help you launch your career in tech."
        />
        <meta
          property="og:image"
          content="https://www.codeblaze.net/logo512.png"
        />
        <meta property="og:url" content="https://www.codeblaze.net" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero theme={theme} color={color} openCallbackModal={openCallbackModal} />
      <AccreditedBy />
      <AvailableInternships />
      <JobPortalIntro />
      <TrendingOnCodeblaze />
      <LearningGoals />
      <WhyChooseCodeblaze />
      <Testimonials />
      <Faq />
    </main>
  );
};

export default Landing;
