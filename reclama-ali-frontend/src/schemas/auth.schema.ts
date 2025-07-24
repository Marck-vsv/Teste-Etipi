import { isValidCPF } from '@/utils/validators';
import z from 'zod';

export const signInSchema = z.object({
  cpf: z
    .string()
    .min(11)
    .max(14)
    .transform((val) => val.replace(/[^\d]/g, ''))
    .refine(isValidCPF, { message: 'CPF inválido' }),
  password: z.string(),
});

export const signUpSchema = z.object({
  cpf: z
    .string()
    .min(11)
    .max(14)
    .transform((val) => val.replace(/[^\d]/g, ''))
    .refine(isValidCPF, { message: 'CPF inválido' }),
  name: z.string(),
  password: z.string(),
});

export type SignInRequest = z.infer<typeof signInSchema>
export type LoginResponse = {
  userInfo: {
    cpf: string,
    name: string,
  }
}
export type SignUpRequest = z.infer<typeof signUpSchema>