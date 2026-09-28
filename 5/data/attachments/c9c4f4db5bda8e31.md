# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/web-table.spec.ts >> Web Table Example >> contains a known course at the expected price
- Location: tests/ui-elements-practice/web-table.spec.ts:30:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-y63ABP -juggler-pipe -silent
  - <launched> pid=2232
  - [pid=2232][err] [2232] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=2232][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=2232] <process did exit: exitCode=1, signal=null>
  - [pid=2232] starting temporary directories cleanup
  - [pid=2232] <gracefully close start>
  - [pid=2232] <kill>
  - [pid=2232] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=2232] finished temporary directories cleanup
  - [pid=2232] <gracefully close end>

```