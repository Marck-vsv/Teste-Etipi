'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSignInMutation } from '@/features/auth/mutations/use-sign-in.mutation';
import {
  type SignInRequest,
  signInSchema,
} from '@/features/auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, PersonStandingIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: mutateSignIn, isPending: signInPending } =
    useSignInMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInRequest>({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignInRequest) {
    if (!data.cpf.trim() || !data.password.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    mutateSignIn(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <Input
            id="cpf"
            label="CPF"
            mask="000.000.000-00"
            placeholder="000.000.000-00"
            error={errors.cpf?.message}
            isLoading={signInPending}
            value={field.value || ''}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        {...register('password')}
        id="password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        placeholder="Digite sua senha"
        error={errors.password?.message}
        isLoading={signInPending}
        icon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={signInPending}
            className="hover:text-blue-600 transition-colors disabled:opacity-50"
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
        }
      />

      <Button type="submit" isLoading={signInPending}>
        Entrar
      </Button>
    </form>
  );
}
