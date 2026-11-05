// Renders Allure statistics as Mermaid charts (pie of the current run, bar/line
// trend over past runs). GitHub draws Mermaid natively in job summaries and
// markdown files, so no extra hosting is needed.
//
// Usage: node scripts/allure-charts.mjs [allure-report-dir] >> $GITHUB_STEP_SUMMARY
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'allure-report';
const read = (f) => {
  const p = join(dir, 'widgets', f);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
};

const summary = read('summary.json');
const trend = read('history-trend.json');
const out = ['## Allure statistics', ''];

if (summary) {
  const s = summary.statistic;
  const slices = Object.entries({ passed: s.passed, failed: s.failed, broken: s.broken, skipped: s.skipped })
    .filter(([, n]) => n > 0);
  out.push(
    `**${s.total} tests** — ${s.passed} passed, ${s.failed} failed, ${s.broken} broken, ${s.skipped} skipped`,
    '',
    '```mermaid',
    'pie showData title Current run',
    ...slices.map(([k, n]) => `    "${k}" : ${n}`),
    '```',
    '',
  );
}

if (trend && trend.length > 1) {
  // history-trend.json is newest-first; chart oldest -> newest.
  const runs = [...trend].reverse();
  const x = runs.map((r) => `"#${r.buildOrder}"`).join(', ');
  const series = (k) => runs.map((r) => r.data[k] ?? 0).join(', ');
  const max = Math.max(...runs.map((r) => r.data.total ?? 0), 1);
  out.push(
    '```mermaid',
    '---',
    'config:',
    '    themeVariables:',
    '        xyChart:',
    '            plotColorPalette: "#2da44e, #cf222e"',
    '---',
    'xychart-beta',
    `    title "Passed (green) vs failed (red) per run, last ${runs.length}"`,
    `    x-axis [${x}]`,
    `    y-axis "tests" 0 --> ${max}`,
    `    line [${series('passed')}]`,
    `    line [${runs.map((r) => (r.data.failed ?? 0) + (r.data.broken ?? 0)).join(', ')}]`,
    '```',
    '',
  );
}

process.stdout.write(out.join('\n') + '\n');
