import React from 'react';
import { AuthLayout } from '@presentation/layouts/AuthLayout';
import { Input, Button } from '@presentation/components';
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
    handleRegisterClick,
    handleForgotPasswordClick,
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
          placeholder="admin@example.com"
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
          <button
            type="button"
            className="auth-switch-link"
            onClick={handleForgotPasswordClick}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="demo-credentials-box">
        💡 <strong>Demo Credentials:</strong><br />
        Email: <code>admin@example.com</code> | Password: <code>123</code>
      </div>

      <div className="auth-switch-prompt">
        Don't have an account?{' '}
        <span className="auth-switch-link" onClick={handleRegisterClick}>
          Register here
        </span>
      </div>
    </AuthLayout>
  );
};
