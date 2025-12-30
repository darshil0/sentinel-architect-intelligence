import { test, expect } from '@playwright/test';

test.describe('AgentScheduler', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Click the "Scrapers" tab to navigate to the ScraperEngine view
    await page.click('text=Scrapers');
  });

  test('should render the scheduler with the new UI', async ({ page }) => {
    // Check for the new title "Scheduler Matrix"
    await expect(page.locator('h4:has-text("Scheduler Matrix")')).toBeVisible();

    // Check for the cron input field and the add button
    await expect(page.locator('input[placeholder="* * * * *"]')).toBeVisible();
    await expect(page.locator('button[aria-label="Add schedule"]')).toBeVisible();

    // Check for the initial idle message
    await expect(page.locator('p:has-text("Scheduler matrix is clear. System idle.")')).toBeVisible();
  });

  test('should add a new schedule', async ({ page }) => {
    const scheduler = page.locator('div:has(h4:has-text("Scheduler Matrix"))');
    // Select an agent from the dropdown
    await page.selectOption('select', 'dice');

    // Enter a cron value
    await page.fill('input[type="text"]', '0 12 * * 5');

    // Click the add button
    await page.click('button[aria-label="Add schedule"]');

    // Verify the new schedule is displayed
    await expect(scheduler.locator('span', { hasText: /^dice$/i })).toBeVisible();
    await expect(scheduler.locator('span:has-text("0 12 * * 5")')).toBeVisible();
  });

  test('should remove a schedule', async ({ page }) => {
    const scheduler = page.locator('div:has(h4:has-text("Scheduler Matrix"))');

    // Add a schedule first
    await page.selectOption('select', 'linkedin');
    await page.fill('input[type="text"]', '* * * * *');
    await page.click('button[aria-label="Add schedule"]');

    // Verify it was added
    await expect(scheduler.locator('span', { hasText: /^linkedin$/i })).toBeVisible();

    // Click the remove button
    await scheduler.locator('button[aria-label="Remove schedule"]').click();

    // Verify the schedule is no longer visible
    await expect(scheduler.locator('span', { hasText: /^linkedin$/i })).not.toBeVisible();
    await expect(page.locator('p:has-text("Scheduler matrix is clear. System idle.")')).toBeVisible();
  });
});
