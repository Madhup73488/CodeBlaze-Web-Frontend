import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ExternalLink,
  X,
  Loader2,
  AlertCircle,
  Upload,
  CheckCircle,
} from "lucide-react";
import AuthModal from "./../Auth/AuthModal";

// Define a default error mapping to handle common backend field names
const backendFieldMap = {
  position_id: "form", // Maps to a general form error
  position_type: "form", // Maps to a general form error
  cover_letter: "coverLetter", // Maps to frontend's coverLetter
  // Add other backend fields here if needed, e.g., 'answers[0].answer': 'fullName'
  // For indexed errors like answers[0].answer, you might need more complex mapping
  // or handle them generically if the backend doesn't provide a simple field name.
};

const ApplyButton = ({ internship, theme = "light", colors }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);

  // Streamlined applicationData state to only hold fields directly sent as top-level
  const [applicationData, setApplicationData] = useState({
    resume: null,
    coverLetter: "", // Keep coverLetter for the textarea input
    // The other fields (fullName, email, phone, relevantExperience)
    // will be part of the 'answers' array
  });

  // State to hold dynamic form fields for the 'answers' array
  const [dynamicFormFields, setDynamicFormFields] = useState({
    fullName: "",
    email: "",
    phone: "",
    relevantExperience: "",
  });

  const [errors, setErrors] = useState({});
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formInitialized, setFormInitialized] = useState(false);

  const getCookie = useCallback((name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }, []);

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem("token") || getCookie("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const { user } = await response.json();
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, [getCookie]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleApplyClick = async () => {
    if (isLoggedIn) {
      // Re-check auth status before showing form to ensure token is still valid
      await checkAuthStatus();
      // Only show form if checkAuthStatus confirms logged in
      if (isLoggedIn) {
        setShowApplicationForm(true);
      } else {
        // If checkAuthStatus failed, show auth modal again
        setShowAuthModal(true);
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handleCloseForm = useCallback(() => {
    setShowApplicationForm(false);
    setApplicationSubmitted(false);
    setFormInitialized(false);
    setApplicationData({
      resume: null,
      coverLetter: "",
    });
    setDynamicFormFields({
      fullName: "",
      email: "",
      phone: "",
      relevantExperience: "",
    });
    setErrors({});
  }, []);

  const handleInputChange = useCallback((e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "coverLetter") {
      setApplicationData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setDynamicFormFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field when user starts typing
    setErrors((prev) => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resume: "Please upload a PDF or Word document",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resume: "File size should be less than 5MB",
        }));
        return;
      }

      setApplicationData((prev) => ({
        ...prev,
        resume: file,
      }));

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.resume;
        return newErrors;
      });
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!dynamicFormFields.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!dynamicFormFields.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(dynamicFormFields.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!dynamicFormFields.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!applicationData.resume) {
      newErrors.resume = "Resume is required";
    }

    if (!applicationData.coverLetter?.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [applicationData, dynamicFormFields]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setSubmitting(true);
      setErrors({});

      try {
        const formData = new FormData();

        // Ensure we have a valid internship ID
        const positionId = internship?.id || internship?._id;
        if (!positionId) {
          setErrors({ form: "Internship ID is missing. Please try again." });
          setSubmitting(false);
          return;
        }

        // Append top-level fields
        formData.append("position_id", String(positionId));
        // Derive position_type and applicationType from internship prop if available
        formData.append(
          "position_type",
          internship?.position_type || "internship"
        );
        formData.append(
          "applicationType",
          internship?.applicationType || "job"
        );
        formData.append("cover_letter", applicationData.coverLetter);

        // Only append the resume if it exists
        if (applicationData.resume) {
          formData.append("resume", applicationData.resume);
        }

        // --- START: Corrected way to append 'answers' array to FormData ---
        // Create the answers array structure
        const answersData = [
          {
            question: "Full Name",
            answer: dynamicFormFields.fullName.trim(),
          },
          {
            question: "Email",
            answer: dynamicFormFields.email.trim(),
          },
          {
            question: "Phone Number",
            answer: dynamicFormFields.phone.trim(),
          },
        ];

        // Only add relevantExperience if it has content
        if (dynamicFormFields.relevantExperience?.trim()) {
          answersData.push({
            question: "Relevant Experience",
            answer: dynamicFormFields.relevantExperience.trim(),
          });
        }

        // Append each answer object's properties to formData with appropriate indexing.
        // This is the standard way to send an array of objects via FormData
        // for backends that expect multipart/form-data.
        answersData.forEach((item, index) => {
          formData.append(`answers[${index}].question`, item.question);
          formData.append(`answers[${index}].answer`, item.answer);
        });
        // --- END: Corrected way to append 'answers' array to FormData ---

        // Debug what's being sent
        console.log("Form data being sent:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }

        const token = localStorage.getItem("token") || getCookie("token");

        // Make sure we're using the correct API endpoint
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/applications`;

        console.log("Sending request to:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // IMPORTANT: DO NOT set Content-Type here when using FormData
            // The browser will automatically set it with the correct boundary
          },
          body: formData,
        });

        const responseData = await response.json();
        console.log("API Response:", responseData);

        if (response.ok) {
          setApplicationSubmitted(true);
          // Reset form data
          setApplicationData({
            resume: null,
            coverLetter: "",
          });
          setDynamicFormFields({
            fullName: "",
            email: "",
            phone: "",
            relevantExperience: "",
          });
        } else {
          console.error("API Error Response:", responseData);

          // Handle different types of error responses
          if (responseData.errors && Array.isArray(responseData.errors)) {
            const backendErrors = {};
            responseData.errors.forEach((error) => {
              // Map backend field names to frontend state names
              // Note: Mapping indexed errors like answers[0].answer might require
              // more specific logic here depending on the backend error format.
              const frontendFieldName =
                backendFieldMap[error.field] || error.field || "form";
              backendErrors[frontendFieldName] = error.message;
            });
            setErrors(backendErrors);
          } else if (responseData.error) {
            // Single error object format
            setErrors({ form: responseData.error });
          } else {
            // Generic message format
            setErrors({
              form:
                responseData.message ||
                "Failed to submit application. Please try again.",
            });
          }
        }
      } catch (error) {
        console.error("Network or processing error:", error);
        setErrors({
          form: "Network error or server unavailable. Please try again later.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [applicationData, dynamicFormFields, internship, validateForm, getCookie]
  );

  const handleLoginSuccess = useCallback(() => {
    setShowAuthModal(false);
    checkAuthStatus();
    setShowApplicationForm(true); // Show form after successful login
  }, [checkAuthStatus]);

  // Initialize form data with user data only once when form opens
  useEffect(() => {
    if (userData && showApplicationForm && !formInitialized) {
      setDynamicFormFields((prev) => ({
        ...prev,
        fullName: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
      }));
      setFormInitialized(true);
    }
  }, [userData, showApplicationForm, formInitialized]);

  // Memoize the form component to prevent unnecessary re-renders
  const ApplicationForm = useMemo(() => {
    if (!showApplicationForm) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={handleCloseForm}
      >
        <div
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg"
          style={{ backgroundColor: colors.cardBg }}
          onClick={(e) => e.stopPropagation()}
        >
          {applicationSubmitted ? (
            <div className="p-6 text-center">
              <div
                className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: colors.light }}
              >
                <CheckCircle size={32} style={{ color: colors.primary }} />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Application Submitted!
              </h2>
              <p className="mb-6" style={{ color: colors.subtext }}>
                Thank you for applying to "{internship.title}" at{" "}
                {internship.company}. We'll review your application and get back
                to you soon.
              </p>
              <button
                className="px-6 py-2 rounded-lg font-medium"
                style={{ backgroundColor: colors.primary, color: "white" }}
                onClick={handleCloseForm}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: colors.border }}
              >
                <h2 className="text-xl font-bold">
                  Apply for {internship.title}
                </h2>
                <button
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={handleCloseForm}
                  style={{
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
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {errors.form && (
                  <div
                    className="mb-4 p-4 rounded-lg flex items-start gap-3"
                    style={{ backgroundColor: "#FEE2E2", color: "#B91C1C" }}
                  >
                    <AlertCircle size={20} />
                    <span>{errors.form}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1 font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={dynamicFormFields.fullName || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        borderColor: errors.fullName
                          ? "#f87171"
                          : colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                      autoComplete="off"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={dynamicFormFields.email || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        borderColor: errors.email ? "#f87171" : colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                      autoComplete="off"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={dynamicFormFields.phone || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        borderColor: errors.phone ? "#f87171" : colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                      autoComplete="off"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">
                      Resume/CV <span className="text-red-500">*</span>
                    </label>
                    <div
                      className="w-full px-4 py-2 rounded-lg border flex items-center gap-2 cursor-pointer"
                      style={{
                        borderColor: errors.resume ? "#f87171" : colors.border,
                        backgroundColor: colors.cardBg,
                        color: applicationData.resume
                          ? colors.text
                          : colors.subtext,
                      }}
                      onClick={() =>
                        document.getElementById("resume-upload").click()
                      }
                    >
                      <Upload size={18} />
                      <span>
                        {applicationData.resume
                          ? applicationData.resume.name
                          : "Upload PDF or Word doc (Max 5MB)"}
                      </span>
                      <input
                        type="file"
                        id="resume-upload"
                        name="resume"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                      />
                    </div>
                    {errors.resume && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.resume}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">
                    Cover Letter <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter || ""}
                    onChange={handleInputChange}
                    placeholder="Briefly explain why you're interested in this internship and what makes you a good fit..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                    style={{
                      borderColor: errors.coverLetter
                        ? "#f87171"
                        : colors.border,
                      backgroundColor: colors.cardBg,
                      color: colors.text,
                    }}
                  />
                  {errors.coverLetter && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.coverLetter}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block mb-1 font-medium">
                    Relevant Experience (Optional)
                  </label>
                  <textarea
                    name="relevantExperience"
                    value={dynamicFormFields.relevantExperience || ""}
                    onChange={handleInputChange}
                    placeholder="Share any relevant projects, coursework, or experience..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.cardBg,
                      color: colors.text,
                    }}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-lg font-medium border"
                    style={{
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: "transparent",
                    }}
                    onClick={handleCloseForm}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg font-medium text-white flex items-center gap-2"
                    style={{ backgroundColor: colors.primary }}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }, [
    showApplicationForm,
    applicationSubmitted,
    applicationData.resume,
    applicationData.coverLetter,
    dynamicFormFields,
    errors,
    submitting,
    colors,
    theme,
    internship.title,
    internship.company,
    handleCloseForm,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  ]);

  return (
    <>
      <button
        className="w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition transform hover:scale-105"
        style={{ backgroundColor: colors.primary }}
        onClick={handleApplyClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            Apply Now <ExternalLink size={16} />
          </>
        )}
      </button>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {ApplicationForm}
    </>
  );
};

export default ApplyButton;
