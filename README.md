# Repo Template Scaffold

Create a new project skeleton with standard documents and VS Code snippets from
any directory.

## What this repo does

- Creates a predictable set of project files.
- Fills the files with placeholders and short instructions.
- Adds VS Code snippets so the same content can be inserted with Tab stops.

## Install

```bash
npm install
npm run build
npm link
```

After linking, the command is available from any directory as `repo-template`.

## Usage

```bash
repo-template init my-new-project
```

You can also omit the `init` subcommand:

```bash
repo-template my-new-project
```

To create the scaffold in the current directory, omit the directory too:

```bash
repo-template
```

Existing files are preserved by default. Add `--force` to overwrite them.

### Options

- `--name <name>`: project name used in generated documents.
- `--description <text>`: short project description.
- `--owner <name>`: person or team responsible for the project.
- `--force`: overwrite existing files.

## Generated files

- `AGENTS.md`
- `README.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `ROADMAP.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- `.agents/README.md`
- `.agents/skills/README.md`
- `.mcp.json.example`
- `.gitignore`
- `.github/ISSUE_TEMPLATE.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/CLA.md`
- `.vscode/settings.json`
- `.vscode/extensions.json`
- `.vscode/tasks.json`
- `.vscode/project-docs.code-snippets`

## Editing flow

Open `AGENTS.md` first to set the project instructions. Add a focused workflow
under `.agents/skills/` only after it becomes repeatable. Copy
`.mcp.json.example` to `.mcp.json` for local tool integrations and keep all
credentials outside the repository. Use the matching snippet from the command
palette or by typing its prefix. The snippet bodies use tab stops so you can
move through the placeholder sections in order.

## Development

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run changelog
```
