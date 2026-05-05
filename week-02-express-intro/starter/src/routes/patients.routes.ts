import { Router } from 'express';
import type { Request, Response } from 'express';
import * as store from '../store.js';
import type { CreatePatientDto, UpdatePatientDto } from '../types.js';

export const patientsRouter = Router();

// GET /api/v1/patients — Listar todos los pacientes
patientsRouter.get('/', (_req: Request, res: Response) => {
  const patients = store.getAllPatients();
  res.status(200).json(patients);
});

// GET /api/v1/patients/:id — Obtener paciente por ID
patientsRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const patient = store.getPatientById(id);
  if (!patient) {
    res.status(404).json({ error: `Patient with id ${id} not found` });
    return;
  }
  res.status(200).json(patient);
});

// POST /api/v1/patients — Crear nuevo paciente
patientsRouter.post('/', (req: Request, res: Response) => {
  const dto: CreatePatientDto = req.body as CreatePatientDto;
  const created = store.createPatient(dto);
  res.status(201).json(created);
});

// PUT /api/v1/patients/:id — Actualizar paciente
patientsRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const dto: UpdatePatientDto = req.body as UpdatePatientDto;
  const updated = store.updatePatient(id, dto);
  if (!updated) {
    res.status(404).json({ error: `Patient with id ${id} not found` });
    return;
  }
  res.status(200).json(updated);
});

// DELETE /api/v1/patients/:id — Eliminar paciente
patientsRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const removed = store.removePatient(id);
  if (!removed) {
    res.status(404).json({ error: `Patient with id ${id} not found` });
    return;
  }
  res.status(204).send();
});