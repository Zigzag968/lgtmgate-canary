'use strict';

/**
 * Return the uppercase initials of a name: the first Unicode code point of
 * each whitespace-separated word, uppercased and concatenated.
 *
 *   initials("Ada Lovelace")        -> "AL"
 *   initials("  jean-paul sartre ") -> "JS"
 *   initials("")                    -> ""
 *
 * @param {string} name
 * @returns {string}
 */
function initials(name) {
  if (typeof name !== 'string') {
    throw new TypeError('initials: name must be a string');
  }
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.map((w) => Array.from(w)[0].toUpperCase()).join('');
}

module.exports = { initials };
