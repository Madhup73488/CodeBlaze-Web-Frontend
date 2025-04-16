import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ theme = "light", color = "indigo" }) => {
  // Define color values based on the color prop
  const getColorValues = () => {
    switch (color) {
      case "purple":
        return {
          primary: "#a855f7", // purple-500
          secondary: "#8b5cf6", // violet-500
          gradient: "from-purple-500 to-violet-600",
          accentDark: "#6d28d9", // purple-700
          eyeColor: "#4c1d95", // purple-900
        };
      case "orange":
        return {
          primary: "#f97316", // orange-500
          secondary: "#f59e0b", // amber-500
          gradient: "from-orange-500 to-amber-600",
          accentDark: "#c2410c", // orange-700
          eyeColor: "#7c2d12", // orange-900
        };
      default: // indigo as default
        return {
          primary: "#6366f1", // indigo-500
          secondary: "#4f46e5", // indigo-600
          gradient: "from-indigo-500 to-blue-600",
          accentDark: "#4338ca", // indigo-700
          eyeColor: "#4338CA", // indigo-700
        };
    }
  };

  const colors = getColorValues();

  // Define theme-based styles
  const getThemeStyles = () => {
    if (theme === "dark") {
      return {
        pageBg: "bg-gray-900",
        cardBg: "bg-gray-800",
        headingText: "text-white",
        bodyText: "text-gray-300",
        dividerBorder: "border-gray-700",
        dividerText: "bg-gray-800 text-gray-400",
        linkButton: "bg-gray-700 hover:bg-gray-600 text-white",
        supportText: "text-gray-400",
        supportLink: `text-${color}-400 hover:text-${color}-300`,
      };
    }
    return {
      pageBg: "bg-gradient-to-br from-purple-100 via-pink-100 to-red-100",
      cardBg: "bg-white",
      headingText: "text-gray-800",
      bodyText: "text-gray-600",
      dividerBorder: "border-gray-300",
      dividerText: "bg-white text-gray-500",
      linkButton: "bg-gray-100 hover:bg-gray-200 text-gray-800",
      supportText: "text-gray-500",
      supportLink: `text-${color}-600 hover:text-${color}-800`,
    };
  };

  const themeStyles = getThemeStyles();

  return (
    <div
      className={`${themeStyles.pageBg} min-h-screen flex items-center justify-center p-4`}
    >
      <div
        className={`max-w-3xl w-full ${themeStyles.cardBg} rounded-2xl shadow-xl overflow-hidden`}
      >
        <div className="md:flex">
          {/* Left illustration side */}
          <div
            className={`md:w-1/2 bg-gradient-to-br ${colors.gradient} p-8 flex flex-col justify-center items-center text-white`}
          >
            <div className="relative">
              <div className="text-9xl font-extrabold opacity-10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-36 h-36"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="30"
                    r="20"
                    fill="white"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M30 70C30 85 70 85 70 70L70 60C70 52 65 45 50 45C35 45 30 52 30 60L30 70Z"
                    fill="white"
                    fillOpacity="0.8"
                  />
                  <circle cx="40" cy="25" r="3" fill={colors.eyeColor} />
                  <circle cx="60" cy="25" r="3" fill={colors.eyeColor} />
                  <path
                    d="M42 38C42 38 46 40 50 40C54 40 58 38 58 38"
                    stroke={colors.eyeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-lg text-center font-light tracking-wider">
              Oops! It seems you've wandered into uncharted territory.
            </p>
          </div>

          {/* Right content side */}
          <div className="md:w-1/2 p-8">
            <div className="text-center md:text-left">
              <h1
                className={`text-3xl md:text-4xl font-bold ${themeStyles.headingText} mb-2`}
              >
                Page Not Found
              </h1>
              <p className={`${themeStyles.bodyText} mb-8`}>
                We can't seem to find the page you're looking for.
              </p>

              <div className="space-y-4">
                <Link
                  to="/"
                  style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  }}
                  className="block w-full md:w-auto hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  Return Home
                </Link>

                <div className="relative pt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${themeStyles.dividerBorder}`}
                    ></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className={`${themeStyles.dividerText} px-4 text-sm`}>
                      or try these
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/products"
                    className={`text-center ${themeStyles.linkButton} font-medium py-3 px-4 rounded-lg transition-colors duration-200`}
                  >
                    Our Products
                  </Link>
                  <Link
                    to="/contact"
                    className={`text-center ${themeStyles.linkButton} font-medium py-3 px-4 rounded-lg transition-colors duration-200`}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center md:text-left">
              <p className={`${themeStyles.supportText} text-sm`}>
                Need help?{" "}
                <a
                  href="/support"
                  className={`${themeStyles.supportLink} font-medium`}
                  style={{ color: colors.primary }}
                >
                  Visit our support page
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
