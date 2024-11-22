import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/emitting_logs.tact',
    options: {
        debug: true,
    },
};
