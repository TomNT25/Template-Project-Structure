import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  totalItems?: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  zeroIndexed?: boolean;
  showPageSizeSelector?: boolean;
  showTotalItems?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages: propTotalPages,
  totalItems,
  pageSize,
  pageSizeOptions = [5, 10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  zeroIndexed = false,
  showPageSizeSelector = true,
  showTotalItems = true,
  className = '',
}) => {
  // Normalize display page (1-based index for UI rendering)
  const displayCurrentPage = zeroIndexed ? currentPage + 1 : currentPage;
  
  // Calculate total pages
  const calculatedTotalPages = Math.max(
    1,
    propTotalPages ?? (totalItems !== undefined ? Math.ceil(totalItems / pageSize) : 1)
  );

  const totalPages = calculatedTotalPages;
  const canGoPrevious = displayCurrentPage > 1;
  const canGoNext = displayCurrentPage < totalPages;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const pageToEmit = zeroIndexed ? page - 1 : page;
    onPageChange(pageToEmit);
  };

  // Generate page numbers range for pagination UI
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      let start = Math.max(2, displayCurrentPage - 1);
      let end = Math.min(totalPages - 1, displayCurrentPage + 1);

      if (displayCurrentPage <= 3) {
        end = 4;
      } else if (displayCurrentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  // Calculate items summary range text
  const startItem = totalItems !== undefined && totalItems > 0 
    ? (displayCurrentPage - 1) * pageSize + 1 
    : 0;
  const endItem = totalItems !== undefined 
    ? Math.min(displayCurrentPage * pageSize, totalItems) 
    : 0;

  return (
    <div className={`pagination ${className}`.trim()}>
      {showTotalItems && (
        <div className="pagination-info">
          {totalItems !== undefined ? (
            <span>
              Showing <span className="pagination-info-highlight">{startItem}</span> to{' '}
              <span className="pagination-info-highlight">{endItem}</span> of{' '}
              <span className="pagination-info-highlight">{totalItems}</span> entries
            </span>
          ) : (
            <span>
              Page <span className="pagination-info-highlight">{displayCurrentPage}</span> of{' '}
              <span className="pagination-info-highlight">{totalPages}</span>
            </span>
          )}
        </div>
      )}

      <div className="pagination-controls">
        {showPageSizeSelector && onPageSizeChange && (
          <div className="pagination-page-size">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="pagination-select"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pagination-nav">
          <button
            type="button"
            onClick={() => handlePageClick(1)}
            disabled={!canGoPrevious}
            className="pagination-btn"
            title="First Page"
            aria-label="First Page"
          >
            first
          </button>
          <button
            type="button"
            onClick={() => handlePageClick(displayCurrentPage - 1)}
            disabled={!canGoPrevious}
            className="pagination-btn"
            title="Previous Page"
            aria-label="Previous Page"
          >
            ‹
          </button>

          {getPageNumbers().map((page, idx) =>
            typeof page === 'number' ? (
              <button
                key={idx}
                type="button"
                onClick={() => handlePageClick(page)}
                className={`pagination-btn ${
                  page === displayCurrentPage ? 'pagination-btn-active' : ''
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="pagination-ellipsis">
                {page}
              </span>
            )
          )}

          <button
            type="button"
            onClick={() => handlePageClick(displayCurrentPage + 1)}
            disabled={!canGoNext}
            className="pagination-btn"
            title="Next Page"
            aria-label="Next Page"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            disabled={!canGoNext}
            className="pagination-btn"
            title="Last Page"
            aria-label="Last Page"
          >
            last
          </button>
        </div>
      </div>
    </div>
  );
};
