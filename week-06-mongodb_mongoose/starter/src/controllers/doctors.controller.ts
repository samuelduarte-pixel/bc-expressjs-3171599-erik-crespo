import { Request, Response, NextFunction } from 'express';
import * as service from '../services/doctors.service';
import { createDoctorSchema, updateDoctorSchema } from '../schemas/doctor.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = Math.max(1, parseInt(String(req.query['page']  ?? '1'),  10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '10'), 10) || 10));
    const result = await service.listDoctors(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] ?? '';
    const doctor = await service.getDoctor(id);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createDoctorSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? 'Datos invalidos';
      res.status(400).json({ status: 'error', message });
      return;
    }
    const doctor = await service.createDoctor(parsed.data);
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] ?? '';
    const parsed = updateDoctorSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? 'Datos invalidos';
      res.status(400).json({ status: 'error', message });
      return;
    }
    const doctor = await service.updateDoctor(id, parsed.data);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] ?? '';
    await service.deleteDoctor(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
