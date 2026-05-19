import { z } from 'zod';

export const createItemSchema = z.object({
  fullName: z
    .string({ required_error: 'El nombre completo es obligatorio' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .trim(),

  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('Debe ser un correo electrónico válido')
    .trim(),

  phone: z
    .string({ required_error: 'El teléfono es obligatorio' })
    .regex(/^\+?[\d\s\-]{7,15}$/, 'Número de teléfono inválido')
    .trim(),

  birthDate: z
    .string({ required_error: 'La fecha de nacimiento es obligatoria' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),

  diagnosis: z
    .string()
    .min(5, 'El diagnóstico debe tener al menos 5 caracteres')
    .trim()
    .default('Pendiente de evaluación'),

  isActive: z.boolean().default(true),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;