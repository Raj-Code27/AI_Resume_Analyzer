import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { config } from './config/env.js';

import healthRoutes from './routes/health.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import analysisRoutes from './routes/analysis.routes.js';
import optimizationRoutes from './routes/optimization.routes.js';
import historyRoutes from './routes/history.routes.js';

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost dev servers and matching config
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Global rate limiting
app.use('/api', apiLimiter);

// Mount API routes
app.use('/api/health', healthRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/optimization', optimizationRoutes);
app.use('/api/history', historyRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;
