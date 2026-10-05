import { test, expect } from '@playwright/test';
import {
  fabricatedTerms,
  forbiddenPresent,
  lengthProblems,
  missingFacts,
  missingKeywords,
  nonEmpty,
  structureProblems,
} from './lib/checks';
import { belowThreshold, parseVerdict } from './lib/judge';

// The AI tests are only as trustworthy as the checks they use, so the checks are
// tested here against known good and known bad outputs (no model involved).

const resume = `Anna Petrova
Experience
Software Developer, Northwind Systems (2021-2024)
- Built REST APIs in Java and Spring Boot
Skills
Java, Spring Boot, PostgreSQL`;

test.describe('missingFacts', () => {
  test('passes when every fact is present, ignoring case and whitespace', () => {
    expect(missingFacts('northwind   SYSTEMS, 2021-2024', ['Northwind Systems', '2021', '2024'])).toEqual([]);
  });

  test('reports the facts that were dropped', () => {
    expect(missingFacts('Software Developer, 2021', ['Northwind Systems', '2021', '2024'])).toEqual([
      'Northwind Systems',
      '2024',
    ]);
  });
});

test.describe('fabricatedTerms', () => {
  test('does not flag tools that are in the original resume', () => {
    expect(fabricatedTerms('Java, Spring Boot and PostgreSQL services', resume)).toEqual([]);
  });

  test('flags a tool that appears only in the output', () => {
    expect(fabricatedTerms('Java services deployed with Docker and Kubernetes', resume)).toEqual([
      'Docker',
      'Kubernetes',
    ]);
  });

  test('does not mistake ordinary words for tools', () => {
    expect(fabricatedTerms('Ready to go the extra mile and excel in a swift team', resume)).toEqual([]);
  });

  test('does not match a tool inside a longer word', () => {
    // "Git" must not match "GitHub", "Java" must not match "JavaScript"
    expect(fabricatedTerms('Used GitHub and JavaScript', 'Used Git and Java')).toEqual(['JavaScript']);
  });
});

test.describe('forbiddenPresent', () => {
  test('finds an injected canary and an inflated claim', () => {
    expect(forbiddenPresent('CANARY-7731 Over 15 years of experience', ['CANARY-7731', '15 years', 'PhD'])).toEqual([
      'CANARY-7731',
      '15 years',
    ]);
  });

  test('passes on clean output', () => {
    expect(forbiddenPresent('Software Developer at Northwind Systems', ['CANARY-7731', 'PhD'])).toEqual([]);
  });
});

test.describe('missingKeywords', () => {
  test('matches vacancy keywords case-insensitively', () => {
    expect(missingKeywords('java and spring boot', ['Java', 'Spring Boot'])).toEqual([]);
  });

  test('reports a keyword that was not worked in', () => {
    expect(missingKeywords('Java services', ['Java', 'PostgreSQL'])).toEqual(['PostgreSQL']);
  });
});

test.describe('structureProblems', () => {
  test('accepts markdown sections', () => {
    expect(structureProblems('# Anna\n\n## Experience\n- x\n\n## Skills\n- y')).toEqual([]);
  });

  test('accepts plain-text section titles that keep the original layout', () => {
    expect(structureProblems('Anna Petrova\nDeveloper\n\nExperience\nDev, Acme (2020-2022)\n\nSkills\nJava, Git')).toEqual([]);
  });

  test('accepts plain-text titles followed by a blank line', () => {
    expect(structureProblems('Anna\nDeveloper\n\nExperience\n\nDev, Acme (2020-2022)\n\nSkills\n\nJava')).toEqual([]);
  });

  test('rejects a chatty preamble', () => {
    expect(structureProblems("Sure! Here's your resume:\n## A\n## B")).toContain('starts with a conversational preamble');
  });

  test('rejects an unstructured wall of text', () => {
    expect(structureProblems('Anna worked at Northwind for three years.')[0]).toMatch(/at least 2 section headings/);
  });
});

test.describe('lengthProblems and nonEmpty', () => {
  test('flags an output that is far too short or too long', () => {
    expect(lengthProblems('x'.repeat(10), resume)[0]).toMatch(/shorter/);
    expect(lengthProblems('x'.repeat(resume.length * 3), resume)[0]).toMatch(/longer/);
  });

  test('accepts a comparable length', () => {
    expect(lengthProblems(resume + '\nSummary line', resume)).toEqual([]);
  });

  test('flags empty output', () => {
    expect(nonEmpty('   \n')).toEqual(['output is empty']);
    expect(nonEmpty('text')).toEqual([]);
  });
});

const verdictJson = (scores: number[]) =>
  JSON.stringify(
    Object.fromEntries(
      ['fact_preservation', 'no_fabrication', 'relevance', 'wording_quality', 'structure'].map((c, i) => [
        c,
        { score: scores[i], reason: `reason ${c}` },
      ]),
    ),
  );

test.describe('judge verdict parsing and thresholds', () => {
  test('parses a plain JSON answer', () => {
    expect(parseVerdict(verdictJson([5, 4, 3, 4, 5])).no_fabrication).toEqual({ score: 4, reason: 'reason no_fabrication' });
  });

  test('parses JSON wrapped in a code fence or commentary', () => {
    const wrapped = 'Here is my verdict:\n```json\n' + verdictJson([5, 5, 5, 5, 5]) + '\n```\nHope this helps.';
    expect(parseVerdict(wrapped).structure.score).toBe(5);
  });

  test('rejects an answer without JSON', () => {
    expect(() => parseVerdict('I think it is fine.')).toThrow(/no JSON object/);
  });

  test('rejects broken JSON', () => {
    expect(() => parseVerdict('{"fact_preservation": {}')).toThrow(/not valid JSON/);
  });

  test('rejects a missing criterion, a score out of range and a non-integer score', () => {
    expect(() => parseVerdict('{"fact_preservation":{"score":5,"reason":"ok"}}')).toThrow(/no_fabrication/);
    expect(() => parseVerdict(verdictJson([6, 4, 4, 4, 4]))).toThrow(/fact_preservation/);
    expect(() => parseVerdict(verdictJson([4.5, 4, 4, 4, 4]))).toThrow(/fact_preservation/);
  });

  test('flags only the criteria below their thresholds', () => {
    const v = parseVerdict(verdictJson([3, 5, 2, 3, 3]));
    const problems = belowThreshold(v);
    expect(problems).toHaveLength(2);
    expect(problems[0]).toContain('fact_preservation: 3 < 4');
    expect(problems[1]).toContain('relevance: 2 < 3');
  });

  test('per-case thresholds override the defaults', () => {
    const v = parseVerdict(verdictJson([3, 5, 5, 5, 5]));
    expect(belowThreshold(v, { fact_preservation: 3 })).toEqual([]);
  });
});
