# ui-elements-practice — test suite

Playwright + TypeScript coverage for every interactive element on
`targets/ui-elements-practice/index.html`, a classic QA-training practice page
covering the "greatest hits" of tricky UI automation scenarios.

## Running locally

By default the specs run against the deployed copy of the page
(`https://qa-playground-ui.surge.sh`, see [`target-url.ts`](target-url.ts)).
That copy is only redeployed by CI on push to `main` (or by
`npm run deploy:target`), so **if you've edited `targets/ui-elements-practice/`
and haven't deployed yet, run against your local copy**. Otherwise tests that
depend on the new markup fail across the board — that's what happened with
`iframe.html`, where all 33 tests failed at first because the deployed page
still had the old iframe.

```bash
# serve the local target page and point the suite at it
(cd targets/ui-elements-practice && python3 -m http.server 8765) &
TARGET_URL=http://localhost:8765/index.html npx playwright test tests/ui-elements-practice
```

(The root README shows a `file://` variant of `TARGET_URL`; the local HTTP
server above is the setup the iframe tests were verified with.) Stop the
server afterwards (`pkill -f "http.server 8765"`).

Use `--project=chromium --project=webkit` to skip Firefox: on this machine
Playwright's Firefox build fails to launch (`Could not find profile folder`),
a local macOS/Firefox issue rather than a test bug. Firefox runs normally in
CI (Linux container, `HOME=/root` set at step level).

The suite is 48 tests per browser project (chromium, firefox, webkit).

## Approach

**Page Object.** Every locator lives in [`pages/PracticePage.ts`](pages/PracticePage.ts).
Spec files never write a raw CSS/XPath selector — they ask the page object for
`practice.dropdown`, `practice.checkbox('Option1')`, etc. If the markup
changes, one file changes.

**Locator strategy.** Preference order used while writing this suite:

1. `getByRole` with an accessible name, when the page actually exposes one
   (e.g. the mouse-hover menu's `Top`/`Reload` links).
2. Stable `id`/attribute selectors when the accessible name is missing or
   unreliable — which, on this page, turned out to be the radios and
   checkboxes (see **Findings** below).
3. `.filter({ hasText })` for rows/labels that only differ by visible text
   (course table rows, the fixed-header table lookup).

**Dialogs (`alert`/`confirm`).** `window.alert()` and `window.confirm()`
block the page's JS thread until dismissed, which means the click that
triggers them never resolves on its own — the click is waiting on the handler,
the handler is waiting on the dialog, and nothing has told the dialog what to
do yet. Every dialog test therefore races the click with
`page.waitForEvent('dialog')` via `Promise.all(...)` instead of awaiting them
one after another. See `alerts.spec.ts`.

**New tabs/windows.** `Switch Window Example` uses `window.open(...)`,
`Switch Tab Example` uses a plain `target="_blank"` link. Both are caught via
`page.waitForEvent('popup')` / `context().waitForEvent('page')` racing the
click, same `Promise.all` pattern as above. The tab-switch test only asserts
the *mechanism* (a new tab opened, the original page didn't navigate) and not
the third-party destination's content, since that's a real site we don't
control.

**iFrames.** The page has two, covered in [`iframe.spec.ts`](iframe.spec.ts):

- *Local* (`#courses-iframe`, `src="./iframe.html"`): a page we own — a
  registration form (name, country select, terms checkbox, validation
  message, result line) and a small table. It exists so frame behaviour can be
  tested deterministically, with no third-party site involved. Tests reach
  into it with `page.frameLocator('#courses-iframe')` and cover the same
  flows twice, once with CSS/id locators and once with user-facing ones
  (`getByLabel`, `getByRole`, `getByPlaceholder`), plus field state,
  validation errors, table cell/row lookup, and access by name via
  `page.frame({ name: 'iframe-name' })`.
- *External* (`#portfolio-iframe`, `name="portfolio-iframe"`): embeds the
  author's portfolio, a live single-page app at
  `https://irina-zhuravleva-qa.surge.sh/`. It is checked for `src`, for a
  visible `h1` and `main` landmark inside the frame (15 s timeout, since the
  SPA has to render), and for access by name. Assertions are deliberately
  structural, never on text: the slogan can change, and the `nav` landmark
  isn't reliable because the menu isn't shown at the frame's width. Before
  embedding any real site, check that it allows framing — e.g.
  `the-internet.herokuapp.com` sends `X-Frame-Options: SAMEORIGIN` and would
  render blank.

**Tables.** The static course table gets structural assertions (header order,
row count, spot-checked prices). The fixed-header table additionally gets a
*data-integrity* check: the "Total Amount Collected" figure is compared
against a sum computed live from the rendered `<td>` cells, not hardcoded —
so if the table data and the total ever drift apart, the test catches it
regardless of which side changed.

## Findings — real bugs on the practice page

Writing the functional suite surfaced markup bugs that weren't obvious from
just reading the HTML. They're captured as passing assertions in
[`a11y-findings.spec.ts`](a11y-findings.spec.ts) rather than left as comments,
so a fix to the page would turn a green test red instead of going unnoticed:

- **Radios and checkboxes have no accessible name.** Every `<label for="...">`
  on the page points at an id that doesn't exist on the paired input (e.g.
  `<label for="radio1">` wraps an input with `value="radio1"` but no `id`
  at all). A *present* `for` attribute — even a broken one — also stops the
  browser from falling back to "associate with the label this input is
  nested inside", so `getByRole('radio', { name: 'Radio1' })` finds nothing,
  and a screen reader announces three unlabeled "radio button"s with no way
  to tell them apart.
- **Clicking the label text doesn't check the control**, as a direct
  consequence of the above — there's no automated way to make the browser
  execute the same design once the `for` attribute lies.
- **Two `<table>` elements share `id="product"`** — invalid HTML, and it
  makes `#product` an unreliable selector (only the first match is ever
  returned).
- **The `<iframe>`s have no accessible name** (no `title`, no
  `aria-label`) — a screen reader user hears an unlabeled "iframe" with no
  clue what it embeds. Only `#courses-iframe` is asserted in
  `a11y-findings.spec.ts`; `#portfolio-iframe` has the same gap but isn't
  covered by a test yet.

## Known external-dependency risk

`Switch Window Example`, `Switch Tab Example`, and the *External iFrame* tests
touch real destinations (`example.com`, `qaclickacademy.com`, and the
portfolio at `irina-zhuravleva-qa.surge.sh`) that this suite doesn't fully
control. They're kept deliberately light on assertions (mechanism and stable
structure over content), and the iframe render check uses an extended
timeout — a failure there is a prompt to verify manually, not necessarily a
regression in this code. The *local* iframe tests have no such dependency.

The nightly CI run in `.github/workflows/ci.yml` runs everything against the
deployed surge page, so these external checks can in principle fail the
nightly if a site is down.
