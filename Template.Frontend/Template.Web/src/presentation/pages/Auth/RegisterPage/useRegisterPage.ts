import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@application/context/AuthContext';

export interface UseRegisterPageProps {
  onNavigateToLogin?: () => void;
  onNavigateToVerifyOtp?: (email: string) => void;
}

export function useRegisterPage(props: UseRegisterPageProps = {}) {
  const { onNavigateToLogin, onNavigateToVerifyOtp } = props;
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!username) errs.username = 'Username is required';
    if (!email) errs.email = 'Email is required';
    if (!fullName) errs.fullName = 'Full Name is required';
    if (!password) errs.password = 'Password is required';
    if (password && password.length < 6) errs.password = 'Password must be at least 6 characters';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const isVerificationRequired = await register({
        username,
        email,
        fullName,
        password,
      });

      if (isVerificationRequired) {
        if (onNavigateToVerifyOtp) {
          onNavigateToVerifyOtp(email);
        } else {
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
      } else {
        if (onNavigateToLogin) {
          onNavigateToLogin();
        } else {
          navigate('/login');
        }
      }
    } catch {
      // Toast handles error message
    }
  };

  const handleLoginClick = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      navigate('/login');
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    fullName,
    setFullName,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
    handleLoginClick,
  };
}
