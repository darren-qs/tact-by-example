import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/contract_deploy_another_contract.tact',
    options: {
        debug: true,
    },
};
