import React from 'react';
import './Badge.css';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'danger'
  | 'info'
  | 'default'
  | 'active'
  | 'inactive'
  | 'pending';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  showDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  showDot = true,
  className = '',
}) => {
  const variantClass = `badge-${variant.toLowerCase()}`;

  return (
    <span className={`badge ${variantClass} ${className}`.trim()}>
      {showDot && <span className="badge-dot" />}
      <span>{children}</span>
    </span>
  );
};
