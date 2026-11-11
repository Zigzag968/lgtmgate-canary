'use strict';

/**
 * Return true when two strings contain the same letters and digits with the
 * same multiplicities, ignoring case and any character that is not a letter
 * or a digit (Unicode-aware).
 *
 *   isAnagram("Listen", "Silent")          -> true
 *   isAnagram("Dormitory", "dirty room")   -> true
 *   isAnagram("hello", "world")            -> false
 *
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function isAnagram(a, b) {
  if (typeof a !== 'string') {
    throw new TypeError('isAnagram: a must be a string');
  }
  if (typeof b !== 'string') {
    throw new TypeError('isAnagram: b must be a string');
  }
  const normalise = (s) => Array.from(s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ''));
  const left = normalise(a).sort();
  const right = normalise(b).sort();
  if (left.length !== right.length) {
    return false;
  }
  return left.every((c, i) => c === right[i]);
}

module.exports = { isAnagram };
