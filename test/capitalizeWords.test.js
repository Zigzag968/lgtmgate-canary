'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { capitalizeWords } = require('../src/capitalizeWords');

test('returns an empty string unchanged', () => {
  assert.equal(capitalizeWords(''), '');
});

test('capitalizes a single word', () => {
  assert.equal(capitalizeWords('hELLO'), 'Hello');
});

test('normalizes mixed case across words', () => {
  assert.equal(capitalizeWords('hELLO wORLD'), 'Hello World');
});

test('preserves runs of spaces, leading and trailing whitespace', () => {
  assert.equal(capitalizeWords(' ada  lovelace '), ' Ada  Lovelace ');
});

test('preserves tabs and newlines between words', () => {
  assert.equal(capitalizeWords('a\t\tb\nc'), 'A\t\tB\nC');
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => capitalizeWords(42), TypeError);
  assert.throws(() => capitalizeWords(null), TypeError);
  assert.throws(() => capitalizeWords(undefined), TypeError);
});
