import { toNano } from '@ton/core';
import { OwnableTransferableExample } from '../wrappers/OwnableTransferableExample';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ownableTransferableExample = provider.open(await OwnableTransferableExample.fromInit());

    await ownableTransferableExample.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ownableTransferableExample.address);

    // run methods on `ownableTransferableExample`
}
