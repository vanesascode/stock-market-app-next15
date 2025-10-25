import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/StockView/);
  });

  test("should display header with logo", async ({ page }) => {
    const logo = page.getByAltText("logo");
    await expect(logo).toBeVisible();
  });

  test("should display TradingView widget containers", async ({ page }) => {
    // Wait for widgets to load (they load dynamically)

    const widgetContainers = page.locator(".tradingview-widget-container");
    await widgetContainers.first().waitFor({ state: "visible" });
    const count = await widgetContainers.count();

    // Homepage should have 4 widgets (Market Overview, Heatmap, Timeline, Market Data)
    expect(count).toBeGreaterThanOrEqual(4);
  });
});
