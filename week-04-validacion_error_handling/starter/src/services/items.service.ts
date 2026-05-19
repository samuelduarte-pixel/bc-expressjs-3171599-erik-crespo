import { Patient, PaginatedResponse } from '../types';
import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Patient>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Patient> {
  const patient = await repo.findById(id);
  if (!patient) throw new AppError(404, `Paciente con id ${id} no encontrado`);
  return patient;
}

export async function create(dto: repo.CreateItemRepoDto): Promise<Patient> {
  const all = await repo.findAll();
  const duplicate = all.find((p) => p.email === dto.email);
  if (duplicate) throw new AppError(409, `Ya existe un paciente con el correo ${dto.email}`);
  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateItemRepoDto): Promise<Patient> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Paciente con id ${id} no encontrado`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Paciente con id ${id} no encontrado`);
  await repo.remove(id);
}