import React from 'react';
import { useButton, type UseButtonProps } from './useButton';
import './Button.css';

export interface ButtonProps extends UseButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  title?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  className = '',
  title,
  ...props
}) => {
  const { handleClick, isDisabled, isLoading, type, classNames } = useButton(props);

  const isIconOnly = !children && Boolean(icon);

  return (
    <button
      type={type}
      className={`${classNames} ${isIconOnly ? 'btn-icon-only' : ''} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      title={title}
    >
      {isLoading ? (
        <span className="btn-spinner" aria-label="Loading..." />
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      {children && <span>{children}</span>}
    </button>
  );
};

