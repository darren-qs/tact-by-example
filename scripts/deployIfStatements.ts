import { toNano } from '@ton/core';
import { IfStatements } from '../wrappers/IfStatements';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ifStatements = provider.open(await IfStatements.fromInit());

    await ifStatements.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ifStatements.address);

    // run methods on `ifStatements`
}
