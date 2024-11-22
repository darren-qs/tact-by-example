import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/stoppable_trait_example.tact',
    options: {
        debug: true,
    },
};
