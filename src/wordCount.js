'use strict';

/**
 * Return the number of whitespace-separated words in a string.
 *
 *   wordCount("Ada Lovelace")       -> 2
 *   wordCount(" a  b\tc\nd ")       -> 4
 *   wordCount("   ")                -> 0
 *
 * @param {string} text
 * @returns {number}
 */
function wordCount(text) {
  if (typeof text !== 'string') {
    throw new TypeError('wordCount: text must be a string');
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

module.exports = { wordCount };
