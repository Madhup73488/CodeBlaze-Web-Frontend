// src/contexts/LoaderContext.js
import { createContext, useState, useContext, useRef, useEffect } from "react";
import logo from "./../assets/images/codeblazelogoorange.png"; // Import the logo

const LoaderContext = createContext();

export const LoaderProvider = ({ children, color }) => {
  const [loading, setLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(
    color === "purple" ? "#a855f7" : "#f97316"
  );
  const timeoutRef = useRef(null);

  // Update the color when the prop changes
  useEffect(() => {
    setPrimaryColor(color === "purple" ? "#a855f7" : "#f97316");
  }, [color]);

  const startLoader = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoading(true);
    console.log("Loader: startLoader called");
  };

  const stopLoader = () => {
    setLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    console.log("Loader: stopLoader called");
  };

  const showLoaderFor = (duration = 1500) => {
    startLoader();
    timeoutRef.current = setTimeout(() => {
      stopLoader();
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoaderContext.Provider
      value={{ loading, startLoader, stopLoader, showLoaderFor }}
    >
      {children}
      {loading && (
        <div
          className="full-page-loader-overlay"
          style={{ "--primary-color": primaryColor }}
        >
          <img src={logo} alt="Loading..." className="loader-logo" />
        </div>
      )}
      <style jsx global>{`
        .full-page-loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(
            0,
            0,
            0,
            0.7
          ); /* Darker overlay for better contrast with orange logo */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it's on top of everything */
          backdrop-filter: blur(17px); /* Stronger blur */
          -webkit-backdrop-filter: blur(5px);
          animation: fadeIn 0.2s ease-out;
        }

        .loader-logo {
          width: 100px; /* Adjust size as needed */
          height: 100px;
          border-radius: 50%; /* Make it circular */
          box-shadow: 0 0 15px var(--primary-color),
            0 0 30px rgba(var(--primary-color), 0.5); /* Use CSS variable for glow */
          animation: blink 1.5s infinite alternate; /* Blinking animation */
        }

        @keyframes blink {
          0% {
            opacity: 0.5;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(0.98);
          }
          100% {
            opacity: 0.5;
            transform: scale(0.95);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
