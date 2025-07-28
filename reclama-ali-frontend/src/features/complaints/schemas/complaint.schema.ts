import { z } from 'zod';

export const complaintStatusSchema = z.enum([
  'PENDENTE',
  'RESOLVIDO',
  'FECHADO',
]);

export const complaintSchema = z.object({
  uuid: z.string(),
  title: z
    .string()
    .min(1, 'O título é obrigatório.')
    .max(255, 'O titulo nao pode ultrapassar 255 caracteres.'),
  description: z
    .string()
    .min(1, 'A descrição é obrigatória.')
    .max(512, 'A descrição não pode ultrapassar 512 caracteres.'),
  createdAt: z.string().or(z.date()),
  complaintStatus: complaintStatusSchema,
});

export const createComplaintSchema = complaintSchema.pick({
  title: true,
  description: true,
});

export const updateComplaintSchema = complaintSchema
  .pick({
    title: true,
    description: true,
    complaintStatus: true,
  })
  .partial();

export const updateComplaintStatusSchema = complaintSchema.pick({
  complaintStatus: true,
});

export type Complaint = z.infer<typeof complaintSchema>;
export type CreateComplaintRequest = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintRequest = z.infer<typeof updateComplaintSchema>;
export type UpdateComplaintStatusRequest = z.infer<
  typeof updateComplaintStatusSchema
>;
export type PaginatedComplaintsResponse = {
  content: Complaint[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};
