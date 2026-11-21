'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { median } = require('../src/median');

test('median: odd length', () => {
  assert.equal(median([3, 1, 2]), 2);
});

test('median: even length averages the middle pair', () => {
  assert.equal(median([1, 2, 3, 4]), 2.5);
});

test('median: one element', () => {
  assert.equal(median([7]), 7);
});

test('median: unsorted input (numeric, not lexicographic)', () => {
  assert.equal(median([9, 1, 5, 3, 7]), 5);
  assert.equal(median([10, 9, 100]), 10);
});

test('median: negative numbers', () => {
  assert.equal(median([-5, -1, -3]), -3);
  assert.equal(median([-2, 2]), 0);
});

test('median: leaves the input array unchanged', () => {
  const a = [3, 1, 2];
  median(a);
  assert.deepEqual(a, [3, 1, 2]);
});

test('median: throws TypeError on invalid input', () => {
  for (const bad of [42, null, undefined, 'abc', [], [1, '2'], [1, NaN], [1, Infinity], [-Infinity]]) {
    assert.throws(() => median(bad), TypeError);
  }
});
