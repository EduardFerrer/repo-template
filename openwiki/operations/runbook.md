---
type: Runbook
title: Operations and maintenance
description: Practical notes for building, validating, and maintaining the scaffold repository, including the scheduled OpenWiki workflow.
timestamp: 2025-08-15T00:00:00Z
---

# Operations runbook

This repository is small, but it still benefits from a repeatable maintenance routine. The source of truth is the TypeScript source plus the generated docs and templates.

## Local checks

The documented commands in `package.json` are the main maintenance entry points:

- `npm run build` compiles the TypeScript sources.
- `npm run dev` watches the TypeScript sources during development.
- `npm run scaffold` runs the CLI from the built output.
- `npm run changelog` regenerates `CHANGELOG.md` from git history.
- `npm run clean` removes `dist/`.

Because there are no dedicated automated tests yet, the current verification habit is to build the project and run the scaffold against a throwaway directory to inspect the output.

## Scheduled OpenWiki refresh

`.github/workflows/openwiki-update.yml` is a scheduled GitHub Actions workflow that installs OpenWiki and runs `openwiki code --update --print`. It then opens or updates a pull request with the wiki, `AGENTS.md`, `CLAUDE.md`, and the workflow file itself.

This means the wiki is part of the repo's operational surface, not an external artifact. If the workflow changes, the docs should call out how that affects the update cadence or the files included in the generated PR.

## Maintenance checklist

- Rebuild after source changes: `npm run build`.
- Refresh the changelog after commits that should appear in it.
- Run the scaffold in an empty or throwaway directory before publishing changes to the generator.
- Review `AGENTS.md` and `CLAUDE.md` when repository instructions change, because the scheduled OpenWiki workflow references both.

## Related pages

- [`Workflow guide`](../workflows/scaffold-and-update.md) shows the command-level flow.
- [`Testing and verification`](../testing.md) summarizes the current verification gap.
- [`Integrations`](../integrations.md) explains the GitHub Actions and local tool configuration points.
