import React from 'react';
import { useTableContext } from './useTableContext';

export interface TableSearchProps {
  placeholder?: string;
  className?: string;
}

export const TableSearch: React.FC<TableSearchProps> = ({
  placeholder = 'Search...',
  className = '',
}) => {
  const { searchQuery, setSearchQuery } = useTableContext();

  return (
    <div className={`table-search-wrapper ${className}`.trim()}>
      <svg
        className="table-search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="table-search-input"
      />
      {searchQuery && (
        <button
          type="button"
          className="table-search-clear"
          onClick={() => setSearchQuery('')}
          title="Clear search"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

