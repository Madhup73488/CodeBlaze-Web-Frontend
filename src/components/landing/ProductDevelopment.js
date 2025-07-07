import {
  Search,
  FileCheck,
  Code,
  CircleDot,
  Rocket,
  Headphones,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// Main Component for the Product Development Cycle Timeline
function ProductDevelopment({ theme = "dark", color = "purple" }) {
  // State to track if the view is mobile
  const [isMobile, setIsMobile] = useState(false);
  // Ref to store all the card elements for the observer
  const cardRefs = useRef([]);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- Color and Theme Management ---
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const bgColor = theme === "dark" ? "#111827" : "#f9fafb";
  const cardBgColor = theme === "dark" ? "#1f2937" : "#ffffff";
  const cardBorderColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const textColor = theme === "dark" ? "#f9fafb" : "#111827";
  const mutedTextColor = theme === "dark" ? "#9ca3af" : "#6b7280";

  // --- Data for the timeline sections with unique colors ---
  const cycleParts = [
    {
      icon: <Search size={28} />,
      title: "Ideation & Discovery",
      description: "Exploring innovative ideas, understanding client objectives, and uncovering the most impactful paths to solution discovery.",
      accentColor: "#3b82f6",
    },
    {
      icon: <FileCheck size={28} />,
      title: "Validation",
      description: "Ensuring the project's feasibility, relevance, and market fit through thorough research and client collaboration.",
      accentColor: "#10b981",
    },
    {
      icon: <Code size={28} />,
      title: "Development & MVP",
      description: "Crafting a Minimal Viable Product to encapsulate core features, laying the foundation for full-scale development.",
      accentColor: "#ef4444",
    },
    {
      icon: <CircleDot size={28} />,
      title: "Testing & Iterations",
      description: "Refining the product based on user insights, rigorous testing, and iterative enhancements for optimal performance.",
      accentColor: "#f97316",
    },
    {
      icon: <Rocket size={28} />,
      title: "Launch",
      description: "Introducing the polished product to the market, backed by a comprehensive deployment strategy.",
      accentColor: "#8b5cf6",
    },
    {
      icon: <Headphones size={28} />,
      title: "Support & Growth",
      description: "Providing continuous post-launch assistance, ensuring product sustainability and adapting to evolving requirements.",
      accentColor: "#06b6d4",
    },
  ];

  // --- Effects ---

  // Effect to handle responsive layout changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Changed breakpoint for a better tablet experience
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Effect to animate cards on scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: isMobile ? 0.2 : 0.4 }
    );

    const currentRefs = cardRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, cardRefs]);

  // Effect for auto-sliding in mobile view
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => {
          const nextSlide = (prevSlide + 1) % cycleParts.length;
          if (sliderRef.current) {
            const slideWidth = sliderRef.current.scrollWidth / cycleParts.length;
            sliderRef.current.scrollTo({
              left: nextSlide * slideWidth,
              behavior: 'smooth',
            });
          }
          return nextSlide;
        });
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isMobile, cycleParts.length]);

  return (
    <>
      {/* Global styles and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        
        .step-card, .mobile-slide {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .step-card.is-visible, .mobile-slide.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .step-card {
           transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .step-card:hover {
           transform: translateY(-10px) scale(1.02);
           box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
        }
        
        .mobile-slider-container {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 1rem;
            padding: 1rem 1.5rem;
            margin: 0 -1.5rem; /* Extend to screen edges */
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
        }
        
        /* Hide scrollbar */
        .mobile-slider-container::-webkit-scrollbar {
          display: none;
        }
        .mobile-slider-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .mobile-slide {
            flex: 0 0 85%;
            scroll-snap-align: center;
            scroll-snap-stop: always;
        }
        
        @media (min-width: 640px) {
            .mobile-slide {
                flex: 0 0 60%;
            }
        }
      `}</style>

      {/* Main container */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          backgroundColor: bgColor,
          padding: "6rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "3rem" : "5rem", position: 'relative', zIndex: 1, }}>
          <h2
            style={{
              fontSize: isMobile ? "2.25rem" : "3rem",
              fontWeight: "800",
              color: textColor,
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}
          >
            Our Development Process
          </h2>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.125rem",
              color: mutedTextColor,
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            From a spark of an idea to a fully supported product, we follow a structured path to ensure success and quality at every stage.
          </p>
        </div>

        {/* Conditional Rendering: Desktop Grid vs. Mobile Slider */}
        {isMobile ? (
          // --- Mobile Slider View ---
          <div className="mobile-slider-container" ref={sliderRef}>
            {cycleParts.map((part, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="mobile-slide"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div
                  style={{
                    backgroundColor: cardBgColor,
                    borderRadius: "1rem",
                    border: `1px solid ${cardBorderColor}`,
                    padding: "2rem 1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
                    borderTop: `4px solid ${part.accentColor}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div style={{ color: part.accentColor }}>{part.icon}</div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: textColor }}>
                      {part.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: mutedTextColor, lineHeight: 1.6 }}>
                    {part.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- Desktop Grid View ---
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {cycleParts.map((part, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="step-card"
                style={{
                  backgroundColor: cardBgColor,
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: `1px solid ${cardBorderColor}`,
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                  transitionDelay: `${index * 0.05}s`,
                  borderBottom: `4px solid ${part.accentColor}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ color: part.accentColor, background: `${part.accentColor}20`, padding: '0.75rem', borderRadius: '9999px' }}>
                    {part.icon}
                  </div>
                   <span style={{ fontSize: '3rem', fontWeight: '800', color: `${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                    0{index + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: textColor, marginBottom: "0.75rem" }}>
                  {part.title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: mutedTextColor, lineHeight: 1.6 }}>
                  {part.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDevelopment;
