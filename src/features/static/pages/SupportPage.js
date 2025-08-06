import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Book,
  Video,
  Users,
  HelpCircle,
  ChevronDown,
  Clock,
  CheckCircle,
  ArrowRight,
  Headphones,
  Globe,
  Shield,
  Zap
} from "lucide-react";

function SupportPage({ theme, color }) {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: "general", name: "General Questions", icon: HelpCircle },
    { id: "account", name: "Account & Billing", icon: Users },
    { id: "technical", name: "Technical Issues", icon: Zap },
    { id: "courses", name: "Courses & Learning", icon: Book },
    { id: "security", name: "Security & Privacy", icon: Shield },
  ];

  const faqs = {
    general: [
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
    ],
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

  const filteredFaqs = searchQuery
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqs[activeCategory];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>Customer Support - Syntellite Labs</title>
        <meta
          name="description"
          content="Get help and support for your learning journey at Syntellite Labs. Find answers to common questions or contact our support team."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Headphones className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">24/7 Support</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Customer{" "}
              <span className="text-blue-500">Support</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help you succeed in your learning journey. Find answers to common questions 
              or reach out to our dedicated support team for personalized assistance.
            </motion.p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: Clock, label: "Avg Response Time", value: "< 2 hours" },
              { icon: Users, label: "Support Agents", value: "24/7" },
              { icon: CheckCircle, label: "Resolution Rate", value: "98%" },
              { icon: Globe, label: "Languages", value: "5+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-8">
              Search for Answers
            </motion.h2>

            <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </motion.h2>

            {!searchQuery && (
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </motion.div>
            )}

            <div className="max-w-4xl mx-auto">
              {searchQuery && filteredFaqs.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">Try different keywords or browse our categories</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
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
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-4">
              Still Need Help?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions or issues you may have.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-xl text-center group hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-lg font-semibold text-blue-600 mb-2">+1 (555) 123-4567</p>
                <p className="text-gray-600 mb-4">Available Monday-Friday, 9am-6pm EST</p>
                <button className="flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-700 font-medium">
                  Call Now <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-xl text-center group hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-lg font-semibold text-green-600 mb-2">support@syntellitelabs.com</p>
                <p className="text-gray-600 mb-4">We typically respond within 24 hours</p>
                <button className="flex items-center gap-2 mx-auto text-green-600 hover:text-green-700 font-medium">
                  Send Email <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-xl text-center group hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-lg font-semibold text-purple-600 mb-2">Chat with our agents</p>
                <p className="text-gray-600 mb-4">Available 24/7 for immediate assistance</p>
                <button className="flex items-center gap-2 mx-auto text-purple-600 hover:text-purple-700 font-medium">
                  Start Chat <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-12">
              Additional Resources
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.a
                variants={itemVariants}
                href="/courses"
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <Book className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Course Catalog</h3>
                <p className="text-gray-600 text-sm">Browse our comprehensive course offerings</p>
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="/updates"
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <Video className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Video Tutorials</h3>
                <p className="text-gray-600 text-sm">Step-by-step guides and learning resources</p>
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="/resources"
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
                  <HelpCircle className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Knowledge Base</h3>
                <p className="text-gray-600 text-sm">In-depth articles and troubleshooting guides</p>
              </motion.a>

              <motion.a
                variants={itemVariants}
                href="/contact"
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                  <Users className="w-6 h-6 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Connect with other learners and instructors</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-blue-100 mb-8">
              Join thousands of students who have transformed their careers with Syntellite Labs.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                Browse Courses <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Contact Admissions
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default SupportPage;
