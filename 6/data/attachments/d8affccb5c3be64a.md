# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-elements-practice/a11y-findings.spec.ts >> Known defects on the practice page >> BUG: clicking the radio/checkbox label text does not toggle the control
- Location: tests/ui-elements-practice/a11y-findings.spec.ts:33:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1543/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-DGRXxz -juggler-pipe -silent
  - <launched> pid=1219
  - [pid=1219][err] [1219] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=1219][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by uid 1001.)
  - [pid=1219] <process did exit: exitCode=1, signal=null>
  - [pid=1219] starting temporary directories cleanup
  - [pid=1219] <gracefully close start>
  - [pid=1219] <kill>
  - [pid=1219] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=1219] finished temporary directories cleanup
  - [pid=1219] <gracefully close end>

```