# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/web-table.spec.ts >> Web Table Example >> lists 10 courses, all by the same instructor
- Location: tests/ui-elements-practice/web-table.spec.ts:19:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-oQ6mL2 -juggler-pipe -silent
  - <launched> pid=2239
  - [pid=2239][err] [2239] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=2239][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=2239] <process did exit: exitCode=1, signal=null>
  - [pid=2239] starting temporary directories cleanup
  - [pid=2239] <gracefully close start>
  - [pid=2239] <kill>
  - [pid=2239] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=2239] finished temporary directories cleanup
  - [pid=2239] <gracefully close end>

```