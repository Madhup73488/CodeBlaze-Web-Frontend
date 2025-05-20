// Pagination.js (Reusable from job.txt)
import React from "react";

function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  primaryColor,
  theme, // Added theme prop for consistent styling
}) {
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5; // Number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // "First" and "Previous" buttons
    pages.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button edge"
        style={{ borderColor: primaryColor, color: theme === 'dark' ? (currentPage === 1 ? '#555' : primaryColor) : (currentPage === 1 ? '#aaa' : primaryColor) }}
      >
        &laquo; First
      </button>
    );
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
        style={{ borderColor: primaryColor, color: theme === 'dark' ? (currentPage === 1 ? '#555' : primaryColor) : (currentPage === 1 ? '#aaa' : primaryColor) }}
      >
        &lsaquo; Prev
      </button>
    );

    if (startPage > 1) {
      pages.push(<span key="start-ellipsis" className="pagination-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          style={
            currentPage === i
              ? { backgroundColor: primaryColor, color: "#fff", borderColor: primaryColor }
              : { borderColor: primaryColor, color: primaryColor }
          }
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(<span key="end-ellipsis" className="pagination-ellipsis">...</span>);
    }

    // "Next" and "Last" buttons
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
        style={{ borderColor: primaryColor, color: theme === 'dark' ? (currentPage === totalPages ? '#555' : primaryColor) : (currentPage === totalPages ? '#aaa' : primaryColor) }}
      >
        Next &rsaquo;
      </button>
    );
    pages.push(
      <button
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button edge"
        style={{ borderColor: primaryColor, color: theme === 'dark' ? (currentPage === totalPages ? '#555' : primaryColor) : (currentPage === totalPages ? '#aaa' : primaryColor) }}
      >
        Last &raquo;
      </button>
    );

    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        {renderPagination()}
      </div>
      <style jsx>{`
        .pagination-container {
          width: 100%;
          margin-top: 2.5rem; /* Increased margin */
          margin-bottom: 1rem;
        }
        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.4rem; /* Adjusted gap */
          flex-wrap: wrap; /* Allow wrapping on small screens */
        }
        .pagination-button {
          padding: 0.5rem 0.9rem; /* Adjusted padding */
          border-radius: 6px;
          border: 1.5px solid; /* Color set by style prop */
          background: transparent;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 38px; /* Adjusted min-width */
          text-align: center;
          font-size: 0.85rem; /* Adjusted font size */
          color: ${primaryColor}; /* Default color */
        }
        .pagination-button:hover:not(:disabled):not(.active) {
          background-color: ${primaryColor}15; /* Light hover for non-active */
          border-color: ${primaryColor};
        }
        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          border-color: ${theme === "dark" ? "#444" : "#ddd"} !important;
          color: ${theme === "dark" ? "#555" : "#aaa"} !important;
        }
        .pagination-button.active {
          /* Styles set by inline style for primaryColor */
          font-weight: bold;
        }
        .pagination-button.edge {
            font-weight: 400;
        }
        .pagination-ellipsis {
          padding: 0.5rem 0.2rem; /* Adjusted padding */
          color: ${theme === "dark" ? "#888" : "#666"}; /* Adjusted color */
          font-weight: 500;
        }
         @media (max-width: 480px) {
            .pagination-button {
                padding: 0.4rem 0.6rem;
                font-size: 0.8rem;
                min-width: 30px;
            }
            .pagination-button.edge {
                display: none; /* Hide first/last on very small screens */
            }
            .pagination-controls {
                gap: 0.3rem;
            }
        }
      `}</style>
    </div>
  );
}

export default Pagination;