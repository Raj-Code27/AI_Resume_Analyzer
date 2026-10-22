import Tesseract from 'tesseract.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export async function parseImageOcr(buffer) {
  try {
    logger.info('Starting OCR extraction on image buffer...');
    const result = await Tesseract.recognize(buffer, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text' && m.progress % 0.5 === 0) {
          logger.debug(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      },
    });

    const text = result?.data?.text?.trim();
    if (!text || text.length === 0) {
      throw new Error('OCR completed but no readable characters were detected');
    }
    return text;
  } catch (error) {
    logger.error('OCR processing error', error);
    throw new ApiError(400, `OCR extraction failed: ${error.message}`);
  }
}
