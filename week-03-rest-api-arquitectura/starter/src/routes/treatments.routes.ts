// ============================================
// ROUTES — treatments
// ============================================
import { Router } from 'express';
import * as controller from '../controllers/treatments.controller.js';

export const treatmentsRouter: Router = Router();

treatmentsRouter.get('/',    controller.getAll);
treatmentsRouter.get('/:id', controller.getById);
treatmentsRouter.post('/',   controller.create);
treatmentsRouter.put('/:id', controller.update);
treatmentsRouter.delete('/:id', controller.remove);