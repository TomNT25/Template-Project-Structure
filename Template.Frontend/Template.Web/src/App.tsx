import React from 'react';
import { ThemeProvider } from '@application/context/ThemeContext';
import { ToastProvider } from '@application/context/ToastContext';
import { AuthProvider, useAuth } from '@application/context/AuthContext';
import { Toast } from '@presentation/components/Toast';
import { MainLayout } from '@presentation/layouts/MainLayout';
import { DashboardPage } from '@presentation/pages/Dashboard';
import { StudentsPage } from '@presentation/pages/Students';
import { LoginPage } from '@presentation/pages/Auth/LoginPage';
import { RegisterPage } from '@presentation/pages/Auth/RegisterPage';
import { VerifyOtpPage } from '@presentation/pages/Auth/VerifyOtpPage';
import { useApp } from './useApp';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const {
    activeTab,
    setActiveTab,
    authScreen,
    unverifiedEmail,
    handleNavigateToRegister,
    handleNavigateToLogin,
    handleNavigateToVerifyOtp,
  } = useApp();

  if (isLoading) {
    return (
      <div className="app-loading-screen">
        <div className="app-loading-spinner" />
        <p>Loading Clean Architecture Template...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authScreen === 'register') {
      return (
        <RegisterPage
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToVerifyOtp={handleNavigateToVerifyOtp}
        />
      );
    }

    if (authScreen === 'verify-otp') {
      return (
        <VerifyOtpPage
          initialEmail={unverifiedEmail}
          onSuccess={handleNavigateToLogin}
          onNavigateToLogin={handleNavigateToLogin}
        />
      );
    }

    return (
      <LoginPage
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToForgotPassword={() => handleNavigateToVerifyOtp('')}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'students':
        return <StudentsPage />;
      case 'auth-demo':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <VerifyOtpPage onNavigateToLogin={() => setActiveTab('dashboard')} />
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </MainLayout>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
          <Toast />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
