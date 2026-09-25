import { test, expect } from '@playwright/test';
import { PracticePage } from './pages/PracticePage';

test.describe('Web Table Example', () => {
  test.beforeEach(async ({ page }) => {
    await new PracticePage(page).goto();
  });

  test('has the expected header columns', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.coursesTable.locator('tr').first().locator('th')).toHaveText([
      'Instructor',
      'Course',
      'Price',
    ]);
  });

  test('lists 10 courses, all by the same instructor', async ({ page }) => {
    const practice = new PracticePage(page);

    await expect(practice.coursesTableRows).toHaveCount(10);

    const instructors = await practice.coursesTableRows.locator('td:first-child').allTextContents();
    for (const instructor of instructors) {
      expect(instructor).toBe('Rahul Shetty');
    }
  });

  test('contains a known course at the expected price', async ({ page }) => {
    const practice = new PracticePage(page);

    const jmeterRow = practice.coursesTableRows.filter({ hasText: 'JMETER' });
    await expect(jmeterRow).toHaveCount(1);
    await expect(jmeterRow.locator('td').last()).toHaveText('25');
  });

  test('the free resume-writing course is priced at 0', async ({ page }) => {
    const practice = new PracticePage(page);

    const resumeRow = practice.coursesTableRows.filter({ hasText: 'QA Resume' });
    await expect(resumeRow.locator('td').last()).toHaveText('0');
  });
});
