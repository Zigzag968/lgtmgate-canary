'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { countVowels } = require('../src/countVowels');

test('returns 0 for an empty string', () => {
  assert.equal(countVowels(''), 0);
});

test('returns 0 when there are no vowels', () => {
  assert.equal(countVowels('rhythm'), 0);
});

test('counts vowels in a plain word', () => {
  assert.equal(countVowels('Hello'), 2);
});

test('is case-insensitive', () => {
  assert.equal(countVowels('AEIOU'), 5);
  assert.equal(countVowels('aEiOu'), 5);
});

test('counts accented vowels', () => {
  assert.equal(countVowels('Éléphant'), 3);
  assert.equal(countVowels('àéîõü'), 5);
});

test('precomposed and decomposed forms give the same result', () => {
  assert.equal(countVowels('é'), 1);
  assert.equal(countVowels('é'), 1);
});

test('does not count y as a vowel', () => {
  assert.equal(countVowels('sky'), 0);
});

test('returns 0 for non-string input', () => {
  for (const value of [42, null, undefined, {}, [], true]) {
    assert.equal(countVowels(value), 0);
  }
});
