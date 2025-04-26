import React, { useState, useEffect } from "react";
import { useAdmin } from "../contexts/AdminContext";

const AdminSettings = () => {
  const {
    currentUser,
    theme,
    updateUserProfile,
    updatePassword,
    updateSystemSettings,
    loadingStates,
    errors,
    clearError,
  } = useAdmin();

  // Form states
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    avatar: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: "light",
    language: "en",
    emailNotifications: true,
    browserNotifications: false,
    twoFactorAuth: false,
    sessionTimeout: 30,
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    profile: { success: false, message: "" },
    password: { success: false, message: "" },
    system: { success: false, message: "" },
  });

  // Load current user data when component mounts
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        jobTitle: currentUser.jobTitle || "",
        avatar: currentUser.avatar || null,
      });
      setAvatarPreview(currentUser.avatar || null);
    }
    
    if (theme) {
      setSystemSettings(prev => ({
        ...prev,
        theme: theme
      }));
    }
  }, [currentUser, theme]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset success messages when changing tabs
    setSubmitStatus({
      profile: { success: false, message: "" },
      password: { success: false, message: "" },
      system: { success: false, message: "" },
    });
  };

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Handle system settings change
  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings({
      ...systemSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit profile form
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      Object.keys(profileForm).forEach(key => {
        if (key !== 'avatar') {
          formData.append(key, profileForm[key]);
        }
      });
      
      if (avatar) {
        formData.append('avatar', avatar);
      }
      
      await updateUserProfile(formData);
      
      setSubmitStatus({
        ...submitStatus,
        profile: { 
          success: true, 
          message: "Profile updated successfully!" 
        }
      });
      
      setTimeout(() => {
        setSubmitStatus(prev => ({
          ...prev,
          profile: { success: false, message: "" }
        }));
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        ...submitStatus,
        profile: { 
          success: false, 
          message: error.message || "Failed to update profile" 
        }
      });
    }
  };

  // Submit password form
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setSubmitStatus({
        ...submitStatus,
        password: { 
          success: false, 
          message: "New passwords don't match" 
        }
      });
    }
    
    try {
      await updatePassword(passwordForm);
      
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setSubmitStatus({
        ...submitStatus,
        password: { 
          success: true, 
          message: "Password updated successfully!" 
        }
      });
      
      setTimeout(() => {
        setSubmitStatus(prev => ({
          ...prev,
          password: { success: false, message: "" }
        }));
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        ...submitStatus,
        password: { 
          success: false, 
          message: error.message || "Failed to update password" 
        }
      });
    }
  };

  // Submit system settings form
  const handleSystemSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateSystemSettings(systemSettings);
      
      setSubmitStatus({
        ...submitStatus,
        system: { 
          success: true, 
          message: "Settings updated successfully!" 
        }
      });
      
      setTimeout(() => {
        setSubmitStatus(prev => ({
          ...prev,
          system: { success: false, message: "" }
        }));
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        ...submitStatus,
        system: { 
          success: false, 
          message: error.message || "Failed to update settings" 
        }
      });
    }
  };

  // Icon components
  const UserIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const LockIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const PaletteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="2.5"></circle>
      <circle cx="17.5" cy="10.5" r="2.5"></circle>
      <circle cx="8.5" cy="7.5" r="2.5"></circle>
      <circle cx="6.5" cy="12.5" r="2.5"></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21 6.5 17.5 2 12 2z"></path>
    </svg>
  );

  return (
    <div className="admin-settings">
      <div className={`settings-header ${theme}`}>
        <h1>Admin Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className={`settings-container ${theme}`}>
        <div className="settings-sidebar">
          <button
            className={`sidebar-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            <UserIcon />
            <span>Profile Settings</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "password" ? "active" : ""}`}
            onClick={() => handleTabChange("password")}
          >
            <LockIcon />
            <span>Change Password</span>
          </button>
          <button
            className={`sidebar-tab ${activeTab === "system" ? "active" : ""}`}
            onClick={() => handleTabChange("system")}
          >
            <PaletteIcon />
            <span>System Settings</span>
          </button>
        </div>

        <div className="settings-content">
          {/* Profile Settings */}
          <div className={`settings-panel ${activeTab === "profile" ? "active" : ""}`}>
            <h2>Profile Settings</h2>
            
            <form onSubmit={handleProfileSubmit}>
              <div className="avatar-section">
                <div className="avatar-preview">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" />
                  ) : (
                    <div className="avatar-placeholder">
                      <UserIcon />
                    </div>
                  )}
                </div>
                <div className="avatar-upload">
                  <label htmlFor="avatar" className="upload-btn">
                    Change Photo
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="file-input"
                  />
                  <p className="upload-help">Recommended: Square JPG or PNG, at least 200x200px</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={profileForm.jobTitle}
                  onChange={handleProfileChange}
                />
              </div>

              {submitStatus.profile.message && (
                <div className={`status-message ${submitStatus.profile.success ? "success" : "error"}`}>
                  {submitStatus.profile.message}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loadingStates?.updateProfile}
                >
                  {loadingStates?.updateProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          {/* Password Settings */}
          <div className={`settings-panel ${activeTab === "password" ? "active" : ""}`}>
            <h2>Change Password</h2>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <p className="input-help">
                  Password must be at least 8 characters long with a mix of letters, numbers and symbols
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              {submitStatus.password.message && (
                <div className={`status-message ${submitStatus.password.success ? "success" : "error"}`}>
                  {submitStatus.password.message}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loadingStates?.updatePassword}
                >
                  {loadingStates?.updatePassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>

          {/* System Settings */}
          <div className={`settings-panel ${activeTab === "system" ? "active" : ""}`}>
            <h2>System Settings</h2>
            
            <form onSubmit={handleSystemSubmit}>
              <div className="settings-section">
                <h3>Appearance</h3>
                
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <select
                    id="theme"
                    name="theme"
                    value={systemSettings.theme}
                    onChange={handleSystemChange}
                  >
                    <option value="light">Light Theme</option>
                    <option value="dark">Dark Theme</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
              </div>

              <div className="settings-section">
                <h3>Language & Region</h3>
                
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select
                    id="language"
                    name="language"
                    value={systemSettings.language}
                    onChange={handleSystemChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>

              <div className="settings-section">
                <h3>Notifications</h3>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={systemSettings.emailNotifications}
                    onChange={handleSystemChange}
                  />
                  <label htmlFor="emailNotifications">
                    <span>Email Notifications</span>
                    <p className="checkbox-description">
                      Receive email notifications for new applications, job status changes, etc.
                    </p>
                  </label>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="browserNotifications"
                    name="browserNotifications"
                    checked={systemSettings.browserNotifications}
                    onChange={handleSystemChange}
                  />
                  <label htmlFor="browserNotifications">
                    <span>Browser Notifications</span>
                    <p className="checkbox-description">
                      Receive in-browser notifications when you're using the admin portal
                    </p>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Security</h3>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={systemSettings.twoFactorAuth}
                    onChange={handleSystemChange}
                  />
                  <label htmlFor="twoFactorAuth">
                    <span>Two-Factor Authentication</span>
                    <p className="checkbox-description">
                      Add an extra layer of security to your account
                    </p>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </label>
                  <select
                    id="sessionTimeout"
                    name="sessionTimeout"
                    value={systemSettings.sessionTimeout}
                    onChange={handleSystemChange}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="120">2 hours</option>
                    <option value="240">4 hours</option>
                  </select>
                  <p className="input-help">
                    You'll be automatically logged out after this period of inactivity
                  </p>
                </div>
              </div>

              {submitStatus.system.message && (
                <div className={`status-message ${submitStatus.system.success ? "success" : "error"}`}>
                  {submitStatus.system.message}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loadingStates?.updateSystemSettings}
                >
                  {loadingStates?.updateSystemSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error handling */}
      {errors && Object.entries(errors).map(
        ([key, error]) =>
          error && (
            <div key={key} className="error-message">
              <p>{error}</p>
              <button onClick={() => clearError(key)}>Dismiss</button>
            </div>
          )
      )}

      <style jsx>{`
        .admin-settings {
          padding: 0.5rem;
        }

        .settings-header {
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .settings-header.dark {
          border: 1px solid #374151;
        }

        .settings-header h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .settings-header p {
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .settings-container {
          display: flex;
          border-radius: 0.5rem;
          background-color: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .settings-container.dark {
          border: 1px solid #374151;
        }

        .settings-sidebar {
          width: 220px;
          border-right: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
          padding: 1.5rem 0;
          flex-shrink: 0;
        }

        .sidebar-tab {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          text-align: left;
          font-size: 0.875rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          cursor: pointer;
          transition: all 0.2s;
        }

        .sidebar-tab.active {
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          font-weight: 500;
        }

        .sidebar-tab:hover:not(.active) {
          background-color: ${theme === "dark" ? "#2d3748" : "#f9fafb"};
        }

        .sidebar-tab svg {
          margin-right: 0.75rem;
          width: 1.25rem;
          height: 1.25rem;
        }

        .settings-content {
          flex: 1;
          min-height: 500px;
          position: relative;
        }

        .settings-panel {
          display: none;
          padding: 1.5rem;
        }

        .settings-panel.active {
          display: block;
        }

        .settings-panel h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .settings-section {
          margin-bottom: 2rem;
        }

        .settings-section h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
        }

        .avatar-section {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .avatar-preview {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
        }

        .avatar-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .avatar-placeholder svg {
          width: 40px;
          height: 40px;
        }

        .upload-btn {
          display: inline-block;
          background-color: ${theme === "dark" ? "#374151" : "#f3f4f6"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .upload-btn:hover {
          background-color: ${theme === "dark" ? "#4b5563" : "#e5e7eb"};
        }

        .file-input {
          display: none;
        }

        .upload-help {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-row .form-group {
          flex: 1;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.625rem;
          border-radius: 0.375rem;
          border: 1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          background-color: ${theme === "dark" ? "#374151" : "#ffffff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          font-size: 0.875rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          box-shadow: 0 0 0 2px ${theme === "dark" ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.2)"};
        }

        .input-help {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          margin-top: 0.375rem;
        }

        .checkbox-group {
          display: flex;
          margin-bottom: 1rem;
        }

        .checkbox-group input[type="checkbox"] {
          margin-right: 0.75rem;
          width: 1rem;
          height: 1rem;
          margin-top: 0.25rem;
        }

        .checkbox-group label {
          flex: 1;
        }

        .checkbox-group span {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: ${theme === "dark" ? "#e0e0e0" : "#111827"};
          margin-bottom: 0.25rem;
        }

        .checkbox-description {
          font-size: 0.75rem;
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
          margin: 0;
        }

        .status-message {
          padding: 0.75rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .status-message.success {
          background-color: ${theme === "dark" ? "rgba(16, 185, 129, 0.2)" : "#ecfdf5"};
          color: ${theme === "dark" ? "#34d399" : "#047857"};
          border: 1px solid ${theme === "dark" ? "#065f46" : "#a7f3d0"};
        }

        .status-message.error {
          background-color: ${theme === "dark" ? "rgba(239, 68, 68, 0.2)" : "#fee2e2"};
          color: ${theme === "dark" ? "#f87171" : "#b91c1c"};
          border: 1px solid ${theme === "dark" ? "#7f1d1d" : "#fecaca"};
        }

        .form-actions {
          margin-top: 1.5rem;
        }

        .submit-btn {
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.625rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-btn:hover {
          background-color: #4338ca;
        }

        .submit-btn:disabled {
          background-color: ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          cursor: not-allowed;
        }

        .error-message {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background-color: ${theme === "dark" ? "#471620" : "#fee2e2"};
          color: ${theme === "dark" ? "#f87171" : "#b91c1c"};
          border-radius: 0.25rem;
          margin-top: 1rem;
        }

        .error-message button {
          background: none;
          border: none;
          color: ${theme === "dark" ? "#f87171" : "#b91c1c"};
          font-size: 0.875rem;
          cursor: pointer;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .settings-container {
            flex-direction: column;
          }

          .settings-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"};
            padding: 0;
          }

          .sidebar-tab {
            padding: 1rem 1.5rem;
          }

          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;