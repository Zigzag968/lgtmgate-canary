'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { reverseWords } = require('../src/reverseWords');

test('returns an empty string for an empty string', () => {
  assert.equal(reverseWords(''), '');
});

test('returns an empty string for whitespace only', () => {
  assert.equal(reverseWords('   '), '');
});

test('returns a single word unchanged', () => {
  assert.equal(reverseWords('hello'), 'hello');
});

test('reverses two words', () => {
  assert.equal(reverseWords('Ada Lovelace'), 'Lovelace Ada');
});

test('collapses runs of spaces, tabs and newlines to one space', () => {
  assert.equal(reverseWords(' a  b\tc\nd '), 'd c b a');
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => reverseWords(42), TypeError);
  assert.throws(() => reverseWords(null), TypeError);
  assert.throws(() => reverseWords(undefined), TypeError);
});
