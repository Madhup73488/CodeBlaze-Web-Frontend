// SocialLogin.js
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

function SocialLogin() {
  const { handleGoogleLogin } = useAuth();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        const clientId = document.querySelector('meta[name="google-signin-client_id"]').content;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleLogin,
          ux_mode: "popup",
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "outline", size: "large" }
        );
      }
    };

    if (document.getElementById("google-signin-button")) {
      initializeGoogleSignIn();
    }
  }, [handleGoogleLogin]);

  return (
    <div className="social-login">
      <div className="divider">
        <span>Or continue with</span>
      </div>
      <div className="social-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
        <div id="google-signin-button"></div>
      </div>
    </div>
  );
}

export default SocialLogin;
