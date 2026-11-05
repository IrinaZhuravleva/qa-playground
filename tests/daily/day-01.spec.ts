import { test, expect } from '@playwright/test';

test('цена курса Python', async ({ page }) => {
  await page.goto('https://qa-playground-ui.surge.sh');
  const courses = await page.locator('#product').first().allInnerTexts();
  const courses2 = await page.locator('#product').first().locator('tr').evaluateAll(
    trs => trs.map(tr => (tr as HTMLElement).innerText.trim().split('\t'))
  )
  const rows = courses.map(r => r.trim().split('\t'))
  console.log(courses);

// const expensive = pro
//   .split('\n')                              // строки таблицы
//   .map(line => line.split('\t'))            // ячейки: [instructor, course, price]
//   .filter(([instructor, course, price]) => Number(price) > 30)
//   .map(([instructor, course]) => course);

// console.log(expensive);
  // console.log(pro)
  // твой код
});

// evaluateAll(pageFunction: PageFunctionOn<(SVGElement | HTMLElement)[], unknown, unknown>, arg?: unknown): Promise<unknown>

// const rows = await page.locator('#product tr').evaluateAll(trs =>
//   trs.map(tr => [...tr.querySelectorAll('td')].map(td => td.textContent?.trim() ?? ''))
// );