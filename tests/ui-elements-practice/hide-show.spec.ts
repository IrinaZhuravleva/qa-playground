import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Element Displayed Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the text field is visible on load', async ({ page }) => {
    const practice = new PracticePage(page);
    await expect(practice.displayedTextInput).toBeVisible();
  });

  test('Hide removes the field and Show brings it back', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.hideButton.click();
    await expect(practice.displayedTextInput).toBeHidden();

    await practice.showButton.click();
    await expect(practice.displayedTextInput).toBeVisible();
  });

  test('clicking Hide twice keeps the field hidden', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.hideButton.click();
    await practice.hideButton.click();
    await expect(practice.displayedTextInput).toBeHidden();
  });
});
