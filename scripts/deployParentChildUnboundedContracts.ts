import { toNano } from '@ton/core';
import { ParentChildUnboundedContracts } from '../wrappers/ParentChildUnboundedContracts';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const parentChildUnboundedContracts = provider.open(await ParentChildUnboundedContracts.fromInit());

    await parentChildUnboundedContracts.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(parentChildUnboundedContracts.address);

    // run methods on `parentChildUnboundedContracts`
}
