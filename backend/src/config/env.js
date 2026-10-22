import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumeiq',
  aiProvider: process.env.AI_PROVIDER || 'demo',
  aiApiKey: process.env.AI_API_KEY || '',
  aiModel: process.env.AI_MODEL || 'gemini-1.5-flash',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB || '10', 10),
  fileRetentionPolicy: process.env.FILE_RETENTION_POLICY || 'memory',
  jwtSecret: process.env.JWT_SECRET || 'resumeiq-super-secret-dev-key-change-in-prod',
};
