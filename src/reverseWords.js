'use strict';

/**
 * Reverse the order of the words in a string. Words are separated by any run
 * of whitespace; the result is joined with single spaces and has no leading or
 * trailing whitespace.
 *
 *   reverseWords("a b c")      -> "c b a"
 *   reverseWords("  a   b ")   -> "b a"
 *   reverseWords("")           -> ""
 *
 * @param {string} text
 * @returns {string}
 */
function reverseWords(text) {
  if (typeof text !== 'string') {
    throw new TypeError('reverseWords: text must be a string');
  }
  return text.split(/\s+/).filter(Boolean).reverse().join(' ');
}

module.exports = { reverseWords };
