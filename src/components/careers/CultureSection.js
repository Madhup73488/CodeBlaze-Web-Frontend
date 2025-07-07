
// components/Careers/CultureSection.jsx
const CultureSection = ({ theme, colorStyles }) => {
  const isDarkMode = theme === "dark";
  const bgColor = isDarkMode ? "#111827" : "#f9fafb";
  const cardBgColor = isDarkMode ? "#1f2937" : "#ffffff";
  const textColor = isDarkMode ? "#f9fafb" : "#111827";
  const mutedTextColor = isDarkMode ? "#9ca3af" : "#6b7280";

  const values = [
    {
      icon: "🚀",
      title: "Innovation",
      description:
        "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.",
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description:
        "We believe great things happen when diverse minds work together toward common goals.",
    },
    {
      icon: "🔄",
      title: "Adaptability",
      description:
        "We embrace change and continuously evolve our approaches to stay ahead of industry trends.",
    },
    {
      icon: "💡",
      title: "Excellence",
      description:
        "We're committed to delivering the highest quality in everything we do.",
    },
  ];

  return (
    <section
      className="py-20"
      style={{ background: bgColor, color: textColor }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>
            Our Culture
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colorStyles.primary }}
          ></div>
          <p
            className="mt-6 max-w-2xl mx-auto text-lg"
            style={{ color: mutedTextColor }}
          >
            We've built a culture that encourages creativity, collaboration, and
            growth. At CodeBlaze, you'll find a supportive environment where
            your ideas matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 rounded-lg transition-all"
              style={{
                background: cardBgColor,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center text-2xl rounded-full mb-4"
                style={{
                  background: `linear-gradient(135deg, ${colorStyles.primary}, ${colorStyles.secondary})`,
                }}
              >
                {value.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: textColor }}
              >
                {value.title}
              </h3>
              <p style={{ color: mutedTextColor }}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
  
  export default CultureSection;
