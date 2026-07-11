import { mkdir, stat, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';

export type ScaffoldOptions = {
    directory: string;
    name?: string;
    description?: string;
    owner?: string;
    force?: boolean;
};

type FileDefinition = {
    path: string;
    content: string;
};

const defaultOwner = 'Project team';

function humanizeName(value: string): string {
    const cleaned = value
        .replace(/[/\\]+/g, ' ')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return cleaned.length === 0
        ? 'New Project'
        : cleaned.replace(/\b\w/g, (character) => character.toUpperCase());
}

function inferProjectName(directory: string): string {
    const normalized = resolve(directory);
    return humanizeName(
        normalized.split(/[\\/]/).filter(Boolean).at(-1) ?? 'New Project',
    );
}

function renderReadme(options: {
    name: string;
    description: string;
    owner: string;
}): string {
    return [
        `<p align="center">`,
        `  <strong>${options.name}</strong>`,
        `</p>`,
        '',
        `<p align="center">${options.description}</p>`,
        '',
        '<p align="center">',
        '  <img src="https://img.shields.io/badge/status-template-orange?style=for-the-badge" alt="Template status" />',
        '  <img src="https://img.shields.io/badge/docs-ready-0ea5e9?style=for-the-badge" alt="Documentation status" />',
        '  <img src="https://img.shields.io/badge/license-unlicensed-lightgrey?style=for-the-badge" alt="License status" />',
        '</p>',
        '',
        '<p align="center">',
        '  A ready-made repository scaffold for standard docs, GitHub templates, and editor setup.',
        '</p>',
        '',
        '## Why this project',
        '',
        '[Describe the problem this project solves and the result it should produce.]',
        '',
        '## Getting started',
        '',
        '- Install dependencies: `[replace with your command]`',
        '- Run the project: `[replace with your command]`',
        '- Build the project: `[replace with your command]`',
        '',
        '## What you get',
        '',
        '- A full starter doc set for the repo owner and contributors.',
        '- A first-pass instruction doc for coding agents.',
        '- GitHub issue and pull request templates.',
        '- VS Code settings, tasks, and snippets for the standard docs.',
        '',
        '## Project map',
        '',
        '- `AGENTS.md`: first-pass instructions for coding agents',
        '- `docs/`: planning notes, brief, and decisions',
        '- `.github/`: contribution policy, CLA, and GitHub templates',
        '- `.vscode/`: editor settings, tasks, and snippets',
        '- `src/`: implementation files if this project needs code',
        '',
        '## Refinement order',
        '',
        '- Start by refining `AGENTS.md`.',
        '- Then update the project brief and decision log as the scaffold changes.',
        '- Keep the README aligned with any new project conventions.',
        '',
        '## Ownership',
        '',
        `- Owner: ${options.owner}`,
        '- Repository path: keep this file updated when the project changes shape.',
        '',
    ].join('\n');
}

function renderContributing(): string {
    return [
        '# Contributing',
        '',
        'Thanks for taking the time to improve the scaffold.',
        '',
        '## Before you start',
        '',
        '- Read the README to understand the current output and command flow.',
        '- Review `AGENTS.md` first if you are changing the project instructions.',
        '- Check whether the change affects generated files, snippets, or the changelog updater.',
        '- If the repo includes `.github/CLA.md`, read it before opening a pull request.',
        '- Keep the templates short, explicit, and easy to tab through.',
        '',
        '## Recommended workflow',
        '',
        '1. Update `AGENTS.md` if the project instructions changed.',
        '2. Update the source template in `src/scaffold.ts`.',
        '3. Update the matching snippet in `.vscode/project-docs.code-snippets`.',
        '4. Update the README if the generated output changes.',
        '5. Refresh the changelog if the repo history or release notes changed.',
        '6. Run the scaffold against a throwaway directory and inspect the result.',
        '',
        '## Pull requests',
        '',
        '- Keep PRs focused on one change when possible.',
        '- Mention any template files that changed in the summary.',
        '- Include a quick note if the update changes the output shape for existing users.',
        '',
        '## Reporting issues',
        '',
        '- Use the issue template when the repo provides one.',
        '- Include the command you ran and the file that looked wrong.',
        '- Add a generated example when the difference is visual or structural.',
        '',
        '## Verification',
        '',
        '- `npm run build`',
        '- `npm run changelog` if the changelog content needs a refresh',
        '- Run the command against a throwaway directory and inspect the output.',
        '',
    ].join('\n');
}

function renderCla(): string {
    return [
        '# Contributor License Agreement',
        '',
        'By submitting a contribution to this project, you agree to the terms below.',
        '',
        '## Definitions',
        '',
        '- You: the individual or legal entity submitting the contribution.',
        '- Project: this repository and any downstream project artifacts generated from it.',
        '- Contribution: any code, documentation, configuration, content, or other material submitted to the project.',
        '- Submitted: conveyed through a pull request, commit, issue, patch, or other written contribution.',
        '',
        '## Grant of rights',
        '',
        'You grant the project maintainers a perpetual, worldwide, non-exclusive, no-charge license to use, reproduce, modify, adapt, publish, distribute, and sublicense your contribution as part of the project and any derivative works.',
        '',
        'You also grant a patent license for any patent claims that are necessarily infringed by your contribution alone or by combination of your contribution with the project.',
        '',
        '## Source of contribution',
        '',
        'You confirm that the contribution is your original work or that you have the right to submit it under the applicable license and restrictions.',
        '',
        '## Limitations',
        '',
        'This agreement does not replace the project license. It exists to clarify inbound contribution rights before a contribution is merged.',
        '',
        '## Acknowledgment',
        '',
        'By submitting a contribution, you accept these terms for the submitted material.',
        '',
    ].join('\n');
}

function renderChangelog(): string {
    return [
        '# Changelog',
        '',
        '## Unreleased',
        '',
        '### Added',
        '',
        '- Initial scaffold command.',
        '- Standard project document templates.',
        '- VS Code snippets with tab stops.',
        '',
        '### Changed',
        '',
        '- [Describe meaningful template updates here.]',
        '',
        '### Fixed',
        '',
        '- [List template or generator fixes here.]',
        '',
    ].join('\n');
}

function renderRoadmap(): string {
    return [
        '# Roadmap',
        '',
        '## Current goal',
        '',
        '[Write the next concrete outcome for this project.]',
        '',
        '## Near term',
        '',
        '- [Add another document template if needed.]',
        '- [Add prompts for interactive scaffolding.]',
        '- [Add a second template profile if needed.]',
        '',
        '## Later',
        '',
        '- [Add publishing or packaging automation.]',
        '- [Add tests for the scaffold output.]',
        '- [Add a command that inserts snippets directly into open editors.]',
        '',
    ].join('\n');
}

function renderSecurity(): string {
    return [
        '# Security',
        '',
        '## Reporting issues',
        '',
        'If you find a security issue in the scaffold command or the generated files, describe the issue, the affected file, and the steps to reproduce it.',
        '',
        '## What to include',
        '',
        '- The command you ran.',
        '- The output you expected.',
        '- The output you observed.',
        '- Any file content that may have caused the problem.',
        '',
        '## Response process',
        '',
        '[Add the maintainer contact or issue tracker details here.]',
        '',
    ].join('\n');
}

function renderCodeOfConduct(): string {
    return [
        '# Contributor Code of Conduct',
        '',
        '## Our pledge',
        '',
        'We commit to keeping participation in this project welcoming, respectful, and free from harassment for everyone.',
        '',
        '## Our standards',
        '',
        'Examples of behavior that helps create a positive environment include:',
        '',
        '- Demonstrating empathy and kindness.',
        '- Respecting different opinions, viewpoints, and lived experiences.',
        '- Giving and receiving constructive feedback gracefully.',
        '- Taking responsibility when mistakes happen and learning from them.',
        '- Focusing on what is best for the community and the project.',
        '',
        'Examples of behavior that is not acceptable include:',
        '',
        '- Harassment, intimidation, or threatening behavior.',
        '- Sexualized language or imagery and unwelcome sexual attention.',
        '- Insults, personal attacks, or derogatory comments.',
        '- Public or private harassment.',
        '- Publishing private information without permission.',
        '- Other conduct that would reasonably be considered inappropriate in a professional setting.',
        '',
        '## Enforcement responsibilities',
        '',
        'Project maintainers are responsible for clarifying and enforcing these standards and for taking fair corrective action when needed.',
        '',
        '## Scope',
        '',
        'This code of conduct applies in project spaces and whenever someone is representing the project in public-facing settings.',
        '',
        '## Enforcement',
        '',
        'Reports of unacceptable behavior should go to [INSERT CONTACT METHOD]. Reports will be reviewed promptly and fairly, and reporter privacy will be respected.',
        '',
        '## Enforcement guidelines',
        '',
        'Maintainers should apply these consequences in a way that fits the severity and pattern of the behavior:',
        '',
        '1. Correction - a private reminder that explains what needs to change.',
        '2. Warning - a formal warning with clear expectations for future behavior.',
        '3. Temporary ban - a temporary removal from participation or interaction.',
        '4. Permanent ban - a lasting removal for repeated or severe violations.',
        '',
        '## Attribution',
        '',
        'This code of conduct is adapted from the Contributor Covenant, version 2.0, available at https://www.contributor-covenant.org/version/2/0/code_of_conduct/.',
        '',
        'Additional guidance and translations are available from the Contributor Covenant project at https://www.contributor-covenant.org/.',
        '',
    ].join('\n');
}

function renderProjectBrief(): string {
    return [
        '# Project Brief',
        '',
        '## Goal',
        '',
        '[Describe the problem this project solves.]',
        '',
        '## Audience',
        '',
        '[Describe who will use this project.]',
        '',
        '## Success criteria',
        '',
        '- [Define one measurable result.]',
        '- [Define a second measurable result.]',
        '',
        '## Constraints',
        '',
        '- [List any technical or business constraints here.]',
        '',
    ].join('\n');
}

function renderDecisionLog(): string {
    return [
        '# Decisions',
        '',
        'Use this file to record the decisions that shaped the project.',
        '',
        '## YYYY-MM-DD - Decision title',
        '',
        '- Context: [Why the decision was needed.]',
        '- Decision: [What you chose.]',
        '- Consequences: [What changes because of the choice.]',
        '',
        '## YYYY-MM-DD - Decision title',
        '',
        '- Context: [Why the decision was needed.]',
        '- Decision: [What you chose.]',
        '- Consequences: [What changes because of the choice.]',
        '',
    ].join('\n');
}

function renderAgentsInstructions(): string {
    return [
        '# Agent Instructions',
        '',
        'Use this file as the first place to refine instructions for coding agents when this scaffold is applied to a new project.',
        '',
        '## What to capture',
        '',
        '- The project goal in one or two sentences.',
        '- The most important coding or documentation conventions.',
        '- Any do-not-break rules for the generated repository.',
        '- The local commands or checks agents should prefer first.',
        '',
        '## Keep it current',
        '',
        '- Update this file before filling in the rest of the scaffold if the project direction changes.',
        '- Keep the guidance short enough to read at the start of every session.',
        '- Keep durable project rules here so every supported agent can use the same source of truth.',
        '',
    ].join('\n');
}

function renderIssueTemplate(): string {
    return [
        '# Issue',
        '',
        '## Summary',
        '',
        '[Describe the problem or request.]',
        '',
        '## Steps to reproduce',
        '',
        '1. [First step]',
        '2. [Second step]',
        '3. [Third step]',
        '',
        '## Expected behavior',
        '',
        '[Describe what should happen.]',
        '',
        '## Actual behavior',
        '',
        '[Describe what actually happened.]',
        '',
        '## Additional context',
        '',
        '[Add screenshots, logs, or links if helpful.]',
        '',
    ].join('\n');
}

function renderPullRequestTemplate(): string {
    return [
        '# Pull Request',
        '',
        '## Summary',
        '',
        '[Describe the purpose of this change.]',
        '',
        '## What changed',
        '',
        '- [List the main updates.]',
        '- [List any follow-up work.]',
        '',
        '## Testing',
        '',
        '- [Describe the checks you ran.]',
        '',
        '## Checklist',
        '',
        '- [ ] Updated docs if needed',
        '- [ ] Verified the scaffold output',
        '',
        '## Notes',
        '',
        '[Add anything reviewers should know.]',
        '',
    ].join('\n');
}

function renderEditorSettings(): string {
    return [
        '{',
        '  "editor.formatOnSave": true,',
        '  "editor.snippetSuggestions": "top",',
        '  "editor.tabCompletion": "onlySnippets",',
        '  "files.eol": "\\n",',
        '  "files.insertFinalNewline": true,',
        '  "files.trimTrailingWhitespace": true,',
        '  "[markdown]": {',
        '    "editor.wordWrap": "on"',
        '  }',
        '}',
        '',
    ].join('\n');
}

function renderExtensions(): string {
    return [
        '{',
        '  "recommendations": [',
        '    "dbaeumer.vscode-eslint",',
        '    "esbenp.prettier-vscode"',
        '  ]',
        '}',
        '',
    ].join('\n');
}

function renderTasks(): string {
    return [
        '{',
        '  "version": "2.0.0",',
        '  "tasks": [',
        '    {',
        '      "label": "Replace me: build command",',
        '      "type": "shell",',
        '      "command": "echo",',
        '      "args": ["Replace this task with your build command."]',
        '    },',
        '    {',
        '      "label": "Replace me: test command",',
        '      "type": "shell",',
        '      "command": "echo",',
        '      "args": ["Replace this task with your test command."]',
        '    }',
        '  ]',
        '}',
        '',
    ].join('\n');
}

function renderSnippets(): string {
    const snippets = {
        'Project README': {
            prefix: 'repo-readme',
            description: 'Insert the standard project README scaffold.',
            body: [
                '<p align="center">',
                '  <strong>${1:Project name}</strong>',
                '</p>',
                '',
                '<p align="center">${2:One-sentence description of the project.}</p>',
                '',
                '<p align="center">',
                '  <img src="https://img.shields.io/badge/status-template-orange?style=for-the-badge" alt="Template status" />',
                '  <img src="https://img.shields.io/badge/docs-ready-0ea5e9?style=for-the-badge" alt="Documentation status" />',
                '  <img src="https://img.shields.io/badge/license-unlicensed-lightgrey?style=for-the-badge" alt="License status" />',
                '</p>',
                '',
                '<p align="center">',
                '  ${3:Short positioning line or call to action.}',
                '</p>',
                '',
                '## Why this project',
                '',
                '${4:Describe the problem this project solves and who it helps.}',
                '',
                '## Getting started',
                '',
                '- Install dependencies: `${5:command}`',
                '- Run the project: `${6:command}`',
                '- Build the project: `${7:command}`',
                '',
                '## What you get',
                '',
                '- ${8:A full starter doc set for the repo owner and contributors.}',
                '- ${9:GitHub issue and pull request templates.}',
                '- ${10:VS Code settings, tasks, and snippets.}',
                '',
                '## Project map',
                '',
                '- `docs/`: ${11:planning notes, brief, and decisions}',
                '- `.github/`: ${12:contribution policy, CLA, and GitHub templates}',
                '- `.vscode/`: ${13:editor settings, tasks, and snippets}',
                '- `${14:other-folder}/`: ${15:what belongs here}',
                '',
                '## Ownership',
                '',
                '- Owner: ${16:owner or team name}',
                '- ${17:Repository path or maintainer note.}',
            ],
        },
        'Project Brief': {
            prefix: 'repo-brief',
            description: 'Insert a project brief with tab stops.',
            body: [
                '# Project Brief',
                '',
                '## Goal',
                '',
                '${1:What is the outcome of this project?}',
                '',
                '## Audience',
                '',
                '${2:Who will use this project?}',
                '',
                '## Success criteria',
                '',
                '- ${3:First measurable result}',
                '- ${4:Second measurable result}',
                '',
                '## Constraints',
                '',
                '${5:Any technical, legal, or delivery constraints.}',
            ],
        },
        'Agent Instructions': {
            prefix: 'repo-agents',
            description: 'Insert shared project instructions for coding agents.',
            body: [
                '# Agent Instructions',
                '',
                'Use this file as the first place to refine instructions for coding agents when this scaffold is applied to a new project.',
                '',
                '## What to capture',
                '',
                '- ${1:The project goal in one or two sentences.}',
                '- ${2:The most important coding or documentation conventions.}',
                '- ${3:Any do-not-break rules for the generated repository.}',
                '- ${4:The local commands or checks agents should prefer first.}',
                '',
                '## Keep it current',
                '',
                '- ${5:Update this file before filling in the rest of the scaffold if the project direction changes.}',
                '- ${6:Keep the guidance short enough to read at the start of every session.}',
                '- ${7:Keep durable project rules here so every supported agent can use the same source of truth.}',
            ],
        },
        'Decision Log': {
            prefix: 'repo-decisions',
            description: 'Insert a decision record entry.',
            body: [
                '## ${1:YYYY-MM-DD} - ${2:Decision title}',
                '',
                '- Context: ${3:Why the decision was needed.}',
                '- Decision: ${4:What you chose.}',
                '- Consequences: ${5:What changes because of the choice.}',
            ],
        },
        'Issue Template': {
            prefix: 'repo-issue',
            description: 'Insert a GitHub issue template scaffold.',
            body: [
                '# Issue',
                '',
                '## Summary',
                '',
                '${1:Describe the problem or request.}',
                '',
                '## Steps to reproduce',
                '',
                '1. ${2:First step}',
                '2. ${3:Second step}',
                '3. ${4:Third step}',
                '',
                '## Expected behavior',
                '',
                '${5:Describe what should happen.}',
                '',
                '## Actual behavior',
                '',
                '${6:Describe what actually happened.}',
                '',
                '## Additional context',
                '',
                '${7:Add screenshots, logs, or links if helpful.}',
            ],
        },
        'Pull Request Template': {
            prefix: 'repo-pr',
            description: 'Insert a GitHub pull request template scaffold.',
            body: [
                '# Pull Request',
                '',
                '## Summary',
                '',
                '${1:Describe the purpose of this change.}',
                '',
                '## What changed',
                '',
                '- ${2:Main update}',
                '- ${3:Follow-up work}',
                '',
                '## Testing',
                '',
                '- ${4:Checks you ran}',
                '',
                '## Checklist',
                '',
                '- [ ] ${5:Updated docs if needed}',
                '- [ ] ${6:Verified the scaffold output}',
                '',
                '## Notes',
                '',
                '${7:Add anything reviewers should know.}',
            ],
        },
        'Contribution Guide': {
            prefix: 'repo-contributing',
            description: 'Insert a contributing guide scaffold.',
            body: [
                '# Contributing',
                '',
                '${1:Thanks for taking the time to improve the scaffold.}',
                '',
                '## Before you start',
                '',
                '- ${2:Read the README to understand the current output and command flow.}',
                '- ${3:Check whether the change affects generated files, snippets, or the changelog updater.}',
                '- ${4:If the repo includes .github/CLA.md, read it before opening a pull request.}',
                '- ${5:Keep the templates short, explicit, and easy to tab through.}',
                '',
                '## Recommended workflow',
                '',
                '1. ${6:Update the source template.}',
                '2. ${7:Update the matching snippet.}',
                '3. ${8:Update the README if the generated output changed.}',
                '4. ${9:Refresh the changelog if needed.}',
                '5. ${10:Run the scaffold against a throwaway directory.}',
                '',
                '## Pull requests',
                '',
                '- ${11:Keep PRs focused on one change when possible.}',
                '- ${12:Mention any template files that changed in the summary.}',
                '- ${13:Note if the output shape changed for existing users.}',
                '',
                '## Reporting issues',
                '',
                '- ${14:Use the issue template when the repo provides one.}',
                '- ${15:Include the command you ran and the file that looked wrong.}',
                '- ${16:Add a generated example when the difference is visual or structural.}',
                '',
                '## Verification',
                '',
                '- ${17:npm run build}',
                '- ${18:npm run changelog if the changelog needs a refresh}',
                '- ${19:Run the command against a throwaway directory and inspect the output.}',
            ],
        },
        Roadmap: {
            prefix: 'repo-roadmap',
            description: 'Insert a roadmap scaffold.',
            body: [
                '# Roadmap',
                '',
                '## Current goal',
                '',
                '${1:State the next concrete goal.}',
                '',
                '## Near term',
                '',
                '- ${2:First near-term milestone}',
                '- ${3:Second near-term milestone}',
                '',
                '## Later',
                '',
                '- ${4:Longer-term idea}',
                '- ${5:Another longer-term idea}',
            ],
        },
        'Security Policy': {
            prefix: 'repo-security',
            description: 'Insert a security policy scaffold.',
            body: [
                '# Security',
                '',
                '## Reporting issues',
                '',
                '${1:How should a reporter contact the maintainers?}',
                '',
                '## What to include',
                '',
                '- ${2:Command or action that triggered the issue}',
                '- ${3:Expected result}',
                '- ${4:Observed result}',
                '',
                '## Response process',
                '',
                '${5:Describe how security reports are handled.}',
            ],
        },
        'Code of Conduct': {
            prefix: 'repo-conduct',
            description: 'Insert a code of conduct scaffold.',
            body: [
                '# Contributor Code of Conduct',
                '',
                '## Our pledge',
                '',
                '${1:We commit to keeping participation welcoming, respectful, and free from harassment.}',
                '',
                '## Our standards',
                '',
                '- ${2:Demonstrating empathy and kindness.}',
                '- ${3:Respecting different opinions, viewpoints, and lived experiences.}',
                '- ${4:Giving and receiving constructive feedback gracefully.}',
                '- ${5:Taking responsibility when mistakes happen and learning from them.}',
                '- ${6:Focusing on what is best for the community and the project.}',
                '',
                '## Enforcement',
                '',
                '${7:Reports of unacceptable behavior should go to a named contact method and will be reviewed promptly and fairly.}',
                '',
                '## Attribution',
                '',
                '${8:Adapted from Contributor Covenant v2.0 and linked to the official source.}',
            ],
        },
        'Contributor License Agreement': {
            prefix: 'repo-cla',
            description: 'Insert a contributor license agreement scaffold.',
            body: [
                '# Contributor License Agreement',
                '',
                '${1:By submitting a contribution to this project, you agree to the terms below.}',
                '',
                '## Definitions',
                '',
                '- You: ${2:the individual or legal entity submitting the contribution.}',
                '- Project: ${3:this repository and any downstream project artifacts generated from it.}',
                '- Contribution: ${4:code, documentation, configuration, content, or other material submitted to the project.}',
                '- Submitted: ${5:conveyed through a pull request, commit, issue, patch, or other written contribution.}',
                '',
                '## Grant of rights',
                '',
                '${6:You grant the project maintainers a perpetual, worldwide, non-exclusive, no-charge license to use, reproduce, modify, adapt, publish, distribute, and sublicense your contribution as part of the project and any derivative works.}',
                '',
                '${7:You also grant a patent license for any patent claims that are necessarily infringed by your contribution alone or by combination with the project.}',
                '',
                '## Source of contribution',
                '',
                '${8:You confirm that the contribution is your original work or that you have the right to submit it under the applicable license and restrictions.}',
                '',
                '## Acknowledgment',
                '',
                '${9:By submitting a contribution, you accept these terms for the submitted material.}',
            ],
        },
    };

    return `${JSON.stringify(snippets, null, 2)}\n`;
}

async function ensureDirectory(targetDirectory: string): Promise<void> {
    await mkdir(targetDirectory, { recursive: true });
}

async function writeFileIfNeeded(
    filePath: string,
    content: string,
    force: boolean,
): Promise<void> {
    try {
        await stat(filePath);

        if (!force) {
            return;
        }
    } catch {
        // File does not exist yet.
    }

    await ensureDirectory(dirname(filePath));
    await writeFile(filePath, content, 'utf8');
}

export async function scaffoldProject(options: ScaffoldOptions): Promise<void> {
    const rootDirectory = resolve(options.directory);
    const projectName = options.name?.trim().length
        ? options.name.trim()
        : inferProjectName(rootDirectory);
    const description =
        options.description?.trim().length === 0
            ? '[Describe the project in one sentence.]'
            : options.description?.trim() ?? '[Describe the project in one sentence.]';
    const owner = options.owner?.trim().length ? options.owner.trim() : defaultOwner;

    await ensureDirectory(rootDirectory);

    const files: FileDefinition[] = [
        { path: 'AGENTS.md', content: renderAgentsInstructions() },
        {
            path: 'README.md',
            content: renderReadme({
                name: projectName,
                description,
                owner,
            }),
        },
        { path: 'CONTRIBUTING.md', content: renderContributing() },
        { path: 'CHANGELOG.md', content: renderChangelog() },
        { path: 'ROADMAP.md', content: renderRoadmap() },
        { path: 'SECURITY.md', content: renderSecurity() },
        { path: 'CODE_OF_CONDUCT.md', content: renderCodeOfConduct() },
        { path: join('docs', 'PROJECT-BRIEF.md'), content: renderProjectBrief() },
        { path: join('docs', 'DECISIONS.md'), content: renderDecisionLog() },
        { path: join('.github', 'ISSUE_TEMPLATE.md'), content: renderIssueTemplate() },
        {
            path: join('.github', 'PULL_REQUEST_TEMPLATE.md'),
            content: renderPullRequestTemplate(),
        },
        { path: join('.github', 'CLA.md'), content: renderCla() },
        { path: join('.vscode', 'settings.json'), content: renderEditorSettings() },
        { path: join('.vscode', 'extensions.json'), content: renderExtensions() },
        { path: join('.vscode', 'tasks.json'), content: renderTasks() },
        {
            path: join('.vscode', 'project-docs.code-snippets'),
            content: renderSnippets(),
        },
    ];

    for (const file of files) {
        await writeFileIfNeeded(
            join(rootDirectory, file.path),
            file.content,
            Boolean(options.force),
        );
    }
}
