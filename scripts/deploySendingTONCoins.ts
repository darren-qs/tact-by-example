import { toNano } from '@ton/core';
import { SendingTONCoins } from '../wrappers/SendingTONCoins';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sendingTONCoins = provider.open(await SendingTONCoins.fromInit());

    await sendingTONCoins.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sendingTONCoins.address);

    // run methods on `sendingTONCoins`
}
