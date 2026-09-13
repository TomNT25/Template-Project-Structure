import React from 'react';
import { useTableContext } from './useTableContext';

export const TableHeader: React.FC = () => {
    const { columns } = useTableContext();

    return (
        <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
                {columns.map((col, index) => (
                    <th key={index} className="px-4 py-3 font-medium">
                        {col.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
