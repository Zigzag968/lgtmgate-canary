'use strict';

/**
 * Median of an array of finite numbers. The input array is not modified.
 * An even-length array yields the mean of the two middle values.
 *
 *   median([3, 1, 2])    -> 2
 *   median([1, 2, 3, 4]) -> 2.5
 *   median([7])          -> 7
 *
 * @param {number[]} numbers non-empty array of finite numbers
 * @returns {number}
 */
function median(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('median: numbers must be an array');
  }
  if (numbers.length === 0) {
    throw new TypeError('median: numbers must not be empty');
  }
  for (const x of numbers) {
    if (typeof x !== 'number' || !Number.isFinite(x)) {
      throw new TypeError('median: every element must be a finite number');
    }
  }
  const sorted = numbers.slice().sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

module.exports = { median };
