# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/mouse-hover.spec.ts >> Mouse Hover Example >> the menu is hidden until the button is hovered
- Location: tests/ui-elements-practice/mouse-hover.spec.ts:9:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-PACi3v -juggler-pipe -silent
  - <launched> pid=1946
  - [pid=1946][err] [1946] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=1946][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=1946] <process did exit: exitCode=1, signal=null>
  - [pid=1946] starting temporary directories cleanup
  - [pid=1946] <gracefully close start>
  - [pid=1946] <kill>
  - [pid=1946] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=1946] finished temporary directories cleanup
  - [pid=1946] <gracefully close end>

```