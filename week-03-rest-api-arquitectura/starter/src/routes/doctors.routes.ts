// ============================================
// ROUTES — doctors
// ============================================
import { Router } from 'express';
import * as controller from '../controllers/doctors.controller.js';

export const doctorsRouter: Router = Router();

doctorsRouter.get('/',    controller.getAll);
doctorsRouter.get('/:id', controller.getById);
doctorsRouter.post('/',   controller.create);
doctorsRouter.put('/:id', controller.update);
doctorsRouter.delete('/:id', controller.remove);