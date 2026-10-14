'use strict';

/**
 * Return a string with its first character upper-cased; the rest is untouched.
 *
 *   capitalize("hello") -> "Hello"
 *   capitalize("hELLO") -> "HELLO"
 *   capitalize("")      -> ""
 *
 * @param {string} text
 * @returns {string}
 */
function capitalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('capitalize: text must be a string');
  }
  if (text === '') return '';
  const [first] = Array.from(text);
  return first.toUpperCase() + text.slice(first.length);
}

module.exports = { capitalize };
