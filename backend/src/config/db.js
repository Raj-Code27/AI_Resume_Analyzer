import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from '../utils/logger.js';

let isConnected = false;
let isInMemoryFallback = false;

// In-memory collections fallback when MongoDB instance is offline
export const inMemoryStore = {
  resumes: new Map(),
  analyses: new Map(),
  optimizations: new Map(),
};

export async function connectDB() {
  if (isConnected) return;

  try {
    mongoose.set('strictQuery', true);
    // Timeout quickly so the dev server starts instantaneously even without a local mongod daemon
    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    isConnected = true;
    isInMemoryFallback = false;
    logger.info('MongoDB connected successfully', { uri: config.mongodbUri.replace(/:[^:]*@/, ':****@') });
  } catch (error) {
    isConnected = false;
    isInMemoryFallback = true;
    logger.warn('MongoDB connection failed or unavailable. Falling back to persistent In-Memory Storage.', {
      error: error.message,
    });
  }
}

export function getDatabaseStatus() {
  if (isConnected) return 'connected';
  if (isInMemoryFallback) return 'in_memory_fallback';
  return 'disconnected';
}
