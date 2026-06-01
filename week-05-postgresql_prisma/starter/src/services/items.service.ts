import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';
import { CreateItemDto, UpdateItemDto } from '../schemas/items.schema';

export async function listItems(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getItem(id: number) {
  const patient = await repo.findById(id);
  if (!patient) throw new AppError(404, 'Paciente no encontrado');
  return patient;
}

export async function createItem(data: CreateItemDto) {
  return repo.create(data);
}

export async function updateItem(id: number, data: UpdateItemDto) {
  return repo.update(id, data);
}

export async function deleteItem(id: number) {
  return repo.remove(id);
}