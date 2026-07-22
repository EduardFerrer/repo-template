---
type: Domain Model
title: Templates and agent assets
description: Catalogs the files this scaffold generates and explains the repository-local agent instructions, skills, MCP example, GitHub templates, and VS Code assets.
timestamp: 2025-08-15T00:00:00Z
tags: [templates, agents, editor, github]
---

# Templates and agent assets

The core product of this repository is a consistent starter document set. `src/scaffold.ts` renders the canonical file contents, and `.vscode/project-docs.code-snippets` mirrors the same content as editor snippets so users can insert the templates interactively.

## Canonical generated files

The scaffold writes a standard set of files that together define the repository's documentation and agent posture:

- `AGENTS.md` — the first-stop instruction file for coding agents.
- `.agents/README.md` — explanation of local agent assets.
- `.agents/skills/README.md` — guidance for reusable project-specific skills.
- `.mcp.json.example` — safe example configuration for local MCP servers.
- `.github/ISSUE_TEMPLATE.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/CLA.md` — contribution intake and legal policy.
- `.vscode/settings.json`, `.vscode/extensions.json`, `.vscode/tasks.json`, `.vscode/project-docs.code-snippets` — editor behavior and document insertion helpers.
- `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `ROADMAP.md`, `CHANGELOG.md` — the standard project document set.
- `scripts/update-changelog.js` — the git-history-based changelog updater.

## Why these files matter

The repository is not just a file copier. The templates encode a recommended operating model for a newly created project:

- `AGENTS.md` captures the instructions that future coding agents should read first.
- `.agents/` keeps reusable workflow guidance out of the main instructions file.
- `.mcp.json.example` shows how optional local tool integrations should be configured without committing secrets.
- The GitHub templates standardize issue and pull request intake.
- VS Code settings and snippets make the same document structure easy to reuse during editing.

## Relationship to the source code

`src/scaffold.ts` is the authoritative source for the emitted text, while the snippet file is a second surface that mirrors the same structure for editor-driven authoring. When one changes, the other should usually change too.

## Change guidance

- Update the source template and snippet together to avoid drift.
- Keep the starter documents short and tab-friendly; the point is to make them easy to customize, not to publish a full policy library.
- Preserve the safety boundary around `.mcp.json`: the repository ships only the example file, not a secret-bearing configuration.

## Cross-links

- [`Architecture overview`](../architecture/overview.md) explains how these templates are generated.
- [`Integrations`](../integrations.md) covers the GitHub, VS Code, and MCP surfaces these templates feed.
- [`Source map`](../source-map.md) points to the source files that own each template family.
