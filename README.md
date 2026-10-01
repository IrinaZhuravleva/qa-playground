# qa-playground

A sandbox for interview prep and QA automation practice, set up to look and
behave like a real, CI'd automation project: a live hosted target, nightly +
per-PR GitHub Actions runs, and an Allure dashboard with pass/fail history.

## Why this exists

Two different kinds of things live here, and they are not treated the same way:

| Folder | Visibility | Notes |
| --- | --- | --- |
| `targets/ui-elements-practice/` | Public | A classic, openly-shared QA training page (Rahul Shetty Academy / QAClickAcademy style) — not proprietary content. Deployed to [qa-playground-ui.surge.sh](https://qa-playground-ui.surge.sh). |
| `targets/codility-interview-clone/` | **Never committed** | A local clone of a take-home/interview coding environment for a specific job interview. Git-ignored (see `.gitignore`) so nothing dropped in here can end up in this now-public repo. See its own `README.md`. |

The public portfolio (`qa-automation-portfolio`) only ever gets a case-study
card that links to the `tests/ui-elements-practice` suite below — never to the
Codility clone, and never with any mention of the interview it came from.

## Structure

```
qa-playground/
├── targets/
│   ├── codility-interview-clone/   # confidential, interview prep only
│   └── ui-elements-practice/       # public-safe practice page (index.html)
├── tests/
│   ├── codility-clone/             # (reserved, empty for now)
│   └── ui-elements-practice/       # Playwright + TypeScript suite for the practice page
├── playwright.config.ts
├── package.json
└── README.md
```

## Running the tests

```bash
npm install
npx playwright install   # first time only, downloads browser binaries
npm test                 # all configured browsers (chromium, firefox, webkit)
npm run test:ui-elements # just the ui-elements-practice suite
npm run test:headed      # watch it run in a real browser window
npm run test:report      # open the last HTML report
```

Tests navigate to the live, surge.sh-hosted copy of the page
(`https://qa-playground-ui.surge.sh`) by default — no local file or dev
server needed. Point at something else (e.g. a local file, while iterating
on the target page) with the `TARGET_URL` env var:

```bash
TARGET_URL="file://$(pwd)/targets/ui-elements-practice/index.html" npm test
```

To (re)deploy the target page after editing it, run `surge token` once to
get a token, export `SURGE_LOGIN`/`SURGE_TOKEN`, then:

```bash
npm run deploy:target
```

> **Known local environment issue:** on this machine, Playwright's cached
> Firefox build fails to launch (`Could not find profile folder`) even with a
> freshly-created, writable profile directory — reproduced outside Playwright
> too, so it's a local Firefox/macOS build issue, not a test bug. All 48
> `ui-elements-practice` tests pass cleanly on **Chromium** and **WebKit**
> (`npx playwright test --project=chromium --project=webkit`). CI runs on
> Linux and isn't affected — Firefox runs there normally. Worth a
> `npx playwright install --force firefox` (or checking on another machine)
> before relying on the Firefox project locally.

## What's covered (`tests/ui-elements-practice/`)

A full functional pass over every interactive element on the practice page:
radio buttons, checkboxes, a dropdown, a free-text "autocomplete" input,
native `alert()`/`confirm()` dialogs, a new-window popup, a new-tab link, a
static data table, a table with a sticky/scrollable header plus a computed
total, show/hide toggling, a CSS `:hover` menu, and an `<iframe>`.

See [`tests/ui-elements-practice/README.md`](tests/ui-elements-practice/README.md)
for the approach (Page Object structure, locator strategy, and how dialogs /
new tabs / tables are handled), plus a short write-up of real bugs the suite
found on the page itself.

## CI & reporting

- **`.github/workflows/ci.yml`** — runs the full suite (chromium, firefox,
  webkit) nightly (`02:00 UTC`), on push to `main`, and on manual
  `workflow_dispatch`. This is the only workflow that (re)deploys
  `targets/ui-elements-practice/` to surge.sh and publishes the Allure
  report to the `gh-pages` branch, merging in prior history so trends
  accumulate over time (last ~40 runs kept, i.e. roughly the last month of
  nightly runs).
- **`.github/workflows/pr.yml`** — runs on every pull request against
  `main`, testing against the same live surge URL. It never deploys and
  never writes to `gh-pages` (PRs, especially from forks, don't get write
  access to those secrets/history) — it generates a standalone Allure
  report as a downloadable build artifact and posts/updates a pass/fail
  summary comment on the PR.
- **Allure dashboard:** `https://<github-username>.github.io/qa-playground/`
  (enable once, after the first `ci.yml` run creates `gh-pages`: repo
  Settings → Pages → deploy from the `gh-pages` branch).

## Stack

TypeScript, Playwright Test (`@playwright/test`), Allure (`allure-playwright`),
Page Object Model, GitHub Actions, surge.sh.
