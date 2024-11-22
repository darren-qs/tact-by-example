import { toNano } from '@ton/core';
import { TrackableTrait } from '../wrappers/TrackableTrait';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const trackableTrait = provider.open(await TrackableTrait.fromInit());

    await trackableTrait.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(trackableTrait.address);

    // run methods on `trackableTrait`
}
