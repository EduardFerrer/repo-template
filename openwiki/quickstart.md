---
type: Repository Overview
title: Repo Template Scaffold
description: Entry point for the repository wiki. Explains the scaffold CLI, generated document set, changelog updater, editor assets, and where future agents should start.
timestamp: 2025-08-15T00:00:00Z
---

# Quickstart

This repository is a TypeScript CLI that generates a standard project scaffold for a new repository or an existing working directory. The generated output centers on `README.md`, `AGENTS.md`, contribution and policy documents, GitHub templates, VS Code assets, and an optional changelog updater.

Start here, then follow the linked pages for the major areas:

- [Architecture overview](architecture/overview.md) — how the CLI, scaffold generator, and changelog updater fit together.
- [Workflow guide](workflows/scaffold-and-update.md) — how `repo-template` creates files and how the changelog is refreshed.
- [Document templates and agent assets](domain/templates.md) — the core generated artifacts and why they exist.
- [Operations runbook](operations/runbook.md) — build, verify, and maintain the scaffold locally.
- [Integrations](integrations.md) — GitHub Actions, MCP config example, and VS Code wiring.
- [Testing and verification](testing.md) — what is currently checked and what is still missing.
- [Source map](source-map.md) — compact pointers to the files that matter most.

## What this repository does

The CLI accepts a target directory, optional metadata such as project name, description, and owner, and a `--force` flag. It then writes a curated set of starter files into that directory. The repository README documents the user-facing command flow, while `src/cli.ts` handles argument parsing and `src/scaffold.ts` generates the files.

The generated repo includes:

- `AGENTS.md` for project-specific instructions to coding agents.
- `.agents/README.md` and `.agents/skills/README.md` for reusable agent workflows.
- `.mcp.json.example` for safe local MCP setup.
- `.github/` templates and policies.
- `.vscode/` settings, snippets, and task scaffolding.
- A `scripts/update-changelog.js` helper that rebuilds `CHANGELOG.md` from git history.

## How to use the wiki

- If you need to understand runtime behavior, read [Architecture overview](architecture/overview.md) first.
- If you need to change generated content, read [Document templates and agent assets](domain/templates.md) and [Workflow guide](workflows/scaffold-and-update.md).
- If you need to add or adjust repository integrations, read [Integrations](integrations.md).
- If you want to know what to verify after a change, read [Operations runbook](operations/runbook.md) and [Testing and verification](testing.md).

## Repository shape at a glance

- `src/` — CLI entrypoint and scaffold implementation.
- `scripts/` — standalone repository maintenance scripts.
- `.agents/` — local guidance and reusable agent assets.
- `.github/` — workflow automation and contribution policies.
- `.vscode/` — editor settings, tasks, and snippets.
- `README.md` — user-facing command and setup guide.
- `AGENTS.md` / `CLAUDE.md` — agent instructions and local operating notes.

## Backlog

- **Tests for scaffold output** — source anchor: `package.json`, `src/scaffold.ts`; there are currently no automated tests for generated file contents, so the wiki documents manual verification instead.
- **Reusable skills** — source anchor: `.agents/skills/`; the directory exists and is documented, but no concrete skill implementation is present yet.
- **Published package workflow** — source anchor: `package.json`, `.github/workflows/openwiki-update.yml`; the repo exposes CLI scripts and an OpenWiki workflow, but packaging and release automation are not described in source beyond these entries.
