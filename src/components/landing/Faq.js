import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./Faq.css";

const faqs = [
  {
    question: "Do I need any prior experience before starting a course?",
    answer:
      "Our expert-led courses focus on real-world skills with lifetime access and community support.",
  },
  {
    question: "How long will I have access to the course materials after enrolling?",
    answer:
      "You'll have lifetime access to all course materials, including updates and new content additions.",
  },
  {
    question: "Are the certificates you provide recognized or useful for career advancement?",
    answer:
      "Yes, our certificates are industry-recognized and valued by employers. They demonstrate your commitment to professional development and mastery of relevant skills.",
  },
  {
    question: "Can I interact with instructors or get support during the course?",
    answer:
      "Absolutely! You can interact with instructors through our discussion forums, live Q&A sessions, and dedicated support channels throughout your learning journey.",
  },
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <div
        className={`bg-gray-100 rounded-2xl p-6 transition-all duration-300 ${
          isOpen ? "bg-gray-200" : "hover:bg-gray-150"
        }`}
      >
        <button
          className="w-full flex justify-between items-center text-left"
          onClick={onClick}
        >
          <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </button>
        {isOpen && (
          <div className="mt-4 text-gray-700 leading-relaxed">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-purple-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Got questions? We've answered the most common ones to help you get started confidently.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
