// ============================================
// ROUTES — cycles
// ============================================
import { Router } from 'express';
import * as controller from '../controllers/cycles.controller.js';

export const cyclesRouter: Router = Router();

cyclesRouter.get('/',    controller.getAll);
cyclesRouter.get('/:id', controller.getById);
cyclesRouter.post('/',   controller.create);
cyclesRouter.put('/:id', controller.update);
cyclesRouter.delete('/:id', controller.remove);