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
        sortKey,
        sortOrder,
    } = useTableContext();

    const displayedData = useMemo(() => {
        let rows = [...data];

        if (!manualFiltering && searchQuery) {
            rows = rows.filter((item) =>
                JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortKey) {
            rows.sort((a, b) => {
                const valA = a[sortKey];
                const valB = b[sortKey];

                if (valA === valB) return 0;
                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;

                const comparison =
                    typeof valA === 'number' && typeof valB === 'number'
                        ? valA - valB
                        : String(valA).localeCompare(String(valB));

                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        if (!manualPagination) {
            rows = rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        }

        return rows;
    }, [data, searchQuery, pageIndex, pageSize, manualPagination, manualFiltering, sortKey, sortOrder]);

    return (
        <tbody>
            {displayedData.length > 0 ? (
                displayedData.map((row, rowIndex) => (
                    <tr key={row.id ?? row.Id ?? rowIndex} className="table-tr">
                        {columns.map((col, colIndex) => {
                            const alignClass = col.align === 'center' ? 'table-td-align-center' : col.align === 'right' ? 'table-td-align-right' : 'table-td-align-left';
                            return (
                                <td key={colIndex} className={`table-td ${alignClass}`}>
                                    {col.cell ? col.cell(row, rowIndex) : row[col.accessorKey as keyof typeof row]}
                                </td>
                            );
                        })}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} className="table-td-empty">
                        <div className="table-empty-container">
                            <div className="table-empty-icon-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                            </div>
                            <h4 className="table-empty-title">No records found</h4>
                            <p className="table-empty-desc">
                                We couldn't find any results matching your search or filters.
                            </p>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    );
};

