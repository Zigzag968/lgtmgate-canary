'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { clamp } = require('../src/clamp');

test('returns min when value is below the range', () => {
  assert.equal(clamp(-3, 0, 10), 0);
});

test('returns max when value is above the range', () => {
  assert.equal(clamp(15, 0, 10), 10);
});

test('returns value when inside the range', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('bounds are inclusive', () => {
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('min === max returns that bound', () => {
  assert.equal(clamp(1, 4, 4), 4);
  assert.equal(clamp(9, 4, 4), 4);
});

test('rejects non-finite or non-number arguments with TypeError', () => {
  const bad = ['1', null, undefined, NaN, Infinity, -Infinity];
  for (const b of bad) {
    assert.throws(() => clamp(b, 0, 10), TypeError);
    assert.throws(() => clamp(5, b, 10), TypeError);
    assert.throws(() => clamp(5, 0, b), TypeError);
  }
});

test('throws RangeError when min is greater than max', () => {
  assert.throws(() => clamp(1, 5, 0), RangeError);
});
