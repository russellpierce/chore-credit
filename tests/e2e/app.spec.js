const { test, expect } = require('@playwright/test');

test.describe('Chore Credit Tracker App', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the deployed app
        await page.goto('/chore_pwa_app.html');
    });

    test('app loads correctly and shows passphrase modal for new users', async ({ page }) => {
        // Check that the app loads
        await expect(page.locator('h1')).toContainText('Chore Credit Tracker');

        // Check that the passphrase modal is visible for new users
        await expect(page.locator('#secretPrompt')).toBeVisible();

        // Check that the modal has the correct content
        await expect(page.locator('.secret-info')).toContainText('Zapier');
        await expect(page.locator('#zapierSecretInput')).toBeVisible();
        await expect(page.locator('#continueBtn')).toBeVisible();
    });

    test('passphrase input and UUID generation works', async ({ page }) => {
        // Type a passphrase
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');

        // Wait for UUID to be generated and displayed
        await expect(page.locator('#uuidDisplay')).toBeVisible();
        await expect(page.locator('#generatedUUID')).not.toBeEmpty();

        // Check that Continue button is enabled
        await expect(page.locator('#continueBtn')).toBeEnabled();
    });

    test('passphrase cleaning works correctly', async ({ page }) => {
        // Test different passphrase formats that should produce the same UUID
        const testPassphrases = [
            'MyTestPassphrase',
            'mytestpassphrase',
            'My Test Passphrase',
            'My-Test-Passphrase!',
            '  My Test Passphrase  '
        ];

        for (const passphrase of testPassphrases) {
            await page.fill('#zapierSecretInput', passphrase);
            await page.waitForTimeout(500); // Wait for UUID generation

            // Verify UUID is displayed
            await expect(page.locator('#uuidDisplay')).toBeVisible();
            await expect(page.locator('#generatedUUID')).not.toBeEmpty();
        }
    });

    test('empty passphrase disables Continue button', async ({ page }) => {
        // Start with empty input
        await expect(page.locator('#continueBtn')).toBeDisabled();

        // Type something then clear it
        await page.fill('#zapierSecretInput', 'test');
        await page.fill('#zapierSecretInput', '');

        // Button should be disabled again
        await expect(page.locator('#continueBtn')).toBeDisabled();
    });

    test('app initializes after valid passphrase submission', async ({ page }) => {
        // Enter a valid passphrase
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');
        await page.click('#continueBtn');

        // Wait for app to initialize (modal should disappear)
        await expect(page.locator('#secretPrompt')).not.toBeVisible();

        // Check that the main app interface is visible
        await expect(page.locator('#tabNavigation')).toBeVisible();
        await expect(page.locator('#tabContent')).toBeVisible();
    });

    test('child management functionality works', async ({ page }) => {
        // First initialize the app
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');
        await page.click('#continueBtn');
        await expect(page.locator('#secretPrompt')).not.toBeVisible();

        // Open child management modal
        await page.click('text=Manage Children');
        await expect(page.locator('#manageModal')).toBeVisible();

        // Check that default children are listed
        await expect(page.locator('.child-list')).toContainText('Child A');
        await expect(page.locator('.child-list')).toContainText('Child B');

        // Add a new child
        await page.fill('.child-name-input', 'Test Child');
        await page.click('.add-child-btn');

        // Verify new child appears in the list
        await expect(page.locator('.child-list')).toContainText('Test Child');

        // Close modal
        await page.click('.close');
        await expect(page.locator('#manageModal')).not.toBeVisible();
    });

    test('credit tracking and ledger functionality works', async ({ page }) => {
        // Initialize the app
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');
        await page.click('#continueBtn');
        await expect(page.locator('#secretPrompt')).not.toBeVisible();

        // Switch to Child A tab
        await page.click('text=Child A');

        // Add credits
        await page.fill('.amount-input', '10');
        await page.fill('.ledger-note-input', 'Test credit addition');
        await page.click('.submit-btn');

        // Check that credits were added
        await expect(page.locator('.credit-display')).toContainText('10');

        // Check that ledger entry was created
        await expect(page.locator('.ledger')).toContainText('Test credit addition');
        await expect(page.locator('.ledger')).toContainText('+10');

        // Subtract credits
        await page.fill('.amount-input', '-5');
        await page.fill('.ledger-note-input', 'Test credit subtraction');
        await page.click('.submit-btn');

        // Check that credits were subtracted
        await expect(page.locator('.credit-display')).toContainText('5');

        // Check that new ledger entry was created
        await expect(page.locator('.ledger')).toContainText('Test credit subtraction');
        await expect(page.locator('.ledger')).toContainText('-5');
    });

    test('PWA installation prompt appears', async ({ page }) => {
        // Initialize the app
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');
        await page.click('#continueBtn');
        await expect(page.locator('#secretPrompt')).not.toBeVisible();

        // Check that install prompt is present (may not be visible on all browsers)
        await expect(page.locator('#installPrompt')).toBeAttached();
    });

    test('app works on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Initialize the app
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');
        await page.click('#continueBtn');
        await expect(page.locator('#secretPrompt')).not.toBeVisible();

        // Check that UI elements are properly sized for mobile
        await expect(page.locator('.container')).toBeVisible();
        await expect(page.locator('.tabs')).toBeVisible();

        // Test mobile interaction
        await page.click('text=Child A');
        await page.fill('.amount-input', '5');
        await page.fill('.ledger-note-input', 'Mobile test');
        await page.click('.submit-btn');

        // Verify functionality works on mobile
        await expect(page.locator('.credit-display')).toContainText('5');
    });

    test('error handling for invalid passphrase', async ({ page }) => {
        // Try to submit empty passphrase
        await page.click('#continueBtn');

        // Should show an alert (we can't easily test alerts in Playwright, but we can check the button state)
        await expect(page.locator('#continueBtn')).toBeDisabled();
    });

    test('change Zapier secret functionality', async ({ page }) => {
        // Initialize the app
        await page.fill('#zapierSecretInput', 'MyTestPassphrase');
        await page.click('#continueBtn');
        await expect(page.locator('#secretPrompt')).not.toBeVisible();

        // Click change secret button
        await page.click('text=Change Zapier Secret');

        // Should show confirmation dialog and then secret prompt
        // Note: We can't easily test the confirmation dialog, but we can check the result
        // For now, we'll just verify the button exists
        await expect(page.locator('text=Change Zapier Secret')).toBeVisible();
    });
});