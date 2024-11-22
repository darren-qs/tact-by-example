import { toNano } from '@ton/core';
import { ResumableTraitExample } from '../wrappers/ResumableTraitExample';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const resumableTraitExample = provider.open(await ResumableTraitExample.fromInit());

    await resumableTraitExample.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(resumableTraitExample.address);

    // run methods on `resumableTraitExample`
}
