# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/hide-show.spec.ts >> Element Displayed Example >> the text field is visible on load
- Location: tests/ui-elements-practice/hide-show.spec.ts:9:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-6nGtun -juggler-pipe -silent
  - <launched> pid=1748
  - [pid=1748][err] [1748] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=1748][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=1748] <process did exit: exitCode=1, signal=null>
  - [pid=1748] starting temporary directories cleanup
  - [pid=1748] <gracefully close start>
  - [pid=1748] <kill>
  - [pid=1748] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=1748] finished temporary directories cleanup
  - [pid=1748] <gracefully close end>

```