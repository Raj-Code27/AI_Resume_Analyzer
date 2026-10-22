import { Router } from 'express';
import { analyzeResume } from '../controllers/resume.controller.js';
import { upload } from '../middleware/upload.middleware.js';
import { uploadLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/analyze', uploadLimiter, upload.single('resume'), analyzeResume);

export default router;
