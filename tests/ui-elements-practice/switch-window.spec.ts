import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Switch Window Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('opens example.com in a new window via window.open', async ({ page }) => {
    const practice = new PracticePage(page);

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      practice.openWindowButton.click(),
    ]);

    await popup.waitForLoadState();
    expect(popup.url()).toContain('example.com');

    await popup.close();
    // The original page must still be usable after the popup closes.
    await expect(practice.openWindowButton).toBeVisible();
  });
});
