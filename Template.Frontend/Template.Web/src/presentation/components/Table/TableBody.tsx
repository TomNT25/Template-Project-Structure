import React, { useMemo } from 'react';
import { useTableContext } from './useTableContext';

export const TableBody: React.FC = () => {
    const {
        data,
        columns,
        searchQuery,
        pageIndex,
        pageSize,
        manualPagination,
        manualFiltering,
    } = useTableContext();

    const displayedData = useMemo(() => {
        let rows = data;

        if (!manualFiltering) {
            rows = rows.filter((item) =>
                JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (!manualPagination) {
            rows = rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        }

        return rows;
    }, [data, searchQuery, pageIndex, pageSize, manualPagination, manualFiltering]);

    return (
        <tbody>
            {displayedData.length > 0 ? (
                displayedData.map((row, rowIndex) => (
                    <tr key={row.id ?? row.Id ?? rowIndex} className="border-b hover:bg-gray-50">
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className="px-4 py-3">
                                {col.cell ? col.cell(row) : row[col.accessorKey as keyof typeof row]}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                        No results found.
                    </td>
                </tr>
            )}
        </tbody>
    );
};
