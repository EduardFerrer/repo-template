# Agent Instructions

Use this file as the first place to refine instructions for coding agents when this
scaffold is applied to a new project.

## What to capture

- The project goal in one or two sentences.
- The most important coding or documentation conventions.
- Any do-not-break rules for the generated repository.
- The local commands or checks agents should prefer first.
- Whether `.agents/skills/` contains a relevant reusable workflow.
- Whether `openwiki/` contains relevant generated codebase documentation.
- Whether `.agents/skills/` contains a relevant reusable workflow.

## Keep it current

- Update this file before filling in the rest of the scaffold if the project
  direction changes.
- Keep the guidance short enough to read at the start of every session.
- Keep durable project rules here so every supported agent can use the same source of truth.
- Keep external-tool configuration local; commit only `.mcp.json.example`.
- Use `openwiki/INSTRUCTIONS.md` to steer OpenWiki; treat the other wiki pages as generated artifacts.
- Keep external-tool configuration local; commit only `.mcp.json.example`.

<!-- OPENWIKI:START -->

## OpenWiki

This repository uses OpenWiki for recurring code documentation. Start with `openwiki/quickstart.md`, then follow its links to architecture, workflows, domain concepts, operations, integrations, testing guidance, and source maps.

The scheduled OpenWiki GitHub Actions workflow refreshes the repository wiki. Do not hand-edit generated OpenWiki pages unless explicitly asked; prefer updating source code/docs and letting OpenWiki regenerate.

<!-- OPENWIKI:END -->
