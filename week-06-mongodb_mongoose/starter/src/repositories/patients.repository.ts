import mongoose, { MongoServerError } from 'mongoose';
import { Patient } from '../models/patient.model';
import { AppError } from '../errors/AppError';
import { CreatePatientDto, UpdatePatientDto } from '../schemas/patient.schema';

export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Patient.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('assignedDoctor')
      .lean(),
    Patient.countDocuments(),
  ]);
  return { data, total, page, limit };
}

export async function findById(id: string) {
  try {
    const patient = await Patient.findById(id)
      .populate('assignedDoctor')
      .lean();
    return patient;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID invalido');
    }
    throw err;
  }
}

export async function create(data: CreatePatientDto) {
  try {
    const patient = await Patient.create({
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
    });
    const populated = await patient.populate('assignedDoctor');
    return populated.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un paciente con ese email');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de doctor invalido');
    }
    throw err;
  }
}

export async function update(id: string, data: UpdatePatientDto) {
  try {
    const updateData: Record<string, unknown> = { ...data };
    if (data.dateOfBirth) {
      updateData.dateOfBirth = new Date(data.dateOfBirth);
    }
    const patient = await Patient.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate('assignedDoctor')
      .lean();
    if (!patient) throw new AppError(404, 'Paciente no encontrado');
    return patient;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID invalido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un paciente con ese email');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const patient = await Patient.findByIdAndDelete(id).lean();
    if (!patient) throw new AppError(404, 'Paciente no encontrado');
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID invalido');
    }
    throw err;
  }
}
