import { toNano } from '@ton/core';
import { StoppableTraitExample } from '../wrappers/StoppableTraitExample';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stoppableTraitExample = provider.open(await StoppableTraitExample.fromInit());

    await stoppableTraitExample.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(stoppableTraitExample.address);

    // run methods on `stoppableTraitExample`
}
