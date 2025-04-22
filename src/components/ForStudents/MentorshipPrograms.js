import React, { useState } from "react";

function MentorshipPrograms({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [activeCategory, setActiveCategory] = useState("career");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "career", name: "Career Development" },
    { id: "leadership", name: "Leadership Skills" },
    { id: "technical", name: "Technical Expertise" },
    { id: "entrepreneurship", name: "Entrepreneurship" },
    { id: "personal", name: "Personal Growth" },
  ];

  const programs = {
    career: [
      {
        title: "Career Pathfinder Program",
        description:
          "A 12-week structured program designed to help professionals at any stage define clear career goals and create actionable plans to achieve them. Includes resume reviews, interview preparation, and networking strategies.",
        duration: "12 weeks",
        commitment: "3-4 hours weekly",
      },
      {
        title: "Industry Transition Accelerator",
        description:
          "Specialized mentorship for professionals looking to pivot industries or roles. Our mentors have successfully navigated career transitions and provide targeted guidance to help you leverage your transferable skills.",
        duration: "6 months",
        commitment: "5 hours weekly",
      },
      {
        title: "Executive Career Advancement",
        description:
          "Tailored for mid-to-senior level professionals seeking to accelerate their path to executive positions. Focus on strategic visibility, executive presence, and high-impact leadership skills.",
        duration: "9 months",
        commitment: "4 hours weekly",
      },
    ],
    leadership: [
      {
        title: "Emerging Leaders Program",
        description:
          "Designed for high-potential individual contributors transitioning to their first leadership role. Develop essential management skills, emotional intelligence, and team-building capabilities.",
        duration: "16 weeks",
        commitment: "4-5 hours weekly",
      },
      {
        title: "Advanced Leadership Mastery",
        description:
          "For experienced managers looking to enhance their leadership effectiveness. Focus on strategic thinking, organizational influence, conflict resolution, and building high-performing teams.",
        duration: "6 months",
        commitment: "6 hours weekly",
      },
      {
        title: "Inclusive Leadership Development",
        description:
          "Learn to build and lead diverse teams while fostering belonging and equity. Develop cultural competence and strategies for creating psychologically safe environments where all team members can thrive.",
        duration: "3 months",
        commitment: "3 hours weekly",
      },
    ],
    technical: [
      {
        title: "Tech Stack Accelerator",
        description:
          "Intensive mentorship in modern development technologies. Personalized guidance from industry experts to help you master specific programming languages, frameworks, or technology stacks relevant to your career goals.",
        duration: "4 months",
        commitment: "8 hours weekly",
      },
      {
        title: "Tech Leadership Transition",
        description:
          "For technical professionals moving into tech leadership roles. Balance technical expertise with people management skills, technical decision-making, and strategic technology planning.",
        duration: "6 months",
        commitment: "5 hours weekly",
      },
      {
        title: "Architecture & Systems Design",
        description:
          "Advanced program for experienced developers looking to grow into architect roles. Focus on system design principles, scalability, performance optimization, and architectural decision-making.",
        duration: "5 months",
        commitment: "6 hours weekly",
      },
    ],
    entrepreneurship: [
      {
        title: "Startup Founder Mentorship",
        description:
          "Comprehensive support for early-stage founders. Work with successful entrepreneurs who provide guidance on product-market fit, fundraising, team building, and scaling operations.",
        duration: "6 months",
        commitment: "8 hours weekly",
      },
      {
        title: "Business Growth Accelerator",
        description:
          "For established business owners looking to scale. Strategic mentorship on operational efficiency, market expansion, capital management, and sustainable growth strategies.",
        duration: "12 months",
        commitment: "5 hours weekly",
      },
      {
        title: "Innovation Catalyst Program",
        description:
          "Designed for corporate innovators and intrapreneurs. Learn to champion new ideas, navigate organizational complexity, and bring innovative solutions to market within established companies.",
        duration: "4 months",
        commitment: "4 hours weekly",
      },
    ],
    personal: [
      {
        title: "Work-Life Harmony",
        description:
          "Achieve balance between professional ambitions and personal wellbeing. Focus on time management, boundary setting, stress reduction, and creating sustainable success without burnout.",
        duration: "3 months",
        commitment: "2 hours weekly",
      },
      {
        title: "Communication Excellence",
        description:
          "Master the art of clear, persuasive communication. Develop skills in public speaking, executive presentations, difficult conversations, and authentic personal branding.",
        duration: "10 weeks",
        commitment: "3 hours weekly",
      },
      {
        title: "Resilience & Adaptability",
        description:
          "Build mental toughness and flexibility in the face of change and challenge. Develop strategies for navigating uncertainty, overcoming setbacks, and thriving in dynamic environments.",
        duration: "8 weeks",
        commitment: "3 hours weekly",
      },
    ],
  };

  const filteredPrograms = searchQuery
    ? Object.values(programs)
        .flat()
        .filter(
          (program) =>
            program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            program.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
    : programs[activeCategory];

  return (
    <div className={`mentorship-container ${theme}`}>
      <div className="mentorship-header">
        <h1 className="mentorship-title">
          Mentorship <span style={{ color: primaryColor }}>Programs</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="mentorship-subtitle">
          Accelerate your growth with personalized guidance from industry
          experts who have walked the path you aspire to follow.
        </p>
      </div>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search programs..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </section>

      <section className="programs-section">
        {!searchQuery && (
          <div className="program-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
                style={
                  activeCategory === category.id
                    ? { borderColor: primaryColor, color: primaryColor }
                    : {}
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        <div className="programs-grid">
          {searchQuery && filteredPrograms.length === 0 ? (
            <div className="no-results">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="no-results-icon"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>No programs found</h3>
              <p>Try different keywords or browse our categories</p>
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
                style={{ color: primaryColor }}
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredPrograms.map((program, index) => (
              <div className="program-card" key={index}>
                <h3 className="program-title">{program.title}</h3>
                <p className="program-description">{program.description}</p>
                <div className="program-details">
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="detail-text">
                      <strong>Duration:</strong> {program.duration}
                    </span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span className="detail-text">
                      <strong>Commitment:</strong> {program.commitment}
                    </span>
                  </div>
                </div>
                <button
                  className="apply-button"
                  style={{ backgroundColor: primaryColor }}
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="process-section">
        <div className="process-header">
          <h2 className="process-title">
            How Our{" "}
            <span style={{ color: primaryColor }}>Mentorship Works</span>
          </h2>
          <p className="process-subtitle">
            We've designed a structured approach to ensure you get the most from
            your mentorship experience.
          </p>
        </div>

        <div className="process-steps">
          <div className="process-step">
            <div
              className="step-number"
              style={{ backgroundColor: primaryColor }}
            >
              1
            </div>
            <h3 className="step-title">Application & Matching</h3>
            <p className="step-description">
              Submit your application with your goals and preferences. Our team
              carefully matches you with the ideal mentor based on your specific
              needs and aspirations.
            </p>
          </div>

          <div className="process-step">
            <div
              className="step-number"
              style={{ backgroundColor: primaryColor }}
            >
              2
            </div>
            <h3 className="step-title">Goal Setting</h3>
            <p className="step-description">
              Work with your mentor to establish clear, measurable objectives
              for your mentorship period. Develop a personalized roadmap
              tailored to your unique situation.
            </p>
          </div>

          <div className="process-step">
            <div
              className="step-number"
              style={{ backgroundColor: primaryColor }}
            >
              3
            </div>
            <h3 className="step-title">Regular Sessions</h3>
            <p className="step-description">
              Engage in scheduled one-on-one sessions with your mentor, receive
              assignments, and access resources designed to accelerate your
              progress toward your goals.
            </p>
          </div>

          <div className="process-step">
            <div
              className="step-number"
              style={{ backgroundColor: primaryColor }}
            >
              4
            </div>
            <h3 className="step-title">Growth & Evaluation</h3>
            <p className="step-description">
              Track your progress with regular check-ins and adjustments to your
              plan. Celebrate milestones and adapt strategies as you develop new
              skills and insights.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            Success <span style={{ color: primaryColor }}>Stories</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <svg
                className="quote-icon"
                viewBox="0 0 24 24"
                fill={primaryColor}
                opacity="0.2"
                width="48"
                height="48"
              >
                <path d="M3.691 6.292C5.094 4.771 7.217 4 10.06 4v2.458c-1.782 0-3.292.271-4.53.817-1.237.546-1.856 1.363-1.856 2.45 0 .546.227.908.681 1.09.454.182.908.273 1.363.273.727 0 1.363-.273 1.91-.817.545-.546.817-1.237.817-2.077 0-.909-.272-1.637-.817-2.186A2.685 2.685 0 0 0 5.6 5.09V4c.909 0 1.73.182 2.462.545.731.363 1.376.909 1.933 1.637a4.35 4.35 0 0 1 1.09 2.98c0 1.237-.454 2.29-1.363 3.163-.909.87-2 1.306-3.272 1.306-1.41 0-2.619-.499-3.619-1.499S1.333 9.543 1.333 8.096c0-.667.166-1.333.499-2 .333-.668.939-1.258 1.86-1.772v1.968zm11.361 0C16.455 4.771 18.578 4 21.422 4v2.458c-1.783 0-3.293.271-4.53.817-1.237.546-1.856 1.363-1.856 2.45 0 .546.227.908.68 1.09.454.182.908.273 1.363.273.727 0 1.363-.273 1.91-.817.545-.546.817-1.237.817-2.077 0-.909-.272-1.637-.817-2.186a2.685 2.685 0 0 0-2.027-.919V4c.909 0 1.73.182 2.458.545.728.363 1.376.909 1.931 1.637.556.728.831 1.73.831 3.007 0 1.237-.451 2.29-1.356 3.163-.908.87-2 1.306-3.273 1.306-1.409 0-2.618-.499-3.618-1.499s-1.499-2.29-1.499-3.736c0-.667.166-1.333.499-2 .334-.668.94-1.258 1.86-1.772v1.968z" />
              </svg>
              <p className="testimonial-text">
                The Leadership Mastery program transformed how I approach team
                management. My mentor provided invaluable insights that helped
                me navigate complex organizational challenges and ultimately led
                to my promotion to Director level.
              </p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{ backgroundColor: primaryColor }}
                >
                  JD
                </div>
                <div className="author-info">
                  <h4 className="author-name">Jennifer Dawson</h4>
                  <p className="author-title">
                    Director of Operations, TechStream Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <svg
                className="quote-icon"
                viewBox="0 0 24 24"
                fill={primaryColor}
                opacity="0.2"
                width="48"
                height="48"
              >
                <path d="M3.691 6.292C5.094 4.771 7.217 4 10.06 4v2.458c-1.782 0-3.292.271-4.53.817-1.237.546-1.856 1.363-1.856 2.45 0 .546.227.908.681 1.09.454.182.908.273 1.363.273.727 0 1.363-.273 1.91-.817.545-.546.817-1.237.817-2.077 0-.909-.272-1.637-.817-2.186A2.685 2.685 0 0 0 5.6 5.09V4c.909 0 1.73.182 2.462.545.731.363 1.376.909 1.933 1.637a4.35 4.35 0 0 1 1.09 2.98c0 1.237-.454 2.29-1.363 3.163-.909.87-2 1.306-3.272 1.306-1.41 0-2.619-.499-3.619-1.499S1.333 9.543 1.333 8.096c0-.667.166-1.333.499-2 .333-.668.939-1.258 1.86-1.772v1.968zm11.361 0C16.455 4.771 18.578 4 21.422 4v2.458c-1.783 0-3.293.271-4.53.817-1.237.546-1.856 1.363-1.856 2.45 0 .546.227.908.68 1.09.454.182.908.273 1.363.273.727 0 1.363-.273 1.91-.817.545-.546.817-1.237.817-2.077 0-.909-.272-1.637-.817-2.186a2.685 2.685 0 0 0-2.027-.919V4c.909 0 1.73.182 2.458.545.728.363 1.376.909 1.931 1.637.556.728.831 1.73.831 3.007 0 1.237-.451 2.29-1.356 3.163-.908.87-2 1.306-3.273 1.306-1.409 0-2.618-.499-3.618-1.499s-1.499-2.29-1.499-3.736c0-.667.166-1.333.499-2 .334-.668.94-1.258 1.86-1.772v1.968z" />
              </svg>
              <p className="testimonial-text">
                As a first-time founder, the Startup Mentorship program was
                exactly what I needed. My mentor helped me refine my business
                model, prepare for investor meetings, and avoid common pitfalls.
                We secured our seed funding within 3 months of completing the
                program.
              </p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{ backgroundColor: primaryColor }}
                >
                  MR
                </div>
                <div className="author-info">
                  <h4 className="author-name">Michael Rodriguez</h4>
                  <p className="author-title">
                    Founder & CEO, GreenSpark Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <svg
                className="quote-icon"
                viewBox="0 0 24 24"
                fill={primaryColor}
                opacity="0.2"
                width="48"
                height="48"
              >
                <path d="M3.691 6.292C5.094 4.771 7.217 4 10.06 4v2.458c-1.782 0-3.292.271-4.53.817-1.237.546-1.856 1.363-1.856 2.45 0 .546.227.908.681 1.09.454.182.908.273 1.363.273.727 0 1.363-.273 1.91-.817.545-.546.817-1.237.817-2.077 0-.909-.272-1.637-.817-2.186A2.685 2.685 0 0 0 5.6 5.09V4c.909 0 1.73.182 2.462.545.731.363 1.376.909 1.933 1.637a4.35 4.35 0 0 1 1.09 2.98c0 1.237-.454 2.29-1.363 3.163-.909.87-2 1.306-3.272 1.306-1.41 0-2.619-.499-3.619-1.499S1.333 9.543 1.333 8.096c0-.667.166-1.333.499-2 .333-.668.939-1.258 1.86-1.772v1.968zm11.361 0C16.455 4.771 18.578 4 21.422 4v2.458c-1.783 0-3.293.271-4.53.817-1.237.546-1.856 1.363-1.856 2.45 0 .546.227.908.68 1.09.454.182.908.273 1.363.273.727 0 1.363-.273 1.91-.817.545-.546.817-1.237.817-2.077 0-.909-.272-1.637-.817-2.186a2.685 2.685 0 0 0-2.027-.919V4c.909 0 1.73.182 2.458.545.728.363 1.376.909 1.931 1.637.556.728.831 1.73.831 3.007 0 1.237-.451 2.29-1.356 3.163-.908.87-2 1.306-3.273 1.306-1.409 0-2.618-.499-3.618-1.499s-1.499-2.29-1.499-3.736c0-.667.166-1.333.499-2 .334-.668.94-1.258 1.86-1.772v1.968z" />
              </svg>
              <p className="testimonial-text">
                The Tech Leadership Transition program was exactly what I needed
                to evolve from senior developer to engineering manager. My
                mentor helped me balance technical expertise with people
                management skills, completely transforming my effectiveness as a
                leader.
              </p>
              <div className="testimonial-author">
                <div
                  className="author-avatar"
                  style={{ backgroundColor: primaryColor }}
                >
                  SP
                </div>
                <div className="author-info">
                  <h4 className="author-name">Sarah Patel</h4>
                  <p className="author-title">
                    Engineering Manager, CloudMatrix
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to <span style={{ color: primaryColor }}>Accelerate</span>{" "}
            Your Growth?
          </h2>
          <p className="cta-text">
            Take the first step toward achieving your professional goals with
            personalized mentorship from industry experts.
          </p>
          <button
            className="cta-button"
            style={{ backgroundColor: primaryColor }}
          >
            Apply For Mentorship
          </button>
        </div>
      </section>

      <style jsx>{`
        .mentorship-container {
          padding: 2rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .mentorship-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .mentorship-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .mentorship-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .mentorship-title {
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

        .mentorship-subtitle {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .search-section {
          margin-bottom: 3rem;
        }

        .search-container {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .search-input {
          flex-grow: 1;
          padding: 1rem 1.5rem;
          border-radius: 30px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: ${primaryColor};
          box-shadow: 0 0 0 3px ${primaryColor}33;
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 8px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .search-button:hover {
          opacity: 0.9;
        }

        .search-button svg {
          width: 20px;
          height: 20px;
        }

        .programs-section {
          margin-bottom: 4rem;
        }

        .program-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .category-button {
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: transparent;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-button:hover {
          border-color: ${primaryColor};
          color: ${primaryColor};
        }

        .category-button.active {
          font-weight: 600;
        }

        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .program-card {
          padding: 2rem;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          transition: transform 0.3s ease;
        }

        .program-card:hover {
          transform: translateY(-5px);
        }

        .program-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 1rem;
          color: ${primaryColor};
        }

        .program-description {
          margin: 0 0 1.5rem;
          line-height: 1.6;
        }

        .program-details {
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .detail-icon {
          width: 18px;
          height: 18px;
          margin-right: 0.75rem;
        }

        .detail-text {
          font-size: 0.95rem;
        }

        .apply-button {
          width: 100%;
          padding: 0.75rem;
          border-radius: 30px;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .apply-button:hover {
          opacity: 0.9;
        }

        .no-results {
          text-align: center;
          padding: 3rem 0;
          grid-column: 1 / -1;
        }

        .no-results-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .no-results p {
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .clear-search {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.5rem 1rem;
        }

        .process-section {
          margin-bottom: 4rem;
        }

        .process-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .process-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .process-subtitle {
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .process-step {
          text-align: center;
          padding: 2rem;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          transition: transform 0.3s ease;
        }

        .process-step:hover {
          transform: translateY(-5px);
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .step-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 0.75rem;
        }

        .step-description {
          margin: 0;
          line-height: 1.6;
          opacity: 0.9;
        }

        .testimonials-section {
          margin-bottom: 4rem;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
        }

        .testimonial-content {
          padding: 2rem;
          position: relative;
        }

        .quote-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }

        .testimonial-text {
          margin: 0 0 1.5rem;
          line-height: 1.6;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          margin-right: 1rem;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          margin: 0 0 0.25rem;
          font-weight: 600;
        }

        .author-title {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .cta-section {
          padding: 4rem 2rem;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          text-align: center;
          margin-bottom: 2rem;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }

        .cta-text {
          max-width: 600px;
          margin: 0 auto 2rem;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .cta-button {
          padding: 1rem 2.5rem;
          border-radius: 30px;
          border: none;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .cta-button:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .program-categories {
            flex-direction: column;
            align-items: stretch;
          }

          .process-steps,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .mentorship-title,
          .process-title,
          .testimonials-title,
          .cta-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default MentorshipPrograms;
