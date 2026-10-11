'use strict';

/**
 * Reverse the order of the whitespace-separated words in a string.
 * Runs of whitespace collapse to a single space; empty or
 * whitespace-only input returns an empty string.
 *
 *   reverseWords("Ada Lovelace")       -> "Lovelace Ada"
 *   reverseWords(" a  b\tc\nd ")       -> "d c b a"
 *   reverseWords("   ")                -> ""
 *
 * @param {string} text
 * @returns {string}
 */
function reverseWords(text) {
  if (typeof text !== 'string') {
    throw new TypeError('reverseWords: text must be a string');
  }
  return text.trim().split(/\s+/).filter(Boolean).reverse().join(' ');
}

module.exports = { reverseWords };
