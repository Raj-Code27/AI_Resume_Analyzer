import pdfParse from 'pdf-parse';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export async function parsePdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    if (!data || !data.text || data.text.trim().length === 0) {
      throw new Error('PDF contains no extractable text layer (may be scanned or empty)');
    }
    return data.text.trim();
  } catch (error) {
    logger.warn('PDF parsing error', { message: error.message });
    throw new ApiError(400, `Failed to parse PDF document: ${error.message}`);
  }
}
