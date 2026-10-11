<!-- Owner notes read by every role. Complete this file in your own words; it is never rewritten.
[ask] docs/issues language: the language of the docs and of the issues
[ask] test policy: what must be tested, what may be skipped
[ask] forbidden actions: what no role may ever do in this repo
Keep it short: rules written here, no copy of a plugin file.
-->
- Language: issues, PRs, commits and docs are written in English.
- Test policy: every change under `src/` comes with a test under `test/` (node:test); `npm test` must pass.
- Forbidden: adding npm dependencies (stdlib only), pushing to `main` (branch + PR only), editing `.github/workflows`.
