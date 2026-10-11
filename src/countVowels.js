'use strict';

/**
 * Count the vowels (a, e, i, o, u) in a string, case-insensitively.
 * Accented vowels are counted through NFD normalisation. Unlike wordCount,
 * a non-string input returns 0 instead of throwing.
 *
 *   countVowels("Hello")    -> 2
 *   countVowels("Éléphant") -> 3
 *   countVowels(42)         -> 0
 *
 * @param {string} text
 * @returns {number}
 */
function countVowels(text) {
  if (typeof text !== 'string') {
    return 0;
  }
  const matches = text.normalize('NFD').match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

module.exports = { countVowels };
