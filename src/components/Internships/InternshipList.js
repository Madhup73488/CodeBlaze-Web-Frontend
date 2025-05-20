// InternshipList.js
import React from "react";
import InternshipCard from "./InternshipCard"; // Assuming InternshipCard.js is in the same directory

function InternshipList({
  internships,
  theme,
  primaryColor,
  savedInternships,
  appliedInternships,
  toggleSaveInternship,
  toggleApplyInternship,
  getCompanyLogo,
  formatDate,
}) {
  if (!internships || internships.length === 0) {
    return <p>No internships found.</p>;
  }

  return (
    <div className="internship-list">
      {internships.map((internship) => (
        <InternshipCard
          key={internship._id || internship.id}
          internship={internship}
          theme={theme}
          primaryColor={primaryColor}
          savedInternships={savedInternships}
          appliedInternships={appliedInternships}
          toggleSaveInternship={toggleSaveInternship}
          toggleApplyInternship={toggleApplyInternship}
          getCompanyLogo={getCompanyLogo}
          formatDate={formatDate}
        />
      ))}
      <style jsx>{`
        .internship-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 1.5rem;
        }

        @media (max-width: 767px) {
          .internship-list {
            padding: 1rem;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default InternshipList;
