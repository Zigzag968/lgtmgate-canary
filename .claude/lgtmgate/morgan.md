<!-- Owner notes read by the reviewer. Complete this file in your own words; it is never rewritten.
[detect] the CI checks required before a merge
[ask] branch protection: whether the base branch is protected and which checks it requires
[ask] rules to target: which rule files the reviewer must apply
-->

- Branch protection: `main` is not protected (GitHub API 404 "Branch not protected" on 2026-11-18). Required CI check expected before a merge: `test`.
