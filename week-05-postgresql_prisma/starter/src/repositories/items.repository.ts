import { prisma } from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../errors/AppError';
import { CreateItemDto, UpdateItemDto } from '../schemas/items.schema';

export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.patient.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { doctor: true },
    }),
    prisma.patient.count(),
  ]);

  return { data, total, page, limit };
}

export async function findById(id: number) {
  return prisma.patient.findUnique({
    where: { id },
    include: { doctor: true },
  });
}

export async function create(data: CreateItemDto) {
  try {
    return await prisma.patient.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
      },
      include: { doctor: true },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe un paciente con ese email');
    }
    throw err;
  }
}

export async function update(id: number, data: UpdateItemDto) {
  try {
    return await prisma.patient.update({
      where: { id },
      data: {
        ...data,
        ...(data.dateOfBirth ? { dateOfBirth: new Date(data.dateOfBirth) } : {}),
      },
      include: { doctor: true },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') throw new AppError(404, 'Paciente no encontrado');
      if (err.code === 'P2002') throw new AppError(409, 'Ya existe un paciente con ese email');
    }
    throw err;
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await prisma.patient.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, 'Paciente no encontrado');
    }
    throw err;
  }
}