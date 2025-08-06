/**
 * Debug script to test UUID generation and identify the issue
 */

// Import the cleanPassphrase function
const { cleanPassphrase } = require('./js/passphrase-utils.js');

// Current implementation (copied from HTML)
async function generateUUIDFromPassphrase(passphrase) {
    // Clean the passphrase for consistency
    const cleanedPassphrase = cleanPassphrase(passphrase);

    // Convert passphrase to SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(cleanedPassphrase);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Take the first 32 characters and format as UUID
    const uuidHex = hashHex.substring(0, 32);

    // Format as UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    return `${uuidHex.substring(0, 8)}-${uuidHex.substring(8, 12)}-${uuidHex.substring(12, 16)}-${uuidHex.substring(16, 20)}-${uuidHex.substring(20, 32)}`;
}

// Test with the same passphrase that's failing
async function debugUUID() {
    console.log('🔍 Debugging UUID generation...\n');

    const testPassphrase = 'mypassphrase'; // This should produce the failing UUID

    try {
        const cleaned = cleanPassphrase(testPassphrase);
        console.log(`Input: "${testPassphrase}"`);
        console.log(`Cleaned: "${cleaned}"`);

        const uuid = await generateUUIDFromPassphrase(testPassphrase);
        console.log(`Generated UUID: ${uuid}`);
        console.log(`UUID length: ${uuid.length} characters`);
        console.log(`UUID without hyphens: ${uuid.replace(/-/g, '')}`);
        console.log(`UUID without hyphens length: ${uuid.replace(/-/g, '').length} characters`);

        // Compare with expected format
        const expected = '550e8400-e29b-41d4-a716-446655440000';
        console.log(`Expected format: ${expected}`);
        console.log(`Expected length: ${expected.length} characters`);
        console.log(`Expected without hyphens: ${expected.replace(/-/g, '')}`);
        console.log(`Expected without hyphens length: ${expected.replace(/-/g, '').length} characters`);

        // Check if it's a valid UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const isValid = uuidRegex.test(uuid);
        console.log(`Valid UUID format: ${isValid}`);

        // Check UUID version
        const version = uuid.substring(14, 15);
        console.log(`UUID version: ${version}`);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the debug
debugUUID().catch(console.error);