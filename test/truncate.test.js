'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { truncate } = require('../src/truncate');

test('returns text unchanged when shorter than max', () => {
  assert.equal(truncate('Release notes', 20), 'Release notes');
});

test('returns text unchanged when exactly max code points', () => {
  assert.equal(truncate('Release', 7), 'Release');
});

test('cuts and appends an ellipsis', () => {
  assert.equal(truncate('Release notes', 8), 'Release…');
});

test('max of 1 yields only the ellipsis', () => {
  assert.equal(truncate('Release notes', 1), '…');
});

test('removes trailing whitespace before the cut', () => {
  assert.equal(truncate('Release notes', 9), 'Release…');
});

test('counts code points, not UTF-16 units', () => {
  const result = truncate('😀😀😀😀', 3);
  assert.equal(result, '😀😀…');
  assert.equal(Array.from(result).length, 3);
});

test('rejects invalid max with RangeError', () => {
  for (const bad of [0, -1, 1.5, NaN, '3', Infinity]) {
    assert.throws(() => truncate('abc', bad), RangeError, String(bad));
  }
});

test('rejects non-string text with TypeError', () => {
  for (const bad of [null, 42, undefined]) {
    assert.throws(() => truncate(bad, 3), TypeError, String(bad));
  }
});
