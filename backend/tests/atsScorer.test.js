import { describe, it, expect } from 'vitest';
import { calculateAtsScore } from '../src/services/atsScorer.service.js';

describe('ATS Scoring Engine Unit Tests', () => {
  it('should score a comprehensive resume within valid range 0-100', () => {
    const sampleText = `
      ALEX MORGAN - Senior Software Engineer
      alex@example.com - 555-0199 - github.com/alex

      EXPERIENCE
      Senior Full-Stack Developer at TechCorp (2021 - Present)
      • Designed and deployed scalable Node.js microservices reducing API latency by 45%.
      • Led React migration increasing user session duration by 20% for 200,000 active users.

      SKILLS
      JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, MongoDB, Docker, AWS, Git

      EDUCATION
      Bachelor of Science in Computer Science, State University, 2019

      PROJECTS
      CloudMetrics Dashboard: Built full-stack observability tool with React, Node.js, and Redis.
    `;

    const detectedSkills = [
      { name: 'JavaScript', category: 'languages', status: 'verified' },
      { name: 'TypeScript', category: 'languages', status: 'verified' },
      { name: 'React', category: 'frameworks', status: 'verified' },
      { name: 'Node.js', category: 'frameworks', status: 'verified' },
      { name: 'PostgreSQL', category: 'databases', status: 'verified' },
      { name: 'Docker', category: 'cloud_devops', status: 'verified' },
    ];

    const result = calculateAtsScore(sampleText, detectedSkills);

    expect(result).toBeDefined();
    expect(result.overallScore).toBeGreaterThanOrEqual(70);
    expect(result.overallScore).toBeLessThanOrEqual(100);
    expect(result.categories).toHaveLength(7);
  });

  it('should return low score for sparse/incomplete resume', () => {
    const sparseText = 'Bob Smith. Hello world. Looking for job.';
    const result = calculateAtsScore(sparseText, []);

    expect(result.overallScore).toBeLessThan(50);
  });

  it('should include explanations and evidence for each category', () => {
    const text = 'Jane Doe. Experience: Engineer at Acme. Skills: Python, SQL. Education: BS Math.';
    const skills = [
      { name: 'Python', category: 'languages', status: 'verified' },
      { name: 'SQL', category: 'languages', status: 'verified' },
    ];

    const result = calculateAtsScore(text, skills);

    result.categories.forEach((cat) => {
      expect(cat.name).toBeDefined();
      expect(cat.score).toBeGreaterThanOrEqual(0);
      expect(cat.maxScore).toBeGreaterThan(0);
      expect(cat.explanation).toBeTruthy();
      expect(Array.isArray(cat.evidence)).toBe(true);
    });
  });
});
