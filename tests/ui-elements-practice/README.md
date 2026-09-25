# ui-elements-practice — test suite

Playwright + TypeScript coverage for every interactive element on
`targets/ui-elements-practice/index.html`, a classic QA-training practice page
covering the "greatest hits" of tricky UI automation scenarios.

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
- **The courses `<iframe>` has no accessible name** (no `title`, no
  `aria-label`) — a screen reader user hears an unlabeled "iframe" with no
  clue what it embeds.

## Known external-dependency risk

`Switch Window Example`, `Switch Tab Example`, and the iframe test touch real
third-party destinations (`example.com`, `qaclickacademy.com`,
`legacy.rahulshettyacademy.com`) that this suite doesn't control. They're kept
deliberately light on assertions (mechanism over content) and the iframe load
check uses a generous `toPass` retry window — a failure there is a prompt to
verify manually, not necessarily a regression in this code.
