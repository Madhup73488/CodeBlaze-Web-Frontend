import React from "react";
import aboutUsImage from '../../../assets/images/codeblaze_about_us.png';

function AboutUsPage({ theme }) { // Renamed component
  const primaryColor = theme === "dark" ? "#f97316" : "#a855f7";

  return (
    <div className={`about-us-container ${theme}`}>
      <div className="about-header">
        <h1 className="about-title">
          About <span style={{ color: primaryColor }}>Us</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
      </div>

      <section className="about-content">
        <div className="about-image-container">
          <div className="about-image"></div>
          <div
            className="image-accent"
            style={{ backgroundColor: primaryColor }}
          ></div>
        </div>

        <div className="about-text">
          <h2>
            Pioneering{" "}
            <span style={{ color: primaryColor }}>Digital Solutions</span> Since
            2025
          </h2>

          <p>
            CodeBlaze was founded in 2025 with a singular vision: to transform how
            businesses in India interact with technology. Starting as a passionate
            team, we are dedicated to becoming a trusted technology partner for
            startups and established companies across the nation.
          </p>

          <p>
            Our journey began when our founders recognized a critical gap in the
            market – the need for bespoke software solutions tailored to unique
            business challenges. What started as a commitment to client success
            has evolved into a comprehensive suite of software development
            services and custom digital tools that empower businesses across India.
          </p>

          <p>
            Today, CodeBlaze stands at the intersection of innovation and
            reliability. We are focused on delivering impactful software
            projects for our clients across various industries within India,
            supported by our dedicated team of 30+ talented individuals who share
            our commitment to excellence.
          </p>

          <div className="stats-container">
            <div className="stat-box">
              <span className="stat-number" style={{ color: primaryColor }}>
                30+
              </span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat-box">
              <span className="stat-number" style={{ color: primaryColor }}>
                India
              </span>
              <span className="stat-label">Primary Market</span>
            </div>
            <div className="stat-box">
              <span className="stat-number" style={{ color: primaryColor }}>
                50+
              </span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-box">
              <span className="stat-number" style={{ color: primaryColor }}>
                20+
              </span>
              <span className="stat-label">Clients</span>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <h2 className="timeline-title">
          Our <span style={{ color: primaryColor }}>Journey</span>
        </h2>

        <div className="timeline">
          <div className="timeline-item">
            <div
              className="timeline-dot"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <div className="timeline-content">
              <h3>2025</h3>
              <p>CodeBlaze is founded in India with a mission to deliver exceptional software solutions to local businesses. Our initial team is formed, focusing on client success from day one.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div
              className="timeline-dot"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <div className="timeline-content">
              <h3>Ongoing</h3>
              <p>We are actively working with our initial clients, delivering bespoke software, e-commerce solutions, and payment gateway integrations. Our team is growing, and we're focused on building a strong reputation for quality and innovation within the Indian market.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-us-container {
          padding: 2rem 5%;
          max-width: 100%; /* Changed from 1200px */
          margin: 0 auto;
        }

        .about-us-container.dark {
          background-color: #111827;
          color: #ffffff;
        }

        .about-us-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .about-header {
          margin-bottom: 3rem;
          position: relative;
          display: inline-block;
        }

        .about-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .accent-line {
          height: 4px;
          width: 60%;
          border-radius: 2px;
        }

        .about-content {
          display: flex;
          gap: 3rem;
          margin-bottom: 5rem;
        }

        .about-image-container {
          flex: 1;
          position: relative;
          min-height: 400px;
        }

        .about-image {
          width: 100%;
          height: 100%;
          background-image: url(${aboutUsImage});
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .image-accent {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          top: 20px;
          left: 20px;
          z-index: -1;
          opacity: 0.3;
        }

        .about-text {
          flex: 1;
        }

        .about-text h2 {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .about-text p {
          margin-bottom: 1.2rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 1rem;
          border-radius: 8px;
          background-color: ${theme === "dark" ? "#1f2937" : "#f8f8f8"};
          transition: transform 0.3s ease;
        }

        .stat-box:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .timeline-section {
          margin-top: 5rem;
        }

        .timeline-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 3rem;
          text-align: center;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline:before {
          content: "";
          position: absolute;
          width: 2px;
          background-color: ${theme === "dark" ? "#333" : "#ddd"};
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1px;
        }

        .timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          box-sizing: border-box;
        }

        .timeline-item:nth-child(odd) {
          left: 0;
        }

        .timeline-item:nth-child(even) {
          left: 50%;
        }

        .timeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          position: absolute;
          right: -8px;
          top: 15px;
        }

        .timeline-item:nth-child(even) .timeline-dot {
          left: -8px;
        }

        .timeline-content {
          padding: 20px;
          background-color: ${theme === "dark" ? "#1f2937" : "#f8f8f8"};
          border-radius: 8px;
          position: relative;
        }

        .timeline-content h3 {
          margin: 0 0 10px 0;
          color: ${primaryColor};
        }

        .timeline-content p {
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
          }

          .about-image-container {
            min-height: 300px;
          }

          .timeline:before {
            left: 40px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 20px;
          }

          .timeline-item:nth-child(even) {
            left: 0;
          }

          .timeline-dot {
            left: 32px;
            right: auto;
          }

          .timeline-item:nth-child(even) .timeline-dot {
            left: 32px;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutUsPage; // Renamed export
