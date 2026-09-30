'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { render } = require('../src/render');

test('renders a title with an underline of the same length', () => {
  assert.equal(render({ title: 'Hello' }), 'Hello\n=====');
});

test('appends hashtags on a third line when tags are present', () => {
  assert.equal(render({ title: 'Hi', tags: ['a', 'b'] }), 'Hi\n==\n#a #b');
});

test('ignores empty tags and trims the title', () => {
  assert.equal(render({ title: '  Hi ', tags: ['', null, 'x'] }), 'Hi\n==\n#x');
});

test('rejects a card without a title', () => {
  assert.throws(() => render({}), TypeError);
});
