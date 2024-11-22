import { toNano } from '@ton/core';
import { CalculateContractAddress } from '../wrappers/CalculateContractAddress';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const calculateContractAddress = provider.open(await CalculateContractAddress.fromInit());

    await calculateContractAddress.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(calculateContractAddress.address);

    // run methods on `calculateContractAddress`
}
