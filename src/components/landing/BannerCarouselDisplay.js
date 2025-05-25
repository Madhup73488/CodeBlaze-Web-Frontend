import React from 'react';
import { Link } from 'react-router-dom';

function BannerCarouselDisplay({ item, theme, color }) {
  if (!item || !item.isActive) {
    return null; // Don't render if item is not active or invalid
  }

  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  return (
    <div className={`banner-carousel-item ${item.type}`} style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f0f0' }}>
      <img src={item.imageUrl} alt={item.title} className="banner-image" />
      <div className="banner-content">
        <h2 className="banner-title" style={{ color: primaryColor }}>{item.title}</h2>
        <p className="banner-description" style={{ color: theme === 'dark' ? '#e0e0e0' : '#333' }}>{item.description}</p>
        {item.linkUrl && (
          <Link to={item.linkUrl} className="banner-button" style={{ backgroundColor: primaryColor }}>
            {item.buttonText || "Learn More"}
          </Link>
        )}
      </div>

      <style jsx>{`
        .banner-carousel-item {
          position: relative;
          width: 100%;
          height: 400px; /* Fixed height for demonstration */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border: 5px solid red; /* TEMPORARY DEBUG BORDER */
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          filter: brightness(0.6); /* Darken image for text readability */
        }

        .banner-content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
          padding: 2rem;
          max-width: 800px;
        }

        .banner-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .banner-description {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        .banner-button {
          display: inline-block;
          padding: 0.8rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          color: white;
          font-weight: 600;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .banner-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .banner-carousel-item {
            height: 300px;
          }
          .banner-title {
            font-size: 1.8rem;
          }
          .banner-description {
            font-size: 0.9rem;
          }
          .banner-button {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default BannerCarouselDisplay;
