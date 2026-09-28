# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/fixed-header-table.spec.ts >> Web Table Fixed Header Example >> lists all 9 rows even though only part of the table is visible
- Location: tests/ui-elements-practice/fixed-header-table.spec.ts:19:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-TgSy1J -juggler-pipe -silent
  - <launched> pid=1688
  - [pid=1688][err] [1688] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=1688][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=1688] <process did exit: exitCode=1, signal=null>
  - [pid=1688] starting temporary directories cleanup
  - [pid=1688] <gracefully close start>
  - [pid=1688] <kill>
  - [pid=1688] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=1688] finished temporary directories cleanup
  - [pid=1688] <gracefully close end>

```