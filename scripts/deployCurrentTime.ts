import { toNano } from '@ton/core';
import { CurrentTime } from '../wrappers/CurrentTime';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const currentTime = provider.open(await CurrentTime.fromInit());

    await currentTime.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(currentTime.address);

    // run methods on `currentTime`
}
