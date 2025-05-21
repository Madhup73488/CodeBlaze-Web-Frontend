import React, { useState, useEffect } from "react";

function TermsOfService({ theme = "light", color = "purple" }) {
  const [activeSection, setActiveSection] = useState("");
  const [expanded, setExpanded] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);

  // Theme configuration - same as Privacy Policy component
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

  // Base styles - same structure as Privacy Policy with specific adjustments
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
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: "✅",
      content: `
        <p>By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        <p>These Terms constitute a legally binding agreement between you and our company regarding your access to and use of our website, mobile application, and services (collectively, the "Services").</p>
        <ul>
          <li><strong>Age Requirement:</strong> You must be at least 18 years old to use our Services. By accessing or using our platform, you represent and warrant that you are at least 18 years of age.</li>
          <li><strong>Legal Authority:</strong> If you are using the Services on behalf of a company, organization, or other entity, you represent and warrant that you have the legal authority to bind that entity to these Terms.</li>
        </ul>
      `,
    },
    {
      id: "account-registration",
      title: "Account Registration",
      icon: "👤",
      content: `
        <p>To access certain features of our platform, you may be required to register for an account. When registering, you agree to provide accurate, current, and complete information.</p>
        <ul>
          <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
          <li><strong>One Account Per Person:</strong> You may not create multiple accounts or transfer your account to anyone else.</li>
          <li><strong>Account Termination:</strong> We reserve the right to suspend or terminate your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</li>
          <li><strong>Communication Preferences:</strong> By creating an account, you consent to receive electronic communications from us related to your account and the Services.</li>
        </ul>
      `,
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: "©️",
      content: `
        <p>All content included on this website, including text, graphics, logos, images, and software, is the property of our company or our content suppliers and is protected by copyright and other intellectual property laws.</p>
        <ul>
          <li><strong>Limited License:</strong> We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use our Services for your personal or internal business purposes.</li>
          <li><strong>Restrictions:</strong> You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as generally and ordinarily permitted through the Services according to these Terms.</li>
          <li><strong>Trademarks:</strong> Our name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of our company or our affiliates. You may not use such marks without our prior written permission.</li>
        </ul>
      `,
    },
    {
      id: "user-content",
      title: "User Content",
      icon: "📝",
      content: `
        <p>Our Services may allow you to post, upload, or submit content, including text, images, and other materials ("User Content").</p>
        <ul>
          <li><strong>Ownership:</strong> You retain all ownership rights in your User Content. However, by posting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content.</li>
          <li><strong>Responsibility:</strong> You are solely responsible for your User Content and the consequences of posting it. We do not endorse any User Content or any opinion, recommendation, or advice expressed therein.</li>
          <li><strong>Prohibited Content:</strong> You may not post User Content that is illegal, fraudulent, deceptive, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.</li>
          <li><strong>Monitoring:</strong> We have the right, but not the obligation, to monitor, edit, or remove any User Content.</li>
        </ul>
      `,
    },
    {
      id: "subscription-payments",
      title: "Subscription & Payments",
      icon: "💳",
      content: `
        <p>We offer both free and paid subscription plans for our Services. By selecting a paid subscription, you agree to pay all fees associated with your selected plan.</p>
        <ul>
          <li><strong>Billing Cycle:</strong> Subscription fees are billed in advance on a monthly or annual basis, depending on the payment plan you select.</li>
          <li><strong>Automatic Renewal:</strong> Your subscription will automatically renew at the end of each billing period unless you cancel it before the renewal date.</li>
          <li><strong>Price Changes:</strong> We reserve the right to adjust pricing for our Services at any time. We will notify you of any price changes before they take effect.</li>
          <li><strong>Refunds:</strong> Payments are non-refundable except as expressly provided in these Terms or as required by applicable law.</li>
          <li><strong>Taxes:</strong> You are responsible for all applicable taxes associated with your subscription.</li>
        </ul>
        <p>For premium subscribers, we offer enhanced features and dedicated support options as outlined in your subscription plan details.</p>
      `,
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: "🚫",
      content: `
        <p>You agree not to engage in any of the following activities in connection with your use of our Services:</p>
        <ul>
          <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law</li>
          <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Services</li>
          <li>Using any robot, spider, crawler, scraper, or other automated means to access the Services</li>
          <li>Bypassing measures we may use to prevent or restrict access to the Services</li>
          <li>Introducing any viruses, Trojan horses, worms, logic bombs, or other harmful material</li>
          <li>Collecting or harvesting any personally identifiable information from the Services</li>
          <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity</li>
          <li>Interfering with the proper working of the Services</li>
        </ul>
        <p>Violation of these prohibitions may result in termination of your access to the Services and potential legal action.</p>
      `,
    },
    {
      id: "liability-limitations",
      title: "Liability Limitations",
      icon: "⚖️",
      content: `
        <p>To the maximum extent permitted by law, we disclaim all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
        <ul>
          <li><strong>Service Availability:</strong> We do not guarantee that our Services will be uninterrupted, secure, or error-free.</li>
          <li><strong>Limitation of Liability:</strong> In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.</li>
          <li><strong>Cap on Liability:</strong> Our total liability for any claims arising under these Terms shall not exceed the amount you paid to us for the Services during the 12 months preceding the claim.</li>
          <li><strong>Force Majeure:</strong> We will not be liable for any failure or delay in performance resulting from causes beyond our reasonable control.</li>
        </ul>
        <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for certain types of damages, so some of the above limitations may not apply to you.</p>
      `,
    },
    {
      id: "dispute-resolution",
      title: "Dispute Resolution",
      icon: "🔍",
      content: `
        <p>In the event of any dispute arising from or relating to these Terms or our Services, you agree to first attempt to resolve the dispute informally by contacting us.</p>
        <ul>
          <li><strong>Arbitration:</strong> If the dispute cannot be resolved informally, you and we agree to resolve the dispute through binding arbitration rather than in court, except that you may assert claims in small claims court if your claims qualify.</li>
          <li><strong>Class Action Waiver:</strong> You and we agree that any proceedings to resolve disputes will be conducted on an individual basis and not in a class, consolidated, or representative action.</li>
          <li><strong>Governing Law:</strong> These Terms and any dispute arising from them shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles.</li>
          <li><strong>Time Limitation:</strong> Any cause of action or claim you may have arising out of or relating to these Terms or the Services must be commenced within one year after the cause of action accrues.</li>
        </ul>
      `,
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      icon: "📋",
      content: `
        <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes through our Services or by other means.</p>
        <ul>
          <li><strong>Effective Date:</strong> Changes to these Terms will be effective when posted, unless a different effective date is indicated.</li>
          <li><strong>Continued Use:</strong> Your continued use of our Services following the posting of any changes constitutes your acceptance of such changes.</li>
          <li><strong>Material Changes:</strong> For material changes to these Terms, we will make reasonable efforts to provide at least 30 days' notice before the changes take effect.</li>
        </ul>
        <p>It is your responsibility to review these Terms periodically to stay informed of updates.</p>
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
        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.subtitle}>
          Please read these terms carefully before using our services.
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
                  border: `1px solid ${colors.border}`, // Ensure border is explicitly set
                  textAlign: 'center', // Ensure text alignment
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
                {section.id === "subscription-payments" && (
                  <span style={styles.badge}>Premium</span>
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

export default TermsOfService;
