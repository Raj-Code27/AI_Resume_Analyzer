import { config } from './env.js';

export const aiConfig = {
  provider: config.aiProvider,
  apiKey: config.aiApiKey,
  model: config.aiModel,
  isConfigured: !!config.aiApiKey && config.aiProvider !== 'demo',
};
