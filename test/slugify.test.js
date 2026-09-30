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

test('rejects non-string input', () => {
  assert.throws(() => slugify(42), TypeError);
});
