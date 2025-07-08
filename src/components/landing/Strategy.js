// components/Strategy.js
import { useState, useEffect } from "react";

function Strategy({ theme, color }) {
  const isDarkMode = theme === "dark";
  const bgColor = isDarkMode ? "#111827" : "#f9fafb";
  const textColor = isDarkMode ? "#f9fafb" : "#111827";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <section
      style={{
        padding: "4rem 5%",
        backgroundColor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="container mx-auto"
        style={isMobile ? {} : { maxWidth: "1400px", padding: "0 5%" }}
      >
        {/* Decorative elements */}
        <div
          className={`absolute top-0 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 opacity-10 blur-3xl`}
        ></div>
        <div
          className={`absolute bottom-40 left-10 w-48 h-48 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 opacity-10 blur-3xl`}
        ></div>

        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "3rem",
            maxWidth: "90%",
            lineHeight: "1.3",
            color: textColor,
          }}
        >
          Combining strategy and technology with effective change management, we
          empower organizations to optimize operations, elevate customer
          experiences, and discover new revenue streams.
        </h2>
      </div>
    </section>
  );
}

export default Strategy;
