import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  HelpCircle,
  Users,
  Zap,
  Book,
  Shield,
  ChevronDown,
} from "lucide-react";
import "./Faq.css";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const basicFaqs = [
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

  const detailedFaqs = [
    {
      question: "What programs does Syntellite Labs offer?",
      answer:
        "We offer comprehensive training programs in Full-Stack Web Development, Cross-Platform Applications, Data Analysis with AI, and various other cutting-edge technologies. Our programs include internships, job placement assistance, and hands-on project experience.",
    },
    {
      question: "How do I get started with Syntellite Labs?",
      answer:
        "Getting started is simple! Browse our available programs, submit an application through our Apply page, and our admissions team will guide you through the enrollment process. We offer both full-time and part-time options to fit your schedule.",
    },
    {
      question: "What are the program fees and payment options?",
      answer:
        "Our program fees vary depending on the course and duration. We offer flexible payment plans, scholarships for eligible students, and various financing options. Contact our admissions team for detailed pricing and available financial assistance.",
    },
    {
      question: "Do you provide job placement assistance?",
      answer:
        "Yes! We have a 95% job placement rate and provide comprehensive career support including resume building, interview preparation, portfolio development, and direct connections with our hiring partners in the tech industry.",
    },
  ];

  const faqs = {
    general: showMore ? [...basicFaqs, ...detailedFaqs] : basicFaqs,
    account: [
      {
        question: "How do I access my student dashboard?",
        answer:
          "You can access your student dashboard by logging into your account on our website. Your dashboard contains course materials, progress tracking, assignments, and communication tools with instructors and peers.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Navigate to your profile settings in the student dashboard. You can update your personal information, contact details, emergency contacts, and preferences. Make sure to save changes after updating.",
      },
      {
        question: "What if I forget my login credentials?",
        answer:
          "Use the 'Forgot Password' link on the login page to reset your password. If you've forgotten your username or email, contact our support team with your full name and phone number for assistance.",
      },
    ],
    technical: [
      {
        question: "What technical requirements do I need for online courses?",
        answer:
          "You'll need a computer with reliable internet connection, a modern web browser (Chrome, Firefox, Safari, or Edge), and basic software that we'll help you install. Specific requirements vary by program and will be provided upon enrollment.",
      },
      {
        question: "I'm having trouble accessing course materials, what should I do?",
        answer:
          "First, try refreshing your browser and clearing cache. Ensure you're using a supported browser and have a stable internet connection. If issues persist, contact our technical support team with details about the specific problem you're experiencing.",
      },
      {
        question: "Do you provide technical support during courses?",
        answer:
          "Yes, we provide comprehensive technical support throughout your learning journey. Our support team is available via chat, email, and phone to help with any technical issues, software installation, or platform-related questions.",
      },
    ],
    courses: [
      {
        question: "Can I switch between programs after enrollment?",
        answer:
          "Program changes are possible depending on availability and timing. Contact our academic advisors to discuss your options. Some programs may have prerequisites or require additional preparation time.",
      },
      {
        question: "What is the typical class schedule?",
        answer:
          "We offer flexible scheduling options including full-time intensive programs (Monday-Friday, 9 AM - 5 PM) and part-time evening/weekend classes. Online and hybrid options are also available to accommodate working professionals.",
      },
      {
        question: "Do you offer certificates upon completion?",
        answer:
          "Yes, all students receive industry-recognized certificates upon successful completion of their programs. We also provide digital badges and portfolio projects that demonstrate your skills to potential employers.",
       },
      {
        question: "What kind of projects will I work on?",
        answer:
          "You'll work on real-world projects that mirror industry challenges. This includes building web applications, mobile apps, data analysis projects, and collaborative team assignments. Many projects are based on actual client requirements.",
      },
    ],
    security: [
      {
        question: "How do you protect my personal information?",
        answer:
          "We implement industry-standard security measures including data encryption, secure servers, and strict access controls. We comply with privacy regulations and never share your personal information without consent.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, all payment transactions are processed through secure, encrypted channels using industry-standard payment processors. We do not store credit card information on our servers.",
      },
      {
        question: "What is your privacy policy?",
        answer:
          "Our privacy policy outlines how we collect, use, and protect your information. You can find the complete policy on our website. We are committed to transparency and protecting your privacy rights.",
      },
    ],
  };

  // Use only general FAQs for the home page
  const filteredFaqs = faqs.general;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Got questions? We've answered the most common ones to help you get started confidently.
            </p>
          </motion.div>


          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={`faq-${index}-${showMore}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4"
                    >
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            <motion.div variants={itemVariants} className="text-center mt-8">
              <button
                onClick={() => {
                  setShowMore(!showMore);
                  setOpenFaq(null); // Close any open FAQ when switching
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                {showMore ? "View Less" : "View More"}
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showMore ? "rotate-180" : ""
                  }`} 
                />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
