#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const { writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const CATEGORY_ORDER = ['Added', 'Changed', 'Fixed', 'Docs', 'Other'];

function loadCommits() {
    const output = execFileSync(
        'git',
        ['log', '--no-merges', '--date=short', '--pretty=format:%ad\t%s'],
        {
            encoding: 'utf8',
        },
    ).trim();

    if (output.length === 0) {
        return [];
    }

    return output.split(/\r?\n/).map((line) => {
        const [date, ...messageParts] = line.split('\t');
        return {
            date,
            subject: messageParts.join('\t').trim(),
        };
    });
}

function classify(subject) {
    const lowered = subject.toLowerCase();

    if (
        lowered.startsWith('feat') ||
        lowered.startsWith('add ') ||
        lowered.startsWith('added ') ||
        lowered.startsWith('create ') ||
        lowered.startsWith('introduce ')
    ) {
        return 'Added';
    }

    if (
        lowered.startsWith('fix') ||
        lowered.startsWith('bug') ||
        lowered.startsWith('patch ') ||
        lowered.startsWith('repair ') ||
        lowered.startsWith('resolve ')
    ) {
        return 'Fixed';
    }

    if (lowered.startsWith('doc') || lowered.startsWith('docs ')) {
        return 'Docs';
    }

    if (
        lowered.startsWith('refactor') ||
        lowered.startsWith('chore') ||
        lowered.startsWith('build') ||
        lowered.startsWith('ci ') ||
        lowered.startsWith('test') ||
        lowered.startsWith('style') ||
        lowered.startsWith('perf') ||
        lowered.startsWith('maint')
    ) {
        return 'Changed';
    }

    return 'Other';
}

function formatChangelog(commits) {
    const lines = [
        '# Changelog',
        '',
        'This file is generated from git history. Run `npm run changelog` after making commits.',
        '',
    ];

    if (commits.length === 0) {
        lines.push('No commits found.', '');
        return `${lines.join('\n')}\n`;
    }

    let currentDate = null;
    let currentCategories = new Map();

    function flushDate() {
        if (currentDate === null) {
            return;
        }

        lines.push(`## ${currentDate}`, '');

        for (const category of CATEGORY_ORDER) {
            const items = currentCategories.get(category) ?? [];
            if (items.length === 0) {
                continue;
            }

            lines.push(`### ${category}`, '');

            for (const item of items) {
                lines.push(`- ${item}`);
            }

            lines.push('');
        }
    }

    for (const commit of commits) {
        if (commit.date !== currentDate) {
            flushDate();
            currentDate = commit.date;
            currentCategories = new Map();
        }

        const category = classify(commit.subject);
        const items = currentCategories.get(category) ?? [];
        items.push(commit.subject);
        currentCategories.set(category, items);
    }

    flushDate();

    return `${lines.join('\n')}\n`;
}

function main() {
    const commits = loadCommits();
    const changelog = formatChangelog(commits);
    writeFileSync(resolve('CHANGELOG.md'), changelog, 'utf8');
    console.log(`Updated CHANGELOG.md from ${commits.length} commit(s).`);
}

try {
    main();
} catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to update changelog: ${message}`);
    process.exitCode = 1;
}
