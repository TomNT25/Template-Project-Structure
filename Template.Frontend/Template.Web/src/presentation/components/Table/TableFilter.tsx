import React from 'react';

export const TableFilter: React.FC = () => {

    return (
        <div className="table-filter">
            <select className="border rounded px-3 py-1">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
    );
};
