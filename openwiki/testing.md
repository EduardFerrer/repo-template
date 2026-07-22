---
type: Testing Guide
title: Testing and verification
description: Summarizes the current verification approach for the scaffold, including build checks, manual output inspection, and the missing automated test coverage.
timestamp: 2025-08-15T00:00:00Z
---

# Testing and verification

The repository currently relies on build-time checks and manual verification rather than a formal automated test suite.

## Current verification steps

1. Run `npm run build` to confirm the TypeScript sources compile.
2. Run the CLI or `npm run scaffold` against a throwaway directory.
3. Inspect the generated files for content, overwrite behavior, and path handling.
4. Run `npm run changelog` when changelog-related commits should be reflected in `CHANGELOG.md`.

## What is not covered yet

There are no repo-local tests for the exact contents of generated files, the argument parser, or the changelog classification logic. The README and contributing guide therefore emphasize manual inspection of a throwaway scaffold output after changes to `src/scaffold.ts` or `scripts/update-changelog.js`.

## Evidence-backed relationships

- `package.json` -> exposes -> `build`, `scaffold`, `changelog`, and `clean` scripts
- `src/scaffold.ts` -> should be verified by -> throwaway-directory output inspection
- `scripts/update-changelog.js` -> should be verified by -> regenerated `CHANGELOG.md`

## Future improvement ideas

- Add assertions for the generated file set and content.
- Add a command-level test for argument parsing and `--force` behavior.
- Add a regression test for changelog grouping and date ordering.
