import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'anonymous' },
    resumeId: { type: String, required: true },
    originalFilename: { type: String, required: true },
    fileType: { type: String, required: true },
    jobDescription: { type: String },
    targetRole: { type: String },
    atsScore: { type: Number, required: true },
    scoreBreakdown: { type: Array, default: [] },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    skills: { type: Array, default: [] },
    roleRecommendations: { type: Array, default: [] },
    keywordAnalysis: { type: mongoose.Schema.Types.Mixed, default: {} },
    extractedText: { type: String, default: '' },
    isDemoMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
