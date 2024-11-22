import { toNano } from '@ton/core';
import { OwnableExample } from '../wrappers/OwnableExample';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ownableExample = provider.open(await OwnableExample.fromInit());

    await ownableExample.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ownableExample.address);

    // run methods on `ownableExample`
}
