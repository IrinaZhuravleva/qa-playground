import { defineConfig, devices } from '@playwright/test';

const resumePort = Number(process.env.RESUME_PORT ?? 4173);
const resumeBaseUrl = `http://localhost:${resumePort}`;
const resumeTests = /resume-refactor\//;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Cap parallelism in CI: GitHub-hosted runners have limited CPU/memory, and
  // running unbounded workers across 3 browser engines at once risks renderer
  // crashes (Chromium/Firefox/WebKit fighting over RAM in a small container).
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  // Local server for the resume-refactor app. ENGINE=mock keeps it free and
  // deterministic; RESUME_AI=1 switches to a real model (claude -p by default).
  webServer: {
    command: 'node targets/resume-refactor/server.mjs',
    url: `http://localhost:${resumePort}/api/health`,
    reuseExistingServer: !process.env.CI,
    env: {
      PORT: String(resumePort),
      ENGINE: process.env.ENGINE ?? (process.env.RESUME_AI ? 'claude-cli' : 'mock'),
    },
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: resumeTests,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: resumeTests,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: resumeTests,
      use: { ...devices['Desktop Safari'] },
    },
    // resume-refactor: pure checks, mocked UI/API tests (chromium only), and the
    // opt-in real-model project.
    {
      name: 'resume-checks',
      testMatch: /resume-refactor\/checks\.spec\.ts/,
    },
    {
      name: 'resume-app',
      testMatch: /resume-refactor\/(ui|api)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: resumeBaseUrl },
    },
    ...(process.env.RESUME_AI
      ? [
          {
            name: 'resume-ai',
            testMatch: /resume-refactor\/(ai|judge)\.spec\.ts/,
            timeout: 180_000,
            retries: 0,
            use: { baseURL: resumeBaseUrl },
          },
        ]
      : []),
  ],
});
