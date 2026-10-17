'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { capitalize } = require('../src/capitalize');

test('upper-cases the first character', () => {
  assert.equal(capitalize('hello'), 'Hello');
});

test('leaves the rest of the string unchanged', () => {
  assert.equal(capitalize('hELLO'), 'HELLO');
  assert.equal(capitalize('Hello'), 'Hello');
});

test('returns the empty string unchanged', () => {
  assert.equal(capitalize(''), '');
});

test('handles astral first code points without splitting surrogates', () => {
  assert.equal(capitalize('𝒜b'), '𝒜b');
  assert.equal(capitalize('\u{10428}x'), '\u{10400}x');
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => capitalize(42), TypeError);
  assert.throws(() => capitalize(null), TypeError);
  assert.throws(() => capitalize(undefined), TypeError);
});
