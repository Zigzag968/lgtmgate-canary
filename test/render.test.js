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

test('appends an en-US long date under the underline', () => {
  assert.equal(
    render({ title: 'Release', date: '2026-09-30' }, { locale: 'en-US' }),
    'Release\n=======\nSeptember 30, 2026',
  );
});

test('appends a fr-FR long date under the underline', () => {
  assert.equal(
    render({ title: 'Release', date: '2026-09-30' }, { locale: 'fr-FR' }),
    'Release\n=======\n30 septembre 2026',
  );
});

test('defaults the locale to en-US when options are omitted', () => {
  const expected = 'Release\n=======\nSeptember 30, 2026';
  assert.equal(render({ title: 'Release', date: '2026-09-30' }), expected);
  assert.equal(render({ title: 'Release', date: '2026-09-30' }, {}), expected);
});

test('prints no date line when card.date is absent', () => {
  assert.equal(render({ title: 'Release' }, { locale: 'fr-FR' }), 'Release\n=======');
  assert.equal(render({ title: 'Hi', date: null, tags: ['a'] }, { locale: 'fr-FR' }), 'Hi\n==\n#a');
});

test('puts the date line between the underline and the tags line', () => {
  assert.equal(
    render({ title: 'Hi', date: '2026-09-30', tags: ['a', 'b'] }, { locale: 'en-US' }),
    'Hi\n==\nSeptember 30, 2026\n#a #b',
  );
});

test('accepts a real leap day', () => {
  assert.equal(
    render({ title: 'Leap', date: '2024-02-29' }, { locale: 'en-US' }),
    'Leap\n====\nFebruary 29, 2024',
  );
});

test('throws TypeError for a date that is set but not a real ISO calendar day', () => {
  const invalid = [
    'not-a-date',
    '2026-13-45',
    '',
    '2026-02-30',
    '2026-02-29',
    '2026-9-30',
    '2026-09-30T23:59:00-05:00',
    20260930,
  ];
  for (const date of invalid) {
    assert.throws(() => render({ title: 'Release', date }, { locale: 'en-US' }), TypeError, String(date));
  }
});

test('lets Intl reject an invalid locale with a RangeError', () => {
  assert.throws(() => render({ title: 'Release', date: '2026-09-30' }, { locale: 'not a locale' }), RangeError);
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

test('keeps the date line when every tag is whitespace-only', () => {
  assert.equal(
    render({ title: 'Hi', date: '2026-09-30', tags: ['   ', '\t'] }, { locale: 'en-US' }),
    'Hi\n==\nSeptember 30, 2026',
  );
});

test('drops whitespace-only tags between the date line and the remaining tags', () => {
  assert.equal(
    render({ title: 'Hi', date: '2026-09-30', tags: ['a', '   ', 'b'] }, { locale: 'fr-FR' }),
    'Hi\n==\n30 septembre 2026\n#a #b',
  );
});

test('rejects a whitespace-only title even when a date is set', () => {
  assert.throws(() => render({ title: '   ', date: '2026-09-30' }, { locale: 'en-US' }), {
    name: 'TypeError',
    message: 'render: card.title must be a non-empty string',
  });
});

test('underlines an emoji title with one = per code point', () => {
  assert.equal(render({ title: 'Hi 😀' }), 'Hi 😀\n====');
});

test('underlines a mixed title with one = per code point', () => {
  assert.equal(render({ title: 'a😀b😀' }), 'a😀b😀\n====');
});

test('keeps a BMP-only title underline equal to one = per code point', () => {
  assert.equal(render({ title: 'Héllo' }), 'Héllo\n=====');
});
