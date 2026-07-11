# Contributing

Thanks for taking the time to improve the scaffold.

## Before you start

- Read the README to understand the current output and command flow.
- Check whether the change affects generated files, snippets, or the changelog updater.
- If the repo includes `.github/CLA.md`, read it before opening a pull request.
- Keep the templates short, explicit, and easy to tab through.

## Recommended workflow

1. Update the source template in `src/scaffold.ts`.
2. Update the matching snippet in `.vscode/project-docs.code-snippets`.
3. Update the README if the generated output changes.
4. Refresh the changelog if the repo history or release notes changed.
5. Run the scaffold against a throwaway directory and inspect the result.

## Pull requests

- Keep PRs focused on one change when possible.
- Mention any template files that changed in the summary.
- Include a quick note if the update changes the output shape for existing users.

## Reporting issues

- Use the issue template when the repo provides one.
- Include the command you ran and the file that looked wrong.
- Add a generated example when the difference is visual or structural.

## Verification

- `npm run build`
- `npm run changelog` if the changelog content needs a refresh
- Run the command against a throwaway directory and inspect the output.
