<!-- Owner notes read by the reviewer. Complete this file in your own words; it is never rewritten.
[detect] the CI checks required before a merge
[ask] branch protection: whether the base branch is protected and which checks it requires
[ask] rules to target: which rule files the reviewer must apply
-->
- Branch protection: `main` is NOT protected (REST returned 404 on 2026-10-11); required CI check is `test`. Protection is still to be enabled.
- Tools: node, npm, git and gh only; gh through REST (`gh api`).
