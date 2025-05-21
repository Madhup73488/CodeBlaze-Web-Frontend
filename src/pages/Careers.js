// components/Careers/index.jsx - Main Careers component
import { useState } from "react";
import CareersHero from "../components/careers/CareersHero";
import CultureSection from "../components/careers/CultureSection";
import BenefitsSection from "../components/careers/BenefitsSection";
import JobListings from "../components/careers/JobListings";
import ApplicationProcess from "../components/careers/ApplicationProcess";
import TestimonialsSection from "../components/careers/TestimonialsSection";
import FAQSection from "../components/careers/FAQSection";

const Careers = ({ theme, color }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const colorStyles = {
    primary: color === "purple" ? "#8A2BE2" : "#FF7F00",
    secondary: color === "purple" ? "#6A0DAD" : "#E67300",
  };

  return (
    <div 
      className="careers-page"
      style={{
        backgroundColor: `var(--bg-primary)`,
        color: `var(--text-primary)`
      }}
    >
      <CareersHero theme={theme} colorStyles={colorStyles} />
      <CultureSection theme={theme} colorStyles={colorStyles} />
      <BenefitsSection theme={theme} colorStyles={colorStyles} />
      <JobListings
        theme={theme}
        colorStyles={colorStyles}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <ApplicationProcess theme={theme} colorStyles={colorStyles} />
      <TestimonialsSection theme={theme} colorStyles={colorStyles} />
      <FAQSection theme={theme} colorStyles={colorStyles} />
    </div>
  );
};

export default Careers;
