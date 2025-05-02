// AuthTabs.js
import React from "react";

function AuthTabs({ activeTab, setActiveTab, primaryColor, setError }) {
  return (
    <div className="auth-tabs">
      <button
        className={`tab ${activeTab === "login" ? "active" : ""}`}
        onClick={() => {
          setActiveTab("login");
          setError(null);
        }}
        style={{
          borderColor: activeTab === "login" ? primaryColor : "transparent",
          color: activeTab === "login" ? primaryColor : "",
        }}
      >
        Login
      </button>
      <button
        className={`tab ${activeTab === "register" ? "active" : ""}`}
        onClick={() => {
          setActiveTab("register");
          setError(null);
        }}
        style={{
          borderColor: activeTab === "register" ? primaryColor : "transparent",
          color: activeTab === "register" ? primaryColor : "",
        }}
      >
        Register
      </button>
    </div>
  );
}

export default AuthTabs;