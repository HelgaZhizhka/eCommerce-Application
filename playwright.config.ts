import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    // netlify dev fronts Vite (3000) and the auth BFF functions
    baseURL: 'http://localhost:8888',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx netlify dev --offline',
    url: 'http://localhost:8888',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
