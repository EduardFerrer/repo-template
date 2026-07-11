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

### Options

- `--name <name>`: project name used in generated documents.
- `--description <text>`: short project description.
- `--owner <name>`: person or team responsible for the project.
- `--force`: overwrite existing files.

## Generated files

- `README.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `ROADMAP.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- `docs/PROJECT-BRIEF.md`
- `docs/DECISIONS.md`
- `.github/ISSUE_TEMPLATE.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/CLA.md`
- `.vscode/settings.json`
- `.vscode/extensions.json`
- `.vscode/tasks.json`
- `.vscode/project-docs.code-snippets`

## Editing flow

Open one of the scaffolded files and insert the matching snippet from the
command palette or by typing its prefix. The snippet bodies use tab stops so you
can move through the placeholder sections in order.

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
