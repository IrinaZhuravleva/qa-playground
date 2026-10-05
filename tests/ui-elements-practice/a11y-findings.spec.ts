import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

/**
 * This page has a few real accessibility/markup bugs, found while writing the
 * functional suite (not by inspection). They are documented here as passing
 * assertions rather than left as comments, so a future fix to the page would
 * turn a green test red instead of going unnoticed.
 */
test.describe('Known defects on the practice page', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('BUG: radio inputs have no accessible name (label[for] targets a non-existent id)', async ({
    page,
  }) => {
    // <label for="radio1"> should associate with an element id="radio1", but the input
    // only carries value="radio1" — there is no such id anywhere on the page. A *present*
    // for attribute, even a broken one, also suppresses the browser's fallback to
    // "implicitly associate with the label I'm nested inside", so screen readers announce
    // an unlabeled "radio button" three times over with no way to tell them apart.
    await expect(page.getByRole('radio', { name: 'Radio1' })).toHaveCount(0);
    await expect(page.getByRole('radio')).toHaveCount(3);
  });

  test('BUG: checkbox inputs have the same broken label[for] association', async ({ page }) => {
    // Same root cause as the radios: <label for="bmw"> etc. point at ids that don't exist.
    await expect(page.getByRole('checkbox', { name: 'Option1' })).toHaveCount(0);
    await expect(page.getByRole('checkbox')).toHaveCount(3);
  });

  test('BUG: clicking the radio/checkbox label text does not toggle the control', async ({
    page,
  }) => {
    const practice = new PracticePage(page);

    await practice.radioLabelText('Radio2').click();
    await expect(practice.radioButton('Radio2')).not.toBeChecked();

    await page.locator('label').filter({ hasText: 'Option2' }).click();
    await expect(practice.checkbox('Option2')).not.toBeChecked();
  });

  test('BUG: two different tables share the same id="product"', async ({ page }) => {
    // Duplicate ids are invalid HTML and make `#product` an unreliable selector —
    // querySelector('#product') will only ever return the first one.
    await expect(page.locator('#product')).toHaveCount(2);
  });

  test('BUG: the courses iframe has no accessible name', async ({ page }) => {
    // No title attribute (and no aria-label) means a screen reader announces an
    // unlabeled "iframe" with no indication of what it contains.
    await expect(page.locator('#local-iframe')).not.toHaveAttribute('title');
    await expect(page.locator('#local-iframe')).not.toHaveAttribute('aria-label');
  });
});
