// src/components/profile/PublicProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import format from "date-fns/format"; // Use date-fns for consistent date formatting

const PublicProfile = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when ID changes, to show loading correctly
    setProfile(null);
    setLoading(true);
    setError(null);
    fetchPublicProfile();
  }, [id]);

  const fetchPublicProfile = async () => {
    try {
      const response = await userService.getPublicProfile(id);
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Check for specific error status codes for better messages
      if (error.response && error.response.status === 404) {
        setError("Profile not found or access denied.");
      } else {
        setError("Failed to load profile. Please try again later.");
      }
      console.error("Error fetching public profile:", error);
    }
  };

  // --- Loading, Error, Not Found States ---
  if (loading) {
    return (
      <div className="public-profile-status">
        <div className="spinner"></div>
        <p>Loading profile...</p>
        <style jsx>{`
          .public-profile-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 1.2rem;
            color: #555; /* Neutral color */
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3; /* Light grey */
            border-top: 5px solid #f97316; /* Orange */
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="public-profile-status error-message-display">
        <p>{error}</p>
        <style jsx>{`
          .public-profile-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 1.2rem;
          }
          .error-message-display {
            color: #e53e3e; /* Red color */
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="public-profile-status not-found-message-display">
        <p>Profile not found</p>
        <style jsx>{`
          .public-profile-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 1.2rem;
          }
          .not-found-message-display {
            color: #555; /* Neutral color */
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }
  // --- End Status States ---

  return (
    <div className="public-profile-container">
      <div className="public-profile-header">
        {profile.profileImage && (
          <div className="profile-image">
            <img src={profile.profileImage} alt={profile.name || "Profile"} />{" "}
            {/* Added alt fallback */}
          </div>
        )}

        <div className="profile-info">
          <h2>{profile.name}</h2>
          {profile.position && <h3>{profile.position}</h3>}
          {(profile.company || profile.location) && (
            <div className="company-location">
              {profile.company && <p className="company">{profile.company}</p>}
              {profile.company && profile.location && (
                <span className="separator"> | </span>
              )}
              {profile.location && (
                <p className="location">{profile.location}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {profile.bio && (
        <div className="public-profile-section">
          <h3>About</h3>
          <p>{profile.bio}</p>
        </div>
      )}

      {profile.experience && profile.experience.length > 0 && (
        <div className="public-profile-section">
          <h3>Experience</h3>
          <div className="experience-list">
            {/* Sort experience by 'from' date descending */}
            {profile.experience
              .sort((a, b) => new Date(b.from) - new Date(a.from))
              .map((exp, index) => (
                <div key={exp._id || index} className="experience-item">
                  {" "}
                  {/* Use _id if available, fallback to index */}
                  <h4>{exp.title}</h4>
                  <h5>
                    {exp.company}
                    {exp.location ? ` - ${exp.location}` : ""}
                  </h5>
                  <p className="date-range">
                    {exp.from ? format(new Date(exp.from), "MMM yyyy") : "N/A"}{" "}
                    - {/* Formatted date */}
                    {exp.current
                      ? "Present"
                      : exp.to
                      ? format(new Date(exp.to), "MMM yyyy")
                      : "N/A"}{" "}
                    {/* Formatted date */}
                  </p>
                  {exp.description && (
                    <p className="description">{exp.description}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {profile.education && profile.education.length > 0 && (
        <div className="public-profile-section">
          <h3>Education</h3>
          <div className="education-list">
            {/* Sort education by 'from' date descending */}
            {profile.education
              .sort((a, b) => new Date(b.from) - new Date(a.from))
              .map((edu, index) => (
                <div key={edu._id || index} className="education-item">
                  {" "}
                  {/* Use _id if available, fallback to index */}
                  <h4>{`${edu.degree} in ${edu.fieldOfStudy}`}</h4>{" "}
                  {/* Combined for title */}
                  <h5>{edu.school}</h5> {/* School below */}
                  <p className="date-range">
                    {edu.from ? format(new Date(edu.from), "MMM yyyy") : "N/A"}{" "}
                    - {/* Formatted date */}
                    {edu.current
                      ? "Present"
                      : edu.to
                      ? format(new Date(edu.to), "MMM yyyy")
                      : "N/A"}{" "}
                    {/* Formatted date */}
                  </p>
                  {edu.description && (
                    <p className="description">{edu.description}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {profile.resume && (
        <div className="public-profile-section resume-section">
          <h3>Resume</h3>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-download-btn"
          >
            {/* Add download icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </a>
        </div>
      )}

      {/* --- Component Specific Styles --- */}
      <style jsx>{`
        /* Define a simple color palette for the public profile */
        :root {
          --public-primary: #f97316; /* Orange */
          --public-primary-light: #fb923c;
          --public-text-primary: #1f2937; /* Dark Gray */
          --public-text-secondary: #4b5563; /* Medium Gray */
          --public-border-color: #e5e7eb; /* Light Gray */
          --public-bg-card: #ffffff; /* White */
          --public-shadow-subtle: 0 2px 4px rgba(0, 0, 0, 0.05);
          --public-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .public-profile-container {
          max-width: 900px; /* Slightly smaller than dashboard */
          margin: 2rem auto;
          padding: 2.5rem;
          border-radius: 12px;
          background-color: var(--public-bg-card);
          box-shadow: var(--public-shadow-md);
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
          color: var(--public-text-primary);
        }

        .public-profile-header {
          display: flex;
          align-items: center;
          gap: 2rem; /* Space between image and info */
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--public-border-color); /* Separator */
        }

        .profile-image {
          width: 120px; /* Size of the image container */
          height: 120px;
          border-radius: 50%; /* Circular image */
          overflow: hidden;
          border: 3px solid var(--public-primary); /* Border around image */
          flex-shrink: 0; /* Prevent shrinking */
          box-shadow: var(--public-shadow-subtle);
        }

        .profile-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensure image covers the area */
        }

        .profile-info {
          flex-grow: 1; /* Allow info to take available space */
        }

        .profile-info h2 {
          font-size: 2rem; /* Large name */
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: var(--public-text-primary);
        }

        .profile-info h3 {
          font-size: 1.2rem; /* Position */
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--public-primary); /* Primary color for position */
        }

        .company-location {
          display: flex;
          align-items: center;
          flex-wrap: wrap; /* Allow wrapping */
          margin-top: 0.5rem;
          font-size: 1rem;
          color: var(
            --public-text-secondary
          ); /* Secondary text for company/location */
        }

        .company-location p {
          margin: 0; /* Remove default paragraph margin */
        }
        .company-location .separator {
          margin: 0 0.5rem; /* Space around separator */
        }

        .public-profile-section {
          margin-top: 2.5rem; /* Space above each section */
          padding-top: 2rem;
          border-top: 1px solid var(--public-border-color); /* Separator above section */
        }

        .public-profile-section:first-of-type {
          /* Adjust margin for the first section */
          margin-top: 0;
          padding-top: 0;
          border-top: none;
        }

        .public-profile-section h3 {
          font-size: 1.4rem; /* Section titles */
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: var(--public-text-primary);
        }

        .public-profile-section p {
          line-height: 1.6;
          color: var(--public-text-primary);
          opacity: 0.9;
        }

        .experience-list,
        .education-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; /* Space between items */
        }

        .experience-item,
        .education-item {
          padding: 1.5rem;
          border: 1px solid var(--public-border-color);
          border-radius: 8px;
          background-color: #f9f9f9; /* Light background for items */
          box-shadow: var(--public-shadow-subtle);
        }

        .experience-item h4,
        .education-item h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 0.4rem 0;
          color: var(--public-primary); /* Primary color for job/degree title */
        }

        .experience-item h5,
        .education-item h5 {
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.5rem 0;
          color: var(--public-text-primary);
        }

        .date-range {
          font-size: 0.9rem;
          color: var(--public-text-secondary);
          margin: 0 0 1rem 0;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--public-text-primary);
          margin: 0;
          opacity: 0.9;
        }

        .resume-section {
          /* Inherits .public-profile-section styles */
        }

        .resume-download-btn {
          display: inline-flex; /* Align icon and text */
          align-items: center;
          gap: 0.5rem; /* Space between icon and text */
          padding: 0.8rem 1.5rem;
          background-color: var(--public-primary); /* Primary color button */
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none; /* Remove underline */
          transition: all 0.3s ease;
          box-shadow: var(--public-shadow-subtle);
        }

        .resume-download-btn:hover {
          background-color: var(
            --public-primary-light
          ); /* Lighter color on hover */
          box-shadow: var(--public-shadow-md);
        }

        .resume-download-btn svg {
          width: 20px;
          height: 20px;
          stroke: white;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .public-profile-container {
            padding: 1.5rem;
          }

          .public-profile-header {
            flex-direction: column; /* Stack image and info */
            align-items: center;
            text-align: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
          }

          .profile-image {
            width: 100px;
            height: 100px;
          }

          .profile-info h2 {
            font-size: 1.8rem;
          }
          .profile-info h3 {
            font-size: 1.1rem;
          }
          .company-location {
            justify-content: center; /* Center company/location */
            font-size: 0.95rem;
          }

          .public-profile-section {
            margin-top: 2rem;
            padding-top: 1.5rem;
          }
          .public-profile-section:first-of-type {
            /* Adjust margin for the first section */
            margin-top: 2rem; /* Add back top margin */
            padding-top: 1.5rem;
            border-top: 1px solid var(--public-border-color);
          }

          .public-profile-section h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }

          .experience-item,
          .education-item {
            padding: 1rem;
          }

          .experience-item h4,
          .education-item h4 {
            font-size: 1rem;
          }
          .experience-item h5,
          .education-item h5 {
            font-size: 0.95rem;
          }
          .date-range,
          .description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .public-profile-container {
            padding: 1rem;
            margin: 1rem auto;
          }
          .public-profile-header {
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
          }
          .profile-image {
            width: 80px;
            height: 80px;
          }
          .profile-info h2 {
            font-size: 1.5rem;
          }
          .profile-info h3 {
            font-size: 1rem;
          }
          .company-location {
            font-size: 0.9rem;
          }
          .public-profile-section {
            margin-top: 1.5rem;
            padding-top: 1rem;
          }
          .public-profile-section:first-of-type {
            margin-top: 1.5rem;
            padding-top: 1rem;
          }

          .public-profile-section h3 {
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
          }
          .experience-item,
          .education-item {
            padding: 0.8rem;
          }
          .experience-item h4,
          .education-item h4 {
            font-size: 0.95rem;
          }
          .experience-item h5,
          .education-item h5 {
            font-size: 0.9rem;
          }
          .date-range,
          .description {
            font-size: 0.85rem;
          }
          .resume-download-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
            gap: 0.3rem;
          }
          .resume-download-btn svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicProfile;
