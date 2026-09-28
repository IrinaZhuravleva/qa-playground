# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/web-table.spec.ts >> Web Table Example >> contains a known course at the expected price
- Location: tests/ui-elements-practice/web-table.spec.ts:30:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /ms-playwright/webkit-2359/pw_run.sh
╔════════════════════════════════════════════════════════╗
║ Looks like Playwright was just updated to 1.63.0.      ║
║ Please update docker image as well.                    ║
║ -  current: mcr.microsoft.com/playwright:v1.55.0-jammy ║
║ - required: mcr.microsoft.com/playwright:v1.63.0-jammy ║
║                                                        ║
║ <3 Playwright Team                                     ║
╚════════════════════════════════════════════════════════╝
```