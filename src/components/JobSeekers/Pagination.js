import React from "react";

function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
  primaryColor,
  theme,
}) {
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          style={{
            backgroundColor: currentPage === i ? primaryColor : "transparent",
            color: currentPage === i ? "#fff" : primaryColor,
          }}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          Previous
        </button>

        {startPage > 1 && <span className="pagination-ellipsis">...</span>}

        {pages}

        {endPage < totalPages && (
          <span className="pagination-ellipsis">...</span>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          Last
        </button>
      </div>
    );
  };

  return (
    <div className="pagination-container">
      {renderPagination()}

      <style jsx>{`
        .pagination-container {
          width: 100%;
          margin-top: 2rem;
        }

        .pagination-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .pagination-button {
          padding: 0.6rem 1rem;
          border-radius: 6px;
          border: 1px solid ${primaryColor};
          background: transparent;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 40px;
          text-align: center;
        }

        .pagination-button:hover:not(:disabled) {
          background-color: ${primaryColor}10;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-button.active {
          background-color: ${primaryColor};
          color: white;
        }

        .pagination-ellipsis {
          padding: 0.6rem 0;
          color: ${theme === "dark" ? "#fff" : "#0a0a0a"};
        }
      `}</style>
    </div>
  );
}

export default Pagination;