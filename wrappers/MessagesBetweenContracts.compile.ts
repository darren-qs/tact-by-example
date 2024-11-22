import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/messages_between_contracts.tact',
    options: {
        debug: true,
    },
};
