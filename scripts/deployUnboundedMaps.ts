import { toNano } from '@ton/core';
import { UnboundedMaps } from '../wrappers/UnboundedMaps';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const unboundedMaps = provider.open(await UnboundedMaps.fromInit());

    await unboundedMaps.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(unboundedMaps.address);

    // run methods on `unboundedMaps`
}
