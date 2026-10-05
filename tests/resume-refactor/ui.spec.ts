import { test, expect } from '@playwright/test';

// UI behavior. Model responses are mocked with page.route, so these tests are fast,
// free and deterministic. Real model output is covered in ai.spec.ts.

const resumeText = 'Anna Petrova\nExperience\nDeveloper, Northwind Systems (2021-2024)';
const vacancyText = 'Backend Engineer\nRequirements: Java';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows the input fields and the Refactor button', async ({ page }) => {
  await expect(page.getByLabel('Resume')).toBeEmpty();
  await expect(page.getByLabel('Job description')).toBeEmpty();
  await expect(page.getByRole('button', { name: 'Refactor' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Copy result' })).toBeHidden();
});

test('asks for the resume when it is empty', async ({ page }) => {
  await page.getByLabel('Job description').fill(vacancyText);
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.getByRole('alert')).toHaveText('Please paste your resume.');
});

test('asks for the job description when it is empty', async ({ page }) => {
  await page.getByLabel('Resume').fill(resumeText);
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.getByRole('alert')).toHaveText('Please paste the job description.');
});

test('does not call the API when validation fails', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/refactor', (route) => {
    calls++;
    return route.fulfill({ json: { result: 'x' } });
  });

  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.getByRole('alert')).toHaveText('Please paste your resume.');
  expect(calls).toBe(0);
});

test('sends both texts and shows the rewritten resume', async ({ page }) => {
  let body: unknown;
  await page.route('**/api/refactor', (route) => {
    body = route.request().postDataJSON();
    return route.fulfill({ json: { result: '# Anna Petrova\n\nTailored resume' } });
  });

  await page.getByLabel('Resume').fill(resumeText);
  await page.getByLabel('Job description').fill(vacancyText);
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.locator('#result')).toContainText('Tailored resume');
  expect(body).toEqual({ resume: resumeText, vacancy: vacancyText });
  await expect(page.getByRole('button', { name: 'Copy result' })).toBeVisible();
});

test('disables the button and shows progress while the model works', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  await page.route('**/api/refactor', async (route) => {
    await gate;
    await route.fulfill({ json: { result: 'Done' } });
  });

  await page.getByLabel('Resume').fill(resumeText);
  await page.getByLabel('Job description').fill(vacancyText);
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.getByRole('button', { name: 'Refactor' })).toBeDisabled();
  await expect(page.getByRole('status')).toHaveText('Refactoring...');

  release();

  await expect(page.locator('#result')).toHaveText('Done');
  await expect(page.getByRole('button', { name: 'Refactor' })).toBeEnabled();
  await expect(page.getByRole('status')).toBeEmpty();
});

test('shows the server error and no result when the model call fails', async ({ page }) => {
  await page.route('**/api/refactor', (route) =>
    route.fulfill({ status: 502, json: { error: 'Model call failed: timeout' } }),
  );

  await page.getByLabel('Resume').fill(resumeText);
  await page.getByLabel('Job description').fill(vacancyText);
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.getByRole('alert')).toHaveText('Model call failed: timeout');
  await expect(page.locator('#result')).toBeEmpty();
  await expect(page.getByRole('button', { name: 'Refactor' })).toBeEnabled();
});

test('clears the previous result and error on a new run', async ({ page }) => {
  let fail = true;
  await page.route('**/api/refactor', (route) =>
    fail
      ? route.fulfill({ status: 502, json: { error: 'Model call failed' } })
      : route.fulfill({ json: { result: 'Second result' } }),
  );
  await page.getByLabel('Resume').fill(resumeText);
  await page.getByLabel('Job description').fill(vacancyText);

  await page.getByRole('button', { name: 'Refactor' }).click();
  await expect(page.getByRole('alert')).toHaveText('Model call failed');

  fail = false;
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.locator('#result')).toHaveText('Second result');
  await expect(page.getByRole('alert')).toBeEmpty();
});

test('works end to end against the mock engine of the local server', async ({ page }) => {
  test.skip(process.env.ENGINE !== undefined && process.env.ENGINE !== 'mock', 'needs the mock engine');

  await page.getByLabel('Resume').fill(resumeText);
  await page.getByLabel('Job description').fill(vacancyText);
  await page.getByRole('button', { name: 'Refactor' }).click();

  await expect(page.locator('#result')).toContainText('Tailored for: Backend Engineer');
  await expect(page.locator('#result')).toContainText('Northwind Systems');
});
