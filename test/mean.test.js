'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mean } = require('../src/mean');

test('averages several values', () => {
  assert.equal(mean([1, 2, 3]), 2);
});

test('returns the single value for a one-element array', () => {
  assert.equal(mean([5]), 5);
});

test('returns a fractional result', () => {
  assert.equal(mean([1, 2]), 1.5);
});

test('rejects non-array input with TypeError', () => {
  assert.throws(() => mean(42), TypeError);
  assert.throws(() => mean(null), TypeError);
  assert.throws(() => mean(undefined), TypeError);
  assert.throws(() => mean('123'), TypeError);
});

test('rejects an empty array with TypeError', () => {
  assert.throws(() => mean([]), TypeError);
});

test('rejects NaN and Infinity with TypeError', () => {
  assert.throws(() => mean([1, NaN]), TypeError);
  assert.throws(() => mean([1, Infinity]), TypeError);
  assert.throws(() => mean([-Infinity]), TypeError);
});

test('rejects non-number elements with TypeError', () => {
  assert.throws(() => mean([1, '1']), TypeError);
  assert.throws(() => mean([1, null]), TypeError);
});

test('rejects sparse arrays with TypeError', () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.throws(() => mean([1, , 3]), TypeError);
});
