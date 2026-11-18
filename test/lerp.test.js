'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { lerp } = require('../src/lerp');

test('returns the midpoint at t = 0.5', () => {
  assert.equal(lerp(0, 10, 0.5), 5);
});

test('returns a at t = 0 and b at t = 1', () => {
  assert.equal(lerp(0, 10, 0), 0);
  assert.equal(lerp(0, 10, 1), 10);
});

test('extrapolates when t is outside [0, 1]', () => {
  assert.equal(lerp(0, 10, 2), 20);
  assert.equal(lerp(0, 10, -1), -10);
});

test('rejects non-finite or non-number arguments in every position', () => {
  const bad = ['1', null, undefined, NaN, Infinity];
  for (const v of bad) {
    assert.throws(() => lerp(v, 10, 0.5), TypeError);
    assert.throws(() => lerp(0, v, 0.5), TypeError);
    assert.throws(() => lerp(0, 10, v), TypeError);
  }
});
