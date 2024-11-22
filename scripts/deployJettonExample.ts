import { toNano } from '@ton/core';
import { JettonExample } from '../wrappers/JettonExample';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonExample = provider.open(await JettonExample.fromInit());

    await jettonExample.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jettonExample.address);

    // run methods on `jettonExample`
}
