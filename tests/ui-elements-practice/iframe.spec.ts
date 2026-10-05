import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('iFrame Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the iframe points at the local iframe page', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.localIframe).toHaveAttribute('src', './iframe.html');
  });

  test('the form inside the iframe can be filled and submitted (CSS locators)', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await frame.locator('#iframe-name').fill('John');
    await frame.locator('#iframe-country').selectOption('uk');
    await frame.locator('#iframe-agree').check();
    await frame.locator('#iframe-submit').click();

    await expect(frame.locator('#iframe-result')).toHaveText('Submitted: John - uk');
  });

  test('the form inside the iframe can be filled and submitted (user-facing locators)', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await frame.getByLabel('Name').fill('Anna');
    await frame.getByLabel('Country').selectOption({ label: 'Germany' });
    await frame.getByRole('checkbox').check();
    await frame.getByRole('button', { name: 'Submit' }).click();

    await expect(frame.getByText('Submitted: Anna - de')).toBeVisible();
  });

  test('form fields inside the iframe reflect their state', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await expect(frame.getByPlaceholder('Enter name')).toBeEmpty();
    await expect(frame.getByRole('checkbox')).not.toBeChecked();

    await frame.getByRole('checkbox').check();
    await expect(frame.getByRole('checkbox')).toBeChecked();

    await frame.getByLabel('Name').fill('John');
    await expect(frame.getByLabel('Name')).toHaveValue('John');
  });

  test('submitting an empty name shows a validation error', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await expect(frame.getByRole('alert')).toBeHidden();
    await frame.getByRole('button', { name: 'Submit' }).click();

    await expect(frame.getByRole('alert')).toHaveText('Please enter your name');
    await expect(frame.locator('#iframe-result')).toBeEmpty();
  });

  test('submitting without accepting the terms is rejected', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await frame.getByLabel('Name').fill('John');
    await frame.getByRole('button', { name: 'Submit' }).click();

    await expect(frame.locator('#iframe-result')).toHaveText('Please accept the terms');
  });

  test('the table inside the iframe can be queried by cell and row', async ({ page }) => {
    const frame = new PracticePage(page).localIframe.contentFrame();

    await expect(frame.getByRole('cell', { name: 'Liverpool' })).toBeVisible();

    const liverpoolRow = frame.getByRole('row').filter({ hasText: 'Liverpool' });
    await expect(liverpoolRow.getByRole('cell').nth(1)).toHaveText('84');
  });

  test('the iframe can be reached by its name attribute via page.frame()', async ({ page }) => {
    const practice = new PracticePage(page);
    await expect(practice.localIframe).toBeVisible();

    const frame = page.frame({ name: 'iframe-name' });
    expect(frame).not.toBeNull();
    await expect(frame!.locator('h2')).toHaveText('Registration form');
  });

  test('the frame finishes loading and resolves to the local iframe page', async ({ page }) => {
    const frame = page.frame({ name: 'iframe-name' });
    expect(frame).not.toBeNull();

    await frame!.waitForLoadState('domcontentloaded');

    expect(frame!.url()).toMatch(/\/iframe\.html$/);
    expect(frame!.parentFrame()).toBe(page.mainFrame());
    expect(await frame!.title()).toBe('iFrame Content');
  });
});

// The portfolio is a live external site (an SPA), so these checks only assert on stable
// structure (a visible h1 and the main landmark), never on marketing copy. A failure
// here is a signal to re-verify the site manually, not a regression in our own code.
test.describe('External iFrame Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('the iframe points at the portfolio site', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.portfolioIframe).toHaveAttribute('src', 'https://irina-zhuravleva-qa.surge.sh/');
  });

  test('the external iframe renders the portfolio page', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.portfolioIframe.scrollIntoViewIfNeeded();
    const frame = practice.portfolioIframe.contentFrame();

    await expect(frame.locator('h1')).toBeVisible({ timeout: 15_000 });
    await expect(frame.getByRole('main')).toBeVisible();
  });

  test('the external iframe can be reached by its name attribute via page.frame()', async ({ page }) => {
    const practice = new PracticePage(page);
    await expect(practice.portfolioIframe).toBeVisible();

    const frame = page.frame({ name: 'portfolio-iframe' });
    expect(frame).not.toBeNull();
    await expect(frame!.locator('h1')).toBeVisible({ timeout: 15_000 });
  });
});
