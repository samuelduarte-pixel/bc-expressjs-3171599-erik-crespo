import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(2).max(100),
  specialty: z.enum([
    'Reproduccion Asistida',
    'Ginecologia',
    'Endocrinologia',
    'Urologia',
    'Embriologia',
  ]),
  licenseNumber: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  available: z.boolean().default(true),
});

export const updateDoctorSchema = createDoctorSchema.partial();

export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorDto = z.infer<typeof updateDoctorSchema>;
