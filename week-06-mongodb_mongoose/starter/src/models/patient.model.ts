import { Schema, model, Types } from 'mongoose';

export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  diagnosis: string;
  active: boolean;
  assignedDoctor: Types.ObjectId;
}

const patientSchema = new Schema<IPatient>(
  {
    firstName: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [50, 'El nombre no puede exceder 50 caracteres'],
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
      minlength: [2, 'El apellido debe tener al menos 2 caracteres'],
      maxlength: [50, 'El apellido no puede exceder 50 caracteres'],
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
    dateOfBirth: {
      type: Date,
      required: [true, 'La fecha de nacimiento es obligatoria'],
    },
    diagnosis: {
      type: String,
      required: [true, 'El diagnostico es obligatorio'],
      trim: true,
      maxlength: [500, 'El diagnostico no puede exceder 500 caracteres'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    assignedDoctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'El doctor asignado es obligatorio'],
    },
  },
  { timestamps: true },
);

export const Patient = model<IPatient>('Patient', patientSchema);
