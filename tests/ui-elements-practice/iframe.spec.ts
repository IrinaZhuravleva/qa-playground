import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('iFrame Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the iframe points at the expected src', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.coursesIframe).toHaveAttribute(
      'src',
      'https://legacy.rahulshettyacademy.com/'
    );
  });

  // Loading the third-party document itself is a soft check: it depends on a live
  // external site we don't control, so a failure here is a signal to re-verify
  // manually rather than a hard regression in our own code.
  test('the iframe eventually loads a document', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.coursesIframe).toBeVisible();
    const frame = page.frameLocator('#courses-iframe');

    await expect(async () => {
      await expect(frame.locator('body')).toBeAttached();
    }).toPass({ timeout: 15_000 });
  });
});
