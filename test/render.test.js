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
