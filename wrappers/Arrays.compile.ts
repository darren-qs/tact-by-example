import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/arrays.tact',
    options: {
        debug: true,
    },
};
