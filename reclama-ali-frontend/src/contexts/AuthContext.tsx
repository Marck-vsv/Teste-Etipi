"use client"
import {
  LoginResponse,
  SignInRequest,
} from '@/features/auth/schemas/auth.schema';
import { signIn } from '@/features/auth/services/auth.service';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  user: LoginResponse['userInfo'] | null;
  token: string | null;
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
  const [user, setUser] = useState<LoginResponse['userInfo'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Falha em fazer parse do userInfo: ', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: SignInRequest) => {
    setIsLoading(true);
    try {
      const response = await signIn(credentials);
      const fetchedUser = response.data.userInfo;
      const fetchedToken = response.data.token;

      setUser(fetchedUser);
      setToken(fetchedToken);
      localStorage.setItem('authToken', fetchedToken);
      localStorage.setItem('authUser', JSON.stringify(fetchedUser));

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
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    toast.info('Sessão encerrada');
    router.push('/auth');
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, login, logout }}
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
