import { toNano } from '@ton/core';
import { IntegerOperations } from '../wrappers/IntegerOperations';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const integerOperations = provider.open(await IntegerOperations.fromInit());

    await integerOperations.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(integerOperations.address);

    // run methods on `integerOperations`
}
