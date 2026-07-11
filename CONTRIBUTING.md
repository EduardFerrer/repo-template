# Contributing

## Purpose

This repo is the source for the scaffold command and the document templates it
generates.

## Change process

1. Update the file generator in `src/scaffold.ts`.
2. Update the matching snippet definitions in
   `.vscode/project-docs.code-snippets`.
3. Update this README if the generated file list changes.

## Placeholder rules

- Keep generated documents short and explicit.
- Prefer visible placeholder text over empty sections.
- Use the same section order in the generated file and the snippet body.

## Verification

- Run `npm run build`.
- Run the command locally against a throwaway directory and inspect the
  generated files.
