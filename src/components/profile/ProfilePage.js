import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Edit,
  LogOut,
  Phone,
  Globe,
  Award,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const ProfilePage = ({ theme }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Determine if dark mode is active based on theme prop
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setProfile(data.user);
      } catch (err) {
        setError(err.message);
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Theme-dependent styles
  const styles = {
    body: isDarkMode
      ? "min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-white"
      : "min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8",
    card: isDarkMode
      ? "bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700"
      : "bg-white shadow-lg rounded-lg overflow-hidden",
    header: isDarkMode
      ? "bg-indigo-800 px-6 py-8 text-white"
      : "bg-blue-600 px-6 py-8 text-white",
    avatar: isDarkMode
      ? "h-24 w-24 rounded-full bg-indigo-700 flex items-center justify-center text-3xl font-bold shadow-lg"
      : "h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg",
    headerText: isDarkMode ? "text-indigo-100" : "text-blue-100",
    editButton: isDarkMode
      ? "p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition"
      : "p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition",
    logoutButton: isDarkMode
      ? "p-2 rounded-full bg-red-700 hover:bg-red-600 transition"
      : "p-2 rounded-full bg-red-500 hover:bg-red-700 transition",
    sectionTitle: isDarkMode
      ? "text-xl font-semibold text-white flex items-center"
      : "text-xl font-semibold text-gray-800 flex items-center",
    iconColor: isDarkMode ? "text-indigo-400" : "text-blue-500",
    labelText: isDarkMode ? "text-sm text-gray-400" : "text-sm text-gray-500",
    valueText: isDarkMode ? "text-gray-200" : "text-gray-800",
    cardBg: isDarkMode
      ? "bg-gray-700 p-4 rounded-lg border border-gray-600"
      : "bg-gray-50 p-4 rounded-lg shadow-sm",
    cardTitle: isDarkMode
      ? "font-medium text-white"
      : "font-medium text-gray-800",
    cardSubtitle: isDarkMode ? "text-gray-300" : "text-gray-600",
    cardDate: isDarkMode
      ? "text-sm text-gray-400 mt-1"
      : "text-sm text-gray-500 mt-1",
    cardDescription: isDarkMode ? "text-gray-300 mt-2" : "text-gray-700 mt-2",
    socialButton: isDarkMode
      ? "p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
      : "p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition",
  };

  if (loading) {
    return (
      <div className={styles.body + " flex justify-center items-center"}>
        <div
          className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            isDarkMode ? "border-indigo-500" : "border-blue-500"
          }`}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.body + " flex justify-center items-center"}>
        <div className="text-red-500 text-lg p-8 bg-red-100 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.body + " flex justify-center items-center"}>
        <div
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-500"
          } text-lg p-8 bg-opacity-50 rounded-lg`}
        >
          No profile data found
        </div>
      </div>
    );
  }

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.body}>
      <div className="max-w-5xl mx-auto">
        <div className={styles.card}>
          {/* Profile Header */}
          <div className={styles.header}>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className={styles.avatar}>
                  {profile.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mt-4 md:mt-0">
                    {profile.name}
                  </h1>
                  <p className={styles.headerText + " flex items-center mt-1"}>
                    <Mail className="mr-2" size={16} />
                    {profile.email}
                  </p>
                  <p className={styles.headerText + " flex items-center mt-1"}>
                    <MapPin className="mr-2" size={16} />
                    {profile.location || "Location not specified"}
                  </p>

                  {/* Social media links - conditionally render if available */}
                  <div className="flex space-x-2 mt-4">
                    {profile.social?.github && (
                      <a
                        href={`https://github.com/${profile.social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialButton}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {profile.social?.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${profile.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialButton}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {profile.social?.twitter && (
                      <a
                        href={`https://twitter.com/${profile.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialButton}
                      >
                        <Twitter size={18} />
                      </a>
                    )}
                    {profile.social?.instagram && (
                      <a
                        href={`https://instagram.com/${profile.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialButton}
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6 md:mt-0">
                <button
                  className={styles.editButton}
                  onClick={() => navigate("/profile/edit")}
                  aria-label="Edit profile"
                >
                  <Edit size={18} />
                </button>
                <button
                  className={styles.logoutButton}
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Bio Section */}
                {profile.bio && (
                  <div className="mb-8">
                    <h2
                      className={
                        styles.sectionTitle +
                        " mb-4 border-b pb-2 " +
                        (isDarkMode ? "border-gray-700" : "border-gray-200")
                      }
                    >
                      <User className={styles.iconColor + " mr-2"} size={20} />
                      About Me
                    </h2>
                    <p className={styles.valueText + " leading-relaxed"}>
                      {profile.bio}
                    </p>
                  </div>
                )}

                {/* Personal Information */}
                <div>
                  <h2
                    className={
                      styles.sectionTitle +
                      " mb-4 border-b pb-2 " +
                      (isDarkMode ? "border-gray-700" : "border-gray-200")
                    }
                  >
                    <User className={styles.iconColor + " mr-2"} size={20} />
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail
                        className={styles.iconColor + " mr-3 mt-0.5"}
                        size={18}
                      />
                      <div>
                        <p className={styles.labelText}>Email</p>
                        <p className={styles.valueText}>{profile.email}</p>
                      </div>
                    </div>

                    {profile.phone && (
                      <div className="flex items-start">
                        <Phone
                          className={styles.iconColor + " mr-3 mt-0.5"}
                          size={18}
                        />
                        <div>
                          <p className={styles.labelText}>Phone</p>
                          <p className={styles.valueText}>{profile.phone}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <MapPin
                        className={styles.iconColor + " mr-3 mt-0.5"}
                        size={18}
                      />
                      <div>
                        <p className={styles.labelText}>Location</p>
                        <p className={styles.valueText}>
                          {profile.location || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {profile.website && (
                      <div className="flex items-start">
                        <Globe
                          className={styles.iconColor + " mr-3 mt-0.5"}
                          size={18}
                        />
                        <div>
                          <p className={styles.labelText}>Website</p>
                          <a
                            href={profile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.valueText} hover:underline`}
                          >
                            {profile.website}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <Calendar
                        className={styles.iconColor + " mr-3 mt-0.5"}
                        size={18}
                      />
                      <div>
                        <p className={styles.labelText}>Member Since</p>
                        <p className={styles.valueText}>
                          {formatDate(profile.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                {profile.skills?.length > 0 && (
                  <div>
                    <h2
                      className={
                        styles.sectionTitle +
                        " mb-4 border-b pb-2 " +
                        (isDarkMode ? "border-gray-700" : "border-gray-200")
                      }
                    >
                      <Award className={styles.iconColor + " mr-2"} size={20} />
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isDarkMode
                              ? "bg-indigo-900 text-indigo-200"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Experience */}
                {profile.experience?.length > 0 && (
                  <div>
                    <h2
                      className={
                        styles.sectionTitle +
                        " mb-4 border-b pb-2 " +
                        (isDarkMode ? "border-gray-700" : "border-gray-200")
                      }
                    >
                      <Briefcase
                        className={styles.iconColor + " mr-2"}
                        size={20}
                      />
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {profile.experience.map((exp, index) => (
                        <div key={index} className={styles.cardBg}>
                          <h3 className={styles.cardTitle}>{exp.title}</h3>
                          <p className={styles.cardSubtitle}>
                            {exp.company}
                            {exp.location ? `, ${exp.location}` : ""}
                          </p>
                          <p className={styles.cardDate}>
                            {formatDate(exp.from)} -{" "}
                            {exp.current
                              ? "Present"
                              : exp.to
                              ? formatDate(exp.to)
                              : "Present"}
                          </p>
                          {exp.description && (
                            <p className={styles.cardDescription}>
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {profile.education?.length > 0 && (
                  <div>
                    <h2
                      className={
                        styles.sectionTitle +
                        " mb-4 border-b pb-2 " +
                        (isDarkMode ? "border-gray-700" : "border-gray-200")
                      }
                    >
                      <GraduationCap
                        className={styles.iconColor + " mr-2"}
                        size={20}
                      />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {profile.education.map((edu, index) => (
                        <div key={index} className={styles.cardBg}>
                          <h3 className={styles.cardTitle}>
                            {edu.degree}{" "}
                            {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                          </h3>
                          <p className={styles.cardSubtitle}>{edu.school}</p>
                          <p className={styles.cardDate}>
                            {formatDate(edu.from)} -{" "}
                            {edu.current
                              ? "Present"
                              : edu.to
                              ? formatDate(edu.to)
                              : "Present"}
                          </p>
                          {edu.description && (
                            <p className={styles.cardDescription}>
                              {edu.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
