import React from "react";

function OurValuesPage({ theme, color }) { // Renamed component
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  const values = [
    {
      title: "Trust",
      description:
        "We build our relationships on a foundation of reliability, transparency, and integrity. Every transaction, interaction, and decision is guided by our commitment to earning and maintaining our customers' trust.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
      ),
    },
    {
      title: "Innovation",
      description:
        "We embrace creativity and forward-thinking to pioneer solutions that transform the payments landscape. By challenging conventions and exploring new technologies, we create products that anticipate tomorrow's needs.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 16l4-4-4-4-4 4 4 4z"></path>
          <path d="M21 12h-6"></path>
          <path d="M9 12H3"></path>
          <path d="M12 3v6"></path>
          <path d="M12 15v6"></path>
        </svg>
      ),
    },
    {
      title: "Accessibility",
      description:
        "We believe financial technology should empower everyone. We design our products to be understandable, usable, and beneficial to businesses of all sizes across diverse industries and regions.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
    },
    {
      title: "Excellence",
      description:
        "We pursue the highest quality in everything we do. From code quality to customer service, we set ambitious standards and continuously refine our processes to deliver exceptional experiences.",
      icon: (
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
      ),
    },
    {
      title: "Collaboration",
      description:
        "We believe the best solutions emerge from diverse perspectives working together. We foster a culture of teamwork internally and build meaningful partnerships externally to create ecosystem-wide value.",
      icon: (
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
      ),
    },
    {
      title: "Responsibility",
      description:
        "We recognize our role in the financial ecosystem and the trust placed in us. We operate with strong ethical principles, security-first thinking, and a commitment to sustainable business practices.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className={`values-container ${theme}`}>
      <div className="values-header">
        <h1 className="values-title">
          Our <span style={{ color: primaryColor }}>Values</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="values-subtitle">
          At CodeBlaze, our values aren't just words on a wall - they're the
          principles that guide every decision we make and shape how we build
          our products, serve our customers, and grow our team.
        </p>
      </div>

      <div className="values-grid">
        {values.map((value, index) => (
          <div className="value-card" key={index}>
            <div
              className="value-icon"
              style={{ backgroundColor: primaryColor }}
            >
              {value.icon}
            </div>
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </div>
        ))}
      </div>

      <div className="values-in-action">
        <div className="action-header">
          <h2 className="action-title">
            Values in <span style={{ color: primaryColor }}>Action</span>
          </h2>
          <div
            className="accent-line"
            style={{ backgroundColor: primaryColor }}
          ></div>
        </div>

        <div className="action-grid">
          <div className="action-item">
            <div className="action-number" style={{ color: primaryColor }}>
              01
            </div>
            <h3 className="action-item-title">Transparent Pricing</h3>
            <p className="action-item-description">
              We believe in clear, straightforward pricing with no hidden fees.
              Our pricing models are designed to scale with your business,
              ensuring alignment between your success and ours.
            </p>
          </div>

          <div className="action-item">
            <div className="action-number" style={{ color: primaryColor }}>
              02
            </div>
            <h3 className="action-item-title">Open Developer Ecosystem</h3>
            <p className="action-item-description">
              We maintain comprehensive documentation, open-source tools, and
              developer communities that make our platform accessible to
              developers with varying levels of expertise.
            </p>
          </div>

          <div className="action-item">
            <div className="action-number" style={{ color: primaryColor }}>
              03
            </div>
            <h3 className="action-item-title">Security First Approach</h3>
            <p className="action-item-description">
              We invest heavily in security infrastructure and compliance. Our
              regular third-party audits, bug bounty programs, and security
              education initiatives reflect our commitment to safeguarding
              sensitive data.
            </p>
          </div>

          <div className="action-item">
            <div className="action-number" style={{ color: primaryColor }}>
              04
            </div>
            <h3 className="action-item-title">Global Inclusion Initiative</h3>
            <p className="action-item-description">
              Our platform supports multiple currencies, payment methods, and
              languages to serve businesses across diverse markets. We design
              with cultural nuances in mind to create truly global solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="quote-banner" style={{ borderColor: primaryColor }}>
        <div className="quote-content">
          <div className="quote-mark" style={{ color: primaryColor }}>
            ❝
          </div>
          <p className="quote-text">
            Our values aren't aspirational — they're operational. They guide how
            we build our products, how we interact with our customers, and how
            we make difficult decisions. They're the foundation upon which
            CodeBlaze is built.
          </p>
          <div className="quote-attribution">
            <strong>Alexandra Chen</strong>, CEO & Co-Founder
          </div>
        </div>
      </div>

      <style jsx>{`
        .values-container {
          padding: 2rem 5%;
          max-width: 100%; /* Changed from 1200px */
          margin: 0 auto;
        }

        .values-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .values-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .values-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .values-title {
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

        .values-subtitle {
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.9;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .value-card {
          padding: 2rem;
          border-radius: 10px;
          transition: transform 0.3s ease;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .value-card:hover {
          transform: translateY(-5px);
        }

        .value-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
        }

        .value-icon svg {
          width: 30px;
          height: 30px;
        }

        .value-title {
          margin: 0 0 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .value-description {
          margin: 0;
          line-height: 1.6;
          opacity: 0.9;
        }

        .values-in-action {
          margin-bottom: 4rem;
        }

        .action-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .action-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        .action-item {
          padding: 1.5rem;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
        }

        .action-number {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .action-item-title {
          margin: 0 0 1rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .action-item-description {
          margin: 0;
          line-height: 1.6;
          opacity: 0.9;
        }

        .quote-banner {
          padding: 3rem;
          border-radius: 10px;
          border-left: 5px solid;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          margin-bottom: 2rem;
        }

        .quote-content {
          position: relative;
          padding: 0 2rem;
        }

        .quote-mark {
          font-size: 3rem;
          line-height: 1;
          position: absolute;
          top: -1.5rem;
          left: -1rem;
        }

        .quote-text {
          font-size: 1.2rem;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .quote-attribution {
          text-align: right;
        }

        @media (max-width: 768px) {
          .values-grid,
          .action-grid {
            grid-template-columns: 1fr;
          }

          .quote-banner {
            padding: 2rem 1.5rem;
          }

          .quote-content {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default OurValuesPage; // Renamed export
