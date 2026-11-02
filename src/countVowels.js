'use strict';

/**
 * Count the ASCII vowels (a, e, i, o, u) in a string, ignoring case.
 * Accented vowels and "y" are not counted.
 *
 *   countVowels("Hello")  -> 2
 *   countVowels("RHYTHM") -> 0
 *   countVowels("")       -> 0
 *
 * @param {string} text
 * @returns {number}
 */
function countVowels(text) {
  if (typeof text !== 'string') {
    throw new TypeError('countVowels: text must be a string');
  }
  return (text.match(/[aeiou]/gi) || []).length;
}

module.exports = { countVowels };
