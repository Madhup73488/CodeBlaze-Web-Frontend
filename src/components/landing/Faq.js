import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./Faq.css";

const faqs = [
  {
    question: "What is Codeblaze?",
    answer:
      "Codeblaze is an online learning platform that offers a wide range of courses and internships in the tech industry. We provide expert-led training to help you launch and advance your career.",
  },
  {
    question: "How do I sign up for Courses on Codeblaze?",
    answer:
      "You can sign up for courses by browsing our course catalog, selecting a course you're interested in, and clicking the 'Enroll Now' or 'Add to Bag' button. You'll be guided through the registration and payment process.",
  },
  {
    question: "Are the Courses on Codeblaze self-paced?",
    answer:
      "Yes, most of our courses are self-paced, allowing you to learn at your own convenience. You can access course materials and lectures anytime, anywhere.",
  },
  {
    question: "What types of Courses are available on Codeblaze?",
    answer:
      "We offer a variety of courses in web development, data science, cybersecurity, cloud computing, and more. Our curriculum is designed to meet the demands of the current job market.",
  },
  {
    question: "How can I interact with instructors and other learners?",
    answer:
      "Our platform includes discussion forums and Q&A sections where you can interact with instructors and fellow learners. We also offer live sessions and workshops for more direct engagement.",
  },
  {
    question: "Is technical support available if I encounter any issues?",
    answer:
      "Yes, we provide technical support to help you with any platform-related issues. You can reach out to our support team via email or the help center.",
  },
  {
    question: "Can I access the Course materials on mobile devices?",
    answer:
      "Absolutely! Our platform is fully responsive, and you can access all course materials on your smartphone or tablet.",
  },
  {
    question: "What happens if I need to pause my studies or take a break?",
    answer:
      "With our self-paced courses, you can take a break and resume your studies whenever you're ready. Your progress will be saved, so you can pick up right where you left off.",
  },
  {
    question:
      "Is there a refund policy in case I'm not satisfied with a Course?",
    answer:
      "Yes, we have a refund policy. Please refer to our 'Cancellation and Refund Policy' page for detailed information.",
  },
];

const FaqItem = ({ faq, isOpen, onClick }) => {
  return (
    <div
      className={`faq-item border-b border-gray-200 py-2 ${
        isOpen ? "open" : ""
      }`}
    >
      <button
        className="w-full flex justify-between items-center text-left p-2"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <div className="faq-answer mt-4 text-gray-600 px-4">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="pt-16"
      style={{ backgroundColor: "hsl(var(--website-background))" }}
    >
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-left sm:text-center text-gray-900 mb-8">
          Frequently Asked <span className="text-red-500">Questions</span>
        </h2>
        <div className="max-w-3xl mx-auto">
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
