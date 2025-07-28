import type { SignInRequest } from '@/features/auth/schemas/auth.schema';
import { signIn } from '@/features/auth/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export function useSignInMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: SignInRequest) => {
      return (await signIn(data));
    },
    onSuccess: (data) => {
      login(data);
      toast.success('Login realizado com sucesso!');
    },
    onError: (error) => {
      const errorMessage = 'Erro ao tentar fazer login, tente novamente mais tarde!';
      toast.error('Ops! Algo deu errado', {
        description: errorMessage,
      });
    },
    onMutate: () => {
      toast.loading('Fazendo login...', {
        id: 'signin-loading',
      });
    },
    onSettled: () => {
      toast.dismiss('signin-loading');
    },
  });
}
