import { test, expect } from '@playwright/test';

// Contract tests for POST /api/refactor. They do not depend on model output, so
// they only check validation and error handling.

test.describe('POST /api/refactor validation', () => {
  test('rejects a missing resume', async ({ request }) => {
    const res = await request.post('/api/refactor', { data: { resume: '', vacancy: 'Backend Engineer' } });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: 'Resume is required' });
  });

  test('rejects a missing vacancy', async ({ request }) => {
    const res = await request.post('/api/refactor', { data: { resume: 'Anna', vacancy: '   ' } });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: 'Vacancy is required' });
  });

  test('rejects fields of the wrong type', async ({ request }) => {
    const res = await request.post('/api/refactor', { data: { resume: 42, vacancy: ['x'] } });
    expect(res.status()).toBe(400);
  });

  test('rejects a body that is not JSON', async ({ request }) => {
    const res = await request.post('/api/refactor', {
      headers: { 'content-type': 'application/json' },
      data: Buffer.from('{not json'),
    });
    expect(res.status()).toBe(400);
    expect(await res.json()).toEqual({ error: 'Request body must be valid JSON' });
  });

  test('rejects an input over the length limit', async ({ request }) => {
    const res = await request.post('/api/refactor', { data: { resume: 'a'.repeat(20_001), vacancy: 'Engineer' } });
    expect(res.status()).toBe(413);
  });

  test('returns 404 for an unknown route', async ({ request }) => {
    const res = await request.get('/api/nope');
    expect(res.status()).toBe(404);
  });
});
