import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Doctor } from '../models/doctor.model';
import { AppError } from '../errors/AppError';
import type { CreateDoctorDto, UpdateDoctorDto } from '../schemas/doctor.schema';

export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Doctor.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Doctor.countDocuments(),
  ]);
  return { data, total, page, limit };
}

export async function findById(id: string) {
  try {
    const doctor = await Doctor.findById(id).lean();
    return doctor;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID invalido');
    }
    throw err;
  }
}

export async function create(data: CreateDoctorDto) {
  try {
    const doctor = await Doctor.create(data);
    return doctor.toJSON();
  } catch (err: unknown) {
    if (err instanceof MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyPattern!)[0];
      const label =
        field === 'licenseNumber'
          ? 'Numero de licencia'
          : field === 'email'
            ? 'Email'
            : field;
      throw new AppError(409, `El ${label} ya esta registrado`);
    }
    throw err;
  }
}

export async function update(id: string, data: UpdateDoctorDto) {
  try {
    const doctor = await Doctor.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doctor) throw new AppError(404, 'Doctor no encontrado');
    return doctor;
  } catch (err: unknown) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID invalido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyPattern!)[0];
      const label =
        field === 'licenseNumber'
          ? 'Numero de licencia'
          : field === 'email'
            ? 'Email'
            : field;
      throw new AppError(409, `El ${label} ya esta registrado`);
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const doctor = await Doctor.findByIdAndDelete(id).lean();
    if (!doctor) throw new AppError(404, 'Doctor no encontrado');
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID invalido');
    }
    throw err;
  }
}
