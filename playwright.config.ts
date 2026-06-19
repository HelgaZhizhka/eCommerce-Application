import { defineConfig, devices } from '@playwright/test';

// PLAYWRIGHT_BASE_URL is set in CI to a deployed Netlify preview URL — when
// present we test that deployment and skip the local server. Otherwise we boot
// the full app locally via `netlify dev` (Vite + the auth BFF functions).
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: externalBaseURL ?? 'http://localhost:8888',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: externalBaseURL
    ? undefined
    : {
        command: 'npx netlify dev --offline',
        url: 'http://localhost:8888',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
