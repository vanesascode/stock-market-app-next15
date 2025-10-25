import { defineConfig, devices } from '@playwright/test'

/**
 * Manual Playwright configuration
 * Use this when you want to run the dev server separately
 *
 * Usage:
 * Terminal 1: npm run dev
 * Terminal 2: npx playwright test --config=playwright.config.manual.ts --ui
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // No webServer - assumes dev server is already running
})
