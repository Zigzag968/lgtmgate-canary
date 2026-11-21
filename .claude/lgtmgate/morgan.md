<!-- Owner notes read by the reviewer. Complete this file in your own words; it is never rewritten.
[detect] the CI checks required before a merge
[ask] branch protection: whether the base branch is protected and which checks it requires
[ask] rules to target: which rule files the reviewer must apply
-->

- Branch protection: `main` is not protected (REST `GET branches/main/protection` returned 404 on 2026-11-21). Required CI check intended: `test`. Protection with required status checks is still needed.
