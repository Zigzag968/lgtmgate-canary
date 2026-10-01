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

test('rejects a whitespace-only title', () => {
  for (const title of ['   ', ' \t\n ', String.fromCodePoint(0xa0)]) {
    assert.throws(() => render({ title }), {
      name: 'TypeError',
      message: 'render: card.title must be a non-empty string',
    });
  }
});

test('drops whitespace-only tags', () => {
  assert.equal(render({ title: 'Hi', tags: ['a', '   ', 'b'] }), 'Hi\n==\n#a #b');
});

test('omits the tags line when every tag is whitespace-only', () => {
  assert.equal(render({ title: 'Hi', tags: ['   ', '\t'] }), 'Hi\n==');
});

test('still drops falsy tags and keeps truthy non-string tags', () => {
  assert.equal(render({ title: 'Hi', tags: [0, ' a ', 5] }), 'Hi\n==\n#a #5');
});
