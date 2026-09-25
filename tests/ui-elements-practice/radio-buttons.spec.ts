import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Radio Button Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('exactly one radio can be checked at a time', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.radioButton('Radio1').check();
    await expect(practice.radioButton('Radio1')).toBeChecked();
    await expect(practice.radioButton('Radio2')).not.toBeChecked();
    await expect(practice.radioButton('Radio3')).not.toBeChecked();

    await practice.radioButton('Radio2').check();
    await expect(practice.radioButton('Radio1')).not.toBeChecked();
    await expect(practice.radioButton('Radio2')).toBeChecked();
  });

  test('no radio is selected by default', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.radioButton('Radio1')).not.toBeChecked();
    await expect(practice.radioButton('Radio2')).not.toBeChecked();
    await expect(practice.radioButton('Radio3')).not.toBeChecked();
  });

  test('clicking the label text does NOT check the radio (broken label association)', async ({
    page,
  }) => {
    const practice = new PracticePage(page);

    // <label for="radio1"> targets an id that no input on the page has, and a present
    // `for` attribute — even a broken one — stops the browser from falling back to
    // "input nested inside this label" association. So this click lands on plain text,
    // not a labeled control, and nothing gets checked. Confirmed bug, not an assumption:
    // see a11y-findings.spec.ts for the accessible-name evidence.
    await practice.radioLabelText('Radio3').click();
    await expect(practice.radioButton('Radio3')).not.toBeChecked();
  });
});
