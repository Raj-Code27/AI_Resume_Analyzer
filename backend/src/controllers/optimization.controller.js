import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Optimization } from '../models/Optimization.js';
import { inMemoryStore, getDatabaseStatus } from '../config/db.js';
import { generateAtsResumePdf } from '../services/resumeExporter.service.js';

export async function findOptimizationById(id) {
  if (inMemoryStore.optimizations.has(id)) {
    return inMemoryStore.optimizations.get(id);
  }

  if (getDatabaseStatus() === 'connected') {
    try {
      const doc = await Optimization.findById(id);
      if (doc) {
        return {
          id: doc._id.toString(),
          analysisId: doc.analysisId,
          originalScore: doc.originalScore,
          optimizedScore: doc.optimizedScore,
          originalContent: doc.originalContent,
          optimizedContent: doc.optimizedContent,
          changes: doc.changes,
          categoryDifferences: doc.categoryDifferences,
          improvementsSummary: doc.improvementsSummary,
        };
      }
    } catch {
      // not found
    }
  }

  return null;
}

export const updateOptimization = asyncHandler(async (req, res) => {
  const { optimizationId } = req.params;
  const { changes } = req.body;

  const opt = await findOptimizationById(optimizationId);
  if (!opt) {
    throw new ApiError(404, `Optimization record not found with ID: ${optimizationId}`);
  }

  if (Array.isArray(changes)) {
    opt.changes = changes;
    const acceptedCount = changes.filter((c) => c.status === 'accepted').length;
    const bonus = Math.round((acceptedCount / changes.length) * 14);
    opt.optimizedScore = Math.min(98, opt.originalScore + bonus);
  }

  if (inMemoryStore.optimizations.has(optimizationId)) {
    inMemoryStore.optimizations.set(optimizationId, opt);
  }

  if (getDatabaseStatus() === 'connected') {
    try {
      await Optimization.findByIdAndUpdate(optimizationId, {
        changes: opt.changes,
        optimizedScore: opt.optimizedScore,
      });
    } catch {
      // ignore
    }
  }

  return res.status(200).json(opt);
});

export const downloadOptimizedResume = asyncHandler(async (req, res) => {
  const { optimizationId } = req.params;
  const opt = await findOptimizationById(optimizationId);

  if (!opt) {
    throw new ApiError(404, `Optimization record not found with ID: ${optimizationId}`);
  }

  let finalContent = opt.optimizedContent || opt.originalContent;

  // Apply accepted changes to the content if available
  if (opt.changes && opt.changes.length > 0) {
    opt.changes.forEach((c) => {
      if (c.status === 'accepted' && c.original && c.revised) {
        finalContent = finalContent.replace(c.original, c.revised);
      }
    });
  }

  generateAtsResumePdf(finalContent, res, `ResumeIQ_Optimized_${optimizationId}.pdf`);
});
