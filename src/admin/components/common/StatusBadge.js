import React from "react";

/**
 * StatusBadge Component
 *
 * A versatile badge component for displaying status information with different
 * visual styles based on the status type.
 *
 * @param {Object} props
 * @param {string} props.status - The status value to display
 * @param {string} props.type - Predefined status type (success, warning, error, info, pending, neutral)
 * @param {boolean} props.dot - Whether to show a status indicator dot
 * @param {boolean} props.uppercase - Whether to transform the text to uppercase
 * @param {string} props.size - Size of the badge (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.theme - Color theme (light or dark)
 */
const StatusBadge = ({
  status,
  type = "neutral",
  dot = true,
  uppercase = false,
  size = "md",
  className = "",
  theme = "light",
  ...props
}) => {
  // Get status config based on type
  const getStatusConfig = () => {
    const configs = {
      success: {
        bg:
          theme === "dark"
            ? "rgba(34, 197, 94, 0.15)"
            : "rgba(34, 197, 94, 0.1)",
        text: theme === "dark" ? "#4ade80" : "#166534",
        border: theme === "dark" ? "#2e5f41" : "#dcfce7",
        dotColor: "#22c55e",
      },
      warning: {
        bg:
          theme === "dark"
            ? "rgba(245, 158, 11, 0.15)"
            : "rgba(245, 158, 11, 0.1)",
        text: theme === "dark" ? "#fbbf24" : "#92400e",
        border: theme === "dark" ? "#78520b" : "#fef3c7",
        dotColor: "#f59e0b",
      },
      error: {
        bg:
          theme === "dark"
            ? "rgba(239, 68, 68, 0.15)"
            : "rgba(239, 68, 68, 0.1)",
        text: theme === "dark" ? "#f87171" : "#b91c1c",
        border: theme === "dark" ? "#833a3a" : "#fee2e2",
        dotColor: "#ef4444",
      },
      info: {
        bg:
          theme === "dark"
            ? "rgba(59, 130, 246, 0.15)"
            : "rgba(59, 130, 246, 0.1)",
        text: theme === "dark" ? "#60a5fa" : "#1e40af",
        border: theme === "dark" ? "#2d4587" : "#dbeafe",
        dotColor: "#3b82f6",
      },
      pending: {
        bg:
          theme === "dark"
            ? "rgba(168, 85, 247, 0.15)"
            : "rgba(168, 85, 247, 0.1)",
        text: theme === "dark" ? "#c084fc" : "#6b21a8",
        border: theme === "dark" ? "#5e3973" : "#f3e8ff",
        dotColor: "#a855f7",
      },
      neutral: {
        bg:
          theme === "dark"
            ? "rgba(107, 114, 128, 0.15)"
            : "rgba(107, 114, 128, 0.1)",
        text: theme === "dark" ? "#9ca3af" : "#374151",
        border: theme === "dark" ? "#404549" : "#f3f4f6",
        dotColor: "#6b7280",
      },
    };

    return configs[type] || configs.neutral;
  };

  const config = getStatusConfig();

  // Get size-specific styles
  const getSizeStyles = () => {
    const sizes = {
      sm: {
        padding: "0.25rem 0.5rem",
        fontSize: "0.75rem",
        dotSize: "0.375rem",
      },
      md: {
        padding: "0.375rem 0.75rem",
        fontSize: "0.8125rem",
        dotSize: "0.5rem",
      },
      lg: {
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        dotSize: "0.625rem",
      },
    };

    return sizes[size] || sizes.md;
  };

  const sizeStyles = getSizeStyles();

  return (
    <span className={`status-badge ${className}`} {...props}>
      {dot && <span className="status-dot"></span>}
      <span className="status-text">
        {uppercase ? status.toUpperCase() : status}
      </span>

      <style jsx>{`
        .status-badge {
          display: inline-flex;
          align-items: center;
          background-color: #13fa13;
          color: #000000;
          border: 1px solid #53ff5b;
          border-radius: 9999px;
          padding: ${sizeStyles.padding};
          font-weight: 500;
          font-size: ${sizeStyles.fontSize};
          line-height: 1;
          white-space: nowrap;
          gap: 0.375rem;
        }

        .status-dot {
          height: ${sizeStyles.dotSize};
          width: ${sizeStyles.dotSize};
          background-color: ${config.dotColor};
          border-radius: 50%;
          display: inline-block;
        }

        .status-text {
          position: relative;
          top: 0.5px;
        }
      `}</style>
    </span>
  );
};

export default StatusBadge;
