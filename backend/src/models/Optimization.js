import mongoose from 'mongoose';

const optimizationSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'anonymous' },
    analysisId: { type: String, required: true },
    originalScore: { type: Number, required: true },
    optimizedScore: { type: Number, required: true },
    originalContent: { type: String, required: true },
    optimizedContent: { type: String, required: true },
    changes: { type: Array, default: [] },
    categoryDifferences: { type: Array, default: [] },
    improvementsSummary: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Optimization = mongoose.models.Optimization || mongoose.model('Optimization', optimizationSchema);
