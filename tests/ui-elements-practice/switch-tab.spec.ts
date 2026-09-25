import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Switch Tab Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the link points at the expected target= "_blank" destination', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.openTabLink).toHaveAttribute('target', '_blank');
    await expect(practice.openTabLink).toHaveAttribute('href', 'https://www.qaclickacademy.com');
  });

  test('clicking opens a new tab instead of navigating the current page', async ({ page }) => {
    const practice = new PracticePage(page);
    const originalUrl = page.url();

    const [newTab] = await Promise.all([
      page.context().waitForEvent('page'),
      practice.openTabLink.click(),
    ]);

    // Best-effort: the destination is a real, third-party site we don't control,
    // so we only assert the *mechanism* (a new tab opened, original untouched),
    // not the third-party page's content.
    await newTab.waitForLoadState('domcontentloaded').catch(() => undefined);

    expect(page.url()).toBe(originalUrl);
    await newTab.close();
  });
});
