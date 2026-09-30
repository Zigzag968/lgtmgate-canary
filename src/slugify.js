'use strict';

/**
 * Turn a free-text title into a URL-safe slug.
 *
 * Rules: lowercase, ASCII letters and digits only, words joined by a single
 * hyphen, no leading/trailing hyphen.
 *
 * KNOWN BUG (tracked as the canary's issue #1 — do not fix here without a PR):
 * accented letters are dropped instead of being transliterated, and runs of
 * whitespace produce doubled hyphens:
 *   slugify("Héllo  Wörld!") -> "h-llo--w-rld"   (expected "hello-world")
 */
function slugify(input) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify: input must be a string');
  }
  const words = input.toLowerCase().split(' ');
  const parts = words.map((word) => word.replace(/[^a-z0-9]+/g, '-'));
  return parts
    .join('-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

module.exports = { slugify };
