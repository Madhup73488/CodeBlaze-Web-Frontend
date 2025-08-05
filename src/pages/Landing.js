import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/landing/Hero";
import WhyChooseSyntellite from "../components/landing/WhyChooseSyntellite";
import AccreditedBy from "../components/landing/AccreditedBy";
import WhyLearnersTraustUs from "../components/landing/WhyLearnersTraustUs";
import SuccessfulLearners from "../components/landing/SuccessfulLearners";
import LearningGoals from "../components/landing/LearningGoals";
import Faq from "../components/landing/Faq";

const Landing = ({ theme, color, openCallbackModal }) => {
  return (
    <main className="landing-page min-h-screen">
      <Helmet>
        <title>Syntellite Labs - Engineer Your Future</title>
        <meta
          name="description"
          content="Syntellite Labs offers cutting-edge research fellowships, career opportunities, and expert-led learning labs to help you engineer your future in technology."
        />
        <meta
          property="og:title"
          content="Syntellite Labs - Engineer Your Future"
        />
        <meta
          property="og:description"
          content="Syntellite Labs offers cutting-edge research fellowships, career opportunities, and expert-led learning labs to help you engineer your future in technology."
        />
        <meta
          property="og:image"
          content="https://www.syntellitelabs.com/logo512.png"
        />
        <meta property="og:url" content="https://www.syntellitelabs.com" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero theme={theme} color={color} openCallbackModal={openCallbackModal} />
      <AccreditedBy />
      <WhyLearnersTraustUs />
      <SuccessfulLearners />
      <LearningGoals />
      <WhyChooseSyntellite />
      <Faq />
    </main>
  );
};

export default Landing;
