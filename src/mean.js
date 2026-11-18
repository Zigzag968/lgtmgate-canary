'use strict';

/**
 * Compute the arithmetic mean of a non-empty array of finite numbers.
 * Throws a TypeError for non-arrays, empty arrays, sparse arrays, and any
 * element that is not a finite number (NaN, Infinity and strings included).
 *
 *   mean([1, 2, 3]) -> 2
 *   mean([5])       -> 5
 *   mean([1, 2])    -> 1.5
 *
 * @param {number[]} values
 * @returns {number}
 */
function mean(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new TypeError('mean: values must be a non-empty array of finite numbers');
  }
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    if (!Number.isFinite(values[i])) {
      throw new TypeError('mean: values must be a non-empty array of finite numbers');
    }
    sum += values[i];
  }
  return sum / values.length;
}

module.exports = { mean };
