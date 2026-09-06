import React from 'react';
import { AuthLayout } from '@presentation/layouts/AuthLayout';
import { Input } from '@presentation/components/Input';
import { Button } from '@presentation/components/Button';
import { useLoginPage, type UseLoginPageProps } from './useLoginPage';
import './LoginPage.css';

export interface LoginPageProps extends UseLoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
    onNavigateToRegister,
    onNavigateToForgotPassword,
  } = useLoginPage(props);

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@template.com"
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

        <div className="auth-links">
          <span />
          {onNavigateToForgotPassword && (
            <button
              type="button"
              className="auth-switch-link"
              onClick={onNavigateToForgotPassword}
            >
              Forgot password?
            </button>
          )}
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="demo-credentials-box">
        💡 <strong>Demo Credentials:</strong><br />
        Email: <code>admin@template.com</code> | Password: <code>password123</code>
      </div>

      {onNavigateToRegister && (
        <div className="auth-switch-prompt">
          Don't have an account?{' '}
          <span className="auth-switch-link" onClick={onNavigateToRegister}>
            Register here
          </span>
        </div>
      )}
    </AuthLayout>
  );
};
