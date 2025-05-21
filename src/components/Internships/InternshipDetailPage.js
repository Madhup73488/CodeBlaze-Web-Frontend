import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Removed useNavigate
import ApplyButton from "./ApplyButton";
import {
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  BookOpen,
  Briefcase,
  CheckCircle,
  Award,
  Star,
  ArrowLeft,
  // ExternalLink, // Removed unused import
  Share2,
  BookmarkPlus,
} from "lucide-react";

// Add color to props, defaulting to "orange" if not provided by App.js (though App.js should provide it)
const InternshipDetailPage = ({ theme = "light", color = "orange" }) => { 
  const { id: internshipId } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Define the orange theme colors directly
  const themeColors = {
    light: {
      primary: "#f97316", // Primary orange
      light: "#fed7aa", // Light orange for backgrounds
      dark: "#c2410c", // Dark orange for text/accents
      background: "#fff7ed", // Very light orange for section backgrounds
      text: "#262626", // Dark gray/nearly black for main text in light mode
      subtext: "#525252", // Medium gray for subtext in light mode
      cardBg: "#ffffff", // White for card backgrounds
      border: "#f0f0f0", // Light gray for borders
      pageBg: "#fefcf9", // Off-white/very light orange tint for page background
    },
    dark: {
      primary: "#f97316", // Primary orange (consistent for both themes)
      light: "#c2410c", // Darker orange for secondary light elements in dark mode
      dark: "#fed7aa", // Lighter orange for accents/icons on dark background
      background: "#333333", // Dark gray for deeper section backgrounds
      text: "#f5f5f5", // Light gray for main text in dark mode
      subtext: "#a0a0a0", // Medium gray for subtext in dark mode
      cardBg: "#1a1a1a", // Very dark gray/off-black for card backgrounds
      border: "#444444", // Darker gray for borders
      pageBg: "#0a0a0a", // Black for page background
    },
  };

  // Select the appropriate color scheme based on the 'theme' prop
  const colors = theme === "dark" ? themeColors.dark : themeColors.light;

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/internships/${internshipId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Updated to handle the new response structure
        if (data.success && data.internship) {
          setInternship(data.internship);
        } else {
          throw new Error("Invalid data structure received from server");
        }

        setTimeout(() => {
          setLoading(false);
        }, 600);
      } catch (e) {
        console.error("Failed to fetch internship details:", e);
        setError("Failed to load internship details. Please try again later.");
        // Fallback to sample data if fetch fails
        setInternship({
          id: "demo123",
          title: "Frontend Developer Intern",
          company: "TechInnovate Solutions",
          location: "Remote",
          workType: "Full-time",
          companyLogo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sJz_A6f6q7H7p7o0q4o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0&usqp=CAU",
          description:
            "Join our innovative team as a Frontend Developer Intern! You'll work on real-world projects using React, contribute to our design system, and collaborate with experienced developers who will mentor you throughout your internship journey.",
          duration: "3 months",
          applicationDeadline: "2025-06-30",
          educationLevel: "Bachelor's degree (ongoing)",
          internshipFee: { amount: 15000 },
          responsibilities: [
            "Develop and maintain responsive web applications using React",
            "Collaborate with the design team to implement UI/UX designs",
            "Write clean, efficient code and perform testing/debugging",
            "Participate in code reviews and team meetings",
          ],
          requirements: [
            "Currently pursuing a degree in Computer Science or related field",
            "Basic knowledge of HTML, CSS, and JavaScript",
            "Familiarity with React is a plus but not required",
            "Strong problem-solving skills and attention to detail",
          ],
          benefits: [
            "Competitive stipend and flexible work hours",
            "Mentorship from experienced developers",
            "Opportunity to work on real-world projects",
            "Potential for full-time employment after internship",
          ],
          skills: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
          postedDate: "2025-05-01",
          companyDescription:
            "TechInnovate Solutions is a cutting-edge technology company focused on developing innovative software solutions. We pride ourselves on fostering a collaborative and growth-oriented environment.",
        });
        setLoading(false);
      }
    };

    if (internshipId) {
      fetchInternshipDetails();
    } else {
      // Demo data for preview when no ID is provided
      setInternship({
        id: "demo123",
        title: "Frontend Developer Intern",
        company: "TechInnovate Solutions",
        location: "Remote",
        workType: "Full-time",
        companyLogo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sJz_A6f6q7H7p7o0q4o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0o0&usqp=CAU",
        description:
          "Join our innovative team as a Frontend Developer Intern! You'll work on real-world projects using React, contribute to our design system, and collaborate with experienced developers who will mentor you throughout your internship journey.",
        duration: "3 months",
        applicationDeadline: "2025-06-30",
        educationLevel: "Bachelor's degree (ongoing)",
        internshipFee: { amount: 15000 },
        responsibilities: [
          "Develop and maintain responsive web applications using React",
          "Collaborate with the design team to implement UI/UX designs",
          "Write clean, efficient code and perform testing/debugging",
          "Participate in code reviews and team meetings",
        ],
        requirements: [
          "Currently pursuing a degree in Computer Science or related field",
          "Basic knowledge of HTML, CSS, and JavaScript",
          "Familiarity with React is a plus but not required",
          "Strong problem-solving skills and attention to detail",
        ],
        benefits: [
          "Competitive stipend and flexible work hours",
          "Mentorship from experienced developers",
          "Opportunity to work on real-world projects",
          "Potential for full-time employment after internship",
        ],
        skills: ["HTML", "CSS", "JavaScript", "React", "UI/UX"],
        postedDate: "2025-05-01",
        companyDescription:
          "TechInnovate Solutions is a cutting-edge technology company focused on developing innovative software solutions. We pride ourselves on fostering a collaborative and growth-oriented environment.",
      });
      setLoading(false);
    }
  }, [internshipId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDaysLeft = (deadlineString) => {
    if (!deadlineString) return null;

    const deadline = new Date(deadlineString);
    const today = new Date();

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center`}
        style={{
          backgroundColor: colors.pageBg,
          color: colors.text,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent border-b-transparent rounded-full animate-spin"
            style={{
              borderColor: `transparent ${colors.primary} ${colors.primary} transparent`,
            }}
          ></div>
          <p className="mt-4 text-lg font-medium">
            Loading internship details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center`}
        style={{
          backgroundColor: colors.pageBg,
          color: colors.text,
        }}
      >
        <div
          className="max-w-md p-8 mx-auto text-center rounded-xl shadow-lg"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="mb-4 text-xl font-bold">Something went wrong</h2>
          <p className="mb-6" style={{ color: colors.subtext }}>
            {error}
          </p>
          <button
            className="px-4 py-2 font-medium text-white rounded-lg"
            style={{ backgroundColor: colors.primary }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center`}
        style={{
          backgroundColor: colors.pageBg,
          color: colors.text,
        }}
      >
        <div
          className="max-w-md p-8 mx-auto text-center rounded-xl shadow-lg"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-500 text-2xl">?</span>
          </div>
          <h2 className="mb-4 text-xl font-bold">Internship Not Found</h2>
          <p className="mb-6" style={{ color: colors.subtext }}>
            This internship may have been removed or the URL might be incorrect.
          </p>
          <button
            className="px-4 py-2 font-medium text-white rounded-lg"
            style={{ backgroundColor: colors.primary }}
            onClick={() => window.history.back()}
          >
            <div className="flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const daysLeft = calculateDaysLeft(internship.applicationDeadline);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div
              className="p-6 rounded-xl shadow-sm"
              style={{ backgroundColor: colors.cardBg }}
            >
              <h2
                className="text-xl font-bold mb-4 pb-2 border-b flex items-center gap-2"
                style={{ borderColor: colors.border }}
              >
                <Briefcase size={20} style={{ color: colors.primary }} />
                Description
              </h2>
              <p
                className="leading-relaxed whitespace-pre-line"
                style={{ color: colors.subtext }}
              >
                {internship.description}
              </p>
            </div>

            {internship.responsibilities &&
              internship.responsibilities.length > 0 && (
                <div
                  className="p-6 rounded-xl shadow-sm"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <h2
                    className="text-xl font-bold mb-4 pb-2 border-b flex items-center gap-2"
                    style={{ borderColor: colors.border }}
                  >
                    <CheckCircle size={20} style={{ color: colors.primary }} />
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {internship.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className="mt-1 rounded-full p-1"
                          style={{ backgroundColor: `${colors.light}` }}
                        >
                          <div
                            className="rounded-full w-2 h-2"
                            style={{ backgroundColor: colors.primary }}
                          ></div>
                        </div>
                        <span style={{ color: colors.subtext }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        );

      case "requirements":
        return (
          <div className="space-y-6">
            {internship.requirements && internship.requirements.length > 0 && (
              <div
                className="p-6 rounded-xl shadow-sm"
                style={{ backgroundColor: colors.cardBg }}
              >
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b flex items-center gap-2"
                  style={{ borderColor: colors.border }}
                >
                  <BookOpen size={20} style={{ color: colors.primary }} />
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {internship.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="mt-1 rounded-full p-1"
                        style={{ backgroundColor: `${colors.light}` }}
                      >
                        <div
                          className="rounded-full w-2 h-2"
                          style={{ backgroundColor: colors.primary }}
                        ></div>
                      </div>
                      <span style={{ color: colors.subtext }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {internship.skills && internship.skills.length > 0 && (
              <div
                className="p-6 rounded-xl shadow-sm"
                style={{ backgroundColor: colors.cardBg }}
              >
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b flex items-center gap-2"
                  style={{ borderColor: colors.border }}
                >
                  <Star size={20} style={{ color: colors.primary }} />
                  Skills Required
                </h2>
                <div className="flex flex-wrap gap-3">
                  {internship.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-lg font-medium text-sm"
                      style={{
                        backgroundColor: `${colors.light}`,
                        color: colors.dark,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-6">
            {internship.benefits && internship.benefits.length > 0 && (
              <div
                className="p-6 rounded-xl shadow-sm"
                style={{ backgroundColor: colors.cardBg }}
              >
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b flex items-center gap-2"
                  style={{ borderColor: colors.border }}
                >
                  <Award size={20} style={{ color: colors.primary }} />
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {internship.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="mt-1 rounded-full p-1"
                        style={{ backgroundColor: `${colors.light}` }}
                      >
                        <div
                          className="rounded-full w-2 h-2"
                          style={{ backgroundColor: colors.primary }}
                        ></div>
                      </div>
                      <span style={{ color: colors.subtext }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="p-6 rounded-xl shadow-sm"
              style={{ backgroundColor: colors.cardBg }}
            >
              <h2
                className="text-xl font-bold mb-4 pb-2 border-b flex items-center gap-2"
                style={{ borderColor: colors.border }}
              >
                <DollarSign size={20} style={{ color: colors.primary }} />
                Compensation
              </h2>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.background }}
              >
                <p
                  className="text-lg font-semibold"
                  style={{ color: colors.dark }}
                >
                  {internship.internshipFee?.amount
                    ? `₹${internship.internshipFee.amount}/month`
                    : "Unpaid Internship"}
                </p>
                <p className="text-sm mt-1" style={{ color: colors.subtext }}>
                  {internship.internshipFee?.amount
                    ? "Stipend paid monthly"
                    : "This is an unpaid learning opportunity"}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen`}
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
      }}
    >
      {/* Banner with color */}
      <div
        className="h-32 w-full"
        style={{ backgroundColor: colors.primary }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        {/* Header Card */}
        <div
          className="rounded-xl shadow-lg p-6 mb-6"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center p-2">
                <img
                  src={
                    internship.companyLogo || "https://via.placeholder.com/100"
                  }
                  alt={`${internship.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Title and Company */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{internship.title}</h1>
                  <p className="text-lg" style={{ color: colors.subtext }}>
                    {internship.company}
                  </p>
                  <div
                    className="flex items-center mt-2"
                    style={{ color: colors.subtext }}
                  >
                    <MapPin size={16} className="mr-1" />
                    <span>{internship.location}</span>
                    <span className="mx-2">•</span>
                    <span>{internship.workType}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    style={{
                      backgroundColor: "transparent",
                      color: colors.text,
                      "--hover-bg": theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        e.currentTarget.style.getPropertyValue("--hover-bg"))
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                    onClick={() => setSaved(!saved)}
                  >
                    <BookmarkPlus
                      size={20}
                      className={saved ? "fill-current" : ""}
                      style={{
                        color: saved ? colors.primary : colors.text,
                      }}
                    />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    style={{
                      backgroundColor: "transparent",
                      color: colors.text,
                      "--hover-bg": theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        e.currentTarget.style.getPropertyValue("--hover-bg"))
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div
              className="rounded-xl shadow-sm mb-6 overflow-hidden"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="flex">
                <button
                  className={`flex-1 px-4 py-3 text-center border-b-2 font-medium ${
                    activeTab === "overview"
                      ? `border-current`
                      : "border-transparent"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "overview" ? colors.primary : colors.border,
                    color:
                      activeTab === "overview" ? colors.primary : colors.text,
                    backgroundColor: "transparent",
                    transition:
                      "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      theme === "dark" ? "#2a2a2a" : "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`flex-1 px-4 py-3 text-center border-b-2 font-medium ${
                    activeTab === "requirements"
                      ? `border-current`
                      : "border-transparent"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "requirements"
                        ? colors.primary
                        : colors.border,
                    color:
                      activeTab === "requirements"
                        ? colors.primary
                        : colors.text,
                    backgroundColor: "transparent",
                    transition:
                      "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      theme === "dark" ? "#2a2a2a" : "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  onClick={() => setActiveTab("requirements")}
                >
                  Requirements
                </button>
                <button
                  className={`flex-1 px-4 py-3 text-center border-b-2 font-medium ${
                    activeTab === "benefits"
                      ? `border-current`
                      : "border-transparent"
                  }`}
                  style={{
                    borderColor:
                      activeTab === "benefits" ? colors.primary : colors.border,
                    color:
                      activeTab === "benefits" ? colors.primary : colors.text,
                    backgroundColor: "transparent",
                    transition:
                      "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      theme === "dark" ? "#2a2a2a" : "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  onClick={() => setActiveTab("benefits")}
                >
                  Benefits
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div
              className="rounded-xl shadow-sm p-6"
              style={{ backgroundColor: colors.cardBg }}
            >
              <h2
                className="text-lg font-bold mb-4 pb-2 border-b"
                style={{ borderColor: colors.border }}
              >
                Quick Info
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: colors.light }}
                  >
                    <DollarSign size={18} style={{ color: colors.dark }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.subtext }}>
                      Stipend
                    </p>
                    <p className="font-medium">
                      {internship.internshipFee?.amount
                        ? `₹${internship.internshipFee.amount}/month`
                        : "Unpaid"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: colors.light }}
                  >
                    <Clock size={18} style={{ color: colors.dark }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.subtext }}>
                      Duration
                    </p>
                    <p className="font-medium">
                      {internship.duration || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: colors.light }}
                  >
                    <Calendar size={18} style={{ color: colors.dark }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.subtext }}>
                      Application Deadline
                    </p>
                    <p className="font-medium">
                      {formatDate(internship.applicationDeadline)}
                    </p>
                    {daysLeft !== null && daysLeft <= 7 && (
                      <p className="text-sm font-medium mt-1 text-red-500">
                        {daysLeft === 0
                          ? "Closes today!"
                          : `${daysLeft} days left!`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: colors.light }}
                  >
                    <BookOpen size={18} style={{ color: colors.dark }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.subtext }}>
                      Education Level
                    </p>
                    <p className="font-medium">
                      {internship.educationLevel || "Any"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl shadow-sm p-6"
              style={{ backgroundColor: colors.cardBg }}
            >
              <h2 className="text-lg font-bold mb-4">Ready to Apply?</h2>
              <ApplyButton
                internship={internship}
                theme={theme} // Pass the theme received from App.js
                color={color} // Pass the color received from App.js
                colors={colors} // This 'colors' object is derived locally in InternshipDetailPage, might be redundant if AuthModal only needs singular 'color'
              />
              <p
                className="text-xs text-center mt-3"
                style={{ color: colors.subtext }}
              >
                Application takes less than 5 minutes
              </p>
            </div>
            {/* Company Card */}
            <div
              className="rounded-xl shadow-sm p-6"
              style={{ backgroundColor: colors.cardBg }}
            >
              <h2 className="text-lg font-bold mb-4">
                About {internship.company}
              </h2>
              <p className="text-sm mb-4" style={{ color: colors.subtext }}>
                {internship.companyDescription ||
                  `${internship.company} offers internships that provide valuable work experience and opportunities for professional growth.`}
              </p>
              <button
                className="w-full py-2 px-4 rounded-lg font-medium border transition hover:bg-gray-50"
                style={{
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: "transparent",
                  "--hover-bg": theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    e.currentTarget.style.getPropertyValue("--hover-bg"))
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                View Company
              </button>
            </div>
            {/* Similar Internships Preview */}
            <div
              className="rounded-xl shadow-sm p-6"
              style={{ backgroundColor: colors.cardBg }}
            >
              <h2 className="text-lg font-bold mb-4">Similar Internships</h2>
              <div className="space-y-4">
                {[1, 2].map((index) => (
                  <div
                    key={index}
                    className="flex gap-3 pb-3 border-b last:border-0"
                    style={{ borderColor: colors.border }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                      }}
                    >
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Company logo"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">
                        {index === 1
                          ? "UI/UX Design Intern"
                          : "Frontend Developer"}
                      </h3>
                      <p className="text-xs" style={{ color: colors.subtext }}>
                        {index === 1
                          ? "DesignHub • Remote"
                          : "WebTech Solutions • Hybrid"}
                      </p>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full text-sm font-medium py-2"
                  style={{
                    color: colors.primary,
                    backgroundColor: "transparent",
                  }}
                >
                  View All Similar Internships
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div
          className="mt-8 rounded-xl shadow-sm p-6"
          style={{ backgroundColor: colors.cardBg }}
        >
          <h2 className="text-xl font-bold mb-6">Application Process</h2>
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute left-0 right-0 top-12 h-0.5 z-0"
              style={{ backgroundColor: colors.light }}
            ></div>

            {/* Steps */}
            {["Apply", "Screening", "Interview", "Selection"].map(
              (step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center relative z-10 mb-6 md:mb-0"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {index + 1}
                  </div>
                  <p className="mt-2 font-medium">{step}</p>
                  <p
                    className="text-xs text-center mt-1 max-w-xs"
                    style={{ color: colors.subtext }}
                  >
                    {index === 0 && "Submit your application online"}
                    {index === 1 && "Resume review by hiring team"}
                    {index === 2 && "Technical and cultural fit assessment"}
                    {index === 3 && "Final decision and offer letter"}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-8 mb-12 py-4 text-center text-sm"
          style={{
            borderTop: `1px solid ${colors.border}`,
            color: colors.subtext,
          }}
        >
          Internship posted on{" "}
          {formatDate(internship.postedDate || "2025-05-01")} • ID:{" "}
          {internship.id || internshipId || "demo123"}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailPage;
