import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/resumable_trait_example.tact',
    options: {
        debug: true,
    },
};
