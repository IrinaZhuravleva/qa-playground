# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/checkboxes.spec.ts >> Checkbox Example >> none are checked by default
- Location: tests/ui-elements-practice/checkboxes.spec.ts:24:3

# Error details

```
Error: expect(locator).not.toBeChecked() failed

Locator: locator('#checkBoxOption1')
Expected: not checked
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "not toBeChecked" locator('#checkBoxOption1') with timeout 5000ms
  - waiting for locator('#checkBoxOption1')

```

```yaml
- link "Top":
  - /url: "#top"
- link "Reload":
  - /url: ""
- group "iFrame Example":
  - text: iFrame Example
  - iframe
- group "External iFrame Example":
  - text: External iFrame Example
  - iframe
- group "Resume Refactor (AI) Example":
  - text: Resume Refactor (AI) Example
  - iframe
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { PracticePage } from './pages/PracticePage';
  3  | 
  4  | test.describe('Checkbox Example', () => {
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await new PracticePage(page).goto();
  7  |   });
  8  | 
  9  |   test('checkboxes toggle independently', async ({ page }) => {
  10 |     const practice = new PracticePage(page);
  11 | 
  12 |     await practice.checkbox('Option1').check();
  13 |     await practice.checkbox('Option3').check();
  14 | 
  15 |     await expect(practice.checkbox('Option1')).toBeChecked();
  16 |     await expect(practice.checkbox('Option2')).not.toBeChecked();
  17 |     await expect(practice.checkbox('Option3')).toBeChecked();
  18 | 
  19 |     await practice.checkbox('Option1').uncheck();
  20 |     await expect(practice.checkbox('Option1')).not.toBeChecked();
  21 |     await expect(practice.checkbox('Option3')).toBeChecked();
  22 |   });
  23 | 
  24 |   test('none are checked by default', async ({ page }) => {
  25 |     const practice = new PracticePage(page);
  26 | 
> 27 |     await expect(practice.checkbox('Option1')).not.toBeChecked();
     |                                                    ^ Error: expect(locator).not.toBeChecked() failed
  28 |     await expect(practice.checkbox('Option2')).not.toBeChecked();
  29 |     await expect(practice.checkbox('Option3')).not.toBeChecked();
  30 |   });
  31 | 
  32 |   test('all three can be checked at once (unlike the radio group)', async ({ page }) => {
  33 |     const practice = new PracticePage(page);
  34 | 
  35 |     await practice.checkbox('Option1').check();
  36 |     await practice.checkbox('Option2').check();
  37 |     await practice.checkbox('Option3').check();
  38 | 
  39 |     await expect(practice.checkbox('Option1')).toBeChecked();
  40 |     await expect(practice.checkbox('Option2')).toBeChecked();
  41 |     await expect(practice.checkbox('Option3')).toBeChecked();
  42 |   });
  43 | });
  44 | 
```