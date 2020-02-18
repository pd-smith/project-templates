#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const commandLineArgs = require('command-line-args');

const validProjectTypes = fs.readdirSync(path.resolve('./_templates/'));
const optionPrompts = [
    {
        name: 'type',
        alias: 't',
        type: String,
        help: `Pick from [${validProjectTypes}]`,
        required: true,
    },
    {
        name: 'name',
        alias: 'n',
        type: String,
        help: 'The name of your new application',
        required: true,
    },
    {
        name: 'force',
        alias: 'f',
        type: Boolean,
        help:
            'Replaces existing project with the same name as your new desired project name',
    },
    { name: 'help', type: Boolean },
];
const cliOptions = commandLineArgs(optionPrompts);

if (cliOptions.help) {
    console.log('OPTIONS:');
    optionPrompts.forEach(prompt => {
        if (prompt.name !== 'help') {
            console.log(`--${prompt.name}, -${prompt.alias}`);
            console.log('\t' + prompt.help + '\n');
        }
    });
    process.exit(0);
}

const templatePath = path.resolve(`./_templates/${cliOptions.type}`);
const projectPath = `./${cliOptions.name}`;

async function preflightChecks() {
    const requiredOptionErrors = optionPrompts
        .map(option => {
            if (option.required) {
                if (!cliOptions[option.name]) {
                    return option.name;
                }
            }
        })
        .filter(Boolean);
    if (requiredOptionErrors.length) {
        console.error(`Missing required option(s): [${requiredOptionErrors}]`);
        console.error('Use "--help" to see a list of options');
        process.exit(1);
    }

    const templateExists = validProjectTypes.includes(cliOptions.type);

    if (!templateExists) {
        console.error(`Invalid Template type [${cliOptions.type}] inputed.`);
        console.error(`Valid types are [${validProjectTypes}]`);
        process.exit(1);
    }

    const projectAlreadyExists = await fs.pathExists(projectPath);

    if (projectAlreadyExists && !cliOptions.force) {
        throw new Error(`Project name [${cliOptions.name}] already in use.`);
    }
}

async function copyTemplateFiles() {
    try {
        await fs.copy(templatePath, projectPath);
    } catch (error) {
        console.error(error);
    }
}

async function updatePackageJSON() {
    const pathToPackageJSON = `${projectPath}/package.json`;
    const packageJSONString = await fs.readFile(pathToPackageJSON, 'utf-8');
    const packageJSON = JSON.parse(packageJSONString);

    await fs.writeJson(pathToPackageJSON, packageJSON, {
        spaces: 2,
        replacer: (key, value) => {
            if (key === 'name') {
                return cliOptions.name;
            }
            return value;
        },
    });
}

(async function main() {
    try {
        await preflightChecks();
        await copyTemplateFiles();
        await updatePackageJSON();
    } catch (error) {
        console.error(error);
    }
})();
