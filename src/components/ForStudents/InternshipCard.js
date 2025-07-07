import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import mernStackImage from "../../assets/images/mern-stack.png";
import frontendDevImage from "../../assets/images/frontend-dev.png";
import backendDevImage from "../../assets/images/backend-dev.png";
import javaFullStackDevImage from "../../assets/images/Java-full-stack-dev.png";
import pythonFullStackDevImage from "../../assets/images/Python-full-stack-dev.png";
import codeblazeLogo from "../../assets/images/codeblazelogoorange.png";
import EnrollNowModal from "./EnrollNow/EnrollNowModal";

function InternshipCard({ internship, theme, color }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // This is now handled inside the modal
  };
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  const renderStars = () => {
    const stars = [];
    const rating = Math.round(internship.rating * 2) / 2; // Round to nearest 0.5
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="star-icon filled" />);
      } else if (i - 0.5 === rating) {
        stars.push(<Star key={i} className="star-icon half-filled" />);
      } else {
        stars.push(<Star key={i} className="star-icon" />);
      }
    }
    return stars;
  };

  const getImage = () => {
    if (internship.id === "a1b2c3d4-e5f6-7890-1234-567890abcdef") {
      return mernStackImage;
    }
    if (
      internship.id === "b2c3d4e5-f6a7-8901-2345-67890abcdef1"
    ) {
      return frontendDevImage;
    }
    if (
      internship.id ===
      "c3d4e5f6-a7b8-9012-3456-7890abcdef12"
    ) {
      return backendDevImage;
    }
    if (
      internship.id ===
      "e5f6a7b8-c9d0-1234-5678-90abcdef1234"
    ) {
      return javaFullStackDevImage;
    }
    if (
      internship.id === "d4e5f6a7-b8c9-0123-4567-890abcdef123"
    ) {
      return pythonFullStackDevImage;
    }
    return "https://via.placeholder.com/400x200";
  };

  return (
    <div className="new-internship-card">
      <img
        src={getImage()}
        alt={internship.title}
        className="new-internship-card-image"
      />
      <div className="new-internship-card-content">
        <h3 className="new-internship-card-title">{internship.title}</h3>
        <div className="new-internship-card-company">
          <img src={codeblazeLogo} alt="Codeblaze" />
          <span>{internship.company}</span>
        </div>
        <p className="new-internship-card-description">
          {internship.description}
        </p>
        <div className="new-internship-card-rating">
          <span>{internship.rating}</span>
          {renderStars()}
          <span>({internship.reviews})</span>
        </div>
        <div className="new-internship-card-price">
          <span className="price">{internship.fees}</span>
          <span className="original-price">{internship.originalFees}</span>
        </div>
        <div className="new-internship-card-footer">
          <Link
            to={`/internships/${internship.id}`}
            className="new-internship-card-button"
          >
            View Details
          </Link>
          <button
            className="new-internship-card-button"
            style={{ backgroundColor: primaryColor }}
            onClick={handleOpenModal}
          >
            Enroll Now
          </button>
        </div>
      </div>
      {isModalOpen && (
        <EnrollNowModal
          internship={internship}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          theme={theme}
        />
      )}
    </div>
  );
}

export default InternshipCard;
