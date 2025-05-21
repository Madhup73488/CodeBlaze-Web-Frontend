import React, { useState } from "react";

function ProjectSupport({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [activeTab, setActiveTab] = useState("ideation");
  const [expanded, setExpanded] = useState(null);

  const tabs = [
    { id: "ideation", name: "Ideation" },
    { id: "planning", name: "Planning" },
    { id: "execution", name: "Execution" },
    { id: "presentation", name: "Presentation" },
    { id: "evaluation", name: "Evaluation" },
  ];

  const support = {
    ideation: [
      {
        id: "brainstorming",
        title: "Brainstorming Techniques",
        description:
          "Learn effective methods to generate innovative project ideas and solutions.",
        steps: [
          "Conduct mind mapping sessions to explore possibilities",
          "Apply SCAMPER technique (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse)",
          "Use the 'Five Whys' method to identify root problems",
          "Implement structured brainstorming with time constraints",
          "Conduct peer feedback sessions to refine ideas",
        ],
        resources: [
          {
            title: "Ideation Canvas Template",
            type: "template",
            link: "/resources/ideation-canvas",
          },
          {
            title: "Creative Thinking Workshop",
            type: "workshop",
            link: "/resources/creative-thinking",
          },
        ],
      },
      {
        id: "research",
        title: "Research Methods",
        description:
          "Discover effective approaches to conduct background research for your project.",
        steps: [
          "Define clear research questions and objectives",
          "Identify credible academic and industry sources",
          "Conduct literature reviews to understand existing knowledge",
          "Analyze market trends and competitor solutions",
          "Document findings in a structured research report",
        ],
        resources: [
          {
            title: "Research Framework Guide",
            type: "guide",
            link: "/resources/research-framework",
          },
          {
            title: "Data Collection Techniques",
            type: "article",
            link: "/resources/data-collection",
          },
        ],
      },
      {
        id: "problem-definition",
        title: "Problem Definition",
        description:
          "Learn how to clearly define the problem your project aims to solve.",
        steps: [
          "Identify key stakeholders and their needs",
          "Create user personas to understand target audience",
          "Develop problem statements using the 'How might we' format",
          "Establish project scope and boundaries",
          "Validate the problem with potential users or experts",
        ],
        resources: [
          {
            title: "Problem Statement Workshop",
            type: "workshop",
            link: "/resources/problem-statement",
          },
          {
            title: "User Interview Templates",
            type: "template",
            link: "/resources/user-interviews",
          },
        ],
      },
    ],
    planning: [
      {
        id: "project-scope",
        title: "Project Scope Management",
        description:
          "Learn how to define and manage the boundaries of your project effectively.",
        steps: [
          "Create a clear project charter with goals and deliverables",
          "Define project constraints (time, budget, resources)",
          "Establish acceptance criteria for final deliverables",
          "Identify potential scope creep risks",
          "Document what is explicitly out of scope",
        ],
        resources: [
          {
            title: "Scope Document Template",
            type: "template",
            link: "/resources/scope-template",
          },
          {
            title: "Requirements Gathering Workshop",
            type: "workshop",
            link: "/resources/requirements-workshop",
          },
        ],
      },
      {
        id: "timeline",
        title: "Timeline Development",
        description:
          "Create realistic project schedules with effective milestone planning.",
        steps: [
          "Break down the project into manageable work packages",
          "Identify dependencies between tasks and activities",
          "Estimate time requirements for each task",
          "Set clear milestones and deadlines",
          "Build in buffer time for unexpected delays",
        ],
        resources: [
          {
            title: "Gantt Chart Template",
            type: "tool",
            link: "/resources/gantt-template",
          },
          {
            title: "Time Estimation Techniques",
            type: "guide",
            link: "/resources/time-estimation",
          },
        ],
      },
      {
        id: "resource-planning",
        title: "Resource Management",
        description:
          "Plan and allocate resources effectively to ensure project success.",
        steps: [
          "Identify all required resources (human, financial, technical)",
          "Create a detailed budget with cost estimates",
          "Develop team roles and responsibilities matrix",
          "Plan for equipment and software needs",
          "Establish resource procurement schedules",
        ],
        resources: [
          {
            title: "Budget Planning Template",
            type: "template",
            link: "/resources/budget-template",
          },
          {
            title: "Team Skills Assessment Tool",
            type: "tool",
            link: "/resources/skills-assessment",
          },
        ],
      },
    ],
    execution: [
      {
        id: "methodology",
        title: "Project Methodologies",
        description:
          "Understand different project management approaches and choose the right one for your project.",
        steps: [
          "Compare Agile, Waterfall, and Hybrid methodologies",
          "Select an approach that fits your project constraints",
          "Establish workflow processes and procedures",
          "Create project documentation standards",
          "Set up necessary project management tools",
        ],
        resources: [
          {
            title: "Methodology Selection Framework",
            type: "guide",
            link: "/resources/methodology-guide",
          },
          {
            title: "Agile Project Management Workshop",
            type: "workshop",
            link: "/resources/agile-workshop",
          },
        ],
      },
      {
        id: "team-collaboration",
        title: "Team Collaboration",
        description:
          "Foster effective teamwork and communication throughout your project.",
        steps: [
          "Establish regular team meetings and check-ins",
          "Create collaborative document sharing systems",
          "Develop conflict resolution procedures",
          "Implement effective feedback mechanisms",
          "Build team building and motivation strategies",
        ],
        resources: [
          {
            title: "Communication Plan Template",
            type: "template",
            link: "/resources/communication-plan",
          },
          {
            title: "Conflict Resolution Workshop",
            type: "workshop",
            link: "/resources/conflict-resolution",
          },
        ],
      },
      {
        id: "progress-tracking",
        title: "Progress Monitoring",
        description:
          "Track project progress effectively and address issues promptly.",
        steps: [
          "Establish key performance indicators (KPIs)",
          "Implement regular progress reporting mechanisms",
          "Conduct milestone reviews and checkpoints",
          "Document and track issues and risks",
          "Adjust plans based on actual progress",
        ],
        resources: [
          {
            title: "Project Dashboard Template",
            type: "tool",
            link: "/resources/dashboard-template",
          },
          {
            title: "Status Report Templates",
            type: "template",
            link: "/resources/status-reports",
          },
        ],
      },
    ],
    presentation: [
      {
        id: "visual-aids",
        title: "Visual Materials",
        description:
          "Create compelling visual presentations to effectively communicate your project.",
        steps: [
          "Design clear and concise presentation slides",
          "Develop informative charts and graphs",
          "Create project posters and infographics",
          "Prepare demonstration materials",
          "Use visual storytelling techniques",
        ],
        resources: [
          {
            title: "Presentation Design Guide",
            type: "guide",
            link: "/resources/presentation-design",
          },
          {
            title: "Data Visualization Workshop",
            type: "workshop",
            link: "/resources/data-visualization",
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery Techniques",
        description:
          "Master the skills needed to deliver engaging and persuasive presentations.",
        steps: [
          "Structure your presentation with a clear narrative",
          "Practice public speaking and presentation timing",
          "Prepare for questions and discussion",
          "Use effective body language and voice modulation",
          "Adapt presentation style for different audiences",
        ],
        resources: [
          {
            title: "Public Speaking Workshop",
            type: "workshop",
            link: "/resources/public-speaking",
          },
          {
            title: "Presentation Coaching Sessions",
            type: "service",
            link: "/resources/presentation-coaching",
          },
        ],
      },
      {
        id: "documentation",
        title: "Project Documentation",
        description:
          "Create comprehensive project documentation to showcase your work.",
        steps: [
          "Develop a well-structured project report",
          "Document methodologies and processes used",
          "Present findings and results clearly",
          "Create technical documentation if applicable",
          "Prepare executive summaries for different stakeholders",
        ],
        resources: [
          {
            title: "Project Report Template",
            type: "template",
            link: "/resources/report-template",
          },
          {
            title: "Technical Writing Guidelines",
            type: "guide",
            link: "/resources/technical-writing",
          },
        ],
      },
    ],
    evaluation: [
      {
        id: "outcomes",
        title: "Outcome Assessment",
        description:
          "Evaluate the outcomes and impact of your project objectively.",
        steps: [
          "Compare results against initial objectives",
          "Collect feedback from users and stakeholders",
          "Analyze quantitative project metrics",
          "Evaluate qualitative outcomes and benefits",
          "Document lessons learned and insights gained",
        ],
        resources: [
          {
            title: "Project Evaluation Framework",
            type: "guide",
            link: "/resources/evaluation-framework",
          },
          {
            title: "Feedback Collection Tools",
            type: "tool",
            link: "/resources/feedback-tools",
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection Process",
        description:
          "Learn effective reflection techniques to gain insights from your project experience.",
        steps: [
          "Conduct personal reflection on learning and growth",
          "Facilitate team retrospectives",
          "Identify successful strategies to repeat",
          "Document challenges and how they were overcome",
          "Create action plans for future improvement",
        ],
        resources: [
          {
            title: "Reflection Journal Template",
            type: "template",
            link: "/resources/reflection-journal",
          },
          {
            title: "Team Retrospective Guide",
            type: "guide",
            link: "/resources/retrospective-guide",
          },
        ],
      },
      {
        id: "future-directions",
        title: "Future Directions",
        description:
          "Identify opportunities for project extension and further development.",
        steps: [
          "Analyze potential for project continuation or scaling",
          "Identify areas for further research",
          "Create recommendations for next phases",
          "Consider real-world application opportunities",
          "Develop implementation roadmaps if applicable",
        ],
        resources: [
          {
            title: "Project Extension Planning",
            type: "guide",
            link: "/resources/extension-planning",
          },
          {
            title: "Scaling Strategy Workshop",
            type: "workshop",
            link: "/resources/scaling-workshop",
          },
        ],
      },
    ],
  };

  const resourceTypeIcons = {
    template: (
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
    service: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
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
        stat: "94%",
        description: "of projects completed successfully with our support",
      },
      { stat: "85%", description: "received excellent evaluation scores" },
      { stat: "78%", description: "led to further research opportunities" },
      { stat: "67%", description: "resulted in industry recognition" },
    ];
  };

  const successStats = getSuccessStats();

  const upcomingWorkshops = [
    {
      title: "Design Thinking for Projects",
      date: "May 5, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Innovation Lab, Room 104",
      type: "Workshop",
    },
    {
      title: "Project Management Bootcamp",
      date: "May 12-13, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Virtual",
      type: "Bootcamp",
    },
    {
      title: "Research Methods Masterclass",
      date: "May 20, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Research Center, Floor 3",
      type: "Masterclass",
    },
  ];

  return (
    <div className={`project-support-container ${theme}`}>
      <div className="project-header">
        <h1 className="project-title">
          Project <span style={{ color: primaryColor }}>Support</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="project-subtitle">
          Comprehensive resources and expert guidance to help you succeed in
          every phase of your academic and research projects.
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

      <section className="project-tabs-section">
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

        <div className="project-content">
          {support[activeTab].map((item) => (
            <div
              className={`project-card ${
                expanded === item.id ? "expanded" : ""
              }`}
              key={item.id}
            >
              <div
                className="project-card-header"
                onClick={() => toggleExpanded(item.id)}
              >
                <h3 className="project-card-title">{item.title}</h3>
                <div className="project-card-icon">
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

              <div className="project-card-description">
                <p>{item.description}</p>
              </div>

              <div className="project-card-content">
                <div className="project-section">
                  <h4 className="project-section-title">Key Steps</h4>
                  <ol className="project-steps">
                    {item.steps.map((step, index) => (
                      <li key={index} className="project-step">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="project-section">
                  <h4 className="project-section-title">Resources</h4>
                  <div className="project-resources">
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

      <section className="workshops-section">
        <div className="workshops-header">
          <h2 className="workshops-title">
            Upcoming <span style={{ color: primaryColor }}>Workshops</span>
          </h2>
          <p className="workshops-subtitle">
            Join these project development workshops to enhance your skills and
            knowledge
          </p>
        </div>

        <div className="workshops-grid">
          {upcomingWorkshops.map((workshop, index) => (
            <div className="workshop-card" key={index}>
              <div className="workshop-header">
                <div
                  className="workshop-type-badge"
                  style={{ backgroundColor: primaryColor }}
                >
                  {workshop.type}
                </div>
                <h3 className="workshop-title">{workshop.title}</h3>
              </div>
              <div className="workshop-details">
                <div className="workshop-detail">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="workshop-icon"
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
                  <span>{workshop.date}</span>
                </div>
                <div className="workshop-detail">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="workshop-icon"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{workshop.time}</span>
                </div>
                <div className="workshop-detail">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="workshop-icon"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{workshop.location}</span>
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
              Need <span style={{ color: primaryColor }}>Expert</span> Guidance?
            </h2>
            <p className="consultation-description">
              Schedule a one-on-one session with our project advisors to get
              personalized guidance tailored to your specific project needs and
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
                <span>Project proposal review</span>
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
                <span>Research methodology advice</span>
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
                <span>Project planning assistance</span>
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
                <span>Technical implementation support</span>
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
        .project-support-container {
          max-width: 100%; /* Changed from 1200px */
          margin: 0 auto;
          padding: 20px;
          font-family: "Inter", sans-serif;
        }

        .project-support-container.dark {
          background-color: #0a0a0a;
          color: #e0e0e0;
        }

        .project-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .project-title {
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

        .project-subtitle {
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          color: #555;
        }

        .dark .project-subtitle {
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
          background-color: rgb(21, 21, 21);
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

        .project-tabs-section {
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

        .project-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .project-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .dark .project-card {
          background-color: rgb(21, 21, 21);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .project-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          cursor: pointer;
        }

        .project-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .project-card-icon svg {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .project-card-description {
          padding: 0 20px;
          margin: 0 0 10px;
          color: #666;
        }

        .dark .project-card-description {
          color: #bbb;
        }

        .project-card-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }

        .project-card.expanded .project-card-content {
          max-height: 1000px;
        }

        .project-section {
          padding: 0 20px 20px;
        }

        .project-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .project-steps {
          padding-left: 20px;
          margin: 0;
        }

        .project-step {
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .project-resources {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 15px;
        }

        .resource-link {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px;
          border-radius: 8px;
          background-color: #f8f8f8;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.3s ease;
        }

        .dark .resource-link {
          background-color: #222;
        }

        .resource-link:hover {
          background-color: #f0f0f0;
        }

        .dark .resource-link:hover {
          background-color: #2a2a2a;
        }

        .resource-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          color: white;
        }

        .resource-icon svg {
          width: 20px;
          height: 20px;
        }

        .resource-info {
          display: flex;
          flex-direction: column;
        }

        .resource-title {
          font-weight: 500;
          margin-bottom: 2px;
        }

        .resource-type {
          font-size: 0.85rem;
          color: #777;
          text-transform: capitalize;
        }

        .dark .resource-type {
          color: #999;
        }

        .workshops-section {
          margin-bottom: 40px;
        }

        .workshops-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .workshops-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .workshops-subtitle {
          font-size: 1.1rem;
          color: #555;
        }

        .dark .workshops-subtitle {
          color: #aaa;
        }

        .workshops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
        }

        .workshop-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease;
          padding: 20px;
        }

        .workshop-card:hover {
          transform: translateY(-5px);
        }

        .dark .workshop-card {
          background-color: rgb(21, 21, 21);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .workshop-header {
          margin-bottom: 15px;
        }

        .workshop-type-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .workshop-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }

        .workshop-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .workshop-detail {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: #666;
        }

        .dark .workshop-detail {
          color: #bbb;
        }

        .workshop-icon {
          width: 16px;
          height: 16px;
          opacity: 0.8;
        }

        .register-button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
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
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          background-color: #f8f8f8;
          border-radius: 12px;
          padding: 40px;
        }

        .dark .consultation-container {
          background-color: rgb(21, 21, 21);
        }

        .consultation-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .consultation-description {
          font-size: 1.05rem;
          color: #555;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .dark .consultation-description {
          color: #aaa;
        }

        .consultation-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
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
          border-radius: 8px;
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
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          background-color: #e0e0e0;
          border-radius: 12px;
          background-image: linear-gradient(
            45deg,
            #d0d0d0 25%,
            #e0e0e0 25%,
            #e0e0e0 50%,
            #d0d0d0 50%,
            #d0d0d0 75%,
            #e0e0e0 75%,
            #e0e0e0
          );
          background-size: 10px 10px;
        }

        .dark .image-placeholder {
          background-color: #333;
          background-image: linear-gradient(
            45deg,
            #222 25%,
            #333 25%,
            #333 50%,
            #222 50%,
            #222 75%,
            #333 75%,
            #333
          );
        }

        @media (max-width: 900px) {
          .consultation-container {
            grid-template-columns: 1fr;
          }

          .consultation-image {
            order: -1;
          }

          .workshops-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 600px) {
          .project-title {
            font-size: 2rem;
          }

          .stats-container {
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

export default ProjectSupport;
