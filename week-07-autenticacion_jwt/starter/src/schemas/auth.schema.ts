import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z
    .string()
    .min(8, 'Minimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayuscula')
    .regex(/[0-9]/, 'Debe contener al menos un numero'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'La contrasena es requerida'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
