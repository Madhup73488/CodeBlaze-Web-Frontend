import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsentModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <p className="text-sm">
        We use cookies to enhance your experience. By continuing to visit this
        site you agree to our use of cookies.{" "}
        <Link to="/privacy-policy" className="underline">
          Learn more
        </Link>
      </p>
      <button
        onClick={acceptCookies}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsentModal;
