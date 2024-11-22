import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/multiple_contract_addresses.tact',
    options: {
        debug: true,
    },
};
