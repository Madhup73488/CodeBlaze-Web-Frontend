// src/contexts/LoaderContext.js
import { createContext, useState, useContext, useRef, useEffect } from "react";
import logo from "./../assets/images/codeblazelogoorange.png"; // Import the logo
import "./Loader.css";

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
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
