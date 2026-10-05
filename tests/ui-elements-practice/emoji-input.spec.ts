import { test, expect, type Dialog } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

// Emoji are a classic input edge case: they live outside the BMP (two UTF-16 code
// units), and ZWJ sequences / flags / skin-tone modifiers glue several code points into
// one visible character. A field that truncates, re-encodes or mangles any of these
// would still pass every plain-ASCII test, so each text input gets the same set here.
const emojiCases = [
  { label: 'single emoji', value: '😀' },
  { label: 'several emoji', value: '🚀🔥✅' },
  { label: 'skin-tone modifier', value: '👍🏽' },
  { label: 'ZWJ family sequence', value: '👨‍👩‍👧' },
  { label: 'flag (regional indicators)', value: '🇩🇪' },
  { label: 'emoji mixed with text', value: 'Hi 👋 Irina' },
];

test.describe('Emoji input: autocomplete field', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  for (const { label, value } of emojiCases) {
    test(`keeps the value intact: ${label}`, async ({ page }) => {
      const practice = new PracticePage(page);

      await practice.autocompleteInput.fill(value);

      await expect(practice.autocompleteInput).toHaveValue(value);
    });
  }

  test('accepts emoji typed key by key, not only filled in one go', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.autocompleteInput.pressSequentially('Go 🇩🇪 team 🚀');

    await expect(practice.autocompleteInput).toHaveValue('Go 🇩🇪 team 🚀');
  });

  test('a multi-code-point emoji is still a single character after input', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.autocompleteInput.fill('👨‍👩‍👧');

    const graphemes = await practice.autocompleteInput.evaluate((el: HTMLInputElement) => {
      return [...new Intl.Segmenter().segment(el.value)].length;
    });

    expect(graphemes).toBe(1);
  });

  test('can be cleared after emoji input', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.autocompleteInput.fill('🔥🔥🔥');

    await practice.autocompleteInput.clear();

    await expect(practice.autocompleteInput).toHaveValue('');
  });
});

test.describe('Emoji input: name field and alert', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  for (const { label, value } of emojiCases) {
    test(`alert greets the name unchanged: ${label}`, async ({ page }) => {
      const practice = new PracticePage(page);
      await practice.enterName(value);
      await expect(practice.nameInput).toHaveValue(value);

      let captured: Dialog | undefined;
      page.once('dialog', (dialog) => {
        captured = dialog;
        void dialog.accept();
      });
      await practice.alertButton.click();

      expect(captured?.type()).toBe('alert');
      expect(captured?.message()).toBe(`Hello ${value}`);
    });
  }
});

test.describe('Emoji input: show/hide field', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('keeps emoji after the field is hidden and shown again', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.displayedTextInput.fill('🙈 hidden 🙉');

    await practice.hideButton.click();
    await expect(practice.displayedTextInput).toBeHidden();
    await practice.showButton.click();

    await expect(practice.displayedTextInput).toBeVisible();
    await expect(practice.displayedTextInput).toHaveValue('🙈 hidden 🙉');
  });
});

test.describe('Emoji input: form inside the iframe', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  for (const { label, value } of emojiCases) {
    test(`submitted result echoes the name unchanged: ${label}`, async ({ page }) => {
      const frame = new PracticePage(page).localIframe.contentFrame();

      await frame.getByLabel('Name').fill(value);
      await frame.getByLabel('Country').selectOption('uk');
      await frame.getByRole('checkbox').check();
      await frame.getByRole('button', { name: 'Submit' }).click();

      await expect(frame.locator('#iframe-result')).toHaveText(`Submitted: ${value} - uk`);
    });
  }

  test('a name made only of emoji passes validation (it is not treated as empty)', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await frame.getByLabel('Name').fill('😀');
    await frame.getByRole('button', { name: 'Submit' }).click();

    await expect(frame.getByRole('alert')).toBeHidden();
  });
});
