import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import EnrollNowModal from "./EnrollNow/EnrollNowModal";
import html2canvas from "html2canvas";
import {
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Award,
  Book,
  Star,
} from "lucide-react";
import "./Internships.css";
import { internships } from "./internshipsData"; // Assuming you move the data to a separate file

function InternshipDetailPage({ theme = "light", color = "purple" }) {
  const { id } = useParams();
  const internship = internships.find((internship) => internship.id === id);
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!internship) {
    return <div>Internship not found</div>;
  }

  const handleDownload = () => {
    const input = document.getElementById("internship-details");
    const originalTheme = document.body.className;
    document.body.className = "light";
    html2canvas(input, { scrollY: -window.scrollY, windowWidth: document.documentElement.offsetWidth, windowHeight: document.documentElement.offsetHeight }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${internship.id}.pdf`);
      document.body.className = originalTheme;
    });
  };

  return (
    <div className={`internships-container ${theme} ${color}`}>
      <div id="internship-details" className="internship-card">
        {/* Header Section */}
        <div className="internship-header">
          <div
            className="company-logo"
            style={{ backgroundColor: primaryColor }}
          >
            {internship.logo}
          </div>
          <div className="internship-title-info">
            <h3 className="internship-title">{internship.title}</h3>
            <div className="company-name">{internship.company}</div>
            <div className="rating-section">
              <div className="rating">
                <Star
                  className="star-icon"
                  style={{ color: "#fbbf24" }}
                />
                <span>{internship.rating}</span>
                <span className="reviews">
                  ({internship.reviews} reviews)
                </span>
              </div>
              <div
                className="level-badge"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor, 
                }}
              >
                {internship.level}
              </div>
            </div>
          </div>
          <div
            className="discount-badge"
            style={{ backgroundColor: primaryColor }}
          >
            {internship.discount}
          </div>
        </div>

        {/* Pricing and Benefits */}
        <div className="pricing-section">
          <div className="pricing">
            <div className="price-info">
              <div className="current-price">
                <span className="price">{internship.fees}</span>
                <span className="original-price">
                  {internship.originalFees}
                </span>
              </div>
            </div>
            <div className="benefits">
              <div className="benefit-item">
                <Award className="benefit-icon" />
                <span>{internship.certificate}</span>
              </div>
              <div className="benefit-item">
                <Book className="benefit-icon" />
                <span>{internship.placement}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="internship-footer">
          <div className="action-buttons">
            <button
              className="apply-button"
              style={{ backgroundColor: primaryColor }}
              onClick={handleOpenModal}
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="quick-info">
          <div className="info-item">
            <MapPin className="info-icon" />
            <span>{internship.location}</span>
          </div>
          <div className="info-item">
            <Clock className="info-icon" />
            <span>{internship.duration}</span>
          </div>
          <div className="info-item">
            <Users className="info-icon" />
            <span>{internship.batchSize}</span>
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <p>{internship.description}</p>
        </div>

        {/* Highlights */}
        <div className="highlights">
          <h4>Program Highlights</h4>
          <div className="highlights-grid">
            {internship.highlights.map((highlight, index) => (
              <div key={index} className="highlight-item">
                <div
                  className="highlight-dot"
                  style={{ backgroundColor: primaryColor }}
                ></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack">
          <h4>Technologies You'll Learn</h4>
          <div className="tech-tags">
            {internship.techStack.map((tech, index) => (
              <span
                key={index}
                className="tech-tag"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="requirements">
          <h4>Requirements</h4>
          <ul>
            {internship.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Curriculum Preview */}
        <div className="curriculum">
          <h4>Curriculum Overview</h4>
          <div className="curriculum-timeline">
            {internship.curriculum.map((item, index) => (
              <div key={index} className="curriculum-item">
                <div
                  className="curriculum-number"
                  style={{ backgroundColor: primaryColor }}
                >
                  {index + 1}
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dates">
          <div className="date-item">
            <span className="date-label">Application Deadline:</span>
            <span className="date-value">{internship.deadline}</span>
          </div>
          <div className="date-item">
            <span className="date-label">Program Starts:</span>
            <span className="date-value">{internship.startDate}</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EnrollNowModal
          internship={internship}
          onClose={handleCloseModal}
          onSubmit={() => {
            // Handle submission if needed, e.g., show a success message
            handleCloseModal();
          }}
          theme={theme}
        />
      )}
    </div>
  );
}

export default InternshipDetailPage;
