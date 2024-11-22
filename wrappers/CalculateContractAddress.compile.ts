import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/calculate_contract_address.tact',
    options: {
        debug: true,
    },
};
