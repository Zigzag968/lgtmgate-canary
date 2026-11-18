'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { clamp } = require('../src/clamp');

test('returns min when value is below range', () => {
  assert.equal(clamp(-2, 0, 3), 0);
});

test('returns max when value is above range', () => {
  assert.equal(clamp(5, 0, 3), 3);
});

test('returns value when inside range', () => {
  assert.equal(clamp(2, 0, 3), 2);
});

test('returns the bound when value equals min or max', () => {
  assert.equal(clamp(0, 0, 3), 0);
  assert.equal(clamp(3, 0, 3), 3);
});

test('allows min equal to max', () => {
  assert.equal(clamp(9, 2, 2), 2);
});

test('throws TypeError for non-number arguments in any position', () => {
  assert.throws(() => clamp('5', 0, 3), TypeError);
  assert.throws(() => clamp(1, '0', 3), TypeError);
  assert.throws(() => clamp(1, 0, '3'), TypeError);
});

test('throws TypeError for NaN and Infinity in any position', () => {
  assert.throws(() => clamp(NaN, 0, 3), TypeError);
  assert.throws(() => clamp(1, NaN, 3), TypeError);
  assert.throws(() => clamp(1, 0, NaN), TypeError);
  assert.throws(() => clamp(Infinity, 0, 3), TypeError);
});

test('throws RangeError when min is greater than max', () => {
  assert.throws(() => clamp(1, 3, 0), RangeError);
});

test('NaN min yields TypeError rather than RangeError', () => {
  assert.throws(() => clamp(1, NaN, 0), TypeError);
});
