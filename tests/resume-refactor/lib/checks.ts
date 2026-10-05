// Deterministic checks applied to a rewritten resume. Each returns the list of
// problems found, so an empty array means the check passed and a failure message
// can show exactly what went wrong.

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ');

// Terms a rewrite must not introduce unless the original resume already has them.
// Extend this list when a new golden case needs it.
export const TECH_VOCABULARY = [
  'Java', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'C#', 'Ruby', 'PHP', 'Kotlin', 'Swift',
  'React', 'Angular', 'Vue', 'Node.js', 'Spring Boot', 'Django', 'Flask', 'Playwright', 'Selenium',
  'Cypress', 'Jest', 'JUnit', 'pytest', 'Postman', 'Docker', 'Kubernetes', 'Terraform', 'Ansible',
  'Jenkins', 'GitHub Actions', 'GitLab CI', 'AWS', 'Azure', 'GCP', 'PostgreSQL', 'MySQL', 'MongoDB',
  'Redis', 'Kafka', 'RabbitMQ', 'SQL', 'GraphQL', 'Power BI', 'Tableau', 'Excel', 'Jira', 'Git',
];

function hasTerm(text: string, term: string, caseSensitive = false): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![\\p{L}\\p{N}+#])${escaped}(?![\\p{L}\\p{N}+#])`, caseSensitive ? 'u' : 'ui').test(text);
}

export function missingFacts(output: string, facts: string[]): string[] {
  const text = norm(output);
  return facts.filter((f) => !text.includes(norm(f)));
}

export function fabricatedTerms(output: string, resume: string, vocabulary = TECH_VOCABULARY): string[] {
  // Case-sensitive so ordinary words ("go", "excel", "swift") are not mistaken for tools.
  return vocabulary.filter((t) => hasTerm(output, t, true) && !hasTerm(resume, t, true));
}

export function forbiddenPresent(output: string, forbidden: string[]): string[] {
  const text = norm(output);
  return forbidden.filter((f) => text.includes(norm(f)));
}

export function missingKeywords(output: string, keywords: string[]): string[] {
  return keywords.filter((k) => !hasTerm(output, k));
}

export function structureProblems(output: string): string[] {
  const problems: string[] = [];
  if (/^(sure|certainly|here is|here's|of course)/i.test(output.trim())) {
    problems.push('starts with a conversational preamble');
  }
  // A section heading is a markdown heading, a bold-only line, or a short plain-text
  // title standing alone between blank lines (the model may keep the original layout).
  const lines = output.split('\n').map((l) => l.trim());
  const headings = lines.filter((l, i) => {
    if (/^#{1,3}\s+\S/.test(l) || /^\*\*[^*]+\*\*:?$/.test(l)) return true;
    const plainTitle = l.length >= 2 && l.length <= 30 && !/^[-*•#]|[:(),.]/.test(l);
    return plainTitle && i > 0 && lines[i - 1] === '' && !!lines[i + 1];
  });
  if (headings.length < 2) problems.push(`expected at least 2 section headings, found ${headings.length}`);
  return problems;
}

export function lengthProblems(output: string, resume: string): string[] {
  const ratio = output.length / resume.length;
  if (ratio < 0.4) return [`output is much shorter than the original (ratio ${ratio.toFixed(2)})`];
  if (ratio > 2.5) return [`output is much longer than the original (ratio ${ratio.toFixed(2)})`];
  return [];
}

export function nonEmpty(output: string): string[] {
  return output.trim().length > 0 ? [] : ['output is empty'];
}
