import React from 'react';
import { AuthLayout } from '@presentation/layouts/AuthLayout';
import { Input } from '@presentation/components/Input';
import { Button } from '@presentation/components/Button';
import { useRegisterPage, type UseRegisterPageProps } from './useRegisterPage';
import './RegisterPage.css';

export interface RegisterPageProps extends UseRegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const {
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
    onNavigateToLogin,
  } = useRegisterPage(props);

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Fill in your details to get started with the template"
    >
      <form onSubmit={handleSubmit} className="register-form">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      {onNavigateToLogin && (
        <div className="auth-switch-prompt">
          Already have an account?{' '}
          <span className="auth-switch-link" onClick={onNavigateToLogin}>
            Sign in here
          </span>
        </div>
      )}
    </AuthLayout>
  );
};
