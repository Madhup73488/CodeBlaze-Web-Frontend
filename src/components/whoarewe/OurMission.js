import React from "react";

function OurMission({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  return (
    <div className={`mission-container ${theme}`}>
      <div className="mission-header">
        <h1 className="mission-title">
          Our <span style={{ color: primaryColor }}>Mission</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
      </div>

      <section className="mission-statement">
        <div className="statement-container">
          <div className="statement-quote">
            <div className="quote-mark" style={{ color: primaryColor }}>
              ❝
            </div>
            <p className="quote-text">
              To empower businesses of all sizes with seamless, secure, and
              innovative payment solutions that accelerate growth and transform
              digital commerce.
            </p>
            <div className="quote-mark closing" style={{ color: primaryColor }}>
              ❞
            </div>
          </div>
        </div>
      </section>

      <section className="mission-pillars">
        <div className="pillar">
          <div
            className="pillar-icon"
            style={{ backgroundColor: primaryColor }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3 className="pillar-title">Excellence</h3>
          <p className="pillar-text">
            We're committed to building products that exceed expectations. Our
            rigorous standards ensure reliability, security, and performance at
            every touchpoint.
          </p>
        </div>

        <div className="pillar">
          <div
            className="pillar-icon"
            style={{ backgroundColor: primaryColor }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
          <h3 className="pillar-title">Innovation</h3>
          <p className="pillar-text">
            We constantly push boundaries to develop cutting-edge payment
            technologies. By anticipating market needs, we create solutions that
            shape the future of digital transactions.
          </p>
        </div>

        <div className="pillar">
          <div
            className="pillar-icon"
            style={{ backgroundColor: primaryColor }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className="pillar-title">Inclusion</h3>
          <p className="pillar-text">
            We believe financial technology should be accessible to all. Our
            solutions are designed to bridge gaps and create opportunities for
            businesses regardless of size or geography.
          </p>
        </div>

        <div className="pillar">
          <div
            className="pillar-icon"
            style={{ backgroundColor: primaryColor }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3 className="pillar-title">Security</h3>
          <p className="pillar-text">
            Trust is our foundation. We implement the highest security standards
            to protect sensitive information and provide peace of mind in every
            transaction.
          </p>
        </div>
      </section>

      <section className="impact-section">
        <div className="impact-header">
          <h2 className="impact-title">
            Our <span style={{ color: primaryColor }}>Impact</span>
          </h2>
          <p className="impact-subtitle">
            We measure our success not just by our business growth, but by the
            tangible difference we make for businesses and communities
            worldwide.
          </p>
        </div>

        <div className="impact-stats">
          <div className="impact-stat">
            <div className="stat-number" style={{ color: primaryColor }}>
              $5B+
            </div>
            <div className="stat-label">Processed Annually</div>
            <p className="stat-description">
              Facilitating commerce and growth for businesses across 30+
              countries.
            </p>
          </div>

          <div className="impact-stat">
            <div className="stat-number" style={{ color: primaryColor }}>
              15,000+
            </div>
            <div className="stat-label">Businesses Empowered</div>
            <p className="stat-description">
              From startups to enterprises, helping companies of all sizes
              thrive.
            </p>
          </div>

          <div className="impact-stat">
            <div className="stat-number" style={{ color: primaryColor }}>
              99.99%
            </div>
            <div className="stat-label">System Uptime</div>
            <p className="stat-description">
              Ensuring reliability when businesses need it most.
            </p>
          </div>

          <div className="impact-stat">
            <div className="stat-number" style={{ color: primaryColor }}>
              40%
            </div>
            <div className="stat-label">Average Growth</div>
            <p className="stat-description">
              Our clients experience significant revenue increases after
              implementation.
            </p>
          </div>
        </div>

        <div className="impact-stories">
          <h3 className="stories-title">
            Success <span style={{ color: primaryColor }}>Stories</span>
          </h3>

          <div className="story-cards">
            <div className="story-card">
              <div className="story-content">
                <h4 className="story-business">GreenGrocer Market</h4>
                <p className="story-text">
                  "CodeBlaze helped us transition from a single-location store
                  to a nationwide e-commerce operation. Their payment
                  infrastructure scaled with us every step of the way, handling
                  our growth from 50 to 5,000 daily transactions without a
                  hitch."
                </p>
                <p className="story-author">— Jamie Chen, CEO</p>
              </div>
              <div
                className="story-accent"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>

            <div className="story-card">
              <div className="story-content">
                <h4 className="story-business">Nomad Travel App</h4>
                <p className="story-text">
                  "Expanding to international markets seemed daunting until we
                  found CodeBlaze. Their multi-currency support and local
                  payment methods integration helped us enter 12 new markets in
                  just 6 months, doubling our user base."
                </p>
                <p className="story-author">— Sofia Rodriguez, CTO</p>
              </div>
              <div
                className="story-accent"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="commitment-section">
        <div className="commitment-header">
          <h2 className="commitment-title">
            Our <span style={{ color: primaryColor }}>Commitment</span>
          </h2>
          <div
            className="accent-line"
            style={{ backgroundColor: primaryColor }}
          ></div>
        </div>

        <div className="commitment-content">
          <div className="commitment-image">
            <img src="/api/placeholder/500/300" alt="Team working together" />
            <div
              className="image-accent"
              style={{ backgroundColor: primaryColor }}
            ></div>
          </div>
          <div className="commitment-text">
            <p>
              As we look to the future, we remain steadfast in our commitment to
              revolutionizing digital payments. We're investing in emerging
              technologies like blockchain, AI-powered fraud detection, and
              seamless omnichannel experiences.
            </p>
            <p>
              Beyond technology, we're committed to responsible business
              practices. Through our CodeBlaze Foundation, we're working to
              increase financial literacy and expand access to digital financial
              tools in underserved communities.
            </p>
            <p>
              Our mission extends beyond profit – we aim to create a more
              inclusive, efficient, and secure financial ecosystem that benefits
              businesses and consumers alike.
            </p>
            <a
              href="/about/initiatives"
              className="learn-more-btn"
              style={{ backgroundColor: primaryColor }}
            >
              Learn About Our Initiatives
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .mission-container {
          padding: 2rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .mission-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .mission-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .mission-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .mission-title {
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

        .mission-statement {
          margin-bottom: 4rem;
        }

        .statement-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .statement-quote {
          position: relative;
          padding: 2rem;
          text-align: center;
        }

        .quote-mark {
          font-size: 4rem;
          line-height: 1;
          position: absolute;
          top: -0.5rem;
          left: 0;
        }

        .quote-mark.closing {
          top: auto;
          left: auto;
          right: 0;
          bottom: -2rem;
        }

        .quote-text {
          font-size: 1.5rem;
          line-height: 1.6;
          font-weight: 500;
        }

        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .pillar {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          transition: transform 0.3s ease;
        }

        .pillar:hover {
          transform: translateY(-5px);
        }

        .pillar-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .pillar-icon svg {
          width: 30px;
          height: 30px;
          color: white;
        }

        .pillar-title {
          margin: 0 0 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .pillar-text {
          margin: 0;
          line-height: 1.6;
          opacity: 0.9;
        }

        .impact-section {
          margin-bottom: 5rem;
        }

        .impact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .impact-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .impact-subtitle {
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
          line-height: 1.6;
        }

        .impact-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .impact-stat {
          padding: 2rem;
          text-align: center;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .stat-description {
          margin: 0;
          opacity: 0.9;
          line-height: 1.5;
        }

        .impact-stories {
          margin-bottom: 2rem;
        }

        .stories-title {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .story-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .story-card {
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
        }

        .story-content {
          padding: 2rem;
        }

        .story-business {
          margin: 0 0 1rem;
          font-size: 1.2rem;
        }

        .story-text {
          margin: 0 0 1.5rem;
          line-height: 1.6;
          font-style: italic;
          opacity: 0.9;
        }

        .story-author {
          margin: 0;
          font-weight: 600;
          text-align: right;
        }

        .story-accent {
          height: 5px;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .commitment-section {
          margin-bottom: 3rem;
        }

        .commitment-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .commitment-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .commitment-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          align-items: center;
        }

        .commitment-image {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .commitment-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .image-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 5px;
          width: 100%;
        }

        .commitment-text p {
          margin: 0 0 1.5rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .learn-more-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .learn-more-btn:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .quote-text {
            font-size: 1.2rem;
          }

          .commitment-content {
            grid-template-columns: 1fr;
          }

          .commitment-image {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default OurMission;
