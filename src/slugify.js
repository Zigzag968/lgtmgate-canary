'use strict';

const TRANSLIT = {
  'ß': 'ss',
  'ø': 'o',
  'Ø': 'o',
  'œ': 'oe',
  'Œ': 'oe',
  'ł': 'l',
  'Ł': 'l',
  'æ': 'ae',
  'Æ': 'ae',
  'ı': 'i',
  'đ': 'd',
  'Đ': 'd',
  'ð': 'd',
  'Ð': 'd',
  'þ': 'th',
  'Þ': 'th',
};

/**
 * Turn a free-text title into a URL-safe slug.
 *
 * Rules: lowercase, ASCII letters and digits only, words joined by a single
 * hyphen, no leading/trailing hyphen.
 *
 * Accented letters are transliterated via Unicode NFD decomposition (combining
 * marks are stripped), and any run of non-alphanumerics (including whitespace)
 * collapses to one hyphen:
 *   slugify("Héllo  Wörld!") -> "hello-world"
 * Letters with no NFD decomposition (ß, ø, œ, ł, æ, ı, đ, ð, þ, either case) are
 * transliterated to ss, o, oe, l, ae, i, d, d, th before the NFD step.
 */
function slugify(input) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify: input must be a string');
  }
  return input
    .replace(/[ßøØœŒłŁæÆıđĐðÐþÞ]/g, (c) => TRANSLIT[c])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

module.exports = { slugify };
