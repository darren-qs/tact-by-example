import { toNano } from '@ton/core';
import { UnboundedArrays } from '../wrappers/UnboundedArrays';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const unboundedArrays = provider.open(await UnboundedArrays.fromInit());

    await unboundedArrays.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(unboundedArrays.address);

    // run methods on `unboundedArrays`
}
