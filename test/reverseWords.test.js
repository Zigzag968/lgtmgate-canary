'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { reverseWords } = require('../src/reverseWords');

test('reverses several words', () => {
  assert.equal(reverseWords('a b c'), 'c b a');
});

test('returns a single word unchanged', () => {
  assert.equal(reverseWords('hello'), 'hello');
});

test('collapses repeated and surrounding whitespace', () => {
  assert.equal(reverseWords('  a \t b\n c  '), 'c b a');
});

test('returns an empty string for an empty string', () => {
  assert.equal(reverseWords(''), '');
});

test('returns an empty string for whitespace only', () => {
  assert.equal(reverseWords('   '), '');
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => reverseWords(42), TypeError);
  assert.throws(() => reverseWords(null), TypeError);
  assert.throws(() => reverseWords(undefined), TypeError);
});
