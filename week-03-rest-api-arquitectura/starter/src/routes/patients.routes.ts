// ============================================
// ROUTES — patients
// ============================================
import { Router } from 'express';
import * as controller from '../controllers/patients.controller.js';

export const patientsRouter: Router = Router();

patientsRouter.get('/',    controller.getAll);
patientsRouter.get('/:id', controller.getById);
patientsRouter.post('/',   controller.create);
patientsRouter.put('/:id', controller.update);
patientsRouter.delete('/:id', controller.remove);