---
type: Workflow
title: Scaffold and changelog workflow
description: Describes the user-facing command flow for creating a scaffold and the maintenance flow for updating the generated changelog.
timestamp: 2025-08-15T00:00:00Z
---

# Workflow guide

This repository has two important workflows: scaffold creation and changelog refresh. Both are simple on purpose so they can be executed from a terminal without extra setup.

## Scaffold creation flow

1. Run `repo-template init <directory>` or `repo-template <directory>`.
2. Optionally add `--name`, `--description`, or `--owner` to customize the generated text.
3. Use `--force` only when you want to overwrite files that already exist.
4. Inspect the output in the target directory and refine the generated files as needed.

`src/cli.ts` owns the command parsing, while `src/scaffold.ts` owns the generated file list and content. The README documents the same usage pattern so the CLI and user instructions stay in sync.

## Changelog refresh flow

`package.json` exposes `npm run changelog`, which runs `node scripts/update-changelog.js`. The updater reads recent git history, groups commits into high-level sections such as Added, Changed, Fixed, Docs, and Other, and rewrites `CHANGELOG.md`.

The workflow was added because the repository wants the changelog to reflect commit history without requiring a separate manual note-taking process. Recent commits show the updater script being added, then corrected for path behavior, then referenced from the README and snippets, which indicates that it is intended as a standard part of the template experience.

## Change relationships

- `src/cli.ts` -> dispatches to -> `src/scaffold.ts`
- `src/scaffold.ts` -> writes -> generated documents and editor assets
- `scripts/update-changelog.js` -> reads -> git history
- `package.json` -> exposes -> `build`, `scaffold`, and `changelog` scripts
- `README.md` -> explains -> the same scaffold and changelog workflow for users

## Change tips for future agents

- If the scaffold output changes, update the workflow text and the snippet file together.
- If changelog categories or formatting change, update the script, README references, and any generated documentation that mentions it.
- Verify the workflow with a throwaway directory before changing overwrite or path behavior.
