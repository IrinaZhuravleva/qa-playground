import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { judge, type Verdict } from './lib/judge';

// Tests of the judge itself. A judge that cannot tell a good rewrite from a bad one
// makes every score in ai.spec.ts meaningless, so it is fed known good and known bad
// rewrites of the same resume. Real model calls: runs in the "resume-ai" project only.

const base = (
  JSON.parse(readFileSync(new URL('./golden/cases.json', import.meta.url), 'utf-8')) as {
    id: string;
    resume: string;
    vacancy: string;
  }[]
).find((c) => c.id === 'backend-good-match')!;

const good = `# Anna Petrova
Backend Developer

## Experience
**Software Developer, Northwind Systems (2021-2024)**
- Built REST APIs in Java and Spring Boot for an order management system
- Wrote PostgreSQL queries and reduced report generation time
- Set up CI pipelines in Jenkins

**Junior Developer, Bluebird Labs (2019-2021)**
- Maintained internal tools in Java
- Fixed bugs and wrote JUnit tests

## Skills
Java, Spring Boot, PostgreSQL, Jenkins, JUnit, Git

## Education
BSc Computer Science, Lakeside University (2015-2019)`;

const fabricated = good
  .replace('Set up CI pipelines in Jenkins', 'Led a team of 10 engineers and deployed services with Docker and Kubernetes on AWS')
  .replace('Java, Spring Boot,', 'Java, Spring Boot, Docker, Kubernetes, AWS, Kafka,');

const alteredFacts = good
  .replace('Northwind Systems (2021-2024)', 'Northwind Systems (2018-2024)')
  .replace('Bluebird Labs', 'Redwood Software')
  .replace('Lakeside University', 'Stanford University');

const inflated = good
  .replace('Built REST APIs', 'Architected and owned the entire company-wide API platform')
  .replace('Fixed bugs', 'Led the engineering team and mentored all developers');

async function verdictFor(output: string, testInfo: { attach: (n: string, o: { body: string; contentType: string }) => Promise<void> }): Promise<Verdict> {
  const verdict = await judge({ resume: base.resume, vacancy: base.vacancy, output });
  await testInfo.attach('verdict.json', { body: JSON.stringify(verdict, null, 2), contentType: 'application/json' });
  return verdict;
}

test.describe('judge calibration', () => {
  test('a faithful rewrite scores high on facts and fabrication', async ({}, testInfo) => {
    const v = await verdictFor(good, testInfo);

    expect.soft(v.fact_preservation.score, v.fact_preservation.reason).toBeGreaterThanOrEqual(4);
    expect.soft(v.no_fabrication.score, v.no_fabrication.reason).toBeGreaterThanOrEqual(4);
  });

  test('invented skills and a made-up team lead score low on no_fabrication', async ({}, testInfo) => {
    const v = await verdictFor(fabricated, testInfo);

    expect(v.no_fabrication.score, v.no_fabrication.reason).toBeLessThanOrEqual(2);
  });

  test('changed dates, employer and university score low on fact_preservation', async ({}, testInfo) => {
    const v = await verdictFor(alteredFacts, testInfo);

    expect(v.fact_preservation.score, v.fact_preservation.reason).toBeLessThanOrEqual(2);
  });

  test('inflated responsibilities are penalised', async ({}, testInfo) => {
    const v = await verdictFor(inflated, testInfo);

    expect(v.no_fabrication.score, v.no_fabrication.reason).toBeLessThanOrEqual(3);
  });

  test('the faithful rewrite outscores every bad one on the criterion it violates', async ({}, testInfo) => {
    const [g, f, a] = await Promise.all([
      verdictFor(good, testInfo),
      verdictFor(fabricated, testInfo),
      verdictFor(alteredFacts, testInfo),
    ]);

    expect(g.no_fabrication.score).toBeGreaterThan(f.no_fabrication.score);
    expect(g.fact_preservation.score).toBeGreaterThan(a.fact_preservation.score);
  });
});
