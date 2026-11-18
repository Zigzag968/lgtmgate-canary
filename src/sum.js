'use strict';

/**
 * Sum an array of finite numbers. An empty array sums to 0.
 * Strings are not coerced; NaN and Infinity are rejected.
 *
 *   sum([1, 2, 3]) -> 6
 *   sum([])        -> 0
 *   sum([-1, 1])   -> 0
 *
 * @param {number[]} values
 * @returns {number}
 */
function sum(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('sum: values must be an array');
  }
  let total = 0;
  for (let i = 0; i < values.length; i += 1) {
    const el = values[i];
    if (!Number.isFinite(el)) {
      throw new TypeError('sum: every element must be a finite number');
    }
    total += el;
  }
  return total;
}

module.exports = { sum };
