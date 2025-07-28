// useSignInMutation.ts (SOLUÇÃO RECOMENDADA)
import type { SignInRequest } from '@/features/auth/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

export function useSignInMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      await login(data);
      return data;
    },
    onError: (error) => {
      console.error('Login mutation failed:', error);
    },
  });
}
