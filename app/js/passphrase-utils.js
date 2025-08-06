/**
 * Passphrase utilities for consistent UUID generation
 * Provides functions for cleaning and normalizing passphrases
 */

/**
 * Clean passphrase for consistent UUID generation
 * @param {string} passphrase - The raw passphrase input
 * @returns {string} - The cleaned passphrase
 * @throws {TypeError} - If passphrase is empty or whitespace-only after cleaning
 */
function cleanPassphrase(passphrase) {
    const cleaned = passphrase
        .toLowerCase()                    // Convert to lowercase
        .replace(/[^\w\s]/g, '')          // Remove punctuation (but keep word chars and spaces)
        .replace(/[_\s]/g, '')            // Remove underscores and all whitespace
        .trim();                          // Trim any remaining whitespace

    if (!cleaned) {
        throw new TypeError('Passphrase cannot be empty or whitespace-only');
    }

    return cleaned;
}

// Export for Node.js environments (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cleanPassphrase
    };
}