---
type: Integration Guide
title: Integrations and editor wiring
description: Covers the repository's GitHub Actions refresh workflow, optional MCP configuration example, and VS Code assets that ship with the scaffold.
timestamp: 2025-08-15T00:00:00Z
---

# Integrations

The repository's integration points are intentionally lightweight. They exist to make the scaffold easy to adopt in a real repository without adding a heavy platform dependency.

## GitHub Actions

`.github/workflows/openwiki-update.yml` runs on a schedule and on manual dispatch. It installs OpenWiki, runs the update command, and uses `peter-evans/create-pull-request` to open a PR containing the refreshed wiki and related instruction files.

This workflow is important because it keeps repository documentation synchronized with source changes. The workflow body also shows which files are considered part of the update set: `openwiki`, `AGENTS.md`, `CLAUDE.md`, and the workflow file itself.

## Optional MCP configuration

`.mcp.json.example` is a safe example configuration for local MCP servers. The scaffold keeps this as an example file only; credentials are expected to live in environment variables or other local secrets management rather than in the repository.

That design matches the agent guidance in `AGENTS.md` and the local asset notes in `.agents/README.md`.

## VS Code support

The `.vscode/` directory packages editor guidance with the scaffold:

- `settings.json` enables formatting and snippet-friendly behavior.
- `extensions.json` recommends common formatting/tooling extensions.
- `tasks.json` provides placeholder shell tasks that can be replaced per project.
- `project-docs.code-snippets` exposes the same document templates as insertable snippets.

## Cross-links

- [`Templates and agent assets`](domain/templates.md) explains the content that these integrations support.
- [`Operations runbook`](operations/runbook.md) describes the workflow that consumes the GitHub Action.
- [`Source map`](source-map.md) lists the exact files to inspect when changing an integration point.
