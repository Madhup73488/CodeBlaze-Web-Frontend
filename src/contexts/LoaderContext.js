// src/contexts/LoaderContext.js
import { createContext, useState, useContext, useRef, useEffect } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children, color }) => {
  const [loading, setLoading] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(color === "purple" ? "#a855f7" : "#f97316");
  const timeoutRef = useRef(null);

  // Update the color when the prop changes
  useEffect(() => {
    setPrimaryColor(color === "purple" ? "#a855f7" : "#f97316");
  }, [color]);

  const startLoader = () => {
    // Clear any existing timeout to prevent conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoading(true);
  };

  const stopLoader = () => {
    setLoading(false);
    // Clear timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Version with automatic timeout
  const showLoaderFor = (duration = 1500) => {
    startLoader();
    timeoutRef.current = setTimeout(() => {
      stopLoader();
    }, duration);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ loading, startLoader, stopLoader, showLoaderFor }}>
      {children}
      {loading && (
        <>
          <div className="global-loader-container">
            <div className="global-loader" style={{ backgroundColor: primaryColor }} />
          </div>
          <div className="global-dim-overlay" />
        </>
      )}
      <style jsx global>{`
        .global-loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          overflow: hidden;
          z-index: 100;
        }
        .global-loader {
          height: 100%;
          width: 50%;
          position: absolute;
          animation: loading 1.5s infinite;
        }
        .global-dim-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          z-index: 90;
          backdrop-filter: blur(1px);
        }
        @keyframes loading {
          0% {
            left: -50%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);