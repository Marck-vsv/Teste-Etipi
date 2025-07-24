'use client';
import { SignUpRequest, signUpSchema } from '@/schemas/auth.schema';
import { useAuthService } from '@/services/use-auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeClosed, Lock, Pen, PersonStandingIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUp() {
  const { signUp } = useAuthService();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: mutateSignUp,
    isPending: signUpPending,
    isError: signUpError,
  } = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      return (await signUp(data)) as unknown as Promise<SignUpRequest>;
    },
    onSuccess: () => {
      toast.success('Conta criada com sucesso!');
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

  function onSubmit(data: SignUpRequest) {
    if (!data.cpf.trim() || !data.name.trim() || !data.password.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    mutateSignUp(data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <Lock />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Olá</h1>
          <p className="text-gray-600">Crie sua conta para continuar</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700"
              >
                CPF
              </label>
              <div className="relative">
                <input
                  {...register('cpf')}
                  type="text"
                  id="cpf"
                  disabled={signUpPending}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.cpf
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="000.000.000-00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <PersonStandingIcon />
                  </svg>
                </div>
              </div>
              {errors.cpf && (
                <p className="text-red-500 text-sm animate-shake">
                  {errors.cpf.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="relative">
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  disabled={signUpPending}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.name
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="José Pedro"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <Pen />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm animate-shake">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  disabled={signUpPending}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="12345678"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={signUpPending}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <Eye />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <EyeClosed />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm animate-shake">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={signUpPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:scale-100"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
