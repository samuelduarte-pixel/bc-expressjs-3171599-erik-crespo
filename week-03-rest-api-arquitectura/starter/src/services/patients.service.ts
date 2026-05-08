// ============================================
// SERVICE — patients
// ============================================
import { Patient, CreatePatientDto, UpdatePatientDto, PaginatedResponse, PaginationParams } from '../types.js';
import * as repo from '../repositories/patients.repository.js';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Patient>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Patient | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreatePatientDto): Promise<Patient> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdatePatientDto): Promise<Patient | undefined> {
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}