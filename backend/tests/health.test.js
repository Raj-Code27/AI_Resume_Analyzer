import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API Health and Core Route Integration Tests', () => {
  it('GET /api/health should return 200 with status ok and database reporting', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.database).toBeDefined();
    expect(res.body.demoMode).toBeDefined();
  });

  it('GET /api/non-existent-route should return 404 JSON error structure', async () => {
    const res = await request(app).get('/api/some-invalid-endpoint');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Resource not found');
  });

  it('GET /api/history should return paginated scan list', async () => {
    const res = await request(app).get('/api/history');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(typeof res.body.total).toBe('number');
  });
});
