// ============================================
// TYPES: Clínica de Fertilidad
// ============================================

// --- PATIENTS ---
export interface Patient {
  id: number;
  name: string;
  age: number;
  email: string;
  phone: string;
  diagnosis: string; // Ej: "Infertilidad primaria", "SOP", "Factor masculino"
  doctorId: number;
}
export type CreatePatientDto = Omit<Patient, 'id'>;
export type UpdatePatientDto = Partial<CreatePatientDto>;

// --- TREATMENTS ---
export interface Treatment {
  id: number;
  name: string;          // Ej: "FIV", "IUI", "Estimulación ovárica"
  description: string;
  durationWeeks: number;
  cost: number;
  available: boolean;
}
export type CreateTreatmentDto = Omit<Treatment, 'id'>;
export type UpdateTreatmentDto = Partial<CreateTreatmentDto>;

// --- DOCTORS ---
export interface Doctor {
  id: number;
  name: string;
  specialty: string;     // Ej: "Reproducción asistida", "Endocrinología"
  licenseNumber: string;
  email: string;
  available: boolean;
}
export type CreateDoctorDto = Omit<Doctor, 'id'>;
export type UpdateDoctorDto = Partial<CreateDoctorDto>;

// --- CYCLES ---
export interface Cycle {
  id: number;
  patientId: number;
  treatmentId: number;
  doctorId: number;
  startDate: string;     // ISO date string
  status: 'active' | 'completed' | 'cancelled';
  notes: string;
}
export type CreateCycleDto = Omit<Cycle, 'id'>;
export type UpdateCycleDto = Partial<CreateCycleDto>;