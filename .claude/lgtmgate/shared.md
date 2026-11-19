<!-- Owner notes read by every role. Complete this file in your own words; it is never rewritten.
[ask] docs/issues language: the language of the docs and of the issues
[ask] test policy: what must be tested, what may be skipped
[ask] forbidden actions: what no role may ever do in this repo
Keep it short: rules written here, no copy of a plugin file.
-->

## Language
- Issues, PRs, commit messages, comments and docs are written in English.

## Test policy
- Every behaviour that is added or modified has a `node:test` test.

## Forbidden actions
- No push to `main`.
- No disabling of a hook or of CI.
- No npm dependency: the project is Node stdlib only.
- No rebase: bring a branch up to date with a merge.
