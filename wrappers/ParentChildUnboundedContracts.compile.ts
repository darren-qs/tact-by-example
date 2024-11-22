import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/parent_child_unbounded_contracts.tact',
    options: {
        debug: true,
    },
};