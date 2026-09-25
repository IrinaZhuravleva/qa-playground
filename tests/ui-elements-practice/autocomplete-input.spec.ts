import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Suggestion Class Example (autocomplete input)', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('accepts free text input', async ({ page }) => {
    const practice = new PracticePage(page);

    await practice.autocompleteInput.fill('Germany');
    await expect(practice.autocompleteInput).toHaveValue('Germany');
  });

  test('shows the placeholder when empty', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.autocompleteInput).toHaveAttribute(
      'placeholder',
      'Type to Select Countries'
    );
    await expect(practice.autocompleteInput).toHaveValue('');
  });

  // Note: this static copy of the page ships the `.ui-autocomplete-input` class and
  // placeholder copy for a jQuery UI autocomplete widget, but no suggestion list is
  // actually wired up — there is nothing to assert beyond plain text input behaviour.
  // Flagging this here rather than silently testing around it.
});
