# Testing Documentation

## Overview

This project uses modern testing tools for comprehensive test coverage:

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing framework

## Test Structure

```
.
├── components/
│   ├── __tests__/           # Component unit tests
│   │   ├── NavItems.test.tsx
│   │   ├── UserDropdown.test.tsx
│   │   └── TradingViewWidget.test.tsx
│   └── ui/
│       └── __tests__/       # UI component tests
│           └── button.test.tsx
├── hooks/
│   └── __tests__/           # Hook tests
│       └── useTradingViewWidget.test.tsx
├── lib/
│   └── __tests__/           # Utility tests
│       └── utils.test.ts
└── e2e/                     # E2E tests
    ├── homepage.spec.ts
    └── navigation.spec.ts
```

## Running Tests

### Unit Tests

```bash
# Run tests in watch mode (development)
npm run test

# Run tests once with coverage (CI)
npm run test:ci
```

### End-to-End Tests

```bash
# Run E2E tests in headless mode (development)
npm run test:e2e

# Run E2E tests for CI/CD (production build)
npm run test:e2e:ci

# Run E2E tests with UI (interactive mode)
npm run test:e2e:ui

# Run E2E tests with browser visible
npm run test:e2e:headed

# Run E2E tests in debug mode (step-by-step)
npm run test:e2e:debug
```

### All Tests

```bash
# Run unit tests + E2E tests
npm run test:all
```

## Test Coverage

Unit tests cover:

- **Components**: NavItems, UserDropdown, TradingViewWidget, Button
- **Hooks**: useTradingViewWidget
- **Utils**: cn() utility function

E2E tests cover:

- Homepage rendering and TradingView widgets
- Navigation between pages
- User dropdown interactions
- Responsive design
- Active state management

---

## Testing Environments

This project has **different configurations** for local development vs CI/CD.

### Development Environment

**Configuration:** `playwright.config.ts`

```bash
npm run test:e2e        # Uses dev server (fast)
npm run test:e2e:ui     # Interactive UI
```

**Characteristics:**
- ✅ Uses `npm run dev` (Turbopack, hot reload)
- ✅ **Chromium only** (Firefox and WebKit commented out)
- ✅ Fast iteration
- ✅ No build required
- ✅ Reuses existing server if already running

### CI/CD Environment (Production)

**Configuration:** `playwright.config.ci.ts`

```bash
npm run test:e2e:ci     # Uses production build
```

**Characteristics:**
- ✅ Uses `npm run build && npm run start` (real production)
- ✅ Chromium only (for speed)
- ✅ 2 retries on failure
- ✅ Screenshots/videos on failure
- ✅ 3 minutes timeout for build

**GitHub Actions automatically uses this config.**

### Manual Mode (2 Terminals)

**Configuration:** `playwright.config.manual.ts`

**Purpose:** When you want full control over the dev server.

**Usage:**
```bash
# Terminal 1
npm run dev

# Terminal 2 (when you see "Ready")
npx playwright test --config=playwright.config.manual.ts --ui
```

**Why use this?**
- You manually control the dev server
- Make changes and see hot reload without restarting tests
- Test in all 3 browsers (Chromium, Firefox, WebKit)
- Useful for advanced debugging

**Key difference:** No `webServer` section - assumes server is already running.

### Comparison

| Aspect | Development | CI/CD | Manual |
|--------|-------------|-------|--------|
| **Command** | `npm run test:e2e` | `npm run test:e2e:ci` | Custom config |
| **Config** | `playwright.config.ts` | `playwright.config.ci.ts` | `playwright.config.manual.ts` |
| **Server** | `npm run dev` ⚡ | `npm run build + start` 🏗️ | Already running |
| **Browsers** | Chromium only | Chromium only | All 3 browsers |
| **Speed** | Fast (2-3 min) | Slow (5-7 min) | Fast |
| **Realism** | 90% | 100% production | 90% |
| **When to use** | Daily development | Push to `main` | Advanced debugging |

---

## CI/CD Pipeline

### GitHub Actions Workflow

When you push to `main`, tests run in this order:

```
1. ✅ Linter (ESLint)
2. ✅ Unit tests (Jest) with coverage
3. ✅ Install Playwright Chromium
4. ✅ Build production (npm run build)
5. ✅ Start server (npm run start)
6. ✅ E2E tests (17 tests in Chromium)
7. ✅ Upload coverage + Playwright report
8. ✅ Deploy to Azure Static Web Apps
```

**Total time:** ~10-15 minutes

### Test Reports: Where to Find Them

#### 1. Coverage Report → Codecov.io (Optional)

```yaml
- name: Upload test coverage
  uses: codecov/codecov-action@v4
  with:
    files: ./coverage/lcov.info
```

**Where to find it:**
- Go to: https://codecov.io/
- Sign in with GitHub
- Connect your repository
- Add `CODECOV_TOKEN` secret to GitHub repo (Settings → Secrets)

**What you'll see:**
- Dashboard with coverage percentage
- Which files need more tests
- Coverage trends over time
- Line-by-line coverage highlighting

