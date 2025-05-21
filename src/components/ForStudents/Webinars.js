import React, { useState } from "react";

function Webinars({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Webinars" },
    { id: "tech", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "personal", name: "Personal Development" },
    { id: "health", name: "Health & Wellness" },
  ];

  const webinars = {
    all: [],
    tech: [
      {
        title: "Introduction to Artificial Intelligence",
        speaker: "Dr. Sarah Chen",
        organization: "TechFuture Academy",
        date: "May 15, 2025",
        time: "2:00 PM - 3:30 PM EST",
        price: "Free",
        description:
          "Explore the fundamentals of AI and its applications in various industries. This webinar covers machine learning basics, neural networks, and practical examples of AI implementation.",
        prerequisites:
          "Basic understanding of programming concepts. No prior AI knowledge required.",
        tags: ["AI", "Machine Learning", "Technology"],
        logo: "techfuture",
      },
      {
        title: "Web Development Trends 2025",
        speaker: "Marcus Johnson",
        organization: "CodeCraft Institute",
        date: "May 23, 2025",
        time: "1:00 PM - 2:30 PM EST",
        price: "$15",
        description:
          "Stay updated with the latest web development technologies and practices. This webinar covers emerging frameworks, performance optimization techniques, and accessibility considerations for modern websites.",
        prerequisites:
          "Familiarity with HTML, CSS, and JavaScript. Some experience in web development is helpful.",
        tags: ["Web Development", "Programming", "Frontend"],
        logo: "codecraft",
      },
      {
        title: "Cybersecurity Essentials for Organizations",
        speaker: "Lisa Wong",
        organization: "SecureNet Solutions",
        date: "June 5, 2025",
        time: "11:00 AM - 12:30 PM EST",
        price: "$20",
        description:
          "Learn critical cybersecurity practices to protect your organization from common threats. This webinar covers risk assessment, security protocols, and incident response strategies.",
        prerequisites:
          "Basic IT knowledge. Suitable for IT professionals and business leaders.",
        tags: ["Cybersecurity", "IT Security", "Risk Management"],
        logo: "securenet",
      },
    ],
    business: [
      {
        title: "Digital Marketing Strategies for 2025",
        speaker: "Alex Rivera",
        organization: "Growth Marketing Hub",
        date: "May 18, 2025",
        time: "10:00 AM - 11:30 AM EST",
        price: "$25",
        description:
          "Discover effective digital marketing strategies to grow your business in 2025. Learn about social media trends, SEO best practices, and data-driven marketing approaches.",
        prerequisites:
          "Basic marketing knowledge. Suitable for marketing professionals and business owners.",
        tags: ["Digital Marketing", "SEO", "Social Media"],
        logo: "growthmarketing",
      },
      {
        title: "Financial Planning for Small Businesses",
        speaker: "Robert Chen",
        organization: "Business Finance Academy",
        date: "May 28, 2025",
        time: "3:00 PM - 4:30 PM EST",
        price: "$30",
        description:
          "Learn essential financial planning techniques for small business success. This webinar covers budgeting, cash flow management, and financial forecasting.",
        prerequisites:
          "Basic understanding of business finance. Ideal for small business owners and entrepreneurs.",
        tags: ["Finance", "Business Planning", "Accounting"],
        logo: "businessfinance",
      },
    ],
    design: [
      {
        title: "UI/UX Design Principles",
        speaker: "Emma Rodriguez",
        organization: "Design Mastery",
        date: "May 20, 2025",
        time: "1:00 PM - 2:30 PM EST",
        price: "$20",
        description:
          "Master the principles of effective user interface and user experience design. Learn how to create intuitive, accessible, and visually appealing digital products.",
        prerequisites:
          "Basic design knowledge helpful but not required. Suitable for designers and product managers.",
        tags: ["UI/UX", "Design", "User Experience"],
        logo: "designmastery",
      },
      {
        title: "Responsive Design Workshop",
        speaker: "Daniel Kim",
        organization: "Creative Design Studio",
        date: "June 2, 2025",
        time: "11:00 AM - 1:00 PM EST",
        price: "$25",
        description:
          "A hands-on workshop on creating responsive designs that work across all devices. Learn practical techniques for fluid layouts, flexible images, and media queries.",
        prerequisites:
          "Basic knowledge of HTML and CSS. Bring your laptop to follow along with exercises.",
        tags: ["Responsive Design", "Web Design", "CSS"],
        logo: "creativedesign",
      },
    ],
    personal: [
      {
        title: "Effective Time Management",
        speaker: "Jennifer Taylor",
        organization: "Productivity Plus",
        date: "May 25, 2025",
        time: "12:00 PM - 1:30 PM EST",
        price: "Free",
        description:
          "Learn strategies to maximize your productivity and achieve better work-life balance. This webinar covers prioritization techniques, digital tools, and habit formation.",
        prerequisites: "No prerequisites. Suitable for everyone.",
        tags: ["Time Management", "Productivity", "Personal Development"],
        logo: "productivityplus",
      },
      {
        title: "Public Speaking Mastery",
        speaker: "Michael Washington",
        organization: "Communication Excellence",
        date: "June 8, 2025",
        time: "2:00 PM - 3:30 PM EST",
        price: "$15",
        description:
          "Overcome fear and develop confidence in public speaking. Learn techniques for engaging presentations, managing nervousness, and connecting with your audience.",
        prerequisites:
          "No prerequisites. Beneficial for professionals at all levels.",
        tags: ["Public Speaking", "Communication", "Confidence"],
        logo: "communicationexcellence",
      },
    ],
    health: [
      {
        title: "Workplace Wellness Strategies",
        speaker: "Dr. Amelia Park",
        organization: "Wellness Works",
        date: "May 17, 2025",
        time: "9:00 AM - 10:30 AM EST",
        price: "Free",
        description:
          "Discover practical approaches to maintain physical and mental wellbeing in the workplace. Learn about ergonomics, stress management, and healthy habits for office workers.",
        prerequisites:
          "No prerequisites. Relevant for all working professionals.",
        tags: ["Wellness", "Workplace Health", "Stress Management"],
        logo: "wellnessworks",
      },
      {
        title: "Nutrition for Optimal Performance",
        speaker: "David Martinez, RD",
        organization: "NutriHealth Institute",
        date: "June 10, 2025",
        time: "5:00 PM - 6:30 PM EST",
        price: "$20",
        description:
          "Learn how nutrition affects your energy, focus, and performance. This webinar covers meal planning, nutrient timing, and dietary strategies for busy professionals.",
        prerequisites:
          "No prerequisites. Suitable for anyone interested in improving their diet.",
        tags: ["Nutrition", "Health", "Performance"],
        logo: "nutrihealth",
      },
    ],
  };

  // Populate the "all" category with all webinars
  webinars.all = [
    ...webinars.tech,
    ...webinars.business,
    ...webinars.design,
    ...webinars.personal,
    ...webinars.health,
  ];

  const filteredWebinars = searchQuery
    ? webinars.all.filter(
        (webinar) =>
          webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          webinar.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
          webinar.organization
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          webinar.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          webinar.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : webinars[activeCategory];

  const getLogoPlaceholder = (name) => {
    // Return the first letter of the organization name for logo placeholder
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`webinars-container ${theme}`}>
      <div className="webinars-header">
        <h1 className="webinars-title">
          Educational <span style={{ color: primaryColor }}>Webinars</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="webinars-subtitle">
          Expand your knowledge and skills with our expert-led webinars.
          Register today for live sessions or access our on-demand library.
        </p>
      </div>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for webinars..."
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

      <section className="webinars-section">
        {!searchQuery && (
          <div className="webinar-categories">
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

        <div className="webinars-list">
          {searchQuery && filteredWebinars.length === 0 ? (
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
              <h3>No webinars found</h3>
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
            filteredWebinars.map((webinar, index) => (
              <div className="webinar-card" key={index}>
                <div className="webinar-header">
                  <div
                    className="organization-logo"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {getLogoPlaceholder(webinar.organization)}
                  </div>
                  <div className="webinar-title-info">
                    <h3 className="webinar-title">{webinar.title}</h3>
                    <div className="speaker-name">
                      {webinar.speaker} - {webinar.organization}
                    </div>
                  </div>
                </div>

                <div className="webinar-details">
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{webinar.date}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{webinar.time}</span>
                  </div>
                  <div className="detail-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="detail-icon"
                    >
                      <path d="M12 1v22"></path>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>{webinar.price}</span>
                  </div>
                </div>

                <div className="webinar-description">
                  <p>{webinar.description}</p>
                </div>

                <div className="webinar-prerequisites">
                  <h4>Prerequisites</h4>
                  <p>{webinar.prerequisites}</p>
                </div>

                <div className="webinar-tags">
                  {webinar.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="tag"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="webinar-footer">
                  <button
                    className="details-button"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    More Info
                  </button>
                  <button
                    className="register-button"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">
            Featured <span style={{ color: primaryColor }}>Speakers</span>
          </h2>
        </div>

        <div className="speakers-grid">
          <div className="speaker-card">
            <div
              className="speaker-image"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="speaker-name">Dr. Sarah Chen</h3>
            <p className="speaker-title">AI Research Scientist</p>
            <p className="speaker-bio">
              Leading expert in artificial intelligence with over 15 years of
              experience in machine learning and neural networks.
            </p>
          </div>

          <div className="speaker-card">
            <div
              className="speaker-image"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="speaker-name">Marcus Johnson</h3>
            <p className="speaker-title">Web Development Lead</p>
            <p className="speaker-bio">
              Full-stack developer and educator with expertise in modern
              JavaScript frameworks and performance optimization.
            </p>
          </div>

          <div className="speaker-card">
            <div
              className="speaker-image"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="speaker-name">Jennifer Taylor</h3>
            <p className="speaker-title">Productivity Consultant</p>
            <p className="speaker-bio">
              Bestselling author and coach specialized in time management
              strategies for busy professionals and organizations.
            </p>
          </div>

          <div className="speaker-card">
            <div
              className="speaker-image"
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="speaker-name">Dr. Amelia Park</h3>
            <p className="speaker-title">Wellness Specialist</p>
            <p className="speaker-bio">
              Healthcare professional focusing on corporate wellness programs
              and holistic approaches to workplace health.
            </p>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="resources-header">
          <h2 className="resources-title">
            Learning <span style={{ color: primaryColor }}>Resources</span>
          </h2>
        </div>

        <div className="resources-grid">
          <a href="/webinar-library" className="resource-card">
            <div
              className="resource-icon"
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="resource-title">On-Demand Library</h3>
            <p className="resource-description">
              Access our complete collection of past webinars to learn at your
              own pace
            </p>
          </a>

          <a href="/learning-paths" className="resource-card">
            <div
              className="resource-icon"
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
            <h3 className="resource-title">Learning Paths</h3>
            <p className="resource-description">
              Curated webinar sequences to build your skills in specific areas
              systematically
            </p>
          </a>

          <a href="/download-center" className="resource-card">
            <div
              className="resource-icon"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <h3 className="resource-title">Download Center</h3>
            <p className="resource-description">
              Free guides, worksheets, and supplementary materials from our
              webinars
            </p>
          </a>

          <a href="/certification-tracks" className="resource-card">
            <div
              className="resource-icon"
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
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <h3 className="resource-title">Certification Programs</h3>
            <p className="resource-description">
              Complete series of webinars and earn certificates to showcase your
              expertise
            </p>
          </a>
        </div>
      </section>

      <section className="upcoming-section">
        <div className="upcoming-header">
          <h2 className="upcoming-title">
            Coming <span style={{ color: primaryColor }}>Soon</span>
          </h2>
          <p className="upcoming-subtitle">
            Mark your calendar for these highly anticipated upcoming webinars
          </p>
        </div>

        <div className="upcoming-webinars">
          <div className="timeline">
            <div className="timeline-item">
              <div
                className="timeline-date"
                style={{ borderColor: primaryColor }}
              >
                <span className="month">JUN</span>
                <span className="day">15</span>
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Advanced Data Visualization Techniques
                </h3>
                <p className="timeline-speaker">
                  By Dr. Michael Chang, Data Science Institute
                </p>
                <p className="timeline-description">
                  Learn how to transform complex data into compelling visual
                  stories that drive insights and decision-making.
                </p>
                <button
                  className="reminder-button"
                  style={{ color: primaryColor }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="reminder-icon"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  Set Reminder
                </button>
              </div>
            </div>

            <div className="timeline-item">
              <div
                className="timeline-date"
                style={{ borderColor: primaryColor }}
              >
                <span className="month">JUN</span>
                <span className="day">22</span>
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Sustainable Business Practices
                </h3>
                <p className="timeline-speaker">
                  By Elizabeth Green, Sustainability Consultant
                </p>
                <p className="timeline-description">
                  Discover how implementing sustainable practices can benefit
                  your business while contributing to environmental
                  conservation.
                </p>
                <button
                  className="reminder-button"
                  style={{ color: primaryColor }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="reminder-icon"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  Set Reminder
                </button>
              </div>
            </div>

            <div className="timeline-item">
              <div
                className="timeline-date"
                style={{ borderColor: primaryColor }}
              >
                <span className="month">JUN</span>
                <span className="day">30</span>
              </div>
              <div className="timeline-content">
                <h3 className="timeline-title">
                  Mental Health in the Digital Age
                </h3>
                <p className="timeline-speaker">
                  By Dr. Rebecca Torres, Health Psychology
                </p>
                <p className="timeline-description">
                  Explore strategies for maintaining mental wellbeing while
                  navigating the challenges of our increasingly digital world.
                </p>
                <button
                  className="reminder-button"
                  style={{ color: primaryColor }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="reminder-icon"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .webinars-container {
          padding: 2rem 5%;
          max-width: 100%; /* Changed from 1200px */
          margin: 0 auto;
        }

        .webinars-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .webinars-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .webinars-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .webinars-title {
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

        .webinars-subtitle {
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
          transition: all 0.3s ease;
        }

        .search-button svg {
          width: 18px;
          height: 18px;
        }

        .webinars-section {
          margin-bottom: 4rem;
        }

        .webinar-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .category-button {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 2px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: transparent;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          font-size: 0.9rem;
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

        .webinars-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .webinar-card {
          border-radius: 12px;
          border: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .webinar-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
        }

        .webinar-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .organization-logo {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .webinar-title-info {
          flex: 1;
        }

        .webinar-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.2rem;
          line-height: 1.3;
        }

        .speaker-name {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .webinar-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          padding-top: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .detail-icon {
          width: 16px;
          height: 16px;
          opacity: 0.8;
        }

        .webinar-description {
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .webinar-prerequisites {
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .webinar-prerequisites h4 {
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .webinar-prerequisites p {
          opacity: 0.8;
          line-height: 1.5;
        }

        .webinar-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tag {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          border: 1px solid;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .webinar-footer {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .details-button,
        .register-button {
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .details-button {
          background: transparent;
          border: 1px solid;
          flex: 1;
        }

        .register-button {
          color: white;
          border: none;
          flex: 1;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 1rem;
        }

        .no-results-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .no-results p {
          opacity: 0.8;
          margin-bottom: 1.5rem;
        }

        .clear-search {
          background: transparent;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .featured-section,
        .resources-section,
        .upcoming-section {
          margin-bottom: 4rem;
        }

        .featured-header,
        .resources-header,
        .upcoming-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .featured-title,
        .resources-title,
        .upcoming-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .upcoming-subtitle {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.8;
        }

        .speakers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        .speaker-card {
          text-align: center;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          transition: all 0.3s ease;
        }

        .speaker-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
        }

        .speaker-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .speaker-image svg {
          width: 50px;
          height: 50px;
          color: white;
        }

        .speaker-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .speaker-title {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .speaker-bio {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        .resource-card {
          text-align: center;
          padding: 2rem 1.5rem;
          border-radius: 12px;
          border: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
          transition: all 0.3s ease;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
        }

        .resource-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resource-icon svg {
          width: 32px;
          height: 32px;
          color: white;
        }

        .resource-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
        }

        .resource-description {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .timeline-date {
          min-width: 80px;
          height: 80px;
          border-radius: 12px;
          border: 2px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: ${theme === "dark" ? "#111" : "#fff"};
        }

        .month {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .day {
          font-size: 1.8rem;
          font-weight: 700;
        }

        .timeline-content {
          flex: 1;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid ${theme === "dark" ? "#333" : "#e5e5e5"};
          background: ${theme === "dark" ? "#111" : "#fff"};
        }

        .timeline-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }

        .timeline-speaker {
          font-size: 0.95rem;
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .timeline-description {
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .reminder-button {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }

        .reminder-icon {
          width: 16px;
          height: 16px;
        }

        @media (max-width: 768px) {
          .webinars-list {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .timeline-item {
            flex-direction: column;
            gap: 1rem;
          }

          .timeline-date {
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .webinars-list {
            grid-template-columns: 1fr;
          }

          .speakers-grid,
          .resources-grid {
            grid-template-columns: 1fr;
          }
          .webinars-title,
          .featured-title,
          .resources-title,
          .upcoming-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Webinars;
