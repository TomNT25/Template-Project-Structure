/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  User,
  LoginRequestDTO,
  RegisterRequestDTO,
  VerifyOtpRequestDTO,
} from '@domain/index';
import { authApi } from '@infrastructure/api/authApi';
import { tokenStorage } from '@infrastructure/storage/tokenStorage';
import { useToast } from './ToastContext';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (request: LoginRequestDTO) => Promise<void>;
  register: (request: RegisterRequestDTO) => Promise<boolean>;
  verifyOtp: (request: VerifyOtpRequestDTO) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => tokenStorage.getToken());
  const [user, setUser] = useState<User | null>(() => tokenStorage.getUser<User>());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  const handleUnauthorized = useCallback(() => {
    tokenStorage.clearAll();
    setToken(null);
    setUser(null);
    showToast('warning', 'Session Expired', 'Your session has expired. Please sign in again.');
  }, [showToast]);

  useEffect(() => {
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [handleUnauthorized]);

  const initAuth = useCallback(async () => {
    const existingToken = tokenStorage.getToken();
    if (!existingToken) {
      setIsLoading(false);
      return;
    }

    try {
      const meResponse = await authApi.getMe();
      if (meResponse?.user) {
        setUser(meResponse.user);
        setToken(existingToken);
        tokenStorage.setUser(meResponse.user);
      }
    } catch {
      // Token expired or invalid
      tokenStorage.clearAll();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (request: LoginRequestDTO): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authApi.login(request);
      const extractedToken = response.token || response.accessToken || '';
      const extractedRefreshToken = response.refreshToken || '';
      const fetchedUser = response.user;

      if (!extractedToken) {
        throw new Error('Authentication succeeded but no access token was returned.');
      }

      tokenStorage.setToken(extractedToken);
      setToken(extractedToken);

      if (extractedRefreshToken) {
        tokenStorage.setRefreshToken(extractedRefreshToken);
      }

      if (fetchedUser) {
        fetchedUser.fullName = fetchedUser.fullName || (fetchedUser.firstName ? `${fetchedUser.firstName} ${fetchedUser.lastName || ''}`.trim() : fetchedUser.username || fetchedUser.email);
        tokenStorage.setUser(fetchedUser);
        setUser(fetchedUser);
      }

      showToast('success', 'Welcome back!', `Logged in as ${fetchedUser?.fullName || fetchedUser?.email || 'User'}`);
    } catch (err: unknown) {
      const message = (err as Error).message || 'Login failed';
      showToast('error', 'Login Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (request: RegisterRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authApi.register(request);
      showToast('success', 'Registration Successful', 'Please check your email for OTP verification.');
      return response.isVerificationRequired;
    } catch (err: unknown) {
      const message = (err as Error).message || 'Registration failed';
      showToast('error', 'Registration Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (request: VerifyOtpRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authApi.verifyOtp(request);
      const extractedToken = response.token;
      if (extractedToken) {
        tokenStorage.setToken(extractedToken);
        setToken(extractedToken);
      }
      showToast('success', 'Verified', 'Email address verified successfully!');
      return response.isVerified;
    } catch (err: unknown) {
      const message = (err as Error).message || 'OTP verification failed';
      showToast('error', 'Verification Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Optional backend logout endpoint call
    } catch {
      // Ignore
    } finally {
      tokenStorage.clearAll();
      setToken(null);
      setUser(null);
      setIsLoading(false);
      showToast('info', 'Logged Out', 'You have been logged out successfully.');
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      const meResponse = await authApi.getMe();
      if (meResponse?.user) {
        setUser(meResponse.user);
        tokenStorage.setUser(meResponse.user);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
