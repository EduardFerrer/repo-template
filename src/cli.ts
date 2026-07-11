#!/usr/bin/env node

import { scaffoldProject } from './scaffold';

type ParsedArguments = {
    directory: string;
    name?: string;
    description?: string;
    owner?: string;
    force: boolean;
    help: boolean;
};

function printHelp(): void {
    console.log([
        'repo-template',
        '',
        'Usage:',
        '  repo-template init [directory] [options]',
        '  repo-template [directory] [options]',
        '',
        'Options:',
        '  --name <name>          Project name used in generated documents',
        '  --description <text>   Short project description',
        '  --owner <name>         Owner or team name',
        '  --force                Overwrite existing files',
        '  -h, --help             Show this help message',
        '',
    ].join('\n'));
}

function parseArguments(argv: string[]): ParsedArguments {
    const args = [...argv];

    if (args[0] === 'init') {
        args.shift();
    }

    const result: ParsedArguments = {
        directory: '.',
        force: false,
        help: false,
    };

    while (args.length > 0) {
        const current = args.shift();

        if (current === undefined) {
            break;
        }

        if (current === '-h' || current === '--help') {
            result.help = true;
            continue;
        }

        if (current === '--force') {
            result.force = true;
            continue;
        }

        if (current === '--name') {
            result.name = args.shift();
            continue;
        }

        if (current === '--description') {
            result.description = args.shift();
            continue;
        }

        if (current === '--owner') {
            result.owner = args.shift();
            continue;
        }

        if (current.startsWith('--')) {
            throw new Error(`Unknown option: ${current}`);
        }

        if (result.directory === '.') {
            result.directory = current;
        } else {
            throw new Error(`Unexpected argument: ${current}`);
        }
    }

    return result;
}

async function main(): Promise<void> {
    const parsed = parseArguments(process.argv.slice(2));

    if (parsed.help) {
        printHelp();
        return;
    }

    await scaffoldProject({
        directory: parsed.directory,
        name: parsed.name,
        description: parsed.description,
        owner: parsed.owner,
        force: parsed.force,
    });

    console.log(`Created scaffold in ${parsed.directory}.`);
}

main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
});
