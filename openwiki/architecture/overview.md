---
type: Architecture Overview
title: Runtime architecture
description: Explains how the repository CLI parses commands, generates the scaffold, and refreshes changelog content from git history.
timestamp: 2025-08-15T00:00:00Z
---

# Architecture overview

The repository has a small runtime surface: a Node.js CLI in `src/cli.ts`, the file generation engine in `src/scaffold.ts`, and a maintenance script in `scripts/update-changelog.js`. The design favors deterministic file output and simple string templates over framework-driven abstractions.

## Main components

### CLI entrypoint

`src/cli.ts` parses arguments, supports the optional `init` subcommand, and normalizes the target directory before dispatching to `scaffoldProject(...)`. It accepts `--name`, `--description`, `--owner`, `--force`, and `--help`, and it defaults to creating the scaffold in the current directory when no directory is passed.

### Scaffold generator

`src/scaffold.ts` is the main implementation file. It resolves the target path, derives a project name when needed, and writes the curated file set with `fs/promises`. The generator preserves existing files unless `force` is set, which makes the command safe to run against an existing workspace.

### Changelog updater

The `scripts/update-changelog.js` helper reads `git log`, classifies commit subjects into broad categories, and rewrites `CHANGELOG.md`. The README and contributing guide both point at this script because changelog generation is treated as part of the repo's normal maintenance workflow.

## Why it is structured this way

The repository is a scaffold/template project, not a long-running application. That means the important architectural choices are about output shape, repeatability, and maintenance ergonomics rather than API layering or state management. The source code therefore keeps command parsing, file rendering, and changelog generation separate but lightweight.

## Evidence-backed relationships

- [`Workflow guide`](../workflows/scaffold-and-update.md) depends on this architecture because the documented command flow follows the CLI and scaffold generator exactly.
- [`Document templates and agent assets`](../domain/templates.md) are produced by `src/scaffold.ts` and mirrored by the snippet file under `.vscode/`.
- [`Operations runbook`](../operations/runbook.md) depends on the build and changelog scripts exposed in `package.json`.

## What to watch when changing this area

- Keep `src/cli.ts` and the README help text aligned when command syntax changes.
- Update `src/scaffold.ts`, `.vscode/project-docs.code-snippets`, and `README.md` together when the generated document set changes.
- Re-run the changelog updater after commits that should appear in `CHANGELOG.md`.
- Preserve the current overwrite behavior unless there is a deliberate change in scaffold safety.
