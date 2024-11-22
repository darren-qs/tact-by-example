import { toNano } from '@ton/core';
import { Maps } from '../wrappers/Maps';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const maps = provider.open(await Maps.fromInit());

    await maps.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(maps.address);

    // run methods on `maps`
}
