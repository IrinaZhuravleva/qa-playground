import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { engines } from './engines.mjs';

const dir = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const engineName = process.env.ENGINE ?? 'mock';
const engine = engines[engineName];
if (!engine) throw new Error(`Unknown ENGINE "${engineName}". Use: ${Object.keys(engines).join(', ')}`);

const MAX_INPUT = 20_000;

function send(res, status, body, type = 'application/json') {
  res.writeHead(status, { 'content-type': type });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 200_000) reject(new Error('Body too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

createServer(async (req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    return send(res, 200, await readFile(join(dir, 'index.html')), 'text/html; charset=utf-8');
  }
  if (req.method === 'GET' && req.url === '/api/health') {
    return send(res, 200, { ok: true, engine: engineName });
  }
  if (req.method === 'POST' && req.url === '/api/refactor') {
    let payload;
    try {
      payload = JSON.parse(await readBody(req));
    } catch {
      return send(res, 400, { error: 'Request body must be valid JSON' });
    }
    const resume = typeof payload.resume === 'string' ? payload.resume.trim() : '';
    const vacancy = typeof payload.vacancy === 'string' ? payload.vacancy.trim() : '';
    if (!resume) return send(res, 400, { error: 'Resume is required' });
    if (!vacancy) return send(res, 400, { error: 'Vacancy is required' });
    if (resume.length > MAX_INPUT || vacancy.length > MAX_INPUT) {
      return send(res, 413, { error: `Each field must be at most ${MAX_INPUT} characters` });
    }
    try {
      return send(res, 200, { result: await engine({ resume, vacancy }), engine: engineName });
    } catch (e) {
      return send(res, 502, { error: `Model call failed: ${e.message}` });
    }
  }
  send(res, 404, { error: 'Not found' });
}).listen(port, () => console.log(`resume-refactor on http://localhost:${port} (engine: ${engineName})`));
