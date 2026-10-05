'use strict';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parse a strict ISO `YYYY-MM-DD` calendar day into a Date at UTC midnight.
 * Rejects non-strings, malformed strings and days that do not exist (V8 would
 * silently roll `2026-02-30` into March 2, so the result is round-tripped).
 */
function parseCardDate(value) {
  const parsed = typeof value === 'string' && ISO_DATE.test(value) ? new Date(`${value}T00:00:00Z`) : null;
  if (!parsed || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new TypeError('render: card.date must be an ISO YYYY-MM-DD date');
  }
  return parsed;
}

/**
 * Normalize a card's tags: a non-array yields `[]`; falsy entries are dropped,
 * the rest are stringified and trimmed, and entries left empty are dropped.
 * (`0` and `false` are dropped before stringifying; `5` becomes `'5'`.)
 */
function normalizeTags(tags) {
  return Array.isArray(tags) ? tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean) : [];
}

/**
 * Render a tiny "card" as plain text: a title line, an underline, an optional
 * locale-formatted date line and an optional list of tags. Pure function, no
 * I/O. The underline has one `=` per code point of the trimmed title.
 *
 *   render({ title: 'Hello', tags: ['a', 'b'] })
 *   // "Hello\n=====\n#a #b"
 *
 * When `card.date` is set (ISO `YYYY-MM-DD`), a long date line is appended
 * under the underline, formatted with `Intl.DateTimeFormat` in UTC so the day
 * never shifts with the host time zone. `options.locale` defaults to `en-US`.
 * A date that is set but not a real calendar day throws a `TypeError`; an
 * invalid locale lets Intl's own `RangeError` propagate.
 *
 *   render({ title: 'Release', date: '2026-09-30' }, { locale: 'fr-FR' })
 *   // "Release\n=======\n30 septembre 2026"
 */
function render(card, options) {
  if (!card || typeof card.title !== 'string' || card.title.trim().length === 0) {
    throw new TypeError('render: card.title must be a non-empty string');
  }
  const { locale = 'en-US' } = options ?? {};
  const title = card.title.trim();
  const underline = '='.repeat([...title].length);
  const lines = [title, underline];
  if (card.date !== undefined && card.date !== null) {
    const date = parseCardDate(card.date);
    lines.push(new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date));
  }
  const tags = normalizeTags(card.tags);
  if (tags.length > 0) {
    lines.push(tags.map((tag) => `#${tag}`).join(' '));
  }
  return lines.join('\n');
}

module.exports = { render, normalizeTags };
