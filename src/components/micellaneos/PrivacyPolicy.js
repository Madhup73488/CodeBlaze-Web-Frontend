import React from "react";

function PrivacyPolicy({ theme, color }) {
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  const sections = [
    {
      id: "information-collection",
      title: "Information Collection",
      content: `
        <p>We collect several types of information from and about users of our platform, including:</p>
        <ul>
          <li><strong>Personal Information:</strong> This includes contact data (email address, phone number, billing address) and account credentials that you provide when registering or using our services.</li>
          <li><strong>Transaction Information:</strong> When you process payments through our platform, we collect data necessary to complete these transactions, including payment card details, bank account information, and transaction histories.</li>
          <li><strong>Technical Data:</strong> We automatically collect certain information when you visit our platform, including IP address, browser type, device information, operating system, and cookies.</li>
          <li><strong>Usage Information:</strong> We collect data about how you interact with our platform, including pages visited, features used, and time spent on various services.</li>
        </ul>
        <p>We use industry-standard encryption and security measures to protect sensitive personal and financial information during transmission and storage.</p>
      `,
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      content: `
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li>Processing transactions and providing payment services</li>
          <li>Creating and maintaining your account</li>
          <li>Providing customer support and responding to inquiries</li>
          <li>Improving and optimizing our platform and services</li>
          <li>Detecting and preventing fraud, unauthorized access, and other prohibited activities</li>
          <li>Complying with legal obligations and enforcing our terms</li>
          <li>Sending administrative communications about security, privacy, and platform updates</li>
          <li>With your consent, sending marketing communications about our products and services</li>
        </ul>
      `,
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      content: `
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, such as payment processing, data analysis, email delivery, hosting, and customer service.</li>
          <li><strong>Financial Institutions:</strong> Banks and payment networks that facilitate transactions.</li>
          <li><strong>Business Partners:</strong> Strategic partners who offer complementary services or joint offerings.</li>
          <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process, or to protect our rights and safety.</li>
          <li><strong>Corporate Transactions:</strong> In connection with a merger, acquisition, or sale of assets.</li>
        </ul>
        <p>We do not sell your personal information to third parties for their marketing purposes without your explicit consent.</p>
      `,
    },
    {
      id: "data-security",
      title: "Data Security",
      content: `
        <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
        <ul>
          <li>Encryption of sensitive data in transit and at rest</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Monitoring systems for suspicious activities</li>
          <li>Employee training on security practices and confidentiality</li>
        </ul>
        <p>While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
      `,
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: `
        <p>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:</p>
        <ul>
          <li>The duration of our ongoing relationship with you</li>
          <li>Legal obligations to retain data for certain periods</li>
          <li>Statutes of limitations under applicable law</li>
          <li>Ongoing business needs such as financial record-keeping</li>
          <li>Resolution of disputes and enforcement of agreements</li>
        </ul>
      `,
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content: `
        <p>Depending on your location, you may have certain rights regarding your personal information, which may include:</p>
        <ul>
          <li>Access to your personal information</li>
          <li>Correction of inaccurate or incomplete data</li>
          <li>Deletion of your personal information</li>
          <li>Restriction of processing of your personal information</li>
          <li>Data portability to transfer your information to another service</li>
          <li>Objection to certain processing activities</li>
          <li>Withdrawal of consent at any time</li>
          <li>Lodging a complaint with a data protection authority</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
      `,
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      content: `
        <p>We use cookies and similar tracking technologies to collect and use information about you and your interactions with our platform. These technologies help us identify you across different pages and visits, secure your access, and collect analytical information about user behavior.</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic functionality and security features</li>
          <li><strong>Analytical Cookies:</strong> Help us understand how users interact with our platform</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track campaign performance</li>
        </ul>
        <p>You can control cookies through your browser settings and other tools, but blocking certain cookies may impact your experience and the services available to you.</p>
      `,
    },
    {
      id: "changes",
      title: "Changes to Our Privacy Policy",
      content: `
        <p>We may update our Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, and other factors. When we make material changes, we will:</p>
        <ul>
          <li>Post the updated policy on our website</li>
          <li>Update the "Last Updated" date at the top of the policy</li>
          <li>Provide notice through our platform or by email for significant changes</li>
        </ul>
        <p>We encourage you to review our Privacy Policy periodically to stay informed about our data practices.</p>
      `,
    },
    {
      id: "contact",
      title: "Contact Us",
      content: `
        <p>If you have questions, concerns, or requests related to our Privacy Policy or your personal information, please contact us at:</p>
        <p>Email: privacy@example.com</p>
        <p>Address: 123 Privacy Street, Security City, ST 12345</p>
        <p>Phone: (555) 123-4567</p>
        <p>We will respond to your inquiry as soon as reasonably possible.</p>
      `,
    },
  ];

  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <div
      className={`privacy-policy ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <h1 style={{ color: primaryColor }}>Privacy Policy</h1>
      <p className="last-updated">Last Updated: April 15, 2025</p>

      <div className="policy-introduction">
        <p>
          This Privacy Policy describes how we collect, use, disclose, and
          protect your information when you use our payment processing services,
          website, and related applications. Please read this policy carefully
          to understand our practices regarding your information.
        </p>
      </div>

      <div className="table-of-contents">
        <h2 style={{ color: primaryColor }}>Contents</h2>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} style={{ color: primaryColor }}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {sections.map((section) => (
        <div key={section.id} id={section.id} className="policy-section">
          <h2 style={{ color: primaryColor }}>{section.title}</h2>
          <div dangerouslySetInnerHTML={renderHTML(section.content)} />
        </div>
      ))}

      <div className="policy-footer">
        <p>© 2025 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
