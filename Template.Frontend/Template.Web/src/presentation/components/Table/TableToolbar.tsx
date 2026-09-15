import React, { type ReactNode } from 'react';

export interface TableToolbarProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`table-toolbar ${className}`.trim()}>
      {title && <h3 className="table-toolbar-title">{title}</h3>}
      <div className="table-toolbar-actions">{children}</div>
    </div>
  );
};
