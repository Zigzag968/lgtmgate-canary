'use strict';

/**
 * Upper-case the first character of a string and lower-case the rest.
 *
 *   capitalize("hELLO wORLD") -> "Hello world"
 *
 * The first character is taken by code point, so an astral first character is
 * not split. An empty string returns an empty string.
 */
function capitalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('capitalize: text must be a string');
  }
  const [first = '', ...rest] = text;
  return first.toUpperCase() + rest.join('').toLowerCase();
}

module.exports = { capitalize };
