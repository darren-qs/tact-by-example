import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/current_time.tact',
    options: {
        debug: true,
    },
};
