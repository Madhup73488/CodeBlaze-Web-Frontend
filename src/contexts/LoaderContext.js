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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoading(true);
  };

  const stopLoader = () => {
    setLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
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
    <LoaderContext.Provider value={{ loading, startLoader, stopLoader, showLoaderFor }}>
      {children}
      {loading && (
        <>
          <div className="global-loader-container">
            <div className="global-loader-track">
              <div className="global-loader-bar" style={{ 
                '--primary-color': primaryColor,
                '--primary-color-rgb': color === "purple" ? "168, 85, 247" : "249, 115, 22"
              }} />
            </div>
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
          height: 2px;
          overflow: visible;
          z-index: 100;
          pointer-events: none;
        }
        
        .global-loader-track {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          overflow: visible;
        }
        
        .global-loader-bar {
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          transform-origin: left center;
          animation: shopify-progress 2s infinite cubic-bezier(0.65, 0.05, 0.36, 1);
          background: var(--primary-color);
          
          /* The intense glow effect */
          box-shadow:
            0 0 2px 0 var(--primary-color),
            0 0 5px 0 var(--primary-color),
            0 0 10px 1px rgba(var(--primary-color-rgb), 0.8),
            0 0 15px 2px rgba(var(--primary-color-rgb), 0.5),
            0 0 20px 3px rgba(var(--primary-color-rgb), 0.3);
        }
        
        .global-loader-bar::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 100%
          );
          animation: shopify-shine 2s infinite;
        }
        
        .global-dim-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.15);
          z-index: 90;
          backdrop-filter: blur(1px);
        }
        
        @keyframes shopify-progress {
          0% {
            transform: scaleX(0);
            transform-origin: left center;
          }
          49% {
            transform: scaleX(1);
            transform-origin: left center;
          }
          50% {
            transform: scaleX(1);
            transform-origin: right center;
          }
          100% {
            transform: scaleX(0);
            transform-origin: right center;
          }
        }
        
        @keyframes shopify-shine {
          0% {
            transform: translateX(-100%);
          }
          60% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);