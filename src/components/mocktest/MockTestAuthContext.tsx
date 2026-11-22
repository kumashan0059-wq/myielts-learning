import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserProfile, TestCategory } from '../../../shared/mockTestTypes';
import { fetchJson } from '../../utils/apiClient';

interface AdminStatus {
  hasEnvPasscode: boolean;
  hasClaimedAdmin: boolean;
  needsInitialSetup: boolean;
}

interface MockTestAuthContextValue {
  user: UserProfile | null;
  token: string | null;
  adminStatus: AdminStatus;
  isLoadingAuth: boolean;
  apiFetch: <T = unknown>(url: string, options?: RequestInit) => Promise<T>;
  loginStudent: (email: string, password: string) => Promise<UserProfile>;
  registerStudent: (params: {
    name: string;
    email: string;
    password: string;
    targetBand: number;
    preferredTrack: TestCategory;
  }) => Promise<UserProfile>;
  loginAdmin: (email: string, password: string) => Promise<UserProfile>;
  claimAdmin: (name: string, email: string, password: string) => Promise<UserProfile>;
  refreshAdminStatus: () => Promise<void>;
  logout: () => void;
}

const MockTestAuthContext = createContext<MockTestAuthContextValue | null>(null);

export const MockTestAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Keep Bearer session token strictly in React memory (never localStorage/sessionStorage)
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [adminStatus, setAdminStatus] = useState<AdminStatus>({
    hasEnvPasscode: false,
    hasClaimedAdmin: false,
    needsInitialSetup: true,
  });

  const refreshAdminStatus = useCallback(async () => {
    try {
      const data = await fetchJson<AdminStatus>('/api/auth/admin-status');
      setAdminStatus(data);
    } catch {
      // Non-blocking background check; explicit admin sign-in surfaces API errors directly
    }
  }, []);

  useEffect(() => {
    void refreshAdminStatus();
  }, [refreshAdminStatus]);

  const apiFetch = useCallback(
    async <T = unknown>(url: string, options: RequestInit = {}): Promise<T> => {
      const headers = new Headers(options.headers || {});
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (!(options.body instanceof FormData) && !headers.has('Content-Type') && options.body) {
        headers.set('Content-Type', 'application/json');
      }

      return fetchJson<T>(url, { ...options, headers });
    },
    [token]
  );

  const loginStudent = useCallback(
    async (email: string, password: string) => {
      setIsLoadingAuth(true);
      try {
        const data = await fetchJson<{ token: string; user: UserProfile }>('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        setToken(data.token);
        setUser(data.user);
        return data.user;
      } finally {
        setIsLoadingAuth(false);
      }
    },
    []
  );

  const registerStudent = useCallback(
    async (params: {
      name: string;
      email: string;
      password: string;
      targetBand: number;
      preferredTrack: TestCategory;
    }) => {
      setIsLoadingAuth(true);
      try {
        const data = await fetchJson<{ token: string; user: UserProfile }>('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
        setToken(data.token);
        setUser(data.user);
        return data.user;
      } finally {
        setIsLoadingAuth(false);
      }
    },
    []
  );

  const loginAdmin = useCallback(async (email: string, password: string) => {
    setIsLoadingAuth(true);
    try {
      const data = await fetchJson<{ token: string; user: UserProfile }>('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const claimAdmin = useCallback(async (name: string, email: string, password: string) => {
    setIsLoadingAuth(true);
    try {
      const data = await fetchJson<{
        token: string;
        user: UserProfile;
        adminStatus?: AdminStatus;
      }>('/api/auth/admin-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      setToken(data.token);
      setUser(data.user);
      if (data.adminStatus) {
        setAdminStatus(data.adminStatus);
      }
      return data.user;
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <MockTestAuthContext.Provider
      value={{
        user,
        token,
        adminStatus,
        isLoadingAuth,
        apiFetch,
        loginStudent,
        registerStudent,
        loginAdmin,
        claimAdmin,
        refreshAdminStatus,
        logout,
      }}
    >
      {children}
    </MockTestAuthContext.Provider>
  );
};

export function useMockTestAuth(): MockTestAuthContextValue {
  const ctx = useContext(MockTestAuthContext);
  if (!ctx) {
    throw new Error('useMockTestAuth must be used inside MockTestAuthProvider');
  }
  return ctx;
}
