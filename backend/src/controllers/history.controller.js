import { asyncHandler } from '../utils/asyncHandler.js';
import { Analysis } from '../models/Analysis.js';
import { inMemoryStore, getDatabaseStatus } from '../config/db.js';

export const getHistory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);

  const items = [];

  // Add in-memory items
  for (const a of inMemoryStore.analyses.values()) {
    items.push({
      id: a.id,
      originalFilename: a.originalFilename,
      atsScore: a.atsScore,
      targetRole: a.targetRole,
      skillsCount: (a.skills || []).length,
      topRole: a.roleRecommendations?.[0]?.roleTitle,
      createdAt: a.createdAt,
    });
  }

  // If DB connected, add DB items
  if (getDatabaseStatus() === 'connected') {
    try {
      const docs = await Analysis.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      docs.forEach((doc) => {
        if (!items.some((i) => i.id === doc._id.toString())) {
          items.push({
            id: doc._id.toString(),
            originalFilename: doc.originalFilename,
            atsScore: doc.atsScore,
            targetRole: doc.targetRole,
            skillsCount: (doc.skills || []).length,
            topRole: doc.roleRecommendations?.[0]?.roleTitle,
            createdAt: doc.createdAt,
          });
        }
      });
    } catch {
      // ignore
    }
  }

  // Sort descending by date
  items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const paginated = items.slice((page - 1) * limit, page * limit);

  return res.status(200).json({
    items: paginated,
    total: items.length,
    page,
    limit,
  });
});
