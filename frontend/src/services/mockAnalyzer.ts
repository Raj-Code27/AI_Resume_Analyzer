import { AnalysisResult, OptimizationResult, ScoreCategory, SkillItem, RoleRecommendation, KeywordAnalysis } from '../types';

export function runClientMockAnalysis(
  text: string,
  filename: string,
  targetRole?: string,
  jobDescription?: string
): AnalysisResult {
  const lower = text.toLowerCase();

  // 1. Detect Skills
  const skillCatalog: { name: string; category: SkillItem['category']; regex: RegExp }[] = [
    // Languages
    { name: 'JavaScript', category: 'languages', regex: /\bjavascript\b|\bjs\b/i },
    { name: 'TypeScript', category: 'languages', regex: /\btypescript\b|\bts\b/i },
    { name: 'Python', category: 'languages', regex: /\bpython\b/i },
    { name: 'Java', category: 'languages', regex: /\bjava\b(?!script)/i },
    { name: 'C++', category: 'languages', regex: /\bc\+\+\b/i },
    { name: 'SQL', category: 'languages', regex: /\bsql\b/i },
    { name: 'HTML5', category: 'languages', regex: /\bhtml5?\b/i },
    { name: 'CSS3', category: 'languages', regex: /\bcss3?\b/i },
    { name: 'Go', category: 'languages', regex: /\bgolang\b|\bgo\b/i },
    // Frameworks
    { name: 'React', category: 'frameworks', regex: /\breact(\.js)?\b/i },
    { name: 'Next.js', category: 'frameworks', regex: /\bnext(\.js)?\b/i },
    { name: 'Node.js', category: 'frameworks', regex: /\bnode(\.js)?\b/i },
    { name: 'Express.js', category: 'frameworks', regex: /\bexpress(\.js)?\b/i },
    { name: 'Vue.js', category: 'frameworks', regex: /\bvue(\.js)?\b/i },
    { name: 'FastAPI', category: 'frameworks', regex: /\bfastapi\b/i },
    { name: 'Tailwind CSS', category: 'frameworks', regex: /\btailwind(css)?\b/i },
    // Databases
    { name: 'PostgreSQL', category: 'databases', regex: /\bpostgres(ql)?\b/i },
    { name: 'MongoDB', category: 'databases', regex: /\bmongodb?\b/i },
    { name: 'Redis', category: 'databases', regex: /\bredis\b/i },
    // Cloud & DevOps
    { name: 'AWS', category: 'cloud_devops', regex: /\baws\b|\bamazon web services\b/i },
    { name: 'Docker', category: 'cloud_devops', regex: /\bdocker\b/i },
    { name: 'Kubernetes', category: 'cloud_devops', regex: /\bkubernetes\b|\bk8s\b/i },
    { name: 'CI/CD', category: 'cloud_devops', regex: /\bci\/cd\b|\bgithub actions\b/i },
    // AI/ML
    { name: 'PyTorch', category: 'ai_ml', regex: /\bpytorch\b/i },
    { name: 'TensorFlow', category: 'ai_ml', regex: /\btensorflow\b/i },
    { name: 'Hugging Face', category: 'ai_ml', regex: /\bhugging\s*face\b/i },
    { name: 'LangChain', category: 'ai_ml', regex: /\blangchain\b/i },
    // Tools
    { name: 'Git', category: 'tools', regex: /\bgit\b|\bgithub\b/i },
    { name: 'Jest', category: 'tools', regex: /\bjest\b|\bvitest\b/i },
    { name: 'Figma', category: 'tools', regex: /\bfigma\b/i },
    // Professional
    { name: 'Agile / Scrum', category: 'professional', regex: /\bagile\b|\bscrum\b|\bsprints\b/i },
    { name: 'Code Reviews', category: 'professional', regex: /\bcode reviews?\b/i },
    { name: 'Mentorship', category: 'professional', regex: /\bmentor(ed|ing)?\b/i },
  ];

  const detectedSkills: SkillItem[] = [];
  skillCatalog.forEach((s) => {
    const matches = (lower.match(s.regex) || []).length;
    if (matches > 0) {
      detectedSkills.push({
        name: s.name,
        category: s.category,
        status: matches >= 2 ? 'verified' : 'unverified',
        evidenceCount: matches,
      });
    }
  });

  // Target role missing skills if target specified
  if (targetRole) {
    const roleLower = targetRole.toLowerCase();
    if (roleLower.includes('cloud') || roleLower.includes('devops')) {
      if (!detectedSkills.some((s) => s.name === 'Kubernetes')) {
        detectedSkills.push({ name: 'Kubernetes', category: 'cloud_devops', status: 'missing' });
      }
    }
  }

  // 2. Score Breakdown across the 7 categories
  const hasNumbers = /\b\d+%|\$\d+|\b\d+\s*(ms|seconds|users|clients|stars|x)\b/i.test(text);
  const wordCount = text.trim().split(/\s+/).length;

  const skillsScore = Math.min(25, Math.max(12, Math.round((detectedSkills.length / 15) * 25)));
  const expScore = hasNumbers ? 18 : 12; // max 20
  const projScore = lower.includes('project') ? 14 : 9; // max 15
  const kwScore = Math.min(15, Math.max(8, Math.round(detectedSkills.length * 0.9))); // max 15
  const structScore = wordCount >= 180 && wordCount <= 900 ? 9 : 6; // max 10
  const eduScore = lower.includes('bachelor') || lower.includes('degree') || lower.includes('university') ? 10 : 7; // max 10
  const parseScore = 5; // max 5

  const totalScore = skillsScore + expScore + projScore + kwScore + structScore + eduScore + parseScore;

  const scoreBreakdown: ScoreCategory[] = [
    {
      name: 'Skills Relevance',
      score: skillsScore,
      maxScore: 25,
      weight: 25,
      explanation: `${detectedSkills.length} key technical & engineering skills detected in document text.`,
      evidence: detectedSkills.slice(0, 4).map((s) => `${s.name} (${s.status})`),
    },
    {
      name: 'Experience & Achievements',
      score: expScore,
      maxScore: 20,
      weight: 20,
      explanation: hasNumbers
        ? 'Resume includes strong quantified business metrics (percentages, latency, scale).'
        : 'Work experience lacks measurable numeric indicators of impact.',
      evidence: hasNumbers
        ? ['Quantified metrics identified (% improvement, user base)']
        : ['Suggest adding measurable metrics (e.g. reduced load time by 30%)'],
    },
    {
      name: 'Project Relevance',
      score: projScore,
      maxScore: 15,
      weight: 15,
      explanation: lower.includes('project')
        ? 'Dedicated projects section confirms applied practical technical proficiency.'
        : 'Projects section is either missing or lacks clear repository/architecture context.',
      evidence: lower.includes('project')
        ? ['Projects section present with stack details']
        : ['Add 2+ substantial technical projects'],
    },
    {
      name: 'Keywords & Terminology',
      score: kwScore,
      maxScore: 15,
      weight: 15,
      explanation: 'Core industry terminology is well-aligned with modern ATS database filters.',
      evidence: ['Standard role nomenclature', 'Recognized library and tooling tokens'],
    },
    {
      name: 'Structure & Readability',
      score: structScore,
      maxScore: 10,
      weight: 10,
      explanation: 'Single-column text hierarchy with standard headings aids linear ATS parsing.',
      evidence: ['Clear section headers (Experience, Education, Skills)'],
    },
    {
      name: 'Education & Certifications',
      score: eduScore,
      maxScore: 10,
      weight: 10,
      explanation: 'Academic credentials and/or industry certifications are properly stated.',
      evidence: ['Degree or certifications detected'],
    },
    {
      name: 'Parsing Compatibility',
      score: parseScore,
      maxScore: 5,
      weight: 5,
      explanation: 'Text extraction successful with valid character encoding and no corrupt binary streams.',
      evidence: ['Clean UTF-8 text extraction', 'No nested tables or complex multi-column wraps'],
    },
  ];

  // 3. Recommended Roles (5 to 10 roles)
  const roleRecommendations: RoleRecommendation[] = [
    {
      roleTitle: 'Full-Stack Developer',
      suitabilityScore: Math.min(94, Math.max(70, totalScore + 4)),
      matchingSkills: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL'],
      supportingEvidence: ['Demonstrated frontend and backend architecture in work experience'],
      missingSkills: ['GraphQL', 'Next.js SSR'],
      explanation: 'Strong end-to-end capabilities spanning modern client interfaces and server-side APIs.',
      nextSteps: [
        'Highlight full-stack production deployments and CI/CD pipelines',
        'Add quantitative user growth metrics to projects',
      ],
    },
    {
      roleTitle: 'Backend Engineer',
      suitabilityScore: Math.min(91, Math.max(68, totalScore + 2)),
      matchingSkills: ['Node.js', 'Express.js', 'SQL', 'PostgreSQL', 'Docker'],
      supportingEvidence: ['Database optimization, microservices, and API endpoint design'],
      missingSkills: ['System Design at Scale', 'gRPC / Kafka'],
      explanation: 'Solid backend fundamentals with database query tuning and server architecture.',
      nextSteps: [
        'Emphasize database schema design and caching layers',
        'Document API response time improvements and concurrency handling',
      ],
    },
    {
      roleTitle: 'Frontend Developer',
      suitabilityScore: Math.min(88, Math.max(65, totalScore)),
      matchingSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
      supportingEvidence: ['Component design, responsive UI development, and state management'],
      missingSkills: ['Automated End-to-End Testing (Cypress/Playwright)', 'Web Accessibility (a11y)'],
      explanation: 'Competent user interface construction with modern reactive frameworks.',
      nextSteps: [
        'Showcase Core Web Vitals optimizations and lighthouse audit scores',
        'Demonstrate component reusability and design system adherence',
      ],
    },
    {
      roleTitle: 'Software Development Engineer (SDE)',
      suitabilityScore: Math.min(89, Math.max(66, totalScore + 1)),
      matchingSkills: ['Data Structures', 'TypeScript', 'Python', 'Git', 'Unit Testing'],
      supportingEvidence: ['General problem solving and structured modular code'],
      missingSkills: ['Distributed Systems', 'Advanced Concurrency'],
      explanation: 'Well-rounded computer science foundations suitable for standard software engineering roles.',
      nextSteps: [
        'Highlight algorithm complexity optimizations in project descriptions',
      ],
    },
    {
      roleTitle: 'DevOps / Cloud Engineer',
      suitabilityScore: Math.min(82, Math.max(55, totalScore - 6)),
      matchingSkills: ['AWS', 'Docker', 'Linux', 'CI/CD'],
      supportingEvidence: ['Containerization and cloud environment familiarity'],
      missingSkills: ['Kubernetes Cluster Admin', 'Terraform / IaC', 'Prometheus / Grafana'],
      explanation: 'Good entry point into cloud infrastructure with Docker and AWS baseline experience.',
      nextSteps: [
        'Gain hands-on Kubernetes orchestration experience',
        'Build and publish automated CI/CD deployment pipelines on GitHub Actions',
      ],
    },
    {
      roleTitle: 'AI / Machine Learning Engineer',
      suitabilityScore: lower.includes('pytorch') || lower.includes('machine learning') ? 86 : 58,
      matchingSkills: ['Python', 'SQL', 'FastAPI'],
      supportingEvidence: ['Data manipulation and scripting capabilities'],
      missingSkills: ['PyTorch / TensorFlow Model Tuning', 'RAG / Vector Databases', 'MLOps'],
      explanation: 'Requires specialized model deployment and NLP/LLM engineering experience to reach senior level.',
      nextSteps: [
        'Build and document a Retrieval-Augmented Generation (RAG) project',
        'Deploy low-latency model inference endpoints with Docker',
      ],
    },
  ];

  // 4. Keyword Analysis
  const foundKeywords = detectedSkills.map((s) => s.name);
  const commonMissing = ['Microservices', 'Unit Testing', 'CI/CD Pipelines', 'OAuth2 / JWT', 'System Architecture']
    .filter((k) => !lower.includes(k.toLowerCase()));

  const weakBulletPoints = [
    {
      original: 'Worked on building features for web application using React.',
      reason: 'Lacks action verb, scope, and quantifiable business or engineering impact.',
      suggestion: 'Architected and deployed 4 high-traffic React features, accelerating page load speeds by 28% for 50,000+ monthly active users.',
    },
    {
      original: 'Responsible for database queries and bug fixes.',
      reason: 'Passive phrasing ("Responsible for") without indicating specific database or result.',
      suggestion: 'Optimized high-frequency PostgreSQL queries and indexed foreign keys, eliminating latency bottlenecks and reducing query time from 400ms to 95ms.',
    },
  ];

  return {
    id: 'demo_' + Date.now(),
    createdAt: new Date().toISOString(),
    originalFilename: filename,
    fileType: filename.split('.').pop() || 'pdf',
    targetRole: targetRole || 'Full-Stack Software Engineer',
    jobDescriptionProvided: !!jobDescription,
    atsScore: totalScore,
    scoreBreakdown,
    strengths: [
      'Strong technical breadth across frontend and backend technologies',
      'Clean document hierarchy with standard ATS-compliant headings',
      'Effective balance of modern JavaScript/TypeScript ecosystem tools',
    ],
    weaknesses: [
      'Several bullet points lack quantifiable business metrics or performance benchmarks',
      'Missing explicit mention of automated test coverage (unit/integration)',
      'Project descriptions can highlight architectural decisions and concurrency more prominently',
    ],
    skills: detectedSkills,
    roleRecommendations,
    keywordAnalysis: {
      foundKeywords,
      missingKeywords: commonMissing,
      weakBulletPoints,
      formattingIssues: [
        'Ensure contact details (email, phone, LinkedIn) are text-selectable and not inside image headers.',
      ],
      missingAchievements: [
        'Add percentage-based efficiency gains or latency reductions to work history',
        'State scale of data handled or number of concurrent users served',
      ],
    },
    extractedText: text,
    isDemoMode: true,
  };
}

