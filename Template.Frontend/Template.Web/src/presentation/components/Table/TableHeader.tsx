import React from 'react';
import { useTableContext } from './useTableContext';

export const TableHeader: React.FC = () => {
    const { columns, sortKey, sortOrder, handleSort } = useTableContext();

    return (
        <thead className="table-thead">
            <tr className="table-tr">
                {columns.map((col, index) => {
                    const alignClass = col.align === 'center' ? 'table-th-align-center' : col.align === 'right' ? 'table-th-align-right' : 'table-th-align-left';
                    const isSortable = Boolean(col.sortable);
                    const isSorted = sortKey === String(col.accessorKey);

                    return (
                        <th
                            key={index}
                            className={`table-th ${alignClass} ${isSortable ? 'table-th-sortable' : ''}`}
                            style={{ width: col.width }}
                            onClick={() => isSortable && handleSort(String(col.accessorKey))}
                        >
                            <div className="table-th-content">
                                <span>{col.header}</span>
                                {isSortable && (
                                    <span className={`table-sort-icon ${isSorted ? 'table-sort-active' : ''}`}>
                                        {isSorted ? (
                                            sortOrder === 'asc' ? (
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="18 15 12 9 6 15" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            )
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4">
                                                <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                                            </svg>
                                        )}
                                    </span>
                                )}
                            </div>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

