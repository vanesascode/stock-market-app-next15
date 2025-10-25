import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for CI/CD environments
 * Uses production build instead of dev server
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false, // Run sequentially in CI to avoid resource issues
  forbidOnly: true, // Always forbid .only() in CI
  retries: 2, // Retry failed tests twice in CI
  workers: 1, // Single worker in CI to avoid conflicts
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Only Chromium in CI to save time
    // Uncomment for full browser testing:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: false, // Always rebuild in CI
    timeout: 180 * 1000, // 3 minutes for build + start
  },
})
