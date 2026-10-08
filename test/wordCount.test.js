'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { wordCount } = require('../src/wordCount');

test('returns 0 for an empty string', () => {
  assert.equal(wordCount(''), 0);
});

test('returns 0 for whitespace only', () => {
  assert.equal(wordCount('   '), 0);
});

test('treats runs of spaces, tabs and newlines as one separator', () => {
  assert.equal(wordCount(' a  b\tc\nd '), 4);
});

test('counts a single word', () => {
  assert.equal(wordCount('hello'), 1);
});

test('counts two words', () => {
  assert.equal(wordCount('Ada Lovelace'), 2);
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => wordCount(42), TypeError);
  assert.throws(() => wordCount(null), TypeError);
  assert.throws(() => wordCount(undefined), TypeError);
});
