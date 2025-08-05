import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Send,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Target,
  Zap,
  Heart,
  Globe,
  Code,
  Database,
  Smartphone,
  Monitor,
  Server,
  Cpu,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";

const Apply = () => {
  const [selectedProgram, setSelectedProgram] = useState("internship");
  const [selectedCourse, setSelectedCourse] = useState("Full-Stack Web Development Integrated With AI");
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "internship",
    experience: "beginner",
    preferredTech: "",
    motivation: "",
    availability: "full-time"
  });

  const internshipCourses = [
    "Full-Stack Web Development Integrated With AI",
    "Cross-Platform Applications",
    "Data Analyst Integrated with AI"
  ];

  const programs = [
    {
      id: "internship",
      title: "Internship Program",
      icon: GraduationCap,
      duration: "3-6 months",
      type: "Hands-on Learning",
      description: "Get real-world experience working on live projects with industry mentors.",
      features: [
        "Live project experience",
        "1-on-1 mentorship",
        "Industry certification",
        "Placement assistance",
        "Flexible schedule"
      ],
      technologies: ["React", "Node.js", "Python", "Java", "AWS", "MongoDB"],
      color: "blue"
    },
    {
      id: "job",
      title: "Job Opportunities",
      icon: Briefcase,
      duration: "Full-time",
      type: "Career Position",
      description: "Join our team as a full-time developer and grow your career with us.",
      features: [
        "Competitive salary",
        "Health benefits",
        "Remote work options",
        "Career growth",
        "Learning budget"
      ],
      technologies: ["React", "Node.js", "Python", "DevOps", "Cloud", "AI/ML"],
      color: "green"
    },
    {
      id: "training",
      title: "Training Program",
      icon: Users,
      duration: "2-4 months",
      type: "Skill Development",
      description: "Intensive training program to master cutting-edge technologies.",
      features: [
        "Expert instructors",
        "Hands-on projects",
        "Industry curriculum",
        "Job guarantee",
        "Lifetime support"
      ],
      technologies: ["Full Stack", "Data Science", "DevOps", "Mobile", "AI/ML", "Blockchain"],
      color: "purple"
    }
  ];

  const techStacks = [
    { name: "Frontend Development", icon: Monitor, techs: ["React", "Vue.js", "Angular", "TypeScript"] },
    { name: "Backend Development", icon: Server, techs: ["Node.js", "Python", "Java", "Go"] },
    { name: "Mobile Development", icon: Smartphone, techs: ["React Native", "Flutter", "iOS", "Android"] },
    { name: "Data Science", icon: Database, techs: ["Python", "R", "SQL", "Machine Learning"] },
    { name: "DevOps", icon: Cpu, techs: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
    { name: "Full Stack", icon: Code, techs: ["MERN", "MEAN", "Django", "Spring Boot"] }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // You can integrate with your backend API here
  };

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

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Helmet>
        <title>Apply Now - Syntellite Labs</title>
        <meta
          name="description"
          content="Apply for internships, jobs, and training programs at Syntellite Labs. Start your tech career journey with us."
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
              <Send className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Start Your Journey</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Apply to{" "}
              <span className="text-blue-500">Syntellite Labs</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners who have transformed their careers through our comprehensive programs. 
              Choose your path and start building your future in technology.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: Users, label: "Students Trained", value: "5000+" },
              { icon: Award, label: "Success Rate", value: "95%" },
              { icon: Briefcase, label: "Job Placements", value: "3500+" },
              { icon: Star, label: "Average Rating", value: "4.9/5" }
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

      {/* Program Selection */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-12">
              Choose Your Program
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {programs.map((program) => {
                const Icon = program.icon;
                const isSelected = selectedProgram === program.id;
                
                return (
                  <motion.div
                    key={program.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected
                        ? `border-${program.color}-500 bg-${program.color}-50 shadow-xl`
                        : "border-gray-200 bg-white hover:border-gray-300 shadow-lg"
                    }`}
                    onClick={() => setSelectedProgram(program.id)}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      isSelected ? `bg-${program.color}-500` : "bg-gray-100"
                    }`}>
                      <Icon className={`w-8 h-8 ${isSelected ? "text-white" : "text-gray-600"}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {program.type}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{program.description}</p>

                    <div className="space-y-3 mb-6">
                      {program.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${isSelected ? `text-${program.color}-500` : "text-green-500"}`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {program.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isSelected
                              ? `bg-${program.color}-100 text-${program.color}-700`
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 flex items-center justify-center"
                      >
                        <CheckCircle className={`w-6 h-6 text-${program.color}-500`} />
                        <span className={`ml-2 font-medium text-${program.color}-700`}>Selected</span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Course Selection for Internship Program */}
            {selectedProgram === "internship" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    Select Your Course
                  </h3>
                  
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                      className="w-full bg-white border-2 border-blue-200 rounded-xl px-6 py-4 flex items-center justify-between hover:border-blue-300 transition-colors duration-200 shadow-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-900">{selectedCourse}</span>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          isCourseDropdownOpen ? "rotate-180" : ""
                        }`} 
                      />
                    </button>

                    {isCourseDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden"
                      >
                        {internshipCourses.map((course, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsCourseDropdownOpen(false);
                            }}
                            className={`w-full px-6 py-4 text-left hover:bg-blue-50 transition-colors duration-200 flex items-center gap-3 ${
                              selectedCourse === course ? "bg-blue-50 text-blue-700" : "text-gray-700"
                            }`}
                          >
                            <div className={`w-3 h-3 rounded-full ${
                              selectedCourse === course ? "bg-blue-500" : "bg-gray-300"
                            }`}></div>
                            <span className="font-medium">{course}</span>
                            {selectedCourse === course && (
                              <CheckCircle className="w-4 h-4 text-blue-500 ml-auto" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Choose the course that aligns with your career goals and interests.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Technology Stacks */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-12">
              Technology Stacks We Cover
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {techStacks.map((stack, index) => {
                const Icon = stack.icon;
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{stack.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {stack.techs.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 text-center mb-8">
              Apply for {selectedProgramData?.title}
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Technology Stack
                </label>
                <select
                  name="preferredTech"
                  value={formData.preferredTech}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your preferred technology</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="fullstack">Full Stack Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="datascience">Data Science</option>
                  <option value="devops">DevOps</option>
                  <option value="ai">AI/Machine Learning</option>
                </select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to join this program? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your motivation and career goals..."
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="full-time"
                      checked={formData.availability === "full-time"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Full-time
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="part-time"
                      checked={formData.availability === "part-time"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Part-time
                  </label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-8">
              Need More Information?
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants}>
                <Link
                  to="/internships"
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Browse Internships</h3>
                  <p className="text-gray-600">Explore available internship opportunities</p>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/courses"
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Users className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">View Courses</h3>
                  <p className="text-gray-600">Check out our comprehensive course catalog</p>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  to="/contact"
                  className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Us</h3>
                  <p className="text-gray-600">Get in touch with our admissions team</p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Apply;
