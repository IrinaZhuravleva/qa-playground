import { test, expect, type Dialog } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

// `alert()`/`confirm()` genuinely block the page's JS thread until dismissed — the
// onclick handler that opened them has not "returned" yet. That means `click()` itself
// cannot resolve until the dialog is dismissed. Racing `click()` against
// `waitForEvent('dialog')` via Promise.all is a deadlock if the dialog is only dismissed
// *after* that Promise.all resolves (both promises end up waiting on each other).
// The fix: register a `page.once('dialog', ...)` handler that captures the dialog and
// dismisses it immediately, synchronously inside the callback — that unblocks the page
// right away, and `dialog.message()`/`.type()` remain readable afterwards since they were
// already captured by Playwright when the event fired.

test.describe('Switch To Alert Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('alert asks for a name when the field is empty', async ({ page }) => {
    const practice = new PracticePage(page);

    let captured: Dialog | undefined;
    page.once('dialog', (dialog) => {
      captured = dialog;
      void dialog.accept();
    });
    await practice.alertButton.click();

    expect(captured?.type()).toBe('alert');
    expect(captured?.message()).toBe('Please enter your name');
  });

  test('alert greets the entered name', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.enterName('Irina');

    let captured: Dialog | undefined;
    page.once('dialog', (dialog) => {
      captured = dialog;
      void dialog.accept();
    });
    await practice.alertButton.click();

    expect(captured?.message()).toBe('Hello Irina');
  });

  test('confirm dialog text changes based on whether a name was entered', async ({ page }) => {
    const practice = new PracticePage(page);

    let emptyMessage: string | undefined;
    page.once('dialog', (dialog) => {
      emptyMessage = dialog.message();
      void dialog.dismiss();
    });
    await practice.confirmButton.click();
    expect(emptyMessage).toBe('Are you sure you want to continue?');

    await practice.enterName('Irina');
    let namedMessage: string | undefined;
    page.once('dialog', (dialog) => {
      namedMessage = dialog.message();
      void dialog.accept();
    });
    await practice.confirmButton.click();
    expect(namedMessage).toBe('Hello Irina. Do you want to continue?');
  });

  test('accepting confirm logs the OK branch to the console', async ({ page }) => {
    const practice = new PracticePage(page);

    page.once('dialog', (dialog) => void dialog.accept());
    const [consoleMessage] = await Promise.all([
      page.waitForEvent('console', (msg) => msg.text() === 'User clicked OK'),
      practice.confirmButton.click(),
    ]);
    expect(consoleMessage.text()).toBe('User clicked OK');
  });

  test('dismissing confirm logs the Cancel branch to the console', async ({ page }) => {
    const practice = new PracticePage(page);

    page.once('dialog', (dialog) => void dialog.dismiss());
    const [consoleMessage] = await Promise.all([
      page.waitForEvent('console', (msg) => msg.text() === 'User clicked Cancel'),
      practice.confirmButton.click(),
    ]);
    expect(consoleMessage.text()).toBe('User clicked Cancel');
  });
});
