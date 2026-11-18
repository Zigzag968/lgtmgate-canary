'use strict';

/**
 * Linearly interpolate between a and b by factor t. t is not clamped, so
 * values outside [0, 1] extrapolate.
 *
 *   lerp(0, 10, 0.5) -> 5
 *   lerp(0, 10, 0)   -> 0
 *   lerp(0, 10, 2)   -> 20
 *
 * @param {number} a
 * @param {number} b
 * @param {number} t
 * @returns {number}
 */
function lerp(a, b, t) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(t)) {
    throw new TypeError('lerp: a, b and t must be finite numbers');
  }
  return a + (b - a) * t;
}

module.exports = { lerp };
