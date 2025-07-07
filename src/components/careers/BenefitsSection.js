
// components/Careers/BenefitsSection.jsx
const BenefitsSection = ({ theme, colorStyles }) => {
  const isDarkMode = theme === "dark";
  const bgColor = isDarkMode ? "#111827" : "#f9fafb";
  const cardBgColor = isDarkMode ? "#1f2937" : "#ffffff";
  const textColor = isDarkMode ? "#f9fafb" : "#111827";
  const mutedTextColor = isDarkMode ? "#9ca3af" : "#6b7280";

  const benefits = [
    {
      icon: "💻",
      title: "Remote-First Culture",
      description:
        "Work from anywhere with flexible hours that fit your lifestyle.",
    },
    {
      icon: "🏥",
      title: "Comprehensive Healthcare",
      description:
        "Full medical, dental, and vision coverage for you and your family.",
    },
    {
      icon: "💰",
      title: "Competitive Compensation",
      description:
        "Salary packages designed to attract and retain top talent.",
    },
    {
      icon: "🎓",
      title: "Learning & Development",
      description:
        "Dedicated budget for courses, conferences, and certifications.",
    },
    {
      icon: "🧘",
      title: "Wellness Programs",
      description:
        "Mental health resources, fitness reimbursements, and more.",
    },
    {
      icon: "🌴",
      title: "Generous PTO",
      description: "Take the time you need to recharge and stay productive.",
    },
  ];

  return (
    <section className="py-20" style={{ background: bgColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-2/5">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: textColor }}
            >
              Benefits & Perks
            </h2>
            <div
              className="w-24 h-1 mb-6"
              style={{ backgroundColor: colorStyles.primary }}
            ></div>
            <p className="text-lg mb-6" style={{ color: mutedTextColor }}>
              We believe in taking care of our team with comprehensive benefits
              that support your professional growth, personal wellbeing, and
              work-life balance.
            </p>
            <img
              src="/images/team-benefits.jpg"
              alt="Team enjoying benefits"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg transition-all flex gap-4"
                  style={{
                    background: cardBgColor,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${colorStyles.primary}, ${colorStyles.secondary})`,
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: textColor }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-sm" style={{ color: mutedTextColor }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
