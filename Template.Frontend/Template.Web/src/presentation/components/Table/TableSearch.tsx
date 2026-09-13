import React from 'react';
import { useTableContext } from './useTableContext';

export const TableSearch: React.FC = () => {
    const { searchQuery, setSearchQuery } = useTableContext();

    return (
        <div className="table-search">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded px-3 py-1"
            />
        </div>
    );
};
