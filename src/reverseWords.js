'use strict';

/**
 * Return the words of a string in reverse order, joined by single spaces.
 *
 *   reverseWords("a b c")           -> "c b a"
 *   reverseWords("  a \t b\n c  ")  -> "c b a"
 *   reverseWords("   ")             -> ""
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
