'use strict';

/**
 * Clamp a number into the inclusive range [min, max].
 * All arguments must be finite numbers (numeric strings are rejected) and
 * min must not exceed max (min === max is valid).
 *
 *   clamp(15, 0, 10) -> 10
 *   clamp(-5, 0, 10) -> 0
 *   clamp(5, 0, 10)  -> 5
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @throws {TypeError} when an argument is not a finite number
 * @throws {RangeError} when min is greater than max
 */
function clamp(value, min, max) {
  const args = { value, min, max };
  for (const name of Object.keys(args)) {
    const x = args[name];
    if (typeof x !== 'number' || !Number.isFinite(x)) {
      throw new TypeError(`clamp: ${name} must be a finite number`);
    }
  }
  if (min > max) {
    throw new RangeError('clamp: min must not exceed max');
  }
  return value < min ? min : value > max ? max : value;
}

module.exports = { clamp };
