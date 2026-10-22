import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'anonymous' },
    originalFilename: { type: String, required: true },
    fileType: { type: String, required: true },
    extractedText: { type: String, required: true },
    structuredData: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
