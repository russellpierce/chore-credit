/**
 * Test suite for passphrase cleaning functionality
 * Tests the cleanPassphrase function to ensure consistent UUID generation
 */

// Import the cleanPassphrase function from the utils module
const { cleanPassphrase } = require('../js/passphrase-utils.js');

// Test cases for passphrase cleaning
const testCases = [
    {
        input: 'MyPassphrase',
        expected: 'mypassphrase',
        description: 'CamelCase input'
    },
    {
        input: 'mypassphrase',
        expected: 'mypassphrase',
        description: 'Lowercase input'
    },
    {
        input: 'My Passphrase',
        expected: 'mypassphrase',
        description: 'Input with spaces'
    },
    {
        input: 'My-Passphrase!',
        expected: 'mypassphrase',
        description: 'Input with punctuation'
    },
    {
        input: '  My Passphrase  ',
        expected: 'mypassphrase',
        description: 'Input with leading/trailing whitespace'
    },
    {
        input: 'MY PASSPHRASE',
        expected: 'mypassphrase',
        description: 'Uppercase input with spaces'
    },
    {
        input: 'My.Passphrase!@#$%',
        expected: 'mypassphrase',
        description: 'Input with multiple punctuation marks'
    },
    {
        input: 'My   Passphrase',
        expected: 'mypassphrase',
        description: 'Input with multiple spaces'
    },
    {
        input: 'My-Pass_phrase',
        expected: 'mypassphrase',
        description: 'Input with hyphens and underscores'
    },
    {
        input: '',
        expected: 'ERROR',
        description: 'Empty string should throw error'
    },
    {
        input: '   ',
        expected: 'ERROR',
        description: 'Whitespace only should throw error'
    }
];

// Test runner
function runTests() {
    console.log('🧪 Running passphrase cleaning tests...\n');

    let passed = 0;
    let failed = 0;

    testCases.forEach((testCase, index) => {
        let result;
        let success = false;

        try {
            result = cleanPassphrase(testCase.input);
            success = result === testCase.expected;
        } catch (error) {
            // Check if we expected an error
            if (testCase.expected === 'ERROR') {
                // Verify it's the correct error type
                success = error instanceof TypeError;
                result = success ? 'ERROR (TypeError)' : `ERROR (wrong type: ${error.constructor.name})`;
            } else {
                success = false;
                result = `ERROR: ${error.message}`;
            }
        }

        if (success) {
            passed++;
            console.log(`✅ Test ${index + 1}: ${testCase.description}`);
            if (testCase.expected === 'ERROR') {
                console.log(`   Input: "${testCase.input}" -> ${result}`);
            } else {
                console.log(`   Input: "${testCase.input}" -> Output: "${result}"`);
            }
        } else {
            failed++;
            console.log(`❌ Test ${index + 1}: ${testCase.description}`);
            console.log(`   Input: "${testCase.input}"`);
            console.log(`   Expected: "${testCase.expected}"`);
            console.log(`   Got: "${result}"`);
        }
        console.log('');
    });

    console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);

    if (failed === 0) {
        console.log('🎉 All tests passed!');
        return true;
    } else {
        console.log('💥 Some tests failed!');
        return false;
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

// Export for use in other test files
module.exports = {
    testCases,
    runTests
};