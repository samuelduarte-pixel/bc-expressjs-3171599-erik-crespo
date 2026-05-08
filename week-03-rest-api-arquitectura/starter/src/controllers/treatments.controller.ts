// ============================================
// CONTROLLER — treatments
// ============================================
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/treatments.service.js';
import { CreateTreatmentDto, UpdateTreatmentDto, ErrorResponse } from '../types.js';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = parseInt(String(req.query['page']  ?? '1'),  10);
    const limit = parseInt(String(req.query['limit'] ?? '10'), 10);
    res.json(await service.findAll({ page, limit }));
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id   = parseInt(String(req.params['id'] ?? ''), 10);
    const item = await service.findById(id);
    if (!item) {
      const r: ErrorResponse = { error: 'Not Found', message: `Treatment ${id} not found` };
      res.status(404).json(r);
      return;
    }
    res.json({ data: item });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateTreatmentDto;
    res.status(201).json({ data: await service.create(dto) });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id      = parseInt(String(req.params['id'] ?? ''), 10);
    const updated = await service.update(id, req.body as UpdateTreatmentDto);
    if (!updated) {
      const r: ErrorResponse = { error: 'Not Found', message: `Treatment ${id} not found` };
      res.status(404).json(r);
      return;
    }
    res.json({ data: updated });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id      = parseInt(String(req.params['id'] ?? ''), 10);
    const deleted = await service.remove(id);
    if (!deleted) {
      const r: ErrorResponse = { error: 'Not Found', message: `Treatment ${id} not found` };
      res.status(404).json(r);
      return;
    }
    res.status(204).send();
  } catch (err) { next(err); }
}