# День 1 — Первый тест (разбор + самостоятельно)

**Сайт:** https://qa-playground-ui.surge.sh
**Решение:** `tests/daily/day-01.spec.ts`
**Время:** ~30–40 минут

## Часть 1. Прочитай (10 минут)

Открой `tests/ui-elements-practice/web-table.spec.ts` и `tests/ui-elements-practice/pages/PracticePage.ts`. Ответь мне своими словами, без гугла:

1. Что делает `test.beforeEach`?
2. Что такое `practice.coursesTable` и почему локатор вынесен в отдельный класс (Page Object)?
3. Чем `expect(locator).toHaveCount(10)` отличается от `expect(await locator.count()).toBe(10)`? (Подсказка: auto-waiting / retry.)

Если что-то непонятно, так и пиши «не поняла», я объясню. Это нормально, цель дня — разобраться.

## Часть 2. Напиши сама (20–30 минут)

Создай `tests/daily/day-01.spec.ts`. Скопируй каркас:

```ts
import { test, expect } from '@playwright/test';

test('самый дорогой курс — ???', async ({ page }) => {
  await page.goto('https://qa-playground-ui.surge.sh');
  // твой код
});
```

Задача: в таблице `#product` найти строку с курсом **Python** и проверить, что цена в ней = нужному числу (посмотри на странице глазами).

Подсказки по порядку:
1. `page.locator('#product')` — таблица.
2. `.locator('tr').filter({ hasText: 'Python' })` — нужная строка.
3. `.locator('td').last()` — ячейка с ценой.
4. `await expect(...).toHaveText('...')`.

Запуск: `npx playwright test daily/day-01.spec.ts --project=chromium`

## Бонус (если легко пошло)

Вторым тестом проверь, что в таблице ровно 10 курсов.

## Сдача

Напиши «проверяй» + ответы на часть 1 прямо в чате. Я запущу тест и разберу код как интервьюер.
