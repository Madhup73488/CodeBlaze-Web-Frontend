import HeroImg from "../../assets/images/banner_systemnew.png";
import { useEffect, useState } from "react";

function Hero({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Set up listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        padding: isMobile ? "2rem 5%" : "4rem 5%",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        gap: isMobile ? "2rem" : "0",
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? "100%" : "600px",
          width: isMobile ? "100%" : "48%",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            lineHeight: "1.2",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Transforming Businesses with Innovative Digital Solutions - CodeBlaze
        </h1>
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.1rem",
            marginBottom: "2rem",
            opacity: "0.8",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          CodeBlaze create bespoke software solutions and deliver seamless
          digital transformation services.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <button
            style={{
              backgroundColor: primaryColor,
              color: "white",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
            }}
          >
            Contact Us
          </button>
        </div>
      </div>

      <div
        style={{
          width: isMobile ? "100%" : "45%",
          maxWidth: isMobile ? "400px" : "600px",
        }}
      >
        <img
          src={HeroImg}
          alt="Digital transformation illustration"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default Hero;
