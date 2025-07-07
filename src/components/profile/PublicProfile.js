// src/components/profile/PublicProfile.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import format from "date-fns/format";

const PublicProfile = ({ theme = "light", color = "orange" }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define primary color based on the color prop
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  // Create CSS variables for consistent styling
  const cssVars = {
    "--color-primary": primaryColor,
    "--color-primary-light": `${primaryColor}dd`,
    "--color-primary-very-light": `${primaryColor}22`,
    "--bg-main": theme === "dark" ? "#0a0a0a" : "#f9fafb",
    "--bg-card": theme === "dark" ? "#111" : "#fff",
    "--text-primary": theme === "dark" ? "#fff" : "#333",
    "--text-secondary": theme === "dark" ? "#aaa" : "#666",
    "--border-color": theme === "dark" ? "#333" : "#e5e5e5",
    "--shadow-sm":
      theme === "dark"
        ? "0 2px 4px rgba(0, 0, 0, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.05)",
    "--shadow-md":
      theme === "dark"
        ? "0 4px 6px rgba(0, 0, 0, 0.4)"
        : "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const fetchPublicProfile = useCallback(async () => {
    try {
      const response = await userService.getPublicProfile(id);
      setProfile(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Check for specific error status codes
      if (error.response && error.response.status === 404) {
        setError("Profile not found or access denied.");
      } else {
        setError("Failed to load profile. Please try again later.");
      }
      console.error("Error fetching public profile:", error);
    }
  }, [id]);

  useEffect(() => {
    // Reset state when ID changes
    setProfile(null);
    setLoading(true);
    setError(null);
    fetchPublicProfile();
  }, [id, fetchPublicProfile]);

  // Loading state component
  if (loading) {
    return (
      <div className="profile-status" style={cssVars}>
        <div className="spinner"></div>
        <p>Loading profile...</p>
        <style jsx>{`
          .profile-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 1.2rem;
            color: var(--text-secondary);
            background-color: var(--bg-card);
            border-radius: 12px;
            box-shadow: var(--shadow-md);
            padding: 2rem;
            margin: 2rem auto;
            max-width: 900px;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid var(--border-color);
            border-top: 5px solid var(--color-primary);
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

  // Error state component
  if (error) {
    return (
      <div className="profile-status error" style={cssVars}>
        <p>{error}</p>
        <style jsx>{`
          .profile-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 1.2rem;
            color: #e53e3e;
            font-weight: 500;
            background-color: var(--bg-card);
            border-radius: 12px;
            box-shadow: var(--shadow-md);
            padding: 2rem;
            margin: 2rem auto;
            max-width: 900px;
          }
          .error {
            border-left: 4px solid #e53e3e;
          }
        `}</style>
      </div>
    );
  }

  // Profile not found component
  if (!profile) {
    return (
      <div className="profile-status not-found" style={cssVars}>
        <p>Profile not found</p>
        <style jsx>{`
          .profile-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-size: 1.2rem;
            color: var(--text-secondary);
            font-weight: 500;
            background-color: var(--bg-card);
            border-radius: 12px;
            box-shadow: var(--shadow-md);
            padding: 2rem;
            margin: 2rem auto;
            max-width: 900px;
          }
          .not-found {
            border-left: 4px solid var(--color-primary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`public-profile ${theme}`} style={cssVars}>
      <div className="profile-header">
        <div className="profile-header-content">
          {profile.profileImage && (
            <div className="profile-image">
              <img src={profile.profileImage} alt={profile.name || "Profile"} />
            </div>
          )}

          <div className="profile-info">
            <h2>{profile.name}</h2>
            {profile.position && <h3>{profile.position}</h3>}
            {(profile.company || profile.location) && (
              <div className="company-location">
                {profile.company && <p className="company">{profile.company}</p>}
                {profile.company && profile.location && (
                  <span className="separator">•</span>
                )}
                {profile.location && (
                  <p className="location">{profile.location}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        {profile.bio && (
          <div className="profile-section">
            <h3 className="section-title">About</h3>
            <p className="bio">{profile.bio}</p>
          </div>
        )}

        {profile.experience && profile.experience.length > 0 && (
          <div className="profile-section">
            <h3 className="section-title">Experience</h3>
            <div className="timeline-list">
              {profile.experience
                .sort((a, b) => new Date(b.from) - new Date(a.from))
                .map((exp, index) => (
                  <div key={exp._id || index} className="timeline-item">
                    <div className="timeline-header">
                      <h4>{exp.title}</h4>
                      <span className="date-range">
                        {exp.from ? format(new Date(exp.from), "MMM yyyy") : "N/A"} - 
                        {exp.current
                          ? "Present"
                          : exp.to
                          ? format(new Date(exp.to), "MMM yyyy")
                          : "N/A"}
                      </span>
                    </div>
                    <h5>
                      {exp.company}
                      {exp.location ? ` • ${exp.location}` : ""}
                    </h5>
                    {exp.description && (
                      <p className="description">{exp.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {profile.education && profile.education.length > 0 && (
          <div className="profile-section">
            <h3 className="section-title">Education</h3>
            <div className="timeline-list">
              {profile.education
                .sort((a, b) => new Date(b.from) - new Date(a.from))
                .map((edu, index) => (
                  <div key={edu._id || index} className="timeline-item">
                    <div className="timeline-header">
                      <h4>{`${edu.degree} in ${edu.fieldOfStudy}`}</h4>
                      <span className="date-range">
                        {edu.from ? format(new Date(edu.from), "MMM yyyy") : "N/A"} - 
                        {edu.current
                          ? "Present"
                          : edu.to
                          ? format(new Date(edu.to), "MMM yyyy")
                          : "N/A"}
                      </span>
                    </div>
                    <h5>{edu.school}</h5>
                    {edu.description && (
                      <p className="description">{edu.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {profile.resume && (
          <div className="profile-section">
            <h3 className="section-title">Resume</h3>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
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
      </div>

      <style jsx>{`
        .public-profile {
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
          max-width: 900px;
          margin: 2rem auto;
          background-color: var(--bg-card);
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          color: var(--text-primary);
        }

        .profile-header {
          background-color: var(--color-primary-very-light);
          border-radius: 12px 12px 0 0;
          padding: 2.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .profile-header-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--color-primary);
          flex-shrink: 0;
          box-shadow: var(--shadow-sm);
          background-color: var(--bg-card);
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-info {
          flex-grow: 1;
        }

        .profile-info h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .profile-info h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--color-primary);
        }

        .company-location {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .company-location p {
          margin: 0;
        }

        .company-location .separator {
          margin: 0 0.5rem;
        }

        .profile-content {
          padding: 2.5rem;
        }

        .profile-section {
          margin-bottom: 2.5rem;
        }

        .profile-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--border-color);
          color: var(--text-primary);
        }

        .bio {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-primary);
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-item {
          padding: 1.5rem;
          border-radius: 8px;
          background-color: var(--bg-main);
          border-left: 4px solid var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .timeline-item h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          color: var(--color-primary);
        }

        .timeline-item h5 {
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.75rem 0;
          color: var(--text-secondary);
        }

        .date-range {
          font-size: 0.9rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0.5rem 0 0 0;
          color: var(--text-primary);
        }

        .resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }

        .resume-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 10px
            ${theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.15)"};
        }

        .resume-btn svg {
          width: 20px;
          height: 20px;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .profile-header {
            padding: 1.5rem;
          }
          
          .profile-header-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }
          
          .profile-image {
            width: 100px;
            height: 100px;
          }
          
          .company-location {
            justify-content: center;
          }
          
          .profile-content {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 1.3rem;
          }
          
          .timeline-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .timeline-item {
            padding: 1.2rem;
          }
        }
        
        @media (max-width: 480px) {
          .public-profile {
            margin: 1rem;
          }
          
          .profile-header {
            padding: 1rem;
          }
          
          .profile-image {
            width: 80px;
            height: 80px;
          }
          
          .profile-info h2 {
            font-size: 1.5rem;
          }
          
          .profile-info h3 {
            font-size: 1.1rem;
          }
          
          .company-location {
            font-size: 0.9rem;
          }
          
          .profile-content {
            padding: 1rem;
          }
          
          .section-title {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
          
          .timeline-item {
            padding: 1rem;
          }
          
          .timeline-item h4 {
            font-size: 1rem;
          }
          
          .timeline-item h5 {
            font-size: 0.9rem;
          }
          
          .description {
            font-size: 0.9rem;
          }
          
          .resume-btn {
            width: 100%;
            justify-content: center;
            padding: 0.7rem 1rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicProfile;
