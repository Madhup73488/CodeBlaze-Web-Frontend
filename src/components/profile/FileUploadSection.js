// src/components/profile/FileUploadSection.jsx
import React, { useState } from "react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";

// Note: theme and color props are passed down from the parent,
// but styling primarily relies on CSS variables set by the parent.
const FileUploadSection = ({
  onUpdate,
  theme,
  color,
  setSubmitting: setParentSubmitting,
  submitting: parentSubmitting,
}) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  // Removed local uploading states, using parent's state
  // const [resumeUploading, setResumeUploading] = useState(false);
  // const [imageUploading, setImageUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(null); // Clear previous selection on new change
    if (file) {
      // Check if file is a PDF or DOC(X)
      const fileType = file.type;
      const fileSizeMB = file.size / 1024 / 1024;
      const maxFileSizeMB = 5; // Example limit

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
      const maxFileSizeMB = 2; // Example limit

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
    formData.append("resume", resumeFile);

    setParentSubmitting(true); // Use parent's submitting state
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
      setParentSubmitting(false); // End parent's submitting state
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImageFile) {
      toast.warn("Please select an image file first");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImageFile);

    setParentSubmitting(true); // Use parent's submitting state
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
      setParentSubmitting(false); // End parent's submitting state
    }
  };

  return (
    <div className="file-upload-section">
      <div className="upload-container">
        <h3>Resume Upload</h3>
        <p className="info-text">
          Upload your resume (PDF or DOC/DOCX, max 5MB)
        </p>

        <div className="upload-area">
          {/* Styled file input and label */}
          <label htmlFor="resume-upload-input" className="file-upload-label">
            Choose File
          </label>
          <input
            type="file"
            id="resume-upload-input" // Use a specific ID
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleResumeChange}
            className="hidden-file-input" // Hide the default input
          />

          <button
            onClick={uploadResume}
            // Disabled if no file OR parent is submitting OR a resume file is selected but parent isn't submitting yet
            disabled={!resumeFile || parentSubmitting}
            className="upload-btn"
          >
            {parentSubmitting && resumeFile ? ( // Show spinner only if this specific file type is being uploaded
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              "Upload Resume"
            )}
          </button>
        </div>

        {resumeFile && (
          <div className="file-info">
            <span className="file-name">{resumeFile.name}</span>
            <span className="file-size">
              ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
        )}
      </div>

      <div className="upload-container">
        <h3>Profile Image</h3>
        <p className="info-text">
          Upload a professional profile photo (JPG, PNG, GIF, max 2MB)
        </p>

        <div className="upload-area image-upload-area">
          <div className="preview-container">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="image-preview" />
            ) : (
              <div className="no-preview">
                <span>Image Preview</span>
              </div>
            )}
          </div>

          {/* Styled file input and label for image */}
          <div className="image-upload-controls">
            <label
              htmlFor="profileImage-upload-input"
              className="file-upload-label"
            >
              Choose Image
            </label>
            <input
              type="file"
              id="profileImage-upload-input" // Use a specific ID
              accept="image/png, image/jpeg, image/gif" // Specify common image types
              onChange={handleImageChange}
              className="hidden-file-input" // Hide the default input
            />

            <button
              onClick={uploadProfileImage}
              // Disabled if no file OR parent is submitting OR an image file is selected but parent isn't submitting yet
              disabled={!profileImageFile || parentSubmitting}
              className="upload-btn"
            >
              {parentSubmitting && profileImageFile ? ( // Show spinner only if this specific file type is being uploaded
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

        {profileImageFile && (
          <div className="file-info">
            <span className="file-name">{profileImageFile.name}</span>
            <span className="file-size">
              ({(profileImageFile.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .file-upload-section {
          /* Padding handled by parent's tab-content */
          display: flex;
          flex-direction: column;
          gap: 2rem; /* Space between upload containers */
        }

        .upload-container {
          padding: 1.5rem; /* Padding around each container */
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(
            --bg-main
          ); /* Use main background for containers */
          box-shadow: var(--shadow-subtle);
        }

        .dark .upload-container {
          background-color: var(
            --bg-card
          ); /* Use card background in dark mode */
        }

        .upload-container h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .info-text {
          font-size: 0.9rem;
          color: var(--text-secondary); /* Secondary text color */
          margin-bottom: 1.5rem;
        }

        .upload-area {
          display: flex;
          align-items: center; /* Vertically align items */
          gap: 1rem; /* Space between file input/label and button */
        }

        .upload-area.image-upload-area {
          flex-direction: column; /* Stack preview and controls */
          align-items: flex-start; /* Align items to the start */
        }

        /* Hide default file input */
        .hidden-file-input {
          display: none;
        }

        /* Style the file upload label (behaves like a button) */
        .file-upload-label {
          display: inline-block;
          padding: 0.6rem 1.2rem; /* Padding similar to buttons */
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background-color: var(--bg-card); /* Card background */
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0; /* Prevent shrinking */
        }

        .dark .file-upload-label {
          background-color: var(--bg-main); /* Main background in dark mode */
        }

        .file-upload-label:hover {
          background-color: var(--border-color); /* Hover on border color */
          color: var(--text-primary);
        }

        /* Upload Button Styling (Consistent with other submit buttons) */
        .upload-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.5rem; /* Padding */
          background-color: var(--color-primary); /* Primary color */
          color: white; /* White text */
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600; /* Bolder text */
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px; /* Minimum width */
          flex-shrink: 0; /* Prevent shrinking */
        }

        .upload-btn:hover:not(:disabled) {
          background-color: var(
            --color-primary-light
          ); /* Lighter primary on hover */
          transform: translateY(-1px); /* Subtle lift effect */
        }

        .upload-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Spinner Styling (Consistent with other buttons) */
        .upload-btn .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        .dark .upload-btn .spinner {
          border: 2px solid rgba(var(--text-primary, #e5e7eb), 0.3);
          border-top-color: var(--text-primary);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .file-info {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary); /* Secondary text color */
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .file-name {
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%; /* Prevent overflow */
        }

        .file-size {
          font-weight: 400;
        }

        /* Image Specific Styles */
        .image-upload-area {
          display: flex; /* Changed to flex */
          flex-direction: column; /* Stack preview and controls */
          align-items: flex-start; /* Align items to start */
          gap: 1.5rem; /* Space between preview and controls */
        }

        .preview-container {
          width: 150px; /* Fixed width for preview */
          height: 150px; /* Fixed height for preview */
          border: 1px dashed var(--border-color); /* Dashed border */
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden; /* Hide overflow */
          background-color: var(--bg-card); /* Card background */
          flex-shrink: 0; /* Prevent shrinking */
        }
        .dark .preview-container {
          background-color: var(--bg-main); /* Main background in dark mode */
        }

        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Cover the container */
        }

        .no-preview {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .image-upload-controls {
          display: flex;
          gap: 1rem; /* Space between label and button */
          flex-wrap: wrap; /* Allow wrapping */
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .file-upload-section {
            gap: 1.5rem;
          }

          .upload-container {
            padding: 1rem;
          }

          .upload-container h3 {
            font-size: 1.1rem;
          }

          .info-text {
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }

          .upload-area {
            flex-direction: column; /* Stack label/input and button */
            align-items: flex-start;
            gap: 0.8rem;
          }
          .upload-area.image-upload-area {
            gap: 1rem; /* Adjust gap when stacked */
          }

          .file-upload-label,
          .upload-btn {
            width: 100%; /* Full width on smaller screens */
            justify-content: center;
            padding: 0.6rem 1rem;
            font-size: 0.95rem;
          }

          .preview-container {
            width: 120px; /* Smaller preview */
            height: 120px;
          }

          .image-upload-controls {
            width: 100%; /* Make controls full width */
            gap: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .upload-container h3 {
            font-size: 1rem;
          }
          .info-text {
            font-size: 0.8rem;
          }
          .file-upload-label,
          .upload-btn {
            font-size: 0.9rem;
            padding: 0.5rem 0.8rem;
          }
          .preview-container {
            width: 100px; /* Even smaller preview */
            height: 100px;
          }
          .no-preview {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FileUploadSection;
