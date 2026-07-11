import { mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

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
        `# ${options.name}`,
        '',
        options.description,
        '',
        '## What this project is for',
        '',
        '[Describe the problem this project solves and the result it should produce.]',
        '',
        '## Getting started',
        '',
        '- Install dependencies: [replace with your command]',
        '- Run the project: [replace with your command]',
        '- Build the project: [replace with your command]',
        '',
        '## Project structure',
        '',
        '- `docs/`: planning notes and decisions',
        '- `.vscode/`: editor settings, tasks, and snippets',
        '- `src/`: implementation files if this project needs code',
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
        '## Purpose',
        '',
        '[Explain what contributors should understand before changing the scaffold.]',
        '',
        '## Change process',
        '',
        '1. Update the source template in `src/scaffold.ts`.',
        '2. Update the matching snippet in `.vscode/project-docs.code-snippets`.',
        '3. Update the README if the generated output changed.',
        '',
        '## Verification',
        '',
        '- Build the package.',
        '- Run the command against a throwaway directory and inspect the output.',
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
        '# Code of Conduct',
        '',
        '## Expected behavior',
        '',
        '- Be respectful.',
        '- Keep feedback specific and actionable.',
        '- Assume good intent until the evidence says otherwise.',
        '',
        '## Unacceptable behavior',
        '',
        '- Harassment.',
        '- Deliberate sabotage of generated templates.',
        '- Repeatedly ignoring review feedback.',
        '',
        '## Enforcement',
        '',
        '[Describe who handles reports and what the escalation path is.]',
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
                '# ${1:Project name}',
                '',
                '${2:One-sentence description of the project.}',
                '',
                '## What this project is for',
                '',
                '${3:Describe the problem this project solves and who it helps.}',
                '',
                '## Getting started',
                '',
                '- Install dependencies: `${4:command}`',
                '- Run the project: `${5:command}`',
                '- Build the project: `${6:command}`',
                '',
                '## Project structure',
                '',
                '- `docs/`: ${7:where planning and decision notes live}',
                '- `.vscode/`: ${8:editor settings, tasks, and snippets}',
                '- `${9:other-folder}/`: ${10:what belongs here}',
                '',
                '## Notes',
                '',
                '${11:Add the first things a contributor should know.}',
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
        'Contribution Guide': {
            prefix: 'repo-contributing',
            description: 'Insert a contributing guide scaffold.',
            body: [
                '# Contributing',
                '',
                '## Purpose',
                '',
                '${1:Explain what contributors should understand about this repo.}',
                '',
                '## Change process',
                '',
                '1. ${2:Update the source template.}',
                '2. ${3:Update the matching snippet.}',
                '3. ${4:Update the README if the generated output changed.}',
                '',
                '## Verification',
                '',
                '- ${5:Build command}',
                '- ${6:Manual check or test command}',
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
                '# Code of Conduct',
                '',
                '## Expected behavior',
                '',
                '- ${1:Respectful behavior}',
                '- ${2:Actionable feedback}',
                '',
                '## Unacceptable behavior',
                '',
                '- ${3:Harassment}',
                '- ${4:Sabotage}',
                '',
                '## Enforcement',
                '',
                '${5:Who handles reports and how?}',
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
