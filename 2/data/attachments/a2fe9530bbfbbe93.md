# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/autocomplete-input.spec.ts >> Suggestion Class Example (autocomplete input) >> accepts free text input
- Location: tests/ui-elements-practice/autocomplete-input.spec.ts:9:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell
╔════════════════════════════════════════════════════════╗
║ Looks like Playwright was just updated to 1.63.0.      ║
║ Please update docker image as well.                    ║
║ -  current: mcr.microsoft.com/playwright:v1.55.0-jammy ║
║ - required: mcr.microsoft.com/playwright:v1.63.0-jammy ║
║                                                        ║
║ <3 Playwright Team                                     ║
╚════════════════════════════════════════════════════════╝
```