# Resume Refactor: AI evaluation test plan

Practice material for testing an AI feature. The user pastes a resume and a job
description, a real model rewrites the resume for that job, and automated tests
check the result the way LLM applications are usually evaluated.

All resumes and vacancies in this suite are fictional.

## Coverage

Every item of the evaluation checklist is covered. Checks are either
deterministic (cheap, stable) or scored by an LLM judge.

| Checklist item | How it is tested | Type |
|---|---|---|
| Stability (same CV, N runs) | Run the same input 3-5 times. Compare the set of facts (dates, companies, titles) and the spread of judge scores | deterministic + judge |
| Important information is preserved | Facts are extracted from the reference CV in advance. Every fact must appear in the output (regex / substring) | deterministic |
| No invented experience or skills | Skills and companies in the output must be a subset of the input. Trap case: the vacancy requires something the candidate lacks, and the model must not attribute it to them | deterministic + judge |
| Match to the vacancy requirements | Vacancy keywords the candidate really has appear in the text. Judge scores relevance against a rubric | deterministic + judge |
| Experience is reworded correctly | Judge compares before and after: meaning kept, wording stronger, no inflation (e.g. "participated" must not become "led") | judge |
| Different formats and structures | Inputs: bullet list, plain prose, table, Russian and English, no sections. The output must stay meaningful and structured | deterministic + judge |
| Match to expected result / criteria | Rubric with a threshold (see LLM-as-judge) | judge |
| Different prompts and inputs | System prompt variants and parameters. Inputs: empty, very long, prompt injection ("ignore your instructions") | deterministic |
| Comparing runs | The report has a table of runs: judge scores and fact differences. Across models or prompts if added later | report |
| Edge cases and hallucinations | Empty resume, no experience, vacancy unrelated to the profile, contradictory dates, text in another language | mixed |

## Golden set

A folder of JSON cases. Each case has:

- `resume`: the input resume
- `vacancy`: the input job description
- `expected_facts`: what must survive the rewrite
- `forbidden`: what must not appear (e.g. a specific invented technology)
- `rubric_min`: minimum judge scores

Start with 5-8 fictional cases.

## LLM-as-judge

- Rubric of 4-5 criteria, scale 1-5: fact preservation, no fabrication,
  relevance to the vacancy, quality of wording, structure.
- The judge returns strict JSON with a score and a justification per criterion.
- Pass threshold, for example, 4 out of 5.
- The judge should run on a different or stronger model than the one doing the
  rewrite, otherwise it overrates its own answers.
- The judge is non-deterministic too, so the judge itself is tested on known bad
  outputs: a resume with an invented fact must receive a low score.

## Architecture

- `targets/ui-elements-practice/resume.html`: a page with two fields (resume,
  vacancy), a Refactor button and a result area. It is also embedded as an
  iframe on the practice site main page (`#resume-iframe`). Without a model
  server (static host) it falls back to an in-browser mock ("Demo mode").
- A small local Node server calls the model. The API key stays in the server
  environment and never reaches the browser or the public repository.
- The server has a switchable engine: Claude API with `ANTHROPIC_API_KEY`, or
  `claude -p` (Claude Code in non-interactive mode, uses the subscription,
  local use only).
- Fast UI tests (fields, button, loading state, API error) run against a mocked
  response and do not call a model.

## Cost and CI

- Claude API usage is billed separately from a claude.ai / Claude Code
  subscription. A key from console.anthropic.com and prepaid credits are needed.
- A cheap model such as `claude-haiku-4-5-20251001` is enough for the rewrite.
  One run of the suite costs cents, but the judge and the repeated runs for
  stability multiply the number of calls.
- Real-model checks live in a separate Playwright project, run manually and
  nightly. Regular CI and PRs use mocks only.
- A nightly real-model job needs an `ANTHROPIC_API_KEY` secret in GitHub and a
  spending limit. Until then, run locally with `claude -p`.

## Stages

1. App, mocks, UI tests, golden set and deterministic checks (facts,
   fabrication, injection, edge cases).
2. Judge with the rubric, plus tests of the judge itself.
3. Stability runs and run comparison, with a report in Allure.

## Status and how to run

Stages 1 and 2 are implemented.

- `targets/ui-elements-practice/resume.html`: the page, served by the local server
  together with the other practice pages.
- `targets/resume-refactor`: the server (`server.mjs`) and the engines
  (`engines.mjs`: `mock`, `claude-cli`, `api`).
- `tests/resume-refactor`:
  - `checks.spec.ts`: tests of the deterministic checks on known good and bad outputs
  - `api.spec.ts`, `ui.spec.ts`: validation and UI behavior on mocked responses
  - `ai.spec.ts`: the golden set (`golden/cases.json`) and edge cases against a real model
  - `judge.spec.ts`: calibration of the LLM judge on known good and bad rewrites
  - `lib/judge.ts`: the rubric, JSON verdict parsing, thresholds, judge model call
    (`JUDGE_ENGINE`, `JUDGE_MODEL`; default `claude -p` with `sonnet`, a stronger
    model than the `haiku` rewriter)
  - `lib/checks.ts`: facts preserved, fabricated tools, forbidden content,
    vacancy keywords, structure, length

```bash
npm run test:resume       # checks + UI/API on the mock engine, free, runs in CI
npm run test:resume:ai    # real model (claude -p by default), manual only
ENGINE=api ANTHROPIC_API_KEY=... npm run test:resume:ai   # Claude API instead
npm run resume:serve      # run the page locally at http://localhost:4173
```

Not yet done: stability runs and run comparison (stage 3).

### What the evaluation found (2026-10-05)

The first judge runs found real defects of the rewrite prompt that the
deterministic checks missed: the headline retitled to match the vacancy
("Тестировщик" became "QA Automation Engineer"), strengthened verbs ("wrote"
became "developed and maintained", "reported" became "managed"), a Russian
university name garbled with Latin letters, and a summary claiming a
specialization or presenting a student project as work experience. Fixing them
in the prompt made the model too cautious (relevance 2/5, near-copies), and the
rubric itself pulled in two directions (relevance asked for "CI/CD" while
no_fabrication punished it). The final prompt and rubric balance both. This
faithfulness vs. tailoring trade-off is the main thing to watch when changing
the prompt.

Known limits of the deterministic checks: fabricated-tool detection only knows
the terms in `TECH_VOCABULARY` (extend it per case), and fact checks are
substring matches, so they catch dropped facts but not subtle rewording errors.
Those need the judge.
