import { Schema, model } from 'mongoose';

export interface IDoctor {
  name: string;
  specialty: string;
  licenseNumber: string;
  email: string;
  phone: string;
  available: boolean;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    specialty: {
      type: String,
      required: [true, 'La especialidad es obligatoria'],
      trim: true,
      enum: {
        values: [
          'Reproduccion Asistida',
          'Ginecologia',
          'Endocrinologia',
          'Urologia',
          'Embriologia',
        ],
        message: 'Especialidad no valida',
      },
    },
    licenseNumber: {
      type: String,
      required: [true, 'El numero de licencia es obligatorio'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'El telefono es obligatorio'],
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Doctor = model<IDoctor>('Doctor', doctorSchema);
