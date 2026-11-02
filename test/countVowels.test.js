'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { countVowels } = require('../src/countVowels');

test('returns 0 for the empty string', () => {
  assert.equal(countVowels(''), 0);
});

test('counts vowels in a simple word', () => {
  assert.equal(countVowels('Hello'), 2);
});

test('returns 0 when there are no vowels', () => {
  assert.equal(countVowels('RHYTHM'), 0);
  assert.equal(countVowels('xyz'), 0);
});

test('counts both cases', () => {
  assert.equal(countVowels('AEIOUaeiou'), 10);
});

test('does not count accented vowels (ASCII only)', () => {
  assert.equal(countVowels('é'), 0);
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => countVowels(42), TypeError);
  assert.throws(() => countVowels(null), TypeError);
  assert.throws(() => countVowels(undefined), TypeError);
});
