'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isEmpty } = require('../src/isEmpty');

test('treats the empty string as empty', () => {
  assert.equal(isEmpty(''), true);
});

test('treats a whitespace-only string as empty', () => {
  assert.equal(isEmpty('  \t\n'), true);
});

test('rejects a string with non-whitespace content', () => {
  assert.equal(isEmpty(' a '), false);
});

test('rejects non-string input with TypeError', () => {
  assert.throws(() => isEmpty(42), TypeError);
  assert.throws(() => isEmpty(null), TypeError);
  assert.throws(() => isEmpty(undefined), TypeError);
});
