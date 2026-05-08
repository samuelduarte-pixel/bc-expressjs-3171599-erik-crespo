// ============================================
// REPOSITORY — cycles
// ============================================
import { Cycle, CreateCycleDto, UpdateCycleDto } from '../types.js';

const store: Cycle[] = [
  { id: 1, patientId: 1, doctorId: 1, treatmentId: 1, startDate: '2026-01-10', status: 'active',    createdAt: new Date().toISOString() },
  { id: 2, patientId: 2, doctorId: 2, treatmentId: 2, startDate: '2026-02-15', status: 'completed', createdAt: new Date().toISOString() },
  { id: 3, patientId: 3, doctorId: 1, treatmentId: 3, startDate: '2026-03-01', status: 'cancelled', createdAt: new Date().toISOString() },
  { id: 4, patientId: 4, doctorId: 4, treatmentId: 1, startDate: '2026-04-20', status: 'active',    createdAt: new Date().toISOString() },
  { id: 5, patientId: 5, doctorId: 2, treatmentId: 5, startDate: '2026-05-01', status: 'active',    createdAt: new Date().toISOString() },
];
let nextId = 6;

export async function findAll(): Promise<Cycle[]> {
  return [...store];
}

export async function findById(id: number): Promise<Cycle | undefined> {
  return store.find((c) => c.id === id);
}

export async function create(dto: CreateCycleDto): Promise<Cycle> {
  const cycle: Cycle = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(cycle);
  return { ...cycle };
}

export async function update(id: number, dto: UpdateCycleDto): Promise<Cycle | undefined> {
  const index = store.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((c) => c.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}