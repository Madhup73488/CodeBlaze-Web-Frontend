import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react"; // Add User icon
import madhuPLocalImage from "../../../assets/images/team/MadhuP.png";
import manojGRLocalImage from "../../../assets/images/team/ManojGR.png";
import rohanPLocalImage from "../../../assets/images/team/RohanP.png";
import syedRoshanLocalImage from "../../../assets/images/team/SyedRoshan.png";
import prateekLocalImage from "../../../assets/images/team/Prateek.png"; // Import Prateek's image

function OurTeamPage({ theme = "dark" }) {
  const primaryColor = theme === "dark" ? "#f97316" : "#a855f7";
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentEngineeringSlide, setCurrentEngineeringSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const leadershipTeam = [
    {
      name: "Madhu P",
      role: "CEO & Co-Founder",
      bio: "With extensive experience in software engineering and product strategy, Madhu P leads our vision to deliver bespoke software solutions for our clients.",
      image: madhuPLocalImage,
    },
    {
      name: "Syed Roshan",
      role: "CTO & Founder",
      bio: "Syed Roshan architects our core technology infrastructure, ensuring robust and scalable software solutions for diverse client needs.",
      image: syedRoshanLocalImage,
    },
    {
      name: "Prateek",
      role: "Business Development Head",
      bio: "Prateek leads our business development strategy, forging new partnerships and driving growth opportunities for CodeBlaze.",
      image: prateekLocalImage,
    },
  ];

  const engineeringTeam = [
    {
      name: "Manoj G R",
      role: "Software Developer",
      bio: "Manoj drives our product roadmap and user experience, focusing on creating intuitive and effective software solutions for our clients.",
      image: manojGRLocalImage,
    },
    {
      name: "Rohan P",
      role: "Software Developer",
      bio: "Rohan P is a dedicated software developer, focused on delivering high-quality applications and contributing to innovative client projects.",
      image: rohanPLocalImage,
    },
    {
      name: "Mallika M",
      role: "Software Engineer",
      bio: "Mallika M is a skilled software engineer with a passion for building scalable applications and system architecture.",
      image: null, // Set to null to trigger placeholder
    },
  ];

  const nextSlide = (team, currentSlide, setCurrentSlide) => {
    setCurrentSlide((prev) => (prev + 1) % team.length);
  };

  const prevSlide = (team, currentSlide, setCurrentSlide) => {
    setCurrentSlide((prev) => (prev - 1 + team.length) % team.length);
  };

  const TeamSection = ({
    title,
    members,
    currentSlideIndex,
    setCurrentSlideIndex,
  }) => (
    <div className="team-section">
      <h2 className="section-title">
        <span style={{ color: primaryColor }}>{title}</span> Team
      </h2>

      {isMobile ? (
        <div className="mobile-slider-section">
          <div className="slider-container">
            <div
              className="slider-track"
              style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
            >
              {members.map((member, index) => (
                <div className="slide" key={index}>
                  <div className="member-card">
                    <div className="member-image-wrapper">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                        />
                      ) : (
                        <div className="member-image-placeholder">
                          <User
                            size={64}
                            color={theme === "dark" ? "#555" : "#bbb"}
                          />
                        </div>
                      )}
                      <div
                        className="image-overlay"
                        style={{
                          background: `linear-gradient(45deg, ${primaryColor}40, transparent)`,
                        }}
                      ></div>
                    </div>
                    <div className="member-details">
                      <h3 className="member-name">{member.name}</h3>
                      <p
                        className="member-role"
                        style={{ color: primaryColor }}
                      >
                        {member.role}
                      </p>
                      <p className="member-bio">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="slider-controls">
            <button
              className="control-btn prev"
              onClick={() =>
                prevSlide(members, currentSlideIndex, setCurrentSlideIndex)
              }
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="slide-indicators">
              {members.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentSlideIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlideIndex(index)}
                  style={
                    index === currentSlideIndex
                      ? { backgroundColor: primaryColor }
                      : {}
                  }
                />
              ))}
            </div>

            <button
              className="control-btn next"
              onClick={() =>
                nextSlide(members, currentSlideIndex, setCurrentSlideIndex)
              }
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="desktop-grid">
          {members.map((member, index) => (
            <div className="team-member-desktop" key={index}>
              <div className="member-image-container">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="member-image"
                  />
                ) : (
                  <div className="member-image-placeholder">
                    <User
                      size={80}
                      color={theme === "dark" ? "#555" : "#bbb"}
                    />
                  </div>
                )}
                <div
                  className="image-accent"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role" style={{ color: primaryColor }}>
                  {member.role}
                </p>
                <p className="member-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`team-container ${theme}`}>
      <div className="team-header">
        <h1 className="team-title">
          Our <span style={{ color: primaryColor }}>Team</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="team-subtitle">
          Meet the passionate individuals behind CodeBlaze. Our diverse team
          brings together decades of experience in software development,
          engineering, and innovation.
        </p>
      </div>

      <TeamSection
        title="Leadership"
        members={leadershipTeam}
        currentSlideIndex={currentSlide}
        setCurrentSlideIndex={setCurrentSlide}
      />

      <TeamSection
        title="Engineering"
        members={engineeringTeam}
        currentSlideIndex={currentEngineeringSlide}
        setCurrentSlideIndex={setCurrentEngineeringSlide}
      />

      <div className="join-team-section">
        <div className="join-content">
          <h2>
            Join Our <span style={{ color: primaryColor }}>Team</span>
          </h2>
          <p>
            We're always looking for talented individuals who are passionate
            about building innovative software and creating exceptional digital
            experiences.
          </p>
          <button
            className="join-button"
            style={{ backgroundColor: primaryColor }}
          >
            View Open Positions
          </button>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .team-container {
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }

        .team-container.dark {
          background: #111827;
          color: #ffffff;
        }

        .team-container.light {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          color: #1a1a1a;
        }

        .team-header {
          text-align: center;
          padding: 3rem 1.5rem 2rem;
        }

        .team-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .accent-line {
          height: 4px;
          width: 60px;
          border-radius: 2px;
          margin: 0 auto 1.5rem;
        }

        .team-subtitle {
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.8;
          font-size: 1.1rem;
        }

        .team-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          padding: 0 1.5rem;
        }

        /* Mobile Styles */
        .mobile-slider-section {
          padding: 0 1rem;
        }

        .slider-container {
          overflow: hidden;
          border-radius: 20px;
          margin-bottom: 2rem;
        }

        .slider-track {
          display: flex;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .slide {
          min-width: 100%;
          padding: 0 0.5rem;
        }

        .member-card {
          background: ${theme === "dark"
            ? "linear-gradient(145deg, #1f2937, #111827)"
            : "linear-gradient(145deg, #ffffff, #f1f5f9)"};
          border-radius: 24px;
          overflow: hidden;
          box-shadow: ${theme === "dark"
            ? "0 20px 40px rgba(0, 0, 0, 0.4)"
            : "0 20px 40px rgba(0, 0, 0, 0.1)"};
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
          transform: scale(0.95);
          transition: transform 0.3s ease;
        }

        .member-image-wrapper {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top; /* Prioritize top of image */
          transition: transform 0.5s ease;
        }

        .member-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${theme === "dark" ? "#2a2a2a" : "#e9ecef"};
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .member-details {
          padding: 2rem 1.5rem;
          text-align: center;
        }

        .member-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.01em;
        }

        .member-role {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          opacity: 0.9;
        }

        .member-bio {
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          opacity: 0.8;
        }

        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .control-btn {
          width: 44px;
          height: 44px;
          border: 2px solid;
          border-radius: 50%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover {
          transform: scale(1.1);
          background: ${theme === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.05)"};
        }

        .slide-indicators {
          display: flex;
          gap: 0.5rem;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: ${theme === "dark"
            ? "rgba(255,255,255,0.3)"
            : "rgba(0,0,0,0.3)"};
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          transform: scale(1.3);
        }

        /* Desktop Styles */
        .desktop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .team-member-desktop {
          background: ${theme === "dark"
            ? "linear-gradient(145deg, #1f2937, #111827)"
            : "linear-gradient(145deg, #ffffff, #f1f5f9)"};
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: ${theme === "dark"
            ? "0 10px 30px rgba(0, 0, 0, 0.3)"
            : "0 10px 30px rgba(0, 0, 0, 0.1)"};
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
        }

        .team-member-desktop:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: ${theme === "dark"
            ? "0 20px 40px rgba(0, 0, 0, 0.4)"
            : "0 20px 40px rgba(0, 0, 0, 0.15)"};
        }

        .member-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .team-member-desktop .member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .team-member-desktop:hover .member-image {
          transform: scale(1.05);
        }

        .image-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .member-info {
          padding: 2rem;
          text-align: center;
        }

        .join-team-section {
          padding: 3rem 1.5rem;
        }

        .join-content {
          background: ${theme === "dark"
            ? "linear-gradient(145deg, #1f2937, #111827)"
            : "linear-gradient(145deg, #ffffff, #f1f5f9)"};
          border-radius: 24px;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: ${theme === "dark"
            ? "0 20px 40px rgba(0, 0, 0, 0.3)"
            : "0 20px 40px rgba(0, 0, 0, 0.1)"};
          border: 1px solid
            ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
          max-width: 800px;
          margin: 0 auto;
        }

        .join-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .join-content p {
          line-height: 1.6;
          opacity: 0.8;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .join-button {
          background: linear-gradient(
            135deg,
            ${primaryColor},
            ${primaryColor}dd
          );
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .join-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 769px) {
          .team-container {
            padding: 2rem 0;
          }

          .team-header {
            padding: 4rem 2rem 3rem;
          }

          .team-title {
            font-size: 3.5rem;
          }

          .section-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
          }

          .team-section {
            margin-bottom: 5rem;
          }
        }

        @media (max-width: 480px) {
          .team-header {
            padding: 2rem 1rem 1.5rem;
          }

          .team-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.7rem;
          }

          .member-card {
            transform: scale(0.98);
          }

          .member-details {
            padding: 1.5rem 1rem;
          }

          .join-content {
            padding: 2rem 1.5rem;
          }

          .join-content h2 {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}

export default OurTeamPage;
