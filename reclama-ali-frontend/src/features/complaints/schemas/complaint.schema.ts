import { z } from 'zod';

export const complaintStatusSchema = z.enum([
  'PENDENTE',
  'RESOLVIDO',
  'FECHADO',
]);

export const complaintSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, 'O título é obrigatório.')
    .max(255, 'O titulo nao pode ultrapassar 255 caracteres.'),
  description: z
    .string()
    .min(1, 'A descrição é obrigatória.')
    .max(512, 'A descrição não pode ultrapassar 512 caracteres.'),
  createdAt: z.string().or(z.date()),
  status: complaintStatusSchema,
});

export const createComplaintSchema = complaintSchema.pick({
  title: true,
  description: true,
});

export const updateComplaintSchema = complaintSchema
  .pick({
    title: true,
    description: true,
  })
  .partial();

export const updateComplaintStatusSchema = complaintSchema.pick({
  status: true,
});

export type Complaint = z.infer<typeof complaintSchema>;
export type CreateComplaintRequest = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintRequest = z.infer<typeof updateComplaintSchema>;
export type UpdateComplaintStatusRequest = z.infer<
  typeof updateComplaintStatusSchema
>;
export type PaginatedComplaintsResponse = {
  content: Complaint[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
};
