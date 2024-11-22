import { toNano } from '@ton/core';
import { ParentChildCommunication } from '../wrappers/ParentChildCommunication';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const parentChildCommunication = provider.open(await ParentChildCommunication.fromInit());

    await parentChildCommunication.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(parentChildCommunication.address);

    // run methods on `parentChildCommunication`
}
