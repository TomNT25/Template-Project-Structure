import React from 'react';

export interface UseButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function useButton(props: UseButtonProps) {
  const {
    onClick,
    disabled = false,
    isLoading = false,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    if (onClick) onClick(e);
  };

  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    handleClick,
    isDisabled: disabled || isLoading,
    isLoading,
    type,
    classNames,
  };
}
