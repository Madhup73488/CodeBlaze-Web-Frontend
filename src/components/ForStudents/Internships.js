import React, { useState } from "react";

function Internships({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Positions" },
    { id: "engineering", name: "Engineering" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "business", name: "Business" },
    { id: "research", name: "Research" },
  ];

  const internships = {
    all: [],
    engineering: [
      {
        title: "Frontend Developer Intern",
        company: "TechGrowth Inc.",
        location: "San Francisco, CA (Remote)",
        duration: "3 months",
        stipend: "$25/hour",
        description:
          "Join our dynamic team to build responsive and interactive web applications using React, TypeScript, and modern CSS frameworks. You'll work closely with senior developers on real projects that impact thousands of users.",
        requirements:
          "Knowledge of HTML, CSS, JavaScript, and basic React. Currently pursuing a degree in Computer Science or related field.",
        deadline: "May 30, 2025",
        logo: "techgrowth",
      },
      {
        title: "Backend Developer Intern",
        company: "DataSphere Solutions",
        location: "Boston, MA (Hybrid)",
        duration: "6 months",
        stipend: "$28/hour",
        description:
          "Help build scalable APIs and microservices that power our cloud-based data analytics platform. You'll gain experience with server-side technologies and database optimization techniques.",
        requirements:
          "Familiarity with Node.js, Python, or Java. Basic understanding of databases and RESTful APIs. Currently pursuing a degree in Computer Science or related field.",
        deadline: "June 15, 2025",
        logo: "datasphere",
      },
      {
        title: "Mobile App Developer Intern",
        company: "AppForge Labs",
        location: "Austin, TX (On-site)",
        duration: "4 months",
        stipend: "$24/hour",
        description:
          "Assist in developing native mobile applications for iOS and Android platforms. You'll work on feature implementation, bug fixes, and performance optimization under the guidance of senior mobile developers.",
        requirements:
          "Experience with Swift, Kotlin, or React Native. Understanding of mobile app development concepts. Currently pursuing a degree in Computer Science or related field.",
        deadline: "May 25, 2025",
        logo: "appforge",
      },
    ],
    design: [
      {
        title: "UI/UX Design Intern",
        company: "Creative Minds Studio",
        location: "New York, NY (Hybrid)",
        duration: "3 months",
        stipend: "$22/hour",
        description:
          "Work with our design team to create beautiful and intuitive user interfaces. You'll participate in the entire design process from research to prototyping and testing.",
        requirements:
          "Portfolio showcasing UI/UX projects. Proficiency in Figma or Adobe XD. Currently pursuing a degree in Design, HCI, or related field.",
        deadline: "June 5, 2025",
        logo: "creativeminds",
      },
      {
        title: "Product Design Intern",
        company: "Innovation Hub",
        location: "Seattle, WA (Remote)",
        duration: "4 months",
        stipend: "$23/hour",
        description:
          "Join our product team to help design digital products that solve real-world problems. You'll collaborate with product managers, developers, and other designers on user research, wireframing, and prototyping.",
        requirements:
          "Strong visual design skills. Experience with design systems. Knowledge of user-centered design principles. Currently pursuing a degree in Product Design, Interaction Design, or related field.",
        deadline: "May 28, 2025",
        logo: "innovationhub",
      },
    ],
    marketing: [
      {
        title: "Digital Marketing Intern",
        company: "MarketBoost",
        location: "Chicago, IL (Remote)",
        duration: "3 months",
        stipend: "$20/hour",
        description:
          "Assist our marketing team in developing and implementing digital campaigns across various platforms. You'll gain hands-on experience with SEO, social media marketing, email campaigns, and analytics.",
        requirements:
          "Knowledge of digital marketing concepts. Familiarity with social media platforms and Google Analytics. Currently pursuing a degree in Marketing, Communications, or related field.",
        deadline: "June 10, 2025",
        logo: "marketboost",
      },
      {
        title: "Content Marketing Intern",
        company: "WordCraft Media",
        location: "Atlanta, GA (Hybrid)",
        duration: "4 months",
        stipend: "$21/hour",
        description:
          "Create engaging content for blogs, social media, and other marketing channels. You'll work with the content team to develop content strategies, write compelling copy, and analyze content performance.",
        requirements:
          "Strong writing and editing skills. Understanding of SEO principles. Currently pursuing a degree in Marketing, Journalism, English, or related field.",
        deadline: "May 29, 2025",
        logo: "wordcraft",
      },
    ],
    business: [
      {
        title: "Business Analyst Intern",
        company: "Strategic Insights Group",
        location: "Philadelphia, PA (On-site)",
        duration: "6 months",
        stipend: "$23/hour",
        description:
          "Support our consulting team by conducting market research, analyzing business processes, and developing recommendations for clients. You'll gain experience with data analysis tools and business strategy frameworks.",
        requirements:
          "Strong analytical skills. Proficiency in Excel. Basic knowledge of business analysis concepts. Currently pursuing a degree in Business Administration, Economics, or related field.",
        deadline: "June 20, 2025",
        logo: "strategicinsights",
      },
      {
        title: "Finance Intern",
        company: "Global Finance Partners",
        location: "Denver, CO (Hybrid)",
        duration: "3 months",
        stipend: "$24/hour",
        description:
          "Assist with financial analysis, reporting, and forecasting. You'll work with financial models, help prepare reports, and gain exposure to various aspects of corporate finance.",
        requirements:
          "Understanding of financial concepts. Proficiency in Excel. Currently pursuing a degree in Finance, Accounting, Economics, or related field.",
        deadline: "June 8, 2025",
        logo: "globalfinance",
      },
    ],
    research: [
      {
        title: "Machine Learning Research Intern",
        company: "AI Innovations Lab",
        location: "Cambridge, MA (On-site)",
        duration: "6 months",
        stipend: "$30/hour",
        description:
          "Contribute to cutting-edge research in machine learning and artificial intelligence. You'll work with researchers on model development, data analysis, and experiment design.",
        requirements:
          "Knowledge of machine learning concepts. Experience with Python and frameworks like TensorFlow or PyTorch. Currently pursuing a degree in Computer Science, Data Science, or related field.",
        deadline: "June 25, 2025",
        logo: "aiinnovations",
      },
      {
        title: "Biotech Research Intern",
        company: "BioFrontier Research",
        location: "San Diego, CA (On-site)",
        duration: "4 months",
        stipend: "$26/hour",
        description:
          "Assist scientists in conducting laboratory research in biotechnology. You'll gain hands-on experience with lab techniques, data collection, and analysis in a cutting-edge research environment.",
        requirements:
          "Background in biology, chemistry, or related fields. Laboratory experience preferred. Currently pursuing a degree in Biotechnology, Biochemistry, or related field.",
        deadline: "June 15, 2025",
        logo: "biofrontier",
      },
    ],
  };

  // Populate the "all" category with all internships
  internships.all = [
    ...internships.engineering,
    ...internships.design,
    ...internships.marketing,
    ...internships.business,
    ...internships.research,
  ];

  const filteredInternships = searchQuery
    ? internships.all.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          internship.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          internship.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : internships[activeCategory];

  const getLogoPlaceholder = (name) => {
    // This function returns the first letter of the company name to use as a logo placeholder
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`internships-container ${theme}`}>
      <div className="internships-header">
        <h1 className="internships-title">
          Student <span style={{ color: primaryColor }}>Internships</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="internships-subtitle">
          Discover exciting internship opportunities that match your skills and
          interests. Apply today to kickstart your career journey.
        </p>
      </div>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for internships..."
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

      <section className="internships-section">
        {!searchQuery && (
          <div className="internship-categories">
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

        <div className="internships-list">
          {searchQuery && filteredInternships.length === 0 ? (
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
              <h3>No internships found</h3>
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
            filteredInternships.map((internship, index) => (
              <div className="internship-card" key={index}>
                <div className="internship-header">
                  <div
                    className="company-logo"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {getLogoPlaceholder(internship.company)}
                  </div>
                  <div className="internship-title-info">
                    <h3 className="internship-title">{internship.title}</h3>
                    <div className="company-name">{internship.company}</div>
                  </div>
                </div>

                <div className="internship-details">
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
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{internship.location}</span>
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
                    <span>{internship.duration}</span>
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
                    <span>{internship.stipend}</span>
                  </div>
                </div>

                <div className="internship-description">
                  <p>{internship.description}</p>
                </div>

                <div className="internship-requirements">
                  <h4>Requirements</h4>
                  <p>{internship.requirements}</p>
                </div>

                <div className="internship-footer">
                  <div className="deadline">
                    <span className="deadline-label">Apply by:</span>
                    <span className="deadline-date">{internship.deadline}</span>
                  </div>
                  <button
                    className="apply-button"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="resources-section">
        <div className="resources-header">
          <h2 className="resources-title">
            Career <span style={{ color: primaryColor }}>Resources</span>
          </h2>
        </div>

        <div className="resources-grid">
          <a href="/resume-tips" className="resource-card">
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="resource-title">Resume Workshop</h3>
            <p className="resource-description">
              Tips and templates to create a standout resume for internship
              applications
            </p>
          </a>

          <a href="/interview-prep" className="resource-card">
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="resource-title">Interview Prep</h3>
            <p className="resource-description">
              Practice common interview questions and learn effective techniques
            </p>
          </a>

          <a href="/skill-development" className="resource-card">
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
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h3 className="resource-title">Skill Development</h3>
            <p className="resource-description">
              Free and low-cost resources to build the skills employers are
              looking for
            </p>
          </a>

          <a href="/networking" className="resource-card">
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="resource-title">Networking Events</h3>
            <p className="resource-description">
              Connect with employers and fellow students at upcoming career
              events
            </p>
          </a>
        </div>
      </section>

      <style jsx>{`
        .internships-container {
          padding: 2rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .internships-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .internships-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .internships-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .internships-title {
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

        .internships-subtitle {
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

        .internships-section {
          margin-bottom: 4rem;
        }

        .internship-categories {
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

        .internships-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .internship-card {
          background: ${theme === "dark" ? "#111" : "#fff"};
          border-radius: 10px;
          box-shadow: 0 4px 12px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.1"});
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
          padding: 1.5rem;
        }

        .internship-card:hover {
          transform: translateY(-5px);
        }

        .internship-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .company-logo {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-right: 1rem;
        }

        .internship-title-info {
          flex: 1;
        }

        .internship-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.3rem;
        }

        .company-name {
          font-size: 1rem;
          opacity: 0.8;
        }

        .internship-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
        }

        .detail-icon {
          width: 16px;
          height: 16px;
          margin-right: 0.5rem;
          opacity: 0.8;
        }

        .internship-description {
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .internship-requirements {
          margin-bottom: 1.5rem;
        }

        .internship-requirements h4 {
          font-size: 1rem;
          margin: 0 0 0.5rem;
        }

        .internship-requirements p {
          font-size: 0.95rem;
          line-height: 1.6;
          opacity: 0.8;
        }

        .internship-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid ${theme === "dark" ? "#2d2d2d" : "#e5e5e5"};
        }

        .deadline {
          display: flex;
          flex-direction: column;
        }

        .deadline-label {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .deadline-date {
          font-weight: 600;
        }

        .apply-button {
          padding: 0.6rem 1.2rem;
          border-radius: 30px;
          border: none;
          color: white;
          font-weight: 500;
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

        .resources-section {
          margin-bottom: 3rem;
        }

        .resources-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .resources-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .resource-card {
          padding: 2rem;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .resource-card:hover {
          transform: translateY(-5px);
        }

        .resource-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .resource-icon svg {
          width: 30px;
          height: 30px;
          color: white;
        }

        .resource-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .resource-description {
          margin: 0;
          opacity: 0.9;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .internship-categories {
            flex-direction: column;
            align-items: stretch;
          }

          .internships-list {
            grid-template-columns: 1fr;
          }

          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Internships;
