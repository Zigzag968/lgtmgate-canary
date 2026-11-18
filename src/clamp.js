'use strict';

/**
 * Constrain a number to the inclusive range [min, max].
 *
 *   clamp(-2, 0, 3) -> 0
 *   clamp(5, 0, 3)  -> 3
 *   clamp(2, 0, 3)  -> 2
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @throws {TypeError} when any argument is not a finite number
 * @throws {RangeError} when min is greater than max
 */
function clamp(value, min, max) {
  for (const x of [value, min, max]) {
    if (typeof x !== 'number' || !Number.isFinite(x)) {
      throw new TypeError('clamp: value, min and max must be finite numbers');
    }
  }
  if (min > max) {
    throw new RangeError('clamp: min must not be greater than max');
  }
  return Math.min(Math.max(value, min), max);
}

module.exports = { clamp };
