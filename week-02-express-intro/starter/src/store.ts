// ============================================
// STORE: Almacenamiento en memoria
// Clínica de Fertilidad — 4 recursos
// ============================================

import type {
  Patient, CreatePatientDto, UpdatePatientDto,
  Treatment, CreateTreatmentDto, UpdateTreatmentDto,
  Doctor, CreateDoctorDto, UpdateDoctorDto,
  Cycle, CreateCycleDto, UpdateCycleDto,
} from './types.js';

// ─────────────────────────────────────────
// PATIENTS
// ─────────────────────────────────────────
const patients: Patient[] = [
  {
    id: 1,
    name: 'Ana Torres',
    age: 34,
    email: 'ana.torres@email.com',
    phone: '3001234567',
    diagnosis: 'Infertilidad primaria',
    doctorId: 1,
  },
  {
    id: 2,
    name: 'Laura Gómez',
    age: 29,
    email: 'laura.gomez@email.com',
    phone: '3109876543',
    diagnosis: 'Síndrome de ovario poliquístico',
    doctorId: 2,
  },
];
let patientNextId = 3;

export function getAllPatients(): Patient[] {
  return patients;
}

export function getPatientById(id: number): Patient | undefined {
  return patients.find((p) => p.id === id);
}

export function createPatient(data: CreatePatientDto): Patient {
  const newPatient: Patient = { id: patientNextId++, ...data };
  patients.push(newPatient);
  return newPatient;
}

export function updatePatient(id: number, data: UpdatePatientDto): Patient | undefined {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  patients[index] = { ...patients[index], ...data };
  return patients[index];
}

export function removePatient(id: number): boolean {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return false;
  patients.splice(index, 1);
  return true;
}

// ─────────────────────────────────────────
// TREATMENTS
// ─────────────────────────────────────────
const treatments: Treatment[] = [
  {
    id: 1,
    name: 'Fecundación In Vitro (FIV)',
    description: 'Fertilización del óvulo fuera del útero en laboratorio.',
    durationWeeks: 6,
    cost: 8000000,
    available: true,
  },
  {
    id: 2,
    name: 'Inseminación Intrauterina (IUI)',
    description: 'Depósito directo de espermatozoides en el útero.',
    durationWeeks: 2,
    cost: 1500000,
    available: true,
  },
];
let treatmentNextId = 3;

export function getAllTreatments(): Treatment[] {
  return treatments;
}

export function getTreatmentById(id: number): Treatment | undefined {
  return treatments.find((t) => t.id === id);
}

export function createTreatment(data: CreateTreatmentDto): Treatment {
  const newTreatment: Treatment = { id: treatmentNextId++, ...data };
  treatments.push(newTreatment);
  return newTreatment;
}

export function updateTreatment(id: number, data: UpdateTreatmentDto): Treatment | undefined {
  const index = treatments.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  treatments[index] = { ...treatments[index], ...data };
  return treatments[index];
}

export function removeTreatment(id: number): boolean {
  const index = treatments.findIndex((t) => t.id === id);
  if (index === -1) return false;
  treatments.splice(index, 1);
  return true;
}

// ─────────────────────────────────────────
// DOCTORS
// ─────────────────────────────────────────
const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dra. María Pérez',
    specialty: 'Reproducción Asistida',
    licenseNumber: 'COL-12345',
    email: 'maria.perez@clinica.com',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Carlos Ruiz',
    specialty: 'Endocrinología Reproductiva',
    licenseNumber: 'COL-67890',
    email: 'carlos.ruiz@clinica.com',
    available: true,
  },
];
let doctorNextId = 3;

export function getAllDoctors(): Doctor[] {
  return doctors;
}

export function getDoctorById(id: number): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function createDoctor(data: CreateDoctorDto): Doctor {
  const newDoctor: Doctor = { id: doctorNextId++, ...data };
  doctors.push(newDoctor);
  return newDoctor;
}

export function updateDoctor(id: number, data: UpdateDoctorDto): Doctor | undefined {
  const index = doctors.findIndex((d) => d.id === id);
  if (index === -1) return undefined;
  doctors[index] = { ...doctors[index], ...data };
  return doctors[index];
}

export function removeDoctor(id: number): boolean {
  const index = doctors.findIndex((d) => d.id === id);
  if (index === -1) return false;
  doctors.splice(index, 1);
  return true;
}

// ─────────────────────────────────────────
// CYCLES
// ─────────────────────────────────────────
const cycles: Cycle[] = [
  {
    id: 1,
    patientId: 1,
    treatmentId: 1,
    doctorId: 1,
    startDate: '2025-01-15',
    status: 'active',
    notes: 'Primer ciclo FIV. Respuesta hormonal normal.',
  },
];
let cycleNextId = 2;

export function getAllCycles(): Cycle[] {
  return cycles;
}

export function getCycleById(id: number): Cycle | undefined {
  return cycles.find((c) => c.id === id);
}

export function createCycle(data: CreateCycleDto): Cycle {
  const newCycle: Cycle = { id: cycleNextId++, ...data };
  cycles.push(newCycle);
  return newCycle;
}

export function updateCycle(id: number, data: UpdateCycleDto): Cycle | undefined {
  const index = cycles.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  cycles[index] = { ...cycles[index], ...data };
  return cycles[index];
}

export function removeCycle(id: number): boolean {
  const index = cycles.findIndex((c) => c.id === id);
  if (index === -1) return false;
  cycles.splice(index, 1);
  return true;
}