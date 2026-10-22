/**
 * ResumeIQ Role Matching Engine
 * Compares candidate skills, project context, and keywords against standardized tech archetypes.
 */

export const ROLE_PROFILES = [
  {
    roleTitle: 'Full-Stack Developer',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL'],
    preferredSkills: ['Next.js', 'PostgreSQL', 'MongoDB', 'Docker', 'REST APIs', 'Tailwind CSS'],
    baseSuitability: 60,
    explanation: 'Combines dynamic user interface engineering with scalable backend API services and database persistence.',
    nextSteps: [
      'Document end-to-end full-stack architectures in projects',
      'Demonstrate responsive frontend performance and server-side cache tuning',
    ],
  },
  {
    roleTitle: 'Backend Engineer',
    requiredSkills: ['Node.js', 'Express.js', 'SQL', 'PostgreSQL', 'REST APIs'],
    preferredSkills: ['Redis', 'MongoDB', 'Docker', 'Microservices', 'GraphQL', 'AWS'],
    baseSuitability: 60,
    explanation: 'Specializes in server-side logic, data modeling, API contract design, and high-concurrency throughput.',
    nextSteps: [
      'Highlight database indexing, query optimization, and latency benchmarks',
      'Emphasize distributed systems and messaging queues (e.g. Redis, Kafka)',
    ],
  },
  {
    roleTitle: 'Frontend Developer',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3'],
    preferredSkills: ['Next.js', 'Vue.js', 'Tailwind CSS', 'Redux', 'Jest', 'Figma'],
    baseSuitability: 60,
    explanation: 'Focuses on responsive user experiences, design system implementation, performance, and accessibility.',
    nextSteps: [
      'Showcase Google Lighthouse performance scores and Web Vitals metrics',
      'Detail web accessibility (WCAG AA compliance) and reusable component design',
    ],
  },
  {
    roleTitle: 'Software Development Engineer (SDE)',
    requiredSkills: ['Data Structures', 'Git', 'TypeScript', 'Python', 'Unit Testing'],
    preferredSkills: ['Algorithms', 'CI/CD', 'Docker', 'Linux', 'System Design'],
    baseSuitability: 55,
    explanation: 'Core computer science foundations focused on algorithmic efficiency, clean patterns, and maintainable software.',
    nextSteps: [
      'Highlight algorithmic complexity and performance trade-offs in projects',
      'Demonstrate strict automated test suites (unit and integration tests)',
    ],
  },
  {
    roleTitle: 'DevOps / Cloud Engineer',
    requiredSkills: ['Docker', 'AWS', 'Linux', 'CI/CD'],
    preferredSkills: ['Kubernetes', 'Terraform', 'Prometheus', 'Bash', 'GitHub Actions'],
    baseSuitability: 45,
    explanation: 'Builds and maintains reliable infrastructure, automated continuous deployment pipelines, and cloud systems.',
    nextSteps: [
      'Deploy applications with Infrastructure as Code (Terraform) and Kubernetes',
      'Build resilient CI/CD release workflows with automated zero-downtime rollouts',
    ],
  },
  {
    roleTitle: 'AI / Machine Learning Engineer',
    requiredSkills: ['Python', 'SQL', 'Machine Learning'],
    preferredSkills: ['PyTorch', 'TensorFlow', 'FastAPI', 'LangChain', 'Hugging Face', 'Docker'],
    baseSuitability: 40,
    explanation: 'Designs, trains, fine-tunes, and deploys intelligent models and retrieval-augmented pipelines.',
    nextSteps: [
      'Document end-to-end model evaluation, precision/recall benchmarks, and latency',
      'Implement a production RAG pipeline with vector databases',
    ],
  },
  {
    roleTitle: 'Data Analyst / Data Engineer',
    requiredSkills: ['SQL', 'Python', 'Data Analysis'],
    preferredSkills: ['PostgreSQL', 'Pandas', 'Tableau', 'Spark', 'Kafka'],
    baseSuitability: 45,
    explanation: 'Transforms raw transaction streams into actionable analytical dashboards and scalable pipelines.',
    nextSteps: [
      'Demonstrate complex multi-table SQL joins and automated ETL jobs',
      'Present business-driven insights that drove revenue or operational efficiencies',
    ],
  },
  {
    roleTitle: 'QA Automation Engineer',
    requiredSkills: ['JavaScript', 'Python', 'Unit Testing'],
    preferredSkills: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'CI/CD'],
    baseSuitability: 45,
    explanation: 'Develops robust automated test suites, regression test runs, and quality assurance frameworks.',
    nextSteps: [
      'Document high test-coverage percentages achieved in previous systems',
      'Demonstrate end-to-end automated UI and API testing in continuous delivery',
    ],
  },
];

export function matchJobRoles(resumeText, detectedSkills = []) {
  const lower = resumeText.toLowerCase();
  const detectedSkillNames = detectedSkills.map((s) => s.name.toLowerCase());

  const recommendations = ROLE_PROFILES.map((profile) => {
    let score = profile.baseSuitability;
    const matchingSkills = [];
    const missingSkills = [];

    // Check required skills
    profile.requiredSkills.forEach((skill) => {
      const sLower = skill.toLowerCase();
      if (detectedSkillNames.includes(sLower) || lower.includes(sLower)) {
        score += 8;
        matchingSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    // Check preferred skills
    profile.preferredSkills.forEach((skill) => {
      const sLower = skill.toLowerCase();
      if (detectedSkillNames.includes(sLower) || lower.includes(sLower)) {
        score += 4;
        if (!matchingSkills.includes(skill)) matchingSkills.push(skill);
      } else {
        if (!missingSkills.includes(skill) && missingSkills.length < 3) {
          missingSkills.push(skill);
        }
      }
    });

    // Bounded between 35 and 96
    const finalScore = Math.min(96, Math.max(35, score));

    return {
      roleTitle: profile.roleTitle,
      suitabilityScore: finalScore,
      matchingSkills,
      supportingEvidence: [
        `${matchingSkills.length} matching core skills demonstrated in resume`,
        profile.explanation,
      ],
      missingSkills,
      explanation: profile.explanation,
      nextSteps: profile.nextSteps,
    };
  });

  // Sort descending by suitability score
  recommendations.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  // Return the top 6 most suitable roles
  return recommendations.slice(0, 6);
}
