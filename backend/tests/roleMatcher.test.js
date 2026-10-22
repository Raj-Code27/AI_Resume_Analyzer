import { describe, it, expect } from 'vitest';
import { matchJobRoles } from '../src/services/roleMatcher.service.js';

describe('Job Role Matching Engine Unit Tests', () => {
  it('should rank Full-Stack or Backend highest for full-stack skill profile', () => {
    const resumeText = 'Experienced in React, Node.js, Express, PostgreSQL, and TypeScript building full-stack web applications.';
    const detectedSkills = [
      { name: 'React', category: 'frameworks', status: 'verified' },
      { name: 'Node.js', category: 'frameworks', status: 'verified' },
      { name: 'TypeScript', category: 'languages', status: 'verified' },
      { name: 'PostgreSQL', category: 'databases', status: 'verified' },
    ];

    const roles = matchJobRoles(resumeText, detectedSkills);

    expect(roles).toBeDefined();
    expect(roles.length).toBeGreaterThanOrEqual(4);
    expect(roles[0].suitabilityScore).toBeGreaterThanOrEqual(70);
    expect(['Full-Stack Developer', 'Backend Engineer']).toContain(roles[0].roleTitle);
  });

  it('should return matching skills, missing skills, and actionable next steps for every role', () => {
    const resumeText = 'Python programmer working on data science and machine learning models.';
    const detectedSkills = [
      { name: 'Python', category: 'languages', status: 'verified' },
      { name: 'SQL', category: 'languages', status: 'verified' },
    ];

    const roles = matchJobRoles(resumeText, detectedSkills);

    roles.forEach((r) => {
      expect(r.roleTitle).toBeTruthy();
      expect(r.suitabilityScore).toBeGreaterThanOrEqual(0);
      expect(r.suitabilityScore).toBeLessThanOrEqual(100);
      expect(Array.isArray(r.matchingSkills)).toBe(true);
      expect(Array.isArray(r.missingSkills)).toBe(true);
      expect(Array.isArray(r.nextSteps)).toBe(true);
      expect(r.nextSteps.length).toBeGreaterThan(0);
    });
  });
});
