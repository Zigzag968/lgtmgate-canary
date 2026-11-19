'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { clamp } = require('../src/clamp');

test('returns the value when inside the range', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('returns min when value is below min', () => {
  assert.equal(clamp(-5, 0, 10), 0);
});

test('returns max when value is above max', () => {
  assert.equal(clamp(15, 0, 10), 10);
});

test('returns the value when it equals a bound', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('accepts min equal to max', () => {
  assert.equal(clamp(7, 3, 3), 3);
});

test('rejects non-number arguments with TypeError in every position', () => {
  assert.throws(() => clamp('5', 0, 10), TypeError);
  assert.throws(() => clamp(5, '0', 10), TypeError);
  assert.throws(() => clamp(5, 0, '10'), TypeError);
  assert.throws(() => clamp(null, 0, 10), TypeError);
  assert.throws(() => clamp(undefined, 0, 10), TypeError);
});

test('rejects NaN and Infinity with TypeError in every position', () => {
  assert.throws(() => clamp(NaN, 0, 10), TypeError);
  assert.throws(() => clamp(5, NaN, 10), TypeError);
  assert.throws(() => clamp(5, 0, NaN), TypeError);
  assert.throws(() => clamp(Infinity, 0, 10), TypeError);
  assert.throws(() => clamp(5, -Infinity, 10), TypeError);
  assert.throws(() => clamp(5, 0, Infinity), TypeError);
});

test('throws RangeError when min is greater than max', () => {
  assert.throws(() => clamp(5, 10, 0), RangeError);
});

test('type checks take precedence over the range check', () => {
  assert.throws(() => clamp(5, 10, 'x'), TypeError);
});
