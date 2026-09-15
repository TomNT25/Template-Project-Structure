import React from 'react';
import { useTableContext } from './useTableContext';
import { Pagination } from '../Pagination';

export interface TablePaginationProps {
  className?: string;
}

export const TablePagination: React.FC<TablePaginationProps> = ({ className = '' }) => {
  const { pageIndex, setPageIndex, pageSize, setPageSize, totalItems } = useTableContext();

  return (
    <Pagination
      currentPage={pageIndex}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={(page) => setPageIndex(page)}
      onPageSizeChange={(size) => {
        setPageSize(size);
        setPageIndex(0);
      }}
      zeroIndexed={true}
      className={className}
    />
  );
};
