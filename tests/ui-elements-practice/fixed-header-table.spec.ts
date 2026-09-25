import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Web Table Fixed Header Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the displayed total matches the sum of the Amount column', async ({ page }) => {
    const practice = new PracticePage(page);

    const computedSum = await practice.sumFixedHeaderAmounts();
    const displayedTotal = await practice.totalAmount.textContent();

    expect(computedSum).toBe(296);
    expect(displayedTotal).toContain(String(computedSum));
  });

  test('lists all 9 rows even though only part of the table is visible', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.fixedHeaderTable.locator('tbody tr')).toHaveCount(9);
  });

  test('the header stays pinned to the top while the body scrolls', async ({ page }) => {
    const practice = new PracticePage(page);

    const header = practice.fixedHeaderTable.locator('thead th').first();
    const beforeScroll = await header.boundingBox();

    await practice.fixedHeaderTableWrapper.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });

    const afterScroll = await header.boundingBox();

    expect(beforeScroll).not.toBeNull();
    expect(afterScroll).not.toBeNull();
    expect(Math.abs(afterScroll!.y - beforeScroll!.y)).toBeLessThan(1);
  });
});
