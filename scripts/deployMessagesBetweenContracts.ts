import { toNano } from '@ton/core';
import { MessagesBetweenContracts } from '../wrappers/MessagesBetweenContracts';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const messagesBetweenContracts = provider.open(await MessagesBetweenContracts.fromInit());

    await messagesBetweenContracts.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(messagesBetweenContracts.address);

    // run methods on `messagesBetweenContracts`
}
