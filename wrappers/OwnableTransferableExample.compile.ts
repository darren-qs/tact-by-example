import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/ownable_transferable_example.tact',
    options: {
        debug: true,
    },
};
