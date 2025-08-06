// AuthBranding.js
import React from "react";
import { CheckCircle, ExternalLink } from "lucide-react";

function AuthBranding({ primaryColor }) {
  return (
    <div className="auth-branding">
      <div className="brand-content">
        <div className="brand-logo">
          <img
            src={require("../../assets/images/Syntellite-labs-logo.png")}
            alt="Syntellite Labs"
            style={{
              width: "180px",
              height: "auto",
            }}
          />
        </div>
        <p className="brand-tagline">
          Empowering innovation through advanced research and development
        </p>
        <div className="brand-features">
          <div className="feature">
            <CheckCircle size={20} />
            <span>Research fellowships</span>
          </div>
          <div className="feature">
            <CheckCircle size={20} />
            <span>Innovation labs</span>
          </div>
          <div className="feature">
            <CheckCircle size={20} />
            <span>Industry partnerships</span>
          </div>
        </div>
      </div>
      <div className="brand-footer">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms-and-conditions" className="external-link">
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
