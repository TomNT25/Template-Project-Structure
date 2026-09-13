import React, { type ReactNode } from 'react';

interface TableToolbarProps {
    children?: ReactNode;
    title?: string; // Optional generic title for the table
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ children, title }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b gap-4">
            {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}

            {/* This container will hold your Search, Filters, or custom Action Buttons */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                {children}
            </div>
        </div>
    );
};
