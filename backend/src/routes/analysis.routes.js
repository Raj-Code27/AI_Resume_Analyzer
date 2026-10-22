import { Router } from 'express';
import {
  getAnalysis,
  getRecommendedRoles,
  optimizeResume,
  getComparison,
} from '../controllers/analysis.controller.js';

const router = Router();

router.get('/:analysisId', getAnalysis);
router.get('/:analysisId/roles', getRecommendedRoles);
router.post('/:analysisId/optimize', optimizeResume);
router.get('/:analysisId/comparison', getComparison);

export default router;
