import React, { useState } from "react";

function OurTeamPage({ theme, color }) { // Renamed component
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [activeTab, setActiveTab] = useState("leadership");

  const leadershipTeam = [
    {
      name: "Alexandra Chen",
      role: "CEO & Co-Founder",
      bio: "With 15+ years in fintech and a background from MIT, Alexandra leads our vision and strategy. Prior to CodeBlaze, she led product at PayPal and was an early engineer at Square.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Michael architected our core payment infrastructure. His background includes leading engineering teams at Stripe and Amazon Web Services focusing on distributed systems.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Product Officer",
      bio: "Sarah drives our product roadmap and user experience. Before joining CodeBlaze, she led product management at Shopify and holds patents in checkout optimization.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "David Kim",
      role: "Chief Financial Officer",
      bio: "David oversees our financial strategy and investor relations. Previously, he was VP of Finance at Adyen and an investment banker specializing in fintech.",
      image: "/api/placeholder/300/300",
    },
  ];

  const engineeringTeam = [
    {
      name: "Raj Patel",
      role: "VP of Engineering",
      bio: "Raj leads our engineering department and builds scalable infrastructure. Prior to CodeBlaze, he architected payment systems at Plaid and Visa.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Emily Zhang",
      role: "Head of API Development",
      bio: "Emily ensures our APIs are robust, developer-friendly, and secure. She previously built API platforms at Twilio and contributed to multiple open-source projects.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Marco Valente",
      role: "Lead Front-End Architect",
      bio: "Marco designs our UI components and checkout experiences. He previously led front-end teams at Shopify and specializes in React and performance optimization.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Priya Sharma",
      role: "Head of Security",
      bio: "Priya leads our security team to ensure compliance with global standards. Her background includes roles at Google's security team and as a cybersecurity consultant.",
      image: "/api/placeholder/300/300",
    },
  ];

  const productTeam = [
    {
      name: "James Wilson",
      role: "VP of Product",
      bio: "James oversees our product vision and roadmap. He previously led product teams at Square and was a product advisor to multiple fintech startups.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Sophia Martinez",
      role: "Director of UX",
      bio: "Sophia leads our user experience research and design. Before CodeBlaze, she built user-centered design processes at Affirm and Venmo.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Thomas Gardner",
      role: "Head of Market Research",
      bio: "Thomas identifies market opportunities and shapes our product direction. He previously led market strategy at Klarna and has an MBA from Wharton.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Nina Tanaka",
      role: "Product Lead - Payments",
      bio: "Nina manages our core payments product line. Her experience includes product management roles at PayPal and Mastercard focusing on digital payments.",
      image: "/api/placeholder/300/300",
    },
  ];

  const growthTeam = [
    {
      name: "Victor Okonkwo",
      role: "VP of Sales & Growth",
      bio: "Victor drives our business development and partnership strategy. Previously, he led enterprise sales at Stripe and built strategic partnerships at Worldpay.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Lisa Chen",
      role: "Head of Marketing",
      bio: "Lisa oversees our brand and marketing initiatives. Her background includes leadership positions at Adyen and Visa where she drove global marketing campaigns.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Carlos Mendez",
      role: "Director of Customer Success",
      bio: "Carlos ensures our clients maximize value from our platform. He previously built customer success programs at Square and Braintree.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Hannah Williams",
      role: "International Expansion Lead",
      bio: "Hannah manages our global market entry strategy. Before CodeBlaze, she led regional expansion for Adyen across Asia-Pacific and Latin America.",
      image: "/api/placeholder/300/300",
    },
  ];

  const getActiveTeam = () => {
    switch (activeTab) {
      case "leadership":
        return leadershipTeam;
      case "engineering":
        return engineeringTeam;
      case "product":
        return productTeam;
      case "growth":
        return growthTeam;
      default:
        return leadershipTeam;
    }
  };

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
          brings together decades of experience from fintech, engineering,
          product design, and business development.
        </p>
      </div>

      <div className="team-tabs">
        <button
          className={`tab ${activeTab === "leadership" ? "active" : ""}`}
          onClick={() => setActiveTab("leadership")}
          style={
            activeTab === "leadership"
              ? { borderColor: primaryColor, color: primaryColor }
              : {}
          }
        >
          Leadership
        </button>
        <button
          className={`tab ${activeTab === "engineering" ? "active" : ""}`}
          onClick={() => setActiveTab("engineering")}
          style={
            activeTab === "engineering"
              ? { borderColor: primaryColor, color: primaryColor }
              : {}
          }
        >
          Engineering
        </button>
        <button
          className={`tab ${activeTab === "product" ? "active" : ""}`}
          onClick={() => setActiveTab("product")}
          style={
            activeTab === "product"
              ? { borderColor: primaryColor, color: primaryColor }
              : {}
          }
        >
          Product
        </button>
        <button
          className={`tab ${activeTab === "growth" ? "active" : ""}`}
          onClick={() => setActiveTab("growth")}
          style={
            activeTab === "growth"
              ? { borderColor: primaryColor, color: primaryColor }
              : {}
          }
        >
          Growth
        </button>
      </div>

      <div className="team-grid">
        {getActiveTeam().map((member, index) => (
          <div className="team-member" key={index}>
            <div className="member-image-container">
              <div
                className="member-image"
                style={{ backgroundImage: `url(${member.image})` }}
              ></div>
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

      <div className="join-team-banner">
        <div className="banner-content">
          <h2>
            Join Our <span style={{ color: primaryColor }}>Team</span>
          </h2>
          <p>
            We're always looking for talented individuals who are passionate
            about fintech and creating exceptional digital experiences.
          </p>
          <a
            href="/careers"
            className="join-team-button"
            style={{ backgroundColor: primaryColor }}
          >
            View Open Positions
          </a>
        </div>
        <div
          className="banner-accent"
          style={{ backgroundColor: primaryColor, opacity: 0.1 }}
        ></div>
      </div>

      <style jsx>{`
        .team-container {
          padding: 2rem 5%;
          max-width: 100%; /* Changed from 1200px */
          margin: 0 auto;
        }

        .team-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .team-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .team-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .team-title {
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

        .team-subtitle {
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.9;
        }

        .team-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          border: 2px solid transparent;
          border-radius: 30px;
          background: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          color: ${theme === "dark" ? "#fff" : "#333"};
        }

        .tab:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .team-member {
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
        }

        .team-member:hover {
          transform: translateY(-5px);
        }

        .member-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .member-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .team-member:hover .member-image {
          transform: scale(1.05);
        }

        .image-accent {
          position: absolute;
          width: 100%;
          height: 5px;
          bottom: 0;
          left: 0;
        }

        .member-info {
          padding: 1.5rem;
        }

        .member-name {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .member-role {
          margin: 0.3rem 0 1rem;
          font-weight: 500;
        }

        .member-bio {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .join-team-banner {
          padding: 3rem;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
        }

        .banner-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .banner-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .banner-content p {
          max-width: 600px;
          margin: 0 auto 2rem;
          opacity: 0.9;
        }

        .banner-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .join-team-button {
          display: inline-block;
          padding: 0.75rem 2rem;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .join-team-button:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .team-tabs {
            gap: 0.5rem;
          }

          .tab {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .join-team-banner {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default OurTeamPage; // Renamed export
