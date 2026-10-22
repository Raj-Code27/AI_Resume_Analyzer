import path from 'path';
import { parsePdf } from './pdfParser.service.js';
import { parseDocx } from './docxParser.service.js';
import { parseImageOcr } from './ocr.service.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export async function extractResumeText(file) {
  if (!file || !file.buffer) {
    throw new ApiError(400, 'No file buffer provided for extraction');
  }

  const filename = file.originalname || 'document';
  const ext = path.extname(filename).toLowerCase();
  const mime = file.mimetype || '';

  let extractedText = '';

  logger.info(`Extracting text from file: ${filename} (ext: ${ext}, mime: ${mime})`);

  if (ext === '.pdf' || mime === 'application/pdf') {
    try {
      extractedText = await parsePdf(file.buffer);
    } catch (pdfErr) {
      // If regular PDF parse found no text layer, try OCR fallback
      logger.info('PDF parser found no text stream, attempting OCR fallback...');
      extractedText = await parseImageOcr(file.buffer).catch(() => {
        throw pdfErr;
      });
    }
  } else if (
    ext === '.docx' ||
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    extractedText = await parseDocx(file.buffer);
  } else if (
    ['.png', '.jpg', '.jpeg'].includes(ext) ||
    ['image/png', 'image/jpeg', 'image/jpg'].includes(mime)
  ) {
    extractedText = await parseImageOcr(file.buffer);
  } else if (ext === '.txt' || mime === 'text/plain') {
    extractedText = file.buffer.toString('utf-8');
  } else {
    throw new ApiError(400, `Unsupported file format (${ext}). Supported formats: PDF, DOCX, PNG, JPG, JPEG.`);
  }

  // Sanitize extracted text
  extractedText = extractedText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // remove control chars
    .trim();

  if (extractedText.length < 50) {
    throw new ApiError(
      422,
      'Extracted text contains fewer than 50 characters. The document appears incomplete or unreadable.'
    );
  }

  return extractedText;
}
