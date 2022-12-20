import { expect, test, describe } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

const paths = {
    testFiles: {
        importWithExtension: checkIfFileExists('./src/test-import-with-extension.ts'),
        importWithoutExtension: checkIfFileExists('./src/test-import-without-extension.ts')
    },
    tsconfigs: {
        withTransformer: checkIfFileExists('./tsconfig.with-transformer.json'),
        withoutTransformer: checkIfFileExists('./tsconfig.without-transformer.json')
    }
}

describe('config with the transformer DISABLED', () => {
    test('a relative import WITHOUT extension', () => {
        const command = () => execSync(`ts-node-esm --project ${paths.tsconfigs.withoutTransformer} `
            + `${paths.testFiles.importWithoutExtension}`, {
            encoding: 'utf-8'
        });

        expect(command).toThrowError();
    });

    test('a relative import WITH extension', () => {
        const command = () => execSync(`ts-node-esm --project ${paths.tsconfigs.withoutTransformer} `
            + `${paths.testFiles.importWithExtension}`, {
            encoding: 'utf-8'
        });

        expect(command).not.toThrowError();
    });
}, {
    timeout: 30000
});

describe('config with the transformer ENABLED', () => {
    test('a relative import WITHOUT extension', () => {
        const command = () => execSync(`ts-node-esm --project ${paths.tsconfigs.withTransformer} `
            + `${paths.testFiles.importWithoutExtension}`, {
            encoding: 'utf-8'
        });

        expect(command).not.toThrowError();
    });

    test('a relative import WITH extension', () => {
        const command = () => execSync(`ts-node-esm --project ${paths.tsconfigs.withTransformer} `
            + `${paths.testFiles.importWithExtension}`, {
            encoding: 'utf-8'
        });

        expect(command).not.toThrowError();
    });
}, {
    timeout: 30000
});


/**
 * Checks if `pathStr` exists: returns `pathStr` if it exists, throws an error otherwise.
 * @param pathStr path to check.
 */
function checkIfFileExists(pathStr) {
    if (fs.existsSync(pathStr))
        return pathStr;
    else
        throw new Error(`path "${pathStr}" do not exist.`);
}