**Example:**
```
┌─────────────────────────────────────┐
│ Codecov Dashboard                   │
├─────────────────────────────────────┤
│ Total Coverage: 85%                 │
│                                     │
│ components/         92% ████████░░  │
│ hooks/              78% ███████░░░  │
│ lib/               100% ██████████  │
│ app/                65% ██████░░░░  │
└─────────────────────────────────────┘
```

**⚠️ Note:** If you don't configure Codecov, this step will be skipped (but workflow continues).

**Alternative without Codecov:**
```yaml
- name: Upload coverage report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: coverage-report
    path: coverage/
    retention-days: 30
```

#### 2. Playwright Report → GitHub Artifacts

```yaml
- name: Upload Playwright report
  uses: actions/upload-artifact@v4
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

**Where to find it:**

1. Go to your GitHub repo
2. Click **"Actions"** tab
3. Click on the workflow run (e.g., "Azure Static Web Apps CI/CD")
4. Scroll to bottom: see **"Artifacts"** section

**Example:**
```
┌─────────────────────────────────────────────────┐
│ Workflow run #42                                │
├─────────────────────────────────────────────────┤
│ ✅ Setup Node.js                                │
│ ✅ Install dependencies                         │
│ ✅ Run linter                                   │
│ ✅ Run unit tests                               │
│ ✅ Run E2E tests                                │
│ ✅ Build And Deploy                             │
├─────────────────────────────────────────────────┤
│ 📦 Artifacts (1)                                │
│                                                 │
│ 📊 playwright-report     2.5 MB  [Download]    │
│                                                 │
│ Expires in 30 days                              │
└─────────────────────────────────────────────────┘
```

**What's inside the report:**
- Download the ZIP file
- Extract it
- Open `index.html` in your browser
- Interactive HTML report with:
  - All test results (pass/fail)
  - Screenshots of failures
  - Videos of failed tests
  - Traces (execution recordings)
  - Timing for each test

**Example report structure:**
```html
┌─────────────────────────────────────────┐
│ Playwright Test Report                 │
├─────────────────────────────────────────┤
│ ✅ Homepage › should have correct title │
│ ✅ Homepage › should display logo       │
│ ❌ Navigation › should navigate         │
│    └─ Screenshot: failure-1.png         │
│    └─ Video: test-1.webm                │
│    └─ Trace: trace.zip                  │
└─────────────────────────────────────────┘
```

---

## Configuration Files

### jest.config.js

Configures Jest to work with Next.js 15:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',  // Path to Next.js app
})

const config = {
  coverageProvider: 'v8',           // Fast coverage collection
  testEnvironment: 'jsdom',         // Simulates browser environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Setup file
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',     // Path alias support
  },
  testMatch: [                      // Test file patterns
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/e2e/',  // Exclude E2E tests (run with Playwright)
  ],
  collectCoverageFrom: [            // Files to include in coverage
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',                   // Exclude type definitions
    '!**/node_modules/**',
    '!**/.next/**',
  ],
}

module.exports = createJestConfig(config)
```

**Key features:**
- Uses `next/jest` for automatic Next.js configuration
- jsdom environment simulates browser APIs (DOM, window, document)
- Path alias `@/` works in tests like in source code
- Coverage excludes type files and build artifacts
- **Excludes E2E tests** from Jest (they run with Playwright)

### jest.setup.ts

Runs **once before all tests** to prepare the testing environment:

#### 1. Import Testing Library Matchers

```typescript
import '@testing-library/jest-dom'
```

