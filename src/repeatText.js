'use strict';

/**
 * Repeat a string n times.
 *
 *   repeatText("ab", 3) -> "ababab"
 *   repeatText("ab", 0) -> ""
 *   repeatText("", 5)   -> ""
 *
 * @param {string} text
 * @param {number} n non-negative integer
 * @returns {string}
 */
function repeatText(text, n) {
  if (typeof text !== 'string') {
    throw new TypeError('repeatText: text must be a string');
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('repeatText: n must be a non-negative integer');
  }
  return text.repeat(n);
}

module.exports = { repeatText };
