// ============================================
// SERVICE — treatments
// ============================================
import { Treatment, CreateTreatmentDto, UpdateTreatmentDto, PaginatedResponse, PaginationParams } from '../types.js';
import * as repo from '../repositories/treatments.repository.js';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Treatment>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Treatment | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreateTreatmentDto): Promise<Treatment> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateTreatmentDto): Promise<Treatment | undefined> {
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}