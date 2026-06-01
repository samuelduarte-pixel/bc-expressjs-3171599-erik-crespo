import { z } from 'zod';

export const createItemSchema = z.object({
  firstName:   z.string().min(1).max(100),
  lastName:    z.string().min(1).max(100),
  email:       z.string().email('Email inválido'),
  phone:       z.string().min(7).max(20),
  dateOfBirth: z.string().refine((v) => !isNaN(Date.parse(v)), {
    message: 'Fecha de nacimiento inválida (usa formato ISO: YYYY-MM-DD)',
  }),
  diagnosis:   z.string().min(1).max(500),
  active:      z.boolean().default(true),
  doctorId:    z.number().int().positive().optional(),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;