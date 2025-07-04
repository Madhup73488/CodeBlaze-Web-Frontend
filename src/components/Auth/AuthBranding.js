// AuthBranding.js
import React from "react";
import { CheckCircle, ExternalLink } from "lucide-react";

function AuthBranding({ primaryColor }) {
  return (
    <div className="auth-branding">
      <div className="brand-content">
        <div className="brand-logo">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M40 0L73.9 20V60L40 80L6.1 60V20L40 0Z" fill={primaryColor} />
            <path
              d="M25 50L15 40L25 30M55 30L65 40L55 50M45 25L35 55"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="brand-name">CodeBlaze</h1>
        <p className="brand-tagline">
          Master coding through interactive challenges and projects
        </p>
        <div className="brand-features">
          <div className="feature">
            <CheckCircle size={20} />
            <span>Interactive coding exercises</span>
          </div>
          <div className="feature">
            <CheckCircle size={20} />
            <span>Personalized learning paths</span>
          </div>
          <div className="feature">
            <CheckCircle size={20} />
            <span>Certification upon completion</span>
          </div>
        </div>
      </div>
      <div className="brand-footer">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms-of-service" className="external-link">
            Terms of Service <ExternalLink size={12} />
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="external-link">
            Privacy Policy <ExternalLink size={12} />
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthBranding;
