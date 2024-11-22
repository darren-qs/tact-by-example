import { toNano } from '@ton/core';
import { EmittingLogs } from '../wrappers/EmittingLogs';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const emittingLogs = provider.open(await EmittingLogs.fromInit());

    await emittingLogs.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(emittingLogs.address);

    // run methods on `emittingLogs`
}
