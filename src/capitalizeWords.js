'use strict';

/**
 * Upper-case the first letter of each whitespace-separated word and
 * lower-case the rest. Whitespace is preserved as-is.
 *
 *   capitalizeWords("hELLO wORLD")       -> "Hello World"
 *   capitalizeWords(" ada  lovelace ")   -> " Ada  Lovelace "
 *   capitalizeWords("")                  -> ""
 *
 * @param {string} text
 * @returns {string}
 */
function capitalizeWords(text) {
  if (typeof text !== 'string') {
    throw new TypeError('capitalizeWords: text must be a string');
  }
  return text.replace(
    /\S+/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
  );
}

module.exports = { capitalizeWords };
