import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/sending_t_o_n_coins.tact',
    options: {
        debug: true,
    },
};
