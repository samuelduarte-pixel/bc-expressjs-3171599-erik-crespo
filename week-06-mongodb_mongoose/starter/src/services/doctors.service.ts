import * as repo from '../repositories/doctors.repository';
import { AppError } from '../errors/AppError';
import { CreateDoctorDto, UpdateDoctorDto } from '../schemas/doctor.schema';

export async function listDoctors(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getDoctor(id: string) {
  const doctor = await repo.findById(id);
  if (!doctor) throw new AppError(404, 'Doctor no encontrado');
  return doctor;
}

export async function createDoctor(data: CreateDoctorDto) {
  return repo.create(data);
}

export async function updateDoctor(id: string, data: UpdateDoctorDto) {
  return repo.update(id, data);
}

export async function deleteDoctor(id: string) {
  return repo.remove(id);
}
