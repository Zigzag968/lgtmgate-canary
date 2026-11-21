'use strict';

/**
 * Clamp `value` into the inclusive range [min, max].
 *
 *   clamp(15, 0, 10) -> 10
 *   clamp(-3, 0, 10) -> 0
 *   clamp(5, 0, 10) -> 5
 *
 * @param {number} value finite number
 * @param {number} min finite number, must be <= max
 * @param {number} max finite number
 * @returns {number}
 * @throws {TypeError} if any argument is not a finite number
 * @throws {RangeError} if min is greater than max
 */
function clamp(value, min, max) {
  for (const n of [value, min, max]) {
    if (typeof n !== 'number' || !Number.isFinite(n)) {
      throw new TypeError('clamp: value, min and max must be finite numbers');
    }
  }
  if (min > max) {
    throw new RangeError('clamp: min must be less than or equal to max');
  }
  return Math.min(Math.max(value, min), max);
}

module.exports = { clamp };
