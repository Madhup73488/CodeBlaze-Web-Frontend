// components/Services.js
import {
  Laptop,
  Smartphone,
  ShoppingCart,
  Settings,
  Cloud,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";

function Services({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isVisible, setIsVisible] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Handle responsive layout detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
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

  // Intersection Observer for animation on scroll
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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".service-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Service card data
  const services = [
    {
      icon: <Laptop size={20} color="#fff" />,
      title: "Software Development",
      description:
        "Bespoke software solutions tailored to your business needs.",
      iconBg: "#7c3aed",
    },
    {
      icon: <Smartphone size={20} color="#fff" />,
      title: "Mobile App Dev",
      description: "Enterprise-grade applications for optimal mobile utility.",
      iconBg: "#be185d",
    },
    {
      icon: <ShoppingCart size={20} color="#fff" />,
      title: "E-commerce Solutions",
      description: "Driving online retail with intuitive, secure platforms.",
      iconBg: "#4f46e5",
    },
    {
      icon: <Settings size={20} color="#fff" />,
      title: "Tech Consulting",
      description: "Guiding your digital journey with methodical strategies.",
      iconBg: "#ea580c",
    },
    {
      icon: <Cloud size={20} color="#fff" />,
      title: "Cloud Solutions",
      description: "Elevating operations to the cloud for better scalability.",
      iconBg: "#10b981",
    },
    {
      icon: <BarChart3 size={20} color="#fff" />,
      title: "Data Analytics",
      description: "Unearthing insights to drive business decisions.",
      iconBg: "#e11d48",
    },
  ];

  // Get grid column value based on screen size
  const getGridColumns = () => {
    if (isMobile) return "repeat(2, 1fr)";
    if (isTablet) return "repeat(2, 1fr)";
    return "repeat(3, 1fr)";
  };

  // Get appropriate card padding based on screen size
  const getCardPadding = () => {
    if (isMobile) return "1rem";
    return "1.5rem";
  };

  // Get title font size based on screen size
  const getTitleFontSize = () => {
    if (isMobile) return "1.5rem";
    if (isTablet) return "2rem";
    return "2.5rem";
  };

  return (
    <div
      style={{
        backgroundColor: "transparent", // Ensure it doesn't have its own conflicting background
        // Text color should be inherited from .landing-page
        padding: isMobile ? "2rem 5%" : "4rem 5%",
        overflow: "hidden", // Prevent horizontal scroll
      }}
    >
      <div
        style={{
          fontSize: isMobile ? "1.25rem" : "1.5rem",
          marginBottom: isMobile ? "1rem" : "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        Our Services
        <div
          style={{
            height: "1px",
            backgroundColor:
              theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            flexGrow: 1,
            maxWidth: "300px",
          }}
        ></div>
      </div>

      <h2
        style={{
          fontSize: getTitleFontSize(),
          fontWeight: "bold",
          marginBottom: isMobile ? "1.5rem" : "3rem",
          maxWidth: "100%",
          lineHeight: "1.3",
          transition: "transform 0.5s ease, opacity 0.5s ease",
          transform: "translateY(0)",
          opacity: 1,
        }}
      >
        <span
          style={{
            color: primaryColor,
            position: "relative",
            display: "inline-block",
          }}
        >
          CodeBlaze
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "0",
              width: "100%",
              height: "3px",
              backgroundColor: primaryColor,
              borderRadius: "2px",
            }}
          ></div>
        </span>{" "}
        offers a comprehensive range of custom services designed to guide
        businesses through their digital transformation journey.
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: getGridColumns(),
          gap: isMobile ? "1rem" : "2rem",
          marginTop: isMobile ? "1.5rem" : "3rem",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-index={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              padding: getCardPadding(),
              borderRadius: "0.75rem",
              backgroundColor:
                theme === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.02)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: `1px solid ${
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
              }`,
              transition:
                "all 0.3s ease-in-out, transform 0.5s ease, opacity 0.5s ease",
              transform: isVisible[index]
                ? "translateY(0)"
                : "translateY(40px)",
              opacity: isVisible[index] ? 1 : 0,
              transitionDelay: `${index * 0.1}s`,
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
            {/* Color accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                backgroundColor: service.iconBg,
              }}
            ></div>

            <div
              style={{
                width: isMobile ? "2.5rem" : "3rem",
                height: isMobile ? "2.5rem" : "3rem",
                borderRadius: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "0.5rem",
                backgroundColor: service.iconBg,
                transition: "transform 0.3s ease",
              }}
            >
              {service.icon}
            </div>
            <h3
              style={{
                fontSize: isMobile ? "1rem" : "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.25rem",
              }}
            >
              {service.title}
            </h3>
            <p
              style={{
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                opacity: "0.8",
                lineHeight: "1.5",
              }}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
