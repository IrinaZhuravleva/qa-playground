# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/dropdown.spec.ts >> Dropdown Example >> defaults to the placeholder "Select" option
- Location: tests/ui-elements-practice/dropdown.spec.ts:20:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-QuGTIZ -juggler-pipe -silent
  - <launched> pid=1644
  - [pid=1644][err] [1644] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=1644][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=1644] <process did exit: exitCode=1, signal=null>
  - [pid=1644] starting temporary directories cleanup
  - [pid=1644] <gracefully close start>
  - [pid=1644] <kill>
  - [pid=1644] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=1644] finished temporary directories cleanup
  - [pid=1644] <gracefully close end>

```