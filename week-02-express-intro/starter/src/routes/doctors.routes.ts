import { Router } from 'express';
import type { Request, Response } from 'express';
import * as store from '../store.js';
import type { CreateDoctorDto, UpdateDoctorDto } from '../types.js';

export const doctorsRouter = Router();

// GET /api/v1/doctors — Listar todos los doctores
doctorsRouter.get('/', (_req: Request, res: Response) => {
  const doctors = store.getAllDoctors();
  res.status(200).json(doctors);
});

// GET /api/v1/doctors/:id — Obtener doctor por ID
doctorsRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const doctor = store.getDoctorById(id);
  if (!doctor) {
    res.status(404).json({ error: `Doctor with id ${id} not found` });
    return;
  }
  res.status(200).json(doctor);
});

// POST /api/v1/doctors — Crear nuevo doctor
doctorsRouter.post('/', (req: Request, res: Response) => {
  const dto: CreateDoctorDto = req.body as CreateDoctorDto;
  const created = store.createDoctor(dto);
  res.status(201).json(created);
});

// PUT /api/v1/doctors/:id — Actualizar doctor
doctorsRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const dto: UpdateDoctorDto = req.body as UpdateDoctorDto;
  const updated = store.updateDoctor(id, dto);
  if (!updated) {
    res.status(404).json({ error: `Doctor with id ${id} not found` });
    return;
  }
  res.status(200).json(updated);
});

// DELETE /api/v1/doctors/:id — Eliminar doctor
doctorsRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const removed = store.removeDoctor(id);
  if (!removed) {
    res.status(404).json({ error: `Doctor with id ${id} not found` });
    return;
  }
  res.status(204).send();
});