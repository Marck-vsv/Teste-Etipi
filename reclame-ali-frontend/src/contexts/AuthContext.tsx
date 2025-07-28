'use client';
import { SignInRequest } from '@/features/auth/schemas/auth.schema';
import { signIn } from '@/features/auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DecodedToken {
  sub: string;
  userInfo: {
    name: string;
  };
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  decodedToken: DecodedToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: SignInRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const decodeAndSetAuth = (jwtToken: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(jwtToken);
      setDecodedToken(decoded);
      setUser(decoded);
    } catch (error) {
      console.error('Failed to decode token:', error);
      setDecodedToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken && storedToken.length > 0) {
      setToken(storedToken);
      decodeAndSetAuth(storedToken);
    } else {
      console.warn('No valid token found in localStorage.');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleLogoutEvent = () => {
      logout();
    };

    window.addEventListener('logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('logout', handleLogoutEvent);
    };
  }, []);

  const login = async (credentials: SignInRequest) => {
    setIsLoading(true);
    try {
      const response = await signIn(credentials);
      const fetchedToken = String(response.data);

      setToken(fetchedToken);

      if (fetchedToken && fetchedToken.length > 0) {
        decodeAndSetAuth(fetchedToken);
      } else {
        console.error('Received token is empty or invalid:', fetchedToken);
      }

      localStorage.setItem('authToken', fetchedToken);

      toast.success('Login realizado com sucesso!');
      router.push('/home');
    } catch (error: any) {
      toast.error('Erro ao fazer login', {
        description: error.message || 'Credenciais inválidas.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setDecodedToken(null);
    localStorage.removeItem('authToken');
    toast.info('Sessão encerrada');
    router.push('/auth');
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        decodedToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
