/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, type ReactNode } from "react";

export interface ColumnDef<T = any> {
    header: string;
    accessorKey: keyof T | string;
    cell?: (row: T, index?: number) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
    width?: string;
    sortable?: boolean;
}

export interface TableContextType {
    data: any[];
    columns: ColumnDef<any>[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    pageIndex: number;
    setPageIndex: (index: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    totalItems: number;
    manualPagination: boolean;
    manualFiltering: boolean;
    sortKey: string | null;
    sortOrder: 'asc' | 'desc';
    handleSort: (key: string) => void;
}

export const TableContext = createContext<TableContextType | undefined>(undefined);

export interface UseTableProps {
    data: any[];
    columns: ColumnDef<any>[];
    children: ReactNode;
    initialPageSize?: number;
    totalCount?: number;
    manualPagination?: boolean;
    manualFiltering?: boolean;
}

export const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context) throw new Error('Must be inside <TableProvider>');
    return context;
};



