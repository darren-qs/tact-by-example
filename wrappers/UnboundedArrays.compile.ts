import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/unbounded_arrays.tact',
    options: {
        debug: true,
    },
};
