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
    <div className={`table-search ${className}`.trim()}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="table-search-input"
      />
    </div>
  );
};
