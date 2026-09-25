# qa-playground

A private sandbox for interview prep and QA automation practice. **This repo
stays private on GitHub.**

## Why this exists

Two different kinds of things live here, and they are not treated the same way:

| Folder | Visibility | Notes |
| --- | --- | --- |
| `targets/ui-elements-practice/` | Safe to reference publicly | A classic, openly-shared QA training page (Rahul Shetty Academy / QAClickAcademy style) — not proprietary content. |
| `targets/codility-interview-clone/` | **Never public** | A local clone of a take-home/interview coding environment for a specific job interview. See its own `README.md`. |

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

Tests navigate straight to the local HTML file via a `file://` URL — no dev
server needed for `ui-elements-practice`.

> **Known local environment issue:** on this machine, Playwright's cached
> Firefox build fails to launch (`Could not find profile folder`) even with a
> freshly-created, writable profile directory — reproduced outside Playwright
> too, so it's a local Firefox/macOS build issue, not a test bug. All 39
> `ui-elements-practice` tests pass cleanly on **Chromium** and **WebKit**
> (`npx playwright test --project=chromium --project=webkit`). Worth a
> `npx playwright install --force firefox` (or checking on another machine)
> before relying on the Firefox project here.

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

## Stack

TypeScript, Playwright Test (`@playwright/test`), Page Object Model.
