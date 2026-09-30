# SETUP — lgtmgate-canary (beta channel consumer)

Run these in order from the repo root. One line of expected result after each command.
Nothing below touches `Zigzag968/claude-code-lgtmgate`; only this canary repo is created.

## 0. Sanity

```bash
node --version            # v22+ (CI pins node 22)
node --test               # 8 tests pass, 0 fail (the seeded bug has NO test yet, on purpose)
gh auth status            # logged in as Zigzag968, scopes include repo
```

## 1. Create the repo

```bash
git init -b main
git add -A
git commit -m "chore: bootstrap lgtmgate canary consumer"
gh repo create Zigzag968/lgtmgate-canary --public --source . --push
# -> https://github.com/Zigzag968/lgtmgate-canary created, main pushed, CI "test" runs green
```

## 2. Enable the plugin on the BETA channel, local scope only

`.claude/settings.json` already declares the `zigzag-plugins-beta` marketplace; `enabledPlugins` stays empty and committed as such. Activation lives in `.claude/settings.local.json` (gitignored).

Prerequisite: `.claude-plugin/marketplace-beta.json` must be merged on `main` of `Zigzag968/claude-code-lgtmgate` (branch `feat/e0-0-beta-channel` at the time of writing) — until then the marketplace clone finds no file at that path.

```bash
claude plugin marketplace list
# -> zigzag-plugins-beta listed, picked up from .claude/settings.json (github Zigzag968/claude-code-lgtmgate, path .claude-plugin/marketplace-beta.json).
#    NOTE: `claude plugin marketplace add Zigzag968/claude-code-lgtmgate` would register the DEFAULT file = stable channel (name zigzag-plugins):
#    the CLI has no option for a non-default path (docs: marketplace-reference, "path" is settings-only). Fallback if the settings entry is not picked up:
claude plugin marketplace add https://raw.githubusercontent.com/Zigzag968/claude-code-lgtmgate/main/.claude-plugin/marketplace-beta.json --scope local
# -> "Successfully added marketplace: zigzag-plugins-beta" (a `url` marketplace source: only the JSON is fetched, fine here since both entries use github/git-subdir sources)

claude plugin list
# -> if lgtmgate@zigzag-plugins (stable) is enabled at user scope, disable it FOR THIS PROJECT before installing beta (duplicate manifest name = silent shadowing, hooks fire twice):
claude plugin disable lgtmgate@zigzag-plugins --scope local
# -> "Disabled lgtmgate@zigzag-plugins (local)"

claude plugin install lgtmgate@zigzag-plugins-beta --scope local
# -> "Installed lgtmgate@zigzag-plugins-beta" and .claude/settings.local.json gains enabledPlugins { "lgtmgate@zigzag-plugins-beta": true }

git status --short
# -> clean: settings.local.json is gitignored, .claude/settings.json unchanged
```

Then inside Claude Code (in this repo): `/reload-plugins` -> `/lgtmgate:init` and `/lgtmgate:deliver` appear in `/help`.

## 3. Install the pipeline machinery (one-off)

`.claude/pipeline.config.json` and `.claude/rules/pr-acceptance.md` are already in place, but the run is fail-closed on `scripts/provision_worktree.sh` (+ `.claude/scripts/*.sh`, `.claude/workflows/test-deliver-pipeline.js`), which the plugin copies.

Inside Claude Code: `/lgtmgate:init` -> when asked about the existing config choose **(a) complete** (keeps the config, copies only the missing files).
Then:

```bash
git add scripts/provision_worktree.sh .claude/workflows .claude/scripts
git commit -m "chore(pipeline): bootstrap lgtmgate machinery"
git push origin main
# -> pushed; the provisioning gate reads the COMMITTED base branch, not the working tree
mkdir -p ../worktrees/lgtmgate-canary
# -> worktreeRoot from pipeline.config.json exists (override per machine via $AGENT_PIPELINE_WORKTREE_ROOT or .claude/pipeline.config.local.json)
```

## 4. Seed the two issues (REST, 1 point each — never `gh issue create` in a loop)

```bash
gh api -X POST repos/Zigzag968/lgtmgate-canary/issues -f title='slugify() drops accented letters and doubles hyphens on multiple spaces' -F body=@seed/issue-1-bug.md
# -> JSON with "number": 1
gh api -X POST repos/Zigzag968/lgtmgate-canary/issues -f title='render(): add a { locale } option that prints a formatted date line' -F body=@seed/issue-2-feature.md
# -> JSON with "number": 2
```

(The first line of each seed file repeats the title; strip it from the body if you prefer: `tail -n +2 seed/issue-1-bug.md > "$TMPDIR/b.md"` then `-F body=@"$TMPDIR/b.md"`.)

## 5. Run the pipeline

Inside Claude Code, in this repo (the dispatch command is `/lgtmgate:deliver <issue> "<brief>"` per `commands/deliver.md`; `/agent-pipeline:feature` is the OLD plugin name, do not use it here):

```
/lgtmgate:deliver 1 "slugify: transliterate accents, collapse whitespace runs"
# -> Theo reproduces the bug with the node -e command, Sam posts a plan, checkpoint plan-ready -> continue -> Nick opens PR feat/issue-1 -> Morgan LGTM -> status ready
/lgtmgate:deliver 2 "render: { locale } option with a formatted date line"
# -> same flow; expected final status ready-pending-human (the [human-gate] box stays unchecked for you)
```

Watch the runs: `cat .pipeline/1.json` (gitignored) -> `"status": "ready"`.

## 6. The three 5-minute channel tests

### (a) Conflict: both channels at the same scope

```bash
claude plugin install lgtmgate@zigzag-plugins --scope local
# -> both lgtmgate@zigzag-plugins and lgtmgate@zigzag-plugins-beta now enabled at local scope
claude plugin list
# -> observe: two entries with the same manifest name "lgtmgate" — note which one wins / whether a warning is printed (this is the observation to record)
claude plugin disable lgtmgate@zigzag-plugins --scope local
# -> back to beta only; `claude plugin list` shows a single lgtmgate
```

### (b) Both marketplaces visible

```bash
claude plugin marketplace list
# -> zigzag-plugins (github Zigzag968/claude-code-lgtmgate) AND zigzag-plugins-beta (same repo, marketplace-beta.json) both listed
```

### (c) Prerelease cache path

```bash
claude plugin update lgtmgate@zigzag-plugins-beta --scope local
# -> "Updated lgtmgate@zigzag-plugins-beta to <version>" (restart required)
ls ~/.claude/plugins/cache/zigzag-plugins-beta/lgtmgate/
# -> one directory per version, e.g. 0.8.65 (matches .claude-plugin/plugin.json "version" on main)
```

## 7. Tear-down (optional)

```bash
claude plugin uninstall lgtmgate@zigzag-plugins-beta --scope local
gh repo delete Zigzag968/lgtmgate-canary --yes   # only if the canary is disposable
```
