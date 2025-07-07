
// components/Careers/TestimonialsSection.jsx
const TestimonialsSection = ({ theme, colorStyles }) => {
  const isDarkMode = theme === "dark";
  const bgColor = isDarkMode ? "#111827" : "#f9fafb";
  const cardBgColor = isDarkMode ? "#1f2937" : "#ffffff";
  const textColor = isDarkMode ? "#f9fafb" : "#111827";
  const mutedTextColor = isDarkMode ? "#9ca3af" : "#6b7280";

  const testimonials = [
    {
      quote:
        "Working at CodeBlaze has been the highlight of my career. The collaborative environment and challenging projects keep me constantly learning and growing.",
      name: "Alex Johnson",
      role: "Senior Developer",
      image: "/images/team-member-1.jpg",
    },
    {
      quote:
        "What sets CodeBlaze apart is the culture of innovation. We're encouraged to experiment with new technologies and approaches to solve complex problems.",
      name: "Sarah Chen",
      role: "UX Designer",
      image: "/images/team-member-2.jpg",
    },
    {
      quote:
        "The remote-first approach at CodeBlaze gives me the flexibility I need while still feeling connected to an amazing team of professionals.",
      name: "Miguel Rodriguez",
      role: "Product Manager",
      image: "/images/team-member-3.jpg",
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
            Team Testimonials
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colorStyles.primary }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg transition-all flex flex-col items-center text-center"
              style={{
                background: cardBgColor,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="w-20 h-20 mb-6 rounded-full bg-gray-300 overflow-hidden"
                style={{ border: `3px solid ${colorStyles.primary}` }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="mb-4 text-4xl"
                style={{ color: colorStyles.primary }}
              >
                ❝
              </div>
              <p className="mb-6 italic" style={{ color: mutedTextColor }}>
                {testimonial.quote}
              </p>
              <h4 className="font-semibold" style={{ color: textColor }}>
                {testimonial.name}
              </h4>
              <p className="text-sm opacity-75" style={{ color: mutedTextColor }}>
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
