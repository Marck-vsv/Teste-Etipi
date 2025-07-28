import type { SignUpRequest } from '@/features/auth/schemas/auth.schema';
import { signUp } from '@/features/auth/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useSignUpMutation() {
  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      return await signUp(data);
    },
    onSuccess: () => {
      toast.success('Conta criada com sucesso!');
      window.location.reload();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro ao tentar criar sua conta, tente novamente mais tarde!';
      toast.error('Ops! Algo deu errado', {
        description: errorMessage,
      });
    },
    onMutate: () => {
      toast.loading('Criando sua conta...', {
        id: 'signup-loading',
      });
    },
    onSettled: () => {
      toast.dismiss('signup-loading');
    },
  });
}
