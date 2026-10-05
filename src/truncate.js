'use strict';

/**
 * Truncate text to at most `max` Unicode code points, ending with an ellipsis.
 *
 * If the text has `max` code points or fewer it is returned unchanged.
 * Otherwise the first `max - 1` code points are kept, trailing whitespace before
 * the cut is removed, and a single "…" (one code point) is appended.
 *
 * The result therefore has at most `max` code points: exactly `max` whenever
 * the cut does not end in whitespace; whitespace removal wins over the exact
 * length otherwise:
 *   truncate("Release notes", 8) -> "Release…"
 *   truncate("Release notes", 9) -> "Release…"
 *
 * @param {string} text
 * @param {number} max positive integer
 * @returns {string}
 */
function truncate(text, max) {
  if (typeof text !== 'string') {
    throw new TypeError('truncate: text must be a string');
  }
  if (!Number.isInteger(max) || max < 1) {
    throw new RangeError('truncate: max must be a positive integer');
  }
  const chars = Array.from(text);
  if (chars.length <= max) {
    return text;
  }
  return chars.slice(0, max - 1).join('').trimEnd() + '…';
}

module.exports = { truncate };
