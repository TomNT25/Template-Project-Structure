import React from 'react';
import { useButton, type UseButtonProps } from './useButton';
import './Button.css';

export interface ButtonProps extends UseButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => {
  const { handleClick, isDisabled, isLoading, type, classNames } = useButton(props);

  return (
    <button
      type={type}
      className={`${classNames} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-label="Loading..." />
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
