import { toNano } from '@ton/core';
import { ContractDeployAnotherContract } from '../wrappers/ContractDeployAnotherContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contractDeployAnotherContract = provider.open(await ContractDeployAnotherContract.fromInit());

    await contractDeployAnotherContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(contractDeployAnotherContract.address);

    // run methods on `contractDeployAnotherContract`
}
