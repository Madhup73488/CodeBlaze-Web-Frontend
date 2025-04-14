// components/Careers/FAQSection.jsx
import { useState } from "react";

const FAQSection = ({ theme, colorStyles }) => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  const faqs = [
    {
      question: "What is the interview process like?",
      answer:
        "Our interview process typically consists of an initial screening call, followed by a technical assessment, and finally a team interview. The entire process usually takes 1-2 weeks depending on scheduling.",
    },
    {
      question: "Do you offer relocation assistance?",
      answer:
        "As a remote-first company, many of our positions don't require relocation. However, for specific roles that require on-site presence, we do offer relocation packages on a case-by-case basis.",
    },
    {
      question: "What are your working hours?",
      answer:
        "We embrace flexible working hours with core collaboration hours from 10 AM to 2 PM EST. Outside of those hours, team members are free to structure their workday as they see fit, as long as deliverables are met.",
    },
    {
      question: "How do you support professional development?",
      answer:
        "We provide a yearly learning budget for courses, conferences, and certifications. We also hold regular internal workshops and encourage knowledge sharing among team members.",
    },
    {
      question: "What is your tech stack?",
      answer:
        "We use a variety of technologies depending on project requirements. Our core stack includes React, Node.js, Python, AWS, and various database technologies. We're always open to adopting new technologies when they're the right fit for a solution.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(index === openQuestionIndex ? -1 : index);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div
            className="w-24 h-1 mx-auto"
            style={{ backgroundColor: colorStyles.primary }}
          ></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg overflow-hidden transition-all"
              style={{
                background: theme === "dark" ? "#1a1a1a" : "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <button
                className="w-full p-4 text-left flex items-center justify-between font-medium"
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>
                <span
                  className="text-xl transition-transform"
                  style={{
                    color: colorStyles.primary,
                    transform:
                      openQuestionIndex === index
                        ? "rotate(45deg)"
                        : "rotate(0)",
                  }}
                >
                  +
                </span>
              </button>
              {openQuestionIndex === index && (
                <div
                  className="p-4 pt-0 border-t"
                  style={{ borderColor: theme === "dark" ? "#333" : "#eee" }}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6">
            Still have questions about working at CodeBlaze?
          </p>
          <button
            className="px-6 py-3 rounded-md text-white font-medium transition-all"
            style={{ backgroundColor: colorStyles.primary }}
          >
            Contact Our Recruitment Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
