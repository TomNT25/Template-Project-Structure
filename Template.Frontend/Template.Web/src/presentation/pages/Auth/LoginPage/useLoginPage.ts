import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@application/context/AuthContext';

export interface UseLoginPageProps {
  onNavigateToRegister?: () => void;
  onNavigateToForgotPassword?: () => void;
  onSuccess?: () => void;
}

export function useLoginPage(props: UseLoginPageProps = {}) {
  const { onNavigateToRegister, onNavigateToForgotPassword, onSuccess } = props;
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState<string>('admin@example.com');
  const [password, setPassword] = useState<string>('123');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = 'Email is required';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login({ email, password });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/dashboard');
      }
    } catch {
      // Handled in AuthContext toast
    }
  };

  const handleRegisterClick = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      navigate('/register');
    }
  };

  const handleForgotPasswordClick = () => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    } else {
      navigate('/verify-otp');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
    handleRegisterClick,
    handleForgotPasswordClick,
  };
}
