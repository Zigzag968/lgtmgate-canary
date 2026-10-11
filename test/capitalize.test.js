'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { capitalize } = require('../src/capitalize');

test('upper-cases the first letter of a lower-case word', () => {
  assert.equal(capitalize('hello'), 'Hello');
});

test('lower-cases the rest of an upper-case word', () => {
  assert.equal(capitalize('WORLD'), 'World');
});

test('only the first character of a phrase is upper-cased', () => {
  assert.equal(capitalize('hELLO wORLD'), 'Hello world');
});

test('empty string returns empty string', () => {
  assert.equal(capitalize(''), '');
});

test('rejects non-string input', () => {
  assert.throws(() => capitalize(42), TypeError);
});
