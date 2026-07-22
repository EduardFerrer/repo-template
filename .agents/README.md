# Agent Assets

This directory holds repository-local assets that make coding agents more
consistent without making `AGENTS.md` long.

## Skills

Put reusable, project-specific workflows in `skills/<skill-name>/SKILL.md`.
Keep each skill focused on one repeatable task and include the checks needed to
verify its result.

## MCP configuration

Use `.mcp.json.example` as a starting point for optional local MCP servers.
Copy it to `.mcp.json`, replace the placeholders, and keep credentials in
environment variables rather than tracked files.
