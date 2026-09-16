import React from 'react';

export interface TableFilterProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { label: string; value: string }[];
  className?: string;
}

export const TableFilter: React.FC<TableFilterProps> = ({
  value,
  onChange,
  options = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Graduated', value: 'Graduated' },
  ],
  className = '',
}) => {
  return (
    <div className={`table-filter-wrapper ${className}`.trim()}>
      <select value={value} onChange={onChange} className="table-filter-select">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="table-filter-arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
};

