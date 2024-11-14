import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/integer_operations.tact',
    options: {
        debug: true,
    },
};
