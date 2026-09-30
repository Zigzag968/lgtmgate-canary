'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { slugify } = require('../src/slugify');

test('lowercases and joins words with a single hyphen', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('strips punctuation and trailing separators', () => {
  assert.equal(slugify('Release 1.2.0!'), 'release-1-2-0');
});

test('keeps digits', () => {
  assert.equal(slugify('node 22 is here'), 'node-22-is-here');
});

test('transliterates accents and collapses double space', () => {
  assert.equal(slugify('Héllo  Wörld!'), 'hello-world');
});

test('transliterates a multi-word accented phrase', () => {
  assert.equal(slugify('Crème brûlée à la façon'), 'creme-brulee-a-la-facon');
});

test('collapses runs of spaces', () => {
  assert.equal(slugify('a   b'), 'a-b');
});

test('collapses mixed whitespace (tab, newline)', () => {
  assert.equal(slugify('a\t\n b'), 'a-b');
});

test('trims edge whitespace and handles empty string', () => {
  assert.equal(slugify('  Hello  '), 'hello');
  assert.equal(slugify(''), '');
});

test('rejects non-string input', () => {
  assert.throws(() => slugify(42), TypeError);
});
