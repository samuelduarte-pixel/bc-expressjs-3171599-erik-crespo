// ============================================
// REPOSITORY — patients
// ============================================
import { Patient, CreatePatientDto, UpdatePatientDto } from '../types.js';

const store: Patient[] = [
  { id: 1, fullName: 'Laura Gomez',    age: 34, diagnosis: 'Infertilidad primaria',           activeTreatment: true,  createdAt: new Date().toISOString() },
  { id: 2, fullName: 'Maria Lopez',    age: 31, diagnosis: 'Tratamiento FIV',                 activeTreatment: true,  createdAt: new Date().toISOString() },
  { id: 3, fullName: 'Carolina Rios',  age: 38, diagnosis: 'Endometriosis',                   activeTreatment: false, createdAt: new Date().toISOString() },
  { id: 4, fullName: 'Diana Morales',  age: 29, diagnosis: 'Síndrome de ovario poliquístico', activeTreatment: true,  createdAt: new Date().toISOString() },
  { id: 5, fullName: 'Valentina Cruz', age: 36, diagnosis: 'Tratamiento hormonal',            activeTreatment: false, createdAt: new Date().toISOString() },
];
let nextId = 6;

export async function findAll(): Promise<Patient[]> {
  return [...store];
}

export async function findById(id: number): Promise<Patient | undefined> {
  return store.find((p) => p.id === id);
}

export async function create(dto: CreatePatientDto): Promise<Patient> {
  const patient: Patient = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(patient);
  return { ...patient };
}

export async function update(id: number, dto: UpdatePatientDto): Promise<Patient | undefined> {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}