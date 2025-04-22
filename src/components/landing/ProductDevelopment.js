// components/ProductDevelopment.js
import {
  Search,
  FileCheck,
  Code,
  CircleDot,
  Rocket,
  Headphones,
} from "lucide-react";
import { useState, useEffect } from "react";

function ProductDevelopment({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  // Handle responsive layout detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkScreenSize();

    // Set up listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".cycle-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const cycleParts = [
    {
      icon: <Search size={20} color="#fff" />,
      number: "1",
      title: "Ideation & Discovery",
      description:
        "Exploring innovative ideas, understanding client objectives, and uncovering the most impactful paths to solution discovery.",
      left: true,
      iconBg: primaryColor,
    },
    {
      icon: <FileCheck size={20} color="#fff" />,
      number: "2",
      title: "Validation",
      description:
        "Ensuring the project's feasibility, relevance, and market fit through thorough research and client collaboration.",
      left: false,
      iconBg: primaryColor,
    },
    {
      icon: <Code size={20} color="#fff" />,
      number: "3",
      title: "Initial Development & MVP",
      description:
        "Crafting a Minimal Viable Product to encapsulate core features, laying the foundation for full-scale development.",
      left: true,
      iconBg: primaryColor,
    },
    {
      icon: <CircleDot size={20} color="#fff" />,
      number: "4",
      title: "Feedback, Testing, Iterations",
      description:
        "Refining the product based on user insights, rigorous testing, and iterative enhancements for optimal performance.",
      left: false,
      iconBg: primaryColor,
    },
    {
      icon: <Rocket size={20} color="#fff" />,
      number: "5",
      title: "Launch",
      description:
        "Introducing the polished product to the market, backed by a comprehensive deployment strategy.",
      left: true,
      iconBg: primaryColor,
    },
    {
      icon: <Headphones size={20} color="#fff" />,
      number: "6",
      title: "Support",
      description:
        "Providing continuous post-launch assistance, ensuring product sustainability and adapting to evolving requirements.",
      left: false,
      iconBg: primaryColor,
    },
  ];

  return (
    <div
      style={{
        padding: isMobile ? "3rem 5%" : "4rem 5%",
        backgroundColor: theme === "dark" ? "#050505" : "#f7f7f7",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
          backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      ></div>

      <div
        style={{
          color: primaryColor,
          fontSize: isMobile ? "1.25rem" : "1.5rem",
          fontWeight: "bold",
          marginBottom: isMobile ? "2rem" : "3rem",
          textAlign: "center",
          position: "relative",
          display: "inline-block",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Our Product Development Cycle
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "25%",
            width: "50%",
            height: "3px",
            backgroundColor: primaryColor,
            borderRadius: "2px",
          }}
        ></div>
      </div>

      {/* Timeline line for desktop */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            height: "70%",
            width: "4px",
            backgroundColor: theme === "dark" ? "#1f2937" : "#d1d5db",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        ></div>
      )}

      {/* Mobile vertical timeline */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "28px",
            height: "80%",
            width: "3px",
            backgroundColor: theme === "dark" ? "#1f2937" : "#d1d5db",
            zIndex: 1,
          }}
        ></div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "1.5rem" : "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {cycleParts.map((part, index) => (
          <div
            key={index}
            className="cycle-card"
            data-index={index}
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              marginLeft: isMobile ? "0" : part.left ? "0" : "auto",
              marginRight: isMobile ? "0" : part.left ? "auto" : "0",
              width: isMobile ? "100%" : "45%",
              backgroundColor:
                theme === "dark"
                  ? "rgba(17, 24, 39, 0.7)"
                  : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              border: `1px solid ${
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.03)"
              }`,
              transition: "all 0.5s ease",
              transform: isVisible[index]
                ? "translateY(0)"
                : part.left
                ? "translateX(-40px)"
                : isMobile
                ? "translateX(-40px)"
                : "translateX(40px)",
              opacity: isVisible[index] ? 1 : 0,
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            {/* Icon container */}
            <div
              style={{
                padding: isMobile ? "1rem" : "1.5rem",
                minWidth: isMobile ? "70px" : "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  theme === "dark"
                    ? "rgba(0, 0, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.03)",
                borderRight: isMobile
                  ? theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.05)"
                    : "1px solid rgba(0, 0, 0, 0.07)"
                  : "none",
                borderBottom: !isMobile
                  ? theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.05)"
                    : "1px solid rgba(0, 0, 0, 0.07)"
                  : "none",
              }}
            >
              <div
                style={{
                  width: isMobile ? "2.5rem" : "3rem",
                  height: isMobile ? "2.5rem" : "3rem",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: part.iconBg,
                  marginBottom: isMobile ? "0.5rem" : "1rem",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                }}
              >
                {/* Pulse animation effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    borderRadius: "50%",
                    border: `2px solid ${part.iconBg}`,
                    animation: "pulse 2s infinite",
                  }}
                ></div>
                {part.icon}
              </div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: part.iconBg,
                }}
              >
                {part.number}
              </div>
            </div>

            {/* Content container */}
            <div
              style={{
                padding: isMobile ? "1rem" : "1.5rem",
                flexGrow: 1,
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1.1rem" : "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.75rem",
                  color: theme === "dark" ? "#fff" : "#111",
                }}
              >
                {part.title}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  opacity: "0.85",
                  lineHeight: "1.6",
                  color: theme === "dark" ? "#e5e7eb" : "#4b5563",
                }}
              >
                {part.description}
              </p>
            </div>

            {/* Timeline dot for desktop */}
            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  [part.left ? "right" : "left"]: "-8px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: primaryColor,
                  transform: "translateY(-50%)",
                  boxShadow: `0 0 0 4px ${
                    theme === "dark" ? "#050505" : "#f7f7f7"
                  }`,
                  zIndex: 3,
                }}
              ></div>
            )}

            {/* Timeline dot for mobile */}
            {isMobile && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "28px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: primaryColor,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 0 3px ${
                    theme === "dark" ? "#050505" : "#f7f7f7"
                  }`,
                  zIndex: 3,
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDevelopment;
