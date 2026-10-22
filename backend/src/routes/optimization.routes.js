import { Router } from 'express';
import {
  updateOptimization,
  downloadOptimizedResume,
} from '../controllers/optimization.controller.js';

const router = Router();

router.patch('/:optimizationId', updateOptimization);
router.get('/:optimizationId/download', downloadOptimizedResume);

export default router;
