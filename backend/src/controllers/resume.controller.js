import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { extractResumeText } from '../services/resumeParser.service.js';
import { analyzeResumeText } from '../services/resumeAnalyzer.service.js';
import { Resume } from '../models/Resume.js';
import { Analysis } from '../models/Analysis.js';
import { inMemoryStore, getDatabaseStatus } from '../config/db.js';
import { logger } from '../utils/logger.js';

export const analyzeResume = asyncHandler(async (req, res) => {
  if (!req.file && (!req.body.resumeText || req.body.resumeText.trim().length === 0)) {
    throw new ApiError(400, 'Please upload a resume file (PDF, DOCX, PNG, JPG) or provide resume text.');
  }

  const filename = req.file?.originalname || req.body.filename || 'resume_document.txt';
  const targetRole = req.body.targetRole?.trim() || '';
  const jobDescription = req.body.jobDescription?.trim() || '';

  // 1. Extract text
  let extractedText = '';
  if (req.file) {
    extractedText = await extractResumeText(req.file);
  } else {
    extractedText = req.body.resumeText.trim();
  }

  logger.info(`Extracted ${extractedText.length} characters from ${filename}`);

  // 2. Perform comprehensive analysis
  const analysisOutput = await analyzeResumeText(extractedText, targetRole, jobDescription);

  // 3. Persist record (MongoDB or In-Memory fallback)
  const analysisId = 'an_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  const fileType = filename.split('.').pop()?.toLowerCase() || 'txt';

  const recordData = {
    id: analysisId,
    resumeId: 'res_' + Date.now(),
    originalFilename: filename,
    fileType,
    targetRole: targetRole || undefined,
    jobDescriptionProvided: !!jobDescription,
    createdAt: new Date().toISOString(),
    ...analysisOutput,
  };

  const dbStatus = getDatabaseStatus();
  if (dbStatus === 'connected') {
    try {
      const savedResume = await Resume.create({
        originalFilename: filename,
        fileType,
        extractedText,
      });

      const savedAnalysis = await Analysis.create({
        resumeId: savedResume._id.toString(),
        originalFilename: filename,
        fileType,
        jobDescription,
        targetRole,
        atsScore: analysisOutput.atsScore,
        scoreBreakdown: analysisOutput.scoreBreakdown,
        strengths: analysisOutput.strengths,
        weaknesses: analysisOutput.weaknesses,
        skills: analysisOutput.skills,
        roleRecommendations: analysisOutput.roleRecommendations,
        keywordAnalysis: analysisOutput.keywordAnalysis,
        extractedText,
        isDemoMode: analysisOutput.isDemoMode,
      });

      recordData.id = savedAnalysis._id.toString();
    } catch (dbErr) {
      logger.warn('Failed to persist to MongoDB, storing in-memory fallback:', dbErr.message);
      inMemoryStore.analyses.set(analysisId, recordData);
    }
  } else {
    inMemoryStore.analyses.set(analysisId, recordData);
  }

  return res.status(200).json(recordData);
});
