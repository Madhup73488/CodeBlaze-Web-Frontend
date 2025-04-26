import { useMemo, useState } from "react";

const useTable = (data, columns, options = {}) => {
  const {
    initialSortBy = null,
    initialSortDirection = "asc",
    pageSizeOptions = [10, 25, 50, 100],
    initialPageSize = 10,
  } = options;

  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState("");

  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  // Sort data if sort column is provided
  const sortedData = useMemo(() => {
    // Guard against null or undefined data
    if (!safeData.length) return [];

    // If no sort column provided, return data as is
    if (!sortBy) return safeData;

    return [...safeData].sort((a, b) => {
      // Get the sort column accessor
      const column = columns.find((col) => col.id === sortBy);
      if (!column) return 0;

      // Get values using accessor function or directly
      const aValue =
        typeof column.accessor === "function"
          ? column.accessor(a)
          : a[column.accessor || column.id];

      const bValue =
        typeof column.accessor === "function"
          ? column.accessor(b)
          : b[column.accessor || column.id];

      // Handle string comparisons
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle numeric comparisons
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [safeData, sortBy, sortDirection, columns]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) => {
      return columns.some((column) => {
        if (!column.searchable) return false;

        const value =
          typeof column.accessor === "function"
            ? column.accessor(item)
            : item[column.accessor || column.id];

        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTermLower);
        }

        if (typeof value === "number") {
          return value.toString().includes(searchTermLower);
        }

        return false;
      });
    });
  }, [sortedData, searchTerm, columns]);

  // Calculate pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handle sort change
  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New column, start with ascending
      setSortBy(columnId);
      setSortDirection("asc");
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page
  };

  return {
    tableData: paginatedData,
    totalItems: filteredData.length,
    totalPages,
    currentPage,
    pageSize,
    sortBy,
    sortDirection,
    searchTerm,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    pageSizeOptions,
  };
};

export default useTable;
