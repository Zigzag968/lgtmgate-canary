`slugify()` drops accented letters and doubles hyphens on multiple spaces

## Bug

`slugify("Héllo  Wörld!")` returns `"h-llo--w-rld"`. Expected: `"hello-world"`.

Two defects in `src/slugify.js`:
1. Accented letters (`é`, `ö`, ...) are stripped instead of being transliterated to their ASCII base letter (`e`, `o`).
2. Runs of whitespace yield doubled hyphens (the split on a single space leaves an empty word, which becomes an extra `-`).

## Reproduce

```
node -e 'console.log(require("./src/slugify").slugify("Héllo  Wörld!"))'
```

Actual output: `h-llo--w-rld`
Expected output: `hello-world`

## Expected behaviour

- Accented Latin letters are transliterated (`é` -> `e`, `ö` -> `o`, `ç` -> `c`, ...), e.g. via `String.prototype.normalize('NFD')` + stripping combining marks (`̀-ͯ`). Stdlib only, no dependency.
- Any run of non-alphanumeric characters (including multiple spaces) collapses to a single `-`.
- Existing tests in `test/slugify.test.js` keep passing; a new test covers the `"Héllo  Wörld!"` case.

## Size

S — one function, one new test.
