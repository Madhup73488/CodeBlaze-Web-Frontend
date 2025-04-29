import React, { useState } from "react";

function Support({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "general", name: "General Questions" },
    { id: "account", name: "Account & Billing" },
    { id: "technical", name: "Technical Issues" },
    { id: "integration", name: "Integration Help" },
    { id: "security", name: "Security & Privacy" },
  ];

  const faqs = {
    general: [
      {
        question: "What payment methods do you support?",
        answer:
          "We support all major credit and debit cards, ACH transfers, wire transfers, and popular digital wallets including Apple Pay, Google Pay, and PayPal. For international transactions, we support over 135 currencies and local payment methods specific to various regions.",
      },
      {
        question: "How do I get started with your payment platform?",
        answer:
          "Getting started is simple! Create an account, complete the verification process, and integrate our solution using our API documentation or ready-to-use plugins. Our onboarding specialists will guide you through the entire process to ensure a smooth setup.",
      },
      {
        question: "What are your processing fees?",
        answer:
          "Our processing fees vary depending on your business volume, transaction types, and selected plan. We offer transparent pricing with no hidden fees. Contact our sales team for a customized quote tailored to your specific needs.",
      },
    ],
    account: [
      {
        question: "How do I update my billing information?",
        answer:
          "You can update your billing information in the Account Settings section of your dashboard. Navigate to 'Billing & Payments' and select 'Update Payment Method' to make changes to your payment details.",
      },
      {
        question: "When do you charge subscription fees?",
        answer:
          "Subscription fees are charged on the first day of each billing cycle. The specific date depends on when you initially signed up for our services. You can find your next billing date in your account dashboard under 'Subscription Details'.",
      },
      {
        question: "How do I change my subscription plan?",
        answer:
          "To change your subscription plan, go to 'Account Settings' → 'Subscription' and select 'Change Plan'. You can upgrade at any time, with the new rate prorated for the remainder of your billing period. Downgrades will take effect at the start of your next billing cycle.",
      },
    ],
    technical: [
      {
        question: "My transactions are failing, what should I do?",
        answer:
          "First, check your API keys and ensure they're correctly implemented. Verify that the customer's payment information is accurate and that you're sending all required fields. For persistent issues, review our error logs in your dashboard and contact our technical support with the transaction ID for further assistance.",
      },
      {
        question: "How do I implement 3D Secure authentication?",
        answer:
          "Our API automatically handles 3D Secure authentication when required. Simply use our standard payment flow, and our system will dynamically trigger 3D Secure when needed based on the card issuer's requirements and regulations in your customer's region.",
      },
      {
        question: "Do you provide a sandbox environment for testing?",
        answer:
          "Yes, we provide a fully-featured sandbox environment that mimics our production system. This allows you to test integrations, payment flows, and features without processing real transactions. Access your sandbox credentials from the 'Developer' section of your dashboard.",
      },
    ],
    integration: [
      {
        question: "Do you offer plugins for common e-commerce platforms?",
        answer:
          "Yes, we provide official plugins for all major e-commerce platforms including Shopify, WooCommerce, Magento, BigCommerce, and more. These plugins offer seamless integration with minimal development effort required.",
      },
      {
        question: "How long does integration typically take?",
        answer:
          "Integration time varies depending on the complexity of your requirements. Basic integrations using our plugins can be completed in hours, while custom API integrations typically take 1-2 weeks. Our support team is available to assist throughout the process to ensure efficient implementation.",
      },
      {
        question: "Do you provide sample code for common use cases?",
        answer:
          "Yes, our developer documentation includes extensive code samples in multiple programming languages (JavaScript, Python, PHP, Ruby, Java, and .NET). We also provide complete sample applications demonstrating common payment flows that you can use as a reference.",
      },
    ],
    security: [
      {
        question: "How do you ensure payment security?",
        answer:
          "We maintain PCI DSS Level 1 compliance (the highest level) and implement multiple layers of security including encryption, tokenization, and fraud prevention systems. All sensitive data is encrypted both in transit and at rest, and we conduct regular security audits and penetration testing.",
      },
      {
        question: "What fraud prevention measures do you have?",
        answer:
          "Our platform includes advanced fraud detection tools that use machine learning algorithms to analyze transaction patterns and flag suspicious activities. Features include address verification (AVS), CVV verification, device fingerprinting, velocity checks, and customizable risk rules tailored to your business needs.",
      },
      {
        question: "How do you handle data protection compliance?",
        answer:
          "We are fully compliant with GDPR, CCPA, and other regional data protection regulations. We only collect necessary data, provide transparent data processing policies, and implement appropriate technical and organizational measures to protect personal information.",
      },
    ],
  };

  const filteredFaqs = searchQuery
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqs[activeCategory];

  return (
    <div className={`support-container ${theme}`}>
      <div className="support-header">
        <h1 className="support-title">
          Customer <span style={{ color: primaryColor }}>Support</span>
        </h1>
        <div
          className="accent-line"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <p className="support-subtitle">
          We're here to help you succeed. Find answers to common questions or
          reach out to our team.
        </p>
      </div>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for answers..."
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

      <section className="faq-section">
        {!searchQuery && (
          <div className="faq-categories">
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

        <div className="faq-list">
          {searchQuery && filteredFaqs.length === 0 ? (
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
              <h3>No results found</h3>
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
            filteredFaqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <details className="faq-details">
                  <summary className="faq-question">
                    {faq.question}
                    <div className="faq-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
                <div
                  className="faq-divider"
                  style={{
                    backgroundColor: theme === "dark" ? "#2d2d2d" : "#e5e5e5",
                  }}
                ></div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-header">
          <h2 className="contact-title">
            Still have <span style={{ color: primaryColor }}>questions?</span>
          </h2>
          <p className="contact-subtitle">
            Our support team is ready to assist you with any inquiries or issues
            you may have.
          </p>
        </div>

        <div className="contact-options">
          <div className="contact-card">
            <div
              className="contact-icon"
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className="contact-method">Call Us</h3>
            <p className="contact-info">1-800-PAY-MENT</p>
            <p className="contact-details">
              Available Monday-Friday, 9am-6pm EST
            </p>
          </div>

          <div className="contact-card">
            <div
              className="contact-icon"
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className="contact-method">Email Support</h3>
            <p className="contact-info">support@codeblaze.com</p>
            <p className="contact-details">
              We typically respond within 24 hours
            </p>
          </div>

          <div className="contact-card">
            <div
              className="contact-icon"
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
            <h3 className="contact-method">Live Chat</h3>
            <p className="contact-info">Chat with our agents</p>
            <p className="contact-details">
              Available 24/7 for immediate assistance
            </p>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="resources-header">
          <h2 className="resources-title">
            Additional <span style={{ color: primaryColor }}>Resources</span>
          </h2>
        </div>

        <div className="resources-grid">
          <a href="/documentation" className="resource-card">
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
            <h3 className="resource-title">Developer Docs</h3>
            <p className="resource-description">
              Comprehensive guides and API reference for developers
            </p>
          </a>

          <a href="/tutorials" className="resource-card">
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
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3 className="resource-title">Video Tutorials</h3>
            <p className="resource-description">
              Step-by-step video guides for common tasks and integrations
            </p>
          </a>

          <a href="/knowledge-base" className="resource-card">
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
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3 className="resource-title">Knowledge Base</h3>
            <p className="resource-description">
              In-depth articles and troubleshooting guides for common issues
            </p>
          </a>

          <a href="/community" className="resource-card">
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
            <h3 className="resource-title">Community Forum</h3>
            <p className="resource-description">
              Connect with other users and share best practices
            </p>
          </a>
        </div>
      </section>

      <style jsx>{`
        .support-container {
          padding: 2rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .support-container.dark {
          background-color: #0a0a0a;
          color: #ffffff;
        }

        .support-container.light {
          background-color: #ffffff;
          color: #0a0a0a;
        }

        .support-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .support-title {
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

        .support-subtitle {
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

        .faq-section {
          margin-bottom: 4rem;
        }

        .faq-categories {
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

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          margin-bottom: 0.5rem;
        }

        .faq-details {
          cursor: pointer;
          user-select: none;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          list-style: none;
        }

        .faq-question::-webkit-details-marker {
          display: none;
        }

        .faq-icon {
          width: 24px;
          height: 24px;
          transition: transform 0.3s ease;
        }

        details[open] .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 0 1.5rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .faq-divider {
          height: 1px;
          width: 100%;
        }

        .no-results {
          text-align: center;
          padding: 3rem 0;
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

        .contact-section {
          margin-bottom: 4rem;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .contact-subtitle {
          max-width: 700px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .contact-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .contact-card {
          padding: 2rem;
          text-align: center;
          border-radius: 10px;
          background-color: ${theme === "dark" ? "#111" : "#f8f8f8"};
          transition: transform 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
        }

        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .contact-icon svg {
          width: 30px;
          height: 30px;
          color: white;
        }

        .contact-method {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .contact-info {
          font-size: 1.1rem;
          margin: 0 0 0.5rem;
        }

        .contact-details {
          margin: 0;
          opacity: 0.7;
          font-size: 0.9rem;
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
          .faq-categories {
            flex-direction: column;
            align-items: stretch;
          }

          .contact-options,
          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Support;
