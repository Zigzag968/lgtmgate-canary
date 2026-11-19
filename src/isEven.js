'use strict';

/**
 * Tell whether an integer is even.
 * Throws a TypeError for anything that is not an integer number
 * (strings are not coerced).
 *
 *   isEven(4)  -> true
 *   isEven(7)  -> false
 *   isEven(-3) -> false
 *
 * @param {number} n
 * @returns {boolean}
 */
function isEven(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('isEven: n must be an integer');
  }
  return n % 2 === 0;
}

module.exports = { isEven };
