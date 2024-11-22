import { toNano } from '@ton/core';
import { MultipleContractAddresses } from '../wrappers/MultipleContractAddresses';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const multipleContractAddresses = provider.open(await MultipleContractAddresses.fromInit());

    await multipleContractAddresses.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(multipleContractAddresses.address);

    // run methods on `multipleContractAddresses`
}
