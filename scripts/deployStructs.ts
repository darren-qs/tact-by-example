import { toNano } from '@ton/core';
import { Structs } from '../wrappers/Structs';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const structs = provider.open(await Structs.fromInit());

    await structs.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(structs.address);

    // run methods on `structs`
}
