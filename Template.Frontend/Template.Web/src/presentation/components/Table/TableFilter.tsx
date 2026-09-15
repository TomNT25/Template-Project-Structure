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
    <div className={`table-filter ${className}`.trim()}>
      <select value={value} onChange={onChange} className="table-filter-select">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
