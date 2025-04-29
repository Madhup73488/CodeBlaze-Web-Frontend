import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DataTable({
  data = [],
  columns = [],
  isLoading = false,
  pagination = true,
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  actions = true,
  onEdit,
  onDelete,
  onView,
  rowActions,
  searchable = true,
  sortable = true,
  theme = "light",
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter((item) => {
        return columns.some((column) => {
          if (!column.searchable) return false;

          const value = column.accessor
            ? typeof column.accessor === "function"
              ? column.accessor(item)
              : item[column.accessor]
            : "";

          return (
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      })
    : data;

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.accessor === sortConfig.key);

      if (!column) return 0;

      const aValue =
        typeof column.accessor === "function"
          ? column.accessor(a)
          : a[column.accessor];

      const bValue =
        typeof column.accessor === "function"
          ? column.accessor(b)
          : b[column.accessor];

      if (aValue === bValue) return 0;

      // Handle sorting based on data type
      if (typeof aValue === "string") {
        const result = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? result : -result;
      }

      const result = aValue < bValue ? -1 : 1;
      return sortConfig.direction === "asc" ? result : -result;
    });
  }, [filteredData, sortConfig, columns]);

  // Paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Generate pages array for pagination
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="data-table-container">
      {/* Table actions */}
      <div className="table-actions">
        {searchable && (
          <div className="search-container">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        )}

        {pagination && (
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Show</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className={`
                    ${column.width ? `width-${column.width}` : ""}
                    ${sortable && column.sortable !== false ? "sortable" : ""}
                    ${
                      sortConfig.key === column.accessor
                        ? `sorted ${sortConfig.direction}`
                        : ""
                    }
                  `}
                  onClick={() => {
                    if (sortable && column.sortable !== false) {
                      requestSort(column.accessor);
                    }
                  }}
                >
                  {column.header}
                  {sortable && column.sortable !== false && (
                    <span className="sort-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                    </span>
                  )}
                </th>
              ))}
              {actions && <th className="actions-column">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="loading-cell"
                >
                  <div className="loading-spinner"></div>
                  <span>Loading data...</span>
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.id || index}>
                  {columns.map((column) => (
                    <td key={`${item.id || index}-${column.accessor}`}>
                      {column.cell
                        ? column.cell(item)
                        : typeof column.accessor === "function"
                        ? column.accessor(item)
                        : item[column.accessor]}
                    </td>
                  ))}
                  {actions && (
                    <td className="actions-cell">
                      {rowActions ? (
                        rowActions(item)
                      ) : (
                        <div className="table-actions-buttons">
                          {onView && (
                            <button
                              className="action-btn view-btn"
                              onClick={() => onView(item)}
                              title="View"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </button>
                          )}
                          {onEdit && (
                            <button
                              className="action-btn edit-btn"
                              onClick={() => onEdit(item)}
                              title="Edit"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="action-btn delete-btn"
                              onClick={() => onDelete(item)}
                              title="Delete"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="empty-cell"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, sortedData.length)} of{" "}
            {sortedData.length} entries
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn first"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            </button>
            <button
              className="pagination-btn prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`pagination-btn page-number ${
                  currentPage === pageNumber ? "active" : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="pagination-btn next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <button
              className="pagination-btn last"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .data-table-container {
          background-color: ${theme === "dark" ? "#1E1E1E" : "#fff"};
          border-radius: 8px;
          box-shadow: 0 2px 4px
            rgba(0, 0, 0, ${theme === "dark" ? "0.3" : "0.05"});
          overflow: hidden;
        }

        .table-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .search-container {
          position: relative;
          width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 0.5rem 0.5rem 2rem;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 4px;
          font-size: 0.9rem;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .items-per-page {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .items-per-page select {
          padding: 0.4rem 0.5rem;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          border-radius: 4px;
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          font-size: 0.9rem;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .data-table th {
          background-color: ${theme === "dark" ? "#252525" : "#f9fafb"};
          font-weight: 600;
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          position: relative;
        }

        .data-table td {
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .data-table tbody tr:hover {
          background-color: ${theme === "dark" ? "#2a2a2a" : "#f5f5f5"};
        }

        .width-small {
          width: 80px;
        }

        .width-medium {
          width: 150px;
        }

        .width-large {
          width: 250px;
        }

        .sortable {
          cursor: pointer;
          user-select: none;
        }

        .sort-icon {
          display: inline-block;
          margin-left: 0.25rem;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          opacity: 0.3;
        }

        .sortable:hover .sort-icon {
          opacity: 0.7;
        }

        th.sorted .sort-icon {
          opacity: 1;
        }

        th.sorted.asc .sort-icon svg {
          transform: rotate(180deg);
        }

        .actions-column {
          width: 120px;
          text-align: center;
        }

        .actions-cell {
          text-align: center;
        }

        .table-actions-buttons {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .action-btn {
          background-color: transparent;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .action-btn svg {
          width: 16px;
          height: 16px;
        }

        .view-btn {
          color: #3b82f6;
        }

        .view-btn:hover {
          background-color: rgba(59, 130, 246, 0.1);
        }

        .edit-btn {
          color: #f59e0b;
        }

        .edit-btn:hover {
          background-color: rgba(245, 158, 11, 0.1);
        }

        .delete-btn {
          color: #ef4444;
        }

        .delete-btn:hover {
          background-color: rgba(239, 68, 68, 0.1);
        }

        .loading-cell,
        .empty-cell {
          text-align: center;
          padding: 2rem !important;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .loading-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spinner 0.8s linear infinite;
        }

        @keyframes spinner {
          to {
            transform: rotate(360deg);
          }
        }

        .table-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-top: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
        }

        .pagination-info {
          font-size: 0.9rem;
          color: ${theme === "dark" ? "#a0a0a0" : "#666"};
        }

        .pagination-controls {
          display: flex;
          gap: 0.25rem;
        }

        .pagination-btn {
          min-width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${theme === "dark" ? "#333" : "#e6e6e6"};
          background-color: ${theme === "dark" ? "#2C2C2C" : "#fff"};
          color: ${theme === "dark" ? "#e0e0e0" : "#333"};
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn svg {
          width: 16px;
          height: 16px;
        }

        .pagination-btn:hover:not(:disabled) {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .pagination-btn.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .table-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .search-container {
            width: 100%;
          }

          .table-pagination {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .pagination-controls {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default DataTable;
