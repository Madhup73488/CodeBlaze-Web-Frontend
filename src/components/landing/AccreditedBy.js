import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import "./AccreditedBy.css";

export default function AccreditedBy() {
  const logos = [
    {
      name: "MSME",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720444/msme_wclpvp.webp",
      isLarge: true,
    },
    {
      name: "MCA",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720445/mca_lsfim6.webp",
      isLarge: false,
    },
    {
      name: "Startup India",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720444/startupindia_ik17fn.webp",
      isLarge: true,
    },
    {
      name: "AICTE",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720444/aicte_vuhbqq.webp",
      isLarge: false,
    },
    {
      name: "Edtech Society",
      logo: "https://res.cloudinary.com/duiotumuy/image/upload/v1753720445/edtechsociety_ebmnly.webp",
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
