import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound({ theme = "light", color = "purple" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Theme configuration
  const themeConfig = {
    light: {
      primary: getColorPrimary(color),
      secondary: getColorSecondary(color),
      background: "#FFFFFF",
      cardBg: "#FFFFFF",
      textPrimary: "#1F2937",
      textSecondary: "#4B5563",
      textLight: "#6B7280",
      border: "#E5E7EB",
      dividerBg: "#FFFFFF",
      buttonBg: "#F3F4F6",
      buttonText: "#111827",
      shadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      eyeColor: getEyeColor(color),
    },
    dark: {
      primary: getColorPrimary(color),
      secondary: getColorSecondary(color),
      background: "#0A0A0A",
      cardBg: "#1F2937",
      textPrimary: "#FFFFFF",
      textSecondary: "#D1D5DB",
      textLight: "#9CA3AF",
      border: "#4B5563",
      dividerBg: "#1F2937",
      buttonBg: "#374151",
      buttonText: "#FFFFFF",
      shadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      eyeColor: getEyeColor(color),
    },
  };

  // Get proper color values based on the color prop
  function getColorPrimary(colorName) {
    switch (colorName) {
      case "purple":
        return "#A855F7";
      case "orange":
        return "#F97316";
      case "green":
        return "#10B981";
      case "blue":
        return "#3B82F6";
      case "pink":
        return "#EC4899";
      default:
        return "#6366F1"; // indigo
    }
  }

  function getColorSecondary(colorName) {
    switch (colorName) {
      case "purple":
        return "#8B5CF6";
      case "orange":
        return "#F59E0B";
      case "green":
        return "#059669";
      case "blue":
        return "#2563EB";
      case "pink":
        return "#DB2777";
      default:
        return "#4F46E5"; // indigo
    }
  }

  function getEyeColor(colorName) {
    switch (colorName) {
      case "purple":
        return "#4C1D95";
      case "orange":
        return "#7C2D12";
      case "green":
        return "#064E3B";
      case "blue":
        return "#1E3A8A";
      case "pink":
        return "#831843";
      default:
        return "#4338CA"; // indigo
    }
  }

  function getGradient(colorName) {
    switch (colorName) {
      case "purple":
        return "linear-gradient(135deg, #A855F7, #8B5CF6)";
      case "orange":
        return "linear-gradient(135deg, #F97316, #F59E0B)";
      case "green":
        return "linear-gradient(135deg, #10B981, #059669)";
      case "blue":
        return "linear-gradient(135deg, #3B82F6, #2563EB)";
      case "pink":
        return "linear-gradient(135deg, #EC4899, #DB2777)";
      default:
        return "linear-gradient(135deg, #6366F1, #4F46E5)"; // indigo
    }
  }

  const colors = themeConfig[theme];

  // Define styles object
  const styles = {
    container: {
      backgroundColor: colors.background,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      transition: "background-color 0.3s ease",
    },
    card: {
      maxWidth: "64rem",
      width: "100%",
      borderRadius: "1.5rem",
      overflow: "hidden",
      boxShadow: colors.shadow,
      backgroundColor: colors.cardBg,
      display: "flex",
      flexDirection: "column",
      transition: "all 0.5s ease",
      transform: mounted ? "translateY(0)" : "translateY(2rem)",
      opacity: mounted ? 1 : 0,
    },
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      "@media (minWidth: 768px)": {
        flexDirection: "row",
      },
    },
    leftSide: {
      flex: "1 1 50%",
      background: getGradient(color),
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
    illustrationContainer: {
      position: "relative",
    },
    errorText: {
      fontSize: "9rem",
      fontWeight: "800",
      opacity: "0.1",
      animation: "pulse 2s infinite ease-in-out",
    },
    svgContainer: {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    illustrationText: {
      marginTop: "1.5rem",
      fontSize: "1.125rem",
      textAlign: "center",
      fontWeight: "300",
      letterSpacing: "0.05em",
    },
    rightSide: {
      flex: "1 1 50%",
      padding: "2rem",
      "@media (minWidth: 1024px)": {
        padding: "3rem",
      },
    },
    contentContainer: {
      textAlign: "center",
      "@media (minWidth: 768px)": {
        textAlign: "left",
      },
    },
    heading: {
      fontSize: "2.25rem",
      fontWeight: "700",
      marginBottom: "0.75rem",
      color: colors.textPrimary,
      "@media (minWidth: 768px)": {
        fontSize: "2.5rem",
      },
    },
    description: {
      fontSize: "1.125rem",
      marginBottom: "2rem",
      color: colors.textSecondary,
    },
    homeButton: {
      display: "block",
      width: "100%",
      backgroundColor: colors.primary,
      color: "white",
      fontWeight: "500",
      padding: "0.75rem 2rem",
      borderRadius: "0.5rem",
      textAlign: "center",
      transition: "all 0.2s ease",
      cursor: "pointer",
      marginBottom: "1.5rem",
      textDecoration: "none",
      "@media (minWidth: 768px)": {
        width: "auto",
      },
    },
    divider: {
      position: "relative",
      paddingTop: "1.5rem",
      marginBottom: "1.5rem",
    },
    dividerLine: {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
    },
    dividerBorder: {
      borderTopWidth: "1px",
      borderColor: colors.border,
      width: "100%",
    },
    dividerText: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    dividerTextSpan: {
      padding: "0 1rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      backgroundColor: colors.dividerBg,
      color: colors.textLight,
    },
    buttonGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1rem",
      "@media (minWidth: 640px)": {
        gridTemplateColumns: "1fr 1fr",
      },
    },
    secondaryButton: {
      textAlign: "center",
      fontWeight: "500",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      transition: "all 0.2s ease",
      backgroundColor: colors.buttonBg,
      color: colors.buttonText,
      textDecoration: "none",
    },
    fullWidthButton: {
      display: "block",
      textAlign: "center",
      fontWeight: "500",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      transition: "all 0.2s ease",
      backgroundColor: colors.buttonBg,
      color: colors.buttonText,
      marginTop: "0.5rem",
      textDecoration: "none",
    },
    footer: {
      marginTop: "3rem",
      textAlign: "center",
      "@media (minWidth: 768px)": {
        textAlign: "left",
      },
    },
    footerText: {
      fontSize: "0.875rem",
      color: colors.textLight,
    },
    footerLink: {
      fontWeight: "500",
      color: colors.primary,
      transition: "color 0.2s ease",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.flexContainer}>
          {/* Left illustration side */}
          <div style={styles.leftSide}>
            <div style={styles.illustrationContainer}>
              <div style={styles.errorText}>404</div>
              <div style={styles.svgContainer}>
                <svg
                  width="144"
                  height="144"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Face */}
                  <circle
                    cx="50"
                    cy="30"
                    r="20"
                    fill="white"
                    fillOpacity="0.9"
                    style={{ animation: "bounce 3s infinite ease" }}
                  />
                  <path
                    d="M30 70C30 85 70 85 70 70L70 60C70 52 65 45 50 45C35 45 30 52 30 60L30 70Z"
                    fill="white"
                    fillOpacity="0.9"
                  />

                  {/* Eyes */}
                  <circle cx="40" cy="25" r="3" fill={colors.eyeColor} />
                  <circle cx="60" cy="25" r="3" fill={colors.eyeColor} />

                  {/* Mouth */}
                  <path
                    d="M42 38C42 38 46 40 50 40C54 40 58 38 58 38"
                    stroke={colors.eyeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <p style={styles.illustrationText}>
              Oops! It seems you've wandered into uncharted territory.
            </p>
          </div>

          {/* Right content side */}
          <div style={styles.rightSide}>
            <div style={styles.contentContainer}>
              <h1 style={styles.heading}>Page Not Found</h1>
              <p style={styles.description}>
                We couldn't find the page you're looking for. It might have been
                moved, deleted, or never existed.
              </p>

              <div>
                <Link to="/" style={styles.homeButton}>
                  Return Home
                </Link>

                <div style={styles.divider}>
                  <div style={styles.dividerLine}>
                    <div style={styles.dividerBorder}></div>
                  </div>
                  <div style={styles.dividerText}>
                    <span style={styles.dividerTextSpan}>
                      or try these options
                    </span>
                  </div>
                </div>

                <div style={styles.buttonGrid}>
                  <Link to="/products" style={styles.secondaryButton}>
                    Browse Products
                  </Link>
                  <Link to="/contact" style={styles.secondaryButton}>
                    Contact Support
                  </Link>
                </div>

                <Link to="/search" style={styles.fullWidthButton}>
                  Search Our Site
                </Link>
              </div>
            </div>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Need immediate help?{" "}
                <Link to="/support" style={styles.footerLink}>
                  Visit our support center
                </Link>{" "}
                or call{" "}
                <a href="tel:+18005551234" style={styles.footerLink}>
                  1-800-555-1234
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.15; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}

export default NotFound;
