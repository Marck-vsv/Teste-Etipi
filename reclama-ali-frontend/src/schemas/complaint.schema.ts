import { isValidCPF } from '@/utils/validators';
import { z } from 'zod';

export const createComplaintSchema = z.object({
  cpf: z
    .string()
    .min(11)
    .max(14)
    .transform((val) => val.replace(/[^\d]/g, ''))
    .refine(isValidCPF, { message: 'CPF inválido' }),
  title: z.string().min(1),
  description: z.string().min(10),
});

export type Complaint = z.infer<typeof createComplaintSchema>;
