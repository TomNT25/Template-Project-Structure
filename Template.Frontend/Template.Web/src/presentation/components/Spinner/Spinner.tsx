import React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullPage?: boolean;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  label,
  fullPage = false,
  className = '',
}) => {
  const containerClass = fullPage
    ? 'spinner-container-overlay'
    : `spinner-container ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className={`spinner spinner-${size}`} role="status" aria-label="Loading" />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
};