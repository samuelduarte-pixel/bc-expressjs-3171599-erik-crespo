import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createPatientSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email('Email invalido'),
  phone: z.string().min(7).max(20),
  dateOfBirth: z.string().refine((v) => !isNaN(Date.parse(v)), {
    message: 'Fecha de nacimiento invalida (usa formato ISO: YYYY-MM-DD)',
  }),
  diagnosis: z.string().min(1).max(500),
  active: z.boolean().default(true),
  assignedDoctor: z.string().regex(objectIdRegex, 'ID de doctor invalido'),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientDto = z.infer<typeof createPatientSchema>;
export type UpdatePatientDto = z.infer<typeof updatePatientSchema>;
