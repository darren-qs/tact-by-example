import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/unbounded_maps.tact',
    options: {
        debug: true,
    },
};
