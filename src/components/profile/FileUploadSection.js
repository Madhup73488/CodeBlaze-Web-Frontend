import React, { useState } from "react";
import { toast } from "react-toastify";
import { userService } from "../../services/userService";

const FileUploadSection = ({
  onUpdate,
  theme,
  color,
  submitting: parentSubmitting,
  setSubmitting: setParentSubmitting,
}) => {
  // Define primary color based on the color prop
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  // Create CSS variables for consistent styling
  const cssVars = {
    "--color-primary": primaryColor,
    "--color-primary-light": `${primaryColor}dd`,
    "--color-primary-very-light": `${primaryColor}22`,
    "--bg-main": theme === "dark" ? "#0a0a0a" : "#f9fafb",
    "--bg-card": theme === "dark" ? "#111" : "#fff",
    "--text-primary": theme === "dark" ? "#fff" : "#333",
    "--text-secondary": theme === "dark" ? "#aaa" : "#666",
    "--border-color": theme === "dark" ? "#333" : "#e5e5e5",
    "--shadow-sm":
      theme === "dark"
        ? "0 2px 4px rgba(0, 0, 0, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.05)",
    "--shadow-md":
      theme === "dark"
        ? "0 4px 6px rgba(0, 0, 0, 0.4)"
        : "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const [resumeFile, setResumeFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeUpload, setActiveUpload] = useState(null); // Track which upload is active

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(null); // Clear previous selection on new change
    
    if (file) {
      // Check if file is a PDF or DOC(X)
      const fileType = file.type;
      const fileSizeMB = file.size / 1024 / 1024;
      const maxFileSizeMB = 5;

      if (
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        if (fileSizeMB > maxFileSizeMB) {
          toast.error(`File size exceeds ${maxFileSizeMB}MB limit.`);
          e.target.value = null; // Clear the input
        } else {
          setResumeFile(file);
        }
      } else {
        toast.error("Please upload a PDF or DOC/DOCX file");
        e.target.value = null; // Clear the input
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(null); // Clear previous selection on new change
    setPreviewUrl(null); // Clear previous preview
    
    if (file) {
      const fileSizeMB = file.size / 1024 / 1024;
      const maxFileSizeMB = 2;

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        e.target.value = null; // Clear the input
        return;
      }

      if (fileSizeMB > maxFileSizeMB) {
        toast.error(`File size exceeds ${maxFileSizeMB}MB limit.`);
        e.target.value = null; // Clear the input
        return;
      }

      setProfileImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadResume = async () => {
    if (!resumeFile) {
      toast.warn("Please select a resume file first");
      return;
    }

    const formData = new FormData();
    formData.append("resumeFile", resumeFile); // Changed "resume" to "resumeFile"

    setParentSubmitting(true);
    setActiveUpload("resume");
    
    try {
      await userService.uploadResume(formData);
      toast.success("Resume uploaded successfully");
      setResumeFile(null);
      // Reset file input using its ID
      const resumeInput = document.getElementById("resume-upload-input");
      if (resumeInput) resumeInput.value = "";
      onUpdate(); // Refresh parent component
    } catch (error) {
      toast.error("Failed to upload resume");
      console.error("Error uploading resume:", error);
    } finally {
      setParentSubmitting(false);
      setActiveUpload(null);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImageFile) {
      toast.warn("Please select an image file first");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImageFile);

    setParentSubmitting(true);
    setActiveUpload("image");
    
    try {
      await userService.uploadProfileImage(formData);
      toast.success("Profile image uploaded successfully");
      setProfileImageFile(null);
      setPreviewUrl(null);
      // Reset file input using its ID
      const imageInput = document.getElementById("profileImage-upload-input");
      if (imageInput) imageInput.value = "";
      onUpdate(); // Refresh parent component
    } catch (error) {
      toast.error("Failed to upload profile image");
      console.error("Error uploading profile image:", error);
    } finally {
      setParentSubmitting(false);
      setActiveUpload(null);
    }
  };

  return (
    <div className="file-upload-section" style={cssVars}>
      <h2 className="section-title">File Uploads</h2>
      
      <div className="upload-grid">
        {/* Resume Upload */}
        <div className="upload-container">
          <h3>Resume</h3>
          <p className="info-text">Upload your resume (PDF or DOC/DOCX, max 5MB)</p>
          
          <div className="upload-content">
            <div className="file-input-container">
              <label htmlFor="resume-upload-input" className="file-input-label">
                <span className="file-icon">📄</span>
                <span className="file-text">
                  {resumeFile ? resumeFile.name : "Choose file"}
                </span>
              </label>
              <input
                type="file"
                id="resume-upload-input"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleResumeChange}
                className="hidden-file-input"
              />
            </div>
            
            {resumeFile && (
              <div className="file-info">
                <div className="file-meta">
                  <span className="file-name">{resumeFile.name}</span>
                  <span className="file-size">
                    ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
            
            <button
              onClick={uploadResume}
              disabled={!resumeFile || parentSubmitting}
              className="upload-btn"
              style={{ backgroundColor: primaryColor }}
            >
              {parentSubmitting && activeUpload === "resume" ? (
                <>
                  <span className="spinner"></span>
                  Uploading...
                </>
              ) : (
                "Upload Resume"
              )}
            </button>
          </div>
        </div>
        
        {/* Profile Image Upload */}
        <div className="upload-container">
          <h3>Profile Image</h3>
          <p className="info-text">Upload a professional profile photo (JPG, PNG, GIF, max 2MB)</p>
          
          <div className="upload-content">
            <div className="preview-container">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="image-preview" />
              ) : (
                <div className="no-preview">
                  <span className="preview-icon">🖼️</span>
                  <span>Image Preview</span>
                </div>
              )}
            </div>
            
            <div className="file-controls">
              <div className="file-input-container">
                <label htmlFor="profileImage-upload-input" className="file-input-label">
                  <span className="file-icon">🖼️</span>
                  <span className="file-text">
                    {profileImageFile ? profileImageFile.name : "Choose image"}
                  </span>
                </label>
                <input
                  type="file"
                  id="profileImage-upload-input"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageChange}
                  className="hidden-file-input"
                />
              </div>
              
              {profileImageFile && (
                <div className="file-info">
                  <div className="file-meta">
                    <span className="file-name">{profileImageFile.name}</span>
                    <span className="file-size">
                      ({(profileImageFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}
              
              <button
                onClick={uploadProfileImage}
                disabled={!profileImageFile || parentSubmitting}
                className="upload-btn"
                style={{ backgroundColor: primaryColor }}
              >
                {parentSubmitting && activeUpload === "image" ? (
                  <>
                    <span className="spinner"></span>
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .file-upload-section {
          font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--border-color);
          color: var(--text-primary);
        }
        
        .upload-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .upload-container {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
        }
        
        .upload-container h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          color: var(--text-primary);
        }
        
        .info-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .upload-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .file-input-container {
          width: 100%;
        }
        
        .file-input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--bg-main);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .file-input-label:hover {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px var(--color-primary-very-light);
        }
        
        .file-icon {
          font-size: 1.2rem;
        }
        
        .file-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        
        .hidden-file-input {
          display: none;
        }
        
        .file-info {
          padding: 0.5rem 0;
        }
        
        .file-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .file-name {
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
        
        .preview-container {
          width: 100%;
          height: 180px;
          border: 1px dashed var(--border-color);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--bg-main);
          margin-bottom: 1rem;
        }
        
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .no-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }
        
        .preview-icon {
          font-size: 2rem;
          opacity: 0.7;
        }
        
        .file-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .upload-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1.5rem;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
          margin-top: 0.5rem;
        }
        
        .upload-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 10px
            ${theme === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.15)"};
        }
        
        .upload-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        
        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 10px;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (max-width: 768px) {
          .upload-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
          
          .preview-container {
            height: 150px;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 1.3rem;
          }
          
          .upload-container h3 {
            font-size: 1.1rem;
          }
          
          .info-text {
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }
          
          .file-input-label {
            padding: 0.7rem 0.9rem;
            font-size: 0.95rem;
          }
          
          .preview-container {
            height: 120px;
          }
          
          .upload-btn {
            padding: 0.7rem 1.5rem;
            font-size: 0.95rem;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FileUploadSection;
