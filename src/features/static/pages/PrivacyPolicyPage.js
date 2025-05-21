import React, { useState, useEffect } from "react";

function PremiumPrivacyPolicy({ theme = "light", color = "purple" }) {
  const [activeSection, setActiveSection] = useState("");
  const [expanded, setExpanded] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);

  // Theme configuration
  const themeConfig = {
    light: {
      primary: color === "purple" ? "#8B5CF6" : "#F97316",
      secondary: color === "purple" ? "#C4B5FD" : "#FDBA74",
      background: "#FFFFFF",
      cardBg: "#F9FAFB",
      textPrimary: "#1F2937",
      textSecondary: "#4B5563",
      border: "#E5E7EB",
      shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      highlight:
        color === "purple"
          ? "rgba(139, 92, 246, 0.1)"
          : "rgba(249, 115, 22, 0.1)",
    },
    dark: {
      primary: color === "purple" ? "#A78BFA" : "#FB923C",
      secondary: color === "purple" ? "#7C3AED" : "#EA580C",
      background: "rgb(0 0 0)",
      cardBg: "#1F2937",
      textPrimary: "#F9FAFB",
      textSecondary: "#D1D5DB",
      border: "#374151",
      shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      highlight:
        color === "purple"
          ? "rgba(167, 139, 250, 0.15)"
          : "rgba(251, 146, 60, 0.15)",
    },
  };

  const colors = themeConfig[theme];

  // Base styles
  const styles = {
    container: {
      backgroundColor: colors.background,
      color: colors.textPrimary,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      maxWidth: "100%", // Changed from 1100px
      margin: "0 auto",
      padding: "40px 30px",
      borderRadius: "12px",
      boxShadow: colors.shadow,
      position: "relative",
      overflow: "hidden",
    },
    header: {
      position: "relative",
      marginBottom: "50px",
      padding: "20px 0",
      textAlign: "center",
      borderBottom: `1px solid ${colors.border}`,
    },
    title: {
      color: colors.primary,
      fontSize: "42px",
      fontWeight: "800",
      margin: "0 0 10px 0",
      letterSpacing: "-0.025em",
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: "16px",
      fontWeight: "400",
      margin: "0 0 20px 0",
    },
    lastUpdated: {
      display: "inline-block",
      backgroundColor: colors.highlight,
      color: colors.primary,
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
    },
    decoration: {
      position: "absolute",
      top: "0",
      right: "0",
      width: "150px",
      height: "150px",
      borderRadius: "75px",
      background: `radial-gradient(circle at center, ${colors.primary}20, ${colors.primary}00)`,
      zIndex: "0",
    },
    navigation: {
      backgroundColor: colors.cardBg,
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
      position: "sticky",
      top: "20px",
      boxShadow: colors.shadow,
      zIndex: "10",
      transition: "all 0.3s ease",
    },
    navTitle: {
      color: colors.primary,
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "15px",
    },
    navList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    navItem: {
      margin: "0",
      flex: "1 0 auto",
    },
    navLink: {
      display: "block",
      padding: "10px 15px",
      backgroundColor: (id) =>
        activeSection === id ? colors.highlight : "transparent",
      color: (id) =>
        activeSection === id ? colors.primary : colors.textSecondary,
      borderRadius: "8px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      border: `1px solid ${colors.border}`,
      textAlign: "center",
      cursor: "pointer",
    },
    content: {
      display: "flex",
      gap: "30px",
    },
    sidebar: {
      width: "250px",
      flexShrink: "0",
    },
    mainContent: {
      flex: "1",
    },
    section: {
      marginBottom: "40px",
      backgroundColor: colors.cardBg,
      borderRadius: "12px",
      padding: "0",
      overflow: "hidden",
      boxShadow: colors.shadow,
      border: `1px solid ${colors.border}`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    sectionActive: {
      transform: "translateY(-5px)",
      boxShadow: `0 20px 25px -5px ${colors.primary}20`,
    },
    sectionHeader: {
      padding: "20px 25px",
      borderBottom: (id) =>
        expanded[id] ? `1px solid ${colors.border}` : "none",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
    },
    sectionTitle: {
      color: colors.primary,
      fontSize: "20px",
      fontWeight: "600",
      margin: "0",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    sectionIcon: {
      color: colors.primary,
      fontSize: "16px",
      transform: (id) => (expanded[id] ? "rotate(180deg)" : "rotate(0)"),
      transition: "transform 0.3s ease",
    },
    sectionContent: {
      padding: (id) => (expanded[id] ? "25px" : "0"),
      maxHeight: (id) => (expanded[id] ? "2000px" : "0"),
      opacity: (id) => (expanded[id] ? "1" : "0"),
      transition: "all 0.5s ease",
      overflow: "hidden",
    },
    paragraph: {
      margin: "0 0 20px 0",
      lineHeight: "1.8",
      fontSize: "15px",
      color: colors.textSecondary,
    },
    list: {
      padding: "0 0 0 20px",
      margin: "20px 0",
    },
    listItem: {
      margin: "12px 0",
      lineHeight: "1.7",
      fontSize: "15px",
      color: colors.textSecondary,
      position: "relative",
    },
    strong: {
      color: colors.primary,
      fontWeight: "600",
    },
    divider: {
      height: "1px",
      backgroundColor: colors.border,
      margin: "30px 0",
      width: "100%",
    },
    footer: {
      textAlign: "center",
      marginTop: "50px",
      paddingTop: "30px",
      borderTop: `1px solid ${colors.border}`,
      color: colors.textSecondary,
      fontSize: "14px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      alignItems: "center",
    },
    iconContainer: {
      display: "flex",
      gap: "15px",
    },
    icon: {
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: colors.primary,
      backgroundColor: colors.highlight,
      borderRadius: "50%",
      transition: "transform 0.2s ease",
      cursor: "pointer",
    },
    contactInfo: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "20px 0",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    badge: {
      backgroundColor: colors.highlight,
      color: colors.primary,
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      marginLeft: "8px",
    },
    backToTop: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      backgroundColor: colors.primary,
      color: "#FFFFFF",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      cursor: "pointer",
      opacity: isScrolling ? "1" : "0",
      transform: isScrolling ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.3s ease",
      zIndex: "100",
    },
  };

  const sections = [
    {
      id: "information-collection",
      title: "Information Collection",
      icon: "📊",
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
      icon: "🔄",
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
      icon: "🔄",
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
      icon: "🔒",
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
      icon: "📅",
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
      icon: "⚖️",
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
      title: "Cookies & Tracking",
      icon: "🍪",
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
      title: "Policy Updates",
      icon: "📝",
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
  ];

  // Process HTML content to apply styles
  const processContent = (content) => {
    let styled = content
      .replace(
        /<p>/g,
        `<p style="margin: 0 0 20px 0; line-height: 1.8; font-size: 15px; color: ${colors.textSecondary};">`
      )
      .replace(/<ul>/g, `<ul style="padding: 0 0 0 20px; margin: 20px 0;">`)
      .replace(
        /<li>/g,
        `<li style="margin: 12px 0; line-height: 1.7; font-size: 15px; color: ${colors.textSecondary}; position: relative;">`
      )
      .replace(
        /<strong>/g,
        `<strong style="color: ${colors.primary}; font-weight: 600;">`
      );
    return styled;
  };

  // Initialize expanded state for sections
  useEffect(() => {
    const initialExpanded = {};
    sections.forEach((section) => {
      initialExpanded[section.id] = false;
    });
    // Set first section initially expanded
    initialExpanded[sections[0].id] = true;
    setExpanded(initialExpanded);
    setActiveSection(sections[0].id);
  }, [sections]); // Added sections to dependency array

  // Handle scroll detection for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle section expansion
  const toggleSection = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveSection(id);
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      {/* Decorative elements */}
      <div style={styles.decoration}></div>
      <div
        style={{
          ...styles.decoration,
          left: 0,
          top: "30%",
          width: "100px",
          height: "100px",
        }}
      ></div>
      <div
        style={{
          ...styles.decoration,
          right: "10%",
          bottom: "10%",
          width: "80px",
          height: "80px",
        }}
      ></div>

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.subtitle}>
          Your privacy matters to us. Let's be transparent about how we handle
          your data.
        </p>
        <span style={styles.lastUpdated}>Last Updated: April 15, 2025</span>
      </header>

      {/* Navigation */}
      <nav style={styles.navigation}>
        <h2 style={styles.navTitle}>Quick Access</h2>
        <ul style={styles.navList}>
          {sections.map((section) => (
            <li key={section.id} style={styles.navItem}>
              <button // Changed from <a> to <button>
                style={{
                  ...styles.navLink,
                  backgroundColor:
                    activeSection === section.id
                      ? colors.highlight
                      : "transparent",
                  color:
                    activeSection === section.id
                      ? colors.primary
                      : colors.textSecondary,
                  width: '100%', // Ensure button takes full width of li
                  border: `1px solid ${colors.border}`, // Ensure border is explicitly set as it was in navLink
                  textAlign: 'center', // Ensure text alignment is preserved
                  cursor: 'pointer', // Ensure cursor is pointer
                }}
                onClick={() => toggleSection(section.id)}
              >
                {section.icon} {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <div style={styles.mainContent}>
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            style={{
              ...styles.section,
              ...(activeSection === section.id ? styles.sectionActive : {}),
            }}
          >
            <div
              style={styles.sectionHeader}
              onClick={() => toggleSection(section.id)}
            >
              <h2 style={styles.sectionTitle}>
                <span>{section.icon}</span> {section.title}
                {section.id === "data-security" && (
                  <span style={styles.badge}>Enhanced</span>
                )}
              </h2>
              <span
                style={{
                  ...styles.sectionIcon,
                  transform: expanded[section.id]
                    ? "rotate(180deg)"
                    : "rotate(0)",
                }}
              >
                ▼
              </span>
            </div>
            <div
              style={{
                ...styles.sectionContent,
                padding: expanded[section.id] ? "25px" : "0",
                maxHeight: expanded[section.id] ? "2000px" : "0",
                opacity: expanded[section.id] ? "1" : "0",
              }}
              dangerouslySetInnerHTML={{
                __html: processContent(section.content),
              }}
            />
          </div>
        ))}
      </div>

      {/* Back to top button */}
      <div
        style={{
          ...styles.backToTop,
          opacity: isScrolling ? "1" : "0",
          transform: isScrolling ? "translateY(0)" : "translateY(20px)",
        }}
        onClick={scrollToTop}
      >
        ▲
      </div>
    </div>
  );
}

export default PremiumPrivacyPolicy;
