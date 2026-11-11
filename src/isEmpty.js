'use strict';

/**
 * Return true when a string is empty or contains only whitespace
 * (Unicode-aware).
 *
 *   isEmpty("")       -> true
 *   isEmpty("  \t\n") -> true
 *   isEmpty(" a ")    -> false
 *
 * @param {string} text
 * @returns {boolean}
 */
function isEmpty(text) {
  if (typeof text !== 'string') {
    throw new TypeError('isEmpty: text must be a string');
  }
  return /^\s*$/u.test(text);
}

module.exports = { isEmpty };
