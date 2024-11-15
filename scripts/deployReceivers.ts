import { toNano } from '@ton/core';
import { Receivers } from '../wrappers/Receivers';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const receivers = provider.open(await Receivers.fromInit());

    await receivers.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(receivers.address);

    // run methods on `receivers`
}
