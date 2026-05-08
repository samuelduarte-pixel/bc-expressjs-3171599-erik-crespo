// ============================================
// TYPES — Clínica de Fertilidad
// ============================================

// ── PATIENT ──────────────────────────────────
export interface Patient {
  id: number;
  fullName: string;
  age: number;
  diagnosis: string;
  activeTreatment: boolean;
  createdAt: string;
}
export type CreatePatientDto = Omit<Patient, 'id' | 'createdAt'>;
export type UpdatePatientDto = Partial<CreatePatientDto>;

// ── DOCTOR ───────────────────────────────────
export interface Doctor {
  id: number;
  fullName: string;
  specialty: string;
  licenseNumber: string;
  available: boolean;
  createdAt: string;
}
export type CreateDoctorDto = Omit<Doctor, 'id' | 'createdAt'>;
export type UpdateDoctorDto = Partial<CreateDoctorDto>;

// ── TREATMENT ────────────────────────────────
export interface Treatment {
  id: number;
  name: string;
  description: string;
  durationWeeks: number;
  active: boolean;
  createdAt: string;
}
export type CreateTreatmentDto = Omit<Treatment, 'id' | 'createdAt'>;
export type UpdateTreatmentDto = Partial<CreateTreatmentDto>;

// ── CYCLE ────────────────────────────────────
export interface Cycle {
  id: number;
  patientId: number;
  doctorId: number;
  treatmentId: number;
  startDate: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}
export type CreateCycleDto = Omit<Cycle, 'id' | 'createdAt'>;
export type UpdateCycleDto = Partial<CreateCycleDto>;

// ── CONTRATOS GENÉRICOS ───────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}