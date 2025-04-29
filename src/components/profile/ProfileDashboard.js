// src/components/profile/ProfileDashboard.jsx
import React, { useState, useEffect } from "react";
import { userService } from "../../services/userService";
import ProfileForm from "./ProfileForm";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import FileUploadSection from "./FileUploadSection";
import PasswordChangeForm from "./PasswordChangeForm";
import { toast } from "react-toastify";

const ProfileDashboard = ({ theme, color }) => {
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

  // Note: theme and color props are passed down, but styling is primarily via CSS variables
  // set on the parent container based on these props.
  const renderActiveTab = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profile data...</p>
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
    // Apply both theme and color classes to the main container
    <div className={`profile-dashboard ${theme} ${color}-theme`}>
      <div className="profile-header">
        <h2>My Profile</h2>
        {/* Accent line similar to OurMission component */}
        <div className="accent-line"></div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Basic Info
        </button>
        <button
          className={`tab ${activeTab === "experience" ? "active" : ""}`}
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>
        <button
          className={`tab ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
        <button
          className={`tab ${activeTab === "uploads" ? "active" : ""}`}
          onClick={() => setActiveTab("uploads")}
        >
          Resume & Photo
        </button>
        <button
          className={`tab ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      <div className="tab-content">{renderActiveTab()}</div>

      <style jsx>{`
        /* Define Core Variables */
        :root {
          --shadow-subtle: 0 2px 4px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Color Palette Definitions */
        .orange-theme {
          --color-primary: #f97316; /* Orange 600 */
          --color-primary-light: #fb923c; /* Orange 400 */
          --color-primary-very-light: #fff7ed; /* Orange 50 */
          --color-accent: #ea580c; /* Orange 700 */
        }

        .purple-theme {
          --color-primary: #a855f7; /* Purple 600 */
          --color-primary-light: #c084fc; /* Purple 400 */
          --color-primary-very-light: #f3e8ff; /* Purple 50 */
          --color-accent: #9333ea; /* Purple 700 */
        }

        /* Light Theme Variables */
        .light {
          --bg-main: #ffffff;
          --bg-card: #f8f8f8; /* Lighter card background */
          --text-primary: #1f2937; /* Gray 800 */
          --text-secondary: #4b5563; /* Gray 600 */
          --border-color: #e5e7eb; /* Gray 200 */
        }

        /* Dark Theme Variables */
        .dark {
          --bg-main: #1a1a1a; /* Very dark background */
          --bg-card: #2d3748; /* Slightly lighter dark background */
          --text-primary: #e5e7eb; /* Gray 200 */
          --text-secondary: #9ca3af; /* Gray 400 */
          --border-color: #4b5563; /* Gray 600 */
        }

        /* Base Dashboard Styles */
        .profile-dashboard {
          max-width: 1100px;
          margin: 2rem auto; /* Increased vertical margin */
          padding: 2.5rem; /* Increased padding */
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
          /* Apply theme/color specific variables */
          background-color: var(--bg-main);
          color: var(--text-primary);
          border: 1px solid var(--border-color); /* Subtle border */
        }

        /* Dark mode specific adjustments */
        .profile-dashboard.dark {
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }

        .profile-header {
          display: flex;
          flex-direction: column; /* Stack title and accent line */
          align-items: center; /* Center items */
          margin-bottom: 3rem; /* Increased space below header */
          padding-bottom: 1rem; /* Space below text before line */
        }

        .profile-header h2 {
          font-size: 2rem; /* Slightly smaller heading than mission, still prominent */
          font-weight: 700;
          margin: 0 0 0.5rem 0; /* Space between title and line */
          color: var(--color-primary); /* Primary color for heading */
        }

        .accent-line {
          height: 4px;
          width: 60px; /* Consistent with OurMission */
          border-radius: 2px;
          background-color: var(--color-primary); /* Primary color for line */
        }

        .profile-tabs {
          display: flex;
          flex-wrap: wrap; /* Allow wrapping */
          gap: 0.75rem; /* Consistent gap */
          margin-bottom: 2.5rem; /* Space below tabs */
          border-bottom: 1px solid var(--border-color); /* Subtle bottom border */
          padding-bottom: 0.75rem; /* Space between tabs and border */
        }

        .tab {
          padding: 0.75rem 1.25rem; /* Increased padding */
          border: none;
          background: transparent; /* Start with transparent background */
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem; /* Base font size */
          border-radius: 6px; /* Slightly smaller radius than container */
          transition: all 0.2s ease;
          color: var(--text-secondary); /* Default tab color */
          outline: none; /* Remove default outline */
        }

        .tab:hover {
          background-color: var(
            --color-primary-very-light
          ); /* Lightest primary color on hover */
          color: var(--color-primary); /* Primary color text on hover */
        }

        .tab.active {
          background-color: var(
            --color-primary
          ); /* Primary color for active background */
          color: white; /* White text on active tab */
          box-shadow: var(--shadow-subtle); /* Subtle shadow for active state */
        }

        /* Dark mode tab adjustments */
        .dark .tab {
          color: var(--text-secondary); /* Dark mode secondary text */
        }
        .dark .tab:hover {
          background-color: rgba(
            var(--color-primary, #f97316),
            0.15
          ); /* Use rgba for transparency with primary color */
          color: var(
            --color-primary-light
          ); /* Lighter primary color on hover in dark mode */
        }
        .dark .tab.active {
          background-color: var(
            --color-accent
          ); /* Use accent for active in dark mode for contrast */
          color: var(
            --text-primary
          ); /* Primary text color (light) on accent background */
          box-shadow: var(--shadow-subtle);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px; /* Sufficient height */
          color: var(--text-secondary); /* Use secondary text color */
          font-size: 1.1rem;
        }

        /* Spinner styles */
        .spinner {
          width: 50px; /* Slightly smaller than previous */
          height: 50px;
          border: 5px solid var(--border-color); /* Use border color for base */
          border-top-color: var(
            --color-primary
          ); /* Primary color for spinner part */
          border-radius: 50%;
          margin-bottom: 1.5rem;
          animation: spin 0.8s linear infinite;
        }

        /* Dark mode spinner adjustment */
        .dark .spinner {
          border-color: var(--border-color); /* Dark mode border color */
          border-top-color: var(
            --color-primary-light
          ); /* Lighter primary for dark mode spinner */
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .tab-content {
          min-height: 450px; /* Maintain minimum height */
          padding: 2rem; /* Increased padding */
          background-color: var(--bg-card); /* Card background color */
          border-radius: 8px; /* Rounded corners */
          border: 1px solid var(--border-color); /* Subtle border */
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03); /* Subtle inner shadow */
          transition: all 0.3s ease;
        }

        /* Dark mode tab content adjustment */
        .dark .tab-content {
          border-color: var(--border-color);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .profile-dashboard {
            padding: 1.5rem; /* Reduced padding on smaller screens */
            margin: 1.5rem auto;
          }

          .profile-header h2 {
            font-size: 1.8rem;
          }

          .profile-tabs {
            flex-direction: column; /* Stack tabs vertically */
            gap: 0.5rem; /* Smaller gap */
          }

          .tab {
            width: 100%; /* Full width tabs */
            text-align: left;
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
          }

          .tab-content {
            padding: 1.5rem; /* Reduced padding */
          }
        }

        @media (max-width: 480px) {
          .profile-dashboard {
            padding: 1rem;
            margin: 1rem auto;
          }

          .profile-header h2 {
            font-size: 1.5rem;
          }

          .tab {
            font-size: 0.9rem;
            padding: 0.6rem 0.8rem;
          }

          .tab-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileDashboard;
