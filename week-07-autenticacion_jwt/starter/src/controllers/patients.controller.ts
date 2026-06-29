import { Request, Response, NextFunction } from 'express';
import * as service from '../services/patients.service';
import { createPatientSchema, updatePatientSchema } from '../schemas/patient.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(String(req.query['page'] ?? '1'), 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '10'), 10) || 10));
    const result = await service.listPatients(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params['id']);
    const patient = await service.getPatient(id);
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createPatientSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? 'Datos invalidos';
      res.status(400).json({ status: 'error', message });
      return;
    }
    const userId = req.user!.sub;
    const patient = await service.createPatient(parsed.data, userId);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params['id']);
    const parsed = updatePatientSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? 'Datos invalidos';
      res.status(400).json({ status: 'error', message });
      return;
    }
    const patient = await service.updatePatient(id, parsed.data);
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = String(req.params['id']);
    await service.deletePatient(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
