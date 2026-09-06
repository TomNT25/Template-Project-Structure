import React from 'react';
import { useInput, type UseInputProps } from './useInput';
import './Input.css';

export interface InputProps extends UseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'type'> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  required,
  error,
  helperText,
  iconLeft,
  iconRight,
  className = '',
  id,
  type = 'text',
  value,
  defaultValue,
  onChange,
  ...restProps
}) => {
  const {
    inputValue,
    currentType,
    handleChange,
    isPasswordType,
    showPassword,
    togglePasswordVisibility,
    hasError,
  } = useInput({ value: value as string, defaultValue: defaultValue as string, onChange, type, error });

  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${hasError ? 'input-invalid' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          <span>
            {label}
            {required && <span className="input-required">*</span>}
          </span>
        </label>
      )}

      <div
        className={`input-wrapper ${iconLeft ? 'input-has-icon-left' : ''} ${
          iconRight || isPasswordType ? 'input-has-icon-right' : ''
        }`}
      >
        {iconLeft && <span className="input-icon-left">{iconLeft}</span>}

        <input
          id={inputId}
          type={currentType}
          value={inputValue}
          onChange={handleChange}
          className="input-field"
          {...restProps}
        />

        {isPasswordType ? (
          <span
            className="input-icon-right"
            onClick={togglePasswordVisibility}
            role="button"
            tabIndex={0}
            aria-label="Toggle password visibility"
          >
            {showPassword ? '👁️' : '🔒'}
          </span>
        ) : (
          iconRight && <span className="input-icon-right">{iconRight}</span>
        )}
      </div>

      {error && <span className="input-error-text">{error}</span>}
      {!error && helperText && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
};
