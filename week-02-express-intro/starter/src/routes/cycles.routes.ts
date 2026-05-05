import { Router } from 'express';
import type { Request, Response } from 'express';
import * as store from '../store.js';
import type { CreateCycleDto, UpdateCycleDto } from '../types.js';

export const cyclesRouter = Router();

// GET /api/v1/cycles — Listar todos los ciclos
cyclesRouter.get('/', (_req: Request, res: Response) => {
  const cycles = store.getAllCycles();
  res.status(200).json(cycles);
});

// GET /api/v1/cycles/:id — Obtener ciclo por ID
cyclesRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cycle = store.getCycleById(id);
  if (!cycle) {
    res.status(404).json({ error: `Cycle with id ${id} not found` });
    return;
  }
  res.status(200).json(cycle);
});

// POST /api/v1/cycles — Crear nuevo ciclo
cyclesRouter.post('/', (req: Request, res: Response) => {
  const dto: CreateCycleDto = req.body as CreateCycleDto;
  const created = store.createCycle(dto);
  res.status(201).json(created);
});

// PUT /api/v1/cycles/:id — Actualizar ciclo
cyclesRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const dto: UpdateCycleDto = req.body as UpdateCycleDto;
  const updated = store.updateCycle(id, dto);
  if (!updated) {
    res.status(404).json({ error: `Cycle with id ${id} not found` });
    return;
  }
  res.status(200).json(updated);
});

// DELETE /api/v1/cycles/:id — Eliminar ciclo
cyclesRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const removed = store.removeCycle(id);
  if (!removed) {
    res.status(404).json({ error: `Cycle with id ${id} not found` });
    return;
  }
  res.status(204).send();
});