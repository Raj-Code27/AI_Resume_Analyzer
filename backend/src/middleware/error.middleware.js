import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { config } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    statusCode: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors,
    ...(config.nodeEnv === 'development' ? { stack: error.stack } : {}),
  };

  logger.error(`[${req.method}] ${req.url} - Error: ${error.message}`);

  return res.status(error.statusCode).json(response);
}
