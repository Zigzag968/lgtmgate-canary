<!-- Owner notes read by every role. Complete this file in your own words; it is never rewritten.
[ask] docs/issues language: the language of the docs and of the issues
[ask] test policy: what must be tested, what may be skipped
[ask] forbidden actions: what no role may ever do in this repo
Keep it short: rules written here, no copy of a plugin file.
-->

- Docs, issues, PRs and commits are written in English.
- Every change under src/ ships with a node:test test; `npm test` must pass.
- Node stdlib only: never add an npm dependency.
- Never push to main, never run git rebase (use `git merge origin/main`).
- Tools allowed: node, npm, git, gh REST (`gh api`).
