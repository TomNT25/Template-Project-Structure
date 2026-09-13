import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@application/context/ThemeContext';
import { ToastProvider } from '@application/context/ToastContext';
import { AuthProvider } from '@application/context/AuthContext';
import { Toast, ProtectedRoute, GuestRoute } from '@presentation/components';
import { MainLayout } from '@presentation/layouts/MainLayout';
import { DashboardPage } from '@presentation/pages/Dashboard';
import { StudentsPage } from '@presentation/pages/Students';
import { LoginPage } from '@presentation/pages/Auth/LoginPage';
import { RegisterPage } from '@presentation/pages/Auth/RegisterPage';
import { VerifyOtpPage } from '@presentation/pages/Auth/VerifyOtpPage';
import { NotFoundPage } from '@presentation/pages/NotFound';
import './App.css';

export const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Guest Public Routes */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <GuestRoute>
            <VerifyOtpPage />
          </GuestRoute>
        }
      />

      {/* Authenticated Protected Routes with MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
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
