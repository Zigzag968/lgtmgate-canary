'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isAnagram } = require('../src/isAnagram');

test('accepts a classic anagram pair, ignoring case', () => {
  assert.equal(isAnagram('Listen', 'Silent'), true);
});

test('ignores punctuation and whitespace', () => {
  assert.equal(isAnagram('Dormitory', 'dirty room'), true);
});

test('rejects a non-anagram', () => {
  assert.equal(isAnagram('hello', 'world'), false);
});

test('treats two empty strings as anagrams', () => {
  assert.equal(isAnagram('', ''), true);
});

test('handles digits', () => {
  assert.equal(isAnagram('a1b2', '2b1a'), true);
  assert.equal(isAnagram('12', '13'), false);
});

test('keeps accented letters distinct (Unicode-aware)', () => {
  assert.equal(isAnagram('été', 'téé'), true);
  assert.equal(isAnagram('éte', 'ete'), false);
});

test('handles astral code points without splitting surrogates', () => {
  assert.equal(isAnagram('𝒜b', 'b𝒜'), true);
  assert.equal(isAnagram('𝒜b', 'bb'), false);
});

test('rejects same letters with different multiplicity', () => {
  assert.equal(isAnagram('aab', 'abb'), false);
});

test('rejects non-string input in either position with TypeError', () => {
  assert.throws(() => isAnagram(42, 'a'), TypeError);
  assert.throws(() => isAnagram(null, 'a'), TypeError);
  assert.throws(() => isAnagram(undefined, 'a'), TypeError);
  assert.throws(() => isAnagram('a', 42), TypeError);
  assert.throws(() => isAnagram('a', null), TypeError);
  assert.throws(() => isAnagram('a', undefined), TypeError);
});
