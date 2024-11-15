import { toNano } from '@ton/core';
import { Errors } from '../wrappers/Errors';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const errors = provider.open(await Errors.fromInit());

    await errors.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(errors.address);

    // run methods on `errors`
}
