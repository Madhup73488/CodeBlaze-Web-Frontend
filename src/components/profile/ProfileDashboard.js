import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import ProfileForm from "./ProfileForm";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import FileUploadSection from "./FileUploadSection";
import PasswordChangeForm from "./PasswordChangeForm";
import { toast } from "react-toastify";

const ProfileDashboard = ({ theme = "light", color = "purple" }) => {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getUserProfile();
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to load profile");
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setSubmitting(true);
      const response = await userService.updateProfile(profileData);
      setProfile(response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderActiveTab = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div
            className="spinner"
            style={{ borderTopColor: primaryColor }}
          ></div>
          <p>Loading your profile data...</p>
        </div>
      );
    }

    switch (activeTab) {
      case "profile":
        return (
          <ProfileForm
            profile={profile}
            onSubmit={updateProfile}
            submitting={submitting}
            theme={theme}
            color={color}
          />
        );
      case "experience":
        return (
          <ExperienceSection
            experiences={profile?.experience || []}
            onUpdate={fetchUserProfile}
            submitting={submitting}
            setSubmitting={setSubmitting}
            theme={theme}
            color={color}
          />
        );
      case "education":
        return (
          <EducationSection
            education={profile?.education || []}
            onUpdate={fetchUserProfile}
            submitting={submitting}
            setSubmitting={setSubmitting}
            theme={theme}
            color={color}
          />
        );
      case "uploads":
        return (
          <FileUploadSection
            onUpdate={fetchUserProfile}
            submitting={submitting}
            setSubmitting={setSubmitting}
            theme={theme}
            color={color}
          />
        );
      case "password":
        return (
          <PasswordChangeForm
            submitting={submitting}
            setSubmitting={setSubmitting}
            theme={theme}
            color={color}
          />
        );
      default:
        return (
          <ProfileForm
            profile={profile}
            onSubmit={updateProfile}
            submitting={submitting}
            theme={theme}
            color={color}
          />
        );
    }
  };

  return (
    <div className={`profile-dashboard ${theme}`}>
      <div className="profile-header">
        <h1 className="profile-title">
          My <span style={{ color: primaryColor }}>Profile</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="profile-subtitle">
          Manage your personal information, experience, education and
          credentials
        </p>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          {[
            { id: "profile", label: "Basic Info", icon: "user" },
            { id: "experience", label: "Experience", icon: "briefcase" },
            { id: "education", label: "Education", icon: "graduation-cap" },
            { id: "uploads", label: "Resume & Photo", icon: "file-upload" },
            { id: "password", label: "Change Password", icon: "lock" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              style={
                activeTab === tab.id
                  ? {
                      borderColor: primaryColor,
                      color: theme === "dark" ? "#fff" : "#fff",
                      backgroundColor: primaryColor,
                    }
                  : {}
              }
            >
              <span className="tab-icon">{renderIcon(tab.icon)}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">{renderActiveTab()}</div>
      </div>

      <style jsx>{`
        .profile-dashboard {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 2.5rem 5%;
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }

        .profile-dashboard.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .profile-dashboard.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .profile-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .profile-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .accent-line {
          height: 4px;
          width: 60px;
          border-radius: 2px;
          margin: 0 auto 1.5rem;
        }

        .profile-subtitle {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .profile-content {
          display: flex;
          gap: 2rem;
          position: relative;
        }

        .profile-tabs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 250px;
          position: sticky;
          top: 2rem;
          align-self: flex-start;
        }

        .tab {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#f8f8f8"};
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .tab:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .tab.active {
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .tab-icon {
          margin-right: 0.8rem;
          display: flex;
          align-items: center;
          opacity: 0.9;
        }

        .tab-icon svg {
          width: 20px;
          height: 20px;
        }

        .tab-content {
          flex: 1;
          background: ${theme === "dark" ? "#111" : "#fff"};
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
          min-height: 500px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          opacity: 0.7;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 5px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          border-radius: 50%;
          margin-bottom: 1.5rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 920px) {
          .profile-content {
            flex-direction: column;
          }

          .profile-tabs {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
            position: static;
            padding-bottom: 0.5rem;
          }

          .tab {
            white-space: nowrap;
            padding: 0.8rem 1.2rem;
          }
        }

        @media (max-width: 768px) {
          .profile-dashboard {
            padding: 1.5rem;
          }

          .profile-title {
            font-size: 2rem;
          }

          .tab-content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .profile-dashboard {
            padding: 1rem;
            margin: 1rem auto;
          }

          .profile-title {
            font-size: 1.7rem;
          }

          .profile-subtitle {
            font-size: 1rem;
          }

          .tab {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .tab-icon {
            margin-right: 0.5rem;
          }

          .tab-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to render tab icons
const renderIcon = (iconName) => {
  switch (iconName) {
    case "user":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case "briefcase":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      );
    case "graduation-cap":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
        </svg>
      );
    case "file-upload":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M12 18v-6"></path>
          <path d="M8 15l4-4 4 4"></path>
        </svg>
      );
    case "lock":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      );
    default:
      return null;
  }
};

export default ProfileDashboard;
