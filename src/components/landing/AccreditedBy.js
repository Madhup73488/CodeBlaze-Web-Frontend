import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import msmeLogo from "../../assets/images/Accreditedby/msme.png";
import mcaLogo from "../../assets/images/Accreditedby/mca.png";
import startupIndiaLogo from "../../assets/images/Accreditedby/startupindia.png";
import aicteLogo from "../../assets/images/Accreditedby/aicte-approved.png";
import edtechSocietyLogo from "../../assets/images/Accreditedby/edtechsociety.png";
import "./AccreditedBy.css";

export default function AccreditedBy() {
  const logos = [
    {
      name: "MSME",
      logo: msmeLogo,
      isLarge: true,
    },
    {
      name: "MCA",
      logo: mcaLogo,
      isLarge: false,
    },
    {
      name: "Startup India",
      logo: startupIndiaLogo,
      isLarge: true,
    },
    {
      name: "AICTE",
      logo: aicteLogo,
      isLarge: false,
    },
    {
      name: "Edtech Society",
      logo: edtechSocietyLogo,
      isLarge: false,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % logos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + logos.length) % logos.length);
  };

  return (
    <section className="pt-12">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl font-bold text-left sm:text-center text-gray-900 mb-8">
          <span className="text-red-500">Accredited</span> by
        </h2>

        <div className="flex overflow-x-auto gap-2 pb-4 lg:flex-wrap items-center justify-start lg:justify-center lg:space-x-0 lg:gap-16 px-4 no-scrollbar scroll-px-4 scrolling-container">
          {logos.map((accreditation, index) => (
            <div
              key={index}
              className="flex-shrink-0 lg:flex-shrink-1 accredited-by-card bg-gray-50"
            >
              <img
                src={accreditation.logo}
                alt={`${accreditation.name} logo`}
                className={`accredited-by-logo ${
                  accreditation.isLarge ? "large" : ""
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
