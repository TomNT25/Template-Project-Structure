import React, { useState } from 'react';

export interface UseInputProps {
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

export function useInput(props: UseInputProps) {
  const { value, defaultValue, onChange, type = 'text', error } = props;
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue !== undefined ? defaultValue : '');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordType = type === 'password';
  const currentType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    inputValue: value !== undefined ? value : internalValue,
    currentType,
    handleChange,
    isPasswordType,
    showPassword,
    togglePasswordVisibility,
    hasError: !!error,
  };
}
