import React, { useState } from "react";

function PlacementGuidance({ theme }) {
  const primaryColor = theme === "dark" ? "#f97316" : "#a855f7";
  const [activeTab, setActiveTab] = useState("preparation");
  const [expanded, setExpanded] = useState(null);

  const tabs = [
    { id: "preparation", name: "Preparation" },
    { id: "interviews", name: "Interviews" },
    { id: "resumes", name: "Resumes & CVs" },
    { id: "assessments", name: "Assessments" },
    { id: "offers", name: "Job Offers" },
  ];

  const guidance = {
    preparation: [
      {
        id: "research",
        title: "Research Companies",
        description:
          "Learn about potential employers before applying to increase your chances of success.",
        steps: [
          "Create a list of companies you're interested in working for",
          "Follow their social media accounts and company news",
          "Research their products, services, and company culture",
          "Understand their mission, values, and recent achievements",
          "Network with current or former employees if possible",
        ],
        resources: [
          {
            title: "Company Research Template",
            type: "document",
            link: "/resources/company-research-template",
          },
          {
            title: "Industry Analysis Guide",
            type: "guide",
            link: "/resources/industry-analysis",
          },
        ],
      },
      {
        id: "skills",
        title: "Skill Development",
        description:
          "Identify and develop the key skills employers are looking for in your field.",
        steps: [
          "Analyze job descriptions to identify required skills",
          "Take online courses to develop technical skills",
          "Practice soft skills through group projects and presentations",
          "Get certifications relevant to your industry",
          "Build a portfolio showcasing your projects and skills",
        ],
        resources: [
          {
            title: "Skills Gap Analysis Tool",
            type: "tool",
            link: "/resources/skills-gap-analysis",
          },
          {
            title: "Top 10 Skills for 2025",
            type: "article",
            link: "/resources/top-skills-2025",
          },
        ],
      },
      {
        id: "network",
        title: "Networking Strategies",
        description:
          "Build professional connections that can lead to job opportunities and career advice.",
        steps: [
          "Create a professional LinkedIn profile",
          "Attend industry events, job fairs, and webinars",
          "Join professional organizations in your field",
          "Reach out to alumni from your institution",
          "Schedule informational interviews with professionals",
        ],
        resources: [
          {
            title: "Networking Email Templates",
            type: "templates",
            link: "/resources/networking-emails",
          },
          {
            title: "LinkedIn Profile Optimization Guide",
            type: "guide",
            link: "/resources/linkedin-optimization",
          },
        ],
      },
    ],
    interviews: [
      {
        id: "technical",
        title: "Technical Interviews",
        description:
          "Prepare for coding challenges, case studies, and technical questions in your field.",
        steps: [
          "Review fundamental concepts in your field",
          "Practice coding problems on platforms like LeetCode or HackerRank",
          "Participate in mock technical interviews",
          "Learn to explain your thought process clearly",
          "Review your past projects for discussion points",
        ],
        resources: [
          {
            title: "Technical Interview Preparation Guide",
            type: "guide",
            link: "/resources/technical-interview-prep",
          },
          {
            title: "50 Common Technical Questions",
            type: "practice",
            link: "/resources/common-technical-questions",
          },
        ],
      },
      {
        id: "behavioral",
        title: "Behavioral Interviews",
        description:
          "Learn how to effectively respond to questions about your experiences and soft skills.",
        steps: [
          "Prepare STAR (Situation, Task, Action, Result) stories from your experience",
          "Practice answering common behavioral questions",
          "Prepare examples demonstrating leadership, teamwork, and problem-solving",
          "Research company values to align your answers",
          "Prepare thoughtful questions to ask the interviewer",
        ],
        resources: [
          {
            title: "STAR Method Workshop",
            type: "workshop",
            link: "/resources/star-method",
          },
          {
            title: "Behavioral Interview Simulator",
            type: "tool",
            link: "/resources/behavioral-simulator",
          },
        ],
      },
      {
        id: "virtual",
        title: "Virtual Interview Tips",
        description:
          "Master the art of making a great impression in remote interviews.",
        steps: [
          "Test your technology well before the interview",
          "Set up a professional and well-lit environment",
          "Practice speaking clearly and maintaining eye contact with the camera",
          "Prepare for potential technical issues",
          "Dress professionally from head to toe",
        ],
        resources: [
          {
            title: "Virtual Interview Checklist",
            type: "checklist",
            link: "/resources/virtual-interview-checklist",
          },
          {
            title: "Remote Communication Skills Workshop",
            type: "workshop",
            link: "/resources/remote-communication",
          },
        ],
      },
    ],
    resumes: [
      {
        id: "structure",
        title: "Resume Structure & Formatting",
        description:
          "Learn how to organize your resume to highlight your strengths effectively.",
        steps: [
          "Choose an appropriate resume format (chronological, functional, or combination)",
          "Include essential sections: contact info, summary, experience, education, skills",
          "Use consistent formatting and easy-to-read fonts",
          "Keep your resume to 1-2 pages maximum",
          "Save and send your resume as a PDF to preserve formatting",
        ],
        resources: [
          {
            title: "Resume Templates by Industry",
            type: "templates",
            link: "/resources/resume-templates",
          },
          {
            title: "Resume Formatting Guide",
            type: "guide",
            link: "/resources/resume-formatting",
          },
        ],
      },
      {
        id: "content",
        title: "Writing Effective Content",
        description:
          "Create compelling and achievement-focused descriptions for your resume.",
        steps: [
          "Use action verbs to start bullet points",
          "Include quantifiable achievements and results",
          "Tailor your content to match job descriptions",
          "Focus on relevant experiences and skills",
          "Use keywords from the job description for ATS compatibility",
        ],
        resources: [
          {
            title: "Achievement-Based Resume Workshop",
            type: "workshop",
            link: "/resources/resume-achievements",
          },
          {
            title: "Action Verbs Database",
            type: "tool",
            link: "/resources/action-verbs",
          },
        ],
      },
      {
        id: "ats",
        title: "ATS-Friendly Resumes",
        description:
          "Optimize your resume to get through Applicant Tracking Systems.",
        steps: [
          "Use standard section headings that ATS can recognize",
          "Incorporate relevant keywords from the job description",
          "Avoid tables, headers/footers, and complex formatting",
          "Don't submit your resume as an image or in non-standard formats",
          "Use a simple, clean design with minimal graphics",
        ],
        resources: [
          {
            title: "ATS Resume Checker",
            type: "tool",
            link: "/resources/ats-checker",
          },
          {
            title: "Keyword Optimization Guide",
            type: "guide",
            link: "/resources/keyword-optimization",
          },
        ],
      },
    ],
    assessments: [
      {
        id: "aptitude",
        title: "Aptitude Tests",
        description:
          "Prepare for numerical, verbal, and logical reasoning assessments.",
        steps: [
          "Understand the types of aptitude tests used in your industry",
          "Practice with sample questions in timed conditions",
          "Learn strategies for managing time pressure",
          "Review basic math, verbal reasoning, and logic concepts",
          "Take full practice tests to build stamina",
        ],
        resources: [
          {
            title: "Aptitude Test Practice Pack",
            type: "practice",
            link: "/resources/aptitude-practice",
          },
          {
            title: "Numerical Reasoning Workshop",
            type: "workshop",
            link: "/resources/numerical-reasoning",
          },
        ],
      },
      {
        id: "assessment-centers",
        title: "Assessment Centers",
        description:
          "Prepare for group exercises, presentations, and role-playing scenarios.",
        steps: [
          "Research common assessment center exercises",
          "Practice group problem-solving and leadership skills",
          "Prepare for in-tray/e-tray exercises",
          "Develop presentation and public speaking skills",
          "Learn to balance teamwork with individual contribution",
        ],
        resources: [
          {
            title: "Assessment Center Survival Guide",
            type: "guide",
            link: "/resources/assessment-center",
          },
          {
            title: "Group Exercise Simulator",
            type: "tool",
            link: "/resources/group-exercise",
          },
        ],
      },
      {
        id: "personality",
        title: "Personality Tests",
        description:
          "Understand what employers look for in personality and psychometric assessments.",
        steps: [
          "Familiarize yourself with common personality test formats",
          "Understand your own strengths and work style",
          "Practice answering personality-based questions honestly and consistently",
          "Research which traits the employer values",
          "Avoid trying to 'game' the test—be authentic",
        ],
        resources: [
          {
            title: "Personality Assessment Overview",
            type: "guide",
            link: "/resources/personality-assessments",
          },
          {
            title: "Self-Awareness Workshop",
            type: "workshop",
            link: "/resources/self-awareness",
          },
        ],
      },
    ],
    offers: [
      {
        id: "evaluation",
        title: "Evaluating Job Offers",
        description:
          "Learn how to assess job offers beyond just the salary figure.",
        steps: [
          "Compare the complete compensation package (benefits, bonuses, stock options)",
          "Consider work-life balance and company culture",
          "Evaluate career growth opportunities",
          "Research typical salaries for your role and location",
          "Consider commute, remote work options, and location factors",
        ],
        resources: [
          {
            title: "Job Offer Evaluation Tool",
            type: "tool",
            link: "/resources/offer-evaluation",
          },
          {
            title: "Benefits Package Glossary",
            type: "guide",
            link: "/resources/benefits-glossary",
          },
        ],
      },
      {
        id: "negotiation",
        title: "Salary Negotiation",
        description:
          "Develop confidence and strategies for negotiating your compensation package.",
        steps: [
          "Research salary ranges for your position and experience level",
          "Identify your minimum acceptable offer and target salary",
          "Prepare to articulate your value with specific achievements",
          "Practice negotiation conversations with a friend or mentor",
          "Consider negotiating benefits beyond base salary",
        ],
        resources: [
          {
            title: "Salary Negotiation Scripts",
            type: "templates",
            link: "/resources/negotiation-scripts",
          },
          {
            title: "Compensation Research Tools",
            type: "tools",
            link: "/resources/compensation-research",
          },
        ],
      },
      {
        id: "decision",
        title: "Making the Final Decision",
        description:
          "Navigate multiple offers and make the best choice for your career.",
        steps: [
          "Create a decision matrix with your priorities",
          "Consider long-term career impact, not just immediate benefits",
          "Talk to current employees if possible",
          "Trust your instincts about company culture fit",
          "Get offer details in writing before making a final decision",
        ],
        resources: [
          {
            title: "Career Decision Framework",
            type: "tool",
            link: "/resources/decision-framework",
          },
          {
            title: "Job Offer Comparison Worksheet",
            type: "worksheet",
            link: "/resources/offer-comparison",
          },
        ],
      },
    ],
  };

  const resourceTypeIcons = {
    document: (
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
    ),
    guide: (
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
    ),
    tool: (
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
    ),
    templates: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    ),
    article: (
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
    ),
    practice: (
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
    ),
    workshop: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    ),
    checklist: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="9" y1="6" x2="20" y2="6"></line>
        <line x1="9" y1="12" x2="20" y2="12"></line>
        <line x1="9" y1="18" x2="20" y2="18"></line>
        <path d="M5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
        <path d="M5 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
        <path d="M5 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
      </svg>
    ),
    worksheet: (
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
    ),
  };

  const toggleExpanded = (id) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  const getSuccessStats = () => {
    return [
      {
        stat: "92%",
        description: "of students improved interview performance",
      },
      { stat: "87%", description: "received at least one job offer" },
      { stat: "73%", description: "secured roles at top-tier companies" },
      { stat: "64%", description: "negotiated higher starting salaries" },
    ];
  };

  const successStats = getSuccessStats();

  const upcomingEvents = [
    {
      title: "Resume Building Workshop",
      date: "May 3, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual",
      type: "Workshop",
    },
    {
      title: "Technical Interview Bootcamp",
      date: "May 10-11, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Main Campus, Room 302",
      type: "Bootcamp",
    },
    {
      title: "Mock Interview Day",
      date: "May 18, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Career Center",
      type: "Practice",
    },
  ];

  return (
    <div className={`guidance-container ${theme}`}>
      <div className="guidance-header">
        <h1 className="guidance-title">
          Placement <span style={{ color: primaryColor }}>Guidance</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="guidance-subtitle">
          Comprehensive resources and expert advice to help you succeed in your
          job search and secure the perfect placement opportunity.
        </p>
      </div>

      <section className="stats-section">
        <div className="stats-container">
          {successStats.map((item, index) => (
            <div className="stat-card" key={index}>
              <h2 className="stat-number" style={{ color: primaryColor }}>
                {item.stat}
              </h2>
              <p className="stat-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="guidance-tabs-section">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              style={
                activeTab === tab.id
                  ? { borderColor: primaryColor, color: primaryColor }
                  : {}
              }
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="guidance-content">
          {guidance[activeTab].map((item) => (
            <div
              className={`guidance-card ${
                expanded === item.id ? "expanded" : ""
              }`}
              key={item.id}
            >
              <div
                className="guidance-card-header"
                onClick={() => toggleExpanded(item.id)}
              >
                <h3 className="guidance-card-title">{item.title}</h3>
                <div className="guidance-card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform:
                        expanded === item.id ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div className="guidance-card-description">
                <p>{item.description}</p>
              </div>

              <div className="guidance-card-content">
                <div className="guidance-section">
                  <h4 className="guidance-section-title">Key Steps</h4>
                  <ol className="guidance-steps">
                    {item.steps.map((step, index) => (
                      <li key={index} className="guidance-step">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="guidance-section">
                  <h4 className="guidance-section-title">Resources</h4>
                  <div className="guidance-resources">
                    {item.resources.map((resource, index) => (
                      <a
                        href={resource.link}
                        className="resource-link"
                        key={index}
                      >
                        <div
                          className="resource-icon"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {resourceTypeIcons[resource.type]}
                        </div>
                        <div className="resource-info">
                          <div className="resource-title">{resource.title}</div>
                          <div className="resource-type">{resource.type}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="events-section">
        <div className="events-header">
          <h2 className="events-title">
            Upcoming <span style={{ color: primaryColor }}>Events</span>
          </h2>
          <p className="events-subtitle">
            Join these career preparation activities to enhance your placement
            readiness
          </p>
        </div>

        <div className="events-grid">
          {upcomingEvents.map((event, index) => (
            <div className="event-card" key={index}>
              <div className="event-header">
                <div
                  className="event-type-badge"
                  style={{ backgroundColor: primaryColor }}
                >
                  {event.type}
                </div>
                <h3 className="event-title">{event.title}</h3>
              </div>
              <div className="event-details">
                <div className="event-detail">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="event-icon"
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
                  <span>{event.date}</span>
                </div>
                <div className="event-detail">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="event-icon"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div className="event-detail">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="event-icon"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              <button
                className="register-button"
                style={{ backgroundColor: primaryColor }}
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="consultation-section">
        <div className="consultation-container">
          <div className="consultation-content">
            <h2 className="consultation-title">
              Need <span style={{ color: primaryColor }}>Personalized</span>{" "}
              Guidance?
            </h2>
            <p className="consultation-description">
              Schedule a one-on-one session with our career counselors to get
              personalized advice tailored to your specific career goals and
              challenges.
            </p>
            <div className="consultation-features">
              <div className="consultation-feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feature-icon"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Resume review & optimization</span>
              </div>
              <div className="consultation-feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feature-icon"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Interview preparation & practice</span>
              </div>
              <div className="consultation-feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feature-icon"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Career path planning</span>
              </div>
              <div className="consultation-feature">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feature-icon"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Salary negotiation coaching</span>
              </div>
            </div>
            <button
              className="schedule-button"
              style={{ backgroundColor: primaryColor }}
            >
              Schedule Consultation
            </button>
          </div>
          <div className="consultation-image">
            <div className="image-placeholder" />
          </div>
        </div>
      </section>

      <style jsx>{`
        .guidance-container {
          max-width: 100%; /* Changed from 1200px */
          margin: 0 auto;
          padding: 20px;
          font-family: "Inter", sans-serif;
        }

        .guidance-container.dark {
          background-color: #111827;
          color: #e0e0e0;
        }

        .guidance-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .guidance-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .accent-line {
          height: 4px;
          width: 80px;
          margin: 0 auto 20px;
          border-radius: 2px;
        }

        .guidance-subtitle {
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          color: #555;
        }

        .dark .guidance-subtitle {
          color: #aaa;
        }

        .stats-section {
          margin-bottom: 40px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background-color: #fff;
          border-radius: 10px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .dark .stat-card {
          background-color: #1f2937;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-description {
          font-size: 0.95rem;
          color: #666;
        }

        .dark .stat-description {
          color: #bbb;
        }

        .guidance-tabs-section {
          margin-bottom: 40px;
        }

        .tabs-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
          justify-content: center;
        }

        .tab-button {
          padding: 10px 20px;
          background: none;
          border: 2px solid #e0e0e0;
          border-radius: 30px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #555;
        }

        .dark .tab-button {
          border-color: #444;
          color: #ccc;
        }

        .tab-button:hover {
          background-color: #f5f5f5;
        }

        .dark .tab-button:hover {
          background-color: #333;
        }

        .tab-button.active {
          font-weight: 700;
        }

        .guidance-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .guidance-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .dark .guidance-card {
          background-color: #1f2937;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .guidance-card.expanded {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .dark .guidance-card.expanded {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .guidance-card-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
        }

        .dark .guidance-card-header {
          border-bottom: 1px solid #3a3a3a;
        }

        .guidance-card-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }

        .guidance-card-icon svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .guidance-card-description {
          padding: 0 20px;
          margin: 10px 0;
          color: #666;
          font-size: 0.95rem;
        }

        .dark .guidance-card-description {
          color: #aaa;
        }

        .guidance-card-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .expanded .guidance-card-content {
          max-height: 1000px;
          padding-bottom: 20px;
        }

        .guidance-section {
          padding: 0 20px;
          margin-top: 20px;
        }

        .guidance-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #444;
        }

        .dark .guidance-section-title {
          color: #ddd;
        }

        .guidance-steps {
          padding-left: 20px;
          margin: 0;
        }

        .guidance-step {
          margin-bottom: 8px;
          line-height: 1.5;
          color: #555;
        }

        .dark .guidance-step {
          color: #bbb;
        }

        .guidance-resources {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }

        .resource-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 10px;
          border-radius: 8px;
          transition: background-color 0.3s ease;
          color: inherit;
        }

        .resource-link:hover {
          background-color: #f5f5f5;
        }

        .dark .resource-link:hover {
          background-color: #333;
        }

        .resource-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }

        .resource-icon svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .resource-info {
          flex: 1;
        }

        .resource-title {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 3px;
        }

        .resource-type {
          font-size: 0.8rem;
          color: #777;
          text-transform: capitalize;
        }

        .dark .resource-type {
          color: #999;
        }

        .events-section {
          margin-bottom: 40px;
        }

        .events-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .events-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .events-subtitle {
          font-size: 1rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
        }

        .dark .events-subtitle {
          color: #aaa;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .event-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          padding: 20px;
          transition: transform 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-5px);
        }

        .dark .event-card {
          background-color: #1f2937;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .event-header {
          margin-bottom: 15px;
        }

        .event-type-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .event-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.3;
        }

        .event-details {
          margin-bottom: 20px;
        }

        .event-detail {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          color: #666;
          font-size: 0.9rem;
        }

        .dark .event-detail {
          color: #aaa;
        }

        .event-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        .register-button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .register-button:hover {
          opacity: 0.9;
        }

        .consultation-section {
          margin-bottom: 40px;
        }

        .consultation-container {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .dark .consultation-container {
          background: #1f2937;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .consultation-content {
          flex: 1;
          padding: 40px;
        }

        .consultation-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .consultation-description {
          font-size: 1rem;
          color: #555;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .dark .consultation-description {
          color: #bbb;
        }

        .consultation-features {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .consultation-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
        }

        .feature-icon {
          width: 20px;
          height: 20px;
        }

        .schedule-button {
          padding: 12px 25px;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .schedule-button:hover {
          opacity: 0.9;
        }

        .consultation-image {
          flex: 1;
          min-height: 300px;
          position: relative;
        }

        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("/api/placeholder/500/600") center/cover no-repeat;
        }

        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .consultation-container {
            flex-direction: column;
          }

          .consultation-image {
            min-height: 200px;
          }

          .events-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .stats-container {
            grid-template-columns: 1fr;
          }

          .guidance-resources {
            grid-template-columns: 1fr;
          }

          .consultation-features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default PlacementGuidance;
