// ============================================
// REPOSITORY — treatments
// ============================================
import { Treatment, CreateTreatmentDto, UpdateTreatmentDto } from '../types.js';

const store: Treatment[] = [
  { id: 1, name: 'FIV',                     description: 'Fecundación In Vitro clásica',           durationWeeks: 12, active: true,  createdAt: new Date().toISOString() },
  { id: 2, name: 'ICSI',                    description: 'Inyección intracitoplasmática de esperma', durationWeeks: 10, active: true,  createdAt: new Date().toISOString() },
  { id: 3, name: 'Inseminación Artificial', description: 'Inseminación intrauterina controlada',     durationWeeks: 4,  active: true,  createdAt: new Date().toISOString() },
  { id: 4, name: 'Estimulación Ovárica',    description: 'Tratamiento hormonal para estimulación',  durationWeeks: 3,  active: false, createdAt: new Date().toISOString() },
  { id: 5, name: 'Preservación Fertilidad', description: 'Vitrificación de óvulos',                 durationWeeks: 2,  active: true,  createdAt: new Date().toISOString() },
];
let nextId = 6;

export async function findAll(): Promise<Treatment[]> {
  return [...store];
}

export async function findById(id: number): Promise<Treatment | undefined> {
  return store.find((t) => t.id === id);
}

export async function create(dto: CreateTreatmentDto): Promise<Treatment> {
  const treatment: Treatment = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(treatment);
  return { ...treatment };
}

export async function update(id: number, dto: UpdateTreatmentDto): Promise<Treatment | undefined> {
  const index = store.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((t) => t.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}