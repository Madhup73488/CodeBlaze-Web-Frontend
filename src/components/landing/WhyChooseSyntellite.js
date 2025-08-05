import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Zap, 
  Users, 
  Target, 
  Rocket,
  Brain,
  Shield,
  Award,
  TrendingUp
} from "lucide-react";
import "./WhyChooseSyntellite.css";

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Learning",
    description: "Personalized learning paths powered by advanced AI algorithms that adapt to your pace and learning style.",
    color: "text-primary-500",
    bgColor: "bg-primary-50",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Industry Partnerships",
    description: "Direct connections with leading tech companies for internships, mentorship, and career opportunities.",
    color: "text-secondary-cyan",
    bgColor: "bg-cyan-50",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Expert Mentorship",
    description: "Learn from industry veterans with 10+ years of experience in cutting-edge technologies.",
    color: "text-secondary-emerald",
    bgColor: "bg-emerald-50",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Project-Based Learning",
    description: "Build real-world projects that solve actual business problems and showcase your skills to employers.",
    color: "text-secondary-purple",
    bgColor: "bg-purple-50",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Guaranteed Outcomes",
    description: "95% of our graduates secure positions within 6 months or get their money back.",
    color: "text-secondary-orange",
    bgColor: "bg-orange-50",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Industry Recognition",
    description: "Earn certificates recognized by top tech companies and add credibility to your professional profile.",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
];

const methodologyPoints = [
  {
    icon: <Zap className="w-6 h-6 text-primary-500" />,
    title: "Agile Development",
    description: "Master industry-standard methodologies used by top tech companies worldwide."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-secondary-cyan" />,
    title: "Continuous Integration",
    description: "Learn modern DevOps practices with automated testing and deployment pipelines."
  },
  {
    icon: <Users className="w-6 h-6 text-secondary-emerald" />,
    title: "Team Collaboration",
    description: "Work in cross-functional teams using tools like Jira, Slack, and GitHub."
  },
];

const WhyChooseSyntellite = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="why-choose-syntellite" className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose{" "}
            <span className="text-blue-500">
              Syntellite Labs
            </span>
            ?
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our research fellowships and learning labs are designed to give you cutting-edge experience 
            with the technologies and methodologies that define the future of tech.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 h-full">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Methodology Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-cyan/10 rounded-full mb-6">
                <Zap className="w-4 h-4 text-secondary-cyan" />
                <span className="text-sm font-medium text-cyan-700">Modern Methodology</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Embracing Next-Gen{" "}
                <span className="gradient-text bg-gradient-to-r from-secondary-cyan to-secondary-emerald bg-clip-text text-transparent">
                  Development Practices
                </span>
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We follow cutting-edge methodologies to manage our research projects, ensuring 
                that you learn to work in a collaborative, iterative, and innovation-driven environment. 
                This approach prepares you for the future of technology development.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="space-y-6">
              {methodologyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{point.title}</h4>
                    <p className="text-gray-600">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Modern Development Practices at Syntellite Labs"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSyntellite;
