import { test, expect, type APIRequestContext } from '@playwright/test';
import { readFileSync } from 'node:fs';
import {
  fabricatedTerms,
  forbiddenPresent,
  lengthProblems,
  missingFacts,
  missingKeywords,
  nonEmpty,
  structureProblems,
} from './lib/checks';
import { belowThreshold, judge, type Criterion } from './lib/judge';

type GoldenCase = {
  id: string;
  description: string;
  resume: string;
  vacancy: string;
  expectedFacts: string[];
  keywords: string[];
  forbidden: string[];
  rubricMin?: Partial<Record<Criterion, number>>;
};

const cases: GoldenCase[] = JSON.parse(
  readFileSync(new URL('./golden/cases.json', import.meta.url), 'utf-8'),
);

// Real-model tests: they call the model behind /api/refactor, cost money (or
// subscription limits) and are slightly non-deterministic. They run only in the
// "resume-ai" project (RESUME_AI=1), never in the regular CI run.

async function refactor(request: APIRequestContext, resume: string, vacancy: string): Promise<string> {
  const res = await request.post('/api/refactor', { data: { resume, vacancy }, timeout: 120_000 });
  expect(res.status(), await res.text()).toBe(200);
  return (await res.json()).result as string;
}

test.describe('golden set', () => {
  for (const c of cases) {
    test(`${c.id}: ${c.description}`, async ({ request }, testInfo) => {
      const output = await refactor(request, c.resume, c.vacancy);
      await testInfo.attach('output.md', { body: output, contentType: 'text/markdown' });

      expect.soft(nonEmpty(output), 'output is not empty').toEqual([]);
      expect.soft(missingFacts(output, c.expectedFacts), 'important facts preserved').toEqual([]);
      expect.soft(fabricatedTerms(output, c.resume), 'no skills or tools that are not in the original').toEqual([]);
      expect.soft(forbiddenPresent(output, c.forbidden), 'no forbidden content').toEqual([]);
      expect.soft(missingKeywords(output, c.keywords), 'relevant vacancy keywords used').toEqual([]);
      expect.soft(structureProblems(output), 'structure').toEqual([]);
      expect.soft(lengthProblems(output, c.resume), 'length').toEqual([]);

      const verdict = await judge({ resume: c.resume, vacancy: c.vacancy, output });
      await testInfo.attach('verdict.json', { body: JSON.stringify(verdict, null, 2), contentType: 'application/json' });
      expect.soft(belowThreshold(verdict, c.rubricMin), 'LLM judge rubric').toEqual([]);
    });
  }
});

test.describe('edge cases', () => {
  test('a vacancy unrelated to the profile does not make the model invent experience', async ({ request }, testInfo) => {
    const base = cases.find((c) => c.id === 'backend-good-match')!;
    const vacancy = 'Head Chef\n\nRequirements: 5 years in a professional kitchen, HACCP certification, menu design.';
    const output = await refactor(request, base.resume, vacancy);
    await testInfo.attach('output.md', { body: output, contentType: 'text/markdown' });

    expect.soft(missingFacts(output, base.expectedFacts), 'facts preserved').toEqual([]);
    expect.soft(forbiddenPresent(output, ['HACCP', 'chef', 'kitchen', 'menu design']), 'no culinary experience').toEqual([]);
    expect.soft(fabricatedTerms(output, base.resume), 'no invented tools').toEqual([]);
  });

  test('contradictory dates are not silently "fixed"', async ({ request }, testInfo) => {
    const resume =
      'Peter Novak\nBackend Developer\n\nExperience\nDeveloper, Alpha Corp (2022-2019)\n- Wrote Java services\n\nEducation\nBSc, Delta University (2012-2016)\n\nSkills\nJava';
    const output = await refactor(request, resume, 'Java Developer\nRequirements: Java.');
    await testInfo.attach('output.md', { body: output, contentType: 'text/markdown' });

    expect.soft(missingFacts(output, ['Alpha Corp', 'Delta University', '2012', '2016']), 'facts preserved').toEqual([]);
    expect.soft(fabricatedTerms(output, resume), 'no invented tools').toEqual([]);
  });

  test('a one-line resume stays short and gets no invented sections of experience', async ({ request }, testInfo) => {
    const resume = 'Tom Hall, QA tester, knows Jira and Postman.';
    const output = await refactor(request, resume, 'QA Engineer\nRequirements: Jira, Postman, Selenium.');
    await testInfo.attach('output.md', { body: output, contentType: 'text/markdown' });

    expect.soft(fabricatedTerms(output, resume), 'no Selenium or other invented tools').toEqual([]);
    expect.soft(forbiddenPresent(output, ['years of experience']), 'no invented seniority').toEqual([]);
    expect.soft(output.length, 'does not balloon').toBeLessThan(1500);
  });
});
