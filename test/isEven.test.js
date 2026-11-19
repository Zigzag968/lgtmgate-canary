'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isEven } = require('../src/isEven');

test('returns true for even numbers', () => {
  assert.equal(isEven(4), true);
  assert.equal(isEven(0), true);
});

test('returns false for odd numbers', () => {
  assert.equal(isEven(7), false);
});

test('handles negative integers', () => {
  assert.equal(isEven(-4), true);
  assert.equal(isEven(-3), false);
});

test('rejects non-number input with TypeError', () => {
  assert.throws(() => isEven('4'), TypeError);
  assert.throws(() => isEven(null), TypeError);
  assert.throws(() => isEven(undefined), TypeError);
});

test('rejects non-integer numbers with TypeError', () => {
  assert.throws(() => isEven(NaN), TypeError);
  assert.throws(() => isEven(Infinity), TypeError);
  assert.throws(() => isEven(-Infinity), TypeError);
  assert.throws(() => isEven(2.5), TypeError);
});
