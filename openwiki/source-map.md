---
type: Source Map
title: Source map
description: Compact map of the repository files that matter most for understanding the scaffold, generated assets, policies, and automation.
timestamp: 2025-08-15T00:00:00Z
---

# Source map

This page points to the files that own the major documentation and workflow surfaces.

## Core implementation

- `src/cli.ts` — parses command-line arguments and dispatches to the scaffold generator.
- `src/scaffold.ts` — renders and writes the scaffolded files.
- `scripts/update-changelog.js` — rebuilds `CHANGELOG.md` from git history.

## User-facing docs and policies

- `README.md` — primary user guide for installation, usage, and generated output.
- `AGENTS.md` — repository instructions for coding agents.
- `CLAUDE.md` — companion agent guidance file kept in sync with the OpenWiki workflow.
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `ROADMAP.md`, `CHANGELOG.md` — the standard generated document set.

## Agent assets and editor support

- `.agents/README.md` — explains local agent assets.
- `.agents/skills/README.md` — explains how to structure reusable skills.
- `.mcp.json.example` — example MCP configuration with placeholders only.
- `.vscode/project-docs.code-snippets` — snippet versions of the standard project documents.
- `.vscode/settings.json`, `.vscode/extensions.json`, `.vscode/tasks.json` — editor defaults and placeholder tasks.

## Automation and packaging

- `.github/workflows/openwiki-update.yml` — scheduled OpenWiki refresh workflow.
- `package.json` — scripts, bin entrypoint, and Node version requirement.
- `package-lock.json` — pinned dependency state.

## How to use this map

When changing one area, check the related files above instead of editing a single template in isolation. For example, a change to generated document shape usually touches `src/scaffold.ts`, `README.md`, and the VS Code snippet file together.
