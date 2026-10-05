'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { initials } = require('../src/initials');

test('takes the first letter of each of two words', () => {
  assert.equal(initials('Ada Lovelace'), 'AL');
});

test('ignores extra whitespace', () => {
  assert.equal(initials('  jean-paul   sartre '), 'JS');
});

test('does not split hyphenated words', () => {
  assert.equal(initials('Jean-Paul'), 'J');
});

test('uppercases lowercase input', () => {
  assert.equal(initials('ada lovelace'), 'AL');
});

test('uppercases an accented first letter', () => {
  assert.equal(initials('élodie émile'), 'ÉÉ');
});

test('keeps an emoji first character as one code point', () => {
  const result = initials('😀 smile');
  assert.equal(result, '😀S');
  assert.equal(Array.from(result).length, 2);
});

test('returns an empty string for an empty name', () => {
  assert.equal(initials(''), '');
});

test('returns an empty string for whitespace only', () => {
  assert.equal(initials(' \t\n '), '');
});

test('rejects non-string name with TypeError', () => {
  assert.throws(() => initials(42), TypeError);
  assert.throws(() => initials(null), TypeError);
  assert.throws(() => initials(undefined), TypeError);
});
