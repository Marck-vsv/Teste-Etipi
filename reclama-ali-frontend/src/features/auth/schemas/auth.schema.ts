import { isValidCPF } from '@/utils/validators';
import z from 'zod';

export const signInSchema = z.object({
  cpf: z
    .string()
    .min(11, { message: 'O CPF deve possuir pelo menos 11 digitos.' })
    .max(14, { message: 'O CPF deve possuir pelo menos 11 digitos.' })
    .transform((val) => val.replace(/[^\d]/g, ''))
    .refine(isValidCPF, { message: 'CPF inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve possuir ao menos 8 caracteres.' }),
});

export const signUpSchema = z.object({
  cpf: z
    .string()
    .min(11, { message: 'O CPF deve possuir pelo menos 11 digitos.' })
    .max(14, { message: 'O CPF deve possuir pelo menos 11 digitos.' })
    .transform((val) => val.replace(/[^\d]/g, ''))
    .refine(isValidCPF, { message: 'CPF inválido' }),
  name: z.string(),
  password: z
    .string()
    .min(8, { message: 'A senha deve possuir ao menos 8 caracteres.' }),
});

export type SignInRequest = z.infer<typeof signInSchema>;
export type LoginResponse = {
  userInfo: {
    cpf: string;
    name: string;
  };
};
export type SignUpRequest = z.infer<typeof signUpSchema>;
