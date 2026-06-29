import { Router } from 'express';
import * as ctrl from '../controllers/patients.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getById);
router.post('/',    ctrl.create);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
