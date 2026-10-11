'use strict';

/**
 * Return true when a string reads the same forwards and backwards, ignoring
 * case and any character that is not a letter or a digit (Unicode-aware).
 *
 *   isPalindrome("A man, a plan, a canal: Panama") -> true
 *   isPalindrome("hello")                          -> false
 *   isPalindrome("")                               -> true
 *
 * @param {string} text
 * @returns {boolean}
 */
function isPalindrome(text) {
  if (typeof text !== 'string') {
    throw new TypeError('isPalindrome: text must be a string');
  }
  const chars = Array.from(text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ''));
  return chars.every((c, i) => c === chars[chars.length - 1 - i]);
}

module.exports = { isPalindrome };
