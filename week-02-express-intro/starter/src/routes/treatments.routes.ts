import { Router } from 'express';
import type { Request, Response } from 'express';
import * as store from '../store.js';
import type { CreateTreatmentDto, UpdateTreatmentDto } from '../types.js';

export const treatmentsRouter = Router();

// GET /api/v1/treatments — Listar todos los tratamientos
treatmentsRouter.get('/', (_req: Request, res: Response) => {
  const treatments = store.getAllTreatments();
  res.status(200).json(treatments);
});

// GET /api/v1/treatments/:id — Obtener tratamiento por ID
treatmentsRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const treatment = store.getTreatmentById(id);
  if (!treatment) {
    res.status(404).json({ error: `Treatment with id ${id} not found` });
    return;
  }
  res.status(200).json(treatment);
});

// POST /api/v1/treatments — Crear nuevo tratamiento
treatmentsRouter.post('/', (req: Request, res: Response) => {
  const dto: CreateTreatmentDto = req.body as CreateTreatmentDto;
  const created = store.createTreatment(dto);
  res.status(201).json(created);
});

// PUT /api/v1/treatments/:id — Actualizar tratamiento
treatmentsRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const dto: UpdateTreatmentDto = req.body as UpdateTreatmentDto;
  const updated = store.updateTreatment(id, dto);
  if (!updated) {
    res.status(404).json({ error: `Treatment with id ${id} not found` });
    return;
  }
  res.status(200).json(updated);
});

// DELETE /api/v1/treatments/:id — Eliminar tratamiento
treatmentsRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const removed = store.removeTreatment(id);
  if (!removed) {
    res.status(404).json({ error: `Treatment with id ${id} not found` });
    return;
  }
  res.status(204).send();
});