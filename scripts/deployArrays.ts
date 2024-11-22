import { toNano } from '@ton/core';
import { Arrays } from '../wrappers/Arrays';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const arrays = provider.open(await Arrays.fromInit());

    await arrays.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(arrays.address);

    // run methods on `arrays`
}
