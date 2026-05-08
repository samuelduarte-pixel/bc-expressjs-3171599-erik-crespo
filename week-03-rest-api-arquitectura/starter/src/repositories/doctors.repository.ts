// ============================================
// REPOSITORY — doctors
// ============================================
import { Doctor, CreateDoctorDto, UpdateDoctorDto } from '../types.js';

const store: Doctor[] = [
  { id: 1, fullName: 'Dr. Andrés Peña',    specialty: 'Reproducción Asistida', licenseNumber: 'COL-1234', available: true,  createdAt: new Date().toISOString() },
  { id: 2, fullName: 'Dra. Sandra Vargas', specialty: 'Endocrinología',         licenseNumber: 'COL-5678', available: true,  createdAt: new Date().toISOString() },
  { id: 3, fullName: 'Dr. Camilo Herrera', specialty: 'Ginecología',            licenseNumber: 'COL-9012', available: false, createdAt: new Date().toISOString() },
  { id: 4, fullName: 'Dra. Isabel Muñoz',  specialty: 'Fertilidad',             licenseNumber: 'COL-3456', available: true,  createdAt: new Date().toISOString() },
  { id: 5, fullName: 'Dr. Ricardo Blanco', specialty: 'Andrología',             licenseNumber: 'COL-7890', available: false, createdAt: new Date().toISOString() },
];
let nextId = 6;

export async function findAll(): Promise<Doctor[]> {
  return [...store];
}

export async function findById(id: number): Promise<Doctor | undefined> {
  return store.find((d) => d.id === id);
}

export async function create(dto: CreateDoctorDto): Promise<Doctor> {
  const doctor: Doctor = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(doctor);
  return { ...doctor };
}

export async function update(id: number, dto: UpdateDoctorDto): Promise<Doctor | undefined> {
  const index = store.findIndex((d) => d.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((d) => d.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}