const { test, expect } = require('@playwright/test');

test('basic app loading test', async ({ page }) => {
    // Navigate to the deployed app
    await page.goto('/chore_pwa_app.html');

    // Check that the app loads
    await expect(page.locator('h1')).toContainText('Chore Credit Tracker');

    // Check that the passphrase modal is visible
    await expect(page.locator('#secretPrompt')).toBeVisible();
});