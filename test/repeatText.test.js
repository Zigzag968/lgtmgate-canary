'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { repeatText } = require('../src/repeatText');

test('repeats text n times', () => {
  assert.equal(repeatText('ab', 3), 'ababab');
});

test('returns empty string when n is 0', () => {
  assert.equal(repeatText('ab', 0), '');
});

test('returns empty string for empty text', () => {
  assert.equal(repeatText('', 5), '');
});

test('rejects negative n with RangeError', () => {
  assert.throws(() => repeatText('ab', -1), RangeError);
});

test('rejects non-integer n with RangeError', () => {
  assert.throws(() => repeatText('ab', 1.5), RangeError);
  assert.throws(() => repeatText('ab', NaN), RangeError);
  assert.throws(() => repeatText('ab', Infinity), RangeError);
});

test('rejects non-string text with TypeError', () => {
  assert.throws(() => repeatText(42, 2), TypeError);
  assert.throws(() => repeatText(null, 2), TypeError);
  assert.throws(() => repeatText(undefined, 2), TypeError);
});
