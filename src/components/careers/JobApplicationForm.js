// 3. Create the JobApplicationForm component
// components/Careers/JobApplicationForm.jsx
import { useState, useEffect } from 'react';

const JobApplicationForm = ({ job, theme, colorStyles }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    resume: null,
    coverLetter: '',
    experience: '',
    heardAbout: '',
    startDate: '',
    referral: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    // Resume validation
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    // Cover letter validation
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }
    
    // Experience validation
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience information is required';
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      // Focus on the first field with an error
      const firstErrorField = Object.keys(errors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        resume: null,
        coverLetter: '',
        experience: '',
        heardAbout: '',
        startDate: '',
        referral: ''
      });
      
      // Scroll to the success message
      document.getElementById('success-message')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };
  
  if (submitSuccess) {
    return (
      <div id="success-message" className="text-center py-12">
        <div className="mb-6">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto" style={{ color: colorStyles.primary }}>
            <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
        <p className="text-lg mb-6">Thank you for applying for the {job.title} position. We've received your application and will be in touch soon.</p>
        <p>Our team will review your application and contact you if there's a good match.</p>
      </div>
    );
  }
  
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Apply for {job.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          </div>
          
          <div>
            <label htmlFor="firstName" className="block mb-2 font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-md border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
            {errors.firstName && (
              <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block mb-2 font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-md border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
            {errors.lastName && (
              <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          
          {/* Professional Information */}
          <div className="md:col-span-2 mt-6">
            <h3 className="text-xl font-semibold mb-4">Professional Information</h3>
          </div>
          
          <div>
            <label htmlFor="linkedin" className="block mb-2 font-medium">
              LinkedIn Profile
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full p-3 rounded-md border border-gray-300"
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
          </div>
          
          <div>
            <label htmlFor="portfolio" className="block mb-2 font-medium">
              Portfolio / Website
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
              className="w-full p-3 rounded-md border border-gray-300"
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="resume" className="block mb-2 font-medium">
              Resume / CV <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex items-center justify-center w-full p-6 border-2 border-dashed rounded-md ${
                errors.resume ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#f8f8f8",
              }}
            >
              <div className="space-y-2 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto" style={{ color: colorStyles.primary }}>
                  <path d="M12 16.5V6.5M12 6.5L8.5 10M12 6.5L15.5 10M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex flex-col items-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm font-medium" style={{ color: colorStyles.primary }}>Click to upload</span>
                    <span className="text-sm"> or drag and drop</span>
                    <input
                      id="file-upload"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-xs">PDF, DOC, or DOCX (max. 5MB)</p>
                </div>
                {formData.resume && (
                  <p className="text-sm font-medium" style={{ color: colorStyles.primary }}>
                    {formData.resume.name} selected
                  </p>
                )}
              </div>
            </div>
            {errors.resume && (
              <p className="mt-1 text-red-500 text-sm">{errors.resume}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="coverLetter" className="block mb-2 font-medium">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows="5"
              placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
              className={`w-full p-3 rounded-md border ${
                errors.coverLetter ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            ></textarea>
            {errors.coverLetter && (
              <p className="mt-1 text-red-500 text-sm">{errors.coverLetter}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="experience" className="block mb-2 font-medium">
              Relevant Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              rows="5"
              placeholder="Tell us about your relevant experience and skills..."
              className={`w-full p-3 rounded-md border ${
                errors.experience ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            ></textarea>
            {errors.experience && (
              <p className="mt-1 text-red-500 text-sm">{errors.experience}</p>
            )}
          </div>
          
          {/* Additional Information */}
          <div className="md:col-span-2 mt-6">
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
          </div>
          
          <div>
            <label htmlFor="heardAbout" className="block mb-2 font-medium">
              How did you hear about us?
            </label>
            <select
              id="heardAbout"
              name="heardAbout"
              value={formData.heardAbout}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300"
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            >
              <option value="">Select an option</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Job Board">Job Board</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="startDate" className="block mb-2 font-medium">
              Earliest Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300"
              style={{
                background: theme === "dark" ? "#222" : "#fff",
              }}
            />
          </div>
          
          {formData.heardAbout === "Referral" && (
            <div className="md:col-span-2">
              <label htmlFor="referral" className="block mb-2 font-medium">
                Who referred you?
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md border border-gray-300"
                style={{
                  background: theme === "dark" ? "#222" : "#fff",
                }}
              />
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`px-8 py-3 rounded-md text-white font-medium text-lg transition-all ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{ backgroundColor: colorStyles.primary }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default JobApplicationForm;
