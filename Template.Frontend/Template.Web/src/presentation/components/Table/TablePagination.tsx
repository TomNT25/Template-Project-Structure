import React from 'react';
import { useTableContext } from './useTableContext';

export const TablePagination: React.FC = () => {
    const { pageIndex, setPageIndex, pageSize, setPageSize, totalItems } = useTableContext();

    const totalPages = Math.ceil(totalItems / pageSize);
    const canGoPrevious = pageIndex > 0;
    const canGoNext = pageIndex < totalPages - 1;

    return (
        <div className="flex items-center justify-between p-4 border-t text-sm text-gray-600">
            <div className="flex items-center space-x-2">
                <span>Rows per page:</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageIndex(0); // Reset to first page when changing page size
                    }}
                    className="border rounded p-1"
                >
                    {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, totalItems)} of {totalItems} entries
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => setPageIndex(pageIndex - 1)}
                    disabled={!canGoPrevious}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPageIndex(pageIndex + 1)}
                    disabled={!canGoNext}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
