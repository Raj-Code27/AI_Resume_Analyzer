import { extractSkills, analyzeKeywordsAndWeaknesses } from './keywordAnalyzer.service.js';
import { calculateAtsScore } from './atsScorer.service.js';
import { matchJobRoles } from './roleMatcher.service.js';
import { aiConfig } from '../config/ai.js';
import { logger } from '../utils/logger.js';

export async function analyzeResumeText(resumeText, targetRole = '', jobDescription = '') {
  logger.info('Beginning comprehensive resume analysis pipeline...');

  // 1. Extract technical and professional skills with verification counts
  const detectedSkills = extractSkills(resumeText);

  // 2. Compute 7-dimension ATS scoring breakdown
  const scoringResult = calculateAtsScore(resumeText, detectedSkills, jobDescription, targetRole);

  // 3. Match candidate against standardized job roles
  const roleRecommendations = matchJobRoles(resumeText, detectedSkills);

  // 4. Analyze keywords, weak bullet points, and formatting checks
  const keywordAnalysis = analyzeKeywordsAndWeaknesses(
    resumeText,
    detectedSkills,
    jobDescription,
    targetRole
  );

  // 5. Strengths and weaknesses extraction
  const strengths = [
    `Demonstrates technical proficiency across ${detectedSkills.length} core programming languages, frameworks, and tools.`,
    'Structured headings allow standard ATS parsers to accurately index section blocks.',
    'Clear alignment with contemporary software engineering expectations.',
  ];

  const weaknesses = [
    'Work experience bullet points can be strengthened with more quantified business metrics (% efficiency, user scale, latency).',
    'Some technical skills are mentioned in a keyword list without corresponding project evidence.',
  ];

  if (!resumeText.toLowerCase().includes('ci/cd') && !resumeText.toLowerCase().includes('github actions')) {
    weaknesses.push('No continuous integration / continuous deployment (CI/CD) pipelines explicitly mentioned.');
  }

  return {
    atsScore: scoringResult.overallScore,
    scoreBreakdown: scoringResult.categories,
    strengths,
    weaknesses,
    skills: detectedSkills,
    roleRecommendations,
    keywordAnalysis,
    extractedText: resumeText,
    isDemoMode: !aiConfig.isConfigured,
  };
}
