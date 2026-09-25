import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Dropdown Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('lists the expected options in order', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.dropdown.locator('option')).toHaveText([
      'Select',
      'Option1',
      'Option2',
      'Option3',
    ]);
  });

  test('defaults to the placeholder "Select" option', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.dropdown).toHaveValue('');
  });

  test('selecting an option by label updates the value', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.dropdown.selectOption({ label: 'Option2' });
    await expect(practice.dropdown).toHaveValue('option2');
  });
});