Adds custom matchers for DOM testing:
- `toBeInTheDocument()` - Element exists in DOM
- `toHaveClass('className')` - Element has CSS class
- `toBeVisible()` - Element is visible to users
- `toBeDisabled()` - Element is disabled
- `toHaveAttribute('attr', 'value')` - Element has attribute
- And [many more](https://github.com/testing-library/jest-dom#custom-matchers)

#### 2. Mock Next.js Navigation

```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),        // Navigate programmatically
    replace: jest.fn(),     // Replace current route
    prefetch: jest.fn(),    // Prefetch routes
  }),
  usePathname: () => '/',   // Returns current path (default: homepage)
  useSearchParams: () => new URLSearchParams(),  // Returns URL params
}))
```

**Why?**
- Next.js hooks (`useRouter`, `usePathname`) only work in browser/Next.js environment
- Tests run in Node.js where these hooks don't exist
- Mock simulates router behavior without actual navigation

**Usage in tests:**
```typescript
// Override default pathname for specific tests
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/search'),  // Test search page
}))
```

#### 3. Mock Next.js Image Component

```typescript
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    return React.createElement('img', props)
  },
}))
```

**Why?**
- `<Image>` component has complex optimizations (lazy loading, srcset, blur placeholders)
- Optimizations rely on Next.js server and build process
- Not available in Jest's Node.js environment

**What it does:**
- Replaces `<Image>` with standard HTML `<img>` element
- Preserves all props (src, alt, className, etc.)
- Uses `React.createElement()` instead of JSX to avoid syntax parsing issues

**Before mock:**
```typescript
<Image src="/logo.svg" alt="logo" width={100} height={100} />
// ❌ Error: Image optimization requires Next.js server
```

**After mock:**
```typescript
<Image src="/logo.svg" alt="logo" width={100} height={100} />
// ✅ Renders as: <img src="/logo.svg" alt="logo" width={100} height={100} />
```

#### 4. Mock Next.js Link Component

```typescript
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return React.createElement('a', { href }, children)
  },
}))
```

**Why?**
- `<Link>` has client-side routing and prefetching
- Relies on Next.js router context not available in tests
- Tests need simple anchor tags for asserting navigation

**What it does:**
- Replaces `<Link>` with standard HTML `<a>` element
- Keeps `href` and `children` props
- Allows testing navigation links without Next.js router

**Before mock:**
```typescript
<Link href="/search">Search</Link>
// ❌ Error: useRouter must be used within RouterContext
```

**After mock:**
```typescript
<Link href="/search">Search</Link>
// ✅ Renders as: <a href="/search">Search</a>
```

### playwright.config.ts (Development)

Configures Playwright for local development:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox and WebKit commented out for speed
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
  },
})
```

**Key features:**
- Uses dev server (Turbopack)
- Chromium only for fast development
- Reuses existing server if already running
- Parallel execution for speed

### playwright.config.ci.ts (Production)

Configures Playwright for CI/CD:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,  // Sequential for stability
  forbidOnly: true,
  retries: 2,  // Retry failed tests
  workers: 1,  // Single worker in CI
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
  ],

  webServer: {
    command: 'npm run build && npm run start',  // Production build
    url: 'http://localhost:3000',
    reuseExistingServer: false,  // Always rebuild
    timeout: 180 * 1000,  // 3 minutes for build
  },
})
```

**Key features:**
- Production build testing
- Screenshots and videos on failure
- Retries for flaky tests
- Sequential execution for stability

### playwright.config.manual.ts (Manual Control)

For advanced development with 2 terminals:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',

  use: {
    baseURL: 'http://localhost:3000',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // No webServer - assumes dev server is already running
})
```

**Why use this?**
- Full control over the dev server
- Test in all 3 browsers
- Useful for debugging server and tests simultaneously
- Fast iteration (no server restarts)

---

## Writing New Tests

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('should navigate to page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Search' }).click()
  await expect(page).toHaveURL('/search')
})
```

### Understanding `beforeEach` in E2E Tests

```typescript
test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')  // Runs BEFORE each test
  })

  test('should have correct title', async ({ page }) => {
    // Page is already at '/' thanks to beforeEach
    await expect(page).toHaveTitle(/StockView/)
  })

  test('should display logo', async ({ page }) => {
    // Page goes to '/' again before this test
    const logo = page.getByAltText('logo')
    await expect(logo).toBeVisible()
  })
})
```

**How it works:**
- `beforeEach` executes before **every test**
- Ensures each test starts with a clean state
- Better than repeating `page.goto('/')` in each test

---

## Troubleshooting

### Playwright: "No tests found"

**Cause:** Browsers not installed

**Solution:**
```bash
npx playwright install chromium
```

### Playwright: "Server not ready"

**Solution 1: Manual mode**
```bash
# Terminal 1
npm run dev

# Terminal 2 (wait for "Ready")
npx playwright test --config=playwright.config.manual.ts --ui
```

**Solution 2: Check server is running**
```bash
# Verify server is accessible
curl http://localhost:3000
```

### Jest: Tests fail with Next.js errors

**Cause:** Missing mocks in `jest.setup.ts`

**Solution:** Ensure all Next.js components are mocked (Image, Link, router)

### Useful Commands

```bash
# List all detected tests
npx playwright test --list

# Run a specific test file
npx playwright test e2e/homepage.spec.ts

# Run a specific test by name
npx playwright test -g "should have correct title"

# View last test report
npx playwright show-report

# Run tests in debug mode
npm run test:e2e:debug
```

---

## Best Practices

1. **Test behavior, not implementation**
2. **Use semantic queries** (getByRole, getByText, etc.)
3. **Mock external dependencies** (Next.js router, TradingView scripts)
4. **Keep tests isolated** and independent
5. **Use descriptive test names**
6. **Test edge cases** and error states
7. **Maintain high coverage** for critical paths
8. **Use beforeEach for common setup**
9. **Prefer manual config for debugging**
10. **Always check CI logs for failures**

---

## Summary

| Test Type | Tool | Config | Command |
|-----------|------|--------|---------|
| Unit Tests | Jest | `jest.config.js` | `npm run test:ci` |
| E2E (Dev) | Playwright | `playwright.config.ts` | `npm run test:e2e` |
| E2E (CI) | Playwright | `playwright.config.ci.ts` | `npm run test:e2e:ci` |
| E2E (Manual) | Playwright | `playwright.config.manual.ts` | Custom |

**Total Tests:** 70+ (53 unit + 17 E2E)

**Coverage:** Available in GitHub Artifacts or Codecov.io
