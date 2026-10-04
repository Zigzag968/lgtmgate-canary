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
 * Letters with no NFD decomposition (ß, ø, œ, ł, æ, either case) are
 * transliterated to ss, o, oe, l, ae before the NFD step.
 */
function slugify(input) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify: input must be a string');
  }
  return input
    .replace(/[ßøØœŒłŁæÆ]/g, (c) => TRANSLIT[c])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

module.exports = { slugify };
