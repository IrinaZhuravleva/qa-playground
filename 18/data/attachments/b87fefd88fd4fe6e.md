# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/mouse-hover.spec.ts >> Mouse Hover Example >> the menu is hidden until the button is hovered
- Location: tests/ui-elements-practice/mouse-hover.spec.ts:9:3

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  locator('.mouse-hover-content')
Expected: hidden
Received: visible
Timeout:  5000ms

Call log:
  - Expect "toBeHidden" locator('.mouse-hover-content') with timeout 5000ms
  - waiting for locator('.mouse-hover-content')
    14 × locator resolved to <div class="mouse-hover-content">…</div>
       - unexpected value "visible"

```

```yaml
- link "Top":
  - /url: "#top"
- link "Reload":
  - /url: ""
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { PracticePage } from './pages/PracticePage';
  3  | 
  4  | test.describe('Mouse Hover Example', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await new PracticePage(page).goto();
  7  |   });
  8  | 
  9  |   test('the menu is hidden until the button is hovered', async ({ page }) => {
  10 |     const practice = new PracticePage(page);
> 11 |     await expect(practice.mouseHoverMenu).toBeHidden();
     |                                           ^ Error: expect(locator).toBeHidden() failed
  12 |   });
  13 | 
  14 |   test('hovering reveals Top and Reload links', async ({ page }) => {
  15 |     const practice = new PracticePage(page);
  16 | 
  17 |     await practice.mouseHoverTrigger.hover();
  18 | 
  19 |     await expect(practice.mouseHoverMenu).toBeVisible();
  20 |     await expect(practice.mouseHoverTopLink).toBeVisible();
  21 |     await expect(practice.mouseHoverReloadLink).toBeVisible();
  22 |     await expect(practice.mouseHoverTopLink).toHaveAttribute('href', '#top');
  23 |   });
  24 | 
  25 |   test('moving away hides the menu again', async ({ page }) => {
  26 |     const practice = new PracticePage(page);
  27 | 
  28 |     await practice.mouseHoverTrigger.hover();
  29 |     await expect(practice.mouseHoverMenu).toBeVisible();
  30 | 
  31 |     await page.locator('h1').hover();
  32 |     await expect(practice.mouseHoverMenu).toBeHidden();
  33 |   });
  34 | });
  35 | 
```