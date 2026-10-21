import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Accessibility and markup', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('radio inputs have accessible names', async ({ page }) => {
    await expect(page.getByRole('radio')).toHaveCount(3);
    for (const name of ['Radio1', 'Radio2', 'Radio3']) {
      await expect(page.getByRole('radio', { name })).toHaveCount(1);
    }
  });

  test('checkbox inputs have accessible names', async ({ page }) => {
    await expect(page.getByRole('checkbox')).toHaveCount(3);
    for (const name of ['Option1', 'Option2', 'Option3']) {
      await expect(page.getByRole('checkbox', { name })).toHaveCount(1);
    }
  });

  test('clicking the label text toggles the radio and the checkbox', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.radioLabelText('Radio2').click();
    await expect(practice.radioButton('Radio2')).toBeChecked();

    await page.locator('label').filter({ hasText: 'Option2' }).click();
    await expect(practice.checkbox('Option2')).toBeChecked();
  });

  test('every id on the page is unique', async ({ page }) => {
    const duplicates = await page.evaluate(() => {
      const seen = new Set<string>();
      const dupes = new Set<string>();
      document.querySelectorAll('[id]').forEach(({ id }) => {
        if (seen.has(id)) dupes.add(id);
        seen.add(id);
      });
      return [...dupes];
    });
    expect(duplicates).toEqual([]);
  });

  test('every iframe has an accessible name', async ({ page }) => {
    for (const id of ['local-iframe', 'portfolio-iframe', 'resume-iframe']) {
      await expect(page.locator(`#${id}`)).toHaveAttribute('title', /\S/);
    }
  });
});
