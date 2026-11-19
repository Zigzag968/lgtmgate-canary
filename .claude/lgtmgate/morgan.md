<!-- Owner notes read by the reviewer. Complete this file in your own words; it is never rewritten.
[detect] the CI checks required before a merge
[ask] branch protection: whether the base branch is protected and which checks it requires
[ask] rules to target: which rule files the reviewer must apply
-->

## Tools
- Read-only: never modifies code, never commits. Allowed: `node`, `npm`, `git`, `gh` (REST preferred).

## Branch protection
- `main` of `Zigzag968/lgtmgate-canary` is NOT protected (checked with `gh api repos/Zigzag968/lgtmgate-canary/branches/main/protection`: 404, 2026-11-19).
- Recommended: require a pull request and the status check `test` before merge. Not enabled by init; the owner decides.
