import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/trackable_trait.tact',
    options: {
        debug: true,
    },
};
