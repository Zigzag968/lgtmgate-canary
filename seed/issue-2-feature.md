`render()`: add a `{ locale }` option that prints a formatted date line

## Feature

`render(card, { locale })` should append a date line under the title when `card.date` is set, formatted for the given locale.

```
render({ title: 'Release', date: '2026-09-30' }, { locale: 'en-US' })
// "Release\n=======\nSeptember 30, 2026"

render({ title: 'Release', date: '2026-09-30' }, { locale: 'fr-FR' })
// "Release\n=======\n30 septembre 2026"
```

## Rules

- `card.date` is an ISO `YYYY-MM-DD` string; absent -> no date line (current behaviour unchanged).
- Formatting uses `Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' })` — stdlib only, no dependency.
- `locale` defaults to `'en-US'` when the options object is omitted.
- The date line goes between the underline and the tags line.
- An invalid `card.date` throws a `TypeError`.

## Acceptance criteria

- [ ] `node --test` is green, with new cases in `test/render.test.js` for `en-US`, `fr-FR`, no date, and invalid date.
- [ ] `node -e 'console.log(require("./src/render").render({ title: "Release", date: "2026-09-30" }, { locale: "fr-FR" }))'` prints `Release`, `=======`, `30 septembre 2026` on three lines.
- [ ] Existing `render()` calls without a date are byte-for-byte unchanged (existing tests untouched and green).
- [ ] [human-gate] visual check of the rendered sample in the PR description (both locales pasted verbatim in the PR body).

## Size

S — one option, ~10 lines, four tests.
