import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Mouse Hover Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the menu is hidden until the button is hovered', async ({ page }) => {
    const practice = new PracticePage(page);
    await expect(practice.mouseHoverMenu).toBeHidden();
  });

  test('hovering reveals Top and Reload links', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.mouseHoverTrigger.hover();

    await expect(practice.mouseHoverMenu).toBeVisible();
    await expect(practice.mouseHoverTopLink).toBeVisible();
    await expect(practice.mouseHoverReloadLink).toBeVisible();
    await expect(practice.mouseHoverTopLink).toHaveAttribute('href', '#top');
  });

  test('moving away hides the menu again', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.mouseHoverTrigger.hover();
    await expect(practice.mouseHoverMenu).toBeVisible();

    await page.locator('h1').hover();
    await expect(practice.mouseHoverMenu).toBeHidden();
  });
});
