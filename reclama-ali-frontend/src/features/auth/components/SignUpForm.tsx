'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSignUpMutation } from '@/features/auth/mutations/use-sign-up.mutation';
import {
  type SignUpRequest,
  signUpSchema,
} from '@/features/auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Pen, PersonStandingIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: mutateSignUp, isPending: signUpPending } =
    useSignUpMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(signUpSchema),
  });

  function onSubmit(data: SignUpRequest) {
    if (!data.cpf.trim() || !data.name.trim() || !data.password.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    mutateSignUp(data);
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
            isLoading={signUpPending}
            value={field.value || ''}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        {...register('name')}
        id="name"
        label="Nome"
        placeholder="José Pedro"
        error={errors.name?.message}
        isLoading={signUpPending}
        icon={
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <Pen />
          </svg>
        }
      />

      <Input
        {...register('password')}
        id="password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        placeholder="12345678"
        error={errors.password?.message}
        isLoading={signUpPending}
        icon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={signUpPending}
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

      <Button type="submit" isLoading={signUpPending}>
        Criar Conta
      </Button>
    </form>
  );
}
