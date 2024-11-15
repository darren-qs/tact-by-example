import { toNano } from '@ton/core';
import { Variables } from '../wrappers/Variables';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const variables = provider.open(await Variables.fromInit());

    await variables.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(variables.address);

    // run methods on `variables`
}
