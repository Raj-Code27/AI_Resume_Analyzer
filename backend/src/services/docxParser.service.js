import mammoth from 'mammoth';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export async function parseDocx(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    if (!result || !result.value || result.value.trim().length === 0) {
      throw new Error('DOCX document contains no readable text');
    }
    return result.value.trim();
  } catch (error) {
    logger.warn('DOCX parsing error', { message: error.message });
    throw new ApiError(400, `Failed to parse DOCX document: ${error.message}`);
  }
}
