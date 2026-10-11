'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isPalindrome } = require('../src/isPalindrome');

test('accepts a classic phrase ignoring punctuation and spaces', () => {
  assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
});

test('rejects a non-palindrome', () => {
  assert.equal(isPalindrome('hello'), false);
});

test('treats the empty string as a palindrome', () => {
  assert.equal(isPalindrome(''), true);
});

test('handles digits', () => {
  assert.equal(isPalindrome('12321'), true);
  assert.equal(isPalindrome('12345'), false);
});

test('is case-insensitive', () => {
  assert.equal(isPalindrome('Racecar'), true);
});

test('treats punctuation/whitespace-only input as a palindrome', () => {
  assert.equal(isPalindrome('!?'), true);
  assert.equal(isPalindrome('   '), true);
});

test('keeps accented letters (Unicode-aware)', () => {
  assert.equal(isPalindrome('été'), true);
  assert.equal(isPalindrome('éta'), false);
});

test('handles astral code points without splitting surrogates', () => {
  assert.equal(isPalindrome('𝒜b𝒜'), true);
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => isPalindrome(42), TypeError);
  assert.throws(() => isPalindrome(null), TypeError);
  assert.throws(() => isPalindrome(undefined), TypeError);
});
