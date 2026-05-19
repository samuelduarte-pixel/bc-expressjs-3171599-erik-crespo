import { Patient } from '../types';

export type CreateItemRepoDto = Omit<Patient, 'id' | 'createdAt'>;
export type UpdateItemRepoDto = Partial<CreateItemRepoDto>;

let items: Patient[] = [
  {
    id: 1,
    fullName: 'María García López',
    email: 'maria.garcia@email.com',
    phone: '+57 300 123 4567',
    birthDate: '1988-03-22',
    diagnosis: 'Síndrome de ovario poliquístico',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    fullName: 'Ana Martínez Ruiz',
    email: 'ana.martinez@email.com',
    phone: '+57 310 987 6543',
    birthDate: '1992-07-14',
    diagnosis: 'Baja reserva ovárica',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    fullName: 'Lucía Hernández Torres',
    email: 'lucia.hernandez@email.com',
    phone: '+57 315 456 7890',
    birthDate: '1985-11-30',
    diagnosis: 'Factor tubárico bilateral',
    isActive: false,
    createdAt: new Date(),
  },
];

let nextId = 4;

export async function findAll(): Promise<Patient[]> {
  return [...items];
}

export async function findById(id: number): Promise<Patient | undefined> {
  const found = items.find((p) => p.id === id);
  return found ? { ...found } : undefined;
}

export async function create(dto: CreateItemRepoDto): Promise<Patient> {
  const patient: Patient = { id: nextId++, ...dto, createdAt: new Date() };
  items.push(patient);
  return { ...patient };
}

export async function update(id: number, dto: UpdateItemRepoDto): Promise<Patient | undefined> {
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index]!, ...dto };
  return { ...items[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}