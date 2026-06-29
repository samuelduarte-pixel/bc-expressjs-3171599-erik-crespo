import * as repo from '../repositories/patients.repository';
import { AppError } from '../errors/AppError';
import { CreatePatientDto, UpdatePatientDto } from '../schemas/patient.schema';

export async function listPatients(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getPatient(id: string) {
  const patient = await repo.findById(id);
  if (!patient) throw new AppError(404, 'Paciente no encontrado');
  return patient;
}

export async function createPatient(data: CreatePatientDto) {
  return repo.create(data);
}

export async function updatePatient(id: string, data: UpdatePatientDto) {
  return repo.update(id, data);
}

export async function deletePatient(id: string) {
  return repo.remove(id);
}
