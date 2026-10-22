import { Router } from 'express';
import { getDatabaseStatus } from '../config/db.js';
import { aiConfig } from '../config/ai.js';

const router = Router();

router.get('/', (req, res) => {
  const dbStatus = getDatabaseStatus();

  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    aiProvider: aiConfig.provider,
    demoMode: !aiConfig.isConfigured,
  });
});

export default router;
