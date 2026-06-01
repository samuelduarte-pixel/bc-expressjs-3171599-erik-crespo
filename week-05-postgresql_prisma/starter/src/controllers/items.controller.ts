import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { createItemSchema, updateItemSchema } from '../schemas/items.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = Math.max(1, parseInt(String(req.query['page']  ?? '1'),  10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(String(req.query['limit'] ?? '10'), 10) || 10));
    const result = await service.listItems(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] ?? '', 10);
    const patient = await service.getItem(id);
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createItemSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? 'Datos inválidos';
      res.status(400).json({ status: 'error', message });
      return;
    }
    const patient = await service.createItem(parsed.data);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] ?? '', 10);
    const parsed = updateItemSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? 'Datos inválidos';
      res.status(400).json({ status: 'error', message });
      return;
    }
    const patient = await service.updateItem(id, parsed.data);
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] ?? '', 10);
    await service.deleteItem(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}