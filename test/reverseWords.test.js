'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { reverseWords } = require('../src/reverseWords');

test('reverses the words of a simple sentence', () => {
  assert.equal(reverseWords('a b c'), 'c b a');
});

test('collapses extra whitespace and trims the edges', () => {
  assert.equal(reverseWords('  a   b '), 'b a');
});

test('treats tabs and newlines as separators', () => {
  assert.equal(reverseWords('a\tb\nc'), 'c b a');
});

test('returns the empty string for empty and whitespace-only input', () => {
  assert.equal(reverseWords(''), '');
  assert.equal(reverseWords(' \t\n '), '');
});

test('returns a single word unchanged', () => {
  assert.equal(reverseWords('hello'), 'hello');
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => reverseWords(42), TypeError);
  assert.throws(() => reverseWords(null), TypeError);
  assert.throws(() => reverseWords(undefined), TypeError);
});
