export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  explanation: string;
  evidence: string[];
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'cloud_devops' | 'ai_ml' | 'tools' | 'professional';
  status: 'verified' | 'unverified' | 'missing';
  evidenceCount?: number;
  context?: string;
}

export interface RoleRecommendation {
  roleTitle: string;
  suitabilityScore: number; // 0 - 100
  matchingSkills: string[];
  supportingEvidence: string[];
  missingSkills: string[];
  explanation: string;
  nextSteps: string[];
}

export interface KeywordAnalysis {
  foundKeywords: string[];
  missingKeywords: string[];
  jobDescriptionRequirements?: string[];
  weakBulletPoints: {
    original: string;
    reason: string;
    suggestion: string;
  }[];
  formattingIssues: string[];
  missingAchievements: string[];
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  originalFilename: string;
  fileType: string;
  targetRole?: string;
  jobDescriptionProvided: boolean;
  atsScore: number;
  scoreBreakdown: ScoreCategory[];
  strengths: string[];
  weaknesses: string[];
  skills: SkillItem[];
  roleRecommendations: RoleRecommendation[];
  keywordAnalysis: KeywordAnalysis;
  extractedText: string;
  isDemoMode?: boolean;
}

export interface OptimizationChange {
  section: string;
  type: 'bullet' | 'summary' | 'skill' | 'general';
  original: string;
  revised: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface OptimizationResult {
  id: string;
  analysisId: string;
  originalScore: number;
  optimizedScore: number;
  originalContent: string;
  optimizedContent: string;
  changes: OptimizationChange[];
  categoryDifferences: {
    category: string;
    original: number;
    optimized: number;
  }[];
  improvementsSummary: string[];
  createdAt: string;
}

export interface HistoryItem {
  id: string;
  createdAt: string;
  originalFilename: string;
  atsScore: number;
  targetRole?: string;
  skillsCount: number;
  topRole?: string;
}
