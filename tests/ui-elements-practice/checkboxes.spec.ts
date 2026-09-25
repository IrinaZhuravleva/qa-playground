import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Checkbox Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('checkboxes toggle independently', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.checkbox('Option1').check();
    await practice.checkbox('Option3').check();

    await expect(practice.checkbox('Option1')).toBeChecked();
    await expect(practice.checkbox('Option2')).not.toBeChecked();
    await expect(practice.checkbox('Option3')).toBeChecked();

    await practice.checkbox('Option1').uncheck();
    await expect(practice.checkbox('Option1')).not.toBeChecked();
    await expect(practice.checkbox('Option3')).toBeChecked();
  });

  test('none are checked by default', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.checkbox('Option1')).not.toBeChecked();
    await expect(practice.checkbox('Option2')).not.toBeChecked();
    await expect(practice.checkbox('Option3')).not.toBeChecked();
  });

  test('all three can be checked at once (unlike the radio group)', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.checkbox('Option1').check();
    await practice.checkbox('Option2').check();
    await practice.checkbox('Option3').check();

    await expect(practice.checkbox('Option1')).toBeChecked();
    await expect(practice.checkbox('Option2')).toBeChecked();
    await expect(practice.checkbox('Option3')).toBeChecked();
  });
});
