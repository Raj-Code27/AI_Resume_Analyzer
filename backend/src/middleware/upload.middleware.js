import multer from 'multer';
import path from 'path';
import { ApiError } from '../utils/ApiError.js';
import { config } from '../config/env.js';

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'text/plain',
];

const allowedExtensions = ['.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg', '.txt'];

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(mime)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file format (${ext || mime}). Supported formats: PDF, DOCX, PNG, JPG, JPEG.`
      ),
      false
    );
  }
}

export const upload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSizeMb * 1024 * 1024,
  },
  fileFilter,
});
