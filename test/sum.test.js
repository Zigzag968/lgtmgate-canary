'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { sum } = require('../src/sum');

test('sums several values', () => {
  assert.equal(sum([1, 2, 3]), 6);
});

test('returns 0 for an empty array', () => {
  assert.equal(sum([]), 0);
});

test('handles negatives', () => {
  assert.equal(sum([-1, -2, 3]), 0);
  assert.equal(sum([-1, -2, -3]), -6);
});

test('rejects a non-array with TypeError', () => {
  assert.throws(() => sum(42), TypeError);
  assert.throws(() => sum(null), TypeError);
  assert.throws(() => sum(undefined), TypeError);
  assert.throws(() => sum('123'), TypeError);
});

test('rejects a non-finite-number element with TypeError', () => {
  assert.throws(() => sum([1, '2']), TypeError);
  assert.throws(() => sum([1, NaN]), TypeError);
  assert.throws(() => sum([1, Infinity]), TypeError);
  assert.throws(() => sum([null]), TypeError);
});

test('rejects holes in sparse arrays', () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.throws(() => sum([1, , 3]), TypeError);
});
