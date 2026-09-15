import React, { useState } from 'react';
import { TableContext, type UseTableProps } from './useTableContext';
import './Table.css';

export interface TableProps extends UseTableProps {
  className?: string;
}

export const TableProvider: React.FC<TableProps> = ({
  data,
  columns,
  children,
  initialPageSize = 10,
  totalCount,
  manualPagination = false,
  manualFiltering = false,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const contextValue = {
    data,
    columns,
    searchQuery,
    setSearchQuery,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    totalItems: totalCount ?? data.length,
    manualPagination,
    manualFiltering,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div className={`table-container ${className}`.trim()}>{children}</div>
    </TableContext.Provider>
  );
};

export { TableHeader } from './TableHeader';
export { TableBody } from './TableBody';
export { TablePagination } from './TablePagination';
export { TableFilter } from './TableFilter';
export { TableSearch } from './TableSearch';
export { TableToolbar } from './TableToolbar';
