import app from './app.js';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';

async function bootstrap() {
  logger.info(`Starting ResumeIQ Backend Server in ${config.nodeEnv} mode...`);

  // Connect to DB (with automatic in-memory fallback)
  await connectDB();

  const server = app.listen(config.port, '0.0.0.0', () => {
    logger.info(`ResumeIQ Server is running on port ${config.port}`);
    logger.info(`Health check endpoint: http://localhost:${config.port}/api/health`);
  });

  // Graceful shutdown handling
  const handleExit = (signal) => {
    logger.info(`Received ${signal}. Gracefully closing HTTP server...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleExit('SIGTERM'));
  process.on('SIGINT', () => handleExit('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Fatal error during server startup', err);
  process.exit(1);
});
