import React, { useState } from 'react';
import { TableContext, type UseTableProps } from './useTableContext';
import './Table.css';

export interface TableProps extends UseTableProps {
    className?: string;
    pageIndex?: number;
    setPageIndex?: (page: number) => void;
    pageSize?: number;
    setPageSize?: (size: number) => void;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
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
    pageIndex: controlledPageIndex,
    setPageIndex: controlledSetPageIndex,
    pageSize: controlledPageSize,
    setPageSize: controlledSetPageSize,
    searchQuery: controlledSearchQuery,
    setSearchQuery: controlledSetSearchQuery,
}) => {
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const [internalPageIndex, setInternalPageIndex] = useState(0);
    const [internalPageSize, setInternalPageSize] = useState(initialPageSize);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const searchQuery = controlledSearchQuery ?? internalSearchQuery;
    const setSearchQuery = controlledSetSearchQuery ?? setInternalSearchQuery;

    const pageIndex = controlledPageIndex ?? internalPageIndex;
    const setPageIndex = controlledSetPageIndex ?? setInternalPageIndex;

    const pageSize = controlledPageSize ?? internalPageSize;
    const setPageSize = controlledSetPageSize ?? setInternalPageSize;

    const handleSort = (key: string) => {
        if (sortKey === key) {
            if (sortOrder === 'asc') {
                setSortOrder('desc');
            } else {
                setSortKey(null);
                setSortOrder('asc');
            }
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

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
        sortKey,
        sortOrder,
        handleSort,
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