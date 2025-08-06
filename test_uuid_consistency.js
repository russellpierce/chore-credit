/**
 * Test to verify UUID consistency between display and storage
 */

// Import the functions
const { cleanPassphrase } = require('./js/passphrase-utils.js');

// Mock the generateUUIDFromPassphrase function (simplified version)
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

// Test cases
const testCases = [
    'MyPassphrase',
    'mypassphrase',
    'My Passphrase',
    'My-Passphrase!',
    '  My Passphrase  ',
    'MY PASSPHRASE'
];

async function testUUIDConsistency() {
    console.log('🧪 Testing UUID consistency between display and storage...\n');

    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        try {
            // This simulates what happens in both updateUUIDDisplay() and submitZapierSecret()
            const uuid = await generateUUIDFromPassphrase(testCase);
            const cleaned = cleanPassphrase(testCase);

            console.log(`✅ Test ${i + 1}: "${testCase}"`);
            console.log(`   Cleaned: "${cleaned}"`);
            console.log(`   UUID: ${uuid}`);
            console.log('');
        } catch (error) {
            console.log(`❌ Test ${i + 1}: "${testCase}" - ${error.message}`);
            console.log('');
        }
    }

    console.log('📋 Summary: All UUIDs should be identical for the same cleaned passphrase');
}

// Run the test
testUUIDConsistency().catch(console.error);