export function generateMockOptimization(analysis: AnalysisResult): OptimizationResult {
  const changes = [
    {
      section: 'experience',
      type: 'bullet' as const,
      original: 'Worked on building features for web application using React.',
      revised: 'Architected and deployed 4 high-traffic React features, accelerating page load speeds by 28% for 50,000+ monthly active users.',
      reason: 'Replaces passive phrasing with powerful action verb ("Architected"), specifies scale, and includes verified performance metric.',
      status: 'pending' as const,
    },
    {
      section: 'experience',
      type: 'bullet' as const,
      original: 'Responsible for database queries and bug fixes.',
      revised: 'Optimized high-frequency PostgreSQL queries and indexed foreign keys, eliminating latency bottlenecks and reducing query time from 400ms to 95ms.',
      reason: 'Integrates ATS database keyword ("PostgreSQL") and quantifies system performance improvement.',
      status: 'pending' as const,
    },
    {
      section: 'summary',
      type: 'summary' as const,
      original: 'Software engineer looking for new opportunities in development.',
      revised: `Results-driven Software Engineer with extensive experience developing scalable distributed applications using modern TypeScript, React, and Node.js. Proven track record of improving system throughput and delivering robust RESTful microservices.`,
      reason: 'Transforms generic objective into keyword-rich professional summary targeting ATS algorithms.',
      status: 'pending' as const,
    },
  ];

  return {
    id: 'opt_' + Date.now(),
    analysisId: analysis.id,
    originalScore: analysis.atsScore,
    optimizedScore: Math.min(97, analysis.atsScore + 14),
    originalContent: analysis.extractedText,
    optimizedContent: analysis.extractedText,
    changes,
    categoryDifferences: [
      { category: 'Experience & Achievements', original: 14, optimized: 19 },
      { category: 'Keywords & Terminology', original: 11, optimized: 15 },
      { category: 'Skills Relevance', original: 20, optimized: 24 },
    ],
    improvementsSummary: [
      'Rewrote passive bullets into metric-driven accomplishment statements',
      'Added high-intent ATS keywords without inventing any unearned qualifications',
      'Strengthened professional summary with role-aligned technical terminology',
    ],
    createdAt: new Date().toISOString(),
  };
}
