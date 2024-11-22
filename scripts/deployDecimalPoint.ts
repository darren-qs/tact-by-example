import { toNano } from '@ton/core';
import { DecimalPoint } from '../wrappers/DecimalPoint';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const decimalPoint = provider.open(await DecimalPoint.fromInit());

    await decimalPoint.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(decimalPoint.address);

    // run methods on `decimalPoint`
